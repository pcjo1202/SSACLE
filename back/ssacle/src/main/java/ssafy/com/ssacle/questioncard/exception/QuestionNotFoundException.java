package ssafy.com.ssacle.questioncard.exception;

import ssafy.com.ssacle.global.exception.SSACLEException;

public class QuestionNotFoundException extends SSACLEException {
    public QuestionNotFoundException(){
        super(QuestionErrorCode.QUESTION_NOT_FOUND);
    }
}
