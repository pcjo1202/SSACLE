import QuestionCard from '@/components/PresentationPage/QuestionCard/QuestionCard'

const QuestionCardSection = () => {
  return (
    <div className="basis-1/4 w-full h-full border-[1px] border-gray-500 rounded-md">
      <ul className="flex justify-center w-full h-full gap-4 p-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <QuestionCard key={index} />
        ))}
      </ul>
    </div>
  )
}
export default QuestionCardSection
