import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, Database, Eye, Languages } from "lucide-react"

import AiBasicsImage from "@/assets/Suniy intellekt qo'llash.png"
import MlDataImage from "@/assets/SuniyIntelektMashinaviy.png"
import ComputerVisionImage from "@/assets/ComputerVision.png"
import NlpImage from "@/assets/NLP.png"

const courseTracks = [
  {
    icon: BarChart3,
    slug: "ai-basics",
    iconLabel: "analytics",
    title: "Sun'iy intellekt qo'llash asoslari",
    description:
      "Sun'iy intellekt tushunchalari va uning ta'limdagi o'rni haqida fundamental bilimlar.",
    image: AiBasicsImage,
    accent: "text-[#246BFE]",
    glow: "from-[#246BFE]/18 via-sky-300/10 to-transparent",
  },
  {
    icon: Database,
    slug: "ml-data",
    iconLabel: "database",
    title: "ML & Data Analysis",
    description:
      "Mashinaviy o'rganish algoritmlari va katta hajmdagi ma'lumotlar bilan ishlash.",
    image: MlDataImage,
    accent: "text-[#246BFE]",
    glow: "from-sky-300/18 via-[#246BFE]/10 to-transparent",
  },
  {
    icon: Eye,
    slug: "computer-vision",
    iconLabel: "visibility",
    title: "Computer Vision",
    description:
      "Tasvirlarga ishlov berish va kompyuterli ko'rishning amaliy tadbiqi.",
    image: ComputerVisionImage,
    accent: "text-[#246BFE]",
    glow: "from-[#246BFE]/18 via-blue-300/10 to-transparent",
  },
  {
    icon: Languages,
    slug: "nlp",
    iconLabel: "translate",
    title: "NLP Texnologiyalari",
    description:
      "Tabiiy tilni qayta ishlash va matnli ma'lumotlar bilan ishlash modellari.",
    image: NlpImage,
    accent: "text-[#246BFE]",
    glow: "from-blue-300/18 via-[#246BFE]/10 to-transparent",
  },
]

export function CourseTracks() {
  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-[#f6f9ff] px-6 py-20 text-[#071126] sm:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-100 to-transparent" />
      <div className="relative mx-auto max-w-[1180px]">
        <h2 className="font-heading text-[clamp(2rem,3vw,2.55rem)] leading-tight text-[#071126]">
          Malaka oshirish yo'nalishlari
        </h2>

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {courseTracks.map((track, index) => (
            <article
              key={track.title}
              className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/86 shadow-[0_22px_60px_rgba(36,107,254,0.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-[0_30px_80px_rgba(36,107,254,0.18)]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${track.glow} opacity-0 transition duration-500 group-hover:opacity-100`}
              />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px scale-x-0 bg-linear-to-r from-[#246BFE] via-sky-300 to-transparent transition duration-500 group-hover:scale-x-100" />
              <div className="sr-only">{track.iconLabel}</div>

              <div className="relative flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,38,0.02)_0%,rgba(7,17,38,0.18)_48%,rgba(7,17,38,0.78)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(36,107,254,0.16),transparent_46%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="absolute top-5 right-5 rounded-2xl border border-sky-200/20 bg-[#071126]/60 px-3 py-1 text-[11px] font-black tracking-[0.18em] text-sky-100 uppercase backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="absolute bottom-5 left-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-white/55 bg-white/88 text-[#246BFE] shadow-[0_14px_34px_rgba(7,17,38,0.22)] backdrop-blur-md">
                    <track.icon className="h-5 w-5" strokeWidth={2.35} />
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="text-2xl leading-8 font-semibold text-[#071126]">
                    {track.title}
                  </h3>

                  <p className="mt-4 flex-1 text-base leading-7 font-medium text-slate-600">
                    {track.description}
                  </p>

                  <Link
                    to={`/courses/${track.slug}`}
                    className={`mt-8 inline-flex w-fit items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:gap-4 hover:border-[#246BFE]/20 hover:bg-[#246BFE] hover:text-white ${track.accent}`}
                  >
                    <span>Batafsil ma'lumot</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
