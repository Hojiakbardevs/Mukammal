import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  BookOpen,
  Clock,
  FlaskConical,
  Brain,
} from "lucide-react"
import { courseDetails } from "@/components/landing/courseDetails"
import { NeuralGrid } from "@/components/landing/NeuralGrid"
import Logos from "@/assets/airi_uz.png"

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const course = courseDetails.find((c) => c.slug === slug)

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f9ff]">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">Kurs topilmadi</p>
          <Link
            to="/"
            className="mt-4 inline-block text-indigo-600 hover:underline"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    )
  }

  const total =
    course.totalHours.lecture +
    course.totalHours.practical +
    course.totalHours.independent

  return (
    <div className="min-h-screen bg-[#f6f9ff]">
      {/* Top nav bar */}
      <div className="sticky top-0 z-50 border-b border-blue-100/60 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/#courses"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#071126]/60 transition hover:bg-blue-50 hover:text-[#246BFE]"
            >
              <ArrowLeft className="h-4 w-4" />
              Orqaga
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <img
              src={Logos}
              alt="AirI"
              width={2779}
              height={472}
              loading="eager"
              decoding="async"
              sizes="282px"
              fetchPriority="high"
              className="h-12 w-auto"
            />
          </div>
          <Link
            to="/login"
            className="inline-flex h-11 items-center rounded-2xl px-6 font-heading text-[11px] font-bold tracking-widest text-white uppercase transition hover:opacity-90 active:scale-95"
            style={{ background: course.accent }}
          >
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
      
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-blue-100/50 bg-[#f6f9ff]">
        {/* Grid pattern - matches CourseTracks */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(36,107,254,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(36,107,254,0.04)_1px,transparent_1px)] bg-size-[56px_56px]" />
        {/* Neural animation */}
        <div className="absolute inset-0 opacity-60">
          <NeuralGrid />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:py-16">
          <figure
            className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border bg-white shadow-[0_28px_80px_rgba(36,107,254,0.18)] sm:aspect-[16/8.5] lg:aspect-[21/9]"
            style={{ borderColor: `${course.accent}30` }}
          >
            <img
              src={course.image}
              alt={`${course.title} kursi`}
              width={course.imageWidth}
              height={course.imageHeight}
              loading="eager"
              decoding="async"
              sizes="(min-width: 1024px) 600px, calc(100vw - 48px)"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 58%, ${course.accent}1f 100%)`,
              }}
            />
          </figure>

          <div className="mt-10 max-w-4xl sm:mt-12">
            <h1 className="font-heading max-w-3xl text-[clamp(2rem,3.5vw,2.8rem)] leading-tight text-[#071126]">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 font-medium text-slate-500">
              {course.subtitle}
            </p>

            {/* Hours summary */}
            <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${course.accent}18` }}
                >
                  <BookOpen
                    className="h-5 w-5"
                    style={{ color: course.accent }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                    Ma'ruza
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {course.totalHours.lecture} soat
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${course.accent}18` }}
                >
                  <FlaskConical
                    className="h-5 w-5"
                    style={{ color: course.accent }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                    Amaliyot
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {course.totalHours.practical} soat
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${course.accent}18` }}
                >
                  <Brain
                    className="h-5 w-5"
                    style={{ color: course.accent }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                    Mustaqil ish
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {course.totalHours.independent} soat
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-sm"
                style={{
                  borderColor: `${course.accent}40`,
                  background: `${course.accent}0d`,
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${course.accent}25` }}
                >
                  <Clock className="h-5 w-5" style={{ color: course.accent }} />
                </div>
                <div>
                  <p
                    className="text-xs font-medium tracking-wide uppercase"
                    style={{ color: course.accent }}
                  >
                    Jami
                  </p>
                  <p
                    className="text-xl font-bold"
                    style={{ color: course.accent }}
                  >
                    {total} soat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 relative">
        {/* Modules table (courses 1, 2, 3) */}
        {course.modules && (
          <section>
            <SectionTitle accent={course.accent} label="Kurs mavzuli tarkibi" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ background: `${course.accent}10` }}>
                      <th className="w-12 border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        T.r.
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Modul / Mavzular
                      </th>
                      <th className="w-24 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Ma'ruza
                      </th>
                      <th className="w-24 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Amaliyot
                      </th>
                      <th className="w-24 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Mustaqil
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.modules.map((row, i) => (
                      <tr
                        key={row.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                      >
                        <td className="border-b border-gray-100 px-4 py-4 text-center text-[15px] font-semibold text-[#071126]/30">
                          {row.id}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-[15px] leading-relaxed text-[#071126]/80">
                          {row.topic}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          {row.lecture === 0 ? (
                            <span className="text-gray-300">—</span>
                          ) : (
                            <HourBadge
                              value={row.lecture}
                              color={course.accent}
                            />
                          )}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          {row.practical === 0 ? (
                            <span className="text-gray-300">—</span>
                          ) : (
                            <HourBadge
                              value={row.practical}
                              color={course.accent}
                            />
                          )}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          <HourBadge value={row.independent} color="#64748b" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <TotalRow
                      accent={course.accent}
                      lecture={course.totalHours.lecture}
                      practical={course.totalHours.practical}
                      independent={course.totalHours.independent}
                    />
                  </tfoot>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* NLP: Lecture topics */}
        {course.lectureTopics && (
          <section>
            <SectionTitle accent={course.accent} label="Ma'ruza mavzulari" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ background: `${course.accent}10` }}>
                      <th className="w-12 border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        T.r.
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Ma'ruza mavzusi
                      </th>
                      <th className="w-28 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Ma'ruza, soat
                      </th>
                      <th className="w-28 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Mustaqil, soat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.lectureTopics.map((row, i) => (
                      <tr
                        key={row.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                      >
                        <td className="border-b border-gray-100 px-4 py-4 text-center text-[15px] font-semibold text-[#071126]/30">
                          {row.id}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-[15px] leading-relaxed text-[#071126]/80">
                          {row.topic}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          <HourBadge
                            value={row.contactHours}
                            color={course.accent}
                          />
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          <HourBadge value={row.independent} color="#64748b" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: `${course.accent}08` }}>
                      <td
                        colSpan={2}
                        className="px-4 py-3.5 text-right text-sm font-bold text-gray-700"
                      >
                        Jami
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <HourBadge
                          value={course.totalHours.lecture}
                          color={course.accent}
                          bold
                        />
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <HourBadge value={32} color="#64748b" bold />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* NLP: Practical topics */}
        {course.practicalTopics && (
          <section>
            <SectionTitle
              accent={course.accent}
              label="Amaliyot mashg'ulotlari mavzulari"
            />
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ background: `${course.accent}10` }}>
                      <th className="w-12 border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        T.r.
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Amaliyot mavzusi
                      </th>
                      <th className="w-28 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Amaliyot, soat
                      </th>
                      <th className="w-28 border-b border-gray-200 px-4 py-3.5 text-center text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Mustaqil, soat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.practicalTopics.map((row, i) => (
                      <tr
                        key={row.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                      >
                        <td className="border-b border-gray-100 px-4 py-4 text-center text-[15px] font-semibold text-[#071126]/30">
                          {row.id}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-[15px] leading-relaxed text-[#071126]/80">
                          {row.topic}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          <HourBadge
                            value={row.contactHours}
                            color={course.accent}
                          />
                        </td>
                        <td className="border-b border-gray-100 px-4 py-4 text-center">
                          <HourBadge value={row.independent} color="#64748b" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: `${course.accent}08` }}>
                      <td
                        colSpan={2}
                        className="px-4 py-3.5 text-right text-sm font-bold text-gray-700"
                      >
                        Jami
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <HourBadge
                          value={course.totalHours.practical}
                          color={course.accent}
                          bold
                        />
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <HourBadge value={60} color="#64748b" bold />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* AI Tools */}
        {course.tools && (
          <section>
            <SectionTitle
              accent={course.accent}
              label="Mashg'ulotlarda foydalaniladigan SI vositalari"
            />
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr style={{ background: `${course.accent}10` }}>
                      <th className="w-12 border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        T.r.
                      </th>
                      <th className="w-44 border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        SI vositasi
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3.5 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Qo'llanish yo'nalishi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.tools.map((tool, i) => (
                      <tr
                        key={tool.id}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                      >
                        <td className="border-b border-gray-100 px-4 py-3.5 text-center text-[15px] font-semibold text-[#071126]/30">
                          {tool.id}
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3.5">
                          <span
                            className="inline-block rounded-lg px-3 py-1 text-[13px] font-bold"
                            style={{
                              background: `${course.accent}15`,
                              color: course.accent,
                            }}
                          >
                            {tool.name}
                          </span>
                        </td>
                        <td className="border-b border-gray-100 px-4 py-3.5 text-[15px] leading-relaxed text-[#071126]/70">
                          {tool.usage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Outcomes */}
        {course.outcomes && (
          <section>
            <SectionTitle
              accent={course.accent}
              label="Kurs yakunida egallash kerak bo'lgan bilim va ko'nikmalar"
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: course.accent }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Assessments */}
        {course.assessments && (
          <section>
            <SectionTitle
              accent={course.accent}
              label="Tinglovchilarni baholash shakllari"
            />
            <div className="mt-6 space-y-3">
              {course.assessments.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white"
                    style={{ background: course.accent }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600">{a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          className="relative overflow-hidden rounded-3xl p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${course.accent}15, ${course.accent}05)`,
            border: `1px solid ${course.accent}25`,
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px),linear-gradient(to right,rgba(0,0,0,0.15) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative">
            <h2 className="font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] text-[#071126]">
              Ushbu yo'nalishda o'qishni boshlashga tayyormisiz?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Ariza qoldiring va bizning mutaxassislar siz uchun mos yo'nalishni
              tavsiya qiladi.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex h-12 items-center rounded-xl px-8 text-sm font-bold text-white shadow-md transition hover:opacity-90 hover:shadow-lg active:scale-95"
                style={{ background: course.accent }}
              >
                Ro'yxatdan o'tish
              </Link>
              <Link
                to="/#courses"
                className="inline-flex h-12 items-center rounded-xl border border-gray-300 bg-white px-8 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 active:scale-95"
              >
                Boshqa yo'nalishlar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionTitle({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-7 w-1 rounded-full" style={{ background: accent }} />
      <h2 className="font-heading text-[1.45rem] text-[#071126]">{label}</h2>
    </div>
  )
}

function HourBadge({
  value,
  color,
  bold,
}: {
  value: number
  color: string
  bold?: boolean
}) {
  return (
    <span
      className={`inline-block rounded-lg px-2.5 py-0.5 text-sm ${bold ? "font-bold" : "font-semibold"}`}
      style={{ background: `${color}15`, color }}
    >
      {value}
    </span>
  )
}

function TotalRow({
  accent,
  lecture,
  practical,
  independent,
}: {
  accent: string
  lecture: number
  practical: number
  independent: number
}) {
  return (
    <tr style={{ background: `${accent}08` }}>
      <td />
      <td className="px-4 py-3.5 text-right text-sm font-bold text-gray-700">
        Jami
      </td>
      <td className="px-4 py-3.5 text-center">
        <HourBadge value={lecture} color={accent} bold />
      </td>
      <td className="px-4 py-3.5 text-center">
        <HourBadge value={practical} color={accent} bold />
      </td>
      <td className="px-4 py-3.5 text-center">
        <HourBadge value={independent} color="#64748b" bold />
      </td>
    </tr>
  )
}
