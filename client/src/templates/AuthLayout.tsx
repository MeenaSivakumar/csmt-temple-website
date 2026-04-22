import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Om watermarks */}
      <span className="absolute top-8 left-8 text-8xl text-gold/5 select-none pointer-events-none font-devotional rotate-[-15deg]">ॐ</span>
      <span className="absolute bottom-8 right-8 text-8xl text-gold/5 select-none pointer-events-none font-devotional rotate-[15deg]">ॐ</span>

      <div className="w-full max-w-md relative z-10">
        {/* Temple branding above card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-maroon shadow-temple-lg mb-4 border-2 border-gold/30">
            <span className="text-3xl">🕉</span>
          </div>
          <h1 className="text-3xl font-devotional text-maroon font-semibold">CSMT Temple</h1>
          <p className="text-gold-dark text-sm mt-1.5 tracking-[0.15em]">॥ सर्वे भवन्तु सुखिनः ॥</p>
        </div>

        {/* Auth card */}
        <div className="bg-white rounded-3xl shadow-temple-lg border border-gold-100 overflow-hidden">
          <div className="h-1 bg-gold-gradient" />
          <div className="p-8">
            <Outlet />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} CSMT Temple. All rights reserved.
        </p>
      </div>
    </div>
  )
}
