import { useEffect, useRef, useState } from 'react'
import {
  Connection,
  Publisher,
  SessionEventMap,
  StreamManager,
  Subscriber,
} from 'openvidu-browser'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { useShallow } from 'zustand/shallow'
import { useStreamStore } from '@/store/useStreamStore'
import useRoomStateStore from '@/store/useRoomStateStore'
import { useParams } from 'react-router-dom'

export function useConferenceEvents() {
  const { roomId } = useParams()
  const {
    OV,
    subscribers,
    setSubscribers,
    session,
    setSession,
    setScreenPublisher,
  } = useOpenviduStateStore(
    useShallow((state) => ({
      OV: state.OV,
      subscribers: state.subscribers,
      setSubscribers: state.setSubscribers,
      session: state.session,
      setSession: state.setSession,
      screenPublisher: state.screenPublisher,
      setScreenPublisher: state.setScreenPublisher,
    }))
  )

  // 🔹 room state store에서 참여자 데이터 관리
  const { addRoomConnectionData, removeRoomConnectionData } = useRoomStateStore(
    useShallow((state) => ({
      addRoomConnectionData: state.addRoomConnectionData,
      removeRoomConnectionData: state.removeRoomConnectionData,
    }))
  )

  // 🔹 stream store에서 화면 공유 상태 관리
  const { setIsScreenSharing } = useStreamStore(
    useShallow((state) => ({
      setIsScreenSharing: state.setIsScreenSharing,
    }))
  )

  // ref를 사용해 항상 최신 OV를 참조
  const OVRef = useRef(OV)
  useEffect(() => {
    OVRef.current = OV
  }, [OV])

  // ref를 사용해 항상 최신 session을 참조
  const sessionRef = useRef(session)
  useEffect(() => {
    sessionRef.current = session
  }, [session])

  const [connections, setConnections] = useState<Connection[]>([])

  // ✅ 스트림 생성 핸들러 : 새로운 사용자의 카메라 스트림 및 화면 공유 스트림 구독
  const handleStreamCreated = (event: SessionEventMap['streamCreated']) => {
    const currentSession = sessionRef.current
    const streamType = event.stream?.typeOfVideo?.toLowerCase() // 스트림 타입 확인

    console.log('새로운 스트림 생성 발견 - videoType', streamType)
    const isMyStream =
      event.stream?.connection?.connectionId ===
      currentSession?.connection.connectionId // 내 스트림 여부 확인

    switch (streamType) {
      case 'screen': //화면 공유
        if (!isMyStream) {
          const screenSubscriber = currentSession?.subscribe(
            event.stream,
            undefined
          )
          if (screenSubscriber) {
            setScreenPublisher(screenSubscriber as unknown as Publisher)
          }
          setIsScreenSharing(true)
        }
        break
      default:
        console.log('새로운 사용자 카메라 스트림 구독')
        const newSubscriber = currentSession?.subscribe(event.stream, undefined)
        if (newSubscriber) {
          setSubscribers((prev: Subscriber[]) => [...prev, newSubscriber])
        }
        break
    }
  }

  // ✅ 스트림 삭제 핸들러 (다른 사용자의 스트림 삭제)
  const handleStreamDestroyed = (event: SessionEventMap['streamDestroyed']) => {
    console.log('스트림 삭제 핸들러 - 스트림', event.stream)

    const isMyStream =
      event.stream.connection.connectionId === session?.connection.connectionId
    const isScreenSharing =
      event.stream?.typeOfVideo?.toLowerCase() === 'screen'

    console.log('isMyStream', isMyStream)
    console.log('isScreenSharing', isScreenSharing)

    // 다른 사용자의 화면 공유 스트림이 종료되었을 때
    if (isScreenSharing && !isMyStream) {
      console.log('다른 사용자의 화면 공유 스트림 종료')
      session?.unsubscribe(event.stream as unknown as Subscriber)
      setScreenPublisher(null)
      setIsScreenSharing(false)
    } else if (!isScreenSharing && !isMyStream) {
      // connectionId 가 아닌 streamId 를 기준으로 필터링하여, 동일 연결의 다른 스트림에는 영향을 주지 않습니다.
      setSubscribers((prev: Subscriber[]) => {
        console.log('prev', prev)
        const newSub = prev.filter(
          (sub: StreamManager) => sub.stream.streamId !== event.stream.streamId
        )

        console.log('newSub', newSub)

        return newSub
      })
      console.log('session?.subscribe', session?.subscribe)
    }
  }

  // ✅ 동적으로 연결 이벤트 처리 (connectionCreated)
  const handleConnectionCreated = (
    event: SessionEventMap['connectionCreated']
  ) => {
    console.log('새로운 사용자가 입장:', event.connection)
    const { username, userId } = JSON.parse(event.connection.data as string)

    // roomId 별로 참여자 데이터를 저장합니다.
    addRoomConnectionData(roomId as string, {
      username: username as string,
      userId: userId as string,
    })

    console.log('openvidu', OVRef.current)
  }

  // ✅ 연결 해제 이벤트 처리 (connectionDestroyed)
  const handleConnectionDestroyed = (
    event: SessionEventMap['connectionDestroyed']
  ) => {
    console.log('사용자가 퇴장:', event.connection.connectionId)

    const { username, userId } = JSON.parse(event.connection.data as string)

    // roomId 별로 참여자 데이터를 삭제합니다.
    removeRoomConnectionData(roomId as string, {
      username: username as string,
      userId: userId as string,
    })

    console.log('연결 해제 핸들러 - 사용자 목록', subscribers)
  }

  return {
    subscribers,
    connections,
    setSubscribers,
    setConnections,
    handleStreamCreated,
    handleStreamDestroyed,
    handleConnectionCreated,
    handleConnectionDestroyed,
  }
}
