package ssafy.com.ssacle.team.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.userteam.domain.UserTeam;

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
    private List<UserTeam> userTeams;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Sprint sprint;

    @Column(unique = true, nullable = false, length = 20)
    private String name;

    private int count;
    private boolean isFull;


}
