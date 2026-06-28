'use client'

import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.1 },
    )
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
