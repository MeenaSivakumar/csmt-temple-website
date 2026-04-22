import mongoose from 'mongoose'

const dynamicContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['event', 'deity_image', 'announcement'],
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String },
    imageUrl: { type: String },
    date: { type: Date },
    isActive: { type: Boolean, default: true },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('DynamicContent', dynamicContentSchema)
