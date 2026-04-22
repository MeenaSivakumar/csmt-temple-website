import { useAppDispatch } from '../store/hooks'
import { openConfirmModal, closeConfirmModal } from '../store/slices/uiSlice'
import { setConfirmCallback } from '../store/confirmCallback'

interface ConfirmOptions {
  title: string
  message: string
  onConfirm: () => void
}

export function useConfirm() {
  const dispatch = useAppDispatch()

  const confirm = ({ title, message, onConfirm }: ConfirmOptions) => {
    setConfirmCallback(onConfirm)
    dispatch(openConfirmModal({ open: true, title, message }))
  }

  const dismiss = () => {
    setConfirmCallback(null)
    dispatch(closeConfirmModal())
  }

  return { confirm, dismiss }
}
