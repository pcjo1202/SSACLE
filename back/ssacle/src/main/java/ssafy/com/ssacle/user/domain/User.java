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
import ssafy.com.ssacle.board.domain.Board;
import ssafy.com.ssacle.comment.domain.Comment;
import ssafy.com.ssacle.usercategory.domain.UserCategory;
import ssafy.com.ssacle.vote.domain.Vote;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    @Column(name = "level")
    @ColumnDefault("1")
    private int level;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Board> boards;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Vote> votes;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonIgnore
//    private List<UserCategory> userCategories;
    // ** 관리자 생성자 **
    public static User createAdmin(String email, String password, String name) {
        return new User(
                null,
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
                false,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>()
//                new ArrayList<>()
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
                1,
                0,
                0,
                false,
                Role.STUDENT,
                null,
                null,
                false,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>()
//                new ArrayList<>()
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
                1,
                0,
                0,
                true, // 졸업생이므로 true
                Role.ALUMNI,
                null,
                null,
                false,
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>()
//                new ArrayList<>()
        );
    }
    private static String encodePassword(String rawPassword) {
        return new BCryptPasswordEncoder().encode(rawPassword);
    }

    public void addVote(Vote vote){
        this.votes.add(vote);
        vote.setUser(this);
    }
//
//    public void addCategory(UserCategory userCategory){
//        this.userCategories.add(userCategory);
//        userCategory.setUser(this);
//    }
}
