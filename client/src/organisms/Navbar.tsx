import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleMobileMenu, closeMobileMenu, selectMobileMenuOpen } from '../store/slices/uiSlice'
import { selectCurrentUser, logout } from '../store/slices/authSlice'
import { ROUTES } from '../constants/routes'

const publicLinks = [
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

  const navLinks = user
    ? [...publicLinks, { to: ROUTES.MY_BOOKINGS, label: 'My Bookings' }]
    : publicLinks

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gold-100 shadow-temple">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-saffron-50 border border-saffron-100 flex items-center justify-center group-hover:bg-saffron-100 transition-colors">
            <span className="text-lg leading-none">🕉</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-devotional text-maroon text-base font-semibold group-hover:text-saffron transition-colors">
              CSMT Temple
            </span>
            <span className="text-gold-dark text-[10px] tracking-[0.15em] leading-none hidden sm:block">
              ॥ SACRED SPACE ॥
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.HOME}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'text-saffron bg-saffron-50'
                    : 'text-gray-600 hover:text-maroon hover:bg-maroon-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth / Logout */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden lg:block">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-maroon border border-maroon-100 rounded-full hover:bg-maroon hover:text-white transition-all duration-150"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="px-5 py-2 bg-saffron text-white text-sm font-medium rounded-full shadow-temple hover:bg-saffron-light hover:shadow-temple-md transition-all duration-150"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-maroon hover:bg-maroon-50 transition-colors"
          onClick={() => dispatch(toggleMobileMenu())}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gold-100 px-4 py-3 space-y-1 shadow-temple-md">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.HOME}
              onClick={() => dispatch(closeMobileMenu())}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? 'text-saffron bg-saffron-50' : 'text-gray-600 hover:text-maroon hover:bg-maroon-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gold-100">
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-maroon hover:bg-maroon-50 rounded-lg transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                onClick={() => dispatch(closeMobileMenu())}
                className="block px-4 py-2.5 text-sm font-semibold text-saffron hover:bg-saffron-50 rounded-lg transition-colors"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
