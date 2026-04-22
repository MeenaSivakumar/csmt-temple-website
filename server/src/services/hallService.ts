import mongoose from 'mongoose'
import Hall from '../models/Hall.js'
import HallBooking from '../models/HallBooking.js'
import BlockedSlot from '../models/BlockedSlot.js'
import { timesOverlap, addHoursToTime } from '../utils/timeUtils.js'

export const getHalls = () => Hall.find({ isActive: true }).lean()

export const getHallById = (id: string) => Hall.findById(id).lean()

export const getHallAvailability = async (hallId: string, date: string) => {
  const hall = await Hall.findById(hallId)
  if (!hall) throw Object.assign(new Error('Hall not found'), { statusCode: 404 })

  const bookings = await HallBooking.find({
    hallId,
    date,
    status: { $in: ['pending', 'confirmed'] },
  }).lean()

  const dayStart = new Date(`${date}T00:00:00.000Z`)
  const dayEnd = new Date(`${date}T23:59:59.999Z`)
  const blocked = await BlockedSlot.find({
    type: 'hall',
    targetId: new mongoose.Types.ObjectId(hallId),
    startTime: { $lte: dayEnd },
    endTime: { $gte: dayStart },
  }).lean()

  const occupiedRanges = [
    ...bookings.map((b) => ({
      start: b.startTime,
      end: addHoursToTime(b.endTime, hall.cleaningGapHours),
      reason: 'booked',
    })),
    ...blocked.map((s) => ({
      start: s.startTime.toISOString().slice(11, 16),
      end: s.endTime.toISOString().slice(11, 16),
      reason: s.reason ?? 'blocked',
    })),
  ]

  return {
    config: { minBookingHours: hall.minBookingHours, cleaningGapHours: hall.cleaningGapHours },
    occupiedRanges,
  }
}

export const createHallBooking = async (
  data: { hallId: string; date: string; startTime: string; endTime: string; eventDescription?: string },
  userId: string
) => {
  const hall = await Hall.findById(data.hallId)
  if (!hall) throw Object.assign(new Error('Hall not found'), { statusCode: 404 })

  const conflicts = await HallBooking.find({
    hallId: data.hallId,
    date: data.date,
    status: { $in: ['pending', 'confirmed'] },
  }).lean()

  for (const b of conflicts) {
    const bufferedEnd = addHoursToTime(b.endTime, hall.cleaningGapHours)
    if (timesOverlap(data.startTime, data.endTime, b.startTime, bufferedEnd)) {
      throw Object.assign(new Error('This time slot is unavailable'), { statusCode: 409 })
    }
  }

  return HallBooking.create({ ...data, userId })
}

export const getMyHallBookings = (userId: string) =>
  HallBooking.find({ userId }).populate('hallId', 'name').sort({ date: -1 }).lean()

export const cancelHallBooking = async (id: string, userId: string) => {
  const booking = await HallBooking.findOne({ _id: id, userId })
  if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 })
  if (!['pending', 'confirmed'].includes(booking.status))
    throw Object.assign(new Error('Booking cannot be cancelled'), { statusCode: 400 })
  return HallBooking.findByIdAndUpdate(
    id,
    { status: 'cancelled', cancelledAt: new Date(), cancelledBy: userId },
    { new: true }
  )
}

export const getAllHallBookings = (filters: Record<string, string>) => {
  const query: Record<string, unknown> = {}
  if (filters.status) query.status = filters.status
  if (filters.hallId) query.hallId = filters.hallId
  if (filters.date) query.date = filters.date
  return HallBooking.find(query)
    .populate('hallId', 'name')
    .populate('userId', 'name email')
    .sort({ createdAt: -1 })
    .lean()
}

export const updateBookingStatus = async (id: string, status: string, adminId: string) => {
  const update: Record<string, unknown> = { status }
  if (status === 'confirmed') { update.confirmedAt = new Date(); update.confirmedBy = adminId }
  if (status === 'cancelled') { update.cancelledAt = new Date(); update.cancelledBy = adminId }
  return HallBooking.findByIdAndUpdate(id, update, { new: true })
}

export const blockHall = (
  hallId: string,
  data: { startTime: string; endTime: string; reason?: string },
  adminId: string
) =>
  BlockedSlot.create({
    type: 'hall',
    targetId: hallId,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
    reason: data.reason,
    blockedBy: adminId,
  })

export const updateHallConfig = (id: string, data: { minBookingHours?: number; cleaningGapHours?: number }) =>
  Hall.findByIdAndUpdate(id, data, { new: true, runValidators: true })
