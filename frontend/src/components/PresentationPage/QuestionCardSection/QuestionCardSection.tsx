import { cn } from '@/lib/utils'
import { useRef } from 'react'
import QuestionCardList from '@/components/PresentationPage/QuestionCardList/QuestionCardList'
import { useShallow } from 'zustand/shallow'
import { usePresentationStore } from '@/store/usePresentationStore'
import { useQuery } from '@tanstack/react-query'

const QuestionCardSection = () => {
  const {
    isQuestionSelected,
    selectedQuestion,
    selectedQuestionList,
    setSelectedQuestionList,
    setIsQuestionSelected,
    setSelectedQuestion,
  } = usePresentationStore(
    useShallow((state) => ({
      isQuestionSelected: state.isQuestionSelected,
      selectedQuestion: state.selectedQuestion,
      selectedQuestionList: state.selectedQuestionList,
      setIsQuestionSelected: state.setIsQuestionSelected,
      setSelectedQuestion: state.setSelectedQuestion,
      setSelectedQuestionList: state.setSelectedQuestionList,
    }))
  )

  const { data: questionCards, isSuccess } = useQuery({
    queryKey: ['questionCards'],
    queryFn: () => {
      // return fetchQuestionCardData()
    },
  })

  // Todo : 여기서 fetch 해야함
  const initialQuestionCardData = [
    { id: 1, content: '질문내용1' },
    { id: 2, content: '질문내용2' },
    { id: 3, content: '질문내용3' },
    { id: 4, content: '질문내용4' },
    { id: 5, content: '질문내용5' },
    { id: 6, content: '질문내용6' },
    { id: 7, content: '질문내용7' },
    { id: 8, content: '질문내용8' },
    { id: 9, content: '질문내용9' },
    { id: 10, content: '질문내용10' },
  ]

  // Todo : 여기서 fetch 한 내용을 넣어줌
  const questionCardData = useRef<{ id: number; content: string }[]>(
    isSuccess && questionCards ? questionCards : initialQuestionCardData
  )

  // const { questionCardData } = usePresentation()

  // 질문카드 클릭 함수
  const handleQuestionCardClick = (questionId: number) => {
    const { id, content } = questionCardData.current.find(
      (question) => question.id === questionId
    )
    console.log('content', content)
    setSelectedQuestionList([...selectedQuestionList, { id, content }])
    setSelectedQuestion({
      id,
      content,
    })
    setIsQuestionSelected(true)
  }

  return (
    <div
      className={cn(
        'w-full transition-all duration-300 ease-in-out'
        // isOpen ? 'basis-2/12' : 'h-0 basis-0'
      )}
    >
      {/* 질문카드 목록 */}
      <QuestionCardList
        questionCardData={questionCardData.current}
        isSelectedQuestion={isQuestionSelected}
        selectedQuestion={selectedQuestion}
        selectedQuestionList={selectedQuestionList}
        handleQuestionCardClick={handleQuestionCardClick}
      />
    </div>
  )
}
export default QuestionCardSection
