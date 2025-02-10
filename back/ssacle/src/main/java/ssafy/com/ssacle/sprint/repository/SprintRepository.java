package ssafy.com.ssacle.sprint.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.sprint.domain.Sprint;

import java.util.Optional;

public interface SprintRepository extends JpaRepository<Sprint, Long>, SprintRepositoryCustom {
    @EntityGraph(attributePaths = {"defaultTodos"})
    Optional<Sprint> findWithTodosById(Long id);
}
