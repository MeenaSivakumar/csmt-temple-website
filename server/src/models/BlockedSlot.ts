import mongoose, { Document } from 'mongoose'

export interface IBlockedSlot extends Document {
  type: 'hall' | 'priest'
  targetId: mongoose.Types.ObjectId
  startTime: Date
  endTime: Date
  reason?: string
  blockedBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const blockedSlotSchema = new mongoose.Schema<IBlockedSlot>(
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

export default mongoose.model<IBlockedSlot>('BlockedSlot', blockedSlotSchema)
