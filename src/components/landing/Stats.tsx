import { stats } from "@/components/landing/data"

export function Stats() {
  return (
    <section id="stats" className="px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="font-heading text-4xl font-bold text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-400">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
