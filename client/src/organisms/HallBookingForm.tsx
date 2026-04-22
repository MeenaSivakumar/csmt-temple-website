import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Spinner from '../atoms/Spinner'
import { useHallAvailability, useCreateHallBooking } from '../hooks/useHalls'
import type { Hall } from '../types/hall.types'

interface Props { hall: Hall; onSuccess: () => void }

const schema = z.object({
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time required'),
  endTime: z.string().min(1, 'End time required'),
  eventDescription: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

const generateTimes = () => {
  const times: string[] = []
  for (let h = 6; h <= 21; h++)
    for (const m of [0, 30])
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  return times
}

const timeToMins = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }

export default function HallBookingForm({ hall, onSuccess }: Props) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const [selectedDate, setSelectedDate] = useState('')
  const { data: avail, isLoading: loadingAvail } = useHallAvailability(hall._id, selectedDate)
  const createMut = useCreateHallBooking()
  const times = useMemo(generateTimes, [])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const startTime = watch('startTime')

  const isBlocked = (t: string) =>
    (avail?.occupiedRanges ?? []).some(
      (r) => timeToMins(t) >= timeToMins(r.start) && timeToMins(t) < timeToMins(r.end)
    )

  const endTimes = useMemo(() => {
    if (!startTime || !avail) return times.filter((t) => !isBlocked(t))
    const minEnd = timeToMins(startTime) + hall.minBookingHours * 60
    return times.filter((t) => timeToMins(t) >= minEnd && !isBlocked(t))
  }, [startTime, avail, times, hall.minBookingHours])

  const onSubmit = (values: FormValues) => {
    createMut.mutate(
      { hallId: hall._id, ...values },
      { onSuccess }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Date *</label>
        <Input
          type="date"
          min={today}
          {...register('date', { onChange: (e) => setSelectedDate(e.target.value) })}
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
      </div>

      {loadingAvail && <div className="flex items-center gap-2 text-sm text-gray-400"><Spinner size="sm" /> Checking availability…</div>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Start Time *</label>
          <select {...register('startTime')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50">
            <option value="">Select time</option>
            {times.filter((t) => !isBlocked(t)).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">End Time *</label>
          <select {...register('endTime')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50">
            <option value="">Select time</option>
            {endTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Event Description</label>
        <textarea
          {...register('eventDescription')}
          rows={3}
          placeholder="e.g. Wedding reception, Birthday puja…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50 resize-none"
        />
      </div>

      <p className="text-xs text-gray-400">
        Min booking: {hall.minBookingHours}h · Cleaning gap: {hall.cleaningGapHours}h between bookings.
        Your booking will be <strong>pending</strong> until admin confirms.
      </p>

      <Button type="submit" variant="primary" className="w-full" loading={createMut.isPending}>
        Request Booking
      </Button>
    </form>
  )
}
