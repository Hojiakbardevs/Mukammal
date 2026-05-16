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
      <div className="xl:snap-start">
        <Hero />
      </div>
      <div className="xl:snap-start">
        <About />
      </div>
      <div className="xl:snap-start">
        <Goals />
      </div>
      <div className="xl:snap-start">
        <CourseTracks />
      </div>
      <div className="xl:snap-start">
        <Timeline />
      </div>
      <div className="xl:snap-start">
        <FAQ />
      </div>
      <div className="xl:snap-start">
        <Footer />
      </div>
    </main>
  )
}
