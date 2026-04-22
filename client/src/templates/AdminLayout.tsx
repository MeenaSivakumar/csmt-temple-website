import { Outlet, Navigate } from 'react-router-dom'
import { selectCurrentUser, selectIsAdmin } from '../store/slices/authSlice'
import AdminSidebar from '../organisms/AdminSidebar'
import ConfirmModal from '../molecules/ConfirmModal'
import { ROUTES } from '../constants/routes'
import { useAppSelector } from '../store/hooks'

export default function AdminLayout() {
  const user = useAppSelector(selectCurrentUser)
  const isAdmin = useAppSelector(selectIsAdmin)

  if (!user) return <Navigate to={ROUTES.ADMIN_LOGIN} replace />
  if (!isAdmin) return <Navigate to={ROUTES.HOME} replace />

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
      <ConfirmModal />
    </div>
  )
}
