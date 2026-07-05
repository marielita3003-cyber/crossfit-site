import { useEffect, useRef, useState } from 'react'

/**
 * Branded custom cursor: orange dot + trailing ring that grows
 * over interactive elements. Renders only for fine pointers (mouse).
 */
export const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        setEnabled(true)
    }, [])

    useEffect(() => {
        if (!enabled) return

        let mouseX = -100
        let mouseY = -100
        let ringX = -100
        let ringY = -100
        let raf = 0

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            const dot = dotRef.current
            if (dot) dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`

            const target = e.target as HTMLElement
            const interactive = target.closest('a, button, [role="button"], input, select, textarea')
            ringRef.current?.classList.toggle('is-hovering', !!interactive)
        }

        const tick = () => {
            // The ring lags behind the dot for a smooth trailing feel
            ringX += (mouseX - ringX) * 0.18
            ringY += (mouseY - ringY) * 0.18
            const ring = ringRef.current
            if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px)`
            raf = requestAnimationFrame(tick)
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        raf = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [enabled])

    if (!enabled) return null

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-100px, -100px)' }} />
            <div ref={ringRef} className="cursor-ring" style={{ transform: 'translate(-100px, -100px)' }} />
        </>
    )
}
