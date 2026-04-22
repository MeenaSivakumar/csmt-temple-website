import { useState } from 'react'
import { format } from 'date-fns'
import PujaCard from '../molecules/PujaCard'
import PriestCard from '../molecules/PriestCard'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { useCreatePujaBooking } from '../hooks/usePujas'
import type { Puja, Priest } from '../types/puja.types'

interface Props { pujas: Puja[]; priests: Priest[]; onSuccess: () => void }

interface State {
  puja: Puja | null
  type: 'onsite' | 'private'
  date: string
  time: string
  address: string
  priestId: string
}

const TIMES = Array.from({ length: 30 }, (_, i) => {
  const mins = 360 + i * 30
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})

const STEPS = ['Select Puja', 'Date & Time', 'Choose Priest', 'Review & Reserve']

export default function PujaBookingWizard({ pujas, priests, onSuccess }: Props) {
  const [step, setStep] = useState(0)
  const [s, set_] = useState<State>({ puja: null, type: 'onsite', date: '', time: '', address: '', priestId: '' })
  const createMut = useCreatePujaBooking()
  const patch = (p: Partial<State>) => set_((prev) => ({ ...prev, ...p }))

  const canNext = [
    !!s.puja,
    !!s.date && !!s.time,
    true,
    true,
  ][step]

  const submit = () => {
    const datetime = new Date(`${s.date}T${s.time}:00`).toISOString()
    createMut.mutate({ pujaId: s.puja!._id, priestId: s.priestId || null, type: s.type, datetime, address: s.address || undefined }, { onSuccess })
  }

  const nav = (
    <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
      {step > 0 ? <Button variant="ghost" onClick={() => setStep(step - 1)}>← Back</Button> : <div />}
      {step < 3
        ? <Button variant="primary" disabled={!canNext} onClick={() => setStep(step + 1)}>Next →</Button>
        : <Button variant="primary" loading={createMut.isPending} onClick={submit}>Reserve Puja</Button>}
    </div>
  )

  return (
    <div>
      {/* Step indicator */}
      <div className="flex gap-1 mb-6">
        {STEPS.map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? 'bg-saffron' : 'bg-gray-200'}`} />
            <p className="text-xs mt-1 text-center hidden sm:block text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Step 0: Select Puja */}
      {step === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pujas.map((p) => <PujaCard key={p._id} puja={p} selected={s.puja?._id === p._id} onSelect={(p) => patch({ puja: p })} />)}
        </div>
      )}

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div className="space-y-4 max-w-sm">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date *</label>
            <Input type="date" min={format(new Date(), 'yyyy-MM-dd')} value={s.date} onChange={(e) => patch({ date: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Time *</label>
            <select value={s.time} onChange={(e) => patch({ time: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50">
              <option value="">Select time</option>
              {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type *</label>
            <div className="flex gap-3">
              {(['onsite', 'private'] as const).map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={t} checked={s.type === t} onChange={() => patch({ type: t })} className="accent-saffron" />
                  <span className="text-sm capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>
          {s.type === 'private' && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Address *</label>
              <Input placeholder="Full address for priest visit" value={s.address} onChange={(e) => patch({ address: e.target.value })} />
            </div>
          )}
        </div>
      )}

      {/* Step 2: Choose Priest */}
      {step === 2 && (
        <div className="space-y-3">
          <div
            onClick={() => patch({ priestId: '' })}
            className={`cursor-pointer rounded-xl border-2 p-3 text-sm font-medium text-center transition-all ${!s.priestId ? 'border-saffron bg-saffron/5 text-saffron' : 'border-gold-light text-gray-500 hover:border-saffron/50'}`}
          >
            🙏 Any Available Priest (admin assigns)
          </div>
          {priests.map((p) => <PriestCard key={p._id} priest={p} selected={s.priestId === p._id} onSelect={(id) => patch({ priestId: id })} />)}
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && s.puja && (
        <div className="space-y-3 text-sm">
          <div className="bg-cream rounded-xl p-4 space-y-2">
            <div className="flex justify-between"><span className="text-gray-500">Puja</span><span className="font-semibold text-maroon">{s.puja.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{s.date} at {s.time}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="capitalize">{s.type}</span></div>
            {s.address && <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="text-right max-w-xs">{s.address}</span></div>}
            <div className="flex justify-between"><span className="text-gray-500">Priest</span><span>{s.priestId ? priests.find((p) => p._id === s.priestId)?.name : 'Any Available'}</span></div>
            <div className="flex justify-between font-bold text-saffron border-t border-gold-light pt-2 mt-2"><span>Total</span><span>₹{s.puja.price}</span></div>
          </div>
          <p className="text-xs text-gray-400 text-center">⏳ Your reservation expires in 24 hours. Payment will be collected at confirmation.</p>
        </div>
      )}

      {nav}
    </div>
  )
}
