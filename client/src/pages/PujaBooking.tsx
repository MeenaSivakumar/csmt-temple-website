import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PujaBookingWizard from '../organisms/PujaBookingWizard'
import Spinner from '../atoms/Spinner'
import { usePujas, usePriests } from '../hooks/usePujas'
import { useAppSelector } from '../store/hooks'
import { selectCurrentUser } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

export default function PujaBooking() {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()
  const { data: pujas, isLoading: loadingPujas } = usePujas()
  const { data: priests, isLoading: loadingPriests } = usePriests()
  const [done, setDone] = useState(false)

  if (!user) {
    navigate(ROUTES.LOGIN)
    return null
  }

  const isLoading = loadingPujas || loadingPriests

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="font-devotional text-maroon text-3xl md:text-4xl font-bold mb-2">
          Book a Puja
        </h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Schedule a sacred puja with our experienced priests — at the temple or in your home.
        </p>
      </div>

      {isLoading && <div className="flex justify-center py-16"><Spinner size="lg" /></div>}

      {!isLoading && done && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🙏</div>
          <h2 className="font-devotional text-maroon text-2xl mb-2">Puja Reserved!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your reservation is active for 24 hours. Please complete payment to confirm.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setDone(false)} className="text-saffron text-sm hover:underline">
              Book Another Puja
            </button>
            <span className="text-gray-300">·</span>
            <button onClick={() => navigate(ROUTES.MY_BOOKINGS)} className="text-saffron text-sm hover:underline">
              View My Bookings
            </button>
          </div>
        </div>
      )}

      {!isLoading && !done && (
        <div className="bg-white rounded-2xl shadow-sm border border-gold-light p-6">
          <PujaBookingWizard
            pujas={pujas ?? []}
            priests={priests ?? []}
            onSuccess={() => setDone(true)}
          />
        </div>
      )}
    </div>
  )
}
