package ssafy.com.ssacle.questioncard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.com.ssacle.questioncard.dto.QuestionCardRequest;
import ssafy.com.ssacle.questioncard.dto.QuestionCardResponse;
import ssafy.com.ssacle.questioncard.service.QuestionCardService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class QuestionCardController implements QuestionCardSwaggerController {
    private final QuestionCardService questionCardService;

    /** QuestionCard 생성 */
    @Override
    public ResponseEntity<QuestionCardResponse> createQuestionCard(@RequestBody QuestionCardRequest request) {
        QuestionCardResponse response = questionCardService.createQuestionCard(request);
        return ResponseEntity.status(201).body(response);
    }

    /** 특정 Sprint의 QuestionCard 조회 */
    @Override
    public ResponseEntity<List<QuestionCardResponse>> getQuestionCardsBySprint(@PathVariable Long sprintId) {
        List<QuestionCardResponse> response = questionCardService.getQuestionCardsBySprint(sprintId);
        return ResponseEntity.ok(response);
    }

    /** 특정 QuestionCard 수정 */
    @Override
    public ResponseEntity<QuestionCardResponse> updateQuestionCard(@PathVariable Long id, @RequestBody QuestionCardRequest request) {
        QuestionCardResponse response = questionCardService.updateQuestionCard(id, request);
        return ResponseEntity.ok(response);
    }

    /** 특정 QuestionCard 삭제 */
    @Override
    public ResponseEntity<Void> deleteQuestionCard(@PathVariable Long id) {
        questionCardService.deleteQuestionCard(id);
        return ResponseEntity.noContent().build();
    }

}
