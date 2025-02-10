package ssafy.com.ssacle.lunch.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.com.ssacle.lunch.domain.Lunch;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LunchResponseDTO {
    protected String menuName;

    protected String imageUrl;
    public LunchResponseDTO(Lunch lunch){
        this.menuName=lunch.getMenuName();
        this.imageUrl=lunch.getImageUrl();
    }
}
