import QuestionCardSection from '@/components/QuestionCardSection/QuestionCardSection'
import PresentingPage from '@/pages/PresentationPage/PresentingPage'

const QuestionCardPage = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <QuestionCardSection />
      <PresentingPage />
    </div>
  )
}
export default QuestionCardPage
