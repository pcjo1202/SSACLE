package ssafy.com.ssacle.team.exception;

import org.springframework.http.HttpStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ssafy.com.ssacle.global.exception.ErrorCode;

@Getter
@RequiredArgsConstructor
public enum TeamErrorCode implements ErrorCode {

    TEAM_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "TEAM_400_1", "팀을 생성하려면 팀 이름이 필요합니다."),
    USER_REQUIRED(HttpStatus.BAD_REQUEST, "TEAM_400_2", "팀을 생성하려면 유저가 필요합니다."),
    TEAM_NOT_FOUND(HttpStatus.BAD_REQUEST, "TEAM_400_3", "팀을 찾을수 없습니다."),
    UNAUTHORIZED_TEAM(HttpStatus.BAD_REQUEST, "TEAM_400_4", "해당 권한이 없습니다."),;

    private final HttpStatus status;
    private final String code;
    private final String message;
}
