import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Energetic scrolling brand strip.
 * Speeds up while the user scrolls, then settles back to cruise speed.
 */
export const Marquee = () => {
    const { t } = useTranslation()
    const trackRef = useRef<HTMLDivElement>(null)
    const words = t('marquee', { returnObjects: true }) as string[]

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let offset: number | null = null
        let boost = 0
        let lastScrollY = window.scrollY
        let raf = 0

        const onScroll = () => {
            const delta = Math.abs(window.scrollY - lastScrollY)
            lastScrollY = window.scrollY
            // scrolling adds a temporary speed boost (capped)
            boost = Math.min(boost + delta * 0.08, 14)
        }

        const tick = () => {
            const half = track.scrollWidth / 2
            if (offset === null) offset = -half

            const base = reduced ? 0 : 0.6
            offset += base + boost
            boost *= 0.94 // decay back to cruise speed

            if (half > 0 && offset >= 0) offset -= half

            track.style.transform = `translateX(${offset}px)`
            raf = requestAnimationFrame(tick)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        raf = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(raf)
        }
    }, [])

    // Duplicate the sequence so the loop is seamless
    const sequence = [...words, ...words, ...words, ...words]

    return (
        <div className="overflow-hidden bg-orange-500 py-3" dir="ltr">
            <div ref={trackRef} className="flex w-max items-center will-change-transform">
                {sequence.map((word, i) => (
                    <span
                        key={i}
                        className="mx-6 flex items-center gap-6 whitespace-nowrap text-lg font-black uppercase italic tracking-tight text-white"
                    >
                        {word}
                        <span className="text-white/60">•</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
