import type { ReactNode } from 'react'
import { ModalProvider } from './ModalProvider'

export function Providers({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}
