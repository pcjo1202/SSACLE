package ssafy.com.ssacle.comment.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.com.ssacle.comment.domain.Comment;
import ssafy.com.ssacle.comment.dto.CommentRequestDTO;
import ssafy.com.ssacle.comment.dto.CommentResponseDTO;
import ssafy.com.ssacle.comment.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController implements  CommentSwaggerController{
    private final CommentService commentService;

    @Override
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByBoard(Long boardId) {
        return ResponseEntity.ok().body(commentService.getCommentsByBoard(boardId));
    }

    @Override
    public ResponseEntity<Void> createComment(Long boardId, CommentRequestDTO commentRequestDTO, HttpServletRequest request) {
        commentService.createComment(boardId,commentRequestDTO,request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<Comment> updateComment(Long commentId, CommentRequestDTO commentRequestDTO, HttpServletRequest request) {
        return ResponseEntity.ok().body(commentService.updateComment(commentId,commentRequestDTO,request));
    }

    @Override
    public ResponseEntity<Void> deleteComment(Long commentId, HttpServletRequest request) {
        commentService.deleteComment(commentId, request);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> createReply(Long parentCommentId, CommentRequestDTO commentRequestDTO, HttpServletRequest request) {
        commentService.createReply(parentCommentId, commentRequestDTO, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    public ResponseEntity<List<CommentResponseDTO>> getReplies(Long parentCommentId) {
        return ResponseEntity.ok().body(commentService.getReplies(parentCommentId));
    }
}
