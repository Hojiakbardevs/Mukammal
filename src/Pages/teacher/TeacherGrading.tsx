import { useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, Btn, Card, CardHead, Icon, Pill, Toolbar } from "@/components/dashboard/LmsPrimitives"
import { SUBMISSIONS } from "@/data/lmsData"

const rubric = [
  { label: "Kod tozaligi", points: 10, desc: "Notebook yoki repo tartibli, qayta ishga tushadi." },
  { label: "Model tanlovi", points: 10, desc: "Muammo uchun mos model va baseline ko'rsatilgan." },
  { label: "Baholash", points: 10, desc: "Metric, validation va xatolik tahlili bor." },
  { label: "Xulosa", points: 10, desc: "Natija, cheklov va keyingi qadamlar aniq." },
]

export function TeacherGrading() {
  const queue = SUBMISSIONS.filter((submission) => submission.state !== "auto-graded")
  const [selectedId, setSelectedId] = useState(queue[0]?.id ?? "")
  const selected = queue.find((submission) => submission.id === selectedId) ?? queue[0]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Tekshirish navbati</h1>
          <p>Topshiriqlar navbati, rubric panel, ball kiritish va feedback editor.</p>
        </div>
        <div className="page-actions">
          <Link className="btn" to="/teacher/ai-grading">
            <Icon name="sparkles" /> SI nazorati
          </Link>
        </div>
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Topshiriqlar navbati" count={queue.length} />
          <Toolbar>
            <span className="chip active"><Icon name="clock" /> Kutilmoqda</span>
            <span className="chip"><Icon name="flag" /> SI signal</span>
            <span className="chip"><Icon name="gavel" /> Appeal</span>
            <div className="spacer" />
            <Btn size="sm" leftIcon="download">CSV eksport</Btn>
          </Toolbar>
          <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
            <table className="t">
              <thead>
                <tr>
                  <th>Tinglovchi</th>
                  <th>Topshiriq</th>
                  <th>Yuborildi</th>
                  <th className="center">SI taklif</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((submission) => (
                  <tr key={submission.id} className={submission.id === selectedId ? "selected" : ""} onClick={() => setSelectedId(submission.id)} style={{ cursor: "pointer" }}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={submission.student.name} tone={submission.student.tone} size="sm" />
                        <div>
                          <b>{submission.student.name}</b>
                          <div style={{ color: "var(--text3)", fontSize: 11 }}>{submission.student.group}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <b>{submission.title}</b>
                      <div style={{ color: "var(--text3)", fontSize: 11 }}>{submission.course} · {submission.files.length} fayl</div>
                    </td>
                    <td>{submission.submittedAgo}</td>
                    <td className="center">{submission.suggestedScore ? <span className="ai-ribbon"><Icon name="sparkles" /> {submission.suggestedScore}</span> : "Avto"}</td>
                    <td>
                      <Pill tone={submission.state === "ai-flag" ? "red" : submission.state === "appeal" ? "purple" : "amber"}>
                        {submission.state === "ai-flag" ? "SI signal" : submission.state === "appeal" ? "Apellyatsiya" : "Tekshirish"}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="Rubric panel" sub={selected?.title} />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {selected ? (
              <>
                <div className="alert blue">
                  <Icon name="file-text" />
                  <div className="body">
                    <h4>{selected.student.name}</h4>
                    <p>{selected.course} · {selected.points} · {selected.files.join(", ")}</p>
                  </div>
                </div>
                {rubric.map((item) => (
                  <div key={item.label} style={{ display: "grid", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <b>{item.label}</b>
                      <span className="mono">{item.points} ball</span>
                    </div>
                    <p style={{ color: "var(--text2)", fontSize: 12 }}>{item.desc}</p>
                  </div>
                ))}
                <div className="field">
                  <label className="label" htmlFor="score">Ball kiritish</label>
                  <input id="score" className="input" defaultValue={selected.suggestedScore ?? 0} type="number" min={0} max={100} />
                </div>
                <div className="field">
                  <label className="label" htmlFor="feedback">Feedback matni</label>
                  <textarea id="feedback" className="textarea" rows={5} defaultValue="Ish yaxshi tuzilgan. Validation bo'limida metric tanlovi va xatolik tahlilini aniqroq yozing." />
                </div>
                <div className="cta-row">
                  <Btn variant="success" leftIcon="check">Tasdiqlash</Btn>
                  <Btn variant="amber" leftIcon="refresh">Qayta ishlash so'rash</Btn>
                </div>
              </>
            ) : null}
          </div>
        </Card>
      </div>
    </>
  )
}
