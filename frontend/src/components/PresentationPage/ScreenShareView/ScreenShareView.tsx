import { ModalSteps } from '@/constants/modalStep'
import useScreenShare from '@/hooks/useScreenShare'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import { usePresentationStore } from '@/store/usePresentationStore'
import { useStreamStore } from '@/store/useStreamStore'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

const ScreenShareView = () => {
  const isScreenSharing = useStreamStore((state) => state.isScreenSharing)
  const { screenPublisher } = useOpenviduStateStore()
  const setIsScreenSharing = useStreamStore((state) => state.setIsScreenSharing)
  const { stopScreenShare } = useScreenShare()
  const presenterName = usePresentationStore((state) => state.presenterName)
  const { setModalStep, setIsModalOpen } = usePresentationModalStateStore(
    useShallow((state) => ({
      setModalStep: state.setModalStep,
      setIsModalOpen: state.setIsModalOpen,
    }))
  )

  // 화면 공유 스트림 종료 시 화면 공유 종료
  useEffect(() => {
    const mediaStream = screenPublisher?.stream.getMediaStream()
    mediaStream?.getTracks().forEach((track) => {
      track.addEventListener('ended', async () => {
        console.log('track ended')
        await stopScreenShare()
        setIsScreenSharing(false)
      })
    })

    return () => {
      mediaStream?.getTracks().forEach((track) => {
        track.removeEventListener('ended', async () => {
          console.log('track ended')
          setIsScreenSharing(false)
        })
      })
    }
  }, [screenPublisher])

  const handleEndPresentation = () => {
    setIsModalOpen(true)
    setModalStep(ModalSteps.PRESENTATION.PRESENTATION_END_CONFIRM)
  }

  return (
    <div className="flex flex-col justify-start flex-1 gap-4 animate-in fade-in-0">
      <div className="absolute flex items-center justify-between w-3/6 gap-5 p-2 rounded-md top-5 left-52 ">
        <section className="flex items-center justify-center gap-5">
          <span className="px-4 py-1 text-sm text-white rounded-full bg-red-400/80 animate-pulse">
            화면 공유 중
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold">발표자</span>
            <span className="text-lg text-white ">
              ✨ {presenterName ?? ''} ✨
            </span>
          </div>
        </section>
        <section className="flex items-center justify-center gap-5">
          <div className="flex items-center gap-4 text-sm text-white">
            <span>남은 발표 시간</span>
            <span className="text-lg font-bold">00:00</span>
          </div>
          <button
            onClick={handleEndPresentation}
            className="px-4 py-1 text-sm text-white rounded-full bg-ssacle-blue hover:bg-ssacle-blue/90"
          >
            발표 완료
          </button>
        </section>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        {isScreenSharing && screenPublisher && (
          <video
            autoPlay
            playsInline
            className="w-full h-full object-contain max-h-[calc(100vh-10rem)] rounded-md"
            ref={(el: HTMLVideoElement) =>
              el && screenPublisher.addVideoElement(el)
            }
          />
        )}
      </div>
    </div>
  )
}
export default ScreenShareView
