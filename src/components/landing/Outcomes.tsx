import { outcomes } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export function Outcomes() {
  return (
    <section id="outcomes" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Natijalar va sertifikat"
          title="Kurs yakunida o'lchanadigan natija va amaliy mahsulot"
          description="Tinglovchilar bilim va ko'nikmalarini baholash orqali yakuniy natijalar aniqlanadi, sertifikat va tahliliy hisobot shakllantiriladi."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {outcomes.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-linear-to-br from-white/6.5 to-white/2.5 p-6 backdrop-blur-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/12 text-violet-200">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
