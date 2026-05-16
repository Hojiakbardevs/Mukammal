import { Bar, Card, CardHead, Donut, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { ME, MY_GRADES } from "@/data/studentData"

const componentLabels = {
  attendance: "Davomat",
  quiz: "Quiz",
  homework: "Uy ishi",
  exam: "Oraliq",
  final: "Final",
} satisfies Record<string, string>

export function StudentGrades() {
  const best = MY_GRADES.byCourse.reduce((top, item) => (item.current > top.current ? item : top), MY_GRADES.byCourse[0])
  const finalScore = Math.round(MY_GRADES.byCourse.reduce((sum, item) => sum + item.current, 0) / MY_GRADES.byCourse.length)
  const weightEntries = Object.entries(MY_GRADES.byCourse[1].weights) as Array<[keyof typeof componentLabels, number]>

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Mening baholarim</h1>
          <p>Har bir kurs bo'yicha komponent vaznlari, joriy ball va trener feedbacklari.</p>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="green" label="Umumiy o'rtacha" value={finalScore} unit="%" sub="4 ta kurs kesimida" />
        <Stat tone="blue" label="Eng yuqori kurs" value={best.current} unit="%" sub={best.course} />
        <Stat tone="amber" label="Maqsad" value={ME.avgScore + 6} unit="%" sub="AI Track sertifikati uchun" />
        <Stat tone="purple" label="Feedback" value={MY_GRADES.byCourse.length} sub="Trener izohlari mavjud" />
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Baholar jurnali" />
          <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
            <table className="t">
              <thead>
                <tr>
                  <th>Kurs</th>
                  <th className="center">Davomat</th>
                  <th className="center">Quiz</th>
                  <th className="center">Uy ishi</th>
                  <th className="center">Oraliq</th>
                  <th className="center">Final</th>
                  <th className="center">Joriy</th>
                </tr>
              </thead>
              <tbody>
                {MY_GRADES.byCourse.map((row) => (
                  <tr key={row.course}>
                    <td><b>{row.course}</b></td>
                    <td className="center mono">{row.components.attendance}</td>
                    <td className="center mono">{row.components.quiz}</td>
                    <td className="center mono">{row.components.homework}</td>
                    <td className="center mono">{row.components.exam}</td>
                    <td className="center mono">{row.components.final}</td>
                    <td className="center"><Pill tone={row.current >= row.target ? "green" : "amber"}>{row.current}%</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="Yakuniy ball" actions={<Pill tone="blue">Joriy</Pill>} />
          <div className="card-pad" style={{ display: "grid", placeItems: "center", gap: 14 }}>
            <Donut
              value={finalScore}
              tone="#16a34a"
              center={
                <div>
                  <div className="num" style={{ fontSize: 24, fontWeight: 800 }}>{finalScore}%</div>
                  <div style={{ color: "var(--text3)", fontSize: 11 }}>o'rtacha</div>
                </div>
              }
            />
            <div style={{ width: "100%", display: "grid", gap: 10 }}>
              {weightEntries.map(([key, value]) => (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span>{componentLabels[key]}</span>
                    <b>{value}%</b>
                  </div>
                  <Bar value={value * 4} tone="blue" thin />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="card-pad" >
        <CardHead title="Trener feedbacklari" />
        <div style={{ display: "grid", gap: 10 }}>
          {MY_GRADES.byCourse.map((row) => (
            <div key={row.course} className="alert">
              <Icon name="message-check" />
              <div className="body">
                <h4>{row.course}</h4>
                <p>{row.feedback}</p>
              </div>
              <Pill tone={row.current >= row.target ? "green" : "amber"}>{row.current}% / maqsad {row.target}%</Pill>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
