import type { Priest } from '../types/puja.types'

interface Props {
  priest: Priest
  selected?: boolean
  onSelect: (id: string) => void
}

export default function PriestCard({ priest, selected, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(priest._id)}
      className={`cursor-pointer rounded-xl border-2 p-3 transition-all ${
        selected
          ? 'border-saffron bg-saffron/5 shadow-md'
          : 'border-gold-light bg-white hover:border-saffron/50 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        {priest.photo ? (
          <img src={priest.photo} alt={priest.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gold-light flex items-center justify-center text-maroon font-devotional font-bold text-lg flex-shrink-0">
            {priest.name[0]}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-devotional text-maroon font-semibold text-sm">{priest.name}</h3>
          {priest.bio && <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{priest.bio}</p>}
        </div>
        {selected && <span className="ml-auto text-saffron text-xs font-medium">✓</span>}
      </div>
    </div>
  )
}
