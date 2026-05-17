import { Link } from "react-router-dom"

import { Bar, Btn, Card, CardHead, Donut, Icon, Pill, Spark, Stat } from "@/components/dashboard/LmsPrimitives"
import { BADGES, ME, MY_COURSES, MY_QA_FEED, MY_SCHEDULE, MY_TASKS, XP_HISTORY } from "@/data/studentData"

const COURSE_COLORS: Record<string, { from: string; to: string }> = {
  b1: { from: "#6366f1", to: "#4338ca" },
  b2: { from: "#0ea5e9", to: "#1d4ed8" },
  b3: { from: "#06b6d4", to: "#0e7490" },
  b7: { from: "#10b981", to: "#047857" },
  b8: { from: "#f97316", to: "#c2410c" },
}

function courseGradient(color: string) {
  const c = COURSE_COLORS[color] ?? { from: "#6366f1", to: "#4338ca" }
  return `linear-gradient(135deg, ${c.from}, ${c.to})`
}

export function StudentDashboard() {
  const courseShortName = (name: string) =>
    MY_COURSES.find((c) => c.title === name)?.shortTitle ?? name.split(" ").slice(0, 2).join(" ")

  const continueCourse = MY_COURSES.find((c) => c.id === "nlp") ?? MY_COURSES[0]
  const upcoming = MY_TASKS.filter((t) => t.dueIn > 0).sort((a, b) => a.dueIn - b.dueIn).slice(0, 4)
  const recentGrades = MY_TASKS.filter((t) => t.status === "graded").slice(0, 3)
  const days = ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"]
  const todayIdx = 3

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f1d3a 0%, #1f6feb 70%, #3b82f6 100%)",
        color: "#fff", borderRadius: 16, padding: 26, marginBottom: 18,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.12,
          backgroundImage: "radial-gradient(circle at 84% 24%, #fff 0 2px, transparent 3px), radial-gradient(circle at 16% 64%, #fff 0 1.5px, transparent 2px)",
          backgroundSize: "120px 120px",
        }} />
        <div style={{
          position: "relative", display: "grid",
          gridTemplateColumns: "1.5fr 1fr", gap: 30, alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <div style={{ fontSize: 11.5, opacity: 0.7, textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.06, marginBottom: 4 }}>
              Salom, {ME.name.split(" ")[0]}! · {new Date().toLocaleDateString("uz-UZ", { weekday: "long", day: "numeric", month: "long" })}
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 24, letterSpacing: -0.5, marginBottom: 10 }}>
              Davom etish: {continueCourse.title}
            </h2>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>
              {continueCourse.nextLesson?.module} · {continueCourse.nextLesson?.title} · {continueCourse.nextLesson?.duration}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${continueCourse.progress}%`, height: "100%", background: "linear-gradient(90deg, #fff, #fde68a)" }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 13 }} className="num">{continueCourse.progress}%</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link className="btn btn-primary" to="/app/lessons/transformers-attention">
                <Icon name="player-play" /> Darsni boshlash
              </Link>
              <Link className="btn" to="/app/courses" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                <Icon name="list" /> Barcha kurslar
              </Link>
            </div>
          </div>
          {/* Right: cert donut */}
          <div style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 14, padding: 16, display: "flex", gap: 16, alignItems: "center",
          }}>
            <Donut
              size={92} stroke={11}
              value={ME.certificateProgress} max={100}
              tone="#fbbf24" trackTone="rgba(255,255,255,0.18)"
              center={
                <div style={{ textAlign: "center", color: "#fff" }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }} className="num">{ME.certificateProgress}<span style={{ fontSize: 11 }}>%</span></div>
                  <div style={{ fontSize: 9, opacity: 0.75, letterSpacing: 0.05 }}>SERTIFIKAT</div>
                </div>
              }
            />
            <div>
              <div style={{ fontSize: 11.5, opacity: 0.8 }}>AI Track sertifikati</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 5 }}>2 ta kurs qoldi</div>
              <div style={{ fontSize: 11.5, opacity: 0.75 }}>NLP · ML in Production</div>
              <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>
                <Icon name="calendar" /> Kutilayotgan: 12-Iyn 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4-STAT GRID ── */}
      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="blue"   label="Aktiv kurslar"      value={ME.enrolled - ME.completed} sub={`${ME.completed} ta tugatildi`} />
        <Stat tone="green"  label="O'rtacha baho"       value={ME.avgScore}                sub="3 ta aktiv kurs bo'yicha"       trend={{ dir: "up", label: "+2" }} />
        <Stat tone="amber"  label="Streak"              value={ME.streak} unit="kun"        sub="bugun ham darsda bo'lish" />
        <Stat tone="purple" label="XP · Level" icon="coin" value={ME.points}                sub={`Level ${ME.level} · #${ME.weeklyRank} / ${ME.totalStudents}`} />
      </div>

      {/* ── MAIN CONTENT c-8-4 ── */}
      <div className="grid c-8-4">
        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Kurslar */}
          <Card>
            <CardHead title="Mening kurslarim" sub="· davom etilayotganlar" actions={
              <Link className="btn btn-sm" to="/app/courses">
                <Icon name="arrow-right" /> Hammasi
              </Link>
            } />
            <div style={{ padding: "14px 18px 18px", display: "grid", gap: 12 }}>
              {MY_COURSES.filter((c) => c.status === "active").map((c) => (
                <div key={c.id} style={{
                  display: "grid", gridTemplateColumns: "70px 1fr 140px",
                  gap: 14, alignItems: "center",
                  padding: 12, borderRadius: 12, border: "1px solid var(--border)",
                }}>
                  {/* Thumb */}
                  <div style={{
                    width: 70, height: 70, borderRadius: 10,
                    background: courseGradient(c.color),
                    display: "grid", placeItems: "center",
                    color: "#fff", fontWeight: 700, fontSize: 18,
                  }}>
                    {c.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  {/* Info */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{c.title}</div>
                      <Pill tone="gray">{c.track}</Pill>
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 6 }}>
                      Trener: {c.teacher} · {c.lessonsDone}/{c.lessonsTotal} dars
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <Bar value={c.progress} tone={c.progress > 80 ? "green" : c.progress > 50 ? "blue" : "amber"} />
                      </div>
                      <span className="num" style={{ fontWeight: 700, fontSize: 12 }}>{c.progress}%</span>
                    </div>
                    {c.deadline && (
                      <div style={{ fontSize: 11.5, color: c.deadline.days < 5 ? "var(--red)" : "var(--text3)", marginTop: 6 }}>
                        <Icon name="clock" /> Keyingi muddat: <b>{c.deadline.title}</b> · {c.deadline.days} kun
                      </div>
                    )}
                  </div>
                  {/* Action */}
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-sm btn-primary" to="/app/lessons/transformers-attention">
                      <Icon name="player-play" /> Davom etish
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming deadlines */}
          <Card>
            <CardHead title="Yaqin muddatli topshiriqlar" count={upcoming.length} actions={
              <Link className="btn btn-sm" to="/app/tasks">
                <Icon name="arrow-right" /> Hammasi
              </Link>
            } />
            <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
              <table className="t">
                <thead>
                  <tr>
                    <th>Topshiriq</th>
                    <th>Kurs</th>
                    <th>Turi</th>
                    <th>Ball</th>
                    <th className="center">Muddat</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {upcoming.map((t) => (
                    <tr key={t.id}>
                      <td><b>{t.title}</b></td>
                      <td>{t.course}</td>
                      <td>
                        <Pill tone={t.type === "quiz" ? "teal" : t.type === "project" ? "purple" : "blue"}>
                          {t.type}
                        </Pill>
                      </td>
                      <td className="num">{t.points}</td>
                      <td className="center">
                        {t.dueIn <= 3
                          ? <Pill tone="red" icon="alarm"><b>{t.dueIn} kun</b></Pill>
                          : <Pill tone="amber"><b>{t.dueIn} kun</b></Pill>}
                      </td>
                      <td className="right">
                        <Link className="btn btn-xs btn-primary" to="/app/tasks">
                          <Icon name="arrow-right" /> Topshirish
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mini schedule */}
          <Card>
            <CardHead title="Bu hafta jadvalim" actions={
              <Link className="btn btn-sm" to="/app/schedule">
                <Icon name="calendar" /> To'liq jadval
              </Link>
            } />
            <div style={{ padding: 18, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
              {days.map((d, i) => {
                const items = MY_SCHEDULE.filter((e) => e.day === i)
                const isToday = i === todayIdx
                return (
                  <div key={i} style={{
                    padding: 10, borderRadius: 10, minHeight: 110,
                    border: "1px solid var(--border)",
                    borderTop: isToday ? "3px solid var(--lms-accent)" : "1px solid var(--border)",
                    background: isToday ? "var(--lms-accent-light)" : "#fff",
                  }}>
                    <div style={{
                      fontSize: 10.5, fontWeight: 700, letterSpacing: 0.05,
                      textTransform: "uppercase", marginBottom: 6,
                      color: isToday ? "var(--lms-accent-ink)" : "var(--text3)",
                    }}>
                      {d} · {12 + i}
                    </div>
                    {items.length === 0 ? (
                      <div style={{ fontSize: 11, color: "var(--text3)" }}>—</div>
                    ) : items.map((e, j) => (
                      <div key={j} style={{
                        fontSize: 10.5, padding: "5px 7px", borderRadius: 6,
                        background: "#fff", border: "1px solid var(--border)", marginBottom: 4,
                      }}>
                        <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
                          {courseShortName(e.course)}
                        </div>
                        <Pill tone={e.kind === "lecture" ? "blue" : e.kind === "lab" ? "purple" : e.kind === "live" ? "teal" : "red"}>
                          {e.room === "Online" ? "Online" : e.kind}
                        </Pill>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* ── RIGHT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Recent grades */}
          <Card>
            <CardHead title="So'nggi baholar" actions={
              <Link className="btn btn-sm" to="/app/grades">
                <Icon name="arrow-right" /> Gradebook
              </Link>
            } />
            <div style={{ padding: 14 }}>
              {recentGrades.map((t) => (
                <div key={t.id} style={{
                  display: "flex", alignItems: "center", gap: 11,
                  padding: "10px 4px", borderBottom: "1px solid var(--hairline)",
                }}>
                  <span className={`thumb ${t.type === "quiz" ? "quiz" : "doc"}`}>
                    <Icon name={t.type === "quiz" ? "list-check" : "file-text"} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{t.course} · {t.submittedAt}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="num" style={{ fontSize: 14, fontWeight: 800, color: (t.score ?? 0) / (t.max ?? 1) > 0.9 ? "var(--green)" : "var(--accent)" }}>
                      {t.score}<span style={{ color: "var(--text3)", fontSize: 11, fontWeight: 500 }}>/{t.max}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>
                      {Math.round(((t.score ?? 0) / (t.max ?? 1)) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* XP spark */}
          <Card>
            <CardHead title="XP o'sishi" sub="· 7 kun" />
            <div style={{ padding: "4px 18px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800 }} className="num">{ME.points}</span>
                <Pill tone="green" icon="trending-up">+{ME.points - XP_HISTORY[0]} XP</Pill>
              </div>
              <Spark data={XP_HISTORY} tone="blue" height={40} />
            </div>
          </Card>

          {/* Badges */}
          <Card>
            <CardHead title="Yutuqlar" sub={`· ${ME.points} XP`} actions={
              <Link className="btn btn-sm" to="/app/certificates">Hammasi</Link>
            } />
            <div style={{ padding: 16, display: "grid", gap: 10 }}>
              {BADGES.slice(0, 4).map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{
                    background: b.tone === "amber" ? "var(--amber-bg)" : b.tone === "blue" ? "var(--lms-accent-light)" : b.tone === "purple" ? "var(--purple-bg)" : b.tone === "teal" ? "var(--teal-bg, #ecfeff)" : "var(--green-bg)",
                    color: b.tone === "amber" ? "var(--amber)" : b.tone === "blue" ? "var(--lms-accent)" : b.tone === "purple" ? "var(--purple)" : b.tone === "teal" ? "var(--teal, #0e7490)" : "var(--green)",
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name={b.icon} style={{ fontSize: 18, color: "inherit" }} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12.5 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-foot">
              <span>Guruh reytingi</span>
              <Pill tone="blue">#{ME.weeklyRank} / {ME.totalStudents}</Pill>
            </div>
          </Card>

          {/* Q&A */}
          <Card>
            <CardHead title="Q&A faolligim" actions={
              <Btn size="sm" leftIcon="message-plus">Savol berish</Btn>
            } />
            <div style={{ padding: 14 }}>
              {MY_QA_FEED.map((q, i) => (
                <div key={i} style={{
                  padding: 10, borderRadius: 8, marginBottom: 8,
                  background: q.mine ? "var(--accent-light)" : "#fff",
                  border: "1px solid",
                  borderColor: q.mine ? "var(--accent-mid)" : "var(--hairline)",
                }}>
                  <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 4 }}>
                    {q.mine ? <Pill tone="blue">Sizning savolingiz</Pill> : <Pill tone="gray">Kuzatishda</Pill>}
                    {" "}· {q.course} · {q.age}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 12.5 }}>{q.topic}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 3 }}>{q.answer}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI hint */}
          <div className="alert blue">
            <Icon name="sparkles" />
            <div className="body">
              <h4>Murabbiy AI</h4>
              <p>Tushunmagan joyni so'rang — sizning kursingiz konteksti bilan javob beradi.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
