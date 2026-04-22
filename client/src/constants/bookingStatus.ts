export const HALL_BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const

export const PUJA_BOOKING_STATUS = {
  RESERVED: 'reserved',
  CONFIRMED: 'confirmed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const

export const PUJA_TYPE = {
  ONSITE: 'onsite',
  PRIVATE: 'private',
} as const

export type HallBookingStatus = (typeof HALL_BOOKING_STATUS)[keyof typeof HALL_BOOKING_STATUS]
export type PujaBookingStatus = (typeof PUJA_BOOKING_STATUS)[keyof typeof PUJA_BOOKING_STATUS]
export type PujaType = (typeof PUJA_TYPE)[keyof typeof PUJA_TYPE]
