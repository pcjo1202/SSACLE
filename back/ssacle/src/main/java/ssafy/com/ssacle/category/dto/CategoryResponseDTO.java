package ssafy.com.ssacle.category.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CategoryResponseDTO {
    @NotBlank
    private String categoryName;

    @NotBlank
    private String image;
}
