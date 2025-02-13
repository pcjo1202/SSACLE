package ssafy.com.ssacle.todo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ssafy.com.ssacle.gpt.dto.TodoResponse;

import java.util.List;

@Tag(name = "Todo API", description = "할 일(Todo) 관련 API입니다.")
@RequestMapping("/api/v1/todos")
public interface TodoSwaggerController {

    @Operation(summary = "팀 ID로 Todo 조회", description = "특정 팀에 속한 Todo 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Todo 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 팀을 찾을 수 없음", content = @Content),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생", content = @Content)
    })
    @GetMapping("/team/{teamId}")
    ResponseEntity<List<TodoResponse>> getTodoByTeamId(
            @Parameter(description = "조회할 팀 ID", example = "1") @PathVariable Long teamId);
}
