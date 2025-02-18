package ssafy.com.ssacle.team.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import ssafy.com.ssacle.diary.domain.QDiary;
import ssafy.com.ssacle.team.domain.QTeam;
import ssafy.com.ssacle.team.dto.TeamDiaryResponse;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<TeamDiaryResponse> findTeamsWithDiaries(Pageable pageable) {
        QTeam team = QTeam.team;
        QDiary diary = QDiary.diary;

        // Step 1: 먼저 Team ID만 페이징 처리하여 조회
        List<Long> teamIds = queryFactory
                .select(team.id)
                .from(team)
                .orderBy(team.id.asc()) // teamId 기준 정렬
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        if (teamIds.isEmpty()) {
            return Page.empty(pageable);
        }

        // Step 2: 조회된 Team ID에 해당하는 Diary 데이터 가져오기
        List<TeamDiaryResponse> results = queryFactory
                .select(Projections.constructor(TeamDiaryResponse.class,
                        team.id,
                        diary.content
                ))
                .from(team)
                .leftJoin(diary).on(diary.team.eq(team))
                .where(team.id.in(teamIds))
                .orderBy(team.id.asc())
                .fetch();

        // Step 3: teamId를 기준으로 diary.content를 그룹핑
        Map<Long, TeamDiaryResponse> groupedResults = results.stream()
                .collect(Collectors.toMap(
                        TeamDiaryResponse::getTeamId,
                        response -> response,
                        (existing, newEntry) -> {
                            existing.addDiaryContent(newEntry.getDiaries().get(0));
                            return existing;
                        }
                ));

        // Step 4: 전체 팀 개수 조회 (teamId 기준)
        Long total = queryFactory
                .select(team.count())
                .from(team)
                .fetchOne();

        return PageableExecutionUtils.getPage(List.copyOf(groupedResults.values()), pageable, () -> total == null ? 0 : total);
    }
}
