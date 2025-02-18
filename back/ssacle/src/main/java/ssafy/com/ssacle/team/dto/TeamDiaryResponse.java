package ssafy.com.ssacle.team.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class TeamDiaryResponse {
    private Long teamId;
    private List<String> diaries;

    public TeamDiaryResponse(Long teamId, String diaryContent) {
        this.teamId = teamId;
        this.diaries = new ArrayList<>();
        if (diaryContent != null && !diaryContent.isEmpty()) {
            this.diaries.add(diaryContent);
        }
    }

    public void addDiaryContent(String content) {
        if (!diaries.contains(content)) {
            diaries.add(content);
        }
    }
}

