import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, User } from '../../types/user.types'
import type { RootState } from '../store'

const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<{ user: User; token: string }>) {
      state.user = payload.user
      state.token = payload.token
      state.error = null
      state.loading = false
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, setLoading, setError, logout } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === 'admin'
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
