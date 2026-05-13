import { goals } from "@/components/landing/data"
import { SectionHeader } from "@/components/landing/SectionHeader"

export function Goals() {
  return (
    <section id="goals" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Maqsad va vazifalar"
          title="Ta'lim, tadqiqot va raqamli transformatsiyani bog'laydigan dastur"
          description="Loyiha professor-o'qituvchilarga AI imkoniyatlarini o'z fanlari, laboratoriyalari va ilmiy loyihalarida amaliy qo'llashga yordam beradi."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {goals.map((item) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.065]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/16 to-violet-400/16 text-cyan-200">
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
