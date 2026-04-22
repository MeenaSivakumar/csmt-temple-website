import { Router } from 'express'
import { z } from 'zod'
import {
  listHalls,
  hallAvailability,
  bookHall,
  myHallBookings,
  cancelMyHallBooking,
} from '../controllers/hallController.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const bookHallSchema = z.object({
  hallId: z.string().min(1, 'Hall is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  eventDescription: z.string().optional(),
})

router.get('/halls', listHalls)
router.get('/halls/:id/availability', hallAvailability)
router.post('/bookings/hall', requireAuth, validate(bookHallSchema), bookHall)
router.get('/bookings/hall/my', requireAuth, myHallBookings)
router.put('/bookings/hall/:id/cancel', requireAuth, cancelMyHallBooking)

export default router
