import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Accessibility } from 'lucide-react'
import Header from '../components/Header'
import { CustomCursor } from '../components/ui/CustomCursor'
import { FloatingWhatsApp } from '../components/ui/FloatingWhatsApp'

const MainLayout = ({ children }: React.PropsWithChildren) => {
    const location = useLocation()
    const { t } = useTranslation()

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
            <CustomCursor />
            <FloatingWhatsApp />
            <Header />

            {/* key on pathname re-mounts the page so the transition plays on every route change */}
            <main key={location.pathname} className="page-in flex-1">
                {children}
                <Outlet />
            </main>

            <footer className="border-t border-black/10 bg-black px-4 py-12 text-white dark:border-white/10">
                <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
                    {/* Address */}
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50">
                            <MapPin className="h-4 w-4 text-orange-500" aria-hidden="true" />
                            {t('footer.visitUs')}
                        </h3>
                        <p className="text-xl font-black italic tracking-tight sm:text-2xl">
                            {t('footer.address')}
                        </p>
                        <a
                            href="https://maps.google.com/?q=יוסף+ספיר+8+ראשון+לציון"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm text-orange-500 underline-offset-4 hover:underline"
                        >
                            {t('footer.navigate')}
                        </a>
                        <iframe
                            title="CrossFit Impulso Map"
                            src="https://maps.google.com/maps?q=31.9931068,34.7517585&z=16&output=embed"
                            className="mt-4 h-40 w-full rounded-2xl border-0 grayscale transition hover:grayscale-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50">
                            <Phone className="h-4 w-4 text-orange-500" aria-hidden="true" />
                            {t('footer.contact')}
                        </h3>
                        <a href="tel:+972547244553" className="block text-xl font-bold hover:text-orange-500" dir="ltr">
                            054-724-4553
                        </a>
                        <a
                            href="https://wa.me/972547244553?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%90%D7%99%D7%9E%D7%95%D7%9F%20%D7%A0%D7%99%D7%A1%D7%99%D7%95%D7%9F"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm text-orange-500 underline-offset-4 hover:underline"
                        >
                            WhatsApp
                        </a>
                    </div>

                    {/* Accessibility */}
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50">
                            <Accessibility className="h-4 w-4 text-orange-500" aria-hidden="true" />
                            {t('footer.accessibilityTitle')}
                        </h3>
                        <p className="text-sm leading-6 text-white/70">
                            {t('footer.accessibility')}
                        </p>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-4 text-center text-sm text-white/40">
                    © 2026 CrossFit Impulso
                </div>
            </footer>
        </div>
    )
}

export default MainLayout
