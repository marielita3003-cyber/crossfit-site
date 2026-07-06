import { useTranslation } from 'react-i18next'
import { MessageCircle, Dumbbell, Users } from 'lucide-react'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Magnetic } from '../components/ui/Magnetic'

const icons = [MessageCircle, Dumbbell, Users]

interface Step {
    title: string
    text: string
}

const HowItWorks = () => {
    const { t } = useTranslation()
    const steps = t('howItWorks.steps', { returnObjects: true }) as Step[]

    return (
        <section className="bg-black px-4 py-20 text-white dark:bg-white/5">
            <div className="mx-auto max-w-6xl">
                <Reveal>
                    <SectionTitle label={t('howItWorks.label')} title={t('howItWorks.title')} center />
                </Reveal>

                <div className="grid gap-8 sm:grid-cols-3">
                    {steps.map((step, i) => {
                        const Icon = icons[i % icons.length]
                        return (
                            <Reveal key={step.title} delay={i * 180}>
                                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                                    <div className="absolute -top-5 start-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-orange-500 text-lg font-black text-white rtl:translate-x-1/2">
                                        {i + 1}
                                    </div>
                                    <Icon className="mx-auto mb-4 h-10 w-10 text-orange-500" aria-hidden="true" />
                                    <h3 className="mb-2 text-xl font-black uppercase italic tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-6 text-white/70">{step.text}</p>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>

                <Reveal delay={300}>
                    <div className="mt-12 text-center">
                        <Magnetic className="inline-block">
                            <a
                                href="https://wa.me/972547244553?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%90%D7%99%D7%9E%D7%95%D7%9F%20%D7%A0%D7%99%D7%A1%D7%99%D7%95%D7%9F"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button size="lg" variant="primary" className="!bg-orange-500 !text-white shadow-lg shadow-orange-500/30 hover:!bg-orange-600">
                                    {t('howItWorks.cta')}
                                </Button>
                            </a>
                        </Magnetic>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default HowItWorks
