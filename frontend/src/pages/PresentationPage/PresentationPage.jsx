import { usePresentation } from '@/store/usePresentation'

import BeforePresentationPage from '@/pages/PresentationPage/BeforePresentationPage'
import PresentingPage from '@/pages/PresentationPage/PresentingPage'
import QuestionCardPage from '@/pages/PresentationPage/QuestionCardPage'

import { PRESENTATION_STATUS } from '@/constants/presentationStatus'
import PresentationChat from '@/components/PresentationPage/PresentationChat/PresentationChat'

const PresentationPage = () => {
  const { isChatOpen, presentationStatus } = usePresentation() // 발표 상태 (상태에 따라 컴포넌트 변경)

  return (
    <div className="flex h-full gap-2 px-10 py-4">
      {/* 발표 전 페이지 */}
      {presentationStatus === PRESENTATION_STATUS.BEFORE_PRESENTATION && (
        <BeforePresentationPage />
      )}
      {/* 발표 중 페이지  */}
      {presentationStatus === PRESENTATION_STATUS.PRESENTING && (
        <PresentingPage />
      )}
      {/* 질문 카드 */}
      {presentationStatus === PRESENTATION_STATUS.QUESTION_CARD && (
        <QuestionCardPage />
      )}
      {/* 채팅 영역 */}
      {isChatOpen && <PresentationChat />}
    </div>
  )
}
export default PresentationPage
