
package ssafy.com.ssacle.presentation.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import ssafy.com.ssacle.global.exception.ErrorCode;

@Getter
@RequiredArgsConstructor
public enum PresentationErrorCode implements ErrorCode {

    PRESENTATION_ALREADY_ENDED(HttpStatus.BAD_REQUEST, "Presentation_400_4", "발표가 이미 종료되었습니다."),
    PRESENTATION_INVALID_STEP(HttpStatus.BAD_REQUEST, "Presentation_400_5", "잘못된 발표 상태 변경입니다. 단계별로 순차적으로만 진행 가능합니다."),
    INVALID_PRESENTATION_STATUS(HttpStatus.BAD_REQUEST, "Presentation_400_6", "현재 스프린트 상태에서는 질문 카드를 선택할 수 없습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
