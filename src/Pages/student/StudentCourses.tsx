import { useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, Bar, Btn, Icon, Pill, Tabs } from "@/components/dashboard/LmsPrimitives"
import { MY_COURSES } from "@/data/studentData"

const BANNER_GRADIENT: Record<string, { from: string; to: string }> = {
  b1: { from: "#6366f1", to: "#4338ca" },
  b2: { from: "#0ea5e9", to: "#1d4ed8" },
  b3: { from: "#06b6d4", to: "#0e7490" },
  b7: { from: "#10b981", to: "#047857" },
  b8: { from: "#f97316", to: "#c2410c" },
}

function bannerGradient(color: string) {
  const c = BANNER_GRADIENT[color] ?? { from: "#6366f1", to: "#4338ca" }
  return `repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 8px, transparent 8px 16px), linear-gradient(135deg, ${c.from}, ${c.to})`
}

export function StudentCourses() {
  const [tab, setTab] = useState<"active" | "completed" | "all">("active")

  const list = MY_COURSES.filter((c) =>
    tab === "active" ? c.status === "active" :
    tab === "completed" ? c.status === "completed" :
    true
  )

  return (
    <>
      <Tabs
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        items={[
          { value: "active",    label: "Davom etayotgan", icon: "player-play", count: MY_COURSES.filter((c) => c.status === "active").length },
          { value: "completed", label: "Tugatilgan",      icon: "check-circle", count: MY_COURSES.filter((c) => c.status === "completed").length },
          { value: "all",       label: "Hammasi",         count: MY_COURSES.length },
        ]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {list.map((c) => (
          <div key={c.id} style={{
            background: "#fff", border: "1px solid var(--border)",
            borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-xs)",
          }}>
            {/* Banner */}
            <div style={{ height: 140, position: "relative", backgroundImage: bannerGradient(c.color), color: "#fff" }}>
              {c.status === "completed" && (
                <div style={{ position: "absolute", top: 12, right: 12 }}>
                  <Pill tone="green" icon="award">Sertifikat berildi</Pill>
                </div>
              )}
              <div style={{ position: "absolute", right: 12, top: 8, fontWeight: 700, fontSize: 56, opacity: 0.16, lineHeight: 1, letterSpacing: -2 }}>
                {c.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
              </div>
              <div style={{ position: "absolute", left: 14, bottom: 12, right: 14 }}>
                <div style={{ fontSize: 11.5, opacity: 0.75, marginBottom: 3 }}>{c.track}</div>
                <div style={{ fontWeight: 700, fontSize: 19, lineHeight: 1.2 }}>{c.title}</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text2)", marginBottom: 10 }}>
                <Avatar name={c.teacher} tone={c.color} size="sm" />
                Trener: <b>{c.teacher}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4 }}>
                <span style={{ color: "var(--text3)" }}>Mening progressim</span>
                <span className="num" style={{ fontWeight: 700 }}>
                  {c.progress}% · <span style={{ color: "var(--text3)" }}>{c.lessonsDone}/{c.lessonsTotal}</span>
                </span>
              </div>
              <Bar value={c.progress} tone={c.progress === 100 ? "green" : c.progress > 50 ? "blue" : "amber"} />

              {c.nextLesson ? (
                <div style={{ marginTop: 14, padding: 12, background: "var(--bg4)", borderRadius: 8 }}>
                  <div style={{ fontSize: 10.5, color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.05 }}>Keyingi dars</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginTop: 3 }}>{c.nextLesson.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 1 }}>{c.nextLesson.module} · {c.nextLesson.duration}</div>
                </div>
              ) : (
                <div style={{ marginTop: 14, padding: 12, background: "var(--green-bg)", border: "1px solid var(--green-mid)", borderRadius: 8, fontSize: 12.5, color: "var(--green-ink)", display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="award" /> Kurs muvaffaqiyatli tugatildi
                </div>
              )}

              {c.deadline && (
                <div style={{ marginTop: 8, fontSize: 11.5, color: c.deadline.days < 5 ? "var(--red)" : "var(--text3)" }}>
                  <Icon name="clock" /> <b>{c.deadline.title}</b> · {c.deadline.days} kun qoldi
                </div>
              )}

              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                {c.status === "active" ? (
                  <Link className="btn btn-sm btn-primary" to="/app/lessons/transformers-attention">
                    <Icon name="player-play" /> Davom etish
                  </Link>
                ) : (
                  <Link className="btn btn-sm" to="/app/certificates">
                    <Icon name="award" /> Sertifikatni ko'rish
                  </Link>
                )}
                <Link className="btn btn-sm" to={`/app/courses/${c.id}`}>
                  <Icon name="info-circle" /> Tafsilot
                </Link>
                <Btn size="sm" variant="ghost" leftIcon="bookmark" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
