import useScreenShare from '@/hooks/useScreenShare'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { useStreamStore } from '@/store/useStreamStore'
import { useEffect } from 'react'

const ScreenShareView = () => {
  const isScreenSharing = useStreamStore((state) => state.isScreenSharing)
  const { screenPublisher } = useOpenviduStateStore()
  const setIsScreenSharing = useStreamStore((state) => state.setIsScreenSharing)
  const { stopScreenShare } = useScreenShare()

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

  return (
    <div className="flex-1 w-full h-full animate-in fade-in-0">
      <div className="flex items-center justify-center w-full h-full">
        {isScreenSharing && screenPublisher && (
          <video
            autoPlay
            playsInline
            className="object-cover w-11/12 rounded-md h-11/12"
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
