package ssafy.com.ssacle.questioncard.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.com.ssacle.questioncard.domain.QuestionCard;
import ssafy.com.ssacle.questioncard.dto.QuestionCardRequest;
import ssafy.com.ssacle.questioncard.dto.QuestionCardResponse;
import ssafy.com.ssacle.questioncard.exception.QuestionCardNotFoundException;
import ssafy.com.ssacle.questioncard.repository.QuestionCardRepository;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.exception.SprintNotExistException;
import ssafy.com.ssacle.sprint.repository.SprintRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionCardService {
    private final QuestionCardRepository questionCardRepository;
    private final SprintRepository sprintRepository;

    public QuestionCardResponse createQuestionCard(QuestionCardRequest request) {
        Sprint sprint = sprintRepository.findById(request.getSprintId())
                .orElseThrow(SprintNotExistException::new);

        QuestionCard questionCard = QuestionCard.builder()
                .sprint(sprint)
                .description(request.getDescription())
                .isOpened(request.isOpened())
                .build();

        return QuestionCardResponse.from(questionCardRepository.save(questionCard));
    }

    @Transactional(readOnly = true)
    public List<QuestionCardResponse> getQuestionCardsBySprint(Long sprintId) {
        return questionCardRepository.findBySprintId(sprintId)
                .stream()
                .map(QuestionCardResponse::from)
                .collect(Collectors.toList());
    }

    public QuestionCardResponse updateQuestionCard(Long id, QuestionCardRequest request) {
        QuestionCard questionCard = questionCardRepository.findById(id)
                .orElseThrow(QuestionCardNotFoundException::new);

        questionCard.updateDescription(request.getDescription()); // ✅ isOpened 변경 X

        return QuestionCardResponse.from(questionCard);
    }

    public void deleteQuestionCard(Long id) {
        QuestionCard questionCard = questionCardRepository.findById(id)
                .orElseThrow(QuestionCardNotFoundException::new);

        questionCardRepository.delete(questionCard);
    }

}
