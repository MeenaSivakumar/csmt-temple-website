import EventCard from '../molecules/EventCard'
import type { ContentItem } from '../api/content.api'

interface Props {
  events: ContentItem[]
}

export default function EventsList({ events }: Props) {
  if (!events.length) {
    return (
      <p className="text-center text-gray-400 text-sm py-8">
        No upcoming events at this time.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  )
}
