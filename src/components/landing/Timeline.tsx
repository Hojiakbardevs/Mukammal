import { timeline } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export function Timeline() {
  return (
    <section id="timeline" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="3 bosqichli timeline"
          title="Tayyorgarlikdan sertifikatgacha aniq yo'l xaritasi"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {timeline.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 px-4 py-2 text-sm font-bold text-slate-950">
                  {step.duration}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  Bosqich {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {step.description}
              </p>
              {index < timeline.length - 1 ? (
                <div className="absolute top-12 -right-3 hidden h-px w-6 bg-cyan-300/30 lg:block" />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
