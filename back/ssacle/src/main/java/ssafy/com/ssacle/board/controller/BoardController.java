package ssafy.com.ssacle.board.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.com.ssacle.board.domain.Board;
import ssafy.com.ssacle.board.dto.BoardRequestDTO;
import ssafy.com.ssacle.board.dto.BoardResponseDTO;
import ssafy.com.ssacle.board.dto.BoardUpdateRequestDTO;
import ssafy.com.ssacle.board.service.BoardService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController implements BoardSwaggerController{
    private final BoardService boardService;

    @Override
    public ResponseEntity<List<BoardResponseDTO>> getAllBoards() {
        return ResponseEntity.ok().body(boardService.getAllBoards());
    }

    @Override
    public ResponseEntity<BoardResponseDTO> getBoardById(Long id) {
        return ResponseEntity.ok().body(boardService.getBoardById(id));
    }

    @Override
    public ResponseEntity<Void> saveBoard(BoardRequestDTO boardRequestDTO, HttpServletRequest request) {
        boardService.saveBoard(boardRequestDTO,request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Void> deleteBoard(Long boardId, HttpServletRequest request) {
        boardService.deleteBoard(boardId,request);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Board> updateBoard(Long boardId, BoardUpdateRequestDTO boardUpdateRequestDTO, HttpServletRequest request) {
        return ResponseEntity.ok().body(boardService.updateBoard(boardId, boardUpdateRequestDTO, request));
    }

    @Override
    public ResponseEntity<Integer> countBoard(String boardTypeName) {
        return ResponseEntity.ok().body(boardService.countBoardsByBoardTypeName(boardTypeName));
    }
}
