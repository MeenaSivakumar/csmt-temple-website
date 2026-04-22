import type { IUser } from '../models/User'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
    interface Response {
      success: (data: unknown, statusCode?: number, meta?: Record<string, unknown>) => void
      fail: (message: string, statusCode?: number) => void
    }
  }
}

export {}
