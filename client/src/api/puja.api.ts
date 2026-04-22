import api from './axiosInstance'
import type { ApiResponse } from '../types/api.types'
import type { Puja, Priest, PopulatedPujaBooking } from '../types/puja.types'

export const getPujas = () => api.get<ApiResponse<Puja[]>>('/pujas')
export const getPriests = () => api.get<ApiResponse<Priest[]>>('/priests')

export const getPriestAvailability = (id: string, date: string) =>
  api.get(`/priests/${id}/availability`, { params: { date } })

export const createPujaBooking = (data: {
  pujaId: string
  priestId?: string | null
  type: 'onsite' | 'private'
  datetime: string
  address?: string
}) => api.post<ApiResponse<PopulatedPujaBooking>>('/bookings/puja', data)

export const getMyPujaBookings = () =>
  api.get<ApiResponse<PopulatedPujaBooking[]>>('/bookings/puja/my')

export const cancelPujaBooking = (id: string) =>
  api.put<ApiResponse<PopulatedPujaBooking>>(`/bookings/puja/${id}/cancel`)

// Admin
export const getAllPujaBookings = (params?: Record<string, string>) =>
  api.get<ApiResponse<PopulatedPujaBooking[]>>('/admin/bookings/puja', { params })

export const confirmPujaBooking = (id: string) =>
  api.put<ApiResponse<PopulatedPujaBooking>>(`/admin/bookings/puja/${id}/confirm`)

export const adminCancelPujaBooking = (id: string) =>
  api.put<ApiResponse<PopulatedPujaBooking>>(`/admin/bookings/puja/${id}/cancel`)

export const addPuja = (data: Partial<Puja>) =>
  api.post<ApiResponse<Puja>>('/admin/pujas', data)

export const updatePuja = (id: string, data: Partial<Puja>) =>
  api.put<ApiResponse<Puja>>(`/admin/pujas/${id}`, data)

export const addPriest = (data: FormData) =>
  api.post<ApiResponse<Priest>>('/admin/priests', data)

export const updatePriest = (id: string, data: FormData) =>
  api.put<ApiResponse<Priest>>(`/admin/priests/${id}`, data)

export const blockPriestAvailability = (id: string, data: { startTime: string; endTime: string; reason?: string }) =>
  api.post(`/admin/priests/${id}/block`, data)
