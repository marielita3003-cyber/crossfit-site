import { useTranslation } from 'react-i18next'
import { WordReveal } from './WordReveal'

/**
 * Community statement band.
 */
export const Stats = () => {
    const { t } = useTranslation()

    return (
        <section className="bg-black px-4 py-20 text-center dark:bg-white/5">
            <div className="mx-auto max-w-4xl">
                <p className="text-3xl font-black italic leading-snug tracking-tight text-white sm:text-5xl">
                    <WordReveal text={t('stats.statement')} stagger={60} />
                </p>
            </div>
        </section>
    )
}
