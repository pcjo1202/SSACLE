package ssafy.com.ssacle.questioncard.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.com.ssacle.questioncard.domain.QuestionCard;
import ssafy.com.ssacle.questioncard.dto.QuestionCardRequest;
import ssafy.com.ssacle.questioncard.dto.QuestionCardResponse;
import ssafy.com.ssacle.questioncard.exception.QuestionNotFoundException;
import ssafy.com.ssacle.questioncard.repository.QuestionCardRepository;
import ssafy.com.ssacle.sprint.domain.PresentationStatus;
import ssafy.com.ssacle.sprint.domain.Sprint;
import ssafy.com.ssacle.sprint.exception.InvalidPresentationStatusException;
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

    public QuestionCardResponse selectQuestionCardsBySprintAndQuestionId(Long sprintId, Long questionId) {
        Sprint sprint = sprintRepository.findById(sprintId).orElseThrow(SprintNotExistException::new);

        if (!isQuestionCardSelectionAllowed(sprint)) {
            throw new InvalidPresentationStatusException();
        }
        QuestionCard card = questionCardRepository.findById(questionId).orElseThrow(QuestionNotFoundException::new);
        card.update();
        return QuestionCardResponse.from(card);
    }

    private boolean isQuestionCardSelectionAllowed(Sprint sprint) {
        return sprint.getPresentationStatus() == PresentationStatus.QUESTION_READY ||
                sprint.getPresentationStatus() == PresentationStatus.QUESTION_ANSWER ||
                sprint.getPresentationStatus() == PresentationStatus.QUESTION_ANSWERER_INTRO;
    }
}
