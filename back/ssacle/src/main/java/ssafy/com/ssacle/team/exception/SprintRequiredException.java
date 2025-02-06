package ssafy.com.ssacle.team.exception;

import ssafy.com.ssacle.global.exception.SSACLEException;

public class SprintRequiredException extends SSACLEException {
    public SprintRequiredException(){
        super(TeamErrorCode.SPRINT_REQUIRED);
    }
}
