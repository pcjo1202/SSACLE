package ssafy.com.ssacle.sprint.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
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
    public Page<Sprint> findSprintsByLeafCategory(String leafCategoryName, Pageable pageable) {
        QSprint sprint = QSprint.sprint;
        QCategory category = QCategory.category;

        List<Sprint> results = queryFactory
                .selectDistinct(sprint)
                .from(sprint)
                .join(sprint.categories, category)
                .where(category.categoryName.eq(leafCategoryName))  // 최하위 카테고리만 필터링
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = Optional.ofNullable(queryFactory
                        .select(sprint.count())
                        .from(sprint)
                        .join(sprint.categories, category)
                        .where(category.categoryName.eq(leafCategoryName))
                        .fetchOne())
                .orElse(0L);

        return PageableExecutionUtils.getPage(results, pageable, () -> total);
    }
}
