import { useRef } from 'react'

interface MagneticProps {
    children: React.ReactNode
    /** How strongly the element is pulled toward the cursor (0-1) */
    strength?: number
    className?: string
}

/**
 * Wraps any element and makes it "magnetically" follow the cursor
 * while hovered. Desktop only by nature (mouse events).
 */
export const Magnetic = ({ children, strength = 0.35, className = '' }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleLeave = () => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'translate(0px, 0px)'
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={`magnetic ${className}`}
        >
            {children}
        </div>
    )
}
