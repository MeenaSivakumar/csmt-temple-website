import mongoose from 'mongoose'
import Puja, { type IPuja } from '../models/Puja.js'
import Priest, { type IPriest } from '../models/Priest.js'
import PujaBooking from '../models/PujaBooking.js'
import BlockedSlot from '../models/BlockedSlot.js'

export const getPujas = () => Puja.find({ isActive: true }).lean()
export const getPriests = () => Priest.find({ isActive: true }).lean()

export const getPriestAvailability = async (priestId: string, date: string) => {
  const dayStart = new Date(`${date}T00:00:00.000Z`)
  const dayEnd = new Date(`${date}T23:59:59.999Z`)
  const bookings = await PujaBooking.find({
    priestId,
    status: { $in: ['reserved', 'confirmed'] },
    datetime: { $gte: dayStart, $lte: dayEnd },
  }).populate('pujaId', 'name durationMinutes').lean()
  const blocked = await BlockedSlot.find({
    type: 'priest',
    targetId: new mongoose.Types.ObjectId(priestId),
    startTime: { $lte: dayEnd },
    endTime: { $gte: dayStart },
  }).lean()
  return { bookings, blockedSlots: blocked }
}

export const createPujaBooking = (
  data: { pujaId: string; priestId?: string | null; type: string; datetime: string; address?: string },
  userId: string
) =>
  PujaBooking.create({ ...data, userId, reservedAt: new Date(), status: 'reserved' })

export const getMyPujaBookings = (userId: string) =>
  PujaBooking.find({ userId })
    .populate('pujaId', 'name durationMinutes price')
    .populate('priestId', 'name')
    .sort({ createdAt: -1 })
    .lean()

export const cancelPujaBooking = async (id: string, userId: string) => {
  const b = await PujaBooking.findOne({ _id: id, userId })
  if (!b) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })
  if (!['reserved', 'confirmed'].includes(b.status))
    throw Object.assign(new Error('Cannot cancel this booking'), { statusCode: 400 })
  return PujaBooking.findByIdAndUpdate(id, { status: 'cancelled', cancelledAt: new Date() }, { new: true })
}

export const getAllPujaBookings = (filters: Record<string, string>) => {
  const query: Record<string, unknown> = {}
  if (filters.status) query.status = filters.status
  return PujaBooking.find(query)
    .populate('pujaId', 'name price')
    .populate('priestId', 'name')
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .lean()
}

export const confirmPujaBooking = (id: string, adminId: string) =>
  PujaBooking.findByIdAndUpdate(
    id,
    { status: 'confirmed', confirmedAt: new Date(), confirmedBy: adminId },
    { new: true }
  )

export const adminCancelPujaBooking = (id: string, adminId: string) =>
  PujaBooking.findByIdAndUpdate(
    id,
    { status: 'cancelled', cancelledAt: new Date(), cancelledBy: adminId },
    { new: true }
  )

export const createPuja = (data: Partial<IPuja>, adminId: string) =>
  Puja.create({ ...data, createdBy: adminId })

export const updatePuja = (id: string, data: Partial<IPuja>) =>
  Puja.findByIdAndUpdate(id, data, { new: true, runValidators: true })

export const createPriest = (data: Partial<IPriest>, adminId: string) =>
  Priest.create({ ...data, createdBy: adminId })

export const updatePriest = (id: string, data: Partial<IPriest>) =>
  Priest.findByIdAndUpdate(id, data, { new: true, runValidators: true })

export const blockPriest = (
  priestId: string,
  data: { startTime: string; endTime: string; reason?: string },
  adminId: string
) =>
  BlockedSlot.create({
    type: 'priest',
    targetId: priestId,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
    reason: data.reason,
    blockedBy: adminId,
  })
