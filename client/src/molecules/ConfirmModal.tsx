import { AlertTriangle } from 'lucide-react'
import Button from '../atoms/Button'
import { selectConfirmModal } from '../store/slices/uiSlice'
import { getConfirmCallback } from '../store/confirmCallback'
import { useConfirm } from '../hooks/useConfirm'
import { useAppSelector } from '../store/hooks'

export default function ConfirmModal() {
  const { open, title, message } = useAppSelector(selectConfirmModal)
  const { dismiss } = useConfirm()

  if (!open) return null

  const handleConfirm = () => {
    getConfirmCallback()?.()
    dismiss()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="bg-white rounded-2xl shadow-temple-lg w-full max-w-sm border border-gold-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-gold-gradient" />
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-saffron-50 rounded-xl flex items-center justify-center border border-saffron-100">
              <AlertTriangle className="w-5 h-5 text-saffron" />
            </div>
            <h3 className="text-base font-semibold text-maroon font-devotional leading-snug pt-1">
              {title}
            </h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 pl-14">{message}</p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="sm" onClick={dismiss}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
