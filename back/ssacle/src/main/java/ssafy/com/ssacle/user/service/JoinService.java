package ssafy.com.ssacle.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.user.domain.Role;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.dto.JoinDTO;
import ssafy.com.ssacle.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class JoinService {
    private final UserRepository userRepository;
    public boolean joinProcess(JoinDTO joinDTO) {
        if (isUsernameOrNameDuplicate(joinDTO) || isInvalidRole(joinDTO.getRole())) {
            return false;
        }

        saveLocalUser(joinDTO);
        return true;
    }

    private boolean isUsernameOrNameDuplicate(JoinDTO joinDTO) {
        boolean isUsernameExists = userRepository.existsByUsername(joinDTO.getUsername());
        boolean isNameExists = userRepository.existsByName(joinDTO.getName());
        return isUsernameExists || isNameExists;
    }

    private boolean isInvalidRole(Role role) {
        return role == null || !Role.isValidRole(role.name());
    }

    private void saveLocalUser(JoinDTO joinDTO) {
        User user = User.localUserBuilder()
                .username(joinDTO.getUsername())
                .password(joinDTO.getPassword())
                .role(joinDTO.getRole())
                .name(joinDTO.getName())
                .build();
        userRepository.save(user);
    }
}
