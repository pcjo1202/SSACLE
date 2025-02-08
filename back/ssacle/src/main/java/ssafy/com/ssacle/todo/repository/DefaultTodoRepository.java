package ssafy.com.ssacle.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.todo.domain.DefaultTodo;

public interface DefaultTodoRepository extends JpaRepository<DefaultTodo, Long> {
}
