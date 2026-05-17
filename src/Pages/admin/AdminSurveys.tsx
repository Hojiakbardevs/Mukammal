import { useState } from "react"

import { Bar, Btn, Card, CardHead, Chip, Icon, Pill, Seg, Stat, Toolbar, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { SURVEY_QUESTION_TYPES, SURVEYS, type Survey, type SurveyComment, type SurveyQuestionType, type SurveyStatus } from "@/data/lmsData"

type SurveyTab = "builder" | "results" | "audience" | "settings"
type SurveyFilter = SurveyStatus | "all"

const FILTERS: Array<{ value: SurveyFilter; label: string; icon: string }> = [
  { value: "active", label: "Aktiv", icon: "circle-dot" },
  { value: "draft", label: "Draft", icon: "edit" },
  { value: "closed", label: "Yopilgan", icon: "check" },
]

function statusTone(status: SurveyStatus): PillTone {
  if (status === "active") return "green"
  if (status === "draft") return "amber"
  return "gray"
}

function statusIcon(status: SurveyStatus) {
  if (status === "active") return "circle-dot"
  if (status === "draft") return "edit"
  return "check"
}

function questionIcon(type: SurveyQuestionType) {
  if (type === "rating") return "star"
  if (type === "nps") return "scale"
  if (type === "mcq") return "circle-dot"
  if (type === "checkbox") return "checkbox"
  if (type === "yn") return "thumb-up"
  if (type === "long") return "align-left"
  if (type === "scale") return "adjustments"
  return "message"
}

function sentimentTone(sentiment: SurveyComment["sentiment"]): PillTone {
  if (sentiment === "positive") return "green"
  if (sentiment === "neutral") return "amber"
  return "red"
}

function sentimentLabel(sentiment: SurveyComment["sentiment"]) {
  if (sentiment === "positive") return "ijobiy"
  if (sentiment === "neutral") return "neytral"
  return "salbiy"
}

function completion(survey: Survey) {
  return Math.round((survey.responses / Math.max(survey.total, 1)) * 100)
}

export function AdminSurveys() {
  const [active, setActive] = useState<Survey>(SURVEYS[0])
  const [tab, setTab] = useState<SurveyTab>("builder")
  const [filter, setFilter] = useState<SurveyFilter>("active")

  const visibleSurveys = SURVEYS.filter((survey) => filter === "all" || survey.status === filter)

  return (
    <div className="admin-surveys-layout">
      <Card>
        <CardHead
          title="So'rovnomalar"
          count={SURVEYS.length}
          actions={
            <Btn size="icon" variant="primary" ariaLabel="Yangi so'rovnoma">
              <Icon name="plus" />
            </Btn>
          }
        />
        <Toolbar>
          {FILTERS.map((item) => (
            <Chip key={item.value} icon={item.icon} active={filter === item.value} onClick={() => setFilter(item.value)}>
              {item.label}
            </Chip>
          ))}
        </Toolbar>
        <div style={{ padding: 8, maxHeight: 700, overflowY: "auto" }}>
          {visibleSurveys.map((survey) => (
            <div
              key={survey.id}
              className={`tree-row ${active.id === survey.id ? "active" : ""}`}
              style={{ padding: 12, alignItems: "flex-start" }}
              onClick={() => setActive(survey)}
            >
              <Icon name={statusIcon(survey.status)} />
              <div className="grow" style={{ minWidth: 0, whiteSpace: "normal" }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.25 }}>{survey.title}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 3, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span>
                    <Icon name="users" /> {survey.target}
                  </span>
                  <span>
                    <Icon name="forms" /> {survey.questionCount}
                  </span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <Bar value={completion(survey)} tone="blue" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 11, color: "var(--text3)", marginTop: 4 }}>
                  <span>
                    <span className="num">{survey.responses}</span>/<span className="num">{survey.total}</span> javob
                  </span>
                  <span>{survey.lastActivity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHead
          title={active.title}
          actions={
            <>
              <Pill tone={statusTone(active.status)} dot>{active.status}</Pill>
              <Btn size="sm" leftIcon="link">Public link</Btn>
              <Btn size="sm" leftIcon="send" variant="primary">Yuborish</Btn>
            </>
          }
        />
        <Toolbar>
          <Seg
            value={tab}
            onChange={(value) => setTab(value as SurveyTab)}
            options={[
              { value: "builder", label: "Savollar", icon: "forms" },
              { value: "results", label: "Natijalar", icon: "chart-pie" },
              { value: "audience", label: "Auditoriya", icon: "users" },
              { value: "settings", label: "Sozlamalar", icon: "settings" },
            ]}
          />
          <div className="spacer" />
        </Toolbar>

        {tab === "builder" && (
          <div className="admin-survey-builder">
            <div>
              {active.questions.map((question, index) => (
                <div key={`${question.type}-${question.label}`} className="admin-survey-question">
                  <span className="thumb" style={{ width: 32, height: 32 }}>
                    <Icon name={questionIcon(question.type)} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{question.label}</div>
                      {question.required ? <Pill tone="red">required</Pill> : null}
                      <Pill tone="gray">{question.type}</Pill>
                    </div>
                    {question.answer ? <div style={{ fontSize: 11.5, color: "var(--text3)" }}>{question.answer}</div> : null}
                    {question.options ? (
                      <div style={{ display: "grid", gap: 4, marginTop: 6 }}>
                        {question.options.map((option) => (
                          <div key={option} style={{ fontSize: 11.5, color: "var(--text2)", display: "flex", alignItems: "center", gap: 6 }}>
                            <Icon name={question.type === "checkbox" ? "square" : "circle"} style={{ color: "#cbd5e1" }} />
                            {option}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="row-act" style={{ opacity: 1 }}>
                    <Btn size="icon" variant="ghost" ariaLabel={`${index + 1}-savolni ko'chirish`}>
                      <Icon name="grip-vertical" />
                    </Btn>
                    <Btn size="icon" variant="ghost" ariaLabel={`${index + 1}-savolni tahrirlash`}>
                      <Icon name="edit" />
                    </Btn>
                    <Btn size="icon" variant="ghost" ariaLabel={`${index + 1}-savolni o'chirish`}>
                      <Icon name="trash" />
                    </Btn>
                  </div>
                </div>
              ))}
              <Btn leftIcon="plus" style={{ width: "100%", justifyContent: "center" }}>Savol qo'shish</Btn>
            </div>

            <div>
              <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.08, marginBottom: 8 }}>
                Savol turlari
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {SURVEY_QUESTION_TYPES.map((item) => (
                  <div key={item.value} className="chip" style={{ justifyContent: "flex-start", borderStyle: "solid" }}>
                    <Icon name={item.icon} /> {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "results" && (
          <div style={{ padding: 18 }}>
            <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
              <Stat tone="blue" label="Javoblar" value={`${active.responses}/${active.total}`} sub={`${completion(active)}% to'ldirildi`} />
              <Stat tone="green" label="NPS" value={active.nps ? `+${active.nps}` : 0} sub="trainer + kurs" trend={active.nps ? { dir: "up", label: "+4" } : undefined} />
              <Stat tone="amber" label="O'rtacha baho" value={active.rating || 0} unit="/5" sub={`${active.responses} ovoz`} />
              <Stat tone="purple" label="Sentiment" value={active.sentiment || 0} unit="% +" sub={`${Math.max(0, 100 - active.sentiment)}% neytral`} />
            </div>
            <div className="grid c-2">
              <Card>
                <CardHead title="Savol 1 - Kurs sifatini baholang" />
                <div style={{ padding: 18 }}>
                  {active.resultRows.length > 0 ? (
                    active.resultRows.map((row) => {
                      const percent = Math.round((row.value / Math.max(active.responses, 1)) * 100)

                      return (
                        <div key={row.label} style={{ marginBottom: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, marginBottom: 4 }}>
                            <span>{row.label}</span>
                            <span className="num"><b>{row.value}</b> · {percent}%</span>
                          </div>
                          <Bar value={percent} tone="blue" />
                        </div>
                      )
                    })
                  ) : (
                    <div className="empty">
                      <Icon name="clipboard-x" />
                      <p>Hali javob yo'q</p>
                    </div>
                  )}
                </div>
              </Card>
              <Card>
                <CardHead title="So'nggi izohlar" sub="· matnli savol" />
                <div style={{ padding: 18, display: "grid", gap: 10 }}>
                  {active.comments.length > 0 ? (
                    active.comments.map((comment) => (
                      <div key={`${comment.author}-${comment.text}`} style={{ display: "flex", gap: 10, padding: 10, background: "var(--bg4)", borderRadius: 8 }}>
                        <Pill tone={sentimentTone(comment.sentiment)}>{sentimentLabel(comment.sentiment)}</Pill>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, color: "var(--text2)" }}>{comment.text}</div>
                          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>- {comment.author}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty">
                      <Icon name="message-off" />
                      <p>Izohlar hali kelmagan</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "audience" && (
          <div style={{ padding: 18 }}>
            <div className="kv-list">
              <div className="kv"><span className="k">Auditoriya</span><span className="v">{active.audience.target}</span></div>
              <div className="kv"><span className="k">Anonim</span><span className="v"><Pill tone={active.audience.anonymous ? "green" : "gray"}>{active.audience.anonymous ? "Ha" : "Yo'q"}</Pill></span></div>
              <div className="kv"><span className="k">Ochiq sana</span><span className="v">{active.audience.opensAt}</span></div>
              <div className="kv"><span className="k">Yopilish sanasi</span><span className="v">{active.audience.closesAt}</span></div>
              <div className="kv"><span className="k">Eslatish</span><span className="v">{active.audience.reminder}</span></div>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div style={{ padding: 18 }}>
            <div className="alert blue">
              <Icon name="lock" />
              <div className="body">
                <h4>PII himoyasi</h4>
                <p>Bu so'rovnomada anonim rejim yoqilgan. Faqat aggregat natijalar trainer va admin uchun ko'rinadi; ism va identifikatorlar yashirin.</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
