package ssafy.com.ssacle.todo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.com.ssacle.gpt.dto.TodoResponse;
import ssafy.com.ssacle.todo.service.TodoService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/todos")
public class TodoController implements TodoSwaggerController{

    private final TodoService todoService;

    @Override
    public ResponseEntity<List<TodoResponse>> getTodoByTeamId(@PathVariable Long teamId) {
        List<TodoResponse> todos = todoService.getTodosByTeamId(teamId);
        return ResponseEntity.ok(todos);
    }
}
