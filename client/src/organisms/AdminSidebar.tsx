import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Building2, BookOpen, ScrollText, Users, LogOut } from 'lucide-react'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

const links = [
  { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.ADMIN_CONTENT, label: 'Content', icon: FileText },
  { to: ROUTES.ADMIN_HALLS, label: 'Hall Bookings', icon: Building2 },
  { to: ROUTES.ADMIN_PUJA_BOOKINGS, label: 'Puja Bookings', icon: BookOpen },
  { to: ROUTES.ADMIN_PUJAS, label: 'Manage Pujas', icon: ScrollText },
  { to: ROUTES.ADMIN_PRIESTS, label: 'Manage Priests', icon: Users },
]

export default function AdminSidebar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.ADMIN_LOGIN)
  }

  return (
    <aside className="w-60 min-h-screen bg-maroon text-cream flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-cream/10">
        <span className="text-xl">🕉</span>
        <p className="font-devotional text-gold text-sm mt-1">CSMT Admin</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.ADMIN_DASHBOARD}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-saffron text-white' : 'text-cream/70 hover:bg-cream/10 hover:text-cream'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-cream/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-cream/70 hover:bg-cream/10 hover:text-cream transition-colors"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  )
}
