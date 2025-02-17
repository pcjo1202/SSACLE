import {
  PRESENTATION_STATUS,
  PRESENTATION_STATUS_KEYS,
} from '@/constants/presentationStatus'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { usePresentationSignalStore } from '@/store/usePresentationSignalStore'
import useRoomStateStore from '@/store/useRoomStateStore'
import { useEffect, useMemo, useRef, useState, type FC } from 'react'
import { useShallow } from 'zustand/shallow'
import { useParams } from 'react-router-dom'
import { usePresentationStore } from '@/store/usePresentationStore'

interface StepContainerProps {
  children: React.ReactNode
}

const StepContainer: FC<StepContainerProps> = ({ children }) => {
  const session = useOpenviduStateStore((state) => state.session)
  const { roomId } = useParams()
  const [questionStep, setQuestionStep] = useState<
    {
      userId: string
      connectionId: string
    }[]
  >([])

  // 발표 상태 관리
  const { presentationStatus } = usePresentationSignalStore(
    useShallow((state) => ({
      presentationStatus: state.presentationStatus,
    }))
  )

  const { setIsQuestionCompleted } = usePresentationStore(
    useShallow((state) => ({
      setIsQuestionCompleted: state.setIsQuestionCompleted,
    }))
  )

  // 방 참여자 데이터 관리
  const roomConnectionData = useRoomStateStore(
    (state) => state.roomConnectionData[roomId as string]
  )

  useEffect(() => {
    setQuestionStep(
      roomConnectionData?.map(({ userId, connectionId }) => ({
        userId,
        connectionId,
      })) ?? []
    )
  }, [roomConnectionData])

  // 질문 답변 횟수 관리 (userId 배열)
  // 최신화가 될까?

  useEffect(() => {
    switch (presentationStatus) {
      // Todo 발표 시작 상태일 때 5초 후 발표자 소개 신호 전송
      case PRESENTATION_STATUS_KEYS.START:
        // 발표자 랜덤 선택
        const randomPresenter = Math.floor(
          Math.random() * (session?.streamManagers?.length ?? 0)
        )

        // 발표자 connection ID
        const presenterConnectionId =
          session?.streamManagers[randomPresenter].stream.connection
            .connectionId

        // 발표자 이름
        const { username: presenterName } = JSON.parse(
          session?.streamManagers[randomPresenter].stream.connection
            .data as string
        )

        // 발표자 소개 신호 전송
        setTimeout(() => {
          session?.signal({
            data: JSON.stringify({
              data: PRESENTATION_STATUS.PRESENTER_INTRO,
              presenterConnectionId,
              presenterName,
            }),
            type: 'presentationStatus',
          })
        }, 3000)
        break
      // Todo : 질문 준비 신호 전송
      // 답변자 정하기,
      case PRESENTATION_STATUS_KEYS.QUESTION_ANSWERER_INTRO:
        console.log('질문 준비 신호 전송')
        if (questionStep.length > 0) {
          // 발표자 랜덤 선택
          const randomPresenter = Math.floor(
            Math.random() * (questionStep.length ?? 0)
          )

          // 발표자 connection ID
          const presenterConnectionId =
            session?.streamManagers[randomPresenter].stream.connection
              .connectionId

          // 발표자 이름
          const { username: presenterName } = JSON.parse(
            session?.streamManagers[randomPresenter].stream.connection
              .data as string
          )

          setTimeout(() => {
            session?.signal({
              data: JSON.stringify({
                data: PRESENTATION_STATUS.QUESTION_ANSWERER_INTRO,
                presenterConnectionId,
                presenterName,
              }),
              type: 'presentationStatus',
            })

            // 발표자 이름 배열에서 제거
            setQuestionStep((prev) =>
              prev.filter((step) => step.connectionId !== presenterConnectionId)
            )

            // 마지막 답변자였을 경우
            if (questionStep.length === 0) {
              setIsQuestionCompleted(true)
            }
          }, 3000)
        } else {
          setTimeout(() => {
            session?.signal({
              data: JSON.stringify({
                data: PRESENTATION_STATUS.QUESTION_END,
              }),
              type: 'end',
            })
          }, 3000)
        }
        break
    }
  }, [presentationStatus])
  return <div>{children}</div>
}
export default StepContainer
