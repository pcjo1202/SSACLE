package ssafy.com.ssacle.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginRequestDTO {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
