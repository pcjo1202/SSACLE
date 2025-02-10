package ssafy.com.ssacle.category.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import ssafy.com.ssacle.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum CategoryErrorCode implements ErrorCode {
    TOP_CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "CATEGORY_400_1", "해당하는 최상위 카테고리가 존재하지 않습니다."),
    MIDDLE_CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "CATEGORY_400_2", "해당하는 중간 카테고리가 존재하지 않습니다."),
    CATEGORY_NOT_EXIST(HttpStatus.BAD_REQUEST, "CATEGORY_400_3", "잘못된 데이터 입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
