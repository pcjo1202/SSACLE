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

        List<Sprint> results = queryFactory
                .selectFrom(sprint)
                .where(sprint.status.eq(status)) // 상태 필터링
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = Optional.ofNullable(queryFactory
                        .select(sprint.count())
                        .from(sprint)
                        .where(sprint.status.eq(status))
                        .fetchOne())
                .orElse(0L);

        return PageableExecutionUtils.getPage(results, pageable, () -> total);
    }

    @Override
    public Page<Sprint> findSprintsByCategoryAndStatus(Long categoryId, Integer status, Pageable pageable) {
        QSprint sprint = QSprint.sprint;
        QSprintCategory sprintCategory = QSprintCategory.sprintCategory;
        QCategory category = QCategory.category;

        List<Sprint> results = queryFactory
                .selectDistinct(sprint)
                .from(sprint)
                .join(sprintCategory).on(sprintCategory.sprint.eq(sprint)) // 중간 테이블 조인
                .join(sprintCategory.category, category) // 카테고리 조인
                .where(category.id.eq(categoryId) // categoryId 조건 추가
                        .and(sprint.status.eq(status))) // status 조건 추가
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = Optional.ofNullable(queryFactory
                        .select(sprint.count())
                        .from(sprint)
                        .join(sprintCategory).on(sprintCategory.sprint.eq(sprint))
                        .join(sprintCategory.category, category)
                        .where(category.id.eq(categoryId)
                                .and(sprint.status.eq(status)))
                        .fetchOne())
                .orElse(0L);

        return PageableExecutionUtils.getPage(results, pageable, () -> total);
    }

}
