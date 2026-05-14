import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, Database, Eye, Languages } from "lucide-react"

const courseTracks = [
  {
    icon: BarChart3,
    slug: "ai-basics",
    iconLabel: "analytics",
    title: "AI qo'llash asoslari",
    description:
      "Sun'iy intellekt tushunchalari va uning ta'limdagi o'rni haqida fundamental bilimlar.",
    accent: "text-[#8dbbff]",
    iconBg: "bg-[#172a4f]",
  },
  {
    icon: Database,
    slug: "ml-data",
    iconLabel: "database",
    title: "ML & Data Analysis",
    description:
      "Mashinaviy o'rganish algoritmlari va katta hajmdagi ma'lumotlar bilan ishlash.",
    accent: "text-[#8dbbff]",
    iconBg: "bg-[#2d2c24]",
  },
  {
    icon: Eye,
    slug: "computer-vision",
    iconLabel: "visibility",
    title: "Computer Vision",
    description:
      "Tasvirlarga ishlov berish va kompyuterli ko'rishning amaliy tadbiqi.",
    accent: "text-[#8dbbff]",
    iconBg: "bg-[#172a4f]",
  },
  {
    icon: Languages,
    slug: "nlp",
    iconLabel: "translate",
    title: "NLP Texnologiyalari",
    description:
      "Tabiiy tilni qayta ishlash va matnli ma'lumotlar bilan ishlash modellari.",
    accent: "text-[#8dbbff]",
    iconBg: "bg-[#172a4f]",
  },
]

export function CourseTracks() {
  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-[#071126] px-6 py-20 text-white sm:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.18),transparent_44%),linear-gradient(180deg,rgba(7,17,38,0.12),rgba(7,17,38,0.88))]" />

      <div className="relative mx-auto max-w-[1414px]">
        <h2 className="font-heading text-[clamp(2rem,3vw,2.55rem)] leading-tight text-white">
          Malaka oshirish yo'nalishlari
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {courseTracks.map((track) => (
            <article
              key={track.title}
              className="group relative flex min-h-[305px] flex-col overflow-hidden rounded-[22px] border border-blue-200/10 bg-[#0f1b33]/86 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200/22 hover:bg-[#13213d]/94"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(96,165,250,0.12),transparent_48%)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="sr-only">{track.iconLabel}</div>

              <div className="relative flex h-full flex-col">
                <div
                  className={`mb-7 flex h-12 w-12 items-center justify-center rounded-xl ${track.iconBg} text-[#ded9e9]`}
                >
                  <track.icon className="h-5 w-5" strokeWidth={2.35} />
                </div>

                <h3 className="text-xl leading-7 font-semibold text-[#f2edf8]">
                  {track.title}
                </h3>

                <p className="mt-4 flex-1 text-base leading-7 font-medium text-[#c4bdcc]">
                  {track.description}
                </p>

                <Link
                  to={`/courses/${track.slug}`}
                  className={`mt-8 inline-flex items-center gap-3 text-xs font-medium tracking-wider uppercase transition-all duration-200 hover:gap-4 hover:text-[#f0c84b] ${track.accent}`}
                >
                  <span>Batafsil ma'lumot</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
