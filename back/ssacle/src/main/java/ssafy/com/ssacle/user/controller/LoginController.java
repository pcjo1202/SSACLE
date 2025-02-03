package ssafy.com.ssacle.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.com.ssacle.user.dto.FindEmailDTO;
import ssafy.com.ssacle.user.dto.FindPasswordDTO;
import ssafy.com.ssacle.user.dto.LoginDTO;
import ssafy.com.ssacle.user.service.UserService;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LoginController implements LoginSwaggerController{
    private final UserService userService;

    @Override
    public ResponseEntity<String> login(@RequestBody @Valid LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) {
        String result = userService.authenticateAndGenerateTokens(loginDTO, request, response);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        userService.logoutUser(request, response);
        return ResponseEntity.ok("Logged out successfully");
    }

    @Override
    public ResponseEntity<String> findEmail(FindEmailDTO findEmailDTO) {
        String email = userService.findEmailByStudentNumber(findEmailDTO);
        return ResponseEntity.ok(email);
    }

    @Override
    public ResponseEntity<String> findPassword(FindPasswordDTO findPasswordDTO) {
        String password = userService.findPasswordByEmailAndStudentNumber(findPasswordDTO);
        return ResponseEntity.ok(password);
    }
}
