import HeroSection from '../organisms/HeroSection'
import AnnouncementBanner from '../organisms/AnnouncementBanner'
import EventsList from '../organisms/EventsList'
import DeityCarousel from '../organisms/DeityCarousel'
import Divider from '../atoms/Divider'
import Spinner from '../atoms/Spinner'
import { usePublicContent } from '../hooks/useContent'
import type { ContentItem } from '../api/content.api'

const byType = (items: ContentItem[], type: ContentItem['type']) =>
  items.filter((i) => i.type === type)

export default function Home() {
  const { data: content, isLoading } = usePublicContent()

  const events = byType(content ?? [], 'event')
  const deityImages = byType(content ?? [], 'deity_image')
  const announcements = byType(content ?? [], 'announcement')

  return (
    <>
      <HeroSection />

      {announcements.length > 0 && <AnnouncementBanner announcements={announcements} />}

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && (
        <div className="max-w-6xl mx-auto px-4">
          <Divider />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

          <Divider />
        </div>
      )}
    </>
  )
}
