package ssafy.com.ssacle.sprint.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.com.ssacle.todo.dto.DefaultTodoResponse;

import java.util.List;

@Getter
public class SprintDetailResponse {
    private final SingleSprintResponse sprint;
    private final List<DefaultTodoResponse> todos;

    @Builder
    public SprintDetailResponse(SingleSprintResponse sprint, List<DefaultTodoResponse> todos){
        this.sprint=sprint;
        this.todos=todos;
    }
}
