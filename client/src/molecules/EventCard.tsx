import { formatDate } from '../utils/dateHelpers'
import type { ContentItem } from '../types/content.types'

interface Props {
  event: ContentItem
}

export default function EventCard({ event }: Props) {
  const dateParts = event.date ? formatDate(event.date).split(' ') : null

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gold-light shadow-sm hover:shadow-md transition-shadow">
      {dateParts && (
        <div className="flex-shrink-0 w-14 h-14 bg-saffron rounded-lg flex flex-col items-center justify-center text-white">
          <span className="text-xs font-semibold uppercase leading-none">{dateParts[1]}</span>
          <span className="text-xl font-bold leading-none">{dateParts[0]}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-devotional text-maroon text-sm font-semibold truncate">{event.title}</h3>
        {event.body && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{event.body}</p>
        )}
      </div>
    </div>
  )
}
