import api from './axiosInstance'
import type { HallBooking } from '../types/booking.types'

export const getHalls = () => api.get('/halls')

export const getHallAvailability = (id: string, date: string) =>
  api.get(`/halls/${id}/availability`, { params: { date } })

export const createHallBooking = (data: Partial<HallBooking>) =>
  api.post('/bookings/hall', data)

export const getMyHallBookings = () => api.get<{ data: HallBooking[] }>('/bookings/hall/my')

export const cancelHallBooking = (id: string) => api.put(`/bookings/hall/${id}/cancel`)

// Admin
export const getAllHallBookings = (params?: Record<string, string>) =>
  api.get<{ data: HallBooking[] }>('/admin/bookings/hall', { params })

export const updateHallBookingStatus = (id: string, status: string) =>
  api.put(`/admin/bookings/hall/${id}/status`, { status })

export const blockHallDates = (id: string, data: Record<string, unknown>) =>
  api.post(`/admin/halls/${id}/block`, data)

export const updateHallConfig = (id: string, data: Record<string, unknown>) =>
  api.put(`/admin/halls/${id}/config`, data)
