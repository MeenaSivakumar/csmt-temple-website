import { Users, Clock } from 'lucide-react'
import Button from '../atoms/Button'
import type { Hall } from '../types/hall.types'

interface Props {
  hall: Hall
  onSelect: (hall: Hall) => void
  selected?: boolean
}

export default function HallCard({ hall, onSelect, selected }: Props) {
  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-all cursor-pointer ${
        selected
          ? 'border-saffron shadow-saffron/20 shadow-lg'
          : 'border-gold-light hover:border-saffron/50 hover:shadow-md'
      }`}
      onClick={() => onSelect(hall)}
    >
      {hall.photos[0] ? (
        <img src={hall.photos[0]} alt={hall.name} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-maroon/10 to-gold-light flex items-center justify-center">
          <span className="text-5xl opacity-30">🕉</span>
        </div>
      )}

      <div className="p-4 bg-white">
        <h3 className="font-devotional text-maroon font-semibold text-base mb-1">{hall.name}</h3>
        {hall.description && (
          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{hall.description}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Users size={13} /> Up to {hall.capacity}</span>
          <span className="flex items-center gap-1"><Clock size={13} /> Min {hall.minBookingHours}h</span>
        </div>
        <Button variant="primary" size="sm" className="w-full" onClick={() => onSelect(hall)}>
          {selected ? 'Selected ✓' : 'Select This Hall'}
        </Button>
      </div>
    </div>
  )
}
