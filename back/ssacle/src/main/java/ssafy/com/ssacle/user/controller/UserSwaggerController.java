package ssafy.com.ssacle.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import ssafy.com.ssacle.user.dto.JoinDTO;
import ssafy.com.ssacle.user.dto.LoginDTO;

@Tag(name = "User API", description = "회원 API입니다.")
public interface UserSwaggerController {

    @Operation(summary = "이메일 인증 코드 전송", description = "입력한 이메일로 인증 코드를 전송합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "인증 코드가 이메일로 전송되었습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 이메일 형식입니다.", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생", content = @Content)
    })
    @Parameters(value = {
            @Parameter(name = "email", description = "사용자 이메일", example = "spancer1@naver.com")
    })
    @PostMapping("/send-verification")
    ResponseEntity<String> sendVerificationCode(@RequestParam("email") String email);

    @Operation(summary = "재학생 회원 가입", description = "재학생 회원을 등록합니다.")
    @ApiResponse(responseCode = "201", description = "회원 가입에 성공하였습니다.")
    @Parameters(value = {
            @Parameter(name="verificationCode", description = "인증 코드")
    })
    @PostMapping("/student/signup")
    ResponseEntity<Void> createStudent(@RequestBody @Valid JoinDTO joinDTO, @RequestParam("verificationCode") String verificationCode);

    @Operation(summary = "졸업생 회원 가입", description = "졸업생 회원을 등록합니다.")
    @ApiResponse(responseCode = "201", description = "회원 가입에 성공하였습니다.")
    @Parameters(value = {
            @Parameter(name="verificationCode", description = "인증 코드")
    })
    @PostMapping("/alumni/signup")
    ResponseEntity<Void> createAlumni(@RequestBody @Valid JoinDTO joinDTO, @RequestParam("verificationCode") String verificationCode);

    @Operation(summary = "관리자 회원 가입", description = "관리자 회원을 등록합니다.")
    @ApiResponse(responseCode = "201", description = "회원 가입에 성공하였습니다.")
    @Parameters(value = {
            @Parameter(name="verificationCode", description = "인증 코드")
    })
    @PostMapping("/admin/signup")
    ResponseEntity<Void> createAdmin(@RequestBody @Valid JoinDTO joinDTO, @RequestParam("verificationCode") String verificationCode);

    @Operation(summary="로그인", description= "사용자가 로그인 시 사용되는 api입니다.")
    @ApiResponse(responseCode = "201", description = "로그인에 성공하였습니다.")
    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody @Valid LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response);

    @Operation(summary = "로그아웃", description = "현재 로그인된 사용자를 로그아웃합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃에 성공했습니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다.", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 에러 발생", content = @Content)
    })
    @PostMapping("/logout")
    ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response);

    @Operation(summary = "이메일 중복 확인", description = "입력한 이메일이 이미 등록되어 있는지 확인합니다.")
    @ApiResponse(responseCode = "200", description = "이메일 중복 확인에 성공하였습니다.")
    @Parameters(value = {
            @Parameter(name="email", description = "사용자 이메일", example = "spancer1@naver.com")
    })
    @GetMapping("/check-email")
    ResponseEntity<Boolean> checkEmailDuplicate(@RequestParam("email") String email);

    @Operation(summary = "비밀번호 일치 확인", description = "입력한 비밀번호와 확인용 비빌번호가 일치하는지 확인합니다")
    @ApiResponse(responseCode = "200", description = "비밀번호 확인에 성공하였습니다.")
    @Parameters(value = {
            @Parameter(name="password", description = "비밀번호", example = "rlatngus@1"),
            @Parameter(name="confirmpassword", description = "확인용 비밀번호", example = "rlatngus@1")
    })
    @GetMapping("/check-password")
    ResponseEntity<Boolean> checkPassword(@RequestParam("password") String password, @RequestParam("confirmpassword") String confirmpassword);

    @Operation(summary = "닉네임 중복 확인", description = "입력한 닉네임이 이미 등록되어 있는지 확인합니다")
    @ApiResponse(responseCode = "200", description = "닉네임 중복 확인에 성공하였습니다.")
    @Parameters(value = {
            @Parameter(name="nickname", description = "닉네임", example = "KSH00610")
    })
    @GetMapping("/check-nickname")
    ResponseEntity<Boolean> checkNicknameDuplicate(@RequestParam("nickname") String nickname);

    @Operation(
            summary = "Access Token 재발급",
            description = "Refresh Token을 이용하여 새로운 Access Token을 발급합니다. " +
                    "Refresh Token이 유효하면 새로운 Access Token을 반환하고, " +
                    "유효하지 않으면 401 응답을 반환합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "새로운 Access Token이 발급되었습니다."),
            @ApiResponse(responseCode = "401", description = "Refresh Token이 만료되었거나 유효하지 않습니다.", content = @Content),
            @ApiResponse(responseCode = "400", description = "Refresh Token이 요청에 포함되지 않았습니다.", content = @Content)
    })
    @PostMapping("/refresh-token")
    ResponseEntity<String> refreshAccessToken(HttpServletRequest request, HttpServletResponse response);
}
