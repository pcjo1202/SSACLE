package ssafy.com.ssacle.userteam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.com.ssacle.team.exception.UserNotInTeamException;
import ssafy.com.ssacle.userteam.repository.UserTeamRepository;

@Service
@RequiredArgsConstructor
public class UserTeamService {
    private final UserTeamRepository userTeamRepository;

    @Transactional(readOnly = true)
    public void isUserInTeam(Long userId, Long teamId) {
        boolean isUserParticipatedInTeam = userTeamRepository.existsByUserIdAndTeamId(userId, teamId);

        if(!isUserParticipatedInTeam){
            throw new UserNotInTeamException();
        }
    }
}
