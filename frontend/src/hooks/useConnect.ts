import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { useStreamStore } from '@/store/useStreamStore'
import {
  OpenVidu,
  Publisher,
  Session,
  SessionEventMap,
  Subscriber,
} from 'openvidu-browser'
import { useCallback, useState } from 'react'
import { useConferenceEvents } from '@/hooks/useConferenceEvents'

export const useConnect = () => {
  const { isMicOn, isCameraOn, isScreenSharing } = useStreamStore()
  const {
    OV,
    session,
    publisher,
    subscribers,
    mainStreamManager,
    setOV,
    setSession,
    setPublisher,
    setSubscribers,
    setMainStreamManager,
  } = useOpenviduStateStore()

  const {
    connections,
    handleStreamCreated,
    handleStreamDestroyed,
    handleConnectionCreated,
    handleConnectionDestroyed,
  } = useConferenceEvents() // 컨퍼런스 이벤트 훅

  const [currentVideoDevice, setCurrentVideoDevice] = useState()

  // 카메라 전환
  const switchCamera = useCallback(async () => {
    try {
      if (!OV || !currentVideoDevice) return

      const devices = await OV.getDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      )

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        )

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          if (mainStreamManager instanceof Publisher) {
            await session?.unpublish(mainStreamManager)
          }
          await session?.publish(newPublisher)
          setCurrentVideoDevice(newVideoDevice[0])
          setMainStreamManager(newPublisher)
          setPublisher(newPublisher)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [OV, currentVideoDevice, mainStreamManager, session])

  const joinSession = async (token: string) => {
    try {
      //   if (session) leaveSession() // 이미 세션이 있으면 세션 나가기

      /** OpenVidu 인스턴스 생성 */
      const openvidu = new OpenVidu()
      openvidu.enableProdMode() // 프로덕션 모드 활성화 : 불필요한 로그 비활성화

      setOV(openvidu)
      const newSession = openvidu.initSession()

      /** 이벤트 핸들러 설정 */
      newSession.on('streamCreated', handleStreamCreated)
      newSession.on('streamDestroyed', handleStreamDestroyed)
      newSession.on('connectionCreated', handleConnectionCreated)
      newSession.on('connectionDestroyed', handleConnectionDestroyed)

      console.log('🔹 token - useConnect', token)
      if (!token) throw new Error('토큰이 유효하지 않습니다.')
      /** 세션 연결 */
      await newSession.connect(token)

      /** 퍼블리셔 초기화 */
      const newPublisher = await publisherInitialize(openvidu, newSession)

      setPublisher(newPublisher) // 퍼블리셔 설정
      await newSession.publish(newPublisher) // 세션에 퍼블리셔 발행
      setSession(newSession) // 세션 설정
      setMainStreamManager(newPublisher) // 메인 스트림 매니저 설정

      return newPublisher
    } catch (error) {
      console.error('❌ 세션 연결 실패:', error)
    }
  }

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect()
    }

    setOV(null)
    setSession(null)
    setSubscribers([])
    setMainStreamManager(null)
    setPublisher(null)
  }, [session])

  const publisherInitialize = async (OV: OpenVidu, newSession: Session) => {
    try {
      // 퍼블리셔 초기화
      const newPublisher = OV.initPublisher(undefined, {
        videoSource: undefined,
        audioSource: undefined,
        publishAudio: isMicOn,
        publishVideo: isCameraOn,
        resolution: '1280x720',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: true,
      })

      return newPublisher
    } catch (error) {
      console.error('Publisher 초기화 실패:', error)
      throw error
    }
  }

  return { joinSession, leaveSession, switchCamera }
}
