package ssafy.com.ssacle.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.todo.domain.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
