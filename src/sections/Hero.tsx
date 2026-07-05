import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Magnetic } from '../components/ui/Magnetic'
import { Link } from 'react-router-dom'

const Hero = () => {
    const { t } = useTranslation()
    const bgRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLImageElement>(null)

    // Parallax: content and background move at different speeds on scroll
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let raf = 0
        const onScroll = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const y = window.scrollY
                const content = contentRef.current
                const bg = bgRef.current
                if (content) {
                    content.style.transform = `translateY(${y * 0.35}px)`
                    content.style.opacity = `${Math.max(1 - y / 600, 0)}`
                }
                if (bg) bg.style.transform = `translateY(${y * 0.15}px)`
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(raf)
        }
    }, [])

    // Pseudo-3D logo: tilts toward the mouse
    const handleMouse = (e: React.MouseEvent) => {
        const logo = logoRef.current
        if (!logo) return
        const px = e.clientX / window.innerWidth - 0.5
        const py = e.clientY / window.innerHeight - 0.5
        logo.style.transform = `perspective(700px) rotateY(${px * 22}deg) rotateX(${-py * 22}deg)`
    }

    const resetMouse = () => {
        const logo = logoRef.current
        if (logo) logo.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)'
    }

    return (
        <section
            className="relative min-h-[calc(100vh-64px)] overflow-hidden"
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
        >
            <div ref={bgRef} className="absolute inset-[-8%] will-change-transform">
                <picture className="absolute inset-0">
                    <source media="(max-width: 767px)" srcSet="/hero_mobile.jpg" />
                    <img
                        src="/hero_desktop.jpg"
                        alt="Crossfit hero background"
                        className="animate-ken-burns h-full w-full object-cover"
                    />
                </picture>
            </div>

            <div className="absolute inset-0 bg-black/45" />

            <div
                ref={contentRef}
                className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-8 px-4 text-center will-change-transform"
            >
                <div className="hero-in">
                    <div className="logo-3d">
                        <img ref={logoRef} src="/logo.png" alt="Logo" className="logo-3d-inner" />
                    </div>
                </div>

                <h1 className="hero-in max-w-4xl text-5xl font-black uppercase italic leading-[0.9] tracking-tighter text-white sm:text-7xl md:text-8xl" style={{ animationDelay: '0.15s' }}>
                    {t('hero.title')}
                </h1>

                <h2 className="hero-in max-w-xl text-2xl font-medium text-white/90 sm:text-3xl" style={{ animationDelay: '0.3s' }}>
                    {t('hero.subtitle')}
                </h2>

                <div className="hero-in flex flex-wrap justify-center gap-4" style={{ animationDelay: '0.45s' }}>
                    <Magnetic>
                        <a href="https://wa.me/972547244553?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%90%D7%99%D7%9E%D7%95%D7%9F%20%D7%A0%D7%99%D7%A1%D7%99%D7%95%D7%9F" target="_blank" rel="noreferrer">
                            <Button size="lg" variant="primary" className="!bg-orange-500 !text-white shadow-lg shadow-orange-500/30 hover:!bg-orange-600">
                                {t('hero.cta')}
                            </Button>
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <Link to="/schedule">
                            <Button size="lg" variant="primary" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-black">
                                {t('hero.secondary')}
                            </Button>
                        </Link>
                    </Magnetic>
                </div>

                <a href="tel:+972547244553" className="hero-in inline-flex items-center gap-2 text-lg text-white/70 hover:text-orange-500" style={{ animationDelay: '0.6s' }} aria-label="Phone" dir="ltr">
                    <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                    054-724-4553
                </a>
            </div>
        </section>
    )
}

export default Hero
