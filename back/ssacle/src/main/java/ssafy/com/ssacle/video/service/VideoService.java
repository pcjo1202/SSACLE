package ssafy.com.ssacle.video.service;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.repository.SprintRepository;
import ssafy.com.ssacle.team.domain.Team;
import ssafy.com.ssacle.team.repository.TeamRepository;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.service.UserService;
import ssafy.com.ssacle.userteam.domain.UserTeam;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoService {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    private final SprintRepository sprintRepository;
    private final TeamRepository teamRepository;
    private final UserService userService;
    private final StringRedisTemplate redisTemplate;
    private static final long LOCK_EXPIRE_TIME = 10;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @Transactional
    public void distributeSessionAndTokensForUsers() throws OpenViduJavaClientException, OpenViduHttpException {
        // 🔹 Step 1: 발표 날짜가 오늘인 Sprint 가져오기 (Sprint-Teams 관계)
        List<Sprint> sprints = sprintRepository.findSprintsByPresentationDate();
        List<Long> sprintIds = sprints.stream().map(Sprint::getId).toList();

        // 🔹 Step 2: 해당 Sprint에 속한 Teams와 UserTeams 관계 가져오기
        List<Team> teams = teamRepository.findTeamsWithUsersBySprintIds(sprintIds);
        Map<Long, Team> teamMap = teams.stream().collect(Collectors.toMap(Team::getId, team -> team));

        for (Sprint sprint : sprints) {
            for (Team team : sprint.getTeams()) {
                Team fullTeam = teamMap.get(team.getId());
                if (fullTeam == null) continue;

                if (!redisTemplate.hasKey("session:" + sprint.getId() + ":" + team.getId())) {
                    // 🔹 세션이 없는 경우 새로 생성
                    String sessionId = createSession(sprint.getId(), team.getId());
                    log.warn("🚨 [세션 미존재] 새로 생성 | Sprint: {}, Team: {}, 생성된 Session ID: {}", sprint.getName(), team.getName(), sessionId);
                } else {
                    log.info("✅ [세션 존재] Sprint: {}, Team: {}, Session ID: {}", sprint.getName(), team.getName(), redisTemplate.opsForValue().get("session:" + sprint.getId() + ":" + team.getId()));
                }

                for (UserTeam userTeam : fullTeam.getUserTeams()) {
                    createToken(sprint.getId(), team.getId(), userTeam);
//                    String token = "token_" + sessionId + "_" + userTeam.getUser().getNickname(); // 🔹 실제 OpenVidu에서는 OpenVidu API 호출
//
//                    log.info("🎟 [토큰 발급] Sprint: {}, Team: {}, User: {}, Session ID: {}, Token: {}",
//                            sprint.getName(), team.getName(), userTeam.getUser().getNickname(), sessionId, token);
                }
            }
        }
    }

    @Transactional
    public String createSession(Long sprintId, Long teamId) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionLockKey = "session_lock:" + sprintId + ":" + teamId;
        String sessionKey = "session:" + sprintId + ":" + teamId;
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        try {
            Boolean lockAcquired = ops.setIfAbsent(sessionLockKey, "LOCK", Duration.ofSeconds(LOCK_EXPIRE_TIME));
            if (lockAcquired == null || !lockAcquired) {
                log.warn("🚨 세션 생성 중복 방지 | Sprint ID: {}, Team ID: {}", sprintId, teamId);
                return ops.get(sessionKey);
            }

            String existingSessionId = ops.get(sessionKey);
            if (existingSessionId != null) {
                return existingSessionId;
            }

            SessionProperties properties = new SessionProperties.Builder()
                    .customSessionId("sprint_" + sprintId + "_team_" + teamId)
                    .build();
            Session session=null;
            try {
                session = openvidu.createSession(properties);
            } catch (Exception e) {
                log.error("🚨 OpenVidu 세션 생성 실패 | Sprint ID: {}, Team ID: {}, Error: {}", sprintId, teamId, e.getMessage());
                throw new IllegalStateException("OpenVidu 세션 생성 중 오류 발생", e);
            }

            if (session == null || session.getSessionId() == null) {
                log.error("🚨 OpenVidu 세션 생성 실패 | Sprint ID: {}, Team ID: {}", sprintId, teamId);
                throw new IllegalStateException("OpenVidu 세션 생성 중 오류 발생");
            }

            String sessionId = session.getSessionId();
            ops.set(sessionKey, sessionId, Duration.ofHours(12));
            log.info("✅ 세션 생성 완료 | Sprint ID: {}, Team ID: {}, Session ID: {}", sprintId, teamId, sessionId);
            return sessionId;
        } finally {
            redisTemplate.delete(sessionLockKey);
        }
    }

    @Transactional
    public void createToken(Long sprintId, Long teamId, UserTeam userTeam) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionKey = "session:" + sprintId + ":" + teamId;
        String tokenLockKey = "token_lock:" + sessionKey + ":" + userTeam.getUser().getNickname();
        String tokenKey = "token:" + sessionKey + ":" + userTeam.getUser().getNickname();
        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        try {
            Boolean lockAcquired = ops.setIfAbsent(tokenLockKey, "LOCK", Duration.ofSeconds(LOCK_EXPIRE_TIME));
            if (lockAcquired == null || !lockAcquired) {
                log.warn("🚨 토큰 생성 중복 방지 | Sprint ID: {}, Team ID: {}, User: {}", sprintId, teamId, userTeam.getUser().getNickname());
                return;
            }

            String existingToken = ops.get(tokenKey);
            if (existingToken != null) {
                log.info("🎟 [이미 토큰이 존재합니다.] Sprint ID: {}, Team ID: {}, User: {}, Token: {}", sprintId, teamId, userTeam.getUser().getNickname(), existingToken);
                return;
            }

            String sessionId = ops.get(sessionKey);

            Session session = openvidu.getActiveSession(ops.get(sessionKey));
            if (session == null) {
                log.warn("🚨 OpenVidu 세션이 만료됨. 새로 생성합니다.");
                sessionId = createSession(sprintId, teamId);
                session = openvidu.getActiveSession(sessionId);
                if (session == null) {
                    log.error("🚨 OpenVidu 세션을 찾을 수 없습니다. Sprint ID: {}, Team ID: {}", sprintId, teamId);
                    throw new IllegalStateException("OpenVidu 세션이 존재하지 않습니다.");
                }
            }


            ConnectionProperties properties = new ConnectionProperties.Builder().build();
            Connection connection = session.createConnection(properties);
            String token = connection.getToken();

            ops.set(tokenKey, token, Duration.ofHours(12));
            log.info("🎟 [토큰 발급 완료] Sprint ID: {}, Team ID: {}, User: {}, Token: {}", sprintId, teamId, userTeam.getUser().getNickname(), token);
        } finally {
            redisTemplate.delete(tokenLockKey);
        }
    }

    @Transactional
    public void deleteAllSessionsAndTokens() {
        String deleteLockKey = "delete_lock";
        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        try {
            // Redis 분산 락 획득 (LOCK_EXPIRE_TIME 동안 유효)
            Boolean lockAcquired = ops.setIfAbsent(deleteLockKey, "LOCK", Duration.ofSeconds(LOCK_EXPIRE_TIME));
            if (lockAcquired == null || !lockAcquired) {
                log.warn("🚨 세션 및 토큰 삭제 중복 방지: 다른 요청이 삭제 중입니다.");
                return;
            }

            log.info("🔴 모든 세션과 토큰 삭제 시작...");

            // 1️⃣ 현재 OpenVidu에서 활성 세션 조회 후 종료 시도
            List<Session> activeSessions = openvidu.getActiveSessions();
            if (!activeSessions.isEmpty()) {
                for (Session session : activeSessions) {
                    try {
                        session.close(); // OpenVidu 세션 종료
                        log.info("✅ OpenVidu 세션 종료 완료 | Session ID: {}", session.getSessionId());
                    } catch (OpenViduJavaClientException | OpenViduHttpException e) {
                        log.error("🚨 OpenVidu 세션 종료 중 오류 발생 | Session ID: {}, Error: {}", session.getSessionId(), e.getMessage());
                    }
                }
            } else {
                log.info("✅ 현재 OpenVidu에 활성 세션이 없습니다.");
            }

            // 2️⃣ Redis에서 세션 및 토큰 삭제
            Set<String> sessionKeys = redisTemplate.keys("session:*");
            Set<String> tokenKeys = redisTemplate.keys("token:*");

            if (sessionKeys != null && !sessionKeys.isEmpty()) {
                redisTemplate.delete(sessionKeys);
                log.info("✅ Redis에서 모든 세션 삭제 완료.");
            }

            if (tokenKeys != null && !tokenKeys.isEmpty()) {
                redisTemplate.delete(tokenKeys);
                log.info("✅ Redis에서 모든 토큰 삭제 완료.");
            }
        } catch (Exception e) {
            log.error("🚨 세션 및 토큰 삭제 중 오류 발생: {}", e.getMessage());
        } finally {
            // 락 해제
            redisTemplate.delete(deleteLockKey);
        }
    }

//    @Transactional
//    public void closeAllSessions() {
//        List<Session> activeSessions = openvidu.getActiveSessions();
//        if (activeSessions.isEmpty()) {
//            log.info("✅ 현재 활성 세션이 없습니다.");
//            return;
//        }
//
//        for (Session session : activeSessions) {
//            try {
//                session.close();
//                log.info("✅ 세션 종료 완료 | Session ID: {}", session.getSessionId());
//            } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//                log.error("🚨 세션 종료 중 오류 발생 | Session ID: {}, Error: {}", session.getSessionId(), e.getMessage());
//            }
//        }
//
//        // Redis에서 모든 세션 정보 삭제
//        deleteAllSessionsFromRedis();
//
//        // Redis에서 모든 토큰 정보 삭제 (SCAN을 이용한 방식)
//        deleteAllTokensFromRedis();
//
//        log.info("✅ 모든 OpenVidu 세션이 종료되었습니다.");
//    }
//
//    @Transactional
//    public void deleteAllSessionsFromRedis() {
//        Set<String> sessionKeys = redisTemplate.keys("session:*");
//        if (sessionKeys != null && !sessionKeys.isEmpty()) {
//            redisTemplate.delete(sessionKeys);
//            log.info("✅ Redis에 저장된 세션 정보 삭제 완료");
//        }
//    }
//
//    @Transactional
//    public void deleteAllTokensFromRedis() {
//        ScanOptions scanOptions = ScanOptions.scanOptions().match("token:*").count(100).build();
//        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(scanOptions);
//
//        Set<String> tokenKeys = new HashSet<>();
//        while (cursor.hasNext()) {
//            tokenKeys.add(new String(cursor.next()));
//        }
//
//        if (!tokenKeys.isEmpty()) {
//            redisTemplate.delete(tokenKeys);
//            log.info("✅ Redis에서 모든 토큰 정보 삭제 완료. 삭제된 키 개수: {}", tokenKeys.size());
//        } else {
//            log.info("⚠️ Redis에서 삭제할 토큰이 없습니다.");
//        }
//    }



    /** 🔹 세션이 없을 경우 즉시 생성 */
//    @Transactional
//    public String createSession(Long sprintId, Long teamId) throws OpenViduJavaClientException, OpenViduHttpException {
//        SessionProperties properties = new SessionProperties.Builder()
//                .customSessionId("sprint_" + sprintId + "_team_" + teamId)
//                .build();
//        log.info("SessionProperties : {}", properties.customSessionId());
//        Session session;
//        try {
//            session = openvidu.createSession(properties);
//        } catch (Exception e) {
//            log.error("🚨 OpenVidu 세션 생성 실패 | Sprint ID: {}, Team ID: {}, Error: {}", sprintId, teamId, e.getMessage());
//            throw new IllegalStateException("OpenVidu 세션 생성 중 오류 발생");
//        }
//
//        if (session == null) {
//            log.error("🚨 OpenVidu 세션이 null 입니다. Sprint ID: {}, Team ID: {}", sprintId, teamId);
//            throw new IllegalStateException("OpenVidu 세션 생성 실패");
//        }
//
//        String sessionId = session.getSessionId();
//        log.info("Session ID : {}", sessionId);
//        redisTemplate.opsForValue().set("session:" + sprintId + ":" + teamId, sessionId, Duration.ofHours(12));
//        return sessionId;
//    }
//
//    @Transactional
//    public void createToken(Long sprintId, Long teamId, UserTeam userTeam) throws OpenViduJavaClientException, OpenViduHttpException{
//        String sessionId = redisTemplate.opsForValue().get("session:" + sprintId + ":" + teamId);
//        if (sessionId == null) {
//            sessionId = createSession(sprintId, teamId);
//            log.info("✅ 세션이 없어서 새로 생성됨 | Sprint ID: {}, Team ID: {}, Session ID: {}", sprintId, teamId, sessionId);
//        }
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) {
//            log.warn("🚨 OpenVidu 서버에서 세션이 만료됨, 새로 생성합니다.");
//            sessionId = createSession(sprintId, teamId);
//            session = openvidu.getActiveSession(sessionId);
//
//            if (session == null) {
//                log.error("🚨 OpenVidu 세션을 찾을 수 없습니다. Sprint ID: {}, Team ID: {}", sprintId, teamId);
//                throw new IllegalStateException("OpenVidu 세션이 존재하지 않습니다.");
//            }
//        }
//        ConnectionProperties properties = new ConnectionProperties.Builder().build();
//        Connection connection = session.createConnection(properties);
//        String token = connection.getToken();
//
//        if (token == null || token.isEmpty()) {
//            log.error("🚨 OpenVidu 토큰이 null 또는 빈 문자열입니다. Sprint ID: {}, Team ID: {}", sprintId, teamId);
//            throw new IllegalStateException("OpenVidu 토큰 생성 실패");
//        }
//        if(redisTemplate.hasKey("token:" + sessionId + ":" + userTeam.getUser().getNickname())){
//            log.info("🎟 [이미 토큰이 존재합니다.] Sprint ID: {}, Team ID: {}, User: {}, Token: {}", sprintId, teamId, userTeam.getUser().getNickname(), redisTemplate.opsForValue().get("token:" + sessionId + ":" + userTeam.getUser().getNickname()));
//        }else{
//            redisTemplate.opsForValue().set("token:" + sessionId + ":" + userTeam.getUser().getNickname(), token, Duration.ofHours(12));
//            log.info("🎟 [토큰 발급 완료] Sprint ID: {}, Team ID: {}, User: {}, Token: {}", sprintId, teamId, userTeam.getUser().getNickname(), token);
//        }
//
//
//    }
 //   /** 🕒 새벽 2시: 발표할 스프린트 팀별 세션 ID 생성 */
//    @Scheduled(cron = "0 0 2 * * *")
//    public void createSprintSessions() throws OpenViduJavaClientException, OpenViduHttpException {
//        List<Sprint> sprints = sprintRepository.findAllByPresentationDate();
//
//        for (Sprint sprint : sprints) {
//            for (Team team : sprint.getTeams()) {
//                String sessionId = createSession(sprint.getId(), team.getId());
//                redisTemplate.opsForValue().set(
//                        "session:" + sprint.getId() + ":" + team.getId(), sessionId, Duration.ofHours(12)
//                );
//                log.info("✅ 세션 생성 완료 | Sprint: {}, Team: {}, Session ID: {}", sprint.getName(), team.getName(), sessionId);
//            }
//        }
//    }
//
//    /** 🕒 새벽 3시: 팀원들에게 토큰 발급 */
//    @Scheduled(cron = "0 0 3 * * *")
//    public void generateTokensForUsers() throws OpenViduJavaClientException, OpenViduHttpException {
//        List<Sprint> sprints = sprintRepository.findAllByPresentationDate();
//
//        for (Sprint sprint : sprints) {
//            for (Team team : sprint.getTeams()) {
//                String sessionId = redisTemplate.opsForValue().get("session:" + sprint.getId() + ":" + team.getId());
//                if (sessionId == null) {
//                    log.warn("🚨 세션이 존재하지 않음 | Sprint: {}, Team: {}", sprint.getName(), team.getName());
//                    continue;
//                }
//
//                for (UserTeam userTeam : team.getUserTeams()) {
//                    String token = createToken(sessionId);
//                    log.info("🎟 토큰 발급 완료 | Sprint: {}, Team: {}, User: {}, Token: {}", sprint.getName(), team.getName(), userTeam.getUser().getNickname(), token);
//                }
//            }
//        }
//    }
//
//
//    /** OpenVidu 세션 생성 */
//    public String createSession(Long sprintId, Long teamId) throws OpenViduJavaClientException, OpenViduHttpException {
//        Sprint sprint = sprintRepository.findById(sprintId)
//                .orElseThrow(() -> new IllegalArgumentException("스프린트가 존재하지 않습니다."));
//        Team team = teamRepository.findById(teamId)
//                .orElseThrow(() -> new IllegalArgumentException("팀이 존재하지 않습니다."));
//        LocalDate today = LocalDate.now();
//        LocalDate announceDate = sprint.getAnnounceAt().toLocalDate();
//
//        if (!today.isEqual(announceDate)) {
//            throw new IllegalStateException("발표 시간이 되지 않았습니다.");
//        }
//
//        SessionProperties properties = new SessionProperties.Builder()
//                .customSessionId("sprint_" + sprintId + "_team_" + teamId)
//                .build();
//        Session session = openvidu.createSession(properties);
//
//        return session.getSessionId();
//    }
//
//    /** OpenVidu 토큰 생성 */
//    public String createToken(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) {
//            throw new IllegalStateException("세션이 존재하지 않습니다.");
//        }
//
//        ConnectionProperties properties = new ConnectionProperties.Builder().build();
//        Connection connection = session.createConnection(properties);
//
//        return connection.getToken();
//    }

//    public String createSession(Long sprintId, Long teamId) throws OpenViduJavaClientException, OpenViduHttpException {
//        // 스프린트 및 팀 확인
//        Sprint sprint = sprintRepository.findById(sprintId)
//                .orElseThrow(() -> new IllegalArgumentException("스프린트가 존재하지 않습니다."));
//        Team team = teamRepository.findById(teamId)
//                .orElseThrow(() -> new IllegalArgumentException("팀이 존재하지 않습니다."));
//        LocalDate today = LocalDate.now();
//        LocalDate announceDate = sprint.getAnnounceAt().toLocalDate();
//
//        if (ChronoUnit.DAYS.between(today, announceDate) != 0) {
//            throw new IllegalStateException("발표 시간이 되지 않았습니다.");
//        }
//
//
//        // 세션 생성
//        Map<String, Object> params = new HashMap<>();
//        params.put("customSessionId", "sprint_" + sprintId + "_team_" + teamId);
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
//
//        return session.getSessionId();
//    }
//
//    public String createToken(Long sprintId, Long teamId) throws OpenViduJavaClientException, OpenViduHttpException {
//        //User user = userService.getAuthenticatedUserWithTeams();
//
//        // 해당 사용자가 팀에 속해 있는지 검증
//        Team team = teamRepository.findById(teamId).orElseThrow(() -> new IllegalArgumentException("해당 스프린트에 참여한 팀이 아닙니다."));
//
//        String sessionId = "sprint_" + sprintId + "_team_" + teamId;
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) {
//            throw new IllegalStateException("세션이 존재하지 않습니다.");
//        }
//
//        // 토큰 생성
//        ConnectionProperties properties = new ConnectionProperties.Builder().build();
//        Connection connection = session.createConnection(properties);
//
//        return connection.getToken();
//    }
}
