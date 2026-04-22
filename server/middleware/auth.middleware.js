import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.fail('Not authenticated', 401)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.fail('User not found', 401)
    next()
  } catch {
    res.fail('Invalid token', 401)
  }
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.fail('Admin access required', 403)
  next()
}
