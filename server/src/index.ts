import 'dotenv/config'
import './config/env.js'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import { env } from './config/env.js'
import { responseWrapper } from './middleware/responseWrapper.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(responseWrapper)

app.use('/api/auth', authLimiter, authRoutes)

app.use(errorHandler)

connectDB().then(() => {
  app.listen(env.port, () => console.log(`Server running on port ${env.port}`))
})
