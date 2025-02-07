package ssafy.com.ssacle.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ssafy.com.ssacle.userteam.domain.UserTeam;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    List<UserTeam> userTeams = new ArrayList<>();

    public void addUserTeam(UserTeam userTeam){
        if (this.userTeams == null) {
            this.userTeams = new ArrayList<>();
        }
        this.userTeams.add(userTeam);
    }

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

    @Column(name = "level")
    private int level = 1;

    @Column(name = "experience")
    @ColumnDefault("0")
    private int experience;

    @Column(name = "pickles")
    @ColumnDefault("0")
    private int pickles;

    @Column(name = "is_graduate")
    @ColumnDefault("false")
    private boolean isGraduate;

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
                new ArrayList<>(),
                email,
                encodePassword(password),
                name,
                null, // 관리자에 studentNumber가 필요 없다면 null
                name, // 관리자에게 닉네임은 이름으로 설정
                1,
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
                new ArrayList<>(),
                email,
                encodePassword(password),
                name,
                studentNumber,
                nickname, // 기본 닉네임을 이름으로 설정
                1,
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
                new ArrayList<>(),
                email,
                encodePassword(password),
                name,
                studentNumber,
                nickname, // 기본 닉네임을 이름으로 설정
                1,
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

}
