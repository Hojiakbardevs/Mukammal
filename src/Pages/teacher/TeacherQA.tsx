import { useState } from "react"
import {
  Avatar, Btn, Card, Chip, Icon, Pill, Tabs, Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { QA, type QAItem } from "@/data/lmsData"

const AI_DRAFT: Record<string, string> = {
  "qa-101": "Validation loss qayta ko'tarila boshlasa bu overfitting signali. Avval train/val split to'g'ri ajratilganini tekshiring, keyin regularization (dropout, L2), early stopping va data leakage ehtimolini ko'rib chiqing.",
  "qa-102": "Multi-stage build to'g'ri yo'lda, lekin lekin base image hajmiga ham e'tibor bering. python:3.11-slim ishlatib ko'ring va dev-dependency'larni final stage'ga ko'chirmang.",
  "qa-105": "ML lifecycle uchun Kubeflow bevosita ML pipeline'ga mo'ljallangan (experiments, tuning, serving). Airflow umumiy data engineering uchun kuchliroq. Agar ML-centric bo'lsa — Kubeflow.",
}

export function TeacherQA() {
  const [tab, setTab]     = useState("pending")
  const [replies, setReplies] = useState<Record<string, string>>(
    Object.fromEntries(QA.map((q) => [q.id, AI_DRAFT[q.id] ?? ""]))
  )
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const pending   = QA.filter((q) => q.state === "needs-reply" && !q.flagged && !dismissed.has(q.id))
  const flagged   = QA.filter((q) => q.flagged && !dismissed.has(q.id))
  const answered  = QA.filter((q) => q.state === "answered")
  const all       = QA.filter((q) => !dismissed.has(q.id))

  const visible: QAItem[] =
    tab === "pending"  ? pending :
    tab === "flagged"  ? flagged :
    tab === "answered" ? answered : all

  function dismiss(id: string) {
    setDismissed((prev) => new Set([...prev, id]))
  }

  return (
    <>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "pending",  label: "Javob kutilmoqda", icon: "message-question", count: pending.length },
          { value: "flagged",  label: "Flag qilingan",    icon: "flag",             count: flagged.length },
          { value: "answered", label: "Javoblangan",      icon: "message-check",    count: answered.length },
          { value: "all",      label: "Hammasi",          icon: "list",             count: all.length },
        ]}
      />

      <Card style={{ marginTop: 10 }}>
        <Toolbar>
          <select className="select" style={{ width: 200 }}>
            <option>Kurs: Hammasi</option>
            <option>Sun'iy intellekt asoslari</option>
            <option>Production muhitida ML</option>
            <option>Tabiiy tilni qayta ishlash</option>
          </select>
          <Chip icon="arrow-up">Eng ko'p ovoz</Chip>
          <Chip icon="clock">Eng eski</Chip>
          <div className="spacer" />
          {tab === "pending" && (
            <Btn size="sm" leftIcon="sparkles" variant="primary">AI bilan tushuntirish drafti</Btn>
          )}
          {tab === "flagged" && (
            <Btn size="sm" variant="danger" leftIcon="trash">Spam — hammasini o'chirish</Btn>
          )}
        </Toolbar>

        <div style={{ padding: "10px 16px", display: "grid", gap: 12 }}>
          {visible.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "#8a93a6" }}>
              <Icon name="message-check" />
              <div style={{ marginTop: 8 }}>Bu bo'limda savol yo'q</div>
            </div>
          )}

          {visible.map((item) => (
            <div
              key={item.id}
              style={{
                border: `1px solid ${item.flagged ? "#fca5a5" : "var(--border)"}`,
                borderRadius: 12,
                background: item.flagged ? "#fff7f7" : "#fff",
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Avatar name={item.student.name} tone={item.student.tone} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{item.topic}</span>
                    {item.flagged && (
                      <Pill tone="red" icon="flag">Flag qilingan</Pill>
                    )}
                    {item.state === "answered" && !item.flagged && (
                      <Pill tone="green" icon="check">Javoblangan</Pill>
                    )}
                  </div>
                  <div style={{ fontSize: 11.5, color: "#8a93a6" }}>
                    {item.student.name} · {item.course} · {item.age} oldin ·{" "}
                    <Icon name="arrow-up" style={{ display: "inline", fontSize: 11 }} /> {item.votes} ovoz
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "0 16px 14px" }}>
                <p style={{ fontSize: 13, color: "#334155", margin: 0 }}>{item.body}</p>
              </div>

              {/* Pending reply area */}
              {item.state === "needs-reply" && !item.flagged && (
                <div
                  style={{
                    borderTop: "1px solid var(--hairline)",
                    padding: "14px 16px",
                    background: "#f9fafb",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>Javob</div>
                    {AI_DRAFT[item.id] && (
                      <Pill tone="purple">
                        <Icon name="sparkles" /> AI taklif drafti tayyor
                      </Pill>
                    )}
                  </div>
                  <textarea
                    className="input"
                    rows={3}
                    value={replies[item.id] ?? ""}
                    placeholder="Javob yozing…"
                    onChange={(e) =>
                      setReplies((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <Btn size="sm" variant="primary" leftIcon="send">Javob yuborish</Btn>
                    <Btn size="sm" leftIcon="message-check">Javoblangan deb belgilash</Btn>
                    <Btn size="sm" variant="ghost" leftIcon="message">Talabaga yozish</Btn>
                  </div>
                </div>
              )}

              {/* Flagged action bar */}
              {item.flagged && (
                <div
                  style={{
                    borderTop: "1px solid #fca5a5",
                    padding: "12px 16px",
                    background: "#fff1f1",
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Btn size="sm" variant="danger" leftIcon="trash" onClick={() => dismiss(item.id)}>
                    Spam — o'chirish
                  </Btn>
                  <Btn size="sm" variant="amber" leftIcon="alert-triangle">
                    Muallifni ogohlantirish
                  </Btn>
                  <Btn size="sm" variant="ghost" leftIcon="refresh" onClick={() => dismiss(item.id)}>
                    Yolg'on signal — qayta tikla
                  </Btn>
                </div>
              )}

              {/* Answered — show existing answer stub */}
              {item.state === "answered" && !item.flagged && (
                <div
                  style={{
                    borderTop: "1px solid var(--hairline)",
                    padding: "12px 16px",
                    background: "#f0fdf4",
                    fontSize: 12.5,
                    color: "#166534",
                  }}
                >
                  <Icon name="check" /> Javob yuborildi · Tahrirlash uchun bosing
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card-foot">
          <span>
            {visible.length} savol ko'rsatilmoqda · so'nggi yangilanish: hozir
          </span>
          <div className="cta-row">
            <Btn size="sm" leftIcon="download">Eksport</Btn>
          </div>
        </div>
      </Card>
    </>
  )
}
