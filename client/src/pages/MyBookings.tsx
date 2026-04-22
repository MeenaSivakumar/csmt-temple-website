import { Navigate } from 'react-router-dom'
import { formatDateTime } from '../utils/dateHelpers'
import BookingCard from '../molecules/BookingCard'
import Badge from '../atoms/Badge'
import Spinner from '../atoms/Spinner'
import { useMyHallBookings, useCancelHallBooking } from '../hooks/useHalls'
import { useMyPujaBookings, useCancelPujaBooking } from '../hooks/usePujas'
import { useConfirm } from '../hooks/useConfirm'
import { useAppSelector } from '../store/hooks'
import { selectCurrentUser } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'
import type { PujaBookingStatus } from '../types/booking.types'
import type { PopulatedPujaBooking } from '../types/puja.types'

const pujaName = (b: PopulatedPujaBooking) => typeof b.pujaId === 'object' ? b.pujaId.name : 'Puja'
const priestName = (b: PopulatedPujaBooking) => b.priestId && typeof b.priestId === 'object' ? b.priestId.name : 'Any Available'

export default function MyBookings() {
  const user = useAppSelector(selectCurrentUser)
  const { data: hallBookings, isLoading: loadingHall } = useMyHallBookings()
  const { data: pujaBookings, isLoading: loadingPuja } = useMyPujaBookings()
  const cancelHall = useCancelHallBooking()
  const cancelPuja = useCancelPujaBooking()
  const { confirm } = useConfirm()

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  const handleCancelHall = (id: string) => confirm({
    title: 'Cancel Hall Booking',
    message: 'Are you sure you want to cancel this hall booking?',
    onConfirm: () => cancelHall.mutate(id),
  })

  const handleCancelPuja = (id: string) => confirm({
    title: 'Cancel Puja Booking',
    message: 'Are you sure you want to cancel this puja reservation?',
    onConfirm: () => cancelPuja.mutate(id),
  })

  const isLoading = loadingHall || loadingPuja

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-devotional text-maroon text-3xl font-bold mb-2">My Bookings</h1>
      <p className="text-gray-500 text-sm mb-8">Track and manage all your bookings.</p>

      {isLoading && <div className="flex justify-center py-16"><Spinner size="lg" /></div>}

      {!isLoading && !hallBookings?.length && !pujaBookings?.length && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">No bookings yet.</p>
          <p className="text-sm">
            <a href={ROUTES.HALL_BOOKING} className="text-saffron hover:underline">Book a hall</a>
            {' '}or{' '}
            <a href={ROUTES.PUJA_BOOKING} className="text-saffron hover:underline">book a puja</a>.
          </p>
        </div>
      )}

      {!isLoading && !!hallBookings?.length && (
        <section className="mb-8">
          <h2 className="font-devotional text-maroon text-lg font-semibold mb-3">Hall Bookings</h2>
          <div className="space-y-4">
            {hallBookings.map((b) => <BookingCard key={b._id} booking={b} onCancel={handleCancelHall} />)}
          </div>
        </section>
      )}

      {!isLoading && !!pujaBookings?.length && (
        <section>
          <h2 className="font-devotional text-maroon text-lg font-semibold mb-3">Puja Bookings</h2>
          <div className="space-y-4">
            {pujaBookings.map((b) => (
              <div key={b._id} className="bg-white rounded-2xl border border-gold-light shadow-sm p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-devotional text-maroon font-semibold">{pujaName(b)}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Priest: {priestName(b)}</p>
                  </div>
                  <Badge status={b.status as PujaBookingStatus} label={b.status} />
                </div>
                <p className="text-sm text-gray-600 mb-3">{formatDateTime(b.datetime)} · <span className="capitalize">{b.type}</span></p>
                {b.status === 'reserved' && (
                  <p className="text-xs text-orange-500 mb-3">⏳ Expires 24h after reservation. Complete payment to confirm.</p>
                )}
                {['reserved', 'confirmed'].includes(b.status) && (
                  <button onClick={() => handleCancelPuja(b._id)} className="text-xs text-red-500 hover:text-red-700">Cancel</button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
