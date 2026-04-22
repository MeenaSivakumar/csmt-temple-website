export type HallBookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled'
export type PujaBookingStatus = 'reserved' | 'confirmed' | 'expired' | 'cancelled'
export type PujaType = 'onsite' | 'private'

export interface HallBooking {
  _id: string
  hallId: string
  userId: string
  date: string
  startTime: string
  endTime: string
  eventDescription?: string
  status: HallBookingStatus
  confirmedAt?: string
  confirmedBy?: string
  cancelledAt?: string
  cancelledBy?: string
  createdAt: string
}

export interface PujaBooking {
  _id: string
  pujaId: string
  priestId: string | null
  userId: string
  type: PujaType
  datetime: string
  address?: string
  status: PujaBookingStatus
  reservedAt: string
  confirmedAt?: string
  confirmedBy?: string
  expiredAt?: string
  paymentId?: string
  createdAt: string
}
