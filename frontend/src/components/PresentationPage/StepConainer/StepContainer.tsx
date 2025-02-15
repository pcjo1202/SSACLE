import { ModalSteps } from '@/constants/modalStep'
import { PRESENTATION_STATUS } from '@/constants/presentationStatus'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import { usePresentationStore } from '@/store/usePresentationStore'
import { useEffect, type FC } from 'react'
import { useShallow } from 'zustand/shallow'

interface StepContainerProps {
  children: React.ReactNode
}

const StepContainer: FC<StepContainerProps> = ({ children }) => {
  const session = useOpenviduStateStore((state) => state.session)
  const { isAllConnection } = usePresentationStore(
    useShallow((state) => ({
      isAllConnection: state.isAllConnection,
    }))
  )

  useEffect(() => {
    if (isAllConnection) {
      console.log('모든 사용자가 참여했습니다.')
      setTimeout(() => {
        session?.signal({
          data: JSON.stringify({
            type: PRESENTATION_STATUS.READY, // value 값으로 전송
          }),
        })
      }, 100)
    }
  }, [isAllConnection])
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
