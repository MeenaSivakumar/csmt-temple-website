import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getPujas, getPriests, createPujaBooking, getMyPujaBookings, cancelPujaBooking,
  getAllPujaBookings, confirmPujaBooking, adminCancelPujaBooking, addPuja, updatePuja, addPriest, updatePriest,
} from '../api/puja.api'
import type { Puja, Priest } from '../types/puja.types'

export const usePujas = () =>
  useQuery({ queryKey: ['pujas'], queryFn: async () => (await getPujas()).data.data })

export const usePriests = () =>
  useQuery({ queryKey: ['priests'], queryFn: async () => (await getPriests()).data.data })

export const useCreatePujaBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createPujaBooking,
    onSuccess: () => {
      toast.success('Puja reserved! Complete payment within 24 hours to confirm.')
      qc.invalidateQueries({ queryKey: ['my-puja-bookings'] })
    },
    onError: (err: { response?: { data?: { message?: string } } }) =>
      toast.error(err?.response?.data?.message ?? 'Reservation failed'),
  })
}

export const useMyPujaBookings = () =>
  useQuery({ queryKey: ['my-puja-bookings'], queryFn: async () => (await getMyPujaBookings()).data.data })

export const useCancelPujaBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: cancelPujaBooking,
    onSuccess: () => { toast.success('Booking cancelled'); qc.invalidateQueries({ queryKey: ['my-puja-bookings'] }) },
    onError: () => toast.error('Failed to cancel booking'),
  })
}

export const useAdminPujaBookings = (filters?: Record<string, string>) =>
  useQuery({ queryKey: ['admin-puja-bookings', filters], queryFn: async () => (await getAllPujaBookings(filters)).data.data })

export const useConfirmPujaBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => confirmPujaBooking(id),
    onSuccess: () => { toast.success('Booking confirmed'); qc.invalidateQueries({ queryKey: ['admin-puja-bookings'] }) },
    onError: () => toast.error('Action failed'),
  })
}

export const useAdminCancelPujaBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => adminCancelPujaBooking(id),
    onSuccess: () => { toast.success('Booking cancelled'); qc.invalidateQueries({ queryKey: ['admin-puja-bookings'] }) },
    onError: () => toast.error('Action failed'),
  })
}

export const useAdminPujas = () =>
  useQuery({ queryKey: ['admin-pujas'], queryFn: async () => (await getPujas()).data.data })

export const useAdminPriests = () =>
  useQuery({ queryKey: ['admin-priests'], queryFn: async () => (await getPriests()).data.data })

export const useCreatePuja = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Puja>) => addPuja(data),
    onSuccess: () => { toast.success('Puja created'); qc.invalidateQueries({ queryKey: ['admin-pujas'] }) },
    onError: () => toast.error('Failed to create puja'),
  })
}

export const useUpdatePuja = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Puja> }) => updatePuja(id, data),
    onSuccess: () => { toast.success('Puja updated'); qc.invalidateQueries({ queryKey: ['admin-pujas'] }) },
    onError: () => toast.error('Failed to update puja'),
  })
}

export const useCreatePriest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => addPriest(data),
    onSuccess: () => { toast.success('Priest added'); qc.invalidateQueries({ queryKey: ['admin-priests'] }) },
    onError: () => toast.error('Failed to add priest'),
  })
}

export const useUpdatePriest = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updatePriest(id, data),
    onSuccess: () => { toast.success('Priest updated'); qc.invalidateQueries({ queryKey: ['admin-priests'] }) },
    onError: () => toast.error('Failed to update priest'),
  })
}
