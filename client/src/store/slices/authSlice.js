import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const authSlice = createSlice({
  name: 'auth',
  initialState: { user, token, loading: false, error: null },
  reducers: {
    setCredentials(state, { payload }) {
      state.user = payload.user
      state.token = payload.token
      state.error = null
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
    setError(state, { payload }) {
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

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin'
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
