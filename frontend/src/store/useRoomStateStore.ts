import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RoomStateStore {
  // 현재 접속한 방 아이디
  roomId: string
  setRoomId: (roomId: string) => void

  roomConnectionData: Record<
    string,
    Array<{
      username: string
      userId: string
    }>
  >

  // 특정 roomId에 참여자 데이터를 추가하는 메서드
  addRoomConnectionData: (
    roomId: string,
    newData: {
      username: string
      userId: string
    }
  ) => void

  // 특정 roomId의 참여자 데이터를 삭제하는 메서드
  removeRoomConnectionData: (
    roomId: string,
    newData: {
      username: string
      userId: string
    }
  ) => void

  // 방의 진행 상태
  roomProgress: string
  setRoomProgress: (roomProgress: string) => void
}

const useRoomStateStore = create<RoomStateStore>()(
  persist(
    (set, get) => ({
      roomId: '', // 현재 방 아이디
      roomProgress: '', // 현재 진행 단계
      roomConnectionData: {}, // 각 roomId별 참여자 데이터 초기값

      setRoomId: (roomId: string) => set({ roomId }),

      setRoomProgress: (roomProgress: string) => set({ roomProgress }),

      // 특정 roomId에 참여자를 추가합니다.
      addRoomConnectionData: (roomId: string, newData) =>
        set((state) => {
          // newData가 이미 존재하는 경우 추가하지 않음
          // if (
          //   state.roomConnectionData[roomId]?.some(
          //     (data) => data.userId === newData.userId
          //   )
          // ) {
          //   return {
          //     roomConnectionData: {
          //       ...state.roomConnectionData,
          //       [roomId]: state.roomConnectionData[roomId],
          //     },
          //   }
          // }

          const currentConnections = state.roomConnectionData[roomId] ?? [] // 초기 데이터가 없을 경우 빈 배열 반환
          const newConnections = Array.isArray(currentConnections)
            ? [...currentConnections, newData]
            : [newData]
          return {
            roomConnectionData: {
              ...state.roomConnectionData,
              [roomId]: newConnections,
            },
          }
        }),

      // 특정 roomId의 참여자 데이터를 삭제합니다.
      removeRoomConnectionData: (roomId: string, deleteData) =>
        set((state) => ({
          roomConnectionData: {
            ...state.roomConnectionData,
            [roomId]: state.roomConnectionData[roomId].filter(
              (data) => data.userId !== deleteData.userId
            ),
          },
        })),
    }),
    {
      name: 'room-state-store',
    }
  )
)

export default useRoomStateStore
