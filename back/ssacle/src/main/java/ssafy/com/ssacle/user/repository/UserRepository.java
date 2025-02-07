package ssafy.com.ssacle.user.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.com.ssacle.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByStudentNumber(String studentNumber);

    Optional<User> findByEmailAndStudentNumber(String email, String studentNumber);
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.userTeams WHERE u.email = :email")
    Optional<User> findUserWithTeamsByEmail(@Param("email") String email);
}
