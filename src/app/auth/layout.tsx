
'use client'
import React, { ReactNode } from 'react'
import AuthLayout from '../layouts/Authlauout/layout'
type Props = {
    children: ReactNode
  }
  
export default function layout({ children }: Props) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
