import { Outlet } from 'react-router-dom'
import ConfirmModal from '../molecules/ConfirmModal'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Navbar will be placed here in Phase 2 */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer will be placed here in Phase 2 */}
      <ConfirmModal />
    </div>
  )
}
