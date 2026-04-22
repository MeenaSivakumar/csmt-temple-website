import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ConfirmModalState {
  open: boolean
  title: string
  message: string
  onConfirm: (() => void) | null
}

interface UiState {
  mobileMenuOpen: boolean
  confirmModal: ConfirmModalState
}

const initialState: UiState = {
  mobileMenuOpen: false,
  confirmModal: { open: false, title: '', message: '', onConfirm: null },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false
    },
    openConfirmModal(state, { payload }: PayloadAction<Omit<ConfirmModalState, 'open'>>) {
      state.confirmModal = { open: true, ...payload }
    },
    closeConfirmModal(state) {
      state.confirmModal = { open: false, title: '', message: '', onConfirm: null }
    },
  },
})

export const { toggleMobileMenu, closeMobileMenu, openConfirmModal, closeConfirmModal } =
  uiSlice.actions

export const selectMobileMenuOpen = (state: RootState) => state.ui.mobileMenuOpen
export const selectConfirmModal = (state: RootState) => state.ui.confirmModal

export default uiSlice.reducer
