import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, X } from 'lucide-react'
import Button from '../../atoms/Button'
import Badge from '../../atoms/Badge'
import Input from '../../atoms/Input'
import Spinner from '../../atoms/Spinner'
import { useAdminPujas, useCreatePuja, useUpdatePuja } from '../../hooks/usePujas'
import { useConfirm } from '../../hooks/useConfirm'
import type { Puja } from '../../types/puja.types'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().optional(),
  durationMinutes: z.string().min(1, 'Required'),
  price: z.string().min(1, 'Required'),
})
type FormValues = z.infer<typeof schema>

interface ModalProps { item?: Puja | null; onClose: () => void; loading?: boolean; onSubmit: (d: Partial<Puja>) => void }

function PujaModal({ item, onClose, loading, onSubmit }: ModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: item?.name ?? '', description: item?.description ?? '', durationMinutes: String(item?.durationMinutes ?? 60), price: String(item?.price ?? 0) },
  })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-devotional text-maroon font-semibold">{item ? 'Edit Puja' : 'Add Puja'}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit((v) => onSubmit({ name: v.name, description: v.description, durationMinutes: Number(v.durationMinutes), price: Number(v.price) }))} className="px-6 py-5 space-y-4">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
            <Input {...register('name')} placeholder="Puja name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea {...register('description')} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Duration (min) *</label>
              <Input type="number" {...register('durationMinutes')} min={15} />
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Price (₹) *</label>
              <Input type="number" {...register('price')} min={0} />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" loading={loading}>{item ? 'Save' : 'Create'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PujaManagement() {
  const [modal, setModal] = useState<Puja | null | undefined>(undefined)
  const { data: pujas, isLoading } = useAdminPujas()
  const createMut = useCreatePuja()
  const updateMut = useUpdatePuja()
  const { confirm } = useConfirm()

  const handleSubmit = (values: Partial<Puja>) => {
    if (modal) updateMut.mutate({ id: modal._id, data: values }, { onSuccess: () => setModal(undefined) })
    else createMut.mutate(values, { onSuccess: () => setModal(undefined) })
  }

  const handleDeactivate = (p: Puja) => confirm({
    title: 'Deactivate Puja',
    message: `Deactivate "${p.name}"? It will be hidden from devotees.`,
    onConfirm: () => updateMut.mutate({ id: p._id, data: { isActive: false } }),
  })

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-devotional text-maroon">Manage Pujas</h1>
        <Button variant="primary" size="sm" onClick={() => setModal(null)}><Plus size={16} /> Add Puja</Button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream border-b border-gray-100">
            <tr>{['Name', 'Duration', 'Price', 'Status', ''].map((h) => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pujas?.map((p) => (
              <tr key={p._id} className="hover:bg-cream/40">
                <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                <td className="px-5 py-3 text-gray-500">{p.durationMinutes} min</td>
                <td className="px-5 py-3 text-gray-500">₹{p.price}</td>
                <td className="px-5 py-3"><Badge status={p.isActive ? 'active' : 'inactive'} label={p.isActive ? 'Active' : 'Inactive'} /></td>
                <td className="px-5 py-3"><div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setModal(p)}>Edit</Button>
                  {p.isActive && <Button variant="danger" size="sm" onClick={() => handleDeactivate(p)}>Deactivate</Button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal !== undefined && <PujaModal item={modal} onClose={() => setModal(undefined)} onSubmit={handleSubmit} loading={createMut.isPending || updateMut.isPending} />}
    </div>
  )
}
