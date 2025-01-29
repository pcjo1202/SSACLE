package ssafy.com.ssacle.user.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.global.jwt.JwtFilter;
import ssafy.com.ssacle.global.jwt.JwtTokenUtil;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.dto.LoginDTO;
import ssafy.com.ssacle.user.exception.CannotLoginException;
import ssafy.com.ssacle.user.exception.LoginErrorCode;
import ssafy.com.ssacle.user.repository.UserRepository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    @Value("${spring.jwt.accessExpireMs}")
    private long accessExpireMs;

    @Value("${spring.jwt.refreshExpireMs}")
    private long refreshExpireMs;

    /** ✅ 로그인 및 Access/Refresh Token 생성 */
    @Transactional
    public String authenticateAndGenerateTokens(LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) {
        validateExistingTokens(request);

        User user = getAuthenticatedUser(loginDTO);
        String accessToken = jwtTokenUtil.generateAccessToken(user, accessExpireMs);
        String refreshToken = jwtTokenUtil.generateRefreshToken(user, refreshExpireMs);

        log.info("Access Token: {}", accessToken);
        log.info("Refresh Token: {}", refreshToken);

        setRefreshTokenCookie(response, refreshToken);
        response.setHeader("Authorization", "Bearer " + accessToken);

        return "로그인 성공";
    }

    /** ✅ Refresh Token을 사용해 Access Token 갱신 */
    @Transactional
    public String refreshAccessTokenFromRequest(HttpServletRequest request, HttpServletResponse response) {
        Cookie refreshTokenCookie = getRefreshTokenCookie(request);
        if (refreshTokenCookie == null) {
            throw new CannotLoginException(LoginErrorCode.REFRESH_TOKEN_NOT_FOUND);
        }

        return refreshAccessToken(refreshTokenCookie.getValue(), response);
    }

    /** ✅ Refresh Token 검증 후 Access Token 발급 */
    @Transactional
    public String refreshAccessToken(String refreshToken, HttpServletResponse response) {
        if (!jwtTokenUtil.isValidToken(refreshToken)) {
            throw new CannotLoginException(LoginErrorCode.INVALID_REFRESH_TOKEN);
        }

        String email = jwtTokenUtil.parseClaims(refreshToken).getSubject();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CannotLoginException(LoginErrorCode.USER_NOT_FOUND));

        String newAccessToken = jwtTokenUtil.generateAccessToken(user, accessExpireMs);
        response.setHeader("Authorization", "Bearer " + newAccessToken);
        return "Access token reissued successfully";
    }

    /** ✅ 기존 로그인된 사용자인지 검사 */
    private void validateExistingTokens(HttpServletRequest request) {
        String existingAccessToken = resolveToken(request);
        if (existingAccessToken != null && jwtTokenUtil.isValidToken(existingAccessToken)) {
            throw new CannotLoginException(LoginErrorCode.ALREADY_LOGGED_IN);
        }

        Cookie refreshTokenCookie = getRefreshTokenCookie(request);
        if (refreshTokenCookie != null && jwtTokenUtil.isValidToken(refreshTokenCookie.getValue())) {
            throw new CannotLoginException(LoginErrorCode.ALREADY_LOGGED_IN);
        }
    }

    /** ✅ 로그아웃 (Access Token + Refresh Token 무효화) */
    @Transactional
    public void logoutUser(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = resolveToken(request);
        Cookie refreshTokenCookie = getRefreshTokenCookie(request);

        // 🔹 로그아웃 여부 확인: Access Token 및 Refresh Token이 없는 경우 예외 발생
        if ((accessToken == null || !jwtTokenUtil.isValidToken(accessToken)) &&
                (refreshTokenCookie == null || !jwtTokenUtil.isValidToken(refreshTokenCookie.getValue()))) {
            throw new CannotLoginException(LoginErrorCode.ALREADY_LOGGED_OUT);
        }
        invalidateTokens(response);
    }

    /** ✅ Refresh Token을 쿠키에 저장 */
    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge((int) refreshExpireMs);
        response.addCookie(refreshCookie);
    }

    /** ✅ Access Token 및 Refresh Token 무효화 */
    private void invalidateTokens(HttpServletResponse response) {
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        response.addCookie(refreshCookie);
    }

    /** ✅ Request에서 Refresh Token 쿠키 가져오기 */
    private Cookie getRefreshTokenCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    return cookie;
                }
            }
        }
        return null;
    }

    /** ✅ Request에서 Access Token 추출 */
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /** ✅ 사용자 인증 */
    @Transactional
    public User getAuthenticatedUser(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new CannotLoginException(LoginErrorCode.USER_NOT_FOUND));

        if (!BCrypt.checkpw(loginDTO.getPassword(), user.getPassword())) {
            throw new CannotLoginException(LoginErrorCode.INVALID_PASSWORD);
        }
        return user;
    }
}
