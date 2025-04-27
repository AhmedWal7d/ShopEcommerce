import React, { ReactNode } from 'react'
type Props = {
  children: ReactNode
}

export default function AuthLayout({children}:Props) {
  return (
    <> 
    {/* <h3>Auth Nav</h3> */}
    {children}
    
    
     </>
  )
}
