import mongoose from 'mongoose'

const pujaBookingSchema = new mongoose.Schema(
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

export default mongoose.model('PujaBooking', pujaBookingSchema)
