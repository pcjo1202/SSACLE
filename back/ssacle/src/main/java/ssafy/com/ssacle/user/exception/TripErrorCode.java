package ssafy.com.ssacle.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import ssafy.com.ssacle.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum TripErrorCode implements ErrorCode {
    JOIN_CANNOT(HttpStatus.BAD_REQUEST,"JOIN_400_1", "Cannot Join");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
