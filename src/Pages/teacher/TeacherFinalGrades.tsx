import { Btn, Card, CardHead, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { FINAL_GRADES } from "@/data/lmsData"

function gradeLetter(score: number) {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  return "D"
}

export function TeacherFinalGrades() {
  const approved = FINAL_GRADES.filter((row) => row.approval === "Tasdiqlangan").length

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Yakuniy baholar</h1>
          <p>Final grade table, export va approval status bir joyda.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="download">CSV eksport</Btn>
          <Btn variant="primary" leftIcon="stamp">Approval yuborish</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Tinglovchi" value={FINAL_GRADES.length} sub="NLP-26" />
        <Stat tone="green" label="Tasdiqlangan" value={approved} sub="Registrar kutmoqda" />
        <Stat tone="amber" label="Ko'rib chiqish" value={FINAL_GRADES.length - approved} sub="Trener nazoratida" />
        <Stat tone="purple" label="O'rtacha" value={Math.round(FINAL_GRADES.reduce((sum, row) => sum + row.finalScore, 0) / FINAL_GRADES.length)} unit="%" sub="Joriy hisob" />
      </div>

      <Card>
        <CardHead title="Final grade table" />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Tinglovchi</th>
                <th className="center">Davomat</th>
                <th className="center">Topshiriq</th>
                <th className="center">Quiz</th>
                <th className="center">Final loyiha</th>
                <th className="center">Yakuniy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {FINAL_GRADES.map((row) => (
                <tr key={row.id}>
                  <td><b>{row.student.name}</b><div style={{ color: "var(--text3)", fontSize: 11 }}>{row.student.group}</div></td>
                  <td className="center mono">{row.attendance}</td>
                  <td className="center mono">{row.assignments}</td>
                  <td className="center mono">{row.quizzes}</td>
                  <td className="center mono">{row.finalProject}</td>
                  <td className="center">
                    <Pill tone={row.finalScore >= 80 ? "green" : row.finalScore >= 70 ? "blue" : "amber"}>
                      {gradeLetter(row.finalScore)} · {row.finalScore}%
                    </Pill>
                  </td>
                  <td><Pill tone={row.approval === "Tasdiqlangan" ? "green" : "amber"}>{row.approval}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-foot">
          <span><Icon name="lock" /> Yakuniy baho o'zgarsa audit logga yoziladi.</span>
          <span>Eksport tayyor</span>
        </div>
      </Card>
    </>
  )
}
