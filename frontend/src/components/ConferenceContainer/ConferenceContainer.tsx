import { OpenVidu, Publisher, Session, Subscriber } from 'openvidu-browser'
import { useCallback, useEffect, useRef } from 'react'
import VideoLayout from '@/components/layout/VideoLayout'
import StreamVideoCard from '@/components/PresentationPage/StreamVideoCard/StreamVideoCard'
import { useConferenceEvents } from '@/hooks/useConferenceEvents'
import { useStreamStore } from '@/store/useStreamStore'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { useConnect } from '@/hooks/useConnect'

const ConferenceContainer = ({
  sessionId,
  token,
}: {
  sessionId: string
  token: string
}) => {
  const { publisher, subscribers } = useOpenviduStateStore()
  const { isScreenSharing } = useStreamStore()

  const { joinSession, leaveSession } = useConnect()
  const publisherRef = useRef<HTMLVideoElement | null>(null)
  const subscribersRefs = useRef<HTMLVideoElement[]>([])

  const { connections } = useConferenceEvents()

  // 비디오 스트림 업데이트
  const updateSubscriberVideos = async () => {
    subscribers.forEach((subscriber) => {
      const videoElement = subscribersRefs.current[subscriber.stream.streamId]
      if (videoElement) {
        videoElement.srcObject = subscriber.stream.getMediaStream()
      }
    })

    console.log('🔹 subscribersRefs - in conference container', subscribersRefs)
  }

  useEffect(() => {
    if (sessionId && token) {
      joinSession(token) //
        .then((newPublisher: Publisher | undefined) => {
          console.log('🔹 newPublisher - in conference container', newPublisher)
          publisherRef.current &&
            (publisherRef.current.srcObject =
              newPublisher?.stream.getMediaStream())
        })
    }

    return () => leaveSession()
  }, [])

  useEffect(() => {
    updateSubscriberVideos()
  }, [subscribers])

  return (
    <div className="w-full h-[calc(100vh-11rem)]">
      <VideoLayout
        connectCount={connections.length} // 컨퍼런스 참여자 수
        isScreenSharing={isScreenSharing}
      >
        {/* 발행자 영상 */}
        {publisher && <StreamVideoCard ref={publisherRef} />}
        {/* 참여자 영상 */}
        {subscribers?.map((subscriber) => (
          <StreamVideoCard
            key={subscriber.stream.streamId}
            ref={(element) => {
              if (element) {
                subscribersRefs.current[subscriber.stream.streamId] = element
              }
            }}
          />
        ))}
      </VideoLayout>
    </div>
  )
}

export default ConferenceContainer
