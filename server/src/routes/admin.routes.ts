import { Router } from 'express'
import { z } from 'zod'
import { listAllContent, addContent, editContent, removeContent } from '../controllers/contentController.js'
import {
  adminListBookings,
  adminUpdateStatus,
  adminBlockHall,
  adminUpdateHallConfig,
} from '../controllers/hallController.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'
import { upload } from '../utils/upload.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(requireAuth, requireAdmin)

// ── Content ────────────────────────────────────────────────
const contentSchema = z.object({
  type: z.enum(['event', 'deity_image', 'announcement']),
  title: z.string().min(1, 'Title is required'),
  body: z.string().optional(),
  date: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.string().optional(),
})

router.get('/content', listAllContent)
router.post('/content', upload.single('image'), validate(contentSchema), addContent)
router.put('/content/:id', upload.single('image'), validate(contentSchema.partial()), editContent)
router.delete('/content/:id', removeContent)

// ── Hall Bookings ──────────────────────────────────────────
const updateStatusSchema = z.object({
  status: z.enum(['confirmed', 'rejected', 'cancelled']),
})

const blockSchema = z.object({
  startTime: z.string().min(1, 'Start time required'),
  endTime: z.string().min(1, 'End time required'),
  reason: z.string().optional(),
})

const configSchema = z.object({
  minBookingHours: z.number().min(1).max(12).optional(),
  cleaningGapHours: z.number().min(0).max(4).optional(),
})

router.get('/bookings/hall', adminListBookings)
router.put('/bookings/hall/:id/status', validate(updateStatusSchema), adminUpdateStatus)
router.post('/halls/:id/block', validate(blockSchema), adminBlockHall)
router.put('/halls/:id/config', validate(configSchema), adminUpdateHallConfig)

export default router
