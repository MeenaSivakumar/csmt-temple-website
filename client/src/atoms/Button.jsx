import { clsx } from 'clsx'

const variants = {
  primary: 'bg-saffron hover:bg-saffron-light text-white shadow-md hover:shadow-lg',
  secondary: 'bg-maroon hover:bg-maroon-dark text-white shadow-md hover:shadow-lg',
  gold: 'bg-gold hover:bg-yellow-500 text-maroon font-semibold shadow-md',
  outline: 'border-2 border-saffron text-saffron hover:bg-saffron hover:text-white',
  ghost: 'text-maroon hover:bg-gold-light',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
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
