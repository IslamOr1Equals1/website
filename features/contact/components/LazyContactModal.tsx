'use client'

import dynamic from 'next/dynamic'

const ContactModal = dynamic(
  () => import('./ContactModal').then(m => m.ContactModal),
  { ssr: false },
)

export function LazyContactModal() {
  return <ContactModal />
}
