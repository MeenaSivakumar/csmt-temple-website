import { useAppDispatch } from '../store/hooks'
import { openConfirmModal, closeConfirmModal } from '../store/slices/uiSlice'

interface ConfirmOptions {
  title: string
  message: string
  onConfirm: () => void
}

export function useConfirm() {
  const dispatch = useAppDispatch()

  const confirm = (options: ConfirmOptions) => {
    dispatch(openConfirmModal(options))
  }

  const dismiss = () => dispatch(closeConfirmModal())

  return { confirm, dismiss }
}
