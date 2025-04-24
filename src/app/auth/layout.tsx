
'use client'
import React from 'react'
import AuthLayout from '../layouts/Authlauout/layout'
export default function layout({ children }: any) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
