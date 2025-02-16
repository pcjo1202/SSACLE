import { ModalSteps } from '@/constants/modalStep'
import {
  PRESENTATION_STATUS,
  PRESENTATION_STATUS_KEYS,
} from '@/constants/presentationStatus'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import { usePresentationSignalStore } from '@/store/usePresentationSignalStore'
import { usePresentationStore } from '@/store/usePresentationStore'
import { useEffect, useRef, type FC } from 'react'
import { useShallow } from 'zustand/shallow'

interface StepContainerProps {
  children: React.ReactNode
}

const StepContainer: FC<StepContainerProps> = ({ children }) => {
  const session = useOpenviduStateStore((state) => state.session)
  const { presentationStatus } = usePresentationSignalStore(
    useShallow((state) => ({
      presentationStatus: state.presentationStatus,
    }))
  )

  const questionStep = useRef<Array<string>>(() => {
    session?.streamManagers.map((manager) => {
      // const {username} = JSON.parse(manager.stream.connection.data as string)
      // return username
    })
  })
  useEffect(() => {
    // 발표 시작 상태일 때 5초 후 발표자 소개 신호 전송
    if (presentationStatus === PRESENTATION_STATUS_KEYS.START) {
      const randomPresenter = Math.floor(
        Math.random() * (session?.streamManagers?.length ?? 0)
      )

      const presenterConnectionId =
        session?.streamManagers[randomPresenter].stream.connection.connectionId
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
      }, 5000)
    }
    // 질문 준비 신호 전송
    // 답변자 정하기,
    else if (
      presentationStatus === PRESENTATION_STATUS_KEYS.QUESTION_ANSWERER_INTRO
    ) {
      questionStep.current.length < 3
        ? // 질문 답변 횟수
          setTimeout(() => {
            session?.signal({
              data: JSON.stringify({
                data: PRESENTATION_STATUS.QUESTION_ANSWER,
                presenterName,
              }),
            })
            questionStep.current.push(presenterName)
          }, 5000)
        : // 모든 답변이 끝나면 질문 카드 종료 신호 전송
          setTimeout(() => {
            session?.signal({
              data: JSON.stringify({
                data: PRESENTATION_STATUS.QUESTION_END,
              }),
            })
          }, 5000)
    }

    //
  }, [presentationStatus])
  return <div>{children}</div>
}
export default StepContainer

/**
 * Todo : 모든 사용자가 초대되었는지 확인 -> 발표 시작 준비 모달 띄우기
 *  *  어떻게 확인?? session connection 에 모든 사용자 (해당 sprint의 참여자 수)가 참여했는지 확인
 */

/**
 * Todo : 모든 사용자각 발표 준비  모달을 눌렀을 때 발표 시작
 * * 모든 사용자각 발표 준비  모달을 눌렀을 때 openvidu signal 전송
 *    * 모든 사용자가 발표 준비가 완료 되면 모달 닫힘 (2초후 현재 발표 단계 업데이트 : Go 발표)
 */

/**
 * Todo : 발표 단계가 "발표 단계"로 업데이트 되면 발표자 랜덤으로 선택 후 전체 알림 모달 띄우기
 *  * 발표자 - 화면 공유 버튼 (시작버튼)
 *  * 일반 사용자 - 확인 버튼
 */

/**
 *  Todo : 발표 후 10분 뒤 발표 종료 모달 띄우기
 * */

/**
 *  Todo : 발표 종료 모달 띄우면 5초 후 발표 종료 (현재 발표 단계 업데이트 : Go 질문 카드 답변)
 * */

/**
 *  Todo : 발표 단계가 "질문 카드" 로 업데이트 되면 질문 카드 UI 띄우기
 * */

/**
 *  Todo : 랜덤으로 발표자를 선택하고 발표자 모달 띄우기
 * */

/**
 *  Todo : 발표자 모달 띄우면 5초 후 발표자 모달 종료 (현재 발표 단계 업데이트 : Go 발표)
 * */
