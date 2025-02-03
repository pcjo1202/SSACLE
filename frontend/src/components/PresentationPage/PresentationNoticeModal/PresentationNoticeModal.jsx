// @ts-nocheck

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useState } from 'react'

const PresentationNoticeModal = () => {
  const [isOpen, setIsOpen] = useState(true)

  const getModalContent = (type) => {
    switch (type) {
      case 'ready':
        return {
          title: '준비 완료!',
          description:
            '준비가 완료되면 아래 [시작하기] 버튼을 눌러주세요.\n(모든 참가자가 [시작하기] 버튼을 누르면 싸프린트가 시작됩니다.)',
          buttonText: '시작하기',
        }
      case 'waiting_start':
        return {
          title: '싸프린트 시작 대기중!',
          description: '모든 참가자가 준비를 완료하면 싸프린트가 시작됩니다.',
          buttonText: '종료하기',
        }
      case 'presentation':
        return {
          title: '싸프린트 시작!',
          description: '싸프린트가 시작되었습니다.',
          buttonText: '종료하기',
        }
      case 'end':
        return {
          title: '싸프린트 종료!',
          description: '싸프린트가 종료되었습니다.',
          buttonText: '종료하기',
        }
      default:
        return null
    }
  }

  const { title, description, buttonText } = getModalContent('waiting_start')

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-ssacle-blue">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center whitespace-pre-wrap">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center w-full">
          <Button className="w-1/4 text-white bg-ssacle-blue hover:bg-ssacle-blue/80">
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default PresentationNoticeModal
