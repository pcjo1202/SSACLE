package ssafy.com.ssacle.questioncard.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionCardRequest {
    @NotNull
    private Long sprintId;

    @NotNull
    private String description;

    private boolean isOpened;
}
