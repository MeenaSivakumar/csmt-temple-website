import { Navigate } from 'react-router-dom'
import BookingCard from '../molecules/BookingCard'
import Spinner from '../atoms/Spinner'
import { useMyHallBookings, useCancelHallBooking } from '../hooks/useHalls'
import { useConfirm } from '../hooks/useConfirm'
import { useAppSelector } from '../store/hooks'
import { selectCurrentUser } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

export default function MyBookings() {
  const user = useAppSelector(selectCurrentUser)
  const { data: bookings, isLoading } = useMyHallBookings()
  const cancelMut = useCancelHallBooking()
  const { confirm } = useConfirm()

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />

  const handleCancel = (id: string) => {
    confirm({
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      onConfirm: () => cancelMut.mutate(id),
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-devotional text-maroon text-3xl font-bold mb-2">My Bookings</h1>
      <p className="text-gray-500 text-sm mb-8">Track and manage your hall booking requests.</p>

      {isLoading && <div className="flex justify-center py-16"><Spinner size="lg" /></div>}

      {!isLoading && !bookings?.length && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">No bookings yet.</p>
          <p className="text-sm">
            <a href={ROUTES.HALL_BOOKING} className="text-saffron hover:underline">Book a hall</a>
            {' '}or{' '}
            <a href={ROUTES.PUJA_BOOKING} className="text-saffron hover:underline">book a puja</a>
            {' '}to get started.
          </p>
        </div>
      )}

      {!isLoading && !!bookings?.length && (
        <div className="space-y-4">
          <h2 className="font-devotional text-maroon text-lg font-semibold">Hall Bookings</h2>
          {bookings.map((b) => (
            <BookingCard key={b._id} booking={b} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  )
}
