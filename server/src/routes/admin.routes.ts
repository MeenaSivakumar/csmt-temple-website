import { Router } from 'express'
import { z } from 'zod'
import rateLimit from 'express-rate-limit'
import { listAllContent, addContent, editContent, removeContent } from '../controllers/contentController.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'
import { upload } from '../utils/upload.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(requireAuth, requireAdmin)

// Limit image uploads to prevent disk flooding
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
})

const contentSchema = z.object({
  type: z.enum(['event', 'deity_image', 'announcement']),
  title: z.string().min(1, 'Title is required'),
  body: z.string().optional(),
  date: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.string().optional(),
})

router.get('/content', listAllContent)
router.post('/content', uploadLimiter, upload.single('image'), validate(contentSchema), addContent)
router.put('/content/:id', uploadLimiter, upload.single('image'), validate(contentSchema.partial()), editContent)
router.delete('/content/:id', removeContent)

export default router
