import { Avatar, Bar, Btn, Card, CardHead, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { STUDENTS } from "@/data/lmsData"

function reasonFor(student: { progress: number; attendance: number; late: number }) {
  if (student.attendance < 70) return "Davomat past va ketma-ket darslar o'tkazib yuborilgan."
  if (student.progress < 45) return "Dars progressi kurs o'rtachasidan sezilarli past."
  if (student.late > 1) return "Topshiriqlar kechikishi ko'paygan."
  return "Qo'shimcha kuzatuv tavsiya qilinadi."
}

function interventionFor(score: number) {
  if (score >= 80) return "24 soat ichida shaxsiy check-in va mentor biriktirish."
  if (score >= 60) return "Haftalik mini-reja va missed lesson reminder."
  return "Avtomatik reminder va keyingi darsda qisqa suhbat."
}

export function TeacherRiskPanel() {
  const riskStudents = STUDENTS.filter((student) => student.risk >= 40).sort((a, b) => b.risk - a.risk)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Risk paneli</h1>
          <p>Risk score, sabab va tavsiya qilingan intervention qo'llab-quvvatlash ohangida ko'rsatiladi.</p>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="red" label="Yuqori risk" value={riskStudents.filter((student) => student.risk >= 75).length} sub="Shaxsiy aloqaga ehtiyoj" />
        <Stat tone="amber" label="O'rta risk" value={riskStudents.filter((student) => student.risk >= 55 && student.risk < 75).length} sub="Reja tavsiya qilinadi" />
        <Stat tone="blue" label="Kuzatuv" value={riskStudents.filter((student) => student.risk < 55).length} sub="Signal pasaymoqda" />
        <Stat tone="green" label="Yaxshi holat" value={STUDENTS.filter((student) => student.risk < 40).length} sub="Faol progress" />
      </div>

      <Card>
        <CardHead title="Risk tinglovchilar ro'yxati" count={riskStudents.length} />
        <div className="card-pad" style={{ display: "grid", gap: 12 }}>
          {riskStudents.map((student) => (
            <div key={student.name} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "grid", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={student.name} tone={student.tone} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800 }}>{student.name}</div>
                  <div style={{ color: "var(--text3)", fontSize: 12 }}>{student.group} · progress {student.progress}% · davomat {student.attendance}%</div>
                </div>
                <Pill tone={student.risk >= 75 ? "red" : student.risk >= 55 ? "amber" : "blue"}>{student.risk} risk</Pill>
              </div>
              <Bar value={student.risk} tone={student.risk >= 75 ? "red" : student.risk >= 55 ? "amber" : "blue"} />
              <div className="grid c-2">
                <div className="note">
                  <b>Reason:</b> {reasonFor(student)}
                </div>
                <div className="note">
                  <b>Recommended intervention:</b> {interventionFor(student.risk)}
                </div>
              </div>
              <div className="cta-row">
                <Btn size="sm" variant="primary" leftIcon="message">Qo'llab-quvvatlash xabari</Btn>
                <Btn size="sm" leftIcon="calendar-plus">Mentor call</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
