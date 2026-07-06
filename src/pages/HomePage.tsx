
import About from "../sections/About";
import { Marquee } from "../components/ui/Marquee";
import { Stats } from "../components/ui/Stats";
// import AppSection from "../sections/AppSection";
import Classes from "../sections/Classes";
import Hero from "../sections/Hero";
import HowItWorks from "../sections/HowItWorks";
import Gallery from "../sections/Gallery";
import Testimonials from "../sections/Testimonials";
import FAQ from "../sections/FAQ";
import InstagramSection from "../sections/InstagramSection";
// import TeamSection from "../sections/TeamSection"; // מוסתר זמנית עד שיהיו תמונות צוות

export default function HomePage() {
    return (
        <>
            <Hero />
            <Marquee />
            <About />
            <Stats />
            <Classes />
            <HowItWorks />
            <Gallery />
            <Testimonials />
            <FAQ />
            {/* <AppSection /> */}
            {/* <TeamSection /> */}
            <InstagramSection />
        </>
    )
}
