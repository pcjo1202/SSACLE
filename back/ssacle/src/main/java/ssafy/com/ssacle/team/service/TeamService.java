package ssafy.com.ssacle.team.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.com.ssacle.team.domain.Team;
import ssafy.com.ssacle.team.dto.TeamResponseDTO;
import ssafy.com.ssacle.team.exception.TeamNotFoundException;
import ssafy.com.ssacle.team.repository.TeamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    public List<TeamResponseDTO> getTeamsBySprintId(Long sprintId) {
        List<Team> teams = teamRepository.findBySprintId(sprintId);
        return teams.stream()
                .map(TeamResponseDTO::from)
                .collect(Collectors.toList());
    }

    public Team findById(Long teamId){
        return teamRepository.findByIdWithUserTeams(teamId)
                .orElseThrow(TeamNotFoundException::new);
    }
}
