import mongoose from 'mongoose'

const blockedSlotSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['hall', 'priest'], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    reason: { type: String },
    blockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('BlockedSlot', blockedSlotSchema)
