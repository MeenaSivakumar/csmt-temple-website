import { clsx } from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:   'bg-saffron hover:bg-saffron-light text-white shadow-temple hover:shadow-temple-md',
  secondary: 'bg-maroon hover:bg-maroon-light text-white shadow-temple hover:shadow-temple-md',
  gold:      'bg-gold hover:bg-gold-light text-maroon-dark font-semibold shadow-temple hover:shadow-temple-md',
  outline:   'border-2 border-saffron text-saffron hover:bg-saffron hover:text-white',
  ghost:     'text-maroon hover:bg-maroon-50 hover:text-maroon-light',
  danger:    'bg-red-600 hover:bg-red-700 text-white shadow-temple',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  size?: Size
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
