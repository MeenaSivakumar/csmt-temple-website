import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setCredentials, setLoading, setError, logout } from '../store/slices/authSlice'
import { selectCurrentUser, selectIsAdmin, selectAuthLoading } from '../store/slices/authSlice'
import { loginUser, registerUser } from '../api/auth.api'
import { ROUTES } from '../constants/routes'

export function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const isAdmin = useSelector(selectIsAdmin)
  const loading = useSelector(selectAuthLoading)

  const login = async (credentials) => {
    dispatch(setLoading(true))
    try {
      const { data } = await loginUser(credentials)
      dispatch(setCredentials({ user: data.data.user, token: data.data.token }))
      toast.success(`Welcome back, ${data.data.user.name}!`)
      navigate(data.data.user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME)
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      dispatch(setError(msg))
      toast.error(msg)
    }
  }

  const register = async (userData) => {
    dispatch(setLoading(true))
    try {
      const { data } = await registerUser(userData)
      dispatch(setCredentials({ user: data.data.user, token: data.data.token }))
      toast.success('Account created! Welcome to CSMT Temple.')
      navigate(ROUTES.HOME)
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      dispatch(setError(msg))
      toast.error(msg)
    }
  }

  const signOut = () => {
    dispatch(logout())
    toast.success('Signed out successfully.')
    navigate(ROUTES.LOGIN)
  }

  return { user, isAdmin, loading, login, register, signOut }
}
