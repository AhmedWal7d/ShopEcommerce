import React, { ReactNode } from 'react'
type Props = {
    children: ReactNode
  }
  
export default function MasterLayout({children}:Props) {
  return (
    <> 
    <h3>Master Nav</h3>
    {children}

    footer
    
     </>
  )
}
