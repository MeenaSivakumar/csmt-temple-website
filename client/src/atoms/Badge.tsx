import { clsx } from 'clsx'

type BadgeStatus =
  | 'pending' | 'confirmed' | 'rejected' | 'cancelled'
  | 'reserved' | 'expired' | 'active' | 'inactive'

const statusColors: Record<BadgeStatus, string> = {
  pending:   'bg-gold-100   text-gold-dark   border-gold-pale',
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected:  'bg-red-50     text-red-700     border-red-200',
  cancelled: 'bg-gray-100   text-gray-500    border-gray-200',
  reserved:  'bg-saffron-50 text-saffron-dark border-saffron-100',
  expired:   'bg-orange-50  text-orange-600  border-orange-200',
  active:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive:  'bg-gray-100   text-gray-500    border-gray-200',
}

interface BadgeProps {
  status: BadgeStatus
  label?: string
  className?: string
}

export default function Badge({ label, status, className = '' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize',
        statusColors[status] ?? 'bg-gold-100 text-maroon border-gold-pale',
        className
      )}
    >
      {label ?? status}
    </span>
  )
}
