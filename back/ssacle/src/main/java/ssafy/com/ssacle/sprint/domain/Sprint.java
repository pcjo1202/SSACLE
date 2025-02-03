package ssafy.com.ssacle.sprint.domain;

import jakarta.persistence.*;
import lombok.*;
import ssafy.com.ssacle.global.exception.UtilErrorCode;
import ssafy.com.ssacle.global.utill.ValidationUtils;
import ssafy.com.ssacle.team.domain.Team;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "sprint")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sprint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "sprint")
    private List<Team> teams;

    @Column(name = "name", nullable = false, length=25)
    private String name;

    @Column(name = "description", nullable = false, length=100)
    private String description;

    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name = "end_at", nullable = false)
    private LocalDateTime endAt;

    @Column(name = "announcement_date_time", nullable = false)
    private LocalDateTime announcementDateTime;

    @Column(name = "max_members", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer maxMembers;

    @Column(name = "current_members", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer maxTeams;

    @Column(name = "detail_topic", nullable = false)
    private String detailTopic;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "sequence", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer sequence;

    @Column(name = "tag")
    private String tag;

    private Sprint(String name, String description, LocalDateTime startAt, LocalDateTime endAt, LocalDateTime announcementDateTime, Integer maxMembers, Integer maxTeams, String detailTopic, LocalDateTime createdAt, Integer sequence, String tag){
        ValidationUtils.validationCount(maxMembers, UtilErrorCode.MEMBER_VALIDATION_COUNT_FAILED);
        ValidationUtils.validationCount(maxTeams, UtilErrorCode.TEAM_VALIDATION_COUNT_FAILED);
        ValidationUtils.validationCount(sequence, UtilErrorCode.SEQUENCE_VALIDATION_COUNT_FAILED);

        this.name=name;
        this.description=description;
        this.startAt=startAt;
        this.endAt=endAt;
        this.announcementDateTime=announcementDateTime;
        this.maxMembers=maxMembers;
        this.maxTeams=maxTeams;
        this.detailTopic=detailTopic;
        this.createdAt=createdAt;
        this.sequence=sequence;
        this.tag=tag;
    }
    public static class SsaprintBuilder{
        private String name;
        private String description;
        private LocalDateTime startAt;
        private LocalDateTime endAt;
        private LocalDateTime announcementDateTime;
        private String detailTopic;
        private String tag;
        private Integer maxTeams;

        public SsaprintBuilder name(String name){
            this.name=name;
            return this;
        }
        public SsaprintBuilder description(String description){
            this.description=description;
            return this;
        }
        public SsaprintBuilder startAt(LocalDateTime startAt){
            this.startAt=startAt;
            return this;
        }
        public SsaprintBuilder endAt(LocalDateTime endAt){
            this.endAt=endAt;
            return this;
        }
        public SsaprintBuilder announcementDateTime(LocalDateTime announcementDateTime){
            this.announcementDateTime=announcementDateTime;
            return this;
        }
        public SsaprintBuilder detailTopic(String detailTopic){
            this.detailTopic=detailTopic;
            return this;
        }
        public SsaprintBuilder tag(String tag){
            this.tag=tag;
            return this;
        }
        public SsaprintBuilder maxTeams(Integer maxTeams){
            this.maxTeams = maxTeams;
            return this;
        }
        public Sprint build(){
            return new Sprint(name, description, startAt, endAt, announcementDateTime, 1, maxTeams, detailTopic, LocalDateTime.now(), 1, tag);
        }
    }

    public static SsaprintBuilder ssaprintBuilder(){return new SsaprintBuilder();}

}
