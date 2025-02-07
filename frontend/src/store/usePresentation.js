import { STREAM_MOCK } from '@/mocks/streamData'
import { create } from 'zustand'

export const usePresentation = create((set) => ({
  presentationStatus: 'beforePresentation',
  setPresentationStatus: (status) => set({ presentationStatus: status }),

  stream: STREAM_MOCK ?? [],
  setStream: (stream) => set({ stream }),

  questionCard: [],
  setQuestionCard: (questionCard) => set({ questionCard }),

  isChatOpen: false,
  setIsChatOpen: (isChatOpen) => set({ isChatOpen }),
}))
