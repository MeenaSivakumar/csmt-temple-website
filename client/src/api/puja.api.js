import api from './axiosInstance'

export const getPujas = () => api.get('/pujas')

export const getPriests = () => api.get('/priests')

export const getPriestAvailability = (id, date) =>
  api.get(`/priests/${id}/availability`, { params: { date } })

export const createPujaBooking = (data) => api.post('/bookings/puja', data)

export const getMyPujaBookings = () => api.get('/bookings/puja/my')

export const cancelPujaBooking = (id) =>
  api.put(`/bookings/puja/${id}/cancel`)

// Admin
export const getAllPujaBookings = (params) =>
  api.get('/admin/bookings/puja', { params })

export const confirmPujaBooking = (id) =>
  api.put(`/admin/bookings/puja/${id}/confirm`)

export const addPuja = (data) => api.post('/admin/pujas', data)

export const updatePuja = (id, data) => api.put(`/admin/pujas/${id}`, data)

export const addPriest = (data) => api.post('/admin/priests', data)

export const updatePriest = (id, data) =>
  api.put(`/admin/priests/${id}`, data)

export const blockPriestAvailability = (id, data) =>
  api.post(`/admin/priests/${id}/block`, data)
