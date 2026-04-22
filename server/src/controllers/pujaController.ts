import type { Request, Response, NextFunction } from 'express'
import * as svc from '../services/pujaService.js'

const wrap = (fn: () => Promise<unknown>, res: Response, next: NextFunction) =>
  fn().then((data) => res.success(data)).catch(next)

const pid = (req: Request) =>
  Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

export const listPujas = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.getPujas(), res, next)

export const listPriests = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.getPriests(), res, next)

export const priestAvailability = (req: Request, res: Response, next: NextFunction) => {
  const date = req.query.date as string
  if (!date) { res.fail('date query param required', 400); return }
  wrap(() => svc.getPriestAvailability(pid(req), date), res, next)
}

export const reservePuja = (req: Request, res: Response, next: NextFunction) =>
  svc.createPujaBooking(req.body, req.user!._id as string)
    .then((data) => res.success(data, 201))
    .catch(next)

export const myPujaBookings = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.getMyPujaBookings(req.user!._id as string), res, next)

export const cancelMyPujaBooking = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.cancelPujaBooking(pid(req), req.user!._id as string), res, next)

export const adminListPujaBookings = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.getAllPujaBookings(req.query as Record<string, string>), res, next)

export const adminConfirmPujaBooking = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.confirmPujaBooking(pid(req), req.user!._id as string), res, next)

export const adminCancelPujaBooking = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.adminCancelPujaBooking(pid(req), req.user!._id as string), res, next)

export const adminAddPuja = (req: Request, res: Response, next: NextFunction) =>
  svc.createPuja(req.body, req.user!._id as string)
    .then((data) => res.success(data, 201)).catch(next)

export const adminUpdatePuja = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.updatePuja(pid(req), req.body), res, next)

export const adminAddPriest = (req: Request, res: Response, next: NextFunction) => {
  const photo = req.file ? `/uploads/${req.file.filename}` : undefined
  svc.createPriest({ ...req.body, ...(photo && { photo }) }, req.user!._id as string)
    .then((data) => res.success(data, 201)).catch(next)
}

export const adminUpdatePriest = (req: Request, res: Response, next: NextFunction) => {
  const photo = req.file ? `/uploads/${req.file.filename}` : undefined
  wrap(() => svc.updatePriest(pid(req), { ...req.body, ...(photo && { photo }) }), res, next)
}

export const adminBlockPriest = (req: Request, res: Response, next: NextFunction) =>
  wrap(() => svc.blockPriest(pid(req), req.body, req.user!._id as string), res, next)
