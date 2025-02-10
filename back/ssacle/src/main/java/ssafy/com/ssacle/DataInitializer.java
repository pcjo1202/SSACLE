package ssafy.com.ssacle;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> initializeUsers(userRepository);
    }

    @Transactional
    void initializeUsers(UserRepository userRepository) {
        if (userRepository.count() == 0) { // 기존 데이터가 없을 경우에만 추가
            User admin = User.createAdmin("admin@example.com", "admin123", "AdminUser");
            User user = User.createStudent("user@example.com", "user123", "John Doe", "1234567", "johndoe");

            userRepository.save(admin);
            userRepository.save(user);

            System.out.println("default data added");
        } else {
            System.out.println("default data already exists");
        }
    }
}
