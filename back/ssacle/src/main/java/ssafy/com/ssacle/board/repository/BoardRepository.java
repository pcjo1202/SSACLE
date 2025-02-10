package ssafy.com.ssacle.board.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ssafy.com.ssacle.board.domain.Board;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b JOIN FETCH b.user")
    List<Board> findAllWithUser();

    @Query("SELECT b FROM Board b JOIN FETCH b.user WHERE b.id = :id")
    Optional<Board> findByIdWithUser(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Board b WHERE b.id = :id")
    void deleteById(@Param("id") Long id);

    @Transactional
    @Query("UPDATE Board b SET b.title = :title, b.content = :content, b.updatedAt = CURRENT_TIMESTAMP WHERE b.id = :id")
    void updateBoard(@Param("id") Long id, @Param("title") String title, @Param("content") String content);

    @Query("SELECT COUNT(b) FROM Board b WHERE b.boardType.name = :boardTypeName")
    int countBoardsByBoardTypeName(@Param("boardTypeName") String boardTypeName);

}
