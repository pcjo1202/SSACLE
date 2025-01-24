package ssafy.com.ssacle.user.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;
import ssafy.com.ssacle.global.enumvalidator.EnumValue;
import ssafy.com.ssacle.user.domain.Role;

@Getter @Setter
@Builder
@Jacksonized
public class JoinDTO {
    @NotBlank(message = "username is required")
    private String username;
    @NotBlank(message = "password is required")
    private String password;
    @EnumValue(enumClass = Role.class, message = "Role must be one of USER, ADMIN, MODERATOR")
    private Role role;
    @NotBlank(message = "Name is required")
    private String name;
}
