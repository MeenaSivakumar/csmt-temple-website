import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleMobileMenu, closeMobileMenu, selectMobileMenuOpen } from '../store/slices/uiSlice'
import { selectCurrentUser, logout } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

const navLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.HALL_BOOKING, label: 'Book a Hall' },
  { to: ROUTES.PUJA_BOOKING, label: 'Book a Puja' },
]

export default function Navbar() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectMobileMenuOpen)
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(closeMobileMenu())
    navigate(ROUTES.HOME)
  }

  return (
    <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-gold-light shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <span className="text-2xl text-saffron">🕉</span>
          <span className="font-devotional text-maroon text-lg font-semibold group-hover:text-saffron transition-colors">
            CSMT Temple
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors pb-0.5 border-b-2 ${
                  isActive
                    ? 'text-saffron border-saffron'
                    : 'text-gray-700 border-transparent hover:text-saffron'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user ? (
            <button onClick={handleLogout} className="text-sm font-medium text-maroon hover:text-saffron transition-colors">
              Logout
            </button>
          ) : (
            <Link to={ROUTES.LOGIN} className="px-4 py-1.5 bg-saffron text-white text-sm font-medium rounded-full hover:bg-saffron-light transition-colors">
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-maroon" onClick={() => dispatch(toggleMobileMenu())}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-cream border-t border-gold-light px-4 pb-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => dispatch(closeMobileMenu())}
              className={({ isActive }) =>
                `block py-2.5 text-sm font-medium border-b border-gold-light/50 ${
                  isActive ? 'text-saffron' : 'text-gray-700'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user ? (
            <button onClick={handleLogout} className="block w-full text-left py-2.5 text-sm font-medium text-maroon">
              Logout
            </button>
          ) : (
            <Link to={ROUTES.LOGIN} onClick={() => dispatch(closeMobileMenu())} className="block py-2.5 text-sm font-medium text-saffron">
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
