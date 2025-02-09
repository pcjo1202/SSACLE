import PresentationNoticeModal from '@/components/PresentationPage/PresentationNoticeModal/PresentationNoticeModal'
import { useState } from 'react'
import { MODAL_STEP } from '@/constants/modalStep'
import PresentationPageWrapper from '@/components/PresentationPage/PresentationPageWrapper/PresentationPageWrapper'
// import VideoConferenceTest from '@/components/VideoConferenceTest/VideoConferenceTest'
const PresentationPage = () => {
  // 모달 열기 상태
  const [isOpen, setIsOpen] = useState(true)

  return (
    // <VideoConferenceTest />
    <PresentationPageWrapper>
      {/* 공통 공지 모달 */}
      {/* 상태가 바뀔 때 마다 모달이 뜨도록 구성 */}
      <PresentationNoticeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalStep={MODAL_STEP.READY}
      />
    </PresentationPageWrapper>
  )
}
export default PresentationPage
