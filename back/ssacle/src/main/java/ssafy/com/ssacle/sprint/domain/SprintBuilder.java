package ssafy.com.ssacle.sprint.domain;

import java.time.LocalDateTime;

public class SprintBuilder {
    private String name;
    private String description;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime announcementDateTime;
    private String detailTopic;
    private String tag;
    private Integer maxTeams;

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
    public SprintBuilder announcementDateTime(LocalDateTime announcementDateTime){
        this.announcementDateTime = announcementDateTime;
        return this;
    }
    public SprintBuilder detailTopic(String detailTopic){
        this.detailTopic = detailTopic;
        return this;
    }
    public SprintBuilder tag(String tag){
        this.tag = tag;
        return this;
    }
    public SprintBuilder maxTeams(Integer maxTeams){
        this.maxTeams = maxTeams;
        return this;
    }

    public Sprint build(){
        return new Sprint(name, description, startAt, endAt, announcementDateTime, 1, maxTeams, detailTopic, LocalDateTime.now(), 1, tag);
    }
}
