package ssafy.com.ssacle.team.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ssafy.com.ssacle.team.dto.TeamResponseDTO;

import java.util.List;

@Tag(name = "Team API", description = "Sprint에 속한 팀 정보를 제공하는 API입니다.")
public interface TeamSwaggerController {

    @Operation(summary = "Sprint에 속한 팀 목록 조회", description = "Sprint ID를 기반으로 해당 Sprint에 속한 모든 팀 정보를 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "팀 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 Sprint를 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    })
    @GetMapping("/sprint/{sprintId}/teams")
    ResponseEntity<List<TeamResponseDTO>> getTeamsBySprintId(
            @Parameter(description = "조회할 Sprint ID", example = "1") @PathVariable Long sprintId);
}
