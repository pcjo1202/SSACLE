package ssafy.com.ssacle.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.user.domain.Role;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.dto.JoinDTO;
import ssafy.com.ssacle.user.exception.CannotJoinException;
import ssafy.com.ssacle.user.exception.JoinErrorCode;
import ssafy.com.ssacle.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class JoinService {
    private final UserRepository userRepository;
    private final MattermostService mattermostService;
    private final VerificationCodeService verificationCodeService;
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    public void sendVerificationCode(String email) {
        if (!email.matches(EMAIL_REGEX)) {
            throw new CannotJoinException(JoinErrorCode.INVALID_EMAIL_FORMAT);
        }
        String code = verificationCodeService.generateVerificationCode(email);
        mattermostService.sendVerificationCode(email, code);
    }
    public void joinStudent(JoinDTO joinDTO, String verificationCode){
        verifyCodeBeforeJoin(joinDTO.getEmail(), verificationCode);
        joinProcess(joinDTO);
        User user  = User.createStudent(joinDTO.getEmail(), joinDTO.getPassword(), joinDTO.getName(), joinDTO.getStudentNumber(), joinDTO.getNickname());

        userRepository.save(user);
    }

    public void joinAlumni(JoinDTO joinDTO, String verificationCode){
        verifyCodeBeforeJoin(joinDTO.getEmail(), verificationCode);
        joinProcess(joinDTO);
        User user  = User.createAlumni(joinDTO.getEmail(), joinDTO.getPassword(), joinDTO.getName(), joinDTO.getStudentNumber(), joinDTO.getNickname());

        userRepository.save(user);
    }

    public void joinAdmin(JoinDTO joinDTO, String verificationCode){
        verifyCodeBeforeJoin(joinDTO.getEmail(), verificationCode);
        joinProcess(joinDTO);
        User user  = User.createAdmin(joinDTO.getEmail(), joinDTO.getPassword(), joinDTO.getName());

        userRepository.save(user);
    }

    private void verifyCodeBeforeJoin(String email, String verificationCode) {
        if (!verificationCodeService.verifyCode(email, verificationCode)) {
            throw new CannotJoinException(JoinErrorCode.INVALID_VERIFICATION_CODE);
        }
    }
    public void joinProcess(JoinDTO joinDTO) {

        if(!joinDTO.getEmail().matches(EMAIL_REGEX)){
            throw new CannotJoinException(JoinErrorCode.INVALID_EMAIL_FORMAT);
        }
        if(isEmailDuplicate(joinDTO.getEmail())){
            throw new CannotJoinException(JoinErrorCode.DUPLICATE_EMAIL);
        }
        if(isNicknameDuplicate(joinDTO.getNickname())){
            throw new CannotJoinException(JoinErrorCode.DUPLICATE_NICKNAME);
        }
        if(!checkPassword(joinDTO.getPassword(), joinDTO.getConfirmpassword())){
            throw new CannotJoinException(JoinErrorCode.PASSWORD_MISMATCH);
        }
    }

    @Transactional
    public boolean isEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public boolean checkPassword(String password, String confirmpassword){
        return password != null && password.equals(confirmpassword);
    }
}
