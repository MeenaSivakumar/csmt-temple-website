import type { Request, Response, NextFunction } from 'express'
import * as svc from '../services/hallService.js'

const next_ = (fn: () => Promise<unknown>, res: Response, next: NextFunction) =>
  fn().then((data) => res.success(data)).catch(next)

export const listHalls = (req: Request, res: Response, next: NextFunction) =>
  next_(() => svc.getHalls(), res, next)

export const hallAvailability = (req: Request, res: Response, next: NextFunction) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
  const date = req.query.date as string
  if (!date) { res.fail('date query param required', 400); return }
  next_(() => svc.getHallAvailability(id, date), res, next)
}

export const bookHall = (req: Request, res: Response, next: NextFunction) =>
  svc.createHallBooking(req.body, req.user!._id as string)
    .then((data) => res.success(data, 201))
    .catch(next)

export const myHallBookings = (req: Request, res: Response, next: NextFunction) =>
  next_(() => svc.getMyHallBookings(req.user!._id as string), res, next)

export const cancelMyHallBooking = (req: Request, res: Response, next: NextFunction) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
  next_(() => svc.cancelHallBooking(id, req.user!._id as string), res, next)
}

export const adminListBookings = (req: Request, res: Response, next: NextFunction) =>
  next_(() => svc.getAllHallBookings(req.query as Record<string, string>), res, next)

export const adminUpdateStatus = (req: Request, res: Response, next: NextFunction) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
  next_(() => svc.updateBookingStatus(id, req.body.status, req.user!._id as string), res, next)
}

export const adminBlockHall = (req: Request, res: Response, next: NextFunction) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
  next_(() => svc.blockHall(id, req.body, req.user!._id as string), res, next)
}

export const adminUpdateHallConfig = (req: Request, res: Response, next: NextFunction) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
  next_(() => svc.updateHallConfig(id, req.body), res, next)
}
