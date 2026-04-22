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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-cream rounded-2xl shadow-2xl w-full max-w-md border border-gold-light">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-saffron" />
            </div>
            <h3 className="text-lg font-semibold text-maroon font-devotional">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={dismiss}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
