import api from './axiosInstance'
import type { Puja, Priest } from '../types/puja.types'
import type { PujaBooking } from '../types/booking.types'

export const getPujas = () => api.get<{ data: Puja[] }>('/pujas')

export const getPriests = () => api.get<{ data: Priest[] }>('/priests')

export const getPriestAvailability = (id: string, date: string) =>
  api.get(`/priests/${id}/availability`, { params: { date } })

export const createPujaBooking = (data: Partial<PujaBooking>) =>
  api.post('/bookings/puja', data)

export const getMyPujaBookings = () => api.get<{ data: PujaBooking[] }>('/bookings/puja/my')

export const cancelPujaBooking = (id: string) => api.put(`/bookings/puja/${id}/cancel`)

// Admin
export const getAllPujaBookings = (params?: Record<string, string>) =>
  api.get<{ data: PujaBooking[] }>('/admin/bookings/puja', { params })

export const confirmPujaBooking = (id: string) =>
  api.put(`/admin/bookings/puja/${id}/confirm`)

export const addPuja = (data: Partial<Puja>) => api.post('/admin/pujas', data)

export const updatePuja = (id: string, data: Partial<Puja>) =>
  api.put(`/admin/pujas/${id}`, data)

export const addPriest = (data: Partial<Priest>) => api.post('/admin/priests', data)

export const updatePriest = (id: string, data: Partial<Priest>) =>
  api.put(`/admin/priests/${id}`, data)

export const blockPriestAvailability = (id: string, data: Record<string, unknown>) =>
  api.post(`/admin/priests/${id}/block`, data)
