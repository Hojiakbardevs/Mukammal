import { strategicGoal, strategicItems } from "@/components/landing/data"
import { Target } from "lucide-react"

export function Goals() {
  return (
    <section id="goals" className="bg-[#f7faff] px-6 py-20 border-t-3 border-primary-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-500">
            Maqsad va vazifalar
          </p>
          <h2 className="mt-3 text-3xl font-heading text-gray-900 md:text-4xl">
            Loyihaning asosiy maqsadi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Strategic goal hero card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#1e2235] p-8 text-white md:col-span-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              Strategik maqsad
            </span>
            <p className="mt-5 max-w-sm text-xl font-bold leading-snug">
              {strategicGoal.description}
            </p>
            <Target
              strokeWidth={0.8}
              className="absolute right-10 top-1/2 h-44 w-44 -translate-y-1/2 text-white/[0.07]"
            />
          </div>

          {/* Item 01 */}
          <NumberedCard item={strategicItems[0]} />

          {/* Items 02 – 04 */}
          {strategicItems.slice(1).map((item) => (
            <NumberedCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

type StrategicItem = {
  number: string
  title: string
  description: string
  accent: string
}

function NumberedCard({ item }: { item: StrategicItem }) {
  return (
    <div
      className={`rounded-3xl border border-gray-100 border-l-4 ${item.accent} bg-white p-6 shadow-sm`}
    >
      <span className="font-mono text-sm text-gray-300">{item.number}</span>
      <h3 className="mt-3 text-base font-bold text-gray-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-500">{item.description}</p>
    </div>
  )
}
