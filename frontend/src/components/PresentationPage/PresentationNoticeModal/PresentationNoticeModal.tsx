import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog'
import { usePresentationModalStateStore } from '@/store/usePresentationModalStateStore'
import { cn } from '@/lib/utils'
import useModalConfig from '@/hooks/useModalConfig'
import { useMemo } from 'react'

const PresentationNoticeModal = () => {
  const isModalOpen = usePresentationModalStateStore(
    (state) => state.isModalOpen
  )
  const modalStep = usePresentationModalStateStore((state) => state.modalStep)
  const { getModalStepConfig } = useModalConfig()
  const {
    title: Title,
    description: Description,
    buttons,
  } = getModalStepConfig(modalStep)

  return (
    <Dialog open={isModalOpen} modal>
      <DialogOverlay className="bg-ssacle-gray-sm/10" />
      <DialogContent
        className="gap-8"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="gap-4">
          <DialogTitle className="flex flex-col w-full text-xl text-center text-ssacle-blue">
            {Array.isArray(Title)
              ? Title?.map((t) => <span key={t}>{t}</span>)
              : Title}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2 text-base text-center whitespace-pre-wrap">
            {typeof Description === 'string' ? (
              <span>{Description}</span>
            ) : (
              Description
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center w-full gap-4">
          {Array.isArray(buttons)
            ? buttons.map(({ text, onClick, style, variant }, index) => (
                <Button
                  key={text + index}
                  variant={variant}
                  className={cn(
                    'w-1/3 text-white rounded-full font-KR  focus:ring-0',
                    style && `${style}`,
                    !style &&
                      !variant &&
                      'bg-ssacle-blue hover:bg-ssacle-blue/70',
                    'animate-in'
                  )}
                  onClick={onClick}
                >
                  {text}
                </Button>
              ))
            : buttons}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PresentationNoticeModal
