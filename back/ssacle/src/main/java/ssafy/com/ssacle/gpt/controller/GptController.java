package ssafy.com.ssacle.gpt.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.com.ssacle.gpt.dto.GptFullResponse;
import ssafy.com.ssacle.gpt.service.GptService;

import java.time.LocalDateTime;

/**
 * GPT 기반 Todo 생성 컨트롤러 (실제 API 구현)
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/gpt")
@RequiredArgsConstructor
public class GptController implements GptSwaggerController {

    private final GptService gptService;

    /**
     * GPT 기반 Todo 생성 (실제 구현)
     */
    @Override
    public ResponseEntity<GptFullResponse> generateTodos(LocalDateTime startAt, LocalDateTime endAt, String topic) {
        GptFullResponse todos = gptService.generateTodos(startAt, endAt, topic);
        return ResponseEntity.ok(todos);
    }
}
