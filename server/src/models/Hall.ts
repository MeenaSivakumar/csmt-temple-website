import mongoose, { Document } from 'mongoose'

export interface IHall extends Document {
  name: string
  description?: string
  capacity: number
  photos: string[]
  minBookingHours: number
  cleaningGapHours: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const hallSchema = new mongoose.Schema<IHall>(
  {
    name: { type: String, required: true },
    description: { type: String },
    capacity: { type: Number, default: 100 },
    photos: [String],
    minBookingHours: { type: Number, default: 2 },
    cleaningGapHours: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model<IHall>('Hall', hallSchema)
