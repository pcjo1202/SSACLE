package ssafy.com.ssacle.sprint.dto;

import lombok.Getter;
import ssafy.com.ssacle.todo.dto.TodoRequest;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class SprintCreateRequest {
    private String name;
    private String description;
    private String detail;
    private String tags;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime announceAt;
    private Integer maxMembers;
    private List<TodoRequest> todos;
}
