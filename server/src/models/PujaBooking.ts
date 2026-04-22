import mongoose, { Document } from 'mongoose'

export interface IPujaBooking extends Document {
  pujaId: mongoose.Types.ObjectId
  priestId?: mongoose.Types.ObjectId | null
  userId: mongoose.Types.ObjectId
  type: 'onsite' | 'private'
  datetime: Date
  address?: string
  status: 'reserved' | 'confirmed' | 'expired' | 'cancelled'
  reservedAt: Date
  confirmedAt?: Date
  confirmedBy?: mongoose.Types.ObjectId
  expiredAt?: Date
  cancelledAt?: Date
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}

const pujaBookingSchema = new mongoose.Schema<IPujaBooking>(
  {
    pujaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puja', required: true },
    priestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Priest', default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['onsite', 'private'], required: true },
    datetime: { type: Date, required: true },
    address: { type: String },
    status: {
      type: String,
      enum: ['reserved', 'confirmed', 'expired', 'cancelled'],
      default: 'reserved',
    },
    reservedAt: { type: Date, default: Date.now },
    confirmedAt: { type: Date },
    confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    expiredAt: { type: Date },
    cancelledAt: { type: Date },
    paymentId: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model<IPujaBooking>('PujaBooking', pujaBookingSchema)
