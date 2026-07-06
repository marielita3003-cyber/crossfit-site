import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'

const photos = [
    { src: '/gallery/team-arena.jpg', wide: true },
    { src: '/gallery/handstand.jpg', wide: false },
    { src: '/gallery/competition.jpg', wide: true },
    { src: '/gallery/girls-team.jpg', wide: false },
    { src: '/gallery/class-bw.jpg', wide: true },
    { src: '/gallery/rowing.jpg', wide: false },
]

const Gallery = () => {
    const { t } = useTranslation()

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <SectionTitle label={t('gallery.label')} title={t('gallery.title')} center />
                </Reveal>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {photos.map((photo, i) => (
                        <Reveal
                            key={photo.src}
                            delay={i * 100}
                            className={photo.wide ? 'col-span-2' : 'col-span-1'}
                        >
                            <div className="group h-56 overflow-hidden rounded-2xl sm:h-64">
                                <img
                                    src={photo.src}
                                    alt={t('gallery.title')}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery
