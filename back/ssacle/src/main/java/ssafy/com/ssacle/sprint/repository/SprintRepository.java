package ssafy.com.ssacle.sprint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.team.domain.Team;

import java.util.List;
import java.util.Optional;

public interface SprintRepository extends JpaRepository<Sprint, Long>, SprintRepositoryCustom {

    @Query("SELECT s FROM Sprint s JOIN FETCH s.defaultTodos WHERE s.id = :id")
    Optional<Sprint> findWithDefaultTodosById(@Param("id") Long id);

    @Query("SELECT s FROM Sprint s JOIN FETCH s.sprintCategories sc JOIN FETCH sc.category WHERE s.id = :id")
    Optional<Sprint> findWithSprintCategoriesById(@Param("id") Long id);

    List<Sprint> findByStatus(int status);

    @Query("SELECT t FROM Sprint s JOIN s.teams t WHERE s.status = :status")
    List<Team> findTeamsByStatus(int status);
}
