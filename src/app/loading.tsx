import React from 'react'

export default function loading() {
  return (
    <div>
          <div className="fixed inset-0 bg-white/70 mt-20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-teal-600 text-xl font-semibold animate-pulse">
        Loading...
      </div>
    </div>
    </div>
  )
}
