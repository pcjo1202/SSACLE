package ssafy.com.ssacle.category.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import ssafy.com.ssacle.SprintCategory.domain.QSprintCategory;
import ssafy.com.ssacle.category.domain.QCategory;
import ssafy.com.ssacle.category.dto.CategoryNameAndLevelResponseDTO;

import java.util.List;

@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<CategoryNameAndLevelResponseDTO> findCategoryNamesBySprintId(Long sprintId) {
        QCategory category = QCategory.category;
        QSprintCategory sprintCategory = QSprintCategory.sprintCategory;

        return queryFactory
                .select(Projections.constructor(CategoryNameAndLevelResponseDTO.class,
                        category.categoryName,
                        category.level))
                .from(category)
                .join(sprintCategory).on(category.id.eq(sprintCategory.category.id))
                .where(sprintCategory.sprint.id.eq(sprintId))
                .orderBy(category.level.asc())
                .fetch();
    }
}
