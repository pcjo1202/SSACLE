package ssafy.com.ssacle.category.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryCreateRequest {
    private String image; // 이미지 (중간 카테고리일 경우만 사용)
}
