import type { ReactNode } from 'react'
import { Navbar } from '@/features/navbar/components/Navbar'
import { Footer } from '@/features/footer/components/Footer'
import { LazyContactModal } from '@/features/contact/components/LazyContactModal'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <LazyContactModal />
    </>
  )
}
