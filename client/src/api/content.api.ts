import api from './axiosInstance'
import type { ApiResponse } from '../types/api.types'

export interface ContentItem {
  _id: string
  type: 'event' | 'deity_image' | 'announcement'
  title: string
  body?: string
  imageUrl?: string
  date?: string
  isActive: boolean
  publishedBy?: string
  createdAt: string
  updatedAt: string
}

export type ContentType = ContentItem['type']

export const getContent = () =>
  api.get<ApiResponse<ContentItem[]>>('/content')

export const getAdminContent = () =>
  api.get<ApiResponse<ContentItem[]>>('/admin/content')

export const createContent = (data: FormData) =>
  api.post<ApiResponse<ContentItem>>('/admin/content', data)

export const updateContent = (id: string, data: FormData) =>
  api.put<ApiResponse<ContentItem>>(`/admin/content/${id}`, data)

export const deleteContent = (id: string) =>
  api.delete<ApiResponse<ContentItem>>(`/admin/content/${id}`)
