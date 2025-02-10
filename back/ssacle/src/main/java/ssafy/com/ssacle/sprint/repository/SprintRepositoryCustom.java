package ssafy.com.ssacle.sprint.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ssafy.com.ssacle.sprint.domain.Sprint;

import java.util.Optional;

public interface SprintRepositoryCustom {
    Optional<Sprint> findByIdWithTeams(Long sprintId);
    Page<Sprint> findSprintsByLeafCategory(String leafCategoryName, Pageable pageable);
}
