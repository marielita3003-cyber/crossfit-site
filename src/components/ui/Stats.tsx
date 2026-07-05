import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface StatItem {
    value: number
    suffix?: string
    label: string
}

const CountUp = ({ target, suffix = '', start }: { target: number; suffix?: string; start: boolean }) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!start) return
        const duration = 1600
        const t0 = performance.now()
        let raf = 0

        const tick = (now: number) => {
            const progress = Math.min((now - t0) / duration, 1)
            // ease-out so the counter slows down near the end
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [start, target])

    return (
        <span dir="ltr">
            {value.toLocaleString()}
            {suffix}
        </span>
    )
}

export const Stats = () => {
    const { t } = useTranslation()
    const items = t('stats.items', { returnObjects: true }) as StatItem[]
    const ref = useRef<HTMLDivElement>(null)
    const [start, setStart] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStart(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.4 },
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={ref} className="bg-black px-4 py-16 text-white dark:bg-white/5">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
                {items.map((item) => (
                    <div key={item.label}>
                        <div className="text-4xl font-black italic tracking-tight text-orange-500 sm:text-6xl">
                            <CountUp target={item.value} suffix={item.suffix} start={start} />
                        </div>
                        <div className="mt-2 text-sm font-semibold uppercase tracking-widest text-white/60">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
