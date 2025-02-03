package ssafy.com.ssacle.team.repository;

import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.team.domain.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
