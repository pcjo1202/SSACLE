// @ts-nocheck
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogOverlay,
} from '@/components/ui/alert-dialog'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import useModalStepConfig from '@/hooks/useModalStepConfig'
import { cn } from '@/lib/utils'
import { ModalSteps } from '@/constants/modalStep'

const PresentationNoticeModal = () => {
  const isModalOpen = usePresentationModalStateStore(
    (state) => state.isModalOpen
  )
  const modalStep = usePresentationModalStateStore((state) => state.modalStep)
  const { MODAL_STEP_CONFIG } = useModalStepConfig()
  const { title, description, buttons } = MODAL_STEP_CONFIG[modalStep]

  return (
    <AlertDialog open={isModalOpen} modal className="px-10">
      <AlertDialogOverlay className="bg-ssacle-gray-sm/10" />
      <AlertDialogContent
        className="gap-8"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <AlertDialogHeader className="gap-4">
          <AlertDialogTitle className="flex flex-col text-lg text-center text-ssacle-blue">
            {title.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-2 text-sm text-center whitespace-pre-wrap">
            {description.map((d) => (
              <span className="text-sm font-KR" key={d}>
                {d}
              </span>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center w-full gap-4">
          {buttons.map(({ text, onClick, style, variant }, index) => (
            <Button
              key={text + index}
              variant={variant}
              className={cn(
                'w-1/3 text-white rounded-full font-KR  focus:ring-0',
                style && `${style}`,
                !style && 'bg-ssacle-blue hover:bg-ssacle-blue/70',
                'animate-in'
              )}
              onClick={onClick}
            >
              {text}
            </Button>
          ))}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PresentationNoticeModal
