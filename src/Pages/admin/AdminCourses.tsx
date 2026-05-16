import { Btn, Card, CardHead, Icon, Pill, Stat, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { COURSES, LEARNING_STREAMS } from "@/data/lmsData"

function statusTone(status: string): PillTone {
  if (status === "published") return "green"
  if (status === "draft") return "amber"
  if (status === "paused") return "red"
  return "gray"
}

function statusLabel(status: string) {
  if (status === "published") return "E'lon qilingan"
  if (status === "draft") return "Qoralama"
  if (status === "paused") return "Pauza"
  return "Arxiv"
}

export function AdminCourses() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Kurslar va o'quv oqimlari</h1>
          <p>Barcha kurslar jadvali, status, trener, o'quv oqimi, tinglovchilar soni va e'lon qilish amallari.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="plus">Yangi kurs</Btn>
          <Btn variant="primary" leftIcon="upload">Import</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Kurslar" value={COURSES.length} sub="Platformada" />
        <Stat tone="green" label="E'lon qilingan" value={COURSES.filter((course) => course.status === "published").length} sub="Faol ta'limda" />
        <Stat tone="amber" label="Qoralama" value={COURSES.filter((course) => course.status === "draft").length} sub="Tekshiruvda" />
        <Stat tone="purple" label="O'quv oqimlari" value={LEARNING_STREAMS.length} sub="Aktiv oqimlar" />
      </div>

      <Card>
        <CardHead title="Barcha kurslar jadvali" />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Trener</th>
                <th>O'quv oqimi</th>
                <th className="center">Tinglovchi</th>
                <th className="center">Progress</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course) => (
                <tr key={course.id}>
                  <td><b>{course.title}</b><div style={{ color: "var(--text3)", fontSize: 11 }}>{course.modules} modul · {course.lessons} dars</div></td>
                  <td>{course.teacher}</td>
                  <td>{course.learningStream}</td>
                  <td className="center mono">{course.studentsActive} / {course.studentsTotal}</td>
                  <td className="center"><Pill tone={course.progress >= 70 ? "green" : "blue"}>{course.progress}%</Pill></td>
                  <td><Pill tone={statusTone(course.status)}>{statusLabel(course.status)}</Pill></td>
                  <td className="right">
                    <Btn size="sm" variant={course.status === "published" ? "danger" : "primary"} leftIcon={course.status === "published" ? "eye-off" : "upload"}>
                      {course.status === "published" ? "Yashirish" : "E'lon qilish"}
                    </Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card style={{ marginTop: 14 }}>
        <CardHead title="O'quv oqimlari" />
        <div className="card-pad" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {LEARNING_STREAMS.map((stream) => (
            <div key={stream.id} className="alert">
              <Icon name="users-group" />
              <div className="body">
                <h4>{stream.name}</h4>
                <p>{stream.course} · {stream.startDate} - {stream.endDate}</p>
              </div>
              <Pill tone={stream.atRisk > 4 ? "red" : "green"}>{stream.students} ta</Pill>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
