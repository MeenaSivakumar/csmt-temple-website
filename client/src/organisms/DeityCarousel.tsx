import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ContentItem } from '../types/content.types'

interface Props {
  images: ContentItem[]
}

export default function DeityCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [images.length, next])

  if (!images.length) {
    return (
      <div className="h-72 bg-parchment rounded-2xl flex flex-col items-center justify-center gap-2 border border-gold-100">
        <span className="text-3xl opacity-30">🪷</span>
        <p className="text-gray-400 text-sm">No deity images available.</p>
      </div>
    )
  }

  const img = images[current]

  return (
    <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-temple-lg bg-maroon-dark">
      <img
        key={img._id}
        src={img.imageUrl}
        alt={img.title}
        className="w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Rich gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-transparent to-black/20" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="border-l-2 border-gold pl-3">
          <h3 className="font-devotional text-gold-light text-base font-semibold leading-snug">
            {img.title}
          </h3>
          {img.body && (
            <p className="text-white/70 text-xs mt-1 leading-relaxed">{img.body}</p>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-150 border border-white/10"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-150 border border-white/10"
          >
            <ChevronRight size={17} />
          </button>

          {/* Dot indicators */}
          <div className="absolute top-4 right-4 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? 'w-5 h-2 bg-gold'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
