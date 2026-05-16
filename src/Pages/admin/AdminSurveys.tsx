import { useState } from "react"

import { Bar, Btn, Card, CardHead, Icon, Pill, Tabs, type PillTone } from "@/components/dashboard/LmsPrimitives"
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

export function AdminSurveys() {
  const [tab, setTab] = useState("active")
  const surveys = SURVEYS.filter((survey) => survey.status === tab)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>So'rovnomalar</h1>
          <p>So'rovnomalar ro'yxati, konstruktor maketi, javoblar tahlili va status tablari.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="plus">Yangi so'rovnoma</Btn>
          <Btn variant="primary" leftIcon="send">Publish</Btn>
        </div>
      </div>

      <div className="grid c-7-5">
        <Card>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: "active", label: "Faol", icon: "player-play", count: SURVEYS.filter((survey) => survey.status === "active").length },
              { value: "draft", label: "Qoralama", icon: "edit", count: SURVEYS.filter((survey) => survey.status === "draft").length },
              { value: "closed", label: "Yopiq", icon: "lock", count: SURVEYS.filter((survey) => survey.status === "closed").length },
            ]}
          />
          <CardHead title="So'rovnomalar ro'yxati" count={surveys.length} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {surveys.map((survey) => (
              <div key={survey.id} className="alert">
                <Icon name="clipboard-list" />
                <div className="body">
                  <h4>{survey.title}</h4>
                  <p>{survey.responses} javob · completion {survey.completion}%</p>
                  <Bar value={survey.completion} tone={survey.completion >= 70 ? "green" : "amber"} thin />
                </div>
                <Pill tone={statusTone(survey.status)}>{statusLabel(survey.status)}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="So'rovnoma konstruktori maketi" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {["NPS savoli", "Trener feedback", "Platforma qulayligi", "Ochiq izoh"].map((field, index) => (
              <div key={field} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12, display: "flex", gap: 10, alignItems: "center" }}>
                <span className="thumb"><Icon name={index === 3 ? "message" : "forms"} /></span>
                <div style={{ flex: 1 }}>
                  <b>{field}</b>
                  <div style={{ color: "var(--text3)", fontSize: 12 }}>Majburiy maydon · tartib {index + 1}</div>
                </div>
                <Btn size="xs" leftIcon="edit">Tahrirlash</Btn>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: 14 }}>
        <CardHead title="Javoblar tahlili" />
        <div className="card-pad" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {SURVEYS.map((survey) => (
            <div key={survey.id} className="note">
              <b>{survey.title}</b>
              <div style={{ marginTop: 8 }}>NPS: {survey.nps || "Qoralama"} · Javoblar: {survey.responses}</div>
              <Bar value={survey.completion} tone={survey.completion >= 70 ? "green" : "amber"} thin />
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
