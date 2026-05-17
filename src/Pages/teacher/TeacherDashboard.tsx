import { useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, Bar, Btn, Card, CardHead, Donut, Drawer, Icon, Pill, Spark, Stat } from "@/components/dashboard/LmsPrimitives"
import { COURSES, QA, STUDENTS, SUBMISSIONS, SCHEDULE, type StudentRecord } from "@/data/lmsData"

const SLOTS = ["09:00", "11:00", "14:00", "16:00"]

export function TeacherDashboard() {
  const [studentDrawer, setStudentDrawer] = useState<StudentRecord | null>(null)

  const risky = STUDENTS.filter((s) => s.risk >= 55).sort((a, b) => b.risk - a.risk)
  const pendingQa = QA.filter((item) => item.state === "needs-reply")
  const queue = SUBMISSIONS.filter((s) => s.state !== "auto-graded")
  const today = SCHEDULE.filter((item) => item.day === 0)

  const avgCompletion = Math.round(COURSES.reduce((s, c) => s + c.progress, 0) / COURSES.length)
  const totalActive = COURSES.reduce((s, c) => s + c.studentsActive, 0)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Trener boshqaruv paneli</h1>
          <p>Bugungi fokus: tekshirish navbati, darslar, risk signallari va Q&A.</p>
        </div>
        <div className="page-actions">
          <Link className="btn" to="/teacher/grading">
            <Icon name="file-check" /> Tekshirish
          </Link>
          <Link className="btn btn-primary" to="/teacher/schedule">
            <Icon name="calendar-time" /> Jadval
          </Link>
        </div>
      </div>

      {/* ── Ogohlantiruv banneri ── */}
      <div className="alert amber" style={{ marginBottom: 14 }}>
        <Icon name="alert-triangle" />
        <div className="body">
          <h4>Bugungi fokus ogohlantirishi</h4>
          <p>Lab 4 bo'yicha <b>{queue.length}</b> ta ish tekshirish kutmoqda, <b>{risky.length}</b> nafar tinglovchiga erta yordam signali bor.</p>
        </div>
        <Link className="btn btn-sm btn-primary" to="/teacher/grading">
          <Icon name="arrow-right" /> Boshlash
        </Link>
      </div>

      {/* ── KPI ── */}
      <div className="stat-grid cols-5" style={{ marginBottom: 14 }}>
        <Stat tone="blue"   label="Tekshirish navbati" value={queue.length}    sub="4 ta yuqori prioritet" />
        <Stat tone="amber"  label="Q&A kutilmoqda"     value={pendingQa.length} sub="2 tasi bugun kelgan" />
        <Stat tone="red"    label="Risk signal"         value={risky.length}   sub="Yordam kerak" />
        <Stat tone="green"  label="Faol tinglovchi"    value={totalActive}     sub="Barcha kurslar" />
        <Stat tone="purple" label="O'rt. progress"     value={avgCompletion}  unit="%" sub="Kurs kesimida" />
      </div>

      {/* ── Asosiy panellar ── */}
      <div className="grid c-7-5">
        {/* Kurs progress */}
        <Card>
          <CardHead title="Kurs progress va oqimlar" actions={<Pill tone="blue">{COURSES.length} ta kurs</Pill>} />
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            {COURSES.map((course) => (
              <div key={course.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{course.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>{course.learningStream} · {course.studentsActive} faol</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="num" style={{ fontWeight: 800 }}>{course.progress}%</div>
                    <Pill tone={course.progress >= 70 ? "green" : "blue"} dot>{course.nextSession}</Pill>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Bar value={course.progress} tone={course.progress >= 70 ? "green" : "blue"} />
                  <Spark data={course.trend} tone={course.progress >= 70 ? "green" : "blue"} height={28} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bugungi jadval */}
        <Card>
          <CardHead title="Bugungi jadval" sub="Dushanba · 16-May" />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {today.length === 0 ? (
              <div className="empty">
                <Icon name="calendar-x" />
                <p>Bugun dars yo'q</p>
              </div>
            ) : (
              today.map((session) => (
                <div key={`${session.course}-${session.slot}`} className="alert blue">
                  <Icon name={session.kind === "live" ? "video" : session.kind === "lab" ? "flask" : "chalkboard"} />
                  <div className="body">
                    <h4>{session.course.split(" ")[0]}</h4>
                    <p>{SLOTS[session.slot]} · {session.group} · {session.room}</p>
                  </div>
                  <Pill tone={session.kind === "exam" ? "red" : session.kind === "live" ? "purple" : "blue"}>
                    {session.kind}
                  </Pill>
                </div>
              ))
            )}
            <div className="alert green">
              <Icon name="checkup-list" />
              <div className="body">
                <h4>Ochiq maslahat vaqti</h4>
                <p>Chorshanba · Online · Barcha oqimlar</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Risk + Tekshirish + Q&A ── */}
      <div className="grid c-3" style={{ marginTop: 14 }}>
        {/* Riskdagi tinglovchilar */}
        <Card>
          <CardHead
            title="Risk ostida"
            count={risky.length}
            actions={<Link className="btn btn-sm btn-ghost" to="/teacher/risk">Barchasi</Link>}
          />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {risky.slice(0, 4).map((student) => (
              <div
                key={student.name}
                style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                onClick={() => setStudentDrawer(student)}
              >
                <Avatar name={student.name} tone={student.tone} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{student.name}</div>
                  <div style={{ color: "var(--text3)", fontSize: 11 }}>
                    {student.group} · {student.progress}% progress · {student.attendance}% davomat
                  </div>
                </div>
                <Pill tone={student.risk >= 75 ? "red" : "amber"}>{student.risk}</Pill>
              </div>
            ))}
          </div>
        </Card>

        {/* Tekshirish navbati */}
        <Card>
          <CardHead
            title="Tekshirish navbati"
            count={queue.length}
            actions={<Link className="btn btn-sm btn-primary" to="/teacher/grading">Ochish</Link>}
          />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {queue.slice(0, 4).map((sub) => (
              <div key={sub.id} className="alert">
                <span className="thumb">
                  <Icon name={sub.type === "project" ? "presentation" : sub.type === "quiz" ? "help-circle" : "file-text"} />
                </span>
                <div className="body">
                  <h4>{sub.title}</h4>
                  <p>{sub.student.name} · {sub.submittedAgo} oldin</p>
                </div>
                <Pill tone={sub.state === "ai-flag" ? "red" : sub.state === "appeal" ? "purple" : "amber"}>
                  {sub.state === "ai-flag" ? "SI" : sub.state === "appeal" ? "Appeal" : "Kutilmoqda"}
                </Pill>
              </div>
            ))}
          </div>
        </Card>

        {/* Q&A + SI signal */}
        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <Card>
            <CardHead
              title="Q&A javob kutmoqda"
              count={pendingQa.length}
              actions={<Link className="btn btn-sm btn-ghost" to="/teacher/qa">Barchasi</Link>}
            />
            <div className="card-pad" style={{ display: "grid", gap: 8 }}>
              {pendingQa.slice(0, 3).map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={item.student.name} tone={item.student.tone} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{item.topic.slice(0, 36)}…</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{item.course.split(" ")[0]} · {item.age}</div>
                  </div>
                  {item.flagged && <Icon name="flag" style={{ color: "#ef4444" }} />}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="ai-ribbon">
              <Icon name="sparkles" />
              SI tavsiyasi
            </div>
            <div className="card-pad">
              <div className="note">
                Lab 4 uchun SI 3 ta ishga plagiat signali bergan. Tekshiruv navbatini ko'rib chiqing va manual qaror qiling.
              </div>
              <Link className="btn btn-sm btn-primary" to="/teacher/ai-grading" style={{ marginTop: 10, display: "inline-flex" }}>
                <Icon name="brain" /> SI nazorati
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Tinglovchi drawer ── */}
      <Drawer
        open={studentDrawer !== null}
        onClose={() => setStudentDrawer(null)}
        title="Tinglovchi kartochkasi"
        footer={
          <>
            <Btn variant="primary" leftIcon="message">Yordam xabari</Btn>
            <Btn variant="ghost" leftIcon="calendar-plus">Mentor call</Btn>
          </>
        }
      >
        {studentDrawer && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Avatar name={studentDrawer.name} tone={studentDrawer.tone} size="lg" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{studentDrawer.name}</div>
                <div style={{ color: "var(--text2)" }}>{studentDrawer.group}</div>
                <div style={{ marginTop: 6 }}>
                  <Pill tone={studentDrawer.risk >= 75 ? "red" : "amber"}>
                    Risk: {studentDrawer.risk}
                  </Pill>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ textAlign: "center", padding: "14px 0" }}>
                <Donut
                  value={studentDrawer.progress}
                  tone="#3b82f6"
                  size={80}
                  stroke={10}
                  center={
                    <div>
                      <div className="num" style={{ fontSize: 16, fontWeight: 800 }}>{studentDrawer.progress}%</div>
                      <div style={{ fontSize: 10, color: "var(--text3)" }}>progress</div>
                    </div>
                  }
                />
              </div>
              <div style={{ textAlign: "center", padding: "14px 0" }}>
                <Donut
                  value={studentDrawer.attendance}
                  tone={studentDrawer.attendance >= 80 ? "#22c55e" : "#f59e0b"}
                  size={80}
                  stroke={10}
                  center={
                    <div>
                      <div className="num" style={{ fontSize: 16, fontWeight: 800 }}>{studentDrawer.attendance}%</div>
                      <div style={{ fontSize: 10, color: "var(--text3)" }}>davomat</div>
                    </div>
                  }
                />
              </div>
            </div>

            <dl className="kv-list">
              <div><dt>O'rtacha ball</dt><dd className="num">{studentDrawer.gpa}%</dd></div>
              <div><dt>Kechikkan topshiriq</dt><dd className="num">{studentDrawer.late} ta</dd></div>
              <div><dt>Trend</dt><dd>
                <Pill tone={studentDrawer.trend === "up" ? "green" : studentDrawer.trend === "down" ? "red" : "gray"}>
                  {studentDrawer.trend === "up" ? "Yaxshilanmoqda" : studentDrawer.trend === "down" ? "Yomonlashmoqda" : "Barqaror"}
                </Pill>
              </dd></div>
            </dl>

            <div className="note">
              <Icon name="brain" />
              SI tavsiyasi: Davomat va progress indikatorlari asosida erta yordam rejasi tavsiya qilinadi.
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
