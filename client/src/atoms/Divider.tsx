interface DividerProps {
  label?: string
}

export default function Divider({ label }: DividerProps) {
  return (
    <div className="flex items-center justify-center gap-4 my-10">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-pale to-gold-light" />
      <div className="flex items-center gap-2 text-gold">
        <span className="text-sm select-none opacity-60">✦</span>
        {label
          ? <span className="font-devotional text-sm font-medium text-gold-dark tracking-widest uppercase">{label}</span>
          : <span className="text-lg select-none">❋</span>
        }
        <span className="text-sm select-none opacity-60">✦</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-pale to-gold-light" />
    </div>
  )
}
