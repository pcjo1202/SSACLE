import QuestionCard from '@/components/PresentationPage/QuestionCard/QuestionCard'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const QuestionCardSection = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={cn(
        'relative w-full border-[1px]  border-gray-500 rounded-md',
        isOpen ? 'h-full basis-1/6' : 'h-0 basis-0'
      )}
    >
      <ul
        className={cn(
          'flex justify-center w-full gap-4 p-2 transition-all duration-300 ease-in-out',
          isOpen ? 'h-full' : 'h-0 opacity-0 overflow-hidden'
        )}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <QuestionCard key={index} />
        ))}
      </ul>
      <button
        className="absolute p-1 -translate-x-1/2 bg-gray-500 rounded-md -top-5 left-1/2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs">질문카드 열기</span>
            <ChevronUp className="w-4 h-4 text-ssacle-gray" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs">질문카드 닫기</span>
            <ChevronDown className="w-4 h-4 text-ssacle-gray" />
          </div>
        )}
      </button>
    </div>
  )
}
export default QuestionCardSection
