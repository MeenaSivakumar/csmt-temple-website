import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, LogOut } from 'lucide-react'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

const links = [
  { to: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.ADMIN_CONTENT,   label: 'Content',   icon: FileText },
]

export default function AdminSidebar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.ADMIN_LOGIN)
  }

  return (
    <aside className="w-64 min-h-screen bg-maroon-gradient text-cream flex flex-col flex-shrink-0 border-r border-maroon-light/20">

      {/* Brand header */}
      <div className="px-5 py-5 border-b border-cream/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-saffron/20 border border-saffron/30 flex items-center justify-center">
            <span className="text-lg">🕉</span>
          </div>
          <div>
            <p className="font-devotional text-gold-light text-sm font-semibold">CSMT Temple</p>
            <p className="text-cream/40 text-[10px] uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="text-cream/30 text-[10px] uppercase tracking-[0.2em] px-3 mb-3 font-semibold">
          Management
        </p>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.ADMIN_DASHBOARD}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-saffron text-white shadow-sm'
                  : 'text-cream/60 hover:bg-cream/8 hover:text-cream'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-cream/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-cream/50 hover:bg-cream/8 hover:text-cream transition-all duration-150"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
