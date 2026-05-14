import { goals, strategicGoal, strategicItems } from "@/components/landing/data"
import { CheckCircle2, Target } from "lucide-react"

export function Goals() {
  return (
    <section
      id="goals"
      className="relative overflow-hidden bg-[#f6f9ff] px-6 py-20 sm:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(36,107,254,0.13),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(96,78,255,0.12),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-200 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#246BFE] shadow-[0_0_0_6px_rgba(36,107,254,0.12)]" />
            <p className="text-xs font-black tracking-[0.22em] text-[#604eff] uppercase sm:text-sm">
              Maqsad va vazifalar
            </p>
          </div>

          <h2 className="font-heading text-[clamp(2.2rem,5vw,4.3rem)] leading-[1.02] tracking-tight text-slate-950">
            Dastur natijaga ishlaydi, faqat ma'ruza uchun emas
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 font-light text-slate-600 sm:text-lg">
            Dastur professor-o'qituvchilarga sun'iy intellekt vositalarini
            tushunish, amaliyotga tatbiq qilish va ilmiy-ta'lim jarayonida real
            qiymat yaratish uchun zarur bo'lgan kompetensiyalarni beradi.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-2xl bg-[#071126] p-7 text-white shadow-[0_30px_90px_rgba(7,17,38,0.24)] sm:p-9">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(36,107,254,0.38),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(96,78,255,0.32),transparent_34%)]" />
            <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full border border-white/5" />

            <Target
              strokeWidth={0.85}
              className="absolute right-7 bottom-7 h-36 w-36 text-white/6 sm:h-52 sm:w-52"
            />

            <div className="relative flex min-h-105 flex-col justify-between">
              <div>
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#8dbbff] ring-1 ring-white/15 backdrop-blur">
                  <Target className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <p className="font-heading text-xs tracking-[0.24em] text-[#8dbbff] uppercase">
                  Strategik maqsad
                </p>

                <h3 className="mt-5 max-w-xl text-2xl leading-9 font-semibold sm:text-3xl sm:leading-10">
                  {strategicGoal.description}
                </h3>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <MiniMetric value="20" label="soat nazariya" />
                <MiniMetric value="20" label="soat amaliyot" />
                <MiniMetric value="22" label="soat mustaqil ish" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-xs font-black tracking-[0.22em] text-[#246BFE] uppercase">
                Asosiy yo'nalishlar
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Vazifalar xaritasi
              </h3>
            </div>

            <div className="relative space-y-4">
              <div className="absolute top-4 bottom-4 left-5 w-px bg-linear-to-b from-blue-200 via-blue-100 to-transparent" />

              {strategicItems.map((item, index) => (
                <RoadmapItem key={item.number} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {goals.map((goal, index) => (
            <article
              key={goal.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/82 p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_55px_rgba(36,107,254,0.13)]"
            >
              <div className="absolute inset-x-6 top-0 h-px scale-x-0 bg-linear-to-r from-[#246BFE] via-[#604eff] to-transparent transition duration-300 group-hover:scale-x-100" />

              <div className="mb-6 flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#246BFE] transition duration-300 group-hover:bg-[#246BFE] group-hover:text-white">
                  <goal.icon className="h-5 w-5" strokeWidth={2.2} />
                </div>

                <span className="font-heading text-4xl font-semibold text-slate-950/10">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-lg leading-7 font-semibold text-slate-950">
                {goal.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {goal.description}
              </p>
            </article>
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

function RoadmapItem({ item }: { item: StrategicItem; index: number }) {
  return (
    <article className="group relative pl-14">
      <div className="absolute top-1 left-0 z-10 flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[#246BFE] shadow-sm transition duration-300 group-hover:scale-105 group-hover:border-[#f0c84b]/40 group-hover:text-[#9a7700]">
        <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/86 p-5 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#f0c84b]/40 group-hover:shadow-[0_16px_42px_rgba(36,107,254,0.1)]">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-slate-950 transition duration-300 group-hover:text-[#9a7700]">
            {item.title}
          </h3>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-[#246BFE] transition duration-300 group-hover:bg-[#f0c84b]/16 group-hover:text-[#9a7700]">
            {item.number}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{item.description}</p>
      </div>
    </article>
  )
}

function MiniMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
      <p className="font-heading text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{label}</p>
    </div>
  )
}
