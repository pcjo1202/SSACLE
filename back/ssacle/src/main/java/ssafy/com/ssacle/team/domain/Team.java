package ssafy.com.ssacle.team.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import ssafy.com.ssacle.global.exception.UtilErrorCode;
import ssafy.com.ssacle.global.utill.ValidationUtils;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.userteam.domain.UserTeam;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="team")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Team {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserTeam> userTeams = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    @JsonIgnore
    private Sprint sprint;

    @Column(unique = true, nullable = false, length = 20)
    private String name;

    @Column(name = "current_members", columnDefinition = "TINYINT UNSIGNED", nullable = false)
    private Integer currentMembers;

    @Column(name = "NotionURL")
    @Setter
    private String NotionURL;

    @Column(name = "point")
    @Setter
    private int point;

    public Team(String name, Integer currentMembers){
        ValidationUtils.validationCount(currentMembers, UtilErrorCode.MEMBER_VALIDATION_COUNT_FAILED);
        this.name=name;
        this.currentMembers = currentMembers;
    }

    public void addUser(User user){
        UserTeam userTeam = new UserTeam(user,this);
        this.userTeams.add(userTeam);
        user.addUserTeam(userTeam);
    }

}
