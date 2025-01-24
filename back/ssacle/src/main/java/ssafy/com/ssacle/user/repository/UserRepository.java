package ssafy.com.ssacle.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByName(String name);
}
