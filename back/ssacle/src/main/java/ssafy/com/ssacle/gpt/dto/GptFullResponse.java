package ssafy.com.ssacle.gpt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * GPT 응답 데이터 (추가적인 데이터 포함)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GptFullResponse {
    private String basicDescription;
    private String detailDescription;
    private String tags;
    private String recommendedFor;
    private List<TodoItem> todos;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TodoItem {
        private int day;
        private List<String> tasks;
    }
}
