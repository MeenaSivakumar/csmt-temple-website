import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-devotional text-maroon">CSMT Temple</h1>
          <p className="text-gold text-sm mt-1">॥ सर्वे भवन्तु सुखिनः ॥</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gold-light p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
