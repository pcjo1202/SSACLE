import { cn } from '@/lib/utils'
import { CircleHelp } from 'lucide-react'

const QuestionCard = ({
  isSelected,
  handleQuestionCardClick,
  question,
  selectedQuestionId,
}) => {
  const { id, content } = question

  return (
    <li
      onClick={() => handleQuestionCardClick(id)}
      className={cn(
        'w-1/5 h-full flex-col px-3 py-2 bg-gray-500 cursor-pointer transition-all',
        isSelected
          ? selectedQuestionId === id
            ? 'w-full'
            : 'hidden'
          : 'hover:bg-gray-300'
      )}
    >
      <div className="flex items-center justify-center h-full py-2">
        {isSelected ? (
          <div className="flex items-center justify-center h-full gap-2">
            <span className="text-lg font-bold">Q.</span>
            <span className="text-lg">{content}</span>
          </div>
        ) : (
          <CircleHelp className="size-14 text-ssacle-gray" />
        )}
      </div>
    </li>
  )
}
export default QuestionCard
