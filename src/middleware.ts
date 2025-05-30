'use client'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // صفحات نحتاج نحميها
  const protectedPaths = ['/dashboard', '/profile', '/admin']

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
  }
  