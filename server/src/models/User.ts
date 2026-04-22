import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'devotee'
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
  matchPassword(plain: string): Promise<boolean>
}

interface IUserModel extends Model<IUser> {}

const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'devotee'], default: 'devotee' },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.matchPassword = function (plain: string): Promise<boolean> {
  return bcrypt.compare(plain, this.password as string)
}

export default mongoose.model<IUser, IUserModel>('User', userSchema)
