"use client"

import { useEffect, useRef } from "react"

export function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let dotX = targetX
    let dotY = targetY
    let ringX = targetX
    let ringY = targetY
    let rafId = 0

    const moveCursor = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    const hideCursor = () => {
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    const animate = () => {
      dotX += (targetX - dotX) * 0.38
      dotY += (targetY - dotY) * 0.38
      ringX += (targetX - ringX) * 0.14
      ringY += (targetY - ringY) * 0.14

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseleave", hideCursor)
    animate()

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseleave", hideCursor)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-9 w-9 rounded-full border border-white/25 bg-white/[0.03] opacity-0 backdrop-blur-[1px] transition-opacity duration-300 md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-2.5 w-2.5 rounded-full bg-[#f1dfd0] opacity-0 shadow-[0_0_18px_rgba(241,223,208,0.45)] transition-opacity duration-300 md:block"
      />
    </>
  )
}
