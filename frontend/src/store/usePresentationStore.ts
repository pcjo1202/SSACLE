import { PRESENTATION_STATUS } from '@/constants/presentationStatus'
import { create } from 'zustand'

interface PresentationStore {
  // 발표 진행 관련
  // 발표에 참여 해야하는 수
  targetConnectionCount: number
  setTargetConnectionCount: (targetConnectionCount: number) => void

  isAllConnection: boolean // 모든 참여자가 참여했는지 여부
  setIsAllConnection: (isAllConnection: boolean) => void

  // 발표 채팅 관련
  isChatOpen: boolean
  questionCard: any[]

  // 발표 진행 관련 설정
  setIsChatOpen: (isChatOpen: boolean) => void
  setQuestionCard: (questionCard: any[]) => void
}

export const usePresentationStore = create<PresentationStore>((set) => ({
  // 발표 진행 관련
  isAllConnection: false,
  targetConnectionCount: 3,
  setTargetConnectionCount: (targetConnectionCount) =>
    set({ targetConnectionCount }),

  // 모든 참여자가 참여했는지 여부 설정
  setIsAllConnection: (isAllConnection) => set({ isAllConnection }),

  // 발표 채팅 관련
  isChatOpen: false,
  questionCard: [],

  // 질문 카드 설정
  setQuestionCard: (questionCard) => set({ questionCard }),
  // 채팅 상태 설정
  setIsChatOpen: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}))
