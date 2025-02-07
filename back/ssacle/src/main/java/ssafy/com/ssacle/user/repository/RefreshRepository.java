package ssafy.com.ssacle.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.user.domain.RefreshToken;
import ssafy.com.ssacle.user.domain.User;

import java.util.Optional;

public interface RefreshRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByUser(User user);
    void deleteByUser(User user);
}
