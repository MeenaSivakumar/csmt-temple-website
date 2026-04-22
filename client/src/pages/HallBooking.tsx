import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HallCard from '../molecules/HallCard'
import HallBookingForm from '../organisms/HallBookingForm'
import Spinner from '../atoms/Spinner'
import Divider from '../atoms/Divider'
import { useHalls } from '../hooks/useHalls'
import { useAppSelector } from '../store/hooks'
import { selectCurrentUser } from '../store/slices/authSlice'
import type { Hall } from '../types/hall.types'
import { ROUTES } from '../constants/routes'

export default function HallBooking() {
  const [selected, setSelected] = useState<Hall | null>(null)
  const { data: halls, isLoading } = useHalls()
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()

  const handleSelect = (hall: Hall) => {
    if (!user) { navigate(ROUTES.LOGIN); return }
    setSelected((prev) => (prev?._id === hall._id ? null : hall))
  }

  const handleSuccess = () => setSelected(null)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="font-devotional text-maroon text-3xl md:text-4xl font-bold mb-2">
          Temple Hall Booking
        </h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Book our sacred halls for weddings, ceremonies, and community gatherings.
          Select a hall below to see availability and request a booking.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {halls?.map((hall) => (
            <HallCard
              key={hall._id}
              hall={hall}
              selected={selected?._id === hall._id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {selected && (
        <>
          <Divider />
          <div className="max-w-lg mx-auto">
            <h2 className="font-devotional text-maroon text-xl font-semibold mb-4 text-center">
              Book {selected.name}
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gold-light p-6">
              <HallBookingForm hall={selected} onSuccess={handleSuccess} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
