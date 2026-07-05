import { useEffect, useRef, useState } from 'react'

interface RevealProps {
    children: React.ReactNode
    /** Delay in ms before the element animates in (for staggering) */
    delay?: number
    className?: string
}

/**
 * Fades + slides children in when they enter the viewport.
 * Pure CSS + IntersectionObserver — no dependencies.
 */
export const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
            style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
        >
            {children}
        </div>
    )
}
