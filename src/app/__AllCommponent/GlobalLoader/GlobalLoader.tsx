// components/GlobalLoader.tsx
'use client'

import { useSelector } from 'react-redux'

export default function GlobalLoader() {
  const isLoading = useSelector((state: any) => state.loading.isLoading)
  

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white/70 mt-20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-teal-600 text-xl font-semibold animate-pulse">
        Loading...
      </div>
    </div>
  )
}
