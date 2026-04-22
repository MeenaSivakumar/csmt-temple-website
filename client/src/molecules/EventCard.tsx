import { formatDate } from '../utils/dateHelpers'
import type { ContentItem } from '../types/content.types'

interface Props {
  event: ContentItem
}

export default function EventCard({ event }: Props) {
  const dateParts = event.date ? formatDate(event.date).split(' ') : null

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gold-100 shadow-temple hover:shadow-temple-md transition-all duration-200 group">
      {dateParts ? (
        <div className="flex-shrink-0 w-14 h-14 bg-saffron rounded-xl flex flex-col items-center justify-center text-white shadow-sm">
          <span className="text-[11px] font-semibold uppercase leading-tight tracking-wide">
            {dateParts[1]}
          </span>
          <span className="text-2xl font-bold leading-tight">{dateParts[0]}</span>
        </div>
      ) : (
        <div className="flex-shrink-0 w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center">
          <span className="text-xl text-gold">📅</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-devotional text-maroon text-sm font-semibold truncate group-hover:text-saffron transition-colors">
          {event.title}
        </h3>
        {event.body && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">{event.body}</p>
        )}
      </div>
    </div>
  )
}
