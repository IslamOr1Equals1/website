'use client'

import { useEffect, useRef } from 'react'

const W = 280, H = 280, CX = W / 2, CY = H / 2, R = 108

const CITIES: [number, number][] = [
  [51.5, -0.1], [48.8, 2.3], [40.7, -74], [25.2, 55.3],
  [1.3, 103.8], [35.7, 139.7], [30.0, 31.2], [19.1, 72.9],
  [-23.5, -46.6], [43.7, -79.4], [55.8, 37.6], [39.9, 116.4],
  [34.0, -118.2], [52.5, 13.4], [41.0, 28.9],
]

const ARC_DEFS: [number, number][] = [
  [2, 0], [2, 1], [10, 0], [12, 3], [8, 1],
  [11, 7], [5, 3], [6, 0], [13, 4], [14, 2],
]

interface Arc {
  s: number
  d: number
  progress: number
  speed: number
  opacity: number
}

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let rot = 0
    let animId: number

    const arcs: Arc[] = ARC_DEFS.map(([s, d]) => ({
      s, d,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      opacity: 0.6 + Math.random() * 0.4,
    }))

    function project(lat: number, lon: number) {
      const latR = lat * Math.PI / 180
      const lonR = (lon + rot) * Math.PI / 180
      const x = Math.cos(latR) * Math.sin(lonR)
      const y = -Math.sin(latR)
      const z = Math.cos(latR) * Math.cos(lonR)
      return { x: CX + x * R, y: CY + y * R, z }
    }

    function slerp(a: number, b: number, t: number) {
      const lat1 = CITIES[a][0] * Math.PI / 180
      const lon1 = (CITIES[a][1] + rot) * Math.PI / 180
      const lat2 = CITIES[b][0] * Math.PI / 180
      const lon2 = (CITIES[b][1] + rot) * Math.PI / 180
      const p1 = [Math.cos(lat1) * Math.cos(lon1), -Math.sin(lat1), Math.cos(lat1) * Math.sin(lon1)]
      const p2 = [Math.cos(lat2) * Math.cos(lon2), -Math.sin(lat2), Math.cos(lat2) * Math.sin(lon2)]
      const dot = p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2]
      const omega = Math.acos(Math.min(1, Math.abs(dot)))
      if (omega < 0.001) return { x: CX + p1[0] * R, y: CY + p1[1] * R, z: p1[2] }
      const s = Math.sin(omega)
      const w1 = Math.sin((1 - t) * omega) / s
      const w2 = Math.sin(t * omega) / s
      const px = w1 * p1[0] + w2 * p2[0]
      const py = w1 * p1[1] + w2 * p2[1]
      const pz = w1 * p1[2] + w2 * p2[2]
      return { x: CX + px * R, y: CY + py * R, z: pz }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Glow background
      const grd = ctx.createRadialGradient(CX, CY, R * 0.7, CX, CY, R * 1.3)
      grd.addColorStop(0, 'rgba(26,107,255,0.05)')
      grd.addColorStop(1, 'rgba(26,107,255,0)')
      ctx.fillStyle = grd
      ctx.beginPath(); ctx.arc(CX, CY, R * 1.3, 0, Math.PI * 2); ctx.fill()

      // Globe sphere
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(26,107,255,0.2)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.fillStyle = 'rgba(6,11,23,0.6)'; ctx.fill()

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latR = lat * Math.PI / 180
        const r2 = Math.cos(latR) * R
        const yy = CY - Math.sin(latR) * R
        if (r2 > 1) {
          ctx.beginPath()
          ctx.ellipse(CX, yy, r2, r2 * 0.15, 0, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(26,107,255,0.07)'; ctx.lineWidth = 0.5; ctx.stroke()
        }
      }

      // Longitude lines
      for (let lon = 0; lon < 180; lon += 30) {
        const lonR = (lon + rot) * Math.PI / 180
        ctx.beginPath()
        for (let la = -90; la <= 90; la += 5) {
          const laR = la * Math.PI / 180
          const x = CX + Math.cos(laR) * Math.sin(lonR) * R
          const y = CY - Math.sin(laR) * R
          const z = Math.cos(laR) * Math.cos(lonR)
          if (la === -90) ctx.moveTo(x, y)
          else if (z > 0) ctx.lineTo(x, y)
          else ctx.moveTo(x, y)
        }
        ctx.strokeStyle = 'rgba(26,107,255,0.06)'; ctx.lineWidth = 0.5; ctx.stroke()
      }

      // Attack arcs
      arcs.forEach((arc) => {
        arc.progress += arc.speed
        if (arc.progress > 1.3) arc.progress = 0
        const trailLen = 0.25
        const start = Math.max(0, arc.progress - trailLen)
        const end = Math.min(1, arc.progress)
        if (start >= end) return

        ctx.beginPath()
        let first = true
        for (let i = 0; i <= 60; i++) {
          const t = start + (end - start) * (i / 60)
          const pt = slerp(arc.s, arc.d, t)
          if (pt.z < 0) { first = true; continue }
          if (first) { ctx.moveTo(pt.x, pt.y); first = false }
          else ctx.lineTo(pt.x, pt.y)
        }
        const grad = ctx.createLinearGradient(0, 0, W, H)
        grad.addColorStop(0, 'rgba(255,68,102,0)')
        grad.addColorStop(0.5, `rgba(255,68,102,${arc.opacity * 0.7})`)
        grad.addColorStop(1, `rgba(255,149,0,${arc.opacity * 0.9})`)
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke()

        // Tip dot
        if (arc.progress <= 1) {
          const tip = slerp(arc.s, arc.d, Math.min(arc.progress, 1))
          if (tip.z > 0) {
            ctx.beginPath(); ctx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2)
            ctx.fillStyle = '#FF4466'
            ctx.shadowBlur = 8; ctx.shadowColor = '#FF4466'
            ctx.fill(); ctx.shadowBlur = 0
          }
        }
      })

      // City dots
      CITIES.forEach(([lat, lon]) => {
        const pt = project(lat, lon)
        if (pt.z < 0) return
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26,107,255,0.9)'
        ctx.shadowBlur = 5; ctx.shadowColor = '#1A6BFF'
        ctx.fill(); ctx.shadowBlur = 0
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(26,107,255,0.25)'; ctx.lineWidth = 1; ctx.stroke()
      })

      rot += 0.12
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div
      style={{ position: 'relative', width: W, height: H }}
      role="img"
      aria-label="Global threat monitoring visualization"
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ display: 'block' }}
        aria-hidden="true"
      />
    </div>
  )
}
