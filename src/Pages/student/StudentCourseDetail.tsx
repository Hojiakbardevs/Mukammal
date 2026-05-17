import { useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, Bar, Btn, Card, CardHead, Donut, Icon, Pill, Tabs } from "@/components/dashboard/LmsPrimitives"
import { LESSON, ME, MY_COURSES } from "@/data/studentData"

export function StudentCourseDetail() {
  const [tab, setTab] = useState("modules")
  const c = MY_COURSES.find((x) => x.id === "nlp") ?? MY_COURSES[1]

  const gradeByCourseName = 92
  const streak = ME.streak

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        position: "relative", marginBottom: 18, borderRadius: 16, overflow: "hidden",
        backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 16px), linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
        color: "#fff", padding: 26,
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.14,
          backgroundImage: "radial-gradient(circle at 84% 24%, #fff 0 2px, transparent 3px)",
          backgroundSize: "120px 120px",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <Pill tone="blue" icon="cpu">{c.track}</Pill>
            <Pill tone="gray">{ME.learningStream}</Pill>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 28, letterSpacing: -0.6, marginBottom: 4 }}>
            {c.title}
          </h2>
          <div style={{ fontSize: 13.5, opacity: 0.88, marginBottom: 18 }}>
            Trener: {c.teacher} · 20-Yan – 15-May 2026 · {ME.totalStudents} o'quvchi
          </div>
          <div style={{ display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
            <Donut
              size={88} stroke={11}
              value={c.progress} max={100}
              tone="#fde68a" trackTone="rgba(255,255,255,0.18)"
              center={
                <div style={{ color: "#fff", textAlign: "center" }}>
                  <div className="num" style={{ fontSize: 20, fontWeight: 800 }}>{c.progress}%</div>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>MENING</div>
                </div>
              }
            />
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                ["Tugatilgan", `${c.lessonsDone}/${c.lessonsTotal}`],
                ["Joriy baho", `${gradeByCourseName}`],
                ["Guruh reytingi", `#${ME.weeklyRank} / ${ME.totalStudents}`],
                ["Streak", `${streak} kun`],
              ].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 10.5, opacity: 0.7, textTransform: "uppercase", letterSpacing: 0.05, fontWeight: 700 }}>{label}</div>
                  <div className="num" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Link className="btn btn-primary" to="/app/lessons/transformers-attention">
                <Icon name="player-play" /> Davom etish
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <Tabs value={tab} onChange={setTab} items={[
        { value: "modules",   label: "Modullar",      icon: "list-tree" },
        { value: "materials", label: "Materiallar",   icon: "folder",    count: 41 },
        { value: "qa",        label: "Q&A",           icon: "message",   count: 88 },
        { value: "people",    label: "O'quvchilar",   icon: "users",     count: ME.totalStudents },
        { value: "about",     label: "Kurs haqida",   icon: "info-circle" },
      ]} />

      {/* ── MODULES TAB ── */}
      {tab === "modules" && (
        <Card>
          <CardHead title="Modullar va darslar" sub={`· ${c.lessonsDone}/${c.lessonsTotal} tugatildi`} />
          <div style={{ padding: 14 }}>
            {LESSON.modules.map((m, mi) => (
              <div key={m.id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 10 }}>
                {/* Module header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: m.state === "locked" ? 0 : 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="thumb" style={{
                      background: m.state === "done" ? "var(--green-bg)" : m.state === "current" ? "var(--accent-light)" : "var(--bg3)",
                      color: m.state === "done" ? "var(--green)" : m.state === "current" ? "var(--accent)" : "var(--text3)",
                      width: 30, height: 30,
                    }}>
                      <Icon name={m.state === "done" ? "check" : m.state === "current" ? "player-play" : "lock"} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Modul {mi + 1}: {m.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 1 }}>{m.lessons.length} dars</div>
                    </div>
                  </div>
                  {m.state === "current" && <Pill tone="blue" dot>Joriy</Pill>}
                  {m.state === "done"    && <Pill tone="green" icon="check">Tugatildi</Pill>}
                  {m.state === "locked"  && <Pill tone="gray" icon="lock">Avval avvalgisini tugating</Pill>}
                </div>

                {/* Lessons */}
                {m.state !== "locked" && (
                  <div style={{ marginLeft: 38 }}>
                    {m.lessons.map((l, li) => {
                      const kindIcon = l.kind === "video" ? "player-play" : l.kind === "pdf" ? "file-text" : l.kind === "quiz" ? "list-check" : l.kind === "assignment" ? "file-upload" : "file"
                      const kindClass = l.kind === "video" ? "vid" : l.kind === "pdf" ? "pdf" : l.kind === "quiz" ? "quiz" : "doc"
                      return (
                        <div key={li} style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "8px 8px",
                          borderRadius: 8, opacity: l.state === "locked" ? 0.55 : 1,
                          background: l.state === "current" ? "var(--accent-light)" : "transparent",
                          cursor: l.state === "locked" ? "default" : "pointer",
                        }}>
                          <span className={`thumb ${kindClass}`} style={{ width: 26, height: 26 }}>
                            <Icon name={kindIcon} />
                          </span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: l.state === "current" ? 700 : 500, fontSize: 12.5 }}>{l.title}</div>
                          </div>
                          <span style={{ fontSize: 11, color: "var(--text3)" }}>{l.duration}</span>
                          {l.state === "done"    && <Icon name="check" style={{ color: "var(--green)", fontSize: 16 }} />}
                          {l.state === "current" && <Icon name="player-play" style={{ color: "var(--accent)", fontSize: 16 }} />}
                          {l.state === "locked"  && <Icon name="lock" style={{ color: "var(--text3)", fontSize: 14 }} />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "materials" && (
        <Card>
          <CardHead title="Kurs materiallari" count={41} actions={<Btn size="sm" leftIcon="download">Barchasini yuklab olish</Btn>} />
          <div style={{ padding: 18 }}>
            <div className="alert blue">
              <Icon name="folder" />
              <div className="body">
                <h4>Materiallar mavjud</h4>
                <p>Barcha slaydlar, PDF va kod namunalari bu yerda. Dars sahifasida ham ko'rishingiz mumkin.</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === "qa" && (
        <Card>
          <CardHead title="Q&A muhokamasi" count={88} actions={<Btn size="sm" variant="primary" leftIcon="message-plus">Savol berish</Btn>} />
          <div style={{ padding: 18 }}>
            <div className="alert blue">
              <Icon name="message" />
              <div className="body">
                <h4>Faol muhokama</h4>
                <p>88 ta savol va javob. Dars sahifasida Q&A bo'limidan foydalaning.</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === "people" && (
        <Card>
          <CardHead title="O'quvchilar" count={ME.totalStudents} />
          <div style={{ padding: 18 }}>
            <div className="alert blue">
              <Icon name="users" />
              <div className="body">
                <h4>{ME.totalStudents} o'quvchi</h4>
                <p>Guruhingizning barcha a'zolari — o'quv oqimi bo'yicha hamkasblaringiz.</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === "about" && (
        <Card>
          <CardHead title="Kurs haqida" />
          <div style={{ padding: 18 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div className="kv-list">
                <div className="kv"><span className="k">Trener</span><span className="v">{c.teacher}</span></div>
                <div className="kv"><span className="k">Yo'nalish</span><span className="v">{c.track}</span></div>
                <div className="kv"><span className="k">Jami darslar</span><span className="v num">{c.lessonsTotal}</span></div>
                <div className="kv"><span className="k">Davomiyligi</span><span className="v">20-Yan – 15-May 2026</span></div>
                <div className="kv"><span className="k">O'quvchilar</span><span className="v num">{ME.totalStudents}</span></div>
                <div className="kv"><span className="k">O'qitish formati</span><span className="v">Offline + Online (Hybrid)</span></div>
              </div>
              <div className="note">
                Bu kurs NLP sohasida amaliy ko'nikma beradi: tokenizatsiya, embeddinglar, transformer arxitekturasi va real loyiha.
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
