package ssafy.com.ssacle.sprint.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import ssafy.com.ssacle.sprint.domain.QSprint;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.team.domain.QTeam;

import java.util.Optional;

@RequiredArgsConstructor
public class SprintRepositoryImpl implements SprintRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Sprint> findByIdWithTeams(Long sprintId) {
        QSprint sprint = QSprint.sprint;
        QTeam team = QTeam.team;

        Sprint result = queryFactory
                .selectFrom(sprint)
                .leftJoin(sprint.teams, team).fetchJoin()
                .where(sprint.id.eq(sprintId))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}
