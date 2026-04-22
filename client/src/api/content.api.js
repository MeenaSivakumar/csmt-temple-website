import api from './axiosInstance'

export const getContent = () => api.get('/content')

export const createContent = (data) => api.post('/admin/content', data)

export const updateContent = (id, data) =>
  api.put(`/admin/content/${id}`, data)

export const deleteContent = (id) => api.delete(`/admin/content/${id}`)
