import { Btn, Card, CardHead, Icon, Pill, Stat, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { FLAGGED_CONTENT, QA } from "@/data/lmsData"

function severityTone(severity: string): PillTone {
  if (severity === "high") return "red"
  if (severity === "medium") return "amber"
  return "blue"
}

export function AdminModeration() {
  const appeals = QA.filter((item) => item.flagged)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Moderatsiya</h1>
          <p>Flaglangan kontent, apellyatsiya va ko'rib chiqish navbati hamda tasdiqlash, olib tashlash, yuqoriga yuborish amallari.</p>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="red" label="Flaglangan kontent" value={FLAGGED_CONTENT.length} sub="Ko'rib chiqish kutilmoqda" />
        <Stat tone="amber" label="Appeal queue" value={appeals.length} sub="Q&A flaglari" />
        <Stat tone="blue" label="Reviewer SLA" value="4" unit="soat" sub="Ichki maqsad" />
        <Stat tone="green" label="Resolved today" value="12" sub="Moderatsiya yakunlangan" />
      </div>

      <div className="grid c-7-5">
        <Card>
        <CardHead title="Flaglangan kontent" count={FLAGGED_CONTENT.length} />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {FLAGGED_CONTENT.map((item) => (
              <div key={item.id} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "grid", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="thumb"><Icon name={item.type === "Fayl" ? "file" : item.type === "Q&A" ? "messages" : "message"} /></span>
                  <div style={{ flex: 1 }}>
                    <b>{item.type} · {item.author}</b>
                    <div style={{ color: "var(--text3)", fontSize: 12 }}>{item.reason} · {item.age}</div>
                  </div>
                  <Pill tone={severityTone(item.severity)}>{item.severity}</Pill>
                </div>
                <div className="cta-row">
                  <Btn size="sm" variant="success" leftIcon="check">Tasdiqlash</Btn>
                  <Btn size="sm" variant="danger" leftIcon="trash">Olib tashlash</Btn>
                  <Btn size="sm" variant="amber" leftIcon="arrow-up-right">Yuqoriga yuborish</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Apellyatsiya / ko'rib chiqish navbati" count={appeals.length} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {appeals.map((item) => (
              <div key={item.id} className="alert red">
                <Icon name="flag" />
                <div className="body">
                  <h4>{item.topic}</h4>
                  <p>{item.student.name} · {item.body}</p>
                </div>
              </div>
            ))}
            <div className="note">Har bir moderation qarori sabab bilan yopiladi va audit jurnaliga yoziladi.</div>
          </div>
        </Card>
      </div>
    </>
  )
}
