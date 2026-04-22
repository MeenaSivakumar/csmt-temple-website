import type { ContentItem } from '../types/content.types'

interface Props {
  announcements: ContentItem[]
}

export default function AnnouncementBanner({ announcements }: Props) {
  if (!announcements.length) return null

  return (
    <div className="bg-gold-100 border-y border-gold-pale">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-start gap-3">
        {/* Icon badge */}
        <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white text-xs font-bold shadow-sm">
          !
        </span>
        <div className="flex-1 space-y-1">
          {announcements.map((a) => (
            <p key={a._id} className="text-maroon text-sm font-medium leading-snug">
              {a.title}
              {a.body && (
                <span className="text-maroon/60 font-normal"> — {a.body}</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
