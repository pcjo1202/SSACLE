package ssafy.com.ssacle.sprint;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.domain.SprintBuilder;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class SprintTest {

    private Sprint sprint;

    @BeforeEach
    void setUp() {
        sprint = SprintBuilder.builder()
                .name("Spring Boot Sprint")
                .description("Spring Boot 학습 스프린트")
                .startAt(LocalDateTime.of(2024, 1, 1, 0, 0))
                .endAt(LocalDateTime.of(2024, 2, 1, 0, 0))
                .announcementDateTime(LocalDateTime.of(2023, 12, 31, 0, 0))
                .detailTopic("Spring Security와 OAuth2")
                .tag("Spring, OAuth")
                .build();
    }

    @Test
    void builder_객체_정상_생성_확인() {
        assertNotNull(sprint);
        assertEquals("Spring Boot Sprint", sprint.getName());
        assertEquals("Spring Boot 학습 스프린트", sprint.getDescription());
        assertEquals("Spring Security와 OAuth2", sprint.getDetailTopic());
        assertEquals("Spring, OAuth", sprint.getTag());
    }

    @Test
    void maxMembers와_currentMembers의_유효성_검증() {
        assertThrows(IllegalArgumentException.class, () -> {
            SprintBuilder.builder()
                    .name("test")
                    .description("test")
                    .startAt(LocalDateTime.now())
                    .endAt(LocalDateTime.now())
                    .announcementDateTime(LocalDateTime.now())
                    .detailTopic("test")
                    .tag("test")
                    .build();
        });
    }

    @Test
    void addMember_정상_작동_확인() {
        // 최대 참여 인원을 5명으로 설정하여 테스트
        Sprint testSprint = SprintBuilder.builder()
                .name("Test Sprint")
                .description("테스트용 스프린트")
                .startAt(LocalDateTime.now())
                .endAt(LocalDateTime.now().plusDays(30))
                .announcementDateTime(LocalDateTime.now().minusDays(1))
                .detailTopic("테스트 주제")
                .tag("테스트 태그")
                .build();

        testSprint.addMember();
        assertEquals(2, testSprint.getCurrentMembers());
    }

    @Test
    void maxMembers_초과시_addMember_예외_발생() {
        Sprint sprintMax = SprintBuilder.builder()
                .name("Full Sprint")
                .description("테스트")
                .startAt(LocalDateTime.now())
                .endAt(LocalDateTime.now().plusDays(30))
                .announcementDateTime(LocalDateTime.now().minusDays(1))
                .detailTopic("test")
                .tag("test")
                .build();

        sprintMax.addMember(); // 현재 2명
        assertThrows(IllegalStateException.class, sprintMax::addMember);
    }
}
