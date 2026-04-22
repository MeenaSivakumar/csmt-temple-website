import { forwardRef } from 'react'
import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-maroon uppercase tracking-wider font-devotional">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-xl border px-4 py-2.5 text-sm text-ink transition-all duration-150',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron',
          error
            ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-400'
            : 'border-gold-100 bg-white hover:border-gold-light',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
)

Input.displayName = 'Input'
export default Input
