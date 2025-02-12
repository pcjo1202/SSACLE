package ssafy.com.ssacle.questioncard.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class QuestionCardRequest {
    @NotNull
    private Long sprintId;

    @NotNull
    private String description;

    private boolean isOpened;
}
