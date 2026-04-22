import type { ContentItem } from '../api/content.api'

interface Props {
  announcements: ContentItem[]
}

export default function AnnouncementBanner({ announcements }: Props) {
  if (!announcements.length) return null

  return (
    <div className="bg-gold/10 border-y border-gold/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-start gap-3">
        <span className="flex-shrink-0 text-gold font-devotional font-bold text-sm uppercase tracking-wider mt-0.5">
          📢 Notice
        </span>
        <div className="flex-1 space-y-1">
          {announcements.map((a) => (
            <p key={a._id} className="text-maroon text-sm font-medium">
              {a.title}
              {a.body && <span className="text-gray-600 font-normal"> — {a.body}</span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
