import api from './axiosInstance'

export interface ContentItem {
  _id: string
  type: 'event' | 'deity_image' | 'announcement'
  title: string
  body?: string
  imageUrl?: string
  date?: string
  isActive: boolean
  createdAt: string
}

export const getContent = () => api.get<{ data: ContentItem[] }>('/content')

export const createContent = (data: FormData | Partial<ContentItem>) =>
  api.post('/admin/content', data)

export const updateContent = (id: string, data: FormData | Partial<ContentItem>) =>
  api.put(`/admin/content/${id}`, data)

export const deleteContent = (id: string) => api.delete(`/admin/content/${id}`)
