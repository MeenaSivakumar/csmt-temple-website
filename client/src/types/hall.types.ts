export interface Hall {
  _id: string
  name: string
  description?: string
  capacity: number
  photos: string[]
  minBookingHours: number
  cleaningGapHours: number
  isActive: boolean
}

export interface OccupiedRange {
  start: string
  end: string
  reason: string
}

export interface HallAvailability {
  config: { minBookingHours: number; cleaningGapHours: number }
  occupiedRanges: OccupiedRange[]
}

export interface PopulatedHallBooking {
  _id: string
  hallId: { _id: string; name: string } | string
  userId: { _id: string; name: string; email: string } | string
  date: string
  startTime: string
  endTime: string
  eventDescription?: string
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled'
  confirmedAt?: string
  cancelledAt?: string
  createdAt: string
}
