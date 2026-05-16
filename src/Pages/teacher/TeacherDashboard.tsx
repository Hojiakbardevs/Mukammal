import { Link } from "react-router-dom"

import { Avatar, Bar, Btn, Card, CardHead, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { COURSES, QA, STUDENTS, SUBMISSIONS, SCHEDULE } from "@/data/lmsData"

export function TeacherDashboard() {
  const risky = STUDENTS.filter((student) => student.risk >= 55)
  const pendingQa = QA.filter((item) => item.state === "needs-reply")
  const queue = SUBMISSIONS.filter((submission) => submission.state !== "auto-graded")
  const today = SCHEDULE.filter((item) => item.day === 0)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Trener dashboard</h1>
          <p>Bugungi fokus: tekshirish navbati, darslar, risk signallari va Q&A javoblari.</p>
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

      <div className="alert amber" style={{ marginBottom: 14 }}>
        <Icon name="alert-triangle" />
        <div className="body">
          <h4>Bugungi fokus ogohlantirishi</h4>
          <p>Lab 4 bo'yicha {queue.length} ta ish tekshirish kutmoqda, {risky.length} nafar tinglovchiga erta yordam signali bor.</p>
        </div>
        <Btn size="sm" variant="primary" leftIcon="arrow-right">Ishni boshlash</Btn>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Tekshirish navbati" value={queue.length} sub="4 ta yuqori prioritet" />
        <Stat tone="amber" label="Q&A pending" value={pendingQa.length} sub="2 tasi bugun kelgan" />
        <Stat tone="red" label="Risk signal" value={risky.length} sub="Qo'llab-quvvatlash kerak" />
        <Stat tone="green" label="Bugungi sessiya" value={today.length} sub="1 online, 1 offline" />
      </div>

      <div className="grid c-8-4">
        <Card>
          <CardHead title="Kurs progress kartalari" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {COURSES.slice(0, 3).map((course) => (
              <div key={course.id} className="alert">
                <Icon name="books" />
                <div className="body">
                  <h4>{course.title}</h4>
                  <p>{course.learningStream} · {course.studentsActive}/{course.studentsTotal} faol</p>
                  <Bar value={course.progress} tone={course.progress >= 70 ? "green" : "blue"} thin />
                </div>
                <Pill tone={course.status === "published" ? "green" : "amber"}>{course.progress}%</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Bugungi jadval" />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {today.map((session) => (
              <div key={`${session.course}-${session.slot}`} className="alert blue">
                <Icon name={session.kind === "live" ? "video" : "chalkboard"} />
                <div className="body">
                  <h4>{session.course}</h4>
                  <p>{session.group} · {session.room} · slot {session.slot + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid c-2" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Riskdagi tinglovchilar" count={risky.length} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {risky.slice(0, 4).map((student) => (
              <div key={student.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={student.name} tone={student.tone} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{student.name}</div>
                  <div style={{ color: "var(--text3)", fontSize: 12 }}>{student.group} · progress {student.progress}% · davomat {student.attendance}%</div>
                </div>
                <Pill tone={student.risk > 75 ? "red" : "amber"}>{student.risk}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Q&A javob kutilmoqda" count={pendingQa.length} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {pendingQa.slice(0, 4).map((item) => (
              <div key={item.id} className="alert">
                <Icon name={item.flagged ? "flag" : "message"} />
                <div className="body">
                  <h4>{item.topic}</h4>
                  <p>{item.course} · {item.age} · {item.votes} ovoz</p>
                </div>
                <Pill tone={item.flagged ? "red" : "blue"}>{item.flagged ? "Flag" : "Javob"}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
