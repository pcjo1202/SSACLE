package ssafy.com.ssacle.sprint.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.com.ssacle.diary.repository.DiaryRepository;
import ssafy.com.ssacle.team.domain.Team;
import ssafy.com.ssacle.todo.repository.TodoRepository;

@Service
@RequiredArgsConstructor
public class PresentationService {
    private final TodoRepository todoRepository;
    private final DiaryRepository diaryRepository;

    private static final double TODO_WEIGHT = 25.0;
    private static final double DIARY_WEIGHT = 25.0;
    private static final double JUDGE_WEIGHT = 50.0;
    private static final String DEFAULT_DIARY_MESSAGE = "오늘 하루 쉬었으니 내일 더 열심히 해야 되겠다!";

    @Transactional
    public void calculateFinalScore(Team team, Long sprintId, double judgeScore) {
        double totalPoint = calculateTodoCompletionRate(sprintId)
                + calculateDiaryCompletionRate(sprintId)
                + (judgeScore / 100.0) * JUDGE_WEIGHT;

        team.setPoint(team.getPoint() + (int) totalPoint);
    }

    private double calculateTodoCompletionRate(Long sprintId) {
        long totalTodos = todoRepository.countAllTodosBySprint(sprintId);
        long completedTodos = todoRepository.countCompletedTodosBySprint(sprintId);

        if (totalTodos == 0) {
            return 0.0;
        }

        return ((double) completedTodos / totalTodos) * TODO_WEIGHT;
    }

    private double calculateDiaryCompletionRate(Long sprintId) {
        long totalDiaries = diaryRepository.countAllDiariesBySprint(sprintId);
        long writtenDiaries = diaryRepository.countWrittenDiariesBySprint(sprintId, DEFAULT_DIARY_MESSAGE);

        if (totalDiaries == 0) {
            return 0.0;
        }

        return ((double) writtenDiaries / totalDiaries) * DIARY_WEIGHT;
    }
}
