import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import type { ContentItem } from '../types/content.types'

const schema = z.object({
  type: z.enum(['event', 'deity_image', 'announcement']),
  title: z.string().min(1, 'Title is required'),
  body: z.string().optional(),
  date: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  item?: ContentItem | null
  onClose: () => void
  onSubmit: (data: FormData) => void
  loading?: boolean
}

export default function ContentFormModal({ item, onClose, onSubmit, loading }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: item?.type ?? 'event',
      title: item?.title ?? '',
      body: item?.body ?? '',
      date: item?.date ? item.date.slice(0, 10) : '',
    },
  })

  const type = watch('type')

  const submit = (values: FormValues) => {
    const fd = new FormData()
    fd.append('type', values.type)
    fd.append('title', values.title)
    if (values.body) fd.append('body', values.body)
    if (values.date) fd.append('date', values.date)
    const file = fileRef.current?.files?.[0]
    if (file) fd.append('image', file)
    onSubmit(fd)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-temple-lg w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent top bar */}
        <div className="h-1 bg-gold-gradient" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold-100">
          <h2 className="font-devotional text-maroon font-semibold text-base">
            {item ? 'Edit Content' : 'Add Content'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-maroon/60 uppercase tracking-wider mb-1.5 font-devotional">
              Type
            </label>
            <select
              {...register('type')}
              className="w-full border border-gold-100 rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron bg-white"
            >
              <option value="event">Event</option>
              <option value="deity_image">Deity Image</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-maroon/60 uppercase tracking-wider mb-1.5 font-devotional">
              Title <span className="text-saffron">*</span>
            </label>
            <Input {...register('title')} placeholder="Enter title" />
            {errors.title && <p className="text-red-500 text-xs mt-1">⚠ {errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-maroon/60 uppercase tracking-wider mb-1.5 font-devotional">
              Description
            </label>
            <textarea
              {...register('body')}
              rows={3}
              placeholder="Optional description"
              className="w-full border border-gold-100 rounded-xl px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-saffron resize-none bg-white"
            />
          </div>

          {type === 'event' && (
            <div>
              <label className="block text-xs font-semibold text-maroon/60 uppercase tracking-wider mb-1.5 font-devotional">
                Event Date
              </label>
              <Input type="date" {...register('date')} />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-maroon/60 uppercase tracking-wider mb-1.5 font-devotional">
              Image {item?.imageUrl && <span className="text-gray-400 normal-case font-body font-normal tracking-normal">(leave blank to keep current)</span>}
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-saffron-100 file:text-saffron-dark hover:file:bg-saffron-200 transition-colors"
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm" loading={loading}>
              {item ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
