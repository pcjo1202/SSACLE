package ssafy.com.ssacle.sprint.domain;

import ssafy.com.ssacle.todo.domain.DefaultTodo;
import ssafy.com.ssacle.todo.dto.TodoRequest;

import java.time.LocalDateTime;
import java.util.List;

public class SprintBuilder {
    private String name;
    private String basicDescription;
    private String detailDescription;
    private String tags;
    private String recommendedFor;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime announceAt;
    private Integer maxMembers;
    private List<TodoRequest> defaultTodoRequests;

    public static SprintBuilder builder() {
        return new SprintBuilder();
    }

    public SprintBuilder name(String name){
        this.name = name;
        return this;
    }
    public SprintBuilder basicDescription(String basicDescription){
        this.basicDescription = basicDescription;
        return this;
    }
    public SprintBuilder detailDescription(String detailDescription){
        this.detailDescription = detailDescription;
        return this;
    }
    public SprintBuilder recommendedFor(String recommendedFor){
        this.recommendedFor = recommendedFor;
        return this;
    }
    public SprintBuilder startAt(LocalDateTime startAt){
        this.startAt = startAt;
        return this;
    }
    public SprintBuilder endAt(LocalDateTime endAt){
        this.endAt = endAt;
        return this;
    }
    public SprintBuilder announceAt(LocalDateTime announceAt){
        this.announceAt = announceAt;
        return this;
    }
    public SprintBuilder tags(String tags){
        this.tags = tags;
        return this;
    }
    public SprintBuilder maxMembers(Integer maxMembers){
        this.maxMembers = maxMembers;
        return this;
    }

    public SprintBuilder defaultTodos(List<TodoRequest> defaultTodoRequests) {
        this.defaultTodoRequests = defaultTodoRequests;
        return this;
    }

    public Sprint build(){
        Sprint sprint = new Sprint(name, basicDescription, detailDescription, tags, recommendedFor, startAt, endAt, announceAt, 0, 1, maxMembers, 1, LocalDateTime.now());

        if (defaultTodoRequests != null && !defaultTodoRequests.isEmpty()) {
            List<DefaultTodo> defaultTodos = defaultTodoRequests.stream()
                    .flatMap(todoRequest -> todoRequest.toEntity(sprint).stream())
                    .toList();
            defaultTodos.forEach(sprint::addDefaultTodo);
        }

        return sprint;
    }
}
