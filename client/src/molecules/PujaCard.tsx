import { Clock, IndianRupee } from 'lucide-react'
import type { Puja } from '../types/puja.types'

interface Props {
  puja: Puja
  selected?: boolean
  onSelect: (puja: Puja) => void
}

export default function PujaCard({ puja, selected, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(puja)}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md ${
        selected
          ? 'border-saffron bg-saffron/5 shadow-md'
          : 'border-gold-light bg-white hover:border-saffron/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-devotional text-maroon font-semibold text-sm leading-snug">{puja.name}</h3>
        <span className="flex items-center gap-0.5 text-saffron font-bold text-sm whitespace-nowrap">
          <IndianRupee size={13} />{puja.price}
        </span>
      </div>
      {puja.description && (
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{puja.description}</p>
      )}
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Clock size={12} />
        <span>{puja.durationMinutes} min</span>
      </div>
      {selected && (
        <div className="mt-2 text-xs text-saffron font-medium">✓ Selected</div>
      )}
    </div>
  )
}
