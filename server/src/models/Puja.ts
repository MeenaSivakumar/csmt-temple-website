import mongoose, { Document } from 'mongoose'

export interface IPuja extends Document {
  name: string
  description?: string
  durationMinutes: number
  price: number
  isActive: boolean
  createdBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const pujaSchema = new mongoose.Schema<IPuja>(
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

export default mongoose.model<IPuja>('Puja', pujaSchema)
