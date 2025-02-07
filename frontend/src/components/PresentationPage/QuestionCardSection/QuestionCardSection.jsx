import { cn } from '@/lib/utils'
import { useState } from 'react'
import QuestionCardList from '@/components/PresentationPage/QuestionCardList/QuestionCardList'
import QuestionCardToggleButton from '@/components/PresentationPage/QuestionCardToggleButton/QuestionCardToggleButton'

const QuestionCardSection = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isSelectedQuestion, setIsSelectedQuestion] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState(null)

  const questionCardData = [
    { id: 1, content: '질문내용1' },
    { id: 2, content: '질문내용2' },
    { id: 3, content: '질문내용3' },
    { id: 4, content: '질문내용4' },
    { id: 5, content: '질문내용5' },
  ]
  // const { questionCardData } = usePresentation()

  // 질문카드 클릭 함수
  const handleQuestionCardClick = (questionId) => {
    setSelectedQuestionId(questionId)
    setIsSelectedQuestion(true)
  }

  return (
    <div
      className={cn(
        'relative w-full border-gray-500 rounded-md transition-all duration-300 ease-in-out',
        isOpen ? 'basis-2/12' : 'h-0 basis-0'
      )}
    >
      {/* 질문카드 목록 */}
      <QuestionCardList
        questionCardData={questionCardData}
        isOpen={isOpen}
        isSelectedQuestion={isSelectedQuestion}
        selectedQuestionId={selectedQuestionId}
        handleQuestionCardClick={handleQuestionCardClick}
      />
      {/* 질문카드 목록 열기/닫기 버튼 */}
      <QuestionCardToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
export default QuestionCardSection
