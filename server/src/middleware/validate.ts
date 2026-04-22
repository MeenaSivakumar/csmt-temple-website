import type { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const message = result.error.issues.map((e) => e.message).join(', ')
      res.fail(message, 422)
      return
    }
    req.body = result.data
    next()
  }
