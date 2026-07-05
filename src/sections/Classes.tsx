import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'

const images = [
    '/group_img.jpg',
    '/rehabilitation_img.jpg',
    '/personal_img.jpg',
]

const Classes = () => {
    const { t } = useTranslation()
    const items = t('classes.items', { returnObjects: true }) as string[]

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <SectionTitle
                        label={t('classes.title')}
                        title={t('classes.subtitle')}
                        center
                    />
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-3">
                    {items.map((item, i) => (
                        <Reveal key={item} delay={i * 150}>
                            <TiltCard className="group overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/5">
                                <div className="relative h-56 overflow-hidden rounded-t-2xl">
                                    <img
                                        src={images[i]}
                                        alt={item}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                                </div>
                                <div className="p-5 text-lg font-black uppercase italic tracking-tight">
                                    {item}
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Classes
