import ParticipantSection from '@/components/ParticipantSection/ParticipantSection'
import SharedSection from '@/components/SharedSection/SharedSection'

const PresentingPage = () => {
  return (
    <div className="flex w-full h-full">
      {/* 공유 영역 */}
      <SharedSection />
      {/* 참여자 영역 */}
      <ParticipantSection />
    </div>
  )
}
export default PresentingPage
