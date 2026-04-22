import api from './axiosInstance'
import type { User } from '../types/user.types'

interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
    registeredAt?: string
    loggedInAt?: string
  }
  actionAt: string
}

export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post<AuthResponse>('/auth/register', data)

export const loginUser = (data: { email: string; password: string }) =>
  api.post<AuthResponse>('/auth/login', data)

export const getMe = () =>
  api.get<{ success: boolean; data: { user: User } }>('/auth/me')
