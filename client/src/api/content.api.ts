import api from './axiosInstance'
import type { ApiResponse } from '../types/api.types'
import type { ContentItem } from '../types/content.types'

export type { ContentItem, ContentType } from '../types/content.types'

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
