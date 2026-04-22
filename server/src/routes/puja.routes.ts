import { Router } from 'express'
import { z } from 'zod'
import {
  listPujas,
  listPriests,
  priestAvailability,
  reservePuja,
  myPujaBookings,
  cancelMyPujaBooking,
} from '../controllers/pujaController.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const reserveSchema = z.object({
  pujaId: z.string().min(1, 'Puja is required'),
  priestId: z.string().nullable().optional(),
  type: z.enum(['onsite', 'private']),
  datetime: z.string().min(1, 'Date & time required'),
  address: z.string().optional(),
})

router.get('/pujas', listPujas)
router.get('/priests', listPriests)
router.get('/priests/:id/availability', priestAvailability)
router.post('/bookings/puja', requireAuth, validate(reserveSchema), reservePuja)
router.get('/bookings/puja/my', requireAuth, myPujaBookings)
router.put('/bookings/puja/:id/cancel', requireAuth, cancelMyPujaBooking)

export default router
