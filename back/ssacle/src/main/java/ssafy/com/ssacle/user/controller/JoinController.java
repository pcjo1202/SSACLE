package ssafy.com.ssacle.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.com.ssacle.global.jwt.JwtFilter;
import ssafy.com.ssacle.global.jwt.JwtTokenUtil;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.dto.JoinDTO;
import ssafy.com.ssacle.user.dto.LoginDTO;
import ssafy.com.ssacle.user.exception.CannotLoginException;
import ssafy.com.ssacle.user.service.JoinService;
import ssafy.com.ssacle.user.service.UserService;
import ssafy.com.ssacle.user.service.VerificationCodeService;

@RestController
@RequestMapping("/api/v1/join")
@RequiredArgsConstructor
public class JoinController implements JoinSwaggerController{
    private final JoinService joinService;
    private final VerificationCodeService verificationCodeService;

    @Override
    public ResponseEntity<String> sendVerificationCode(String email) {
        joinService.sendVerificationCode(email);
        return ResponseEntity.ok("Verification code sent.");
    }

    @Override
    public ResponseEntity<String> verifyCode(String email, String verificationCode) {
        boolean isValid = verificationCodeService.verifyCode(email, verificationCode);
        if (isValid) {
            return ResponseEntity.ok("Verification code confirmed.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code.");
    }

    @Override
    public ResponseEntity<Void> createUser(JoinDTO joinDTO) {
        joinService.join(joinDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @Override
    public ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam("email") String email) {
        return ResponseEntity.ok().body(joinService.isEmailDuplicate(email));
    }

    @Override
    public ResponseEntity<Boolean> checkPassword(@RequestParam("password") String password, @RequestParam("confirmpassword") String confirmpassword) {
        return ResponseEntity.ok().body(joinService.checkPassword(password,confirmpassword));
    }

    @Override
    public ResponseEntity<Boolean> checkNicknameDuplicate(@RequestParam("nickname") String nickname) {
        return ResponseEntity.ok().body(joinService.isNicknameDuplicate(nickname));
    }


}
