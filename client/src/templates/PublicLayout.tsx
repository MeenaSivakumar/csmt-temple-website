import { Outlet } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import ConfirmModal from '../molecules/ConfirmModal'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConfirmModal />
    </div>
  )
}
