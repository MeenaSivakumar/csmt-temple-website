import { useState } from 'react'
import Badge from '../../atoms/Badge'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import { useAdminHallBookings, useUpdateHallBookingStatus } from '../../hooks/useHalls'
import { useConfirm } from '../../hooks/useConfirm'
import type { HallBookingStatus } from '../../types/booking.types'
import type { PopulatedHallBooking } from '../../types/hall.types'

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'rejected', 'cancelled'] as const

const hallName = (b: PopulatedHallBooking) =>
  typeof b.hallId === 'object' ? b.hallId.name : '—'

const userName = (b: PopulatedHallBooking) =>
  typeof b.userId === 'object' ? b.userId.name : '—'

export default function HallBookings() {
  const [filter, setFilter] = useState<string>('pending')
  const { data: bookings, isLoading } = useAdminHallBookings(
    filter === 'all' ? undefined : { status: filter }
  )
  const updateMut = useUpdateHallBookingStatus()
  const { confirm } = useConfirm()

  const handleStatus = (booking: PopulatedHallBooking, status: string) => {
    const labels: Record<string, string> = { confirmed: 'confirm', rejected: 'reject', cancelled: 'cancel' }
    confirm({
      title: `${labels[status]?.charAt(0).toUpperCase()}${labels[status]?.slice(1)} Booking`,
      message: `Are you sure you want to ${labels[status]} the booking for "${hallName(booking)}" on ${booking.date}?`,
      onConfirm: () => updateMut.mutate({ id: booking._id, status }),
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-devotional text-maroon mb-6">Hall Bookings</h1>

      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filter === s
                ? 'bg-saffron text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-saffron'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading && <div className="flex justify-center py-16"><Spinner size="lg" /></div>}

      {!isLoading && !bookings?.length && (
        <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
          No bookings found.
        </div>
      )}

      {!isLoading && !!bookings?.length && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-gray-100">
                <tr>
                  {['Hall', 'Devotee', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-cream/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{hallName(b)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{userName(b)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.date}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{b.startTime}–{b.endTime}</td>
                    <td className="px-4 py-3">
                      <Badge status={b.status as HallBookingStatus} label={b.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {b.status === 'pending' && (
                          <>
                            <Button size="sm" variant="primary" onClick={() => handleStatus(b, 'confirmed')}>Confirm</Button>
                            <Button size="sm" variant="danger" onClick={() => handleStatus(b, 'rejected')}>Reject</Button>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => handleStatus(b, 'cancelled')}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
