'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface ModalContextValue {
  isContactOpen: boolean
  openContact: () => void
  closeContact: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  // Global delegate: any element with data-open-contact opens the modal
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-open-contact]')) setIsContactOpen(true)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        isContactOpen,
        openContact: () => setIsContactOpen(true),
        closeContact: () => setIsContactOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
