package ssafy.com.ssacle.sprint.repository;

import ssafy.com.ssacle.sprint.domain.Sprint;

import java.util.Optional;

public interface SprintRepositoryCustom {
    Optional<Sprint> findByIdWithTeams(Long sprintId);
}
