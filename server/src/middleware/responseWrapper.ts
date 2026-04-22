import type { Request, Response, NextFunction } from 'express'

export const responseWrapper = (_req: Request, res: Response, next: NextFunction): void => {
  res.success = (data: unknown, statusCode = 200, meta: Record<string, unknown> = {}) => {
    res.status(statusCode).json({
      success: true,
      data,
      actionAt: new Date().toISOString(),
      ...meta,
    })
  }

  res.fail = (message: string, statusCode = 400) => {
    res.status(statusCode).json({
      success: false,
      message,
      actionAt: new Date().toISOString(),
    })
  }

  next()
}
