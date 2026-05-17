import { useMemo, useState } from "react"

import {
  Bar,
  Btn,
  Card,
  CardHead,
  Icon,
  Legend,
  LineChart,
  Pill,
  Seg,
  Stat,
} from "@/components/dashboard/LmsPrimitives"
import { COURSES, STUDENTS, SUBMISSIONS, SURVEYS } from "@/data/lmsData"

const MONTHS = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"]

type ChartKey = "enroll" | "finish" | "cert"
type PeriodKey = "3m" | "6m" | "12m"

const COURSE_TONES: Record<string, string> = {
  b1: "bg-indigo-600",
  b2: "bg-sky-600",
  b3: "bg-cyan-600",
  b4: "bg-orange-600",
  b5: "bg-violet-600",
  b6: "bg-pink-600",
  b7: "bg-emerald-600",
  b8: "bg-rose-600",
}

function courseInitials(title: string) {
  const known: Record<string, string> = {
    "Sun'iy intellekt asoslari": "SI",
    "Production muhitida ML": "PM",
    "Tabiiy tilni qayta ishlash": "TT",
    "Computer Vision asoslari": "CV",
    "Data Analytics asoslari": "DA",
    "Deep Learning advanced": "DL",
    "Ta'lim turizmi (pilot)": "TT",
  }

  if (known[title]) return known[title]

  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function CourseBadge({ title, tone }: { title: string; tone: string }) {
  return (
    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-sans text-[10px] font-bold leading-none tracking-normal text-white shadow-sm ring-2 ring-white ${COURSE_TONES[tone] ?? "bg-slate-500"}`}>
      {courseInitials(title)}
    </span>
  )
}

function TeacherBadge({ name, tone }: { name: string; tone: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-sans text-[10px] font-bold leading-none tracking-normal text-white shadow-sm ring-2 ring-white ${COURSE_TONES[tone] ?? "bg-slate-500"}`}>
      {initials}
    </span>
  )
}

const CHARTS: Record<ChartKey, { label: string; color: string; fill: string; data: Record<PeriodKey, number[]> }> = {
  enroll: {
    label: "Yangi ro'yxat",
    color: "#1f6feb",
    fill: "rgba(31,111,235,0.10)",
    data: {
      "3m": [248, 264, 302],
      "6m": [196, 220, 248, 264, 281, 302],
      "12m": [86, 92, 110, 142, 168, 184, 196, 220, 248, 264, 281, 302],
    },
  },
  finish: {
    label: "Tugatgan",
    color: "#16a34a",
    fill: "rgba(22,163,74,0.10)",
    data: {
      "3m": [69, 71, 72],
      "6m": [66, 67, 68, 69, 71, 72],
      "12m": [56, 58, 60, 62, 63, 64, 66, 67, 68, 69, 71, 72],
    },
  },
  cert: {
    label: "Sertifikat",
    color: "#7c3aed",
    fill: "rgba(124,58,237,0.12)",
    data: {
      "3m": [79, 88, 102],
      "6m": [52, 64, 71, 79, 88, 102],
      "12m": [12, 18, 22, 30, 38, 45, 52, 64, 71, 79, 88, 102],
    },
  },
}

const FUNNEL = [
  { label: "Ro'yxatdan o'tdi", value: 2184, color: "#1f6feb" },
  { label: "Birinchi dars boshlandi", value: 2002, color: "#3b82f6" },
  { label: "Modul 1 tugatildi", value: 1714, color: "#60a5fa" },
  { label: "Kursning yarmidan o'tdi", value: 1380, color: "#7c3aed" },
  { label: "Yakuniy assessment", value: 1064, color: "#a78bfa" },
  { label: "Sertifikat olindi", value: 864, color: "#16a34a" },
]

const TEACHER_KPI = [
  { name: "Aziza Tursunova", tone: "b1", load: 84, timely: 92, feedback: 88, support: 91, openTasks: 9, status: "barqaror" },
  { name: "Akmal Hudoyberdiyev", tone: "b4", load: 76, timely: 81, feedback: 79, support: 74, openTasks: 14, status: "kuzatuv" },
  { name: "Lola Saidova", tone: "b8", load: 58, timely: 86, feedback: 82, support: 77, openTasks: 6, status: "barqaror" },
  { name: "Bekzod Karimov", tone: "b5", load: 93, timely: 61, feedback: 64, support: 58, openTasks: 23, status: "ortiqcha yuklama" },
]

const EXTRA_COURSE_COMPLETION = [
  { id: "da", title: "Data Analytics asoslari", teacher: "A. Hudoyberdiyev", studentsActive: 154, studentsTotal: 192, progress: 56, risk: 11, attendance: 81, color: "b5" },
  { id: "dl", title: "Deep Learning advanced", teacher: "A. Tursunova", studentsActive: 64, studentsTotal: 64, progress: 64, risk: 4, attendance: 87, color: "b8" },
]

function riskTone(value: number) {
  if (value >= 5) return "red"
  if (value >= 3) return "amber"
  return "green"
}

function completionTone(value: number) {
  if (value >= 70) return "green"
  if (value >= 50) return "blue"
  return "amber"
}

function kpiTone(value: number) {
  if (value >= 85) return "green"
  if (value >= 70) return "blue"
  if (value >= 55) return "amber"
  return "red"
}

function loadTone(value: number) {
  if (value >= 90) return "red"
  if (value >= 78) return "amber"
  if (value >= 62) return "blue"
  return "green"
}

function completionColor(value: number) {
  if (value >= 70) return "#16a34a"
  if (value >= 50) return "#1f6feb"
  return "#d97706"
}

function heatStyle(value: number) {
  if (value >= 88) return { background: "#15803d", color: "#fff" }
  if (value >= 78) return { background: "#86efac", color: "#14532d" }
  if (value >= 66) return { background: "#fde68a", color: "#78350f" }
  if (value >= 52) return { background: "#fed7aa", color: "#7c2d12" }
  return { background: "#fecaca", color: "#7f1d1d" }
}

export function AdminAnalytics() {
  const [period, setPeriod] = useState<PeriodKey>("12m")

  const activeSurvey = SURVEYS.find((survey) => survey.status === "active")
  const riskStudents = STUDENTS.filter((student) => student.risk >= 55)
  const activeStudents = 2184
  const avgCompletion = CHARTS.finish.data["12m"].at(-1) ?? 72
  const certificatesIssued = 402
  const surveyCompletion = activeSurvey?.completion ?? 82
  const visibleMonths = MONTHS.slice(-CHARTS.enroll.data[period].length)

  const courseCompletion = useMemo(
    () => [
      ...COURSES.map((course) => ({
        id: course.id,
        title: course.title,
        teacher: course.teacher,
        studentsActive: course.studentsActive,
        studentsTotal: course.studentsTotal,
        progress: course.progress,
        risk: Math.max(2, Math.round((course.studentsTotal - course.studentsActive) / 3)),
        attendance: Math.min(94, Math.max(58, course.progress + 18)),
        color: course.color,
      })),
      ...EXTRA_COURSE_COMPLETION,
    ],
    []
  )

  const aiSignalCount = SUBMISSIONS.filter((submission) => submission.state === "ai-flag").length + 11
  const autoReviewed = 624
  const acceptedByTeachers = 581
  const appealCount = 8

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Super Admin tahlil markazi</h1>
          <p>
            Platformadagi kurslar, o'qituvchi yuklamasi, davomat issiqligi va sun'iy intellekt review signallarini bir oynada kuzatish.
          </p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="filter">Filtr</Btn>
          <Btn variant="primary" leftIcon="download">Hisobot</Btn>
        </div>
      </div>

      <div className="stat-grid cols-5" style={{ marginBottom: 18 }}>
        <Stat tone="blue" label="Faol talabalar" value={activeStudents.toLocaleString()} sub="bu hafta" trend={{ dir: "up", label: "+5.2%" }} />
        <Stat tone="green" label="Tugatish darajasi" value={avgCompletion} unit="%" sub="o'rtacha 12 kurs" trend={{ dir: "up", label: "+3%" }} />
        <Stat tone="purple" label="Sertifikat berildi" value={certificatesIssued} sub="oxirgi 30 kun" trend={{ dir: "up", label: "+18" }} />
        <Stat tone="amber" label="Risk ostida" value={186} sub={`${riskStudents.length} ta yuqori signal`} trend={{ dir: "down", label: "-12" }} />
        <Stat tone="red" label="SI review signali" value={aiSignalCount} sub={`haftalik monitoring · feedback ${surveyCompletion}%`} trend={{ dir: "up", label: "+4" }} />
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead
            title="Ro'yxatdan o'tish va tugatish dinamikasi"
            sub={period === "3m" ? "oxirgi 3 oy" : period === "6m" ? "oxirgi 6 oy" : "oxirgi 12 oy"}
            actions={
              <>
                <Seg
                  value={period}
                  onChange={(value) => setPeriod(value as PeriodKey)}
                  options={[
                    { value: "3m", label: "3 oy" },
                    { value: "6m", label: "6 oy" },
                    { value: "12m", label: "12 oy" },
                  ]}
                />
                <Btn size="sm" leftIcon="download" ariaLabel="Grafikni yuklab olish" />
              </>
            }
          />
          <div className="card-pad">
            <div className="analytics-chart-shell">
              <Legend
                items={[
                  { color: CHARTS.enroll.color, label: CHARTS.enroll.label },
                  { color: CHARTS.finish.color, label: CHARTS.finish.label },
                  { color: CHARTS.cert.color, label: CHARTS.cert.label },
                ]}
              />
              <LineChart
                data={CHARTS.enroll.data[period]}
                height={200}
                color={CHARTS.enroll.color}
                fill={CHARTS.enroll.fill}
                ariaLabel="Ro'yxatdan o'tish dinamikasi"
              />
            </div>
            <div className="analytics-months">
              {visibleMonths.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <div className="row-div" />
            <div className="analytics-mini-grid">
              <div>
                <div className="analytics-mini-label">Tugatgan</div>
                <LineChart data={CHARTS.finish.data[period]} height={56} color="#16a34a" fill="rgba(22,163,74,0.10)" grid={false} ariaLabel="Tugatganlar mini grafigi" />
              </div>
              <div>
                <div className="analytics-mini-label">Sertifikat</div>
                <LineChart data={CHARTS.cert.data[period]} height={56} color="#7c3aed" fill="rgba(124,58,237,0.12)" grid={false} ariaLabel="Sertifikatlar mini grafigi" />
              </div>
              <div>
                <div className="analytics-mini-label">Faol davomat</div>
                <LineChart data={period === "3m" ? [84, 87, 89] : period === "6m" ? [83, 86, 88, 84, 87, 89] : [78, 80, 82, 79, 81, 85, 83, 86, 88, 84, 87, 89]} height={56} color="#d97706" fill="rgba(217,119,6,0.12)" grid={false} ariaLabel="Faol davomat mini grafigi" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="O'quv kurslari funnel" sub="barcha aktiv kurslar" />
          <div className="card-pad analytics-funnel">
            {FUNNEL.map((stage, index) => {
              const pct = Math.round((stage.value / FUNNEL[0].value) * 100)
              const next = FUNNEL[index + 1]
              const drop = next ? Math.round(((stage.value - next.value) / stage.value) * 100) : null

              return (
                <div key={stage.label} className="analytics-funnel-row">
                  <div className="analytics-funnel-top">
                    <span>{stage.label}</span>
                    <span className="mono num">
                      {stage.value.toLocaleString()} <em>{pct}%</em>
                    </span>
                  </div>
                  <div className="analytics-funnel-track">
                    <span style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${stage.color}88, ${stage.color})` }} />
                  </div>
                  {drop !== null ? <div className="analytics-drop">-{drop}% drop</div> : null}
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid c-7-5" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="O'quv kurslari dashboardi" sub="progress, davomat, risk" actions={<Btn size="sm" leftIcon="filter">Filtr</Btn>} />
          <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
            <table className="t">
              <thead>
                <tr>
                  <th>Kurs</th>
                  <th>O'qituvchi</th>
                  <th className="center">Faol</th>
                  <th>Tugatish</th>
                  <th>Davomat</th>
                  <th className="center">Risk</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {courseCompletion.map((course) => (
                  <tr key={course.id}>
                    <td className="analytics-course-col">
                      <div className="analytics-course-cell">
                        <CourseBadge title={course.title} tone={course.color} />
                        <div className="analytics-course-copy">
                          <b>{course.title}</b>
                          <div>
                            {course.studentsTotal} ro'yxat · {Math.round((course.studentsActive / course.studentsTotal) * 100)}% aktiv
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="analytics-teacher-col">
                      <span>{course.teacher}</span>
                      <div>haftalik review</div>
                    </td>
                    <td className="center mono num">{course.studentsActive}</td>
                    <td style={{ minWidth: 170 }}>
                      <Bar value={course.progress} tone={completionTone(course.progress)} />
                      <div className="num" style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{course.progress}%</div>
                    </td>
                    <td style={{ minWidth: 120 }}>
                      <Bar value={course.attendance} tone={course.attendance >= 84 ? "green" : course.attendance >= 72 ? "blue" : "amber"} />
                      <div className="num" style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{course.attendance}%</div>
                    </td>
                    <td className="center">
                      <Pill tone={riskTone(course.risk)}>{course.risk}</Pill>
                    </td>
                    <td className="right">
                      <Btn size="xs" leftIcon="arrow-right">Kirish</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="Davomat issiqlik xaritasi" sub="kurs x 12 hafta" />
          <div className="card-pad">
            <div className="analytics-heatmap">
              <div className="analytics-heat-head left">Kurs</div>
              {Array.from({ length: 12 }, (_, week) => (
                <span key={week} className="analytics-heat-head">W{week + 1}</span>
              ))}
              <span className="analytics-heat-head">Avg</span>
              {courseCompletion.map((course, rowIndex) => (
                <div className="analytics-heat-row" key={course.id}>
                  <b title={course.title}>{course.title.split(" ").slice(0, 2).join(" ")}</b>
                  {Array.from({ length: 12 }, (_, week) => {
                    const dip = course.progress < 45 && week > 6 ? 10 : 0
                    const value = Math.max(38, Math.min(96, Math.round(course.attendance + Math.sin((rowIndex + 1) * (week + 1) * 0.72) * 8 - dip)))
                    return (
                      <span
                        key={week}
                        className="analytics-heat-dot"
                        style={heatStyle(value)}
                        title={`${course.title} · W${week + 1} · ${value}%`}
                      />
                    )
                  })}
                  <span className="mono num">{course.attendance}%</span>
                </div>
              ))}
            </div>
            <div className="analytics-legend">
              <span>Past</span>
              {[48, 61, 72, 82, 91].map((value) => <span key={value} className="analytics-legend-cell" style={heatStyle(value)} />)}
              <span>Yuqori</span>
            </div>
            <div className="note" style={{ marginTop: 12 }}>
              <Icon name="alert-triangle" /> Qizil/sariq haftalar kurs kesimida mentor check-in, sabab yozish va reminder amallarini ishga tushiradi.
            </div>
          </div>
        </Card>
      </div>

      <div className="grid c-3" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="O'qituvchi KPI va yuklama" sub="bardoshlilik monitoringi" />
          <div className="card-pad analytics-list">
            {TEACHER_KPI.map((teacher) => {
              const score = Math.round((teacher.timely + teacher.feedback + teacher.support + (100 - Math.max(0, teacher.load - 60))) / 4)

              return (
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-[var(--hairline)] py-2.5 last:border-b-0" key={teacher.name}>
                  <TeacherBadge name={teacher.name} tone={teacher.tone} />
                  <div className="min-w-0">
                    <div className="mb-1 truncate text-[12.5px] font-bold text-[var(--text1)]">{teacher.name}</div>
                    <div className="grid grid-cols-[74px_minmax(0,1fr)_34px] items-center gap-2 text-[11px] font-semibold text-[var(--text3)]">
                      <span>Yuklama</span>
                      <Bar value={teacher.load} tone={loadTone(teacher.load)} />
                      <b className="mono num text-right text-[var(--text2)]">{teacher.load}%</b>
                    </div>
                    <div className="mt-1 grid grid-cols-[74px_minmax(0,1fr)_34px] items-center gap-2 text-[11px] font-semibold text-[var(--text3)]">
                      <span>O'z vaqtida</span>
                      <Bar value={teacher.timely} tone={kpiTone(teacher.timely)} />
                      <b className="mono num text-right text-[var(--text2)]">{teacher.timely}%</b>
                    </div>
                  </div>
                  <div className="grid justify-items-end gap-1">
                    <Pill tone={kpiTone(score)}>{score}</Pill>
                    <span className="whitespace-nowrap text-[10.5px] font-semibold text-[var(--text3)]">{teacher.openTasks} open</span>
                  </div>
                </div>
              )
            })}
            <div className="note">
              <Icon name="info-circle" /> KPI yuklama, vazifani vaqtida tekshirish, feedback sifati va talabaga tushuntirish tezligidan yig'iladi.
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="Kurs completion signallari" />
          <div className="card-pad">
            <div className="analytics-completion-rings">
              {courseCompletion.map((course) => (
                <div className="analytics-completion-ring-card" key={course.id}>
                  <div
                    className="analytics-completion-ring"
                    style={{
                      background: `conic-gradient(${completionColor(course.progress)} ${course.progress}%, var(--bg3) 0)`,
                    }}
                  >
                    <span className="mono num">{course.progress}%</span>
                  </div>
                  <div className="analytics-completion-ring-copy">
                    <b>{course.title}</b>
                    <span>{course.studentsActive} faol · risk {course.risk}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="note" style={{ marginTop: 14 }}>
              <Icon name="info-circle" /> Computer Vision eng past natijada. Kontent reviziyasi va mentor sessiyasi tavsiya qilinadi.
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="Sun'iy intellekt signallari" sub="monitoring" />
          <div className="card-pad">
            <div className="analytics-ai-grid">
              <div>
                <span>AI-yozma signal</span>
                <b className="mono num">{aiSignalCount}</b>
              </div>
              <div>
                <span>Auto-review</span>
                <b className="mono num">{autoReviewed}</b>
              </div>
              <div>
                <span>Trener qabul qildi</span>
                <b className="mono num">{Math.round((acceptedByTeachers / autoReviewed) * 100)}%</b>
              </div>
              <div>
                <span>Appeal</span>
                <b className="mono num">{appealCount}</b>
              </div>
            </div>
            <div className="analytics-ai-flow">
              <div>
                <span>Model ishonchi</span>
                <Bar value={82} tone="blue" />
                <b className="mono num">82%</b>
              </div>
              <div>
                <span>False positive</span>
                <Bar value={18} tone="amber" />
                <b className="mono num">18%</b>
              </div>
              <div>
                <span>Reviewer SLA</span>
                <Bar value={91} tone="green" />
                <b className="mono num">91%</b>
              </div>
            </div>
            <div className="note" style={{ marginTop: 12 }}>
              <Icon name="shield-check" /> SI signallar plagiat, AI-yozma ehtimoli, baholash confidence va appeal jarayonini alohida kuzatadi.
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
