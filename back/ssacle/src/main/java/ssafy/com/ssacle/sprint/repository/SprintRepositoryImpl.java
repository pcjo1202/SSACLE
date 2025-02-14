package ssafy.com.ssacle.sprint.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import ssafy.com.ssacle.SprintCategory.domain.QSprintCategory;
import ssafy.com.ssacle.category.domain.QCategory;
import ssafy.com.ssacle.sprint.domain.QSprint;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.team.domain.QTeam;

import java.util.List;
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

    @Override
    public Page<Sprint> findSprintsByStatus(Integer status, Pageable pageable) {
        QSprint sprint = QSprint.sprint;
        QSprintCategory sprintCategory = QSprintCategory.sprintCategory;
        QCategory category = QCategory.category;

        List<Sprint> results = queryFactory
                .select(sprint)
                .from(sprint)
                .leftJoin(sprint.sprintCategories, sprintCategory).fetchJoin()
                .leftJoin(sprintCategory.category, category).fetchJoin()
                .where(sprint.status.eq(status))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = Optional.ofNullable(queryFactory
                .select(sprint.count())
                .from(sprint)
                .leftJoin(sprint.sprintCategories, sprintCategory)
                .leftJoin(sprintCategory.category, category)
                .where(sprint.status.eq(status))
                .fetchOne()).orElse(0L);

        return PageableExecutionUtils.getPage(results, pageable, () -> total);
    }



    @Override
    public Page<Sprint> findSprintsByCategoryAndStatus(Long categoryId, Integer status, Pageable pageable) {
        QSprint sprint = QSprint.sprint;
        QSprintCategory sprintCategory = QSprintCategory.sprintCategory;
        QCategory category = QCategory.category;

        List<Sprint> results = queryFactory
                .select(sprint)
                .from(sprint)
                .leftJoin(sprint.sprintCategories, sprintCategory).fetchJoin()
                .leftJoin(sprintCategory.category, category).fetchJoin()
                .where(category.id.eq(categoryId)
                        .and(sprint.status.eq(status)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = Optional.ofNullable(queryFactory
                .select(sprint.count())
                .from(sprint)
                .leftJoin(sprint.sprintCategories, sprintCategory)
                .leftJoin(sprintCategory.category, category)
                .where(category.id.eq(categoryId)
                        .and(sprint.status.eq(status)))
                .fetchOne()).orElse(0L);

        return PageableExecutionUtils.getPage(results, pageable, () -> total);
    }


}
