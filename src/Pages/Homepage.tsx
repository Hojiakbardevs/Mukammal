import { About } from "@/components/landing/About"
import { CourseTracks } from "@/components/landing/CourseTracks"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/Footer"
import Hero from "@/components/landing/Hero"
import { Goals } from "@/components/landing/Goals"
import { Timeline } from "@/components/landing/Timeline"

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#070b17] text-white">
      <Hero />
      <About />
      <Goals />
      <CourseTracks />
      <Timeline />
      <FAQ />
      <Footer />
    </main>
  )
}
