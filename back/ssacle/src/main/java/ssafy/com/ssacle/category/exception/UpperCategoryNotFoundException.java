package ssafy.com.ssacle.category.exception;

import ssafy.com.ssacle.global.exception.SSACLEException;

public class UpperCategoryNotFoundException extends SSACLEException {
    public UpperCategoryNotFoundException() {
        super(CategoryErrorCode.UPPER_CATEGORY_NOT_FOUND);
    }
}
