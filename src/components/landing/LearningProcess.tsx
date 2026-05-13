import { learningProcess } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export function LearningProcess() {
  return (
    <section id="process" className="relative px-6 py-24">
      <div className="absolute inset-x-0 top-1/2 h-80 -translate-y-1/2 bg-cyan-500/[0.035] blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="O'quv jarayoni"
          title="Moslashuvchan, amaliy va akademik nazoratga ega format"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningProcess.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/45 p-5 backdrop-blur-xl transition hover:border-cyan-300/30"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-cyan-200">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
