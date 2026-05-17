import { useState } from "react"

import { Avatar, Btn, Card, CardHead, Chip, Icon, Pill, Stat, Tabs, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { FLAGGED_CONTENT, QA } from "@/data/lmsData"

function severityTone(severity: string): PillTone {
  if (severity === "high") return "red"
  if (severity === "medium") return "amber"
  return "blue"
}

const TYPE_FILTERS = ["Barchasi", "Q&A", "Izoh", "Fayl"]

export function AdminModeration() {
  const [tab, setTab] = useState("flagged")
  const [typeFilter, setTypeFilter] = useState("Barchasi")

  const appeals = QA.filter((item) => item.flagged)
  const flagged = FLAGGED_CONTENT.filter((item) =>
    typeFilter === "Barchasi" || item.type === typeFilter
  )

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Moderatsiya</h1>
          <p>Flaglangan kontent, apellyatsiya navbati va ko'rib chiqish amallari.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="refresh">Yangilash</Btn>
          <Btn variant="primary" leftIcon="check">Hammasini yopish</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="red"   label="Flaglangan"     value={FLAGGED_CONTENT.length} sub="Ko'rib chiqish kutilmoqda" />
        <Stat tone="amber" label="Apellyatsiya"   value={appeals.length}          sub="Q&A flaglari" />
        <Stat tone="blue"  label="Reviewer SLA"   value={4}   unit="soat"         sub="Ichki maqsad" />
        <Stat tone="green" label="Bugun yopilgan" value={12}                      sub="Moderatsiya yakunlandi" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "flagged",   label: "Flaglangan kontent", icon: "flag",      count: FLAGGED_CONTENT.length },
          { value: "appeals",   label: "Apellyatsiya",       icon: "scale",     count: appeals.length },
          { value: "resolved",  label: "Yopilgan",           icon: "check",     count: 12 },
        ]}
      />

      {tab === "flagged" && (
        <div style={{ marginTop: 10, display: "grid", gap: 14 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {TYPE_FILTERS.map((f) => (
              <Chip key={f} active={typeFilter === f} onClick={() => setTypeFilter(f)}>{f}</Chip>
            ))}
          </div>

          <div className="grid c-7-5">
            <div style={{ display: "grid", gap: 12 }}>
              {flagged.map((item) => (
                <Card key={item.id}>
                  <div className="card-pad">
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                      <span className="thumb">
                        <Icon name={item.type === "Fayl" ? "file" : item.type === "Q&A" ? "messages" : "message"} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700 }}>{item.type}</span>
                          <Pill tone={severityTone(item.severity)}>{item.severity}</Pill>
                        </div>
                        <div style={{ fontWeight: 600 }}>{item.author}</div>
                        <div style={{ color: "var(--text3)", fontSize: 12 }}>{item.reason} · {item.age}</div>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--text3)" }}>{item.action}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn size="sm" variant="success" leftIcon="check">Tasdiqlash</Btn>
                      <Btn size="sm" variant="danger" leftIcon="trash">Olib tashlash</Btn>
                      <Btn size="sm" variant="amber" leftIcon="arrow-up-right">Yuqoriga</Btn>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <CardHead title="Tezkor statistika" />
              <div className="card-pad" style={{ display: "grid", gap: 10 }}>
                {[
                  { label: "Yuqori xavf", count: FLAGGED_CONTENT.filter((f) => f.severity === "high").length, tone: "red" as PillTone },
                  { label: "O'rta xavf", count: FLAGGED_CONTENT.filter((f) => f.severity === "medium").length, tone: "amber" as PillTone },
                  { label: "Q&A flaglari", count: appeals.length, tone: "blue" as PillTone },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "var(--text2)" }}>{item.label}</span>
                    <Pill tone={item.tone}>{item.count}</Pill>
                  </div>
                ))}
                <div className="note" style={{ marginTop: 8 }}>
                  <Icon name="info-circle" />
                  Har bir qaror audit jurnaliga sabab bilan yoziladi.
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "appeals" && (
        <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
          {appeals.map((item) => (
            <Card key={item.id}>
              <div className="card-pad">
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <Avatar name={item.student.name} tone={item.student.tone} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.topic}</div>
                    <div style={{ color: "var(--text2)", fontSize: 13, marginBottom: 8 }}>{item.body}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Pill tone="red" icon="flag">Flaglangan</Pill>
                      <span style={{ color: "var(--text3)", fontSize: 12 }}>{item.course} · {item.age}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn size="sm" variant="success" leftIcon="check">Javob berish</Btn>
                    <Btn size="sm" variant="danger" leftIcon="trash">Olib tashlash</Btn>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {appeals.length === 0 && (
            <div className="empty">
              <Icon name="check-circle" />
              <p>Hech qanday apellyatsiya yo'q</p>
            </div>
          )}
        </div>
      )}

      {tab === "resolved" && (
        <div style={{ marginTop: 10 }}>
          <div className="empty">
            <Icon name="check-circle" />
            <p>Bugun 12 ta moderatsiya amali yakunlandi</p>
          </div>
        </div>
      )}
    </>
  )
}
