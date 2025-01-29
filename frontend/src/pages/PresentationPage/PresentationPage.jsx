import PresentationChat from '@/components/PresentationChat/PresentationChat'
import BeforePresentationPage from '@/pages/PresentationPage/BeforePresentationPage'
import PresentingPage from '@/pages/PresentationPage/PresentingPage'
import QuestionCardPage from '@/pages/PresentationPage/QuestionCardPage'
import { useState } from 'react'

// 스트림 목업 데이터
const STREAM_MOCK = [
  {
    id: 'peer-1',
    stream: null, // MediaStream 객체가 들어갈 자리
    name: '김발표',
    isHost: true,
    connectionState: 'connected', // 'new', 'connecting', 'connected', 'disconnected', 'failed', 'closed'
    audioEnabled: true,
    videoEnabled: true,
    screenShare: false,
  },
  {
    id: 'peer-2',
    stream: null,
    name: '이참여',
    isHost: false,
    connectionState: 'connected',
    audioEnabled: true,
    videoEnabled: true,
    screenShare: false,
  },
  {
    id: 'peer-3',
    stream: null,
    name: '박청중',
    isHost: false,
    connectionState: 'connected',
    audioEnabled: false,
    videoEnabled: true,
    screenShare: false,
  },
]

// 발표 상태를 나타내는 상수
const PRESENTATION_STATUS = {
  BEFORE_PRESENTATION: 'beforePresentation',
  PRESENTING: 'presenting',
  QUESTION_CARD: 'questionCard',
  END_PRESENTATION: 'endPresentation',
}

const PresentationPage = () => {
  const [stream, setStream] = useState(STREAM_MOCK) // 스트림 상태
  const [presentationStatus, setPresentationStatus] = useState(
    PRESENTATION_STATUS.BEFORE_PRESENTATION
  ) // 발표 상태 (상태에 따라 컴포넌트 변경)

  return (
    <div className="flex w-full min-h-full gap-4 py-4">
      {/* 발표 전 페이지 */}
      {presentationStatus === PRESENTATION_STATUS.BEFORE_PRESENTATION && (
        <BeforePresentationPage stream={stream} />
      )}
      {/* 발표 중 페이지  */}
      {presentationStatus === PRESENTATION_STATUS.PRESENTING && (
        <PresentingPage stream={stream} />
      )}
      {/* 질문 카드 */}
      {presentationStatus === PRESENTATION_STATUS.QUESTION_CARD && (
        <QuestionCardPage stream={stream} />
      )}
      {/* 채팅 영역 */}
      <PresentationChat />
    </div>
  )
}
export default PresentationPage
