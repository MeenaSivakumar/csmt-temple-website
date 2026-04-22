import mongoose from 'mongoose'

const pujaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    durationMinutes: { type: Number, required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('Puja', pujaSchema)
