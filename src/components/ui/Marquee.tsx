import { useTranslation } from 'react-i18next'

/**
 * Energetic scrolling brand strip.
 */
export const Marquee = () => {
    const { t } = useTranslation()
    const words = t('marquee', { returnObjects: true }) as string[]

    // Duplicate the sequence so the loop is seamless
    const sequence = [...words, ...words, ...words, ...words]

    return (
        <div className="overflow-hidden bg-orange-500 py-3" dir="ltr">
            <div className="animate-marquee flex w-max -translate-x-1/2 items-center">
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
