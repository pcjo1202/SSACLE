import { cn } from '@/lib/utils'
import { CircleHelp } from 'lucide-react'
import { useState } from 'react'

const QuestionCard = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'w-80 border-[1px] border-gray-500 rounded-md flex-col px-3 py-2 bg-gray-500 cursor-pointer transition-all',
        !isOpen && 'hover:bg-gray-300',
        isOpen && 'w-full'
      )}
    >
      <div className="flex items-center justify-center h-full ">
        {isOpen ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg ">Q.</span>
            <span>질문내용</span>
          </div>
        ) : (
          <CircleHelp className="size-16 text-ssacle-gray" />
        )}
      </div>
    </li>
  )
}
export default QuestionCard
