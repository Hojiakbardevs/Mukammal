import { Link } from "react-router-dom"

import { Bar, Btn, Card, CardHead, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { SUBMISSIONS } from "@/data/lmsData"

const evidence = [
  { label: "Kod ishlashi", score: 8, text: "Notebook yakunidan oldin barcha cell qayta ishga tushirilgan." },
  { label: "Metric tanlovi", score: 6, text: "MAE va RMSE bor, lekin cross-validation yozilmagan." },
  { label: "Xulosa", score: 4, text: "Xulosa qisqa, model cheklovlari alohida ajratilmagan." },
]

export function TeacherAIGrading() {
  const candidate = SUBMISSIONS.find((submission) => submission.state === "needs-grade") ?? SUBMISSIONS[0]
  const confidence = candidate.confidence ?? 84

  return (
    <>
      <div className="page-head">
        <div>
          <h1>SI baholash nazorati</h1>
          <p>SI suggested scores, confidence score, evidence highlights va teacher override flow.</p>
        </div>
        <div className="page-actions">
          <Link className="btn" to="/teacher/grading">
            <Icon name="arrow-left" /> Navbatga qaytish
          </Link>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="purple" label="SI taklif" value={candidate.suggestedScore ?? 0} sub={candidate.title} />
        <Stat tone="blue" label="Confidence" value={confidence} unit="%" sub="Dalillar soni: 3" />
        <Stat tone="amber" label="Human override" value="1" sub="Majburiy tasdiq kerak" />
        <Stat tone="green" label="Rubric" value={candidate.rubric} sub="Kriteriya" />
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Dalillar" actions={<Pill tone="purple" icon="sparkles">SI</Pill>} />
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            <div className="alert blue">
              <Icon name="user" />
              <div className="body">
                <h4>{candidate.student.name} · {candidate.title}</h4>
                <p>{candidate.course} · {candidate.submittedAgo} oldin · {candidate.files.join(", ")}</p>
              </div>
            </div>
            {evidence.map((item) => (
              <div key={item.label} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <b>{item.label}</b>
                  <Pill tone={item.score >= 8 ? "green" : item.score >= 6 ? "amber" : "red"}>{item.score}/10</Pill>
                </div>
                <p style={{ color: "var(--text2)", fontSize: 12 }}>{item.text}</p>
                <Bar value={item.score * 10} tone={item.score >= 8 ? "green" : item.score >= 6 ? "amber" : "red"} thin />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Trener override flow" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            <div className="field">
              <label className="label" htmlFor="ai-score">SI score</label>
              <input id="ai-score" className="input" type="number" value={candidate.suggestedScore ?? 0} readOnly />
            </div>
            <div className="field">
              <label className="label" htmlFor="teacher-score">Trener override</label>
              <input id="teacher-score" className="input" type="number" defaultValue={(candidate.suggestedScore ?? 0) + 2} min={0} max={100} />
            </div>
            <div className="field">
              <label className="label" htmlFor="override-reason">Override sababi</label>
              <textarea id="override-reason" className="textarea" rows={5} defaultValue="Tinglovchi xulosada kamchilik qoldirgan, lekin notebookda qo'shimcha tajriba ko'rsatilgan. Yakuniy ballni 2 ball oshirish asosli." />
            </div>
            <div className="alert amber">
              <Icon name="shield-check" />
              <div className="body">
                <h4>Human oversight</h4>
                <p>SI taklifi avtomatik yakuniy bahoga aylanmaydi. Har bir override audit logga yoziladi.</p>
              </div>
            </div>
            <div className="cta-row">
              <Btn variant="success" leftIcon="check">Tasdiqlash</Btn>
              <Btn variant="danger" leftIcon="x">Rad etish</Btn>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
