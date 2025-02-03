import { create } from 'zustand'

// 스트림 목업 데이터
const STREAM_MOCK = [
  {
    id: 'peer-1',
    stream: null, // MediaStream 객체가 들어갈 자리
    name: '김발표',
    isHost: true,
    connectionState: 'connected', // 'new', 'connecting', 'connected', 'disconnected', 'failed', 'closed'
    audioEnabled: true,
    videoEnabled: true,
    screenShare: false,
  },
  {
    id: 'peer-2',
    stream: null,
    name: '이참여',
    isHost: false,
    connectionState: 'connected',
    audioEnabled: true,
    videoEnabled: true,
    screenShare: false,
  },
  {
    id: 'peer-3',
    stream: null,
    name: '박청중',
    isHost: false,
    connectionState: 'connected',
    audioEnabled: false,
    videoEnabled: true,
    screenShare: false,
  },
  {
    id: 'peer-3',
    stream: null,
    name: '박청중',
    isHost: false,
    connectionState: 'connected',
    audioEnabled: false,
    videoEnabled: true,
    screenShare: false,
  },
]

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
