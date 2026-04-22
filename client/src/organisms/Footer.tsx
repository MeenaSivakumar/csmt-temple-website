import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export default function Footer() {
  return (
    <footer className="bg-maroon-gradient text-cream mt-auto">
      {/* Gold top border */}
      <div className="h-1 bg-gold-gradient" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-saffron-100/10 border border-gold/20 flex items-center justify-center">
                <span className="text-xl">🕉</span>
              </div>
              <span className="font-devotional text-gold-light text-lg font-semibold">
                CSMT Temple
              </span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed">
              A place of devotion, peace, and spiritual growth. Serving the community
              with traditional rituals and modern facilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-devotional text-gold text-xs uppercase tracking-[0.2em] mb-4 font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: ROUTES.HOME,         label: 'Home' },
                { to: ROUTES.HALL_BOOKING, label: 'Book a Hall' },
                { to: ROUTES.PUJA_BOOKING, label: 'Book a Puja' },
                { to: ROUTES.MY_BOOKINGS,  label: 'My Bookings' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-cream/70 hover:text-gold-light transition-colors flex items-center gap-2"
                  >
                    <span className="text-gold/40 text-xs">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-devotional text-gold text-xs uppercase tracking-[0.2em] mb-4 font-semibold">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <span className="text-gold/60 mt-0.5 flex-shrink-0">📍</span>
                Temple Street, Chennai
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-gold/60 flex-shrink-0">📞</span>
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-gold/60 flex-shrink-0">✉️</span>
                info@csmttemple.org
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-cream/10 pt-6 text-center space-y-1.5">
          <p className="font-devotional text-gold/50 text-sm tracking-widest">
            ॥ सर्वे भवन्तु सुखिनः ॥
          </p>
          <p className="text-cream/30 text-xs">
            © {new Date().getFullYear()} CSMT Temple. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
