package ssafy.com.ssacle.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckEmailDTO {
    @Schema(description = "사용자  이메일", example = "spancer1@naver.com")
    private String email;
}
