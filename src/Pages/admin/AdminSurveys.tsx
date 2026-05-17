import { useState } from "react"

import { Bar, Btn, Card, CardHead, Donut, Icon, Pill, Stat, Tabs, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { SURVEYS } from "@/data/lmsData"

function statusTone(status: string): PillTone {
  if (status === "active") return "green"
  if (status === "draft") return "amber"
  return "gray"
}

function statusLabel(status: string) {
  if (status === "active") return "Faol"
  if (status === "draft") return "Qoralama"
  return "Yopiq"
}

function npsColor(nps: number): PillTone {
  return nps >= 60 ? "green" : nps > 0 ? "amber" : "gray"
}

const BUILDER_FIELDS = [
  { label: "NPS savoli", type: "rating", icon: "star", required: true },
  { label: "Trener feedback", type: "choice", icon: "list", required: true },
  { label: "Platforma qulayligi", type: "choice", icon: "device-laptop", required: false },
  { label: "Ochiq izoh", type: "text", icon: "message", required: false },
]

export function AdminSurveys() {
  const [tab, setTab] = useState("list")
  const [listTab, setListTab] = useState("active")

  const activeSurvey = SURVEYS.find((s) => s.status === "active")
  const surveysInTab = SURVEYS.filter((s) => s.status === listTab)
  const totalResponses = SURVEYS.reduce((s, sv) => s + sv.responses, 0)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>So'rovnomalar</h1>
          <p>NPS monitoring, so'rovnoma konstruktori va javoblar tahlili.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="plus">Yangi so'rovnoma</Btn>
          <Btn variant="primary" leftIcon="send">Publish</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue"   label="Jami so'rovnoma" value={SURVEYS.length}     sub="Barcha holatlar" />
        <Stat tone="green"  label="Faol"             value={SURVEYS.filter((s) => s.status === "active").length} sub="Hozirda ochiq" />
        <Stat tone="amber"  label="Jami javob"       value={totalResponses}     sub="Hamma so'rovnomalar" />
        <Stat tone="purple" label="O'rt. NPS"        value={activeSurvey?.nps ?? 0} sub={activeSurvey?.title ?? "—"} />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "list",     label: "Ro'yxat",      icon: "clipboard-list" },
          { value: "builder",  label: "Konstruktor",  icon: "forms" },
          { value: "analytics", label: "Tahlil",      icon: "chart-bar" },
        ]}
      />

      {tab === "list" && (
        <div style={{ marginTop: 10 }}>
          <Tabs
            value={listTab}
            onChange={setListTab}
            items={[
              { value: "active", label: "Faol",     icon: "player-play", count: SURVEYS.filter((s) => s.status === "active").length },
              { value: "draft",  label: "Qoralama", icon: "edit",        count: SURVEYS.filter((s) => s.status === "draft").length },
              { value: "closed", label: "Yopiq",    icon: "lock",        count: SURVEYS.filter((s) => s.status === "closed").length },
            ]}
          />
          <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
            {surveysInTab.length === 0 ? (
              <div className="empty">
                <Icon name="clipboard-x" />
                <p>Bu bo'limda so'rovnoma yo'q</p>
              </div>
            ) : (
              surveysInTab.map((survey) => (
                <Card key={survey.id}>
                  <div className="card-pad">
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <span className="thumb">
                        <Icon name="clipboard-list" />
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{survey.title}</span>
                          <Pill tone={statusTone(survey.status)}>{statusLabel(survey.status)}</Pill>
                          {survey.nps > 0 && <Pill tone={npsColor(survey.nps)}>NPS {survey.nps}</Pill>}
                        </div>
                        <div style={{ color: "var(--text2)", fontSize: 13, marginBottom: 10 }}>
                          {survey.responses} javob · completion {survey.completion}%
                        </div>
                        <Bar value={survey.completion} tone={survey.completion >= 70 ? "green" : "amber"} thin />
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Btn size="sm" variant="ghost" leftIcon="eye">Ko'rish</Btn>
                        <Btn size="sm" variant="ghost" leftIcon="pencil">Tahrirlash</Btn>
                        {survey.status === "draft" && (
                          <Btn size="sm" variant="primary" leftIcon="send">Publish</Btn>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "builder" && (
        <div className="grid c-7-5" style={{ marginTop: 10 }}>
          <Card>
            <CardHead title="So'rovnoma konstruktori" actions={<Pill tone="amber">Qoralama</Pill>} />
            <div className="card-pad" style={{ display: "grid", gap: 10 }}>
              {BUILDER_FIELDS.map((field, index) => (
                <div key={field.label} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ width: 28, height: 28, borderRadius: 6, background: "var(--bg2)", display: "grid", placeItems: "center", color: "var(--text3)", fontWeight: 700, fontSize: 13 }}>
                    {index + 1}
                  </span>
                  <span className="thumb">
                    <Icon name={field.icon} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{field.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>
                      {field.type === "rating" ? "1–10 ball" : field.type === "choice" ? "Ko'p tanlov" : "Ochiq matn"} ·
                      {field.required ? " Majburiy" : " Ixtiyoriy"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Btn size="xs" variant="ghost" leftIcon="pencil">Tahrirlash</Btn>
                    <Btn size="xs" variant="ghost" leftIcon="grip-vertical">Ko'chirish</Btn>
                  </div>
                </div>
              ))}
              <Btn variant="ghost" leftIcon="plus" size="sm">Savol qo'shish</Btn>
            </div>
            <div className="card-foot">
              <Btn variant="ghost">Bekor qilish</Btn>
              <Btn variant="primary" leftIcon="device-floppy">Saqlash</Btn>
            </div>
          </Card>

          <Card>
            <CardHead title="Sozlamalar" />
            <div className="card-pad" style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Nomi</label>
                <input className="inp" defaultValue="Yangi so'rovnoma · May 2026" style={{ width: "100%" }} readOnly />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Maqsadli oqim</label>
                <input className="inp" defaultValue="Barcha faol oqimlar" style={{ width: "100%" }} readOnly />
              </div>
              <div className="note">
                <Icon name="info-circle" />
                So'rovnoma publish qilingandan so'ng tinglovchilarga avtomatik xabar yuboriladi.
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "analytics" && (
        <div style={{ marginTop: 10, display: "grid", gap: 14 }}>
          <div className="grid c-3">
            {SURVEYS.map((survey) => (
              <Card key={survey.id}>
                <CardHead title={survey.title} actions={<Pill tone={statusTone(survey.status)}>{statusLabel(survey.status)}</Pill>} />
                <div className="card-pad" style={{ display: "grid", placeItems: "center", gap: 12 }}>
                  {survey.nps > 0 ? (
                    <>
                      <Donut
                        value={survey.nps}
                        tone={survey.nps >= 60 ? "#22c55e" : "#f59e0b"}
                        center={
                          <div>
                            <div className="num" style={{ fontSize: 20, fontWeight: 800 }}>{survey.nps}</div>
                            <div style={{ fontSize: 10, color: "var(--text3)" }}>NPS</div>
                          </div>
                        }
                      />
                      <div style={{ width: "100%", display: "grid", gap: 6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 12, color: "var(--text2)" }}>Javoblar</span>
                          <span className="num" style={{ fontWeight: 700 }}>{survey.responses}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 12, color: "var(--text2)" }}>Completion</span>
                          <span className="num" style={{ fontWeight: 700 }}>{survey.completion}%</span>
                        </div>
                        <Bar value={survey.completion} tone={survey.completion >= 70 ? "green" : "amber"} thin />
                      </div>
                    </>
                  ) : (
                    <div className="empty">
                      <Icon name="clipboard-x" />
                      <p>Hali javob yo'q</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
