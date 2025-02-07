import { cn } from '@/lib/utils'
import QuestionCard from '@/components/PresentationPage/QuestionCard/QuestionCard'

const QuestionCardList = ({
  questionCardData,
  isOpen,
  isSelectedQuestion,
  selectedQuestionId,
  handleQuestionCardClick,
}) => {
  return (
    <ul
      className={cn(
        'flex w-full h-full gap-1 transition-all duration-300 ease-in-out overflow-x-auto',
        isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
      )}
    >
      {/* 질문카드 목록 */}
      {questionCardData.map((question) => (
        <QuestionCard
          key={question.id}
          isSelected={isSelectedQuestion}
          selectedQuestionId={selectedQuestionId}
          handleQuestionCardClick={handleQuestionCardClick}
          question={question}
        />
      ))}
    </ul>
  )
}
export default QuestionCardList
