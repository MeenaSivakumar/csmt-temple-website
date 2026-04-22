import { CalendarDays, Clock } from 'lucide-react'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import type { HallBookingStatus } from '../types/booking.types'
import type { PopulatedHallBooking } from '../types/hall.types'

interface Props {
  booking: PopulatedHallBooking
  onCancel?: (id: string) => void
}

const hallName = (b: PopulatedHallBooking) =>
  typeof b.hallId === 'object' ? b.hallId.name : 'Hall'

export default function BookingCard({ booking, onCancel }: Props) {
  const canCancel = ['pending', 'confirmed'].includes(booking.status)

  return (
    <div className="bg-white rounded-2xl border border-gold-light shadow-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-devotional text-maroon font-semibold">{hallName(booking)}</h3>
          {booking.eventDescription && (
            <p className="text-gray-500 text-xs mt-0.5">{booking.eventDescription}</p>
          )}
        </div>
        <Badge status={booking.status as HallBookingStatus} label={booking.status} />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} className="text-saffron" />
          {booking.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-saffron" />
          {booking.startTime} – {booking.endTime}
        </span>
      </div>

      {onCancel && canCancel && (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onCancel(booking._id)}
        >
          Cancel Booking
        </Button>
      )}
    </div>
  )
}
