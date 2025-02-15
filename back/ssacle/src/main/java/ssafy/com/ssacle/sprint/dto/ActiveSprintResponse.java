package ssafy.com.ssacle.sprint.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.com.ssacle.category.dto.CategoryResponse;
import ssafy.com.ssacle.diary.dto.DiaryResponseDTO;
import ssafy.com.ssacle.gpt.dto.TodoResponse;
import ssafy.com.ssacle.questioncard.dto.QuestionCardResponse;
import ssafy.com.ssacle.team.dto.TeamResponse;

import java.util.List;

@Getter
public class ActiveSprintResponse {
    private final SingleSprintResponse sprint;
    private final List<CategoryResponse> categories;
    private final List<QuestionCardResponse> questionCards;
    private final TeamResponse team;
    private final List<TodoResponse> todos;
    private final List<DiaryResponseDTO> diaries;

    @Builder
    public ActiveSprintResponse(SingleSprintResponse sprint, List<CategoryResponse> categories,
                                List<QuestionCardResponse> questionCards, TeamResponse team,
                                List<TodoResponse> todos, List<DiaryResponseDTO> diaries) {
        this.sprint = sprint;
        this.categories = categories;
        this.questionCards = questionCards;
        this.team = team;
        this.todos = todos;
        this.diaries = diaries;
    }
}
