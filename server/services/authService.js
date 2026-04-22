import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

export const registerService = async ({ name, email, password }) => {
  const existing = await User.findOne({ email })
  if (existing) throw Object.assign(new Error('Email already registered'), { statusCode: 409 })

  const user = await User.create({ name, email, password })
  const token = signToken(user._id)
  return { user: sanitize(user), token, registeredAt: new Date().toISOString() }
}

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user || !(await user.matchPassword(password)))
    throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 })

  user.lastLoginAt = new Date()
  await user.save({ validateBeforeSave: false })

  const token = signToken(user._id)
  return { user: sanitize(user), token, loggedInAt: user.lastLoginAt.toISOString() }
}

const sanitize = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
})
