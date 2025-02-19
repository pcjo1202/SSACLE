export interface User {
  id: number
  nickname: string
  level: number
  pickles: number
  profile: string
  categoryNames: string[]
}

export type PresentationParticipants = {
  id: number
  name: string
  point: number
  users: User[]
}
