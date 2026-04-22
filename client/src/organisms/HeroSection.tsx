import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import { ROUTES } from '../constants/routes'

export default function HeroSection() {
  return (
    <section className="relative h-[88vh] min-h-[560px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="CSMT Temple"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Multi-layer devotional overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Subtle vignette on edges */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Sanskrit invocation */}
        <p className="font-devotional text-gold-light text-sm md:text-base tracking-[0.4em] mb-5 opacity-90 drop-shadow-md">
          ॥ ॐ नमः शिवाय ॥
        </p>

        {/* Temple name */}
        <h1 className="font-devotional text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-lg leading-tight">
          CSMT
          <span className="block text-gold-light">Temple</span>
        </h1>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gold-pale/60" />
          <span className="text-gold-pale text-sm">✦</span>
          <div className="h-px w-16 bg-gold-pale/60" />
        </div>

        {/* Tagline */}
        <p className="text-white/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10 font-light">
          A sacred space for devotion, community, and spiritual well-being.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={ROUTES.PUJA_BOOKING}
            className="px-9 py-3.5 bg-saffron text-white font-semibold rounded-full shadow-lg hover:bg-saffron-light hover:shadow-xl transition-all duration-200 text-sm tracking-wide"
          >
            Book a Puja
          </Link>
          <Link
            to={ROUTES.HALL_BOOKING}
            className="px-9 py-3.5 bg-transparent border-2 border-gold-light text-gold-light font-semibold rounded-full hover:bg-gold hover:text-maroon-dark hover:border-gold transition-all duration-200 text-sm tracking-wide"
          >
            Book a Hall
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40">
        <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
