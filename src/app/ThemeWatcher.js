// components/ThemeWatcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function ThemeWatcher() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return null
}