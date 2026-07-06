import { useTranslation } from 'react-i18next'
import { Star } from 'lucide-react'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'

const GOOGLE_REVIEWS_URL =
    'https://www.google.com/maps/place/%D7%A7%D7%A8%D7%95%D7%A1%D7%A4%D7%99%D7%98+%D7%93%D7%94+%D7%A4%D7%99%D7%A8%D7%A1%D7%98+-+Crossfit+Da+First%E2%80%AD/@31.9931068,34.7517585,17z/'

interface Review {
    name: string
    text: string
}

const Testimonials = () => {
    const { t } = useTranslation()
    const reviews = t('testimonials.reviews', { returnObjects: true }) as Review[]

    return (
        <section className="bg-white px-4 py-20 text-black dark:bg-black dark:text-white">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <SectionTitle
                        label={t('testimonials.label')}
                        title={t('testimonials.title')}
                        center
                    />
                </Reveal>

                <Reveal>
                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mx-auto mb-10 flex w-fit items-center gap-3 rounded-full border border-black/10 px-6 py-3 transition hover:border-orange-500 dark:border-white/10"
                    >
                        <span className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" aria-hidden="true" />
                            ))}
                        </span>
                        <span className="text-lg font-black">5.0</span>
                        <span className="text-sm text-black/60 dark:text-white/60">{t('testimonials.badge')}</span>
                    </a>
                </Reveal>

                <div className="grid gap-6 md:grid-cols-3">
                    {reviews.map((review, i) => (
                        <Reveal key={review.name} delay={i * 150}>
                            <TiltCard className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5" max={5}>
                                <div className="mb-3 flex gap-1">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} className="h-4 w-4 fill-orange-500 text-orange-500" aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="flex-1 text-base leading-7 text-black/80 dark:text-white/80">
                                    "{review.text}"
                                </p>
                                <p className="mt-4 font-bold">{review.name}</p>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
