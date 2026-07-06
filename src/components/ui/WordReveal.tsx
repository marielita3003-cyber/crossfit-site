import { useEffect, useRef, useState } from 'react'

interface WordRevealProps {
    text: string
    className?: string
    /** ms between each word */
    stagger?: number
}

/**
 * Splits text into words and reveals them one by one
 * when the element scrolls into view.
 */
export const WordReveal = ({ text, className = '', stagger = 80 }: WordRevealProps) => {
    const ref = useRef<HTMLSpanElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
            setVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.01, rootMargin: '5000px 0px -30px 0px' },
        )
        observer.observe(el)
        return () => observer.disconnect()
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
