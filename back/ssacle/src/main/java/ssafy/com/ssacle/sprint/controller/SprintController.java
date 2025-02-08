package ssafy.com.ssacle.sprint.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.com.ssacle.sprint.dto.SprintCreateRequest;
import ssafy.com.ssacle.sprint.dto.SprintResponse;
import ssafy.com.ssacle.sprint.service.SprintService;
import ssafy.com.ssacle.user.domain.User;
import ssafy.com.ssacle.user.service.UserService;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SprintController {
    private final UserService userService;
    private final SprintService sprintService;

    /**
     * 스프린트 생성
     */
    @PostMapping("/admin/ssaprints")
    public ResponseEntity<SprintResponse> createSprint(@RequestBody SprintCreateRequest request) {
        SprintResponse response = sprintService.createSprint(request);

        return ResponseEntity.status(201).body(response);
    }

    /**
     * 스프린트 참가
     */
    @PostMapping("/ssaprint/{sprintId}/join")
    public ResponseEntity<Void> joinSprint(@PathVariable Long sprintId) {
        User user = userService.getAuthenticatedUserWithTeams();

        sprintService.joinSprint(sprintId, user);
        return ResponseEntity.status(201).build();
    }
}
