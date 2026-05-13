import { courseTracks } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export function CourseTracks() {
  return (
    <section id="courses" className="relative px-6 py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.05),transparent)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="4 ta kurs yo'nalishi"
          title="AI kompetensiyani bosqichma-bosqich chuqurlashtirish"
          description="Yo'nalishlar boshlang'ich AI qo'llashdan tortib kompyuterli ko'rish va tabiiy tilni qayta ishlashgacha bo'lgan amaliy modullarni qamrab oladi."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {courseTracks.map((track, index) => (
            <article
              key={track.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl transition duration-300 hover:border-violet-300/35"
            >
              <div className="absolute top-5 right-5 text-6xl font-black text-white/[0.035]">
                0{index + 1}
              </div>
              <div className="relative">
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <track.icon className="h-6 w-6" />
                </div>
                <h3 className="max-w-xl text-xl font-bold text-white">
                  {track.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  {track.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
