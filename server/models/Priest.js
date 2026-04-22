import mongoose from 'mongoose'

const priestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    photo: { type: String },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('Priest', priestSchema)
