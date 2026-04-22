import mongoose, { Document } from 'mongoose'

export interface IDynamicContent extends Document {
  type: 'event' | 'deity_image' | 'announcement'
  title: string
  body?: string
  imageUrl?: string
  date?: Date
  isActive: boolean
  publishedBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const dynamicContentSchema = new mongoose.Schema<IDynamicContent>(
  {
    type: { type: String, enum: ['event', 'deity_image', 'announcement'], required: true },
    title: { type: String, required: true },
    body: { type: String },
    imageUrl: { type: String },
    date: { type: Date },
    isActive: { type: Boolean, default: true },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

// Compound index: active content queries filtered & sorted by creation date
dynamicContentSchema.index({ isActive: 1, createdAt: -1 })

export default mongoose.model<IDynamicContent>('DynamicContent', dynamicContentSchema)
