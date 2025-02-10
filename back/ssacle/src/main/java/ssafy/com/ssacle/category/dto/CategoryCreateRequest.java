package ssafy.com.ssacle.category.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryCreateRequest {
    private String parentCategoryName;
    private String categoryName; // 새 카테고리 이름
    private boolean isLeaf; // 최하위 카테고리 여부
    private String image; // 이미지 (중간 카테고리일 경우만 사용)
}

