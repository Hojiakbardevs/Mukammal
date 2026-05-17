import { Link } from "react-router-dom"
import {
  Avatar, Bar, Btn, Card, CardHead, Icon, Pill, Spark, Stat,
} from "@/components/dashboard/LmsPrimitives"
import { COURSES, QA, STUDENTS, SUBMISSIONS } from "@/data/lmsData"

const TODAY_SESSIONS = [
  { t: "14:00", end: "15:30", title: "Sun'iy intellekt asoslari · Ma'ruza", room: "B-204", group: "AI-26-1B", soon: true },
  { t: "16:00", end: "17:30", title: "Tabiiy tilni qayta ishlash · Live session", room: "Online · Zoom", group: "NLP-26", soon: false },
  { t: "18:00", end: "19:00", title: "Ochiq maslahat vaqti", room: "Online", group: "Barcha oqimlar", soon: false },
]

export function TeacherDashboard() {
  const atRisk = STUDENTS.filter((s) => s.risk >= 50).sort((a, b) => b.risk - a.risk)
  const todayPending = SUBMISSIONS.filter((s) => s.state === "needs-grade" || s.state === "ai-flag")
  const pendingQa = QA.filter((q) => q.state === "needs-reply")

  const avgProgress = Math.round(COURSES.reduce((acc, c) => acc + c.progress, 0) / COURSES.length)

  return (
    <>
      {/* ── Insight banner ── */}
      <div className="alert blue" style={{ marginBottom: 18 }}>
        <Icon name="bolt" />
        <div className="body">
          <h4>Bugungi diqqat markazi</h4>
          <p>
            <b>{todayPending.length} ta topshiriq</b> tekshirilishni kutmoqda ·{" "}
            <b>{atRisk.length} ta talaba</b> risk ostida ·
            ML-26-2A guruhda <b>Mid-term loyiha</b> bugun soat 23:59 da yakunlanadi.
          </p>
        </div>
        <Link className="btn btn-sm btn-primary" to="/teacher/grading">
          <Icon name="arrow-right" /> Navbatga o'tish
        </Link>
      </div>

      {/* ── KPI ── */}
      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="blue"   label="Tekshirish navbati"      value={todayPending.length} sub="3 ta AI-flagged"      trend={{ dir: "up", label: "+5 bugun" }} />
        <Stat tone="green"  label="Bugun darslar"           value={3}                   sub="· 14:00, 16:00, 18:00" />
        <Stat tone="amber"  label="Risk ostidagi talabalar" value={atRisk.length}        sub="3 ta yangi signal"     trend={{ dir: "up", label: "+2 hafta" }} />
        <Stat tone="purple" label="O'rtacha guruh progress" value={avgProgress}          unit="%" sub="4 ta kurs bo'yicha" trend={{ dir: "up", label: "+4%" }} />
      </div>

      {/* ── Main 2-column grid ── */}
      <div className="grid c-8-4">
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Today's schedule */}
          <Card>
            <CardHead
              title="Bugungi jadval"
              sub="· 16-May, Payshanba"
              actions={
                <Link className="btn btn-sm" to="/teacher/schedule">
                  <Icon name="calendar" /> To'liq jadval
                </Link>
              }
            />
            <div style={{ padding: "14px 18px 18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 14 }}>
                {TODAY_SESSIONS.map((s, i) => (
                  <div key={i} style={{ display: "contents" }}>
                    <div className="mono num" style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                      {s.t}
                      <div style={{ fontSize: 10.5, fontWeight: 500, color: "#8a93a6" }}>{s.end}</div>
                    </div>
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: `1px solid ${s.soon ? "var(--accent-mid, #c2d6ff)" : "var(--border)"}`,
                        background: s.soon ? "var(--accent-light, #eef4ff)" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{s.title}</div>
                        <div style={{ fontSize: 11.5, color: "#475569", marginTop: 2 }}>
                          <Icon name="map-pin" /> {s.room} &nbsp;·&nbsp; <Icon name="users" /> {s.group}
                        </div>
                      </div>
                      {s.soon
                        ? <Pill tone="blue" icon="alarm-clock">2 soatdan keyin</Pill>
                        : <Pill tone="gray">Bo'sh</Pill>}
                      <Btn
                        size="sm"
                        variant={s.soon ? "primary" : "default"}
                        leftIcon={s.soon ? "video" : "list"}
                      >
                        {s.soon ? "Boshlash" : "Tafsilot"}
                      </Btn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Grading queue shortlist */}
          <Card>
            <CardHead
              title="Tekshirilishi kerak"
              count={todayPending.length}
              actions={
                <>
                  <Pill tone="purple" icon="sparkles">AI taklif tayyor: 3</Pill>
                  <Link className="btn btn-sm" to="/teacher/grading">
                    <Icon name="arrow-right" /> Hammasini ko'rish
                  </Link>
                </>
              }
            />
            <div className="table-wrap" style={{ borderRadius: 0, border: 0 }}>
              <table className="t">
                <thead>
                  <tr>
                    <th>Talaba</th>
                    <th>Topshiriq</th>
                    <th>Yuborildi</th>
                    <th className="center">AI taklifi</th>
                    <th>Holat</th>
                    <th className="right"></th>
                  </tr>
                </thead>
                <tbody>
                  {todayPending.slice(0, 5).map((sub, i) => (
                    <tr key={sub.id || i}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <Avatar name={sub.student.name} tone={sub.student.tone} size="sm" />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 12.5 }}>{sub.student.name}</div>
                            <div style={{ fontSize: 11, color: "#8a93a6" }}>{sub.student.group}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{sub.title}</div>
                        <div style={{ fontSize: 11, color: "#8a93a6" }}>{sub.course}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: 12 }}>{sub.submittedAgo} oldin</span>
                        {sub.late && (
                          <div style={{ marginTop: 2 }}>
                            <Pill tone="red">kechikkan</Pill>
                          </div>
                        )}
                      </td>
                      <td className="center">
                        {sub.suggestedScore != null ? (
                          <span className="mono num" style={{ fontWeight: 700 }}>
                            {sub.suggestedScore}
                            <span style={{ color: "#8a93a6" }}>/40</span>
                          </span>
                        ) : (
                          <span style={{ color: "#b0b7c5" }}>—</span>
                        )}
                      </td>
                      <td>
                        {sub.state === "needs-grade" && <Pill tone="amber" dot>Baholash kerak</Pill>}
                        {sub.state === "ai-flag" && <Pill tone="red" icon="flag">AI shubha</Pill>}
                        {sub.state === "appeal" && <Pill tone="purple" icon="gavel">Appeal</Pill>}
                      </td>
                      <td className="right">
                        <Link className="btn btn-xs" to="/teacher/ai-grading">
                          <Icon name="eye" /> Ochish
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Course progress strip */}
          <Card>
            <CardHead
              title="Kurslarim — guruh dinamikasi"
              actions={
                <Link className="btn btn-sm" to="/teacher/courses">
                  <Icon name="list" /> Boshqarish
                </Link>
              }
            />
            <div style={{ padding: "10px 18px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {COURSES.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={c.title} tone={c.color} size="lg" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: "#8a93a6" }}>
                        {c.cohort} · {c.studentsActive}/{c.studentsTotal} faol
                      </div>
                    </div>
                    <Spark data={c.trend} tone="blue" height={28} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4 }}>
                      <span style={{ color: "#8a93a6" }}>O'rtacha progress</span>
                      <span className="mono num" style={{ fontWeight: 700 }}>{c.progress}%</span>
                    </div>
                    <Bar value={c.progress} tone={c.progress > 70 ? "green" : c.progress > 40 ? "blue" : "amber"} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Risk panel */}
          <Card>
            <CardHead
              title="Risk paneli — yordamga muhtoj"
              actions={
                <Link className="btn btn-sm" to="/teacher/risk">
                  <Icon name="arrow-right" /> Ochish
                </Link>
              }
            />
            <div style={{ padding: 16 }}>
              <div className="note" style={{ marginBottom: 12 }}>
                Bu list <b>jazo emas, yordam radari</b>. Davomat, topshiriq va engagement
                signal'lariga asoslangan.
              </div>
              {atRisk.slice(0, 4).map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    padding: "10px 0",
                    borderBottom: i < 3 ? "1px solid var(--hairline, #f1f3f8)" : "none",
                  }}
                >
                  <Avatar name={s.name} tone={s.tone} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12.5 }}>{s.name}</div>
                    <div style={{ display: "flex", gap: 6, fontSize: 11, color: "#8a93a6", marginTop: 1 }}>
                      <span>{s.group}</span>
                      <span>·</span>
                      <span>davomat {s.attendance}%</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      className="mono num"
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: s.risk > 75 ? "var(--red, #dc2626)" : s.risk > 55 ? "var(--amber, #d97706)" : "var(--text2)",
                      }}
                    >
                      {s.risk}
                    </div>
                    <div style={{ fontSize: 10, color: "#8a93a6", letterSpacing: 0.05 }}>RISK</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Q&A */}
          <Card>
            <CardHead
              title="Q&A moderatsiya"
              count={pendingQa.length}
              actions={
                <Link className="btn btn-sm" to="/teacher/qa">
                  <Icon name="arrow-right" /> Hammasini ko'rish
                </Link>
              }
            />
            <div style={{ padding: 12 }}>
              {QA.slice(0, 3).map((q, i) => (
                <div
                  key={q.id}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: `1px solid ${q.flagged ? "var(--red-mid, #fecaca)" : "var(--hairline, #f1f3f8)"}`,
                    marginBottom: i < 2 ? 8 : 0,
                    background: q.flagged ? "var(--red-bg, #fef2f2)" : "#fff",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                    <Avatar name={q.student.name} tone={q.student.tone} size="sm" />
                    <div style={{ flex: 1, fontSize: 11.5 }}>
                      <b>{q.student.name}</b>&nbsp;
                      <span style={{ color: "#8a93a6" }}>· {q.course.split(" ")[0]} · {q.age}</span>
                    </div>
                    {q.flagged && <Pill tone="red" icon="flag">Spam shubhasi</Pill>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 3 }}>{q.topic}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#475569",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.body}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="card-pad">
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Tezkor amallar</h3>
            <div style={{ display: "grid", gap: 8 }}>
              <Btn leftIcon="speakerphone">Kurs guruhiga e'lon</Btn>
              <Btn leftIcon="upload">Material yuklash</Btn>
              <Btn leftIcon="file-plus">Yangi vazifa</Btn>
              <Btn leftIcon="calendar-plus">Live session belgilash</Btn>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
