import api from './axiosInstance'
import type { ApiResponse } from '../types/api.types'
import type { Hall, HallAvailability, PopulatedHallBooking } from '../types/hall.types'
import type { HallBooking } from '../types/booking.types'

export const getHalls = () =>
  api.get<ApiResponse<Hall[]>>('/halls')

export const getHallAvailability = (id: string, date: string) =>
  api.get<ApiResponse<HallAvailability>>(`/halls/${id}/availability`, { params: { date } })

export const createHallBooking = (data: {
  hallId: string
  date: string
  startTime: string
  endTime: string
  eventDescription?: string
}) => api.post<ApiResponse<HallBooking>>('/bookings/hall', data)

export const getMyHallBookings = () =>
  api.get<ApiResponse<PopulatedHallBooking[]>>('/bookings/hall/my')

export const cancelHallBooking = (id: string) =>
  api.put<ApiResponse<HallBooking>>(`/bookings/hall/${id}/cancel`)

// Admin
export const getAllHallBookings = (params?: Record<string, string>) =>
  api.get<ApiResponse<PopulatedHallBooking[]>>('/admin/bookings/hall', { params })

export const updateHallBookingStatus = (id: string, status: string) =>
  api.put<ApiResponse<HallBooking>>(`/admin/bookings/hall/${id}/status`, { status })

export const blockHallDates = (id: string, data: { startTime: string; endTime: string; reason?: string }) =>
  api.post(`/admin/halls/${id}/block`, data)

export const updateHallConfig = (id: string, data: { minBookingHours?: number; cleaningGapHours?: number }) =>
  api.put(`/admin/halls/${id}/config`, data)
