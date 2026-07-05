
import About from "../sections/About";
import { Marquee } from "../components/ui/Marquee";
// import AppSection from "../sections/AppSection";
import Classes from "../sections/Classes";
import Hero from "../sections/Hero";
import InstagramSection from "../sections/InstagramSection";
// import TeamSection from "../sections/TeamSection"; // מוסתר זמנית עד שיהיו תמונות צוות

export default function HomePage() {
    return (
        <>
            <Hero />
            <Marquee />
            <About />
            <Classes />
            {/* <AppSection /> */}
            {/* <TeamSection /> */}
            <InstagramSection />
        </>
    )
}