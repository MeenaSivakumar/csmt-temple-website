import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export default function Footer() {
  return (
    <footer className="bg-maroon text-cream mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🕉</span>
              <span className="font-devotional text-gold text-lg">CSMT Temple</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              A place of devotion, peace, and spiritual growth. Serving the community with
              traditional rituals and modern facilities.
            </p>
          </div>

          <div>
            <h4 className="font-devotional text-gold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li><Link to={ROUTES.HOME} className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to={ROUTES.HALL_BOOKING} className="hover:text-gold transition-colors">Book a Hall</Link></li>
              <li><Link to={ROUTES.PUJA_BOOKING} className="hover:text-gold transition-colors">Book a Puja</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-devotional text-gold text-sm mb-3 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>📍 Temple Street, Chennai</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@csmttemple.org</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-6 text-center text-cream/50 text-xs">
          <p className="font-devotional text-gold/60 mb-1">॥ सर्वे भवन्तु सुखिनः ॥</p>
          <p>© {new Date().getFullYear()} CSMT Temple. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
