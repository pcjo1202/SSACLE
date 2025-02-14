package ssafy.com.ssacle.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.diary.domain.Diary;
import ssafy.com.ssacle.team.domain.Team;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByTeamInOrderByDateAsc(List<Team> teams);
}
