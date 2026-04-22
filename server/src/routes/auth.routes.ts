import { Router } from 'express'
import { z } from 'zod'
import { register, login, getMe } from '../controllers/authController.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', requireAuth, getMe)

export default router
