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
      <div className="h-64 bg-gold-light/30 rounded-2xl flex items-center justify-center">
        <p className="text-gray-400 text-sm">No deity images available.</p>
      </div>
    )
  }

  const img = images[current]

  return (
    <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-xl bg-maroon">
      <img
        key={img._id}
        src={img.imageUrl}
        alt={img.title}
        className="w-full h-full object-cover transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="font-devotional text-gold text-lg">{img.title}</h3>
        {img.body && <p className="text-cream/80 text-sm mt-1">{img.body}</p>}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 right-4 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-gold' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
