export interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'devotee'
  lastLoginAt?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}
