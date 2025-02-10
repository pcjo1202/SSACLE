package ssafy.com.ssacle.category.dto;

import lombok.Builder;
import lombok.Getter;
import ssafy.com.ssacle.category.domain.Category;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class CategoryTreeResponseDTO {
    private String categoryName;
    private List<CategoryTreeResponseDTO> subCategories;

    // ✅ Entity 리스트 → 트리 구조 DTO 변환 메서드
    public static List<CategoryTreeResponseDTO> from(List<Category> categories) {
        return categories.stream()
                .filter(category -> category.getParent() == null) // 최상위 카테고리만 필터링
                .map(CategoryTreeResponseDTO::convertToTree)
                .collect(Collectors.toList());
    }

    // ✅ 트리 구조를 만들기 위한 재귀 메서드
    private static CategoryTreeResponseDTO convertToTree(Category category) {
        return CategoryTreeResponseDTO.builder()
                .categoryName(category.getCategoryName())
                .subCategories(category.getChildren().stream()
                        .map(CategoryTreeResponseDTO::convertToTree)
                        .collect(Collectors.toList()))
                .build();
    }
}
