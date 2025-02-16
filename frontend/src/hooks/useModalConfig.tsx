import { useNavigate } from 'react-router-dom'
import { usePresentationModalActions } from '@/store/usePresentationModalActions'
import { useConnect } from '@/hooks/useConnect'
import { useOpenviduStateStore } from '@/store/useOpenviduStateStore'
import { useShallow } from 'zustand/react/shallow'
import { createModalStepConfig } from '@/config/modalStepConfigFactory'
import { Session } from 'openvidu-browser'
import { usePresentationStore } from '@/store/usePresentationStore'
import useScreenShare from '@/hooks/useScreenShare'

const useModalConfig = () => {
  const { setModalStep, closeModal } = usePresentationModalActions(
    useShallow((state) => ({
      setModalStep: state.setModalStep,
      closeModal: state.closeModal,
    }))
  )
  const presenterName = usePresentationStore((state) => state.presenterName)
  const navigate = useNavigate()
  const { leaveSession } = useConnect()
  const session = useOpenviduStateStore(useShallow((state) => state.session))
  const { startScreenShare } = useScreenShare()
  const { stopScreenShare } = useScreenShare()

  // 팩토리 함수를 호출하여 모달 설정 생성
  const MODAL_STEP_CONFIG = createModalStepConfig({
    closeModal,
    navigate,
    leaveSession,
    session: session as Session,
    setModalStep,
    presenterName,
    startScreenShare,
    stopScreenShare,
  })

  const getModalStepConfig = (step: string) => {
    // 예시 step : ModalSteps.INITIAL.WELCOME
    console.log('찾아야하는 모달', step)
    return MODAL_STEP_CONFIG[step]
  }

  return { getModalStepConfig, MODAL_STEP_CONFIG }
}

export default useModalConfig
