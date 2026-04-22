import heroImg from '../assets/hero.png'

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="CSMT Temple"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Devotional overlay: deep maroon → transparent → gold tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon/70 via-maroon/40 to-black/60" />

      <div className="relative z-10 text-center px-4">
        <p className="font-devotional text-gold text-sm md:text-base tracking-[0.3em] mb-4 opacity-90">
          ॥ ॐ नमः शिवाय ॥
        </p>
        <h1 className="font-devotional text-cream text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
          CSMT Temple
        </h1>
        <p className="text-cream/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
          A sacred space for devotion, community, and spiritual well-being.
          Book halls, pujas, and stay connected with temple events.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/book-puja"
            className="px-8 py-3 bg-saffron text-white font-semibold rounded-full hover:bg-saffron-light transition-colors shadow-lg"
          >
            Book a Puja
          </a>
          <a
            href="/book-hall"
            className="px-8 py-3 bg-transparent border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-maroon transition-colors"
          >
            Book a Hall
          </a>
        </div>
      </div>
    </section>
  )
}
