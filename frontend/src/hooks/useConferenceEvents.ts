import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Publisher,
  SessionEventMap,
  SignalEvent,
  StreamManager,
  Subscriber,
} from 'openvidu-browser'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { useShallow } from 'zustand/shallow'
import { useStreamStore } from '@/store/useStreamStore'
import useRoomStateStore from '@/store/useRoomStateStore'
import { useParams } from 'react-router-dom'
import { usePresentationStore } from '@/store/usePresentationStore'
import {
  SignalStateKeys,
  usePresentationSignalStore,
} from '@/store/usePresentationSignalStore'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import { useSignalEvents } from '@/hooks/useSignalEvents'

export function useConferenceEvents() {
  const { roomId } = useParams()
  // openvidu state store에서 상태 관리
  const { subscribers, setSubscribers, session, setScreenPublisher } =
    useOpenviduStateStore(
      useShallow((state) => ({
        subscribers: state.subscribers,
        setSubscribers: state.setSubscribers,
        session: state.session,
        setScreenPublisher: state.setScreenPublisher,
      }))
    )

  // room state store에서 참여자 데이터 관리
  const { addRoomConnectionData, removeRoomConnectionData } = useRoomStateStore(
    useShallow((state) => ({
      addRoomConnectionData: state.addRoomConnectionData,
      removeRoomConnectionData: state.removeRoomConnectionData,
    }))
  )

  // stream store에서 화면 공유 상태 관리
  const { setIsScreenSharing } = useStreamStore(
    useShallow((state) => ({
      setIsScreenSharing: state.setIsScreenSharing,
    }))
  )

  // presentation store에서 발표 참여자 수 관리
  const { targetConnectionCount } = usePresentationStore(
    useShallow((state) => ({
      targetConnectionCount: state.targetConnectionCount,
    }))
  )

  const { presentationStatus, signalStates, addSignalConnection } =
    usePresentationSignalStore(
      useShallow((state) => ({
        presentationStatus: state.presentationStatus,
        signalStates: state.signalStates,
        addSignalConnection: state.addSignalConnection,
      }))
    )

  const { setIsAllConnection } = usePresentationStore(
    useShallow((state) => ({
      setIsAllConnection: state.setIsAllConnection,
    }))
  )

  const { setIsModalOpen, setModalStep, modalStep } =
    usePresentationModalStateStore(
      useShallow((state) => ({
        setIsModalOpen: state.setIsModalOpen,
        setModalStep: state.setModalStep,
        modalStep: state.modalStep,
      }))
    )

  const { handleSignal } = useSignalEvents({
    setIsModalOpen,
    setModalStep,
    modalStep,
    targetConnectionCount,
  })

  // ref를 사용해 항상 최신 session을 참조
  const sessionRef = useRef(session)
  useEffect(() => {
    sessionRef.current = session
  }, [session])

  // ✅ 시그널 이벤트 처리
  const signalHandler = useCallback(
    (event: SignalEvent) => {
      const connectionId = event.from?.connectionId
      const signalData = JSON.parse(event.data as string)
      const signalType = signalData.type // presentationStatus의 value 값이 들어옴

      // 이미 처리된 시그널인지 확인
      if (
        signalStates[signalType as SignalStateKeys[keyof SignalStateKeys]].has(
          connectionId as string
        )
      ) {
        // value 값에 대한 connectionId 저장
        console.log('이미 저장되어있는 시그널입니다.')
        return
      }

      try {
        // 새로운 시그널 연결 추가
        addSignalConnection(signalType, connectionId as string)
        // 시그널 처리
        handleSignal(signalType)
      } catch (error) {
        console.error('시그널 처리 중 오류 발생:', error)
      }
    },
    [signalStates, addSignalConnection, handleSignal]
  )

  // ✅ 시그널 이벤트 처리
  useEffect(() => {
    if (!sessionRef.current) return
    sessionRef.current.on('signal', signalHandler)
    // 클린업 함수
    return () => {
      if (sessionRef.current) {
        sessionRef.current.off('signal', signalHandler)
      }
    }
  }, [sessionRef.current, signalHandler])

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

    // 다른 사용자의 화면 공유 스트림이 종료되었을 때
    if (isScreenSharing && !isMyStream) {
      console.log('다른 사용자의 화면 공유 스트림 종료')
      session?.unsubscribe(event.stream as unknown as Subscriber)
      setScreenPublisher(null)
      setIsScreenSharing(false)
    } else if (!isScreenSharing && !isMyStream) {
      // connectionId 가 아닌 streamId 를 기준으로 필터링하여, 동일 연결의 다른 스트림에는 영향을 주지 않습니다.
      setSubscribers((prev: Subscriber[]) => {
        const newSub = prev.filter(
          (sub: StreamManager) => sub.stream.streamId !== event.stream.streamId
        )
        return newSub
      })
    }
  }

  // ✅ 동적으로 연결 이벤트 처리 (connectionCreated)
  const handleConnectionCreated = useCallback(
    (event: SessionEventMap['connectionCreated']) => {
      console.log('새로운 사용자가 입장:', event.connection)
      const { username, userId } = JSON.parse(event.connection.data as string)

      // 발표 참여자 수 증가
      // setConnectionCount()
      const remoteConnectionCount = sessionRef.current?.remoteConnections.size

      // 시작 전, 모든 참여자가 접속 완료 시, 발표 시작 신호 전송
      const isAllConnection =
        remoteConnectionCount === targetConnectionCount - 1 &&
        presentationStatus === 'INITIAL' // Key 값으로 비교

      if (isAllConnection) {
        setIsAllConnection(true)
      }

      // roomId 별로 참여자 데이터를 저장합니다.
      addRoomConnectionData(roomId as string, {
        username: username as string,
        userId: userId as string,
      })
    },
    []
  )

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

  return useMemo(
    () => ({
      handleStreamCreated,
      handleStreamDestroyed,
      handleConnectionCreated,
      handleConnectionDestroyed,
    }),
    [handleStreamCreated, handleStreamDestroyed, handleConnectionCreated]
  )
}
