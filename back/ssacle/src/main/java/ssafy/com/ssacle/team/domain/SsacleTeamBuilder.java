package ssafy.com.ssacle.team.domain;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.userteam.domain.UserTeam;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SsacleTeamBuilder {
    private Sprint sprint;
    private User user;
    private String teamName;

    public static SsacleTeamBuilder builder(){
        return new SsacleTeamBuilder();
    }

    public SsacleTeamBuilder addUser(User user){
        this.user=user;
        return this;
    }

    public SsacleTeamBuilder participateSprint(Sprint sprint){
        this.sprint=sprint;
        return this;
    }

    public SsacleTeamBuilder addTeamName(String teamName){
        this.teamName=teamName;
        return this;
    }

    public Team build(){
        if(teamName == null)
            throw new IllegalStateException("팀을 생성하려면 팀 이름이 필요합니다.");
        if(user == null)
            throw new IllegalStateException("팀을 생성하려면 유저가 필요합니다.");
        if(sprint == null)
            throw new IllegalStateException("팀을 생성하려면 스프린트가 필요합니다.");

        Team team = new Team(teamName,1);
        team.addUser(user);
        sprint.addTeam(team);

        return team;
    }
}
