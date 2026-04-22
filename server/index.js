import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { responseWrapper } from './middleware/responseWrapper.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(responseWrapper)

app.use('/api/auth', authRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
