import api from './axiosInstance'

export const getHalls = () => api.get('/halls')

export const getHallAvailability = (id, date) =>
  api.get(`/halls/${id}/availability`, { params: { date } })

export const createHallBooking = (data) => api.post('/bookings/hall', data)

export const getMyHallBookings = () => api.get('/bookings/hall/my')

export const cancelHallBooking = (id) =>
  api.put(`/bookings/hall/${id}/cancel`)

// Admin
export const getAllHallBookings = (params) =>
  api.get('/admin/bookings/hall', { params })

export const updateHallBookingStatus = (id, status) =>
  api.put(`/admin/bookings/hall/${id}/status`, { status })

export const blockHallDates = (id, data) =>
  api.post(`/admin/halls/${id}/block`, data)

export const updateHallConfig = (id, data) =>
  api.put(`/admin/halls/${id}/config`, data)
