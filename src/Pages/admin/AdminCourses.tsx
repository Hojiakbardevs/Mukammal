import { useState } from "react"
import {
  Bar,
  Btn,
  Card,
  Chip,
  Icon,
  Pill,
  Stat,
  Tabs,
  Toolbar,
  type PillTone,
} from "@/components/dashboard/LmsPrimitives"
import { COURSES, LEARNING_STREAMS } from "@/data/lmsData"

type CatalogStatus = "published" | "draft" | "scheduled" | "archived"
type CatalogFormat = "Online" | "Offline"

type CatalogCourse = {
  id: string
  title: string
  status: CatalogStatus
  format: CatalogFormat
  owner: string
  groups: number
  studentsTotal: number
  progress: number
  color: string
}

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

function statusTone(status: string): PillTone {
  if (status === "published") return "green"
  if (status === "draft") return "amber"
  if (status === "scheduled") return "blue"
  if (status === "paused") return "red"
  return "gray"
}

function statusLabel(status: string) {
  if (status === "published") return "Published"
  if (status === "draft") return "Draft"
  if (status === "scheduled") return "Scheduled"
  if (status === "paused") return "Paused"
  return "Archived"
}

function formatLabel(format: string) {
  if (format === "mustaqil") return "Online"
  return "Offline"
}

function formatTone(format: CatalogFormat): PillTone {
  return format === "Online" ? "teal" : "blue"
}

const WEEK_DAYS = [
  { label: "Dushanba", date: 12 },
  { label: "Seshanba", date: 13 },
  { label: "Chorshanba", date: 14 },
  { label: "Payshanba", date: 15, today: true },
  { label: "Juma", date: 16 },
  { label: "Shanba", date: 17 },
]
const CALENDAR_SLOTS = [
  { start: "08:30", end: "10:00" },
  { start: "10:15", end: "11:45" },
  { start: "12:30", end: "14:00" },
  { start: "14:15", end: "15:45" },
  { start: "16:00", end: "17:30" },
]

const CALENDAR_EVENTS = [
  { day: 0, slot: 0, kind: "lecture", title: "Sun'iy intellekt asoslari", group: "AI-26-1B", room: "B-204" },
  { day: 2, slot: 0, kind: "lecture", title: "Sun'iy intellekt asoslari", group: "AI-26-1A", room: "B-204" },
  { day: 1, slot: 1, kind: "lab", title: "Production muhitida ML", group: "ML-26-2A", room: "A-101" },
  { day: 3, slot: 1, kind: "lecture", title: "Tabiiy tilni qayta ishlash", group: "NLP-26", room: "B-302" },
  { day: 0, slot: 2, kind: "live", title: "Tabiiy tilni qayta ishlash", group: "NLP-26", room: "Online" },
  { day: 4, slot: 2, kind: "exam", title: "Production muhitida ML", group: "ML-26-2A", room: "A-101" },
  { day: 2, slot: 3, kind: "office", title: "Office Hours", group: "All", room: "Online" },
]

const EXTRA_CATALOG_COURSES: CatalogCourse[] = [
  { id: "da", title: "Data Analytics asoslari", status: "published", format: "Offline", owner: "A. Hudoyberdiyev", groups: 3, studentsTotal: 192, progress: 56, color: "b5" },
  { id: "dl", title: "Deep Learning advanced", status: "scheduled", format: "Offline", owner: "A. Tursunova", groups: 1, studentsTotal: 64, progress: 0, color: "b8" },
  { id: "et1", title: "Ta'lim turizmi (pilot)", status: "archived", format: "Online", owner: "L. Saidova", groups: 0, studentsTotal: 12, progress: 32, color: "b3" },
]

function groupCount(courseTitle: string) {
  return LEARNING_STREAMS.filter((group) => group.course === courseTitle).length
}

function catalogCourses(): CatalogCourse[] {
  return [
    ...COURSES.map((course) => ({
      id: course.id,
      title: course.title,
      status: course.status === "paused" ? ("archived" as CatalogStatus) : (course.status as CatalogStatus),
      format: formatLabel(course.format) as CatalogFormat,
      owner: course.teacher.replace("Aziza", "A.").replace("Akmal", "A.").replace("Lola", "L."),
      groups: groupCount(course.title),
      studentsTotal: course.studentsTotal,
      progress: course.progress,
      color: course.color,
    })),
    ...EXTRA_CATALOG_COURSES,
  ]
}

const STATUS_FILTERS = ["Hammasi", "Published", "Draft", "Scheduled", "Archived"]
const FORMAT_FILTERS: Array<"Hammasi" | CatalogFormat> = ["Hammasi", "Online", "Offline"]

function calendarKindLabel(kind: string) {
  if (kind === "lecture") return "Lecture"
  if (kind === "lab") return "Lab"
  if (kind === "live") return "Live"
  if (kind === "exam") return "Exam"
  return "Office hrs"
}

export function AdminCourses() {
  const [tab, setTab] = useState("catalog")
  const [formatFilter, setFormatFilter] = useState("Hammasi")
  const [statusFilter, setStatusFilter] = useState("Hammasi")
  const courses = catalogCourses()

  const published = courses.filter((c) => c.status === "published").length
  const draft = courses.filter((c) => c.status === "draft").length
  const totalStudents = courses.reduce((s, c) => s + c.studentsTotal, 0)

  const filtered = courses.filter((course) => {
    const matchFormat =
      formatFilter === "Hammasi" ||
      course.format === formatFilter
    const matchStatus =
      statusFilter === "Hammasi" ||
      statusLabel(course.status) === statusFilter
    return matchFormat && matchStatus
  })

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Kurslar va o'quv guruhlari</h1>
          <p>Kurs katalogi, aktiv o'quv guruhlari va akademik jadvalni boshqarish.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="upload">Import (cmi5)</Btn>
          <Btn variant="primary" leftIcon="plus">Yangi kurs</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue"   label="Jami kurslar"     value={courses.length}        sub="Platformada" />
        <Stat tone="green"  label="E'lon qilingan"   value={published}             sub="Faol ta'limda" />
        <Stat tone="amber"  label="Qoralama"          value={draft}                 sub="Tekshiruvda" />
        <Stat tone="purple" label="Jami tinglovchi"  value={totalStudents}          sub="Ro'yxatdan o'tgan" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "catalog", label: "Kurs katalogi",  icon: "book-2",      count: courses.length },
          { value: "groups", label: "Aktiv o'quv guruhlari",  icon: "users-group", count: LEARNING_STREAMS.length },
          { value: "schedule", label: "Akademik kalendar",  icon: "calendar" },
        ]}
      />

      {/* ── Katalog ── */}
      {tab === "catalog" && (
        <Card style={{ marginTop: 10 }}>
          <Toolbar>
            <div className="flex flex-wrap gap-1.5 rounded-[10px] border border-[var(--hairline)] bg-[var(--bg4)] p-1.5">
              {STATUS_FILTERS.map((s) => (
                <Chip key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s}</Chip>
              ))}
            </div>
            <div className="spacer" />
            <div className="flex flex-nowrap gap-1.5 rounded-[10px] border border-[var(--hairline)] bg-[var(--bg4)] p-1.5">
              {FORMAT_FILTERS.map((f) => (
                <Chip key={f} active={formatFilter === f} onClick={() => setFormatFilter(f)}>{f}</Chip>
              ))}
            </div>
          </Toolbar>
          <div className="table-wrap admin-course-table" style={{ border: 0, borderRadius: 0 }}>
            <table className="t">
              <thead>
                <tr>
                  <th style={{ width: 32 }}><span className="check" /></th>
                  <th>Kurs</th>
                  <th>Status</th>
                  <th>O'qish formati</th>
                  <th>Owner</th>
                  <th className="center">Aktiv guruh</th>
                  <th className="center">Talabalar</th>
                  <th>Tugatish</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((course) => (
                  <tr key={course.id}>
                    <td><span className="check" /></td>
                    <td>
                      <div className="grid min-w-[260px] grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5">
                        <CourseBadge title={course.title} tone={course.color} />
                        <div className="min-w-0">
                          <b className="block max-w-[300px] text-[12.5px] leading-tight font-extrabold whitespace-normal text-[var(--text1)]">{course.title}</b>
                          <span className="mt-0.5 block text-[11px] font-semibold text-[var(--text3)]">id-{course.id}</span>
                        </div>
                      </div>
                    </td>
                    <td><Pill tone={statusTone(course.status)} dot>{statusLabel(course.status)}</Pill></td>
                    <td><Pill tone={formatTone(course.format)}>{course.format}</Pill></td>
                    <td>{course.owner}</td>
                    <td className="center mono num">{course.groups}</td>
                    <td className="center mono num">{course.studentsTotal}</td>
                    <td style={{ minWidth: 160 }}>
                      <Bar value={course.progress} tone={course.progress >= 70 ? "green" : course.progress >= 40 ? "blue" : "amber"} />
                      <div className="num" style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{course.progress}%</div>
                    </td>
                    <td className="right">
                      <Btn size="xs" leftIcon="dots" ariaLabel="Kurs amallari" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── O'quv guruhlari ── */}
      {tab === "groups" && (
        <Card style={{ marginTop: 10 }}>
          <Toolbar>
            <Chip icon="calendar" active>Aktiv</Chip>
            <Chip icon="checks">Tugagan</Chip>
            <Chip icon="circle-dotted">Kelgusi</Chip>
            <div className="spacer" />
            <Btn size="sm" variant="primary" leftIcon="plus">Yangi guruh</Btn>
          </Toolbar>
          <div className="admin-course-groups">
          {LEARNING_STREAMS.map((stream) => (
            <div className="admin-group-card" key={stream.id}>
              <div className="admin-group-head">
                <div>
                  <b>{stream.name}</b>
                  <span>{stream.course}</span>
                </div>
                <Pill tone={stream.atRisk >= 5 ? "red" : stream.atRisk >= 3 ? "amber" : "green"} dot>active</Pill>
              </div>
              <div className="kv-list" style={{ gap: 6 }}>
                <div className="kv"><span className="k">Sana</span><span className="v">{stream.startDate} - {stream.endDate}</span></div>
                <div className="kv"><span className="k">O'qituvchi</span><span className="v">A. Tursunova</span></div>
                <div className="kv"><span className="k">Talabalar</span><span className="v num">{stream.students}</span></div>
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>Tugatish</span>
                  <span className="num" style={{ fontSize: 12, fontWeight: 700 }}>{stream.completion}%</span>
                </div>
                <Bar value={stream.completion} tone={stream.completion >= 70 ? "green" : stream.completion >= 45 ? "blue" : "amber"} />
              </div>
              <div className="admin-group-actions">
                <Btn size="sm" leftIcon="arrow-right">Kirish</Btn>
                <Btn size="sm" leftIcon="user-plus">Talaba qo'shish</Btn>
              </div>
            </div>
          ))}
                  </div>
        </Card>
      )}

      {/* ── Jadval ── */}
      {tab === "schedule" && (
        <Card style={{ marginTop: 10 }}>
          <Toolbar>
            <div className="admin-calendar-view">
              <Chip icon="calendar">Kun</Chip>
              <Chip icon="calendar-week" active>Hafta</Chip>
              <Chip icon="calendar-month">Oy</Chip>
            </div>
            <Btn size="sm" leftIcon="chevron-left" ariaLabel="Oldingi hafta" />
            <div className="admin-calendar-range">12-May - 18-May, 2026</div>
            <Btn size="sm" leftIcon="chevron-right" ariaLabel="Keyingi hafta" />
            <Btn size="sm" leftIcon="refresh">Bugun</Btn>
            <div className="spacer" />
            <Chip icon="filter">Kurs: Hammasi</Chip>
            <Chip icon="users-group">Guruh: Hammasi</Chip>
            <Btn size="sm" variant="primary" leftIcon="plus">Yangi session</Btn>
          </Toolbar>
          <div className="admin-calendar-wrap">
            <div className="admin-calendar-grid">
              <div className="admin-calendar-corner">Vaqt</div>
              {WEEK_DAYS.map((day) => (
                <div className="admin-calendar-day" key={day.label}>
                  <span>{day.label}</span>
                  <b className={day.today ? "today" : ""}>{day.date}</b>
                </div>
              ))}
              {CALENDAR_SLOTS.map((slot, slotIndex) => (
                <>
                  <div className="admin-calendar-time" key={`${slot.start}-time`}>
                    <b>{slot.start}</b>
                    <span>{slot.end}</span>
                  </div>
                  {WEEK_DAYS.map((day, dayIndex) => {
                    const event = CALENDAR_EVENTS.find((item) => item.day === dayIndex && item.slot === slotIndex)
                    return (
                      <div className="admin-calendar-cell" key={`${day.label}-${slot.start}`}>
                        {event ? (
                          <div className={`admin-calendar-event ${event.kind}`}>
                            <span>{calendarKindLabel(event.kind)}</span>
                            <b>{event.title}</b>
                            <em><Icon name="users" /> {event.group} <Icon name="map-pin" /> {event.room}</em>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </>
              ))}
            </div>
            <div className="admin-calendar-legend">
              {["lecture", "lab", "live", "exam", "office"].map((kind) => (
                <span className={`admin-calendar-pill ${kind}`} key={kind}>{calendarKindLabel(kind)}</span>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
