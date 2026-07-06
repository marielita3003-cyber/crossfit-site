import { useEffect, useRef, useState } from 'react'

interface RevealProps {
    children: React.ReactNode
    /** Delay in ms before the element animates in (for staggering) */
    delay?: number
    className?: string
}

/**
 * Fades + slides children in when they enter the viewport.
 * Uses IntersectionObserver + a scroll-position fallback so content
 * can never get stuck invisible, no matter how fast the user scrolls.
 */
export const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.95

        // Anything already scrolled past (or on screen) shows immediately
        if (inView()) {
            setVisible(true)
            return
        }

        let done = false
        const show = () => {
            if (done) return
            done = true
            setVisible(true)
            cleanup()
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) show()
            },
            { threshold: 0.01, rootMargin: '5000px 0px -20px 0px' },
        )

        // Fallback: plain scroll/resize check, so a missed observer tick
        // can never leave the element transparent.
        const onScrollCheck = () => {
            if (inView()) show()
        }

        const cleanup = () => {
            observer.disconnect()
            window.removeEventListener('scroll', onScrollCheck)
            window.removeEventListener('resize', onScrollCheck)
        }

        observer.observe(el)
        window.addEventListener('scroll', onScrollCheck, { passive: true })
        window.addEventListener('resize', onScrollCheck, { passive: true })

        return cleanup
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
