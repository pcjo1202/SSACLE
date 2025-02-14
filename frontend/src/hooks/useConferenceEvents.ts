import { useCallback, useState } from 'react'
import {
  Connection,
  Publisher,
  Session,
  SessionEventMap,
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
    subscribers,
    setSubscribers,
    session,
    setSession,
    setScreenPublisher,
  } = useOpenviduStateStore(
    useShallow((state) => ({
      subscribers: state.subscribers,
      setSubscribers: state.setSubscribers,
      session: state.session,
      setSession: state.setSession,
      screenPublisher: state.screenPublisher,
      setScreenPublisher: state.setScreenPublisher,
    }))
  )

  const { addRoomConnectionData, removeRoomConnectionData } = useRoomStateStore(
    useShallow((state) => ({
      addRoomConnectionData: state.addRoomConnectionData,
      removeRoomConnectionData: state.removeRoomConnectionData,
    }))
  )

  const { setIsScreenSharing } = useStreamStore(
    useShallow((state) => ({
      setIsScreenSharing: state.setIsScreenSharing,
    }))
  )
  const [connections, setConnections] = useState<Connection[]>([])

  // ✅ 스트림 생성 핸들러 : 새로운 사용자의 화면, 카메라 스트림 구독
  const handleStreamCreated = (
    event: SessionEventMap['streamCreated'],
    newsession: Session
  ) => {
    const isScreenSharing =
      event.stream?.typeOfVideo?.toLocaleLowerCase() === 'screen' // 화면 공유 스트림 여부 확인
    console.log(
      '새로운 스트림 생성 발견',
      event.stream?.typeOfVideo?.toLocaleLowerCase()
    )
    const isMyStream =
      event.stream.connection.connectionId ===
      newsession?.connection.connectionId // 내 스트림 여부 확인
    if (isScreenSharing) {
      // 내 스트림이 아닌 경우에만 구독
      console.log('화면 공유 발생')
      if (!isMyStream) {
        const screenSubscriber = newsession?.subscribe(event.stream, undefined)
        setScreenPublisher(screenSubscriber as unknown as Publisher)
        setIsScreenSharing(true)
      }
    } else {
      const newSubscriber = newsession?.subscribe(event.stream, undefined)
      setSubscribers((prev: Subscriber[]) => [...prev, newSubscriber])
    }
    setSession(newsession)
  }

  // ✅ 스트림 삭제 핸들러
  const handleStreamDestroyed = (
    event: SessionEventMap['streamDestroyed'],
    newsession: Session
  ) => {
    setSubscribers(
      subscribers.filter(
        (sub: Subscriber) =>
          sub.stream.connection.connectionId !==
          event.stream.connection.connectionId
      )
    )

    const isMyStream =
      event.stream.connection.connectionId === session?.connection.connectionId

    // 이벤트 스트림이 화면 공유 스트림일 때만 화면 공유 종료 로직 실행
    const isScreenSharing =
      event.stream?.typeOfVideo?.toLocaleLowerCase() === 'screen'

    if (isScreenSharing && !isMyStream) {
      console.log('화면 공유 스트림 종료')
      session?.unsubscribe(event.stream as unknown as Subscriber)
      setScreenPublisher(null)
      setIsScreenSharing(false)
    }
    setSession(newsession)
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
