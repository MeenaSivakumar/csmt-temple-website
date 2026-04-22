import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAdmin } from '../store/slices/authSlice'
import ConfirmModal from '../molecules/ConfirmModal'
import { ROUTES } from '../constants/routes'

export default function AdminLayout() {
  const user = useSelector(selectCurrentUser)
  const isAdmin = useSelector(selectIsAdmin)

  if (!user) return <Navigate to={ROUTES.ADMIN_LOGIN} replace />
  if (!isAdmin) return <Navigate to={ROUTES.HOME} replace />

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* AdminSidebar will be placed here in Phase 5 */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <ConfirmModal />
    </div>
  )
}
