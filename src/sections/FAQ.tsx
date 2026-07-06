import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'

interface FaqItem {
    q: string
    a: string
}

const FAQ = () => {
    const { t } = useTranslation()
    const items = t('faq.items', { returnObjects: true }) as FaqItem[]
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section className="px-4 py-20">
            <div className="mx-auto max-w-3xl">
                <Reveal>
                    <SectionTitle label={t('faq.label')} title={t('faq.title')} center />
                </Reveal>

                <div className="space-y-3">
                    {items.map((item, i) => {
                        const isOpen = open === i
                        return (
                            <Reveal key={item.q} delay={i * 80}>
                                <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                                    <button
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-lg font-bold transition hover:bg-black/5 dark:hover:bg-white/5"
                                        aria-expanded={isOpen}
                                    >
                                        {item.q}
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-orange-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <div
                                        className="grid transition-all duration-300 ease-out"
                                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-5 pb-5 leading-7 text-black/70 dark:text-white/70">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FAQ
