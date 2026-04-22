import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getHalls,
  getHallAvailability,
  createHallBooking,
  getMyHallBookings,
  cancelHallBooking,
  getAllHallBookings,
  updateHallBookingStatus,
  blockHallDates,
} from '../api/hall.api'

export const useHalls = () =>
  useQuery({ queryKey: ['halls'], queryFn: async () => (await getHalls()).data.data })

export const useHallAvailability = (hallId: string, date: string) =>
  useQuery({
    queryKey: ['hall-availability', hallId, date],
    queryFn: async () => (await getHallAvailability(hallId, date)).data.data,
    enabled: !!hallId && !!date,
  })

export const useCreateHallBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createHallBooking,
    onSuccess: () => {
      toast.success('Booking submitted! You will be notified once confirmed.')
      qc.invalidateQueries({ queryKey: ['my-hall-bookings'] })
    },
    onError: (err: { response?: { data?: { message?: string } } }) =>
      toast.error(err?.response?.data?.message ?? 'Booking failed'),
  })
}

export const useMyHallBookings = () =>
  useQuery({
    queryKey: ['my-hall-bookings'],
    queryFn: async () => (await getMyHallBookings()).data.data,
  })

export const useCancelHallBooking = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: cancelHallBooking,
    onSuccess: () => {
      toast.success('Booking cancelled')
      qc.invalidateQueries({ queryKey: ['my-hall-bookings'] })
    },
    onError: () => toast.error('Failed to cancel booking'),
  })
}

export const useAdminHallBookings = (filters?: Record<string, string>) =>
  useQuery({
    queryKey: ['admin-hall-bookings', filters],
    queryFn: async () => (await getAllHallBookings(filters)).data.data,
  })

export const useUpdateHallBookingStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateHallBookingStatus(id, status),
    onSuccess: (_, { status }) => {
      toast.success(`Booking ${status}`)
      qc.invalidateQueries({ queryKey: ['admin-hall-bookings'] })
    },
    onError: () => toast.error('Failed to update status'),
  })
}

export const useBlockHall = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { startTime: string; endTime: string; reason?: string } }) =>
      blockHallDates(id, data),
    onSuccess: () => {
      toast.success('Hall blocked successfully')
      qc.invalidateQueries({ queryKey: ['hall-availability'] })
    },
    onError: () => toast.error('Failed to block hall'),
  })
}
