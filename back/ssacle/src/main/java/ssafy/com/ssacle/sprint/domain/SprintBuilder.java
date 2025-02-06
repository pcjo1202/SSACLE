package ssafy.com.ssacle.sprint.domain;

import java.time.LocalDateTime;

public class SprintBuilder {
    private String name;
    private String description;
    private String detail;
    private String tags;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime announceAt;
    private Integer maxMembers;

    public static SprintBuilder builder() {
        return new SprintBuilder();
    }

    public SprintBuilder name(String name){
        this.name = name;
        return this;
    }
    public SprintBuilder description(String description){
        this.description = description;
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
    public SprintBuilder detail(String detail){
        this.detail = detail;
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

    public Sprint build(){
        return new Sprint(name, description, detail, tags, startAt, endAt, announceAt, 0, 1, maxMembers, 1, LocalDateTime.now());
    }
}
