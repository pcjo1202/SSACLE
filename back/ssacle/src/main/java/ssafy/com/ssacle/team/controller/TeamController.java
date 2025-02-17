package ssafy.com.ssacle.team.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ssafy.com.ssacle.team.dto.TeamResponseDTO;
import ssafy.com.ssacle.team.service.TeamService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TeamController implements TeamSwaggerController {

    private final TeamService teamService;

    @Override
    public ResponseEntity<List<Long>> getTeamUsers(@PathVariable Long teamId) {
        List<Long> response = teamService.getTeamMembers(teamId);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<List<TeamResponseDTO>> getTeamsBySprintId(Long sprintId) {
        List<TeamResponseDTO> teams = teamService.getTeamsBySprintId(sprintId);
        return ResponseEntity.ok(teams);
    }
}
