import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-maroon font-devotional">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={clsx(
        'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent',
        error
          ? 'border-red-400 bg-red-50'
          : 'border-gold-light bg-white hover:border-saffron',
        className
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
))

Input.displayName = 'Input'
export default Input
