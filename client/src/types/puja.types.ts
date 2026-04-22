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

export interface PopulatedPujaBooking {
  _id: string
  pujaId: { _id: string; name: string; durationMinutes: number; price: number } | string
  priestId: { _id: string; name: string } | string | null
  userId: { _id: string; name: string; email: string } | string
  type: 'onsite' | 'private'
  datetime: string
  address?: string
  status: 'reserved' | 'confirmed' | 'expired' | 'cancelled'
  reservedAt: string
  confirmedAt?: string
  expiredAt?: string
  cancelledAt?: string
  createdAt: string
}
