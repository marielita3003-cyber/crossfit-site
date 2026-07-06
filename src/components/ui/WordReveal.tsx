import { useEffect, useRef, useState } from 'react'

interface WordRevealProps {
    text: string
    className?: string
    /** ms between each word */
    stagger?: number
}

/**
 * Splits text into words and reveals them one by one
 * when the element scrolls into view. Includes a scroll fallback
 * so the text can never get stuck invisible.
 */
export const WordReveal = ({ text, className = '', stagger = 80 }: WordRevealProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.95

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

    const words = text.split(' ')

    return (
        <span ref={ref} className={`word-reveal ${visible ? 'is-visible' : ''} ${className}`}>
            {words.map((word, i) => (
                <span key={i}>
                    <span className="word" style={{ '--word-delay': `${i * stagger}ms` } as React.CSSProperties}>
                        {word}
                    </span>
                    {i < words.length - 1 && ' '}
                </span>
            ))}
        </span>
    )
}
