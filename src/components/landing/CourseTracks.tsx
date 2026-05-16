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
    imageWidth: 1448,
    imageHeight: 1086,
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
    imageWidth: 1672,
    imageHeight: 941,
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
    imageWidth: 1672,
    imageHeight: 941,
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
    imageWidth: 1672,
    imageHeight: 941,
    accent: "text-[#246BFE]",
    glow: "from-blue-300/18 via-[#246BFE]/10 to-transparent",
  },
]

export function CourseTracks() {
  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-[#f6f9ff] px-4 py-14 text-[#071126] sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-100 to-transparent" />
      <div className="relative mx-auto max-w-[1180px]">
        <h2 className="font-heading text-[clamp(1.75rem,6vw,2.35rem)] leading-tight text-[#071126] lg:text-[clamp(2rem,3vw,2.55rem)]">
          Malaka oshirish yo'nalishlari
        </h2>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-6 xl:mt-14 xl:gap-7">
          {courseTracks.map((track, index) => (
            <article
              key={track.title}
              className="group relative flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/86 shadow-[0_22px_60px_rgba(36,107,254,0.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-[0_30px_80px_rgba(36,107,254,0.18)] sm:rounded-2xl lg:min-h-[420px] xl:min-h-[480px]"
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
                    width={track.imageWidth}
                    height={track.imageHeight}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,38,0.02)_0%,rgba(7,17,38,0.18)_48%,rgba(7,17,38,0.78)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(36,107,254,0.16),transparent_46%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="absolute top-4 right-4 rounded-xl border border-sky-200/20 bg-[#071126]/60 px-3 py-1 text-[11px] font-black tracking-[0.18em] text-sky-100 uppercase backdrop-blur-md sm:top-5 sm:right-5 sm:rounded-2xl">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/55 bg-white/88 text-[#246BFE] shadow-[0_14px_34px_rgba(7,17,38,0.22)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:h-[52px] sm:w-[52px]">
                    <track.icon className="h-5 w-5" strokeWidth={2.35} />
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-5 sm:p-6 xl:p-8">
                  <h3 className="text-xl leading-7 font-semibold text-[#071126] sm:text-2xl sm:leading-8">
                    {track.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 font-medium text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                    {track.description}
                  </p>

                  <Link
                    to={`/courses/${track.slug}`}
                    className={`mt-6 inline-flex w-fit max-w-full items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:gap-4 hover:border-[#246BFE]/20 hover:bg-[#246BFE] hover:text-white sm:rounded-2xl xl:mt-8 ${track.accent}`}
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
