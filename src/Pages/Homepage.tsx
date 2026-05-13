import { About } from "@/components/landing/About"
import { CourseTracks } from "@/components/landing/CourseTracks"
import { FAQ } from "@/components/landing/FAQ"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/Footer"
import Hero from "@/components/landing/Hero"
import { LearningProcess } from "@/components/landing/LearningProcess"
import { Goals } from "@/components/landing/Goals"
import { Outcomes } from "@/components/landing/Outcomes"
import { RegistrationSection } from "@/components/landing/RegistrationSection"
import { Stats } from "@/components/landing/Stats"
import { Timeline } from "@/components/landing/Timeline"

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#070b17] text-white">
      <Hero />
      <About />
      <Goals />
      <CourseTracks />
      <Timeline />
      <LearningProcess />
      <Outcomes />
      <Stats />
      <RegistrationSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
