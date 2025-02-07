package ssafy.com.ssacle.comment.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.com.ssacle.comment.domain.Comment;
import ssafy.com.ssacle.board.domain.Board;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 전체 댓글을 생성일 기준 내림차순으로 조회
    @Query("SELECT c FROM Comment c JOIN FETCH c.board b JOIN FETCH b.user WHERE b.id = :boardId AND c.parent IS NULL ORDER BY c.createdAt DESC")
    List<Comment> findTopLevelComments(@Param("boardId") Long boardId);


    // 특정 댓글 조회
    Optional<Comment> findById(Long id);

    // 특정 게시글의 모든 댓글 조회 (최신순)
    List<Comment> findByBoardOrderByCreatedAtDesc(Board board);

    // 특정 게시글에서 공개된 댓글만 조회 (최신순)
    List<Comment> findByBoardAndDisclosureTrueOrderByCreatedAtDesc(Board board);

    // 특정 부모 댓글에 대한 대댓글 조회 (최신순)
    List<Comment> findByParentOrderByCreatedAtDesc(Comment parent);

    // 특정 게시글에서 특정 내용이 포함된 댓글 검색 (검색 기능)
    List<Comment> findByBoardAndContentContainingIgnoreCase(Board board, String keyword);

    @Transactional
    @Modifying
    @Query("UPDATE Comment c SET c.content = :content, c.updatedAt = :updatedAt WHERE c.id = :id")
    void updateComment(@Param("id") Long id, @Param("content") String content, @Param("updatedAt") LocalDateTime updatedAt);

    // 댓글 삭제
    void deleteById(Long id);

    // 특정 게시글의 모든 댓글 삭제
    void deleteByBoard(Board board);

    // 특정 부모 댓글의 대댓글 삭제
    void deleteByParent(Comment parent);
}
