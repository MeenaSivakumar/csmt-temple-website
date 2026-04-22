import { useDispatch } from 'react-redux'
import { openConfirmModal, closeConfirmModal } from '../store/slices/uiSlice'

export function useConfirm() {
  const dispatch = useDispatch()

  const confirm = ({ title, message, onConfirm }) => {
    dispatch(openConfirmModal({ title, message, onConfirm }))
  }

  const dismiss = () => dispatch(closeConfirmModal())

  return { confirm, dismiss }
}
