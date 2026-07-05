import { useRef } from 'react'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    /** Max tilt angle in degrees */
    max?: number
}

/**
 * 3D tilt-on-hover card with a soft light glare that follows the cursor.
 * Pure CSS transforms — no dependencies.
 */
export const TiltCard = ({ children, className = '', max = 8 }: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height

        const rotateY = (px - 0.5) * 2 * max
        const rotateX = (0.5 - py) * 2 * max

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
        el.style.setProperty('--glare-x', `${px * 100}%`)
        el.style.setProperty('--glare-y', `${py * 100}%`)
    }

    const handleLeave = () => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
    }

    return (
        <div className="tilt-wrap">
            <div
                ref={ref}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className={`tilt-card relative ${className}`}
            >
                {children}
                <div className="tilt-glare rounded-2xl" />
            </div>
        </div>
    )
}
