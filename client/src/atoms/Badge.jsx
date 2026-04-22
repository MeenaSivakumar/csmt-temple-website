import { clsx } from 'clsx'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300',
  cancelled: 'bg-gray-100 text-gray-600 border-gray-300',
  reserved: 'bg-blue-100 text-blue-800 border-blue-300',
  expired: 'bg-orange-100 text-orange-700 border-orange-300',
  active: 'bg-green-100 text-green-800 border-green-300',
  inactive: 'bg-gray-100 text-gray-600 border-gray-300',
}

export default function Badge({ label, status, className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
        statusColors[status] || 'bg-gold-light text-maroon border-gold',
        className
      )}
    >
      {label || status}
    </span>
  )
}
