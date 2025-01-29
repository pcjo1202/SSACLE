package ssafy.com.ssacle.user.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "email", nullable = false, length = 255, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    @NotBlank
    private String password;

    @Column(name = "name", nullable = false, length = 10)
    @NotBlank
    private String name;

    @Column(name = "student_number", length = 7)
    private String studentNumber;

    @Column(name = "nickname", nullable = false, unique = true, length = 20)
    private String nickname;

    @Column(name = "badge", length = 512)
    private String badge;

    @Column(name = "experience")
    @ColumnDefault("0")
    private int experience;

    @Column(name = "pickles")
    @ColumnDefault("0")
    private int pickles;

    @Column(name = "is_graduate")
    @ColumnDefault("false")
    private boolean is_graduate;

    @Enumerated(EnumType.STRING) // ENUM 타입 명시
    @Column(name = "role", nullable = false)
    private Role role;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "is_delete")
    @ColumnDefault("false")
    private boolean isDelete;

    // ** 관리자 생성자 **
    public static User createAdmin(String email, String password, String name) {
        return new User(
                null,
                email,
                encodePassword(password),
                name,
                null, // 관리자에 studentNumber가 필요 없다면 null
                name, // 관리자에게 닉네임은 이름으로 설정
                "Admin Badge",
                0,
                0,
                false,
                Role.ADMIN,
                null,
                null,
                false
        );
    }

    // ** 재학생 생성자 **
    public static User createStudent(String email, String password, String name, String studentNumber, String nickname) {
        return new User(
                null,
                email,
                encodePassword(password),
                name,
                studentNumber,
                nickname, // 기본 닉네임을 이름으로 설정
                "Student Badge",
                0,
                0,
                false,
                Role.STUDENT,
                null,
                null,
                false
        );
    }

    // ** 졸업생 생성자 **
    public static User createAlumni(String email, String password, String name, String studentNumber, String nickname) {
        return new User(
                null,
                email,
                encodePassword(password),
                name,
                studentNumber,
                nickname, // 기본 닉네임을 이름으로 설정
                "Alumni Badge",
                0,
                0,
                true, // 졸업생이므로 true
                Role.ALUMNI,
                null,
                null,
                false
        );
    }
    private static String encodePassword(String rawPassword) {
        return new BCryptPasswordEncoder().encode(rawPassword);
    }
//    @Id
//    @GeneratedValue
//    private Long id;
//
//    @NotBlank
//    private String username;
//
//    @NotBlank
//    private String password;
//
//    @NotBlank
//    private String email;
//
//    @NotBlank
//    private String name;
//    private AuthProvider provider;
//    private Role role;
//    public void setName(String name) {this.name=name;}
//    public void setEmail(String email){this.email=email;}
//    private User(String username, String password, String email, String name, AuthProvider provider, Role role) {
//        this.username = username;
//        this.password = password;
//        this.email = email;
//        this.provider = provider;
//        this.role = role;
//        this.name=name;
//    }
//
//    public static class LocalUserBuilder {
//        private String username;
//        private String password;
//        private Role role;
//        private String name;
//        public LocalUserBuilder username(String username) {
//            this.username = username;
//            return this;
//        }
//
//        public LocalUserBuilder password(String password) {
//            this.password = encodePassword(password);
//            return this;
//        }
//        public LocalUserBuilder name(String name){
//            this.name=name;
//            return this;
//        }
//        public LocalUserBuilder role(Role role) {
//            this.role = role;
//            return this;
//        }
//        public User build() {
//            return new User(username, password, generateRandomEmail(), name, AuthProvider.LOCAL,  role);
//        }
//    }
//
//    public static class OAuthUserBuilder {
//        private String username;
//        private String email;
//        private String name;
//        private AuthProvider provider;
//        private Role role;
//        public OAuthUserBuilder username(String username) {
//            this.username = username;
//            return this;
//        }
//
//        public OAuthUserBuilder email(String email) {
//            this.email = email != null ? email : generateRandomEmail();
//            return this;
//        }
//
//        public OAuthUserBuilder name(String name) {
//            this.name = name;
//            return this;
//        }
//
//        public OAuthUserBuilder provider(AuthProvider provider) {
//            this.provider = provider;
//            return this;
//        }
//
//        public OAuthUserBuilder role(Role role) {
//            this.role = role;
//            return this;
//        }
//        public User build() {
//            return new User(username, generateSecureRandomPassword(), email, name, provider, role);
//        }
//    }
//    public static LocalUserBuilder localUserBuilder() { return new LocalUserBuilder(); }
//    public static OAuthUserBuilder oauthUserBuilder() {
//        return new OAuthUserBuilder();
//    }
//    private static String encodePassword(String rawPassword) {
//        return new BCryptPasswordEncoder().encode(rawPassword);
//    }
//    private static String generateRandomEmail() {
//        return UUID.randomUUID().toString() + "@example.com";
//    }
//    private static String generateSecureRandomPassword() {
//        return UUID.randomUUID().toString();
//    }
}