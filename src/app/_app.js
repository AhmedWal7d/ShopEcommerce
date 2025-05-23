'use client'

import { ThemeProvider } from 'next-themes'
import './globals.css'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }) {

  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const currentLocale = window.location.pathname.split('/')[1]
    setLocale(currentLocale === 'ar' ? 'ar' : 'en')
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
