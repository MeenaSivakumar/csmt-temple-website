export interface Puja {
  _id: string
  name: string
  description?: string
  durationMinutes: number
  price: number
  isActive: boolean
  createdAt: string
}

export interface Priest {
  _id: string
  name: string
  bio?: string
  photo?: string
  isActive: boolean
  createdAt: string
}
