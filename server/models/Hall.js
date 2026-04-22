import mongoose from 'mongoose'

const hallSchema = new mongoose.Schema(
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

export default mongoose.model('Hall', hallSchema)
