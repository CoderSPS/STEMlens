'use client'

import { ReactNode } from 'react'
import '../styles/globals.css'

export const metadata = {
  title: 'NeuroSTEM Atlas',
  description: 'AI × STEM education platform',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neural-dark text-text-primary">
        {children}
      </body>
    </html>
  )
}
