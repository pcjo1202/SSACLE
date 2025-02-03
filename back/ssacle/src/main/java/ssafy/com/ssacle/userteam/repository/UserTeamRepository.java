package ssafy.com.ssacle.userteam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.team.domain.Team;

public interface UserTeamRepository extends JpaRepository<Team, Long> {
}
