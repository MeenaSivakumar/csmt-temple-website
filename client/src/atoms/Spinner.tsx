import { clsx } from 'clsx'

type SpinnerSize = 'sm' | 'md' | 'lg'

const sizes: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
}

interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={clsx('flex items-center justify-center', className)} role="status" aria-label="Loading">
      <span
        className={clsx(
          'border-gold-100 border-t-saffron rounded-full animate-spin',
          sizes[size]
        )}
      />
    </div>
  )
}
