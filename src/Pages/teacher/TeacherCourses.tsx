import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Avatar, Bar, Btn, Chip, Icon, Pill, Seg, Spark, Stat, Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { COURSES } from "@/data/lmsData"

const COVER_COLORS: Record<string, { from: string; to: string }> = {
  b1: { from: "#6366f1", to: "#4338ca" },
  b2: { from: "#0ea5e9", to: "#1d4ed8" },
  b3: { from: "#06b6d4", to: "#0e7490" },
  b4: { from: "#f97316", to: "#c2410c" },
  b5: { from: "#8b5cf6", to: "#6d28d9" },
  b6: { from: "#ec4899", to: "#be185d" },
  b7: { from: "#14b8a6", to: "#0f766e" },
  b8: { from: "#f59e0b", to: "#b45309" },
}

const FORMAT_LABELS: Record<string, string> = {
  blended: "Blended",
  cohort: "Cohort-based",
  "self-paced": "Self-paced",
}

const FORMAT_ICONS: Record<string, string> = {
  blended: "shuffle",
  cohort: "users",
  "self-paced": "user",
}

export function TeacherCourses() {
  const [view, setView] = useState<"grid" | "list">("grid")

  const totalStudents = COURSES.reduce((acc, c) => acc + c.studentsActive, 0)
  const avgProgress = Math.round(COURSES.reduce((acc, c) => acc + c.progress, 0) / COURSES.length)

  return (
    <>
      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="blue"   label="Kurslarim"         value={COURSES.length} sub="barcha semestr" />
        <Stat tone="green"  label="Faol talabalar"    value={totalStudents}  sub="hamma kurslar" />
        <Stat tone="purple" label="O'rtacha progress" value={avgProgress}    unit="%" sub="kurs kesimida" />
        <Stat tone="amber"  label="Keyingi sessiya"   value="14:00"          sub="Bugun · AI-26-1B" />
      </div>

      <Toolbar>
        <Seg
          value={view}
          onChange={(v) => setView(v as "grid" | "list")}
          options={[
            { value: "grid", label: "Kartochkalar", icon: "layout-grid" },
            { value: "list", label: "Ro'yxat",      icon: "list" },
          ]}
        />
        <Chip icon="filter">Semestr: Spring '26</Chip>
        <Chip icon="adjustments">Status: Published</Chip>
        <div className="spacer" />
        <Btn leftIcon="plus" variant="primary">Yangi kurs</Btn>
      </Toolbar>

      {view === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 14,
            marginTop: 14,
          }}
        >
          {COURSES.map((c) => {
            const color = COVER_COLORS[c.color] ?? COVER_COLORS.b1
            const initials = c.title.split(" ").map((w) => w[0]).join("").slice(0, 3)
            return (
              <div
                key={c.id}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xs)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* cover */}
                <div
                  style={{
                    height: 110,
                    position: "relative",
                    background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 16px),
                      linear-gradient(135deg, ${color.from}, ${color.to})`,
                    color: "#fff",
                  }}
                >
                  <div style={{ position: "absolute", left: 14, bottom: 12 }}>
                    <Pill tone="solid-blue" icon={FORMAT_ICONS[c.format]}>
                      {FORMAT_LABELS[c.format]}
                    </Pill>
                  </div>
                  <div style={{ position: "absolute", right: 12, top: 12 }}>
                    <span
                      className="pill"
                      style={{
                        background: "rgba(0,0,0,0.32)",
                        color: "#fff",
                        borderColor: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Icon name="circle-dot" />{" "}
                      {c.status === "published" ? "Published" : c.status === "draft" ? "Draft" : c.status}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: 12,
                      bottom: 12,
                      fontFamily: "var(--font-display)",
                      fontSize: 38,
                      fontWeight: 700,
                      opacity: 0.18,
                    }}
                  >
                    {initials}
                  </div>
                </div>

                {/* body */}
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, letterSpacing: -0.2 }}>{c.title}</div>
                    <div style={{ fontSize: 11.5, color: "#8a93a6", marginTop: 2 }}>{c.cohort}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, fontSize: 11.5 }}>
                    <div>
                      <div style={{ color: "#8a93a6", fontWeight: 500 }}>Talabalar</div>
                      <div className="mono num" style={{ fontWeight: 700, fontSize: 13 }}>
                        {c.studentsActive}/{c.studentsTotal}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: "#8a93a6", fontWeight: 500 }}>Modullar</div>
                      <div className="mono num" style={{ fontWeight: 700, fontSize: 13 }}>{c.modules}</div>
                    </div>
                    <div>
                      <div style={{ color: "#8a93a6", fontWeight: 500 }}>Darslar</div>
                      <div className="mono num" style={{ fontWeight: 700, fontSize: 13 }}>{c.lessons}</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 5 }}>
                      <span style={{ color: "#8a93a6" }}>Guruh progress</span>
                      <span className="mono num" style={{ fontWeight: 700 }}>{c.progress}%</span>
                    </div>
                    <Bar value={c.progress} tone={c.progress > 70 ? "green" : c.progress > 40 ? "blue" : "amber"} />
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    <Link className="btn btn-sm btn-primary" to="/teacher/courses/detail">
                      <Icon name="arrow-right" /> Ochish
                    </Link>
                    <Btn size="sm" leftIcon="upload">Material</Btn>
                    <Btn size="sm" leftIcon="dots" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Format</th>
                <th>Talabalar</th>
                <th>Progress</th>
                <th>Keyingi sessiya</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={c.title} tone={c.color} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{c.title}</div>
                        <div style={{ fontSize: 11, color: "#8a93a6" }}>{c.cohort}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Pill tone="blue" icon={FORMAT_ICONS[c.format]}>{FORMAT_LABELS[c.format]}</Pill>
                  </td>
                  <td className="mono num">{c.studentsActive}/{c.studentsTotal}</td>
                  <td style={{ width: 200 }}>
                    <Bar value={c.progress} tone={c.progress > 70 ? "green" : c.progress > 40 ? "blue" : "amber"} />
                    <div style={{ fontSize: 11, color: "#8a93a6", marginTop: 3 }}>{c.progress}%</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Spark data={c.trend} tone="blue" height={24} />
                      <span style={{ fontSize: 12 }}>{c.nextSession}</span>
                    </div>
                  </td>
                  <td className="right">
                    <Link className="btn btn-sm" to="/teacher/courses/detail">
                      <Icon name="arrow-right" /> Ochish
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
