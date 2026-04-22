import { clsx } from 'clsx'

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <span
        className={clsx(
          'border-4 border-gold-light border-t-saffron rounded-full animate-spin',
          sizes[size]
        )}
      />
    </div>
  )
}
