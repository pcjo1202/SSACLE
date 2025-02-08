package ssafy.com.ssacle.sprint.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.domain.SprintBuilder;
import ssafy.com.ssacle.sprint.dto.SingleSprintResponse;
import ssafy.com.ssacle.sprint.dto.SprintCreateRequest;
import ssafy.com.ssacle.sprint.dto.SprintResponse;
import ssafy.com.ssacle.sprint.exception.SprintNotExistException;
import ssafy.com.ssacle.sprint.repository.SprintRepository;
import ssafy.com.ssacle.team.domain.SprintTeamBuilder;
import ssafy.com.ssacle.team.domain.Team;
import ssafy.com.ssacle.team.repository.TeamRepository;
import ssafy.com.ssacle.user.domain.User;

@Service
@RequiredArgsConstructor
public class SprintService {
    private final SprintRepository sprintRepository;
    private final TeamRepository teamRepository;

    @Transactional
    public SprintResponse createSprint(SprintCreateRequest request) {
        Sprint sprint = SprintBuilder.builder()
                .name(request.getName())
                .description(request.getDescription())
                .detail(request.getDetail())
                .tags(request.getTags())
                .startAt(request.getStartAt())
                .endAt(request.getEndAt())
                .announceAt(request.getAnnounceAt())
                .maxMembers(request.getMaxMembers())
                .defaultTodos(request.getTodos())
                .build();

        sprintRepository.saveAndFlush(sprint);

        return new SprintResponse("싸프린트가 성공적으로 생성되었습니다.", sprint.getId());
    }

    @Transactional
    public void joinSprint(Long sprintId, User user) {
        Sprint sprint = sprintRepository.findByIdWithTeams(sprintId)
                .orElseThrow(SprintNotExistException::new);

        Team team = SprintTeamBuilder.builder()
                .addUser(user)
                .participateSprint(sprint)
                .build();

        teamRepository.save(team);
    }

    public SingleSprintResponse getSprintById(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(SprintNotExistException::new);

        return SingleSprintResponse.from(sprint);
    }
}
