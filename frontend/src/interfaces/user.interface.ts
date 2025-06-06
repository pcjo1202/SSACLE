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

export type Sprint = {
  id: number
  name: string
  type: string
  duration: number
  endAt: string
  teamId: number
}

export interface Category {
  id: number
  categoryName: string
  subCategories: SubCategory[]
}

export interface SubCategory {
  id: number
  categoryName: string
  subCategories: SubCategory[]
}

export interface UserCategory {
  id: number
  categoryName: string
  image: string | null
}
