import { useMemo, useCallback } from 'react'
import debounce from 'lodash/debounce'
import {
  getNextPresentationStatus,
  PRESENTATION_STATUS,
  PresentationStatus,
} from '@/constants/presentationStatus'
import {
  SignalStateKeys,
  usePresentationSignalStore,
} from '@/store/usePresentationSignalStore'
import { getModalStep, ModalSteps } from '@/constants/modalStep'
import { useShallow } from 'zustand/shallow'
import { SignalEvent } from 'openvidu-browser'

interface UseSignalEventsProps {
  myConnectionId: string | null
  setIsModalOpen: (isOpen: boolean) => void
  setModalStep: (step: string) => void
  modalStep: string
  targetConnectionCount: number // 목표 참가자 수
  setIsQuestionSelected: (isQuestionSelected: boolean) => void
  setSelectedQuestion: (selectedQuestion: Question) => void
}

export const useSignalEvents = ({
  myConnectionId,
  setIsModalOpen,
  setModalStep,
  targetConnectionCount,
  setIsQuestionSelected,
  setSelectedQuestion,
}: UseSignalEventsProps) => {
  // Zustand 스토어에서 필요한 메서드들을 가져옵니다
  const {
    presentationStatus,
    signalStates,
    addSignalConnection,
    setPresentationStatus,
  } = usePresentationSignalStore(
    useShallow((state) => ({
      presentationStatus: state.presentationStatus,
      signalStates: state.signalStates,
      addSignalConnection: state.addSignalConnection,
      setPresentationStatus: state.setPresentationStatus,
    }))
  )

  /**
   * 시그널 이벤트 처리
   * 1️⃣ 현재 받은 신호 - 이것에 대한 모달을 띄움
   * 2️⃣ 다음 발표 상태- 이것으로 발표 상태 업데이트
   * 3️⃣ 다음 모달 - 이것으로 모달 업데이트
   */
  const debouncedAllHandleSignal = useMemo(
    () =>
      debounce((signalType: PresentationStatus) => {
        const nextStatus = getNextPresentationStatus(signalType) // key 값 반환
        const nextModalStep = getModalStep(signalType as PresentationStatus) // 다음 발표 상태의 key 값을 전달하면 해당 다음 모달을 반환

        if (nextModalStep) {
          setIsModalOpen(true)
          setModalStep(nextModalStep) // 다음 모달이 있으면 모달 업데이트
        } else {
          setPresentationStatus(nextStatus as PresentationStatus)
          setIsModalOpen(false)
        }

        // setPresentationStatus(signalType as PresentationStatus)

        // console.log('1️⃣ 현재 받은 신호 - 이것에 대한 모달을 띄움', signalType)
        // console.log(
        //   '2️⃣ 다음 발표 상태- 이것으로 발표 상태 업데이트',
        //   nextStatus
        // )
        // console.log('3️⃣ 다음 모달 - 이것으로 모달 업데이트', nextModalStep)
      }, 300),
    [setIsModalOpen, setModalStep, setPresentationStatus]
  )

  const readySignalHandler = useCallback(
    (event: SignalEvent) => {
      const {
        data: signalType,
        selectedQuestion,
        presenterInfo,
      } = JSON.parse(event.data as string)
      setPresentationStatus(signalType)
      if (signalType === PRESENTATION_STATUS.QUESTION_ANSWER) {
        // 질문 모달을 띄우기 위한 상태 변환??
        setIsQuestionSelected(true)
        setSelectedQuestion(selectedQuestion)
      }
      setIsModalOpen(false)
    },
    [setIsModalOpen]
  )

  const endSignalHandler = useCallback(
    (event: SignalEvent) => {
      const { data: signalType } = JSON.parse(event.data as string)

      setIsModalOpen(true)
      // 발표 종료 모달
      signalType === PRESENTATION_STATUS.PENDING_END &&
        setModalStep(ModalSteps.PRESENTATION.PRESENTATION_END)

      // 질문 중간 종료 모달
      if (signalType === PRESENTATION_STATUS.QUESTION_ANSWER_MIDDLE_END) {
        setModalStep(ModalSteps.QUESTION.ANSWER_MIDDLE_END)
        setIsQuestionSelected(false)
      }

      // 질문 종료 모달
      signalType === PRESENTATION_STATUS.QUESTION_END &&
        setModalStep(ModalSteps.QUESTION.ANSWER_END)
    },
    [setIsModalOpen, setModalStep]
  )

  type SignalTarget = 'all' | 'individual' | 'presenter' | 'questioner'

  // OpenVidu 시그널 처리 함수
  const handleSignal = useCallback(
    (signalType: SignalStateKeys, target: SignalTarget, connectId?: string) => {
      switch (target) {
        case 'all':
          // 현재 시그널에 대한 연결 수가 목표 참가자 수에 도달했는지 확인
          if (
            signalStates[signalType as SignalStateKeys].size ===
            targetConnectionCount - 1
          ) {
            debouncedAllHandleSignal(signalType)
          }
          break
        case 'individual':
          // console.log('나 참여자야?', connectId)

          if (signalType === PRESENTATION_STATUS.PRESENTER_INTRO) {
            setIsModalOpen(true)
            setModalStep(ModalSteps.PRESENTATION.PRESENTATION_WAITING)
          } else if (
            signalType === PRESENTATION_STATUS.QUESTION_ANSWERER_INTRO
          ) {
            setIsModalOpen(true)
            setModalStep(ModalSteps.QUESTION.ANSWER_WAITING)
          }
          break
        case 'presenter':
          if (connectId !== myConnectionId) return // 내가 발표자가 아니면 처리하지 않음
          // console.log('나 발표자야?', connectId)

          // 여기서 질문 답변 준비 신호 보내기
          if (signalType === PRESENTATION_STATUS.PRESENTER_INTRO) {
            setModalStep(ModalSteps.PRESENTATION.PRESENTER_INTRODUCTION)
            setIsModalOpen(true)
          } else if (
            signalType === PRESENTATION_STATUS.QUESTION_ANSWERER_INTRO
          ) {
            setModalStep(ModalSteps.QUESTION.ANSWER_INTRODUCTION)
            setIsModalOpen(true)
          }
          break
      }
    },
    [signalStates, targetConnectionCount, debouncedAllHandleSignal]
  )

  return {
    handleSignal,
    addSignalConnection,
    readySignalHandler,
    endSignalHandler,
  }
}
