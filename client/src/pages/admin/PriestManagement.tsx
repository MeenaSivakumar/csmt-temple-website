import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, X } from 'lucide-react'
import Button from '../../atoms/Button'
import Badge from '../../atoms/Badge'
import Input from '../../atoms/Input'
import Spinner from '../../atoms/Spinner'
import { useAdminPriests, useCreatePriest, useUpdatePriest } from '../../hooks/usePujas'
import { useConfirm } from '../../hooks/useConfirm'
import type { Priest } from '../../types/puja.types'

const schema = z.object({ name: z.string().min(1, 'Name required'), bio: z.string().optional() })
type FormValues = z.infer<typeof schema>

interface ModalProps { item?: Priest | null; onClose: () => void; loading?: boolean; onSubmit: (fd: FormData) => void }

function PriestModal({ item, onClose, loading, onSubmit }: ModalProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: item?.name ?? '', bio: item?.bio ?? '' },
  })
  const submit = (v: FormValues) => {
    const fd = new FormData()
    fd.append('name', v.name)
    if (v.bio) fd.append('bio', v.bio)
    const file = fileRef.current?.files?.[0]
    if (file) fd.append('photo', file)
    onSubmit(fd)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-devotional text-maroon font-semibold">{item ? 'Edit Priest' : 'Add Priest'}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit(submit)} className="px-6 py-5 space-y-4">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
            <Input {...register('name')} placeholder="Priest name" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Bio</label>
            <textarea {...register('bio')} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50 resize-none" />
          </div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Photo {item?.photo && '(blank = keep current)'}</label>
            <input ref={fileRef} type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-saffron/10 file:text-saffron" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" loading={loading}>{item ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PriestManagement() {
  const [modal, setModal] = useState<Priest | null | undefined>(undefined)
  const { data: priests, isLoading } = useAdminPriests()
  const createMut = useCreatePriest()
  const updateMut = useUpdatePriest()
  const { confirm } = useConfirm()

  const handleSubmit = (fd: FormData) => {
    if (modal) updateMut.mutate({ id: modal._id, data: fd }, { onSuccess: () => setModal(undefined) })
    else createMut.mutate(fd, { onSuccess: () => setModal(undefined) })
  }

  const handleDeactivate = (p: Priest) => confirm({
    title: 'Deactivate Priest',
    message: `Remove "${p.name}" from active roster?`,
    onConfirm: () => updateMut.mutate({ id: p._id, data: (() => { const fd = new FormData(); fd.append('isActive', 'false'); return fd })() }),
  })

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-devotional text-maroon">Manage Priests</h1>
        <Button variant="primary" size="sm" onClick={() => setModal(null)}><Plus size={16} /> Add Priest</Button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream border-b border-gray-100">
            <tr>{['Priest', 'Bio', 'Status', ''].map((h) => <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {priests?.map((p) => (
              <tr key={p._id} className="hover:bg-cream/40">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    {p.photo ? <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-gold-light flex items-center justify-center text-xs font-bold text-maroon">{p.name[0]}</div>}
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{p.bio ?? '—'}</td>
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
      {modal !== undefined && <PriestModal item={modal} onClose={() => setModal(undefined)} onSubmit={handleSubmit} loading={createMut.isPending || updateMut.isPending} />}
    </div>
  )
}
