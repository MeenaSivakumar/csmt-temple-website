import mongoose, { Document } from 'mongoose'

export interface IHallBooking extends Document {
  hallId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  date: string
  startTime: string
  endTime: string
  eventDescription?: string
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled'
  confirmedAt?: Date
  confirmedBy?: mongoose.Types.ObjectId
  cancelledAt?: Date
  cancelledBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const hallBookingSchema = new mongoose.Schema<IHallBooking>(
  {
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    eventDescription: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    confirmedAt: { type: Date },
    confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cancelledAt: { type: Date },
    cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model<IHallBooking>('HallBooking', hallBookingSchema)
