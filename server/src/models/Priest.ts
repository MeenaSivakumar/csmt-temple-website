import mongoose, { Document } from 'mongoose'

export interface IPriest extends Document {
  name: string
  bio?: string
  photo?: string
  isActive: boolean
  createdBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const priestSchema = new mongoose.Schema<IPriest>(
  {
    name: { type: String, required: true },
    bio: { type: String },
    photo: { type: String },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model<IPriest>('Priest', priestSchema)
