import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

interface JwtPayload {
  id: string
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) { res.fail('Not authenticated', 401); return }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    const user = await User.findById(decoded.id).select('-password')
    if (!user) { res.fail('User not found', 401); return }
    req.user = user
    next()
  } catch {
    res.fail('Invalid token', 401)
  }
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') { res.fail('Admin access required', 403); return }
  next()
}
