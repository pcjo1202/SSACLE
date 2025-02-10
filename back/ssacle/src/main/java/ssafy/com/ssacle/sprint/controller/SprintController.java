package ssafy.com.ssacle.sprint.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.dto.SingleSprintResponse;
import ssafy.com.ssacle.sprint.dto.SprintCreateRequest;
import ssafy.com.ssacle.sprint.dto.SprintDetailResponse;
import ssafy.com.ssacle.sprint.dto.SprintResponse;
import ssafy.com.ssacle.sprint.service.SprintService;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.service.UserService;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SprintController implements SprintSwaggerController{
    private final UserService userService;
    private final SprintService sprintService;

    /** 스프린트 생성 */
    @Override
    public ResponseEntity<SprintResponse> createSprint(@RequestBody SprintCreateRequest request) {
        SprintResponse response = sprintService.createSprint(request);

        return ResponseEntity.status(201).body(response);
    }

    /** 스프린트 참가 */
    @Override
    public ResponseEntity<Void> joinSprint(@PathVariable Long sprintId) {
        User user = userService.getAuthenticatedUserWithTeams();
        sprintService.joinSprint(sprintId, user);

        return ResponseEntity.status(201).build();
    }

    /** 단일 스프린트 조회 */
    @Override
    public ResponseEntity<SingleSprintResponse> getSprintById(@PathVariable Long id) {
        SingleSprintResponse response = sprintService.getSprintById(id);
        return ResponseEntity.ok(response);
    }

    /** 조건별 스프린트 조회 */
    @Override
    public ResponseEntity<Page<SingleSprintResponse>> getSprints(@RequestParam String category, Pageable pageable) {
        Page<Sprint> sprints = sprintService.getSprintsByLeafCategory(category, pageable);
        return ResponseEntity.ok(sprints.map(SingleSprintResponse::from));
    }

    /** 스프린트 입장 페이지에 필요한 단일 스프린트 조회 */
    @Override
    public ResponseEntity<SprintDetailResponse> getSprintDetails(@PathVariable Long sprintId) {
        SprintDetailResponse response = sprintService.getSprintDetail(sprintId);
        return ResponseEntity.ok(response);
    }
}
