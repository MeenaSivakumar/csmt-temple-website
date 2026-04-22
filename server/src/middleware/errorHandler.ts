import type { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
  statusCode?: number
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.statusCode ?? 500
  const message = err.message || 'Internal Server Error'
  console.error(`[${new Date().toISOString()}] ${status} — ${message}`)
  res.status(status).json({
    success: false,
    message,
    actionAt: new Date().toISOString(),
  })
}
