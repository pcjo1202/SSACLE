package ssafy.com.ssacle.category.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import ssafy.com.ssacle.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum CategoryErrorCode implements ErrorCode {
    UPPER_CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "CATEGORY_400_1", "해당하는 상위 카테고리가 존재하지 않습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
