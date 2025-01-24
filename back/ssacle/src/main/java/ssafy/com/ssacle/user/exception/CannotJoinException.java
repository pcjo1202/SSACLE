package ssafy.com.ssacle.user.exception;

import ssafy.com.ssacle.global.exception.SSACLEException;

public class CannotJoinException extends SSACLEException {
    public CannotJoinException(){
        super(TripErrorCode.JOIN_CANNOT);
    }
}
