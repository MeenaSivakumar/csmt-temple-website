import HeroSection from '../organisms/HeroSection'
import AnnouncementBanner from '../organisms/AnnouncementBanner'
import EventsList from '../organisms/EventsList'
import DeityCarousel from '../organisms/DeityCarousel'
import Divider from '../atoms/Divider'
import Spinner from '../atoms/Spinner'
import { usePublicContent } from '../hooks/useContent'
import type { ContentItem } from '../types/content.types'

const byType = (items: ContentItem[], type: ContentItem['type']) =>
  items.filter((i) => i.type === type)

export default function Home() {
  const { data: content, isLoading } = usePublicContent()

  const events       = byType(content ?? [], 'event')
  const deityImages  = byType(content ?? [], 'deity_image')
  const announcements = byType(content ?? [], 'announcement')

  return (
    <div className="page-fade">
      <HeroSection />

      {announcements.length > 0 && (
        <AnnouncementBanner announcements={announcements} />
      )}

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="bg-cream">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <Divider label="Darshan & Events" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
                {/* Deity Image Gallery */}
                <section>
                  <h2 className="font-devotional text-maroon text-2xl font-semibold mb-6 text-center">
                    Deity Darshan
                  </h2>
                  <DeityCarousel images={deityImages} />
                </section>

                {/* Daily Events */}
                <section>
                  <h2 className="font-devotional text-maroon text-2xl font-semibold mb-6 text-center">
                    Upcoming Events
                  </h2>
                  <EventsList events={events} />
                </section>
              </div>
            </div>
          </div>

          {/* Call-to-action strip */}
          <div className="bg-maroon-gradient py-14 text-center">
            <p className="font-devotional text-gold-light text-sm tracking-[0.3em] mb-3">
              ॥ ॐ नमः शिवाय ॥
            </p>
            <h2 className="font-devotional text-white text-3xl md:text-4xl font-semibold mb-3">
              Plan Your Visit
            </h2>
            <p className="text-cream/60 text-sm mb-8 max-w-md mx-auto">
              Reserve a hall for your function or book a sacred puja ceremony with our priests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book-puja"
                className="px-8 py-3 bg-saffron text-white font-semibold rounded-full shadow-lg hover:bg-saffron-light transition-colors text-sm"
              >
                Book a Puja
              </a>
              <a
                href="/book-hall"
                className="px-8 py-3 border-2 border-gold/60 text-gold-light font-semibold rounded-full hover:bg-gold hover:text-maroon-dark hover:border-gold transition-colors text-sm"
              >
                Book a Hall
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
