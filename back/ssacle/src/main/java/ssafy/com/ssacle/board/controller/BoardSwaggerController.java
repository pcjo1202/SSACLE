package ssafy.com.ssacle.board.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ssafy.com.ssacle.board.domain.Board;
import ssafy.com.ssacle.board.dto.BoardRequestDTO;
import ssafy.com.ssacle.board.dto.BoardResponseDTO;
import ssafy.com.ssacle.board.dto.BoardUpdateRequestDTO;

import java.util.List;

@Tag(name = "Board API", description = "게시판 관련 API입니다.")
public interface BoardSwaggerController {

    /** 📌 1. 게시글 목록 조회 */
    @Operation(summary = "게시글 목록 조회", description = "모든 게시글을 최신순으로 조회합니다.")
    @ApiResponse(responseCode = "200", description = "게시글 목록 조회 성공",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Board.class)))
    @GetMapping("/api/boards")
    ResponseEntity<List<BoardResponseDTO>> getAllBoards();

    /** 📌 2. 게시글 상세 조회 */
    @Operation(summary = "게시글 상세 조회", description = "게시글 ID를 기반으로 특정 게시글을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 조회 성공", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없음", content = @Content)
    })
    @GetMapping("/api/boards/{id}")
    ResponseEntity<BoardResponseDTO> getBoardById(@PathVariable Long id);

    /** 📌 3. 게시글 생성 */
    @Operation(summary = "게시글 생성", description = "JWT 인증이 필요한 API로, 새로운 게시글을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "게시글 생성 성공", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 (제목/내용 없음)", content = @Content)
    })
    @PostMapping("/api/boards")
    ResponseEntity<Void> saveBoard(
            @RequestBody BoardRequestDTO boardRequestDTO,
            HttpServletRequest request
    );

    /** 📌 4. 게시글 삭제 */
    @Operation(summary = "게시글 삭제", description = "게시글 작성자만 삭제할 수 있습니다. JWT 인증이 필요합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "게시글 삭제 성공"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "403", description = "삭제 권한 없음", content = @Content),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없음", content = @Content)
    })
    @DeleteMapping("/api/boards/{boardId}")
    ResponseEntity<Void> deleteBoard(
            @PathVariable Long boardId,
            HttpServletRequest request
    );

    /** 📌 5. 게시글 수정 */
    @Operation(summary = "게시글 수정", description = "게시글 작성자만 수정할 수 있습니다. JWT 인증이 필요합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "게시글 수정 성공"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content),
            @ApiResponse(responseCode = "403", description = "수정 권한 없음", content = @Content),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없음", content = @Content),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 (제목/내용 없음)", content = @Content)
    })
    @PutMapping("/api/boards/{boardId}")
    ResponseEntity<Board> updateBoard(
            @PathVariable Long boardId,
            @RequestBody BoardUpdateRequestDTO boardUpdateRequestDTO,
            HttpServletRequest request
    );

    @Operation(summary = "게시물 갯수 조회", description = "게시글 갯수를 조회할 수 있습니다. JWT 인증이 필요합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 갯수 조회 성공"),
    })
    @GetMapping("/api/boards/count")
    ResponseEntity<Integer> countBoard(@RequestParam("type") String boardTypeName);
}

