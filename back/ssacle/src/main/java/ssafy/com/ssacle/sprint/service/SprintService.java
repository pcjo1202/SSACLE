package ssafy.com.ssacle.sprint.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.SprintCategory.domain.SprintCategory;
import ssafy.com.ssacle.SprintCategory.repository.SprintCategoryRepository;
import ssafy.com.ssacle.category.domain.Category;
import ssafy.com.ssacle.category.dto.CategoryResponse;
import ssafy.com.ssacle.category.repository.CategoryRepository;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.domain.SprintBuilder;
import ssafy.com.ssacle.sprint.dto.SingleSprintResponse;
import ssafy.com.ssacle.sprint.dto.SprintCreateRequest;
import ssafy.com.ssacle.sprint.dto.SprintDetailResponse;
import ssafy.com.ssacle.sprint.dto.SprintResponse;
import ssafy.com.ssacle.sprint.exception.SprintNotExistException;
import ssafy.com.ssacle.sprint.repository.SprintRepository;
import ssafy.com.ssacle.team.domain.SprintTeamBuilder;
import ssafy.com.ssacle.team.domain.Team;
import ssafy.com.ssacle.team.repository.TeamRepository;
import ssafy.com.ssacle.todo.domain.DefaultTodo;
import ssafy.com.ssacle.todo.domain.QDefaultTodo;
import ssafy.com.ssacle.todo.dto.DefaultTodoResponse;
import ssafy.com.ssacle.todo.repository.DefaultTodoRepository;
import ssafy.com.ssacle.user.domain.User;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SprintService {
    private final SprintRepository sprintRepository;
    private final CategoryRepository categoryRepository;
    private final TeamRepository teamRepository;
    private final SprintCategoryRepository sprintCategoryRepository;

    @Transactional
    public SprintResponse createSprint(SprintCreateRequest request) {
        Sprint sprint = SprintBuilder.builder()
                .name(request.getName())
                .basicDescription(request.getBasicDescription())
                .detailDescription(request.getDetailDescription())
                .recommendedFor(request.getRecommendedFor())
                .startAt(request.getStartAt())
                .endAt(request.getEndAt())
                .announceAt(request.getAnnounceAt())
                .maxMembers(request.getMaxMembers())
                .defaultTodos(request.getTodos())
                .build();

        sprintRepository.save(sprint);

        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            List<Category> categories = categoryRepository.findAllById(request.getCategoryIds());
            categories.forEach(category -> {
                SprintCategory sprintCategory = new SprintCategory(sprint, category);
                sprintCategoryRepository.save(sprintCategory);
            });
        }

        return new SprintResponse("싸프린트가 성공적으로 생성되었습니다.", sprint.getId());
    }

    @Transactional
    public void joinSprint(Long sprintId, User user) {
        Sprint sprint = sprintRepository.findByIdWithTeams(sprintId)
                .orElseThrow(SprintNotExistException::new);

        Team team = SprintTeamBuilder.builder()
                .addUser(user)
                .participateSprint(sprint)
                .build();

        teamRepository.save(team);
    }

    public SingleSprintResponse getSprintById(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(SprintNotExistException::new);

        return SingleSprintResponse.from(sprint);
    }

    @Transactional
    public Page<Sprint> getSprintsByStatus(Integer status, Pageable pageable) {
        return sprintRepository.findSprintsByStatus(status, pageable);
    }

    @Transactional
    public Page<Sprint> getSprintsByCategoryAndStatus(Long categoryId, Integer status, Pageable pageable) {
        return sprintRepository.findSprintsByCategoryAndStatus(categoryId, status, pageable);
    }

    public SprintDetailResponse getSprintDetail(Long sprintId) {
        // Sprint 기본 정보 가져오기 (defaultTodos 없이)
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(SprintNotExistException::new);

        // defaultTodos 조회
        List<DefaultTodo> defaultTodos = sprintRepository.findWithDefaultTodosById(sprintId)
                .map(Sprint::getDefaultTodos)
                .orElse(Collections.emptyList());

        // sprintCategories 조회
        List<SprintCategory> sprintCategories = sprintRepository.findWithSprintCategoriesById(sprintId)
                .map(Sprint::getSprintCategories)
                .orElse(Collections.emptyList());

        // 변환 작업 수행
        SingleSprintResponse sprintResponse = SingleSprintResponse.from(sprint);
        List<DefaultTodoResponse> todos = DefaultTodoResponse.fromEntities(defaultTodos);
        List<CategoryResponse> categories = sprintCategories.stream()
                .map(sprintCategory -> CategoryResponse.from(sprintCategory.getCategory()))
                .toList();

        return SprintDetailResponse.builder()
                .sprint(sprintResponse)
                .todos(todos)
                .categories(categories)
                .build();
    }

}
