import jwt from 'jsonwebtoken'
import type { StringValue } from 'ms'
import User, { type IUser } from '../models/User.js'
import { env } from '../config/env.js'

interface RegisterInput { name: string; email: string; password: string }
interface LoginInput { email: string; password: string }

const signToken = (id: unknown): string =>
  jwt.sign({ id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as StringValue })

const sanitize = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
})

export const registerService = async ({ name, email, password }: RegisterInput) => {
  const existing = await User.findOne({ email })
  if (existing)
    throw Object.assign(new Error('Email already registered'), { statusCode: 409 })

  const user = await User.create({ name, email, password })
  const token = signToken(user._id)
  return { user: sanitize(user), token, registeredAt: new Date().toISOString() }
}

export const loginService = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email })
  if (!user || !(await user.matchPassword(password)))
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 })

  const now = new Date()
  await User.updateOne({ _id: user._id }, { lastLoginAt: now })

  const token = signToken(user._id)
  return { user: { ...sanitize(user), lastLoginAt: now }, token, loggedInAt: now.toISOString() }
}
