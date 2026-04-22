import 'dotenv/config'
import './config/env.js'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import { env } from './config/env.js'
import { responseWrapper } from './middleware/responseWrapper.js'
import { errorHandler } from './middleware/errorHandler.js'
import { startExpireReservationsJob } from './jobs/expireReservations.js'
import authRoutes from './routes/auth.routes.js'
import contentRoutes from './routes/content.routes.js'
import hallRoutes from './routes/hall.routes.js'
import pujaRoutes from './routes/puja.routes.js'
import adminRoutes from './routes/admin.routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false })

app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(responseWrapper)

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api', hallRoutes)
app.use('/api', pujaRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

connectDB().then(() => {
  startExpireReservationsJob()
  app.listen(env.port, () => console.log(`Server running on port ${env.port}`))
})
