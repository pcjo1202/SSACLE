package ssafy.com.ssacle.sprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.sprint.domain.Sprint;

import java.util.List;

public interface SprintRepository extends JpaRepository<Sprint, Long>, SprintRepositoryCustom {
}
