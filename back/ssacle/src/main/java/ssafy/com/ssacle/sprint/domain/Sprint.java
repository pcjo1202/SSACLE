package ssafy.com.ssacle.sprint.domain;

import jakarta.persistence.*;
import lombok.*;
import ssafy.com.ssacle.global.exception.UtilErrorCode;
import ssafy.com.ssacle.global.utill.ValidationUtils;
import ssafy.com.ssacle.team.domain.Team;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Column(name = "detail", nullable = false)
    private String detail;

    @Column(name = "tags")
    private String tags;

    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name = "end_at", nullable = false)
    private LocalDateTime endAt;

    @Column(name = "announce_at", nullable = false)
    private LocalDateTime announceAt;

    @Column(name = "status", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer status;

    @Column(name = "sequence", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer sequence;

    @Column(name = "max_members", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer maxMembers;

    @Column(name = "current_members", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer currentMembers;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    protected Sprint(String name, String description, String detail, String tags, LocalDateTime startAt, LocalDateTime endAt, LocalDateTime announceAt, Integer status, Integer sequence, Integer maxMembers, Integer currentMembers, LocalDateTime createdAt){
        ValidationUtils.validationCount(status, UtilErrorCode.STATUS_VALIDATION_COUNT_FAILED);
        ValidationUtils.validationCount(sequence, UtilErrorCode.SEQUENCE_VALIDATION_COUNT_FAILED);
        ValidationUtils.validationCount(maxMembers, UtilErrorCode.MEMBER_VALIDATION_COUNT_FAILED);
        ValidationUtils.validationCount(currentMembers, UtilErrorCode.MEMBER_VALIDATION_COUNT_FAILED);

        this.name=name;
        this.description=description;
        this.detail=detail;
        this.tags=tags;
        this.startAt=startAt;
        this.endAt=endAt;
        this.announceAt=announceAt;
        this.status=status;
        this.sequence=sequence;
        this.maxMembers=maxMembers;
        this.currentMembers=currentMembers;
        this.createdAt=createdAt;
        this.teams = new ArrayList<>();
    }

    public void addTeam(Team team){
        this.teams.add(team);
        team.setSprint(this);
    }

}
