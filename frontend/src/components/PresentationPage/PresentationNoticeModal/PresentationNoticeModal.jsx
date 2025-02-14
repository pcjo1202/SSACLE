// @ts-nocheck
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import useModalStepConfig from '@/hooks/useModalStepConfig'

const PresentationNoticeModal = () => {
  const isModalOpen = usePresentationModalStateStore(
    (state) => state.isModalOpen
  )
  const modalStep = usePresentationModalStateStore((state) => state.modalStep)
  const { MODAL_STEP_CONFIG } = useModalStepConfig()
  const { title, description, buttons } = MODAL_STEP_CONFIG[modalStep]

  /**
   * Todo : 모든 사용자가 초대되었는지 확인 -> 발표 시작 준비 모달 띄우기
   *  *  어떻게 확인?? connectionData에 모든 사용자 (해당 sprint의 참여자 수)가 참여했는지 확인
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

  return (
    <Dialog open={isModalOpen} modal className="px-10">
      <DialogContent
        className="gap-8"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="gap-4">
          <DialogTitle className="text-lg text-center text-ssacle-blue">
            {title.map((t) => t)}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2 text-sm text-center whitespace-pre-wrap">
            {description.map((d) => (
              <span className="text-sm font-KR" key={d}>
                {d}
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center w-full gap-4">
          {buttons.map(({ text, onClick, style, variant }, index) => (
            <Button
              key={text + index}
              variant={variant}
              className={`w-1/3 text-white rounded-full font-KR ${style} hover:bg-${style}/50 focus:ring-0`}
              onClick={onClick}
            >
              {text}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PresentationNoticeModal
