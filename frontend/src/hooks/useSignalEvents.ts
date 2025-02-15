import { useMemo, useCallback } from 'react'
import debounce from 'lodash/debounce'
import {
  getNextPresentationStatus,
  NEXT_PRESENTATION_STATUS,
  PRESENTATION_STATUS,
  PresentationStatus,
} from '@/constants/presentationStatus'
import {
  SignalStateKeys,
  usePresentationSignalStore,
} from '@/store/usePresentationSignalStore'
import { getModalStep } from '@/constants/modalStep'

interface UseSignalEventsProps {
  setIsModalOpen: (isOpen: boolean) => void
  setModalStep: (step: string) => void
  modalStep: string
  targetConnectionCount: number // 목표 참가자 수
}

export const useSignalEvents = ({
  setIsModalOpen,
  setModalStep,
  targetConnectionCount,
}: UseSignalEventsProps) => {
  // Zustand 스토어에서 필요한 메서드들을 가져옵니다
  const { signalStates, addSignalConnection } = usePresentationSignalStore()

  // 시그널 이벤트 처리
  const debouncedHandleSignal = useMemo(
    () =>
      debounce((signalType: PresentationStatus) => {
        const nextStatus = getNextPresentationStatus(signalType) // key 값 반환

        const nextModalStep = getModalStep(nextStatus as PresentationStatus) // 다음 발표 상태의 key 값을 전달하면 해당 다음 모달을 반환
        console.log('nextModalStep', nextModalStep)

        setIsModalOpen(true)
        setModalStep(nextModalStep)
      }, 300),
    [setIsModalOpen, setModalStep]
  )

  // OpenVidu 시그널 처리 함수
  const handleSignal = useCallback(
    (signalType: PresentationStatus) => {
      // 현재 시그널에 대한 연결 수가 목표 참가자 수에 도달했는지 확인
      if (
        signalStates[signalType as SignalStateKeys[keyof SignalStateKeys]]
          .size ===
        targetConnectionCount - 1
      ) {
        console.log('모든 참가자가 준비되었습니다!', signalType)
        debouncedHandleSignal(signalType)
      }
    },
    [signalStates, targetConnectionCount, debouncedHandleSignal]
  )

  return {
    handleSignal,
    addSignalConnection,
  }
}
