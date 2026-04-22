import { useState } from 'react'
import Badge from '../../atoms/Badge'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import { useAdminPujaBookings, useConfirmPujaBooking, useAdminCancelPujaBooking } from '../../hooks/usePujas'
import { useConfirm } from '../../hooks/useConfirm'
import { formatDateTime } from '../../utils/dateHelpers'
import type { PujaBookingStatus } from '../../types/booking.types'
import type { PopulatedPujaBooking } from '../../types/puja.types'

const STATUS_FILTERS = ['all', 'reserved', 'confirmed', 'expired', 'cancelled'] as const

const pujaName = (b: PopulatedPujaBooking) => typeof b.pujaId === 'object' ? b.pujaId.name : '—'
const priestName = (b: PopulatedPujaBooking) => b.priestId && typeof b.priestId === 'object' ? b.priestId.name : 'Any'
const userName = (b: PopulatedPujaBooking) => typeof b.userId === 'object' ? b.userId.name : '—'

export default function PujaBookings() {
  const [filter, setFilter] = useState('reserved')
  const { data: bookings, isLoading } = useAdminPujaBookings(filter === 'all' ? undefined : { status: filter })
  const confirmMut = useConfirmPujaBooking()
  const cancelMut = useAdminCancelPujaBooking()
  const { confirm } = useConfirm()

  const handleConfirm = (b: PopulatedPujaBooking) => confirm({
    title: 'Confirm Puja Booking',
    message: `Confirm "${pujaName(b)}" booking for ${userName(b)}?`,
    onConfirm: () => confirmMut.mutate(b._id),
  })

  const handleCancel = (b: PopulatedPujaBooking) => confirm({
    title: 'Cancel Puja Booking',
    message: `Cancel "${pujaName(b)}" booking for ${userName(b)}?`,
    onConfirm: () => cancelMut.mutate(b._id),
  })

  return (
    <div>
      <h1 className="text-2xl font-devotional text-maroon mb-6">Puja Bookings</h1>
      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUS_FILTERS.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === s ? 'bg-saffron text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-saffron'}`}>
            {s}
          </button>
        ))}
      </div>

      {isLoading && <div className="flex justify-center py-16"><Spinner size="lg" /></div>}
      {!isLoading && !bookings?.length && (
        <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">No bookings found.</div>
      )}
      {!isLoading && !!bookings?.length && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream border-b border-gray-100">
                <tr>
                  {['Puja', 'Devotee', 'Priest', 'Datetime', 'Type', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-cream/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{pujaName(b)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{userName(b)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{priestName(b)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDateTime(b.datetime)}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{b.type}</td>
                    <td className="px-4 py-3"><Badge status={b.status as PujaBookingStatus} label={b.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {b.status === 'reserved' && <Button size="sm" variant="primary" onClick={() => handleConfirm(b)}>Confirm</Button>}
                        {['reserved', 'confirmed'].includes(b.status) && (
                          <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => handleCancel(b)}>Cancel</Button>
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
