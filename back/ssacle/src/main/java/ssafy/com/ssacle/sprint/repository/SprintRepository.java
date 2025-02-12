package ssafy.com.ssacle.sprint.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.com.ssacle.sprint.domain.Sprint;

import java.util.List;
import java.util.Optional;

public interface SprintRepository extends JpaRepository<Sprint, Long>, SprintRepositoryCustom {
    @EntityGraph(attributePaths = {"defaultTodos"})
    Optional<Sprint> findWithTodosById(Long id);

    @Query("SELECT s FROM Sprint s LEFT JOIN FETCH s.teams")
    List<Sprint> findAllWithTeams();
}
