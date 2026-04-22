import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
    confirmModal: { open: false, title: '', message: '', onConfirm: null },
  },
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false
    },
    openConfirmModal(state, { payload }) {
      state.confirmModal = { open: true, ...payload }
    },
    closeConfirmModal(state) {
      state.confirmModal = { open: false, title: '', message: '', onConfirm: null }
    },
  },
})

export const { toggleMobileMenu, closeMobileMenu, openConfirmModal, closeConfirmModal } =
  uiSlice.actions

export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen
export const selectConfirmModal = (state) => state.ui.confirmModal

export default uiSlice.reducer
