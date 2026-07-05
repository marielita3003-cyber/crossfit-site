import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { CustomCursor } from '../components/ui/CustomCursor'

const MainLayout = ({ children }: React.PropsWithChildren) => {
    const location = useLocation()

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
            <CustomCursor />
            <Header />

            {/* key on pathname re-mounts the page so the transition plays on every route change */}
            <main key={location.pathname} className="page-in flex-1">
                {children}
                <Outlet />
            </main>

            <footer className="border-t border-black/10 dark:border-white/10 p-4 text-center text-sm">
                © 2026 Crossfit
            </footer>
        </div>
    )
}

export default MainLayout
