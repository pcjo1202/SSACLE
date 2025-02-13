package ssafy.com.ssacle.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.team.domain.Team;
import ssafy.com.ssacle.todo.domain.Todo;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>, TodoRepositoryCustom{
    List<Todo> findByTeam(Team team);
}
