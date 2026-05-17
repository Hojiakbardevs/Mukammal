import { useState, type ChangeEvent } from "react"

import { Bar, Btn, Card, CardHead, Icon, Pill, Toggle } from "@/components/dashboard/LmsPrimitives"
import {
  AI_GOV_AUDIT_ROWS,
  AI_GOV_DATA_POLICY_ROWS,
  AI_GOV_GRADING_SETTINGS,
  AI_GOV_MODEL_VERSIONS,
  AI_GOV_NAV_SECTIONS,
  AI_GOV_PLAGIARISM_RULES,
  AI_GOV_PRINCIPLES,
  AI_GOV_RISK_SIGNALS,
  AI_GOV_RISK_TIERS,
  AI_GOV_RUBRIC_RULES,
  AI_GOV_SYSTEM_PROMPT,
  type AIGovSectionKey,
} from "@/data/lmsData"

function statusTone(status: "active" | "retired" | "archived") {
  if (status === "active") return "green"
  return "gray"
}

function auditStatus(status: "approved" | "pending" | "batch") {
  if (status === "approved") return <Pill tone="green" icon="check">Teacher tasdiqladi</Pill>
  if (status === "pending") return <Pill tone="amber" icon="clock">Kutilmoqda</Pill>
  return <Pill tone="blue">batch</Pill>
}

export function AdminAIGovernance() {
  const [section, setSection] = useState<AIGovSectionKey>("principles")
  const [graderOn, setGraderOn] = useState(true)
  const [riskOn, setRiskOn] = useState(true)
  const [plagOn, setPlagOn] = useState(true)
  const [autoApprove, setAutoApprove] = useState(false)
  const [rubricRules, setRubricRules] = useState(() => AI_GOV_RUBRIC_RULES)
  const [riskSignals, setRiskSignals] = useState(() => AI_GOV_RISK_SIGNALS)
  const [plagiarismRules, setPlagiarismRules] = useState(() => AI_GOV_PLAGIARISM_RULES)

  function toggleRubricRule(id: string) {
    setRubricRules((rules) => rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  function updateRiskWeight(id: string, event: ChangeEvent<HTMLInputElement>) {
    const value = Math.max(0, Math.min(100, Number(event.target.value) || 0))
    setRiskSignals((signals) => signals.map((signal) => (signal.id === id ? { ...signal, weight: value } : signal)))
  }

  function togglePlagiarismRule(id: string) {
    setPlagiarismRules((rules) => rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  function updatePlagiarismThreshold(id: string, event: ChangeEvent<HTMLInputElement>) {
    setPlagiarismRules((rules) => rules.map((rule) => (rule.id === id ? { ...rule, threshold: event.target.value } : rule)))
  }

  return (
    <div className="admin-ai-gov-layout">
      <Card>
        <CardHead title="AI boshqaruvi" />
        <div style={{ padding: 8 }}>
          {AI_GOV_NAV_SECTIONS.map((nav) => (
            <div
              key={nav.key}
              className={`tree-row ${section === nav.key ? "active" : ""}`}
              onClick={() => setSection(nav.key)}
            >
              <Icon name={nav.icon} />
              <span className="grow">{nav.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="admin-ai-gov-stack">
        {section === "principles" && (
          <>
            <div className="alert blue">
              <Icon name="scale" />
              <div className="body">
                <h4>Inson markazli AI</h4>
                <p>
                  AIRI Training LMS NIST AI RMF va UNESCO GenAI in education tavsiyalariga muvofiq qurilgan.
                  AI hech qachon yakuniy qaror qabul qilmaydi: u <b>rubric-based suggestion, evidence highlight</b> beradi va inson tasdig'ini talab qiladi.
                </p>
              </div>
            </div>
            <Card>
              <CardHead title="Asosiy tamoyillar" />
              <div style={{ padding: 18, display: "grid", gap: 12 }}>
                {AI_GOV_PRINCIPLES.map((principle) => (
                  <div key={principle.title} className="admin-ai-principle">
                    <span className="thumb" style={{ background: "var(--lms-accent-light)", color: "var(--lms-accent)" }}>
                      <Icon name="check" />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{principle.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{principle.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-foot">
                <span><Icon name="external-link" /> Tegishli standartlar: NIST AI RMF 1.0 · UNESCO GenAI · Open Badges 3.0 · WCAG 2.2 AA</span>
                <Btn size="sm" leftIcon="download">Policy PDF</Btn>
              </div>
            </Card>
          </>
        )}

        {section === "grading" && (
          <>
            <Card>
              <CardHead
                title="AI grading suggestion engine"
                actions={
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "var(--text2)" }}>{graderOn ? "Yoqilgan" : "O'chirilgan"}</span>
                    <Toggle value={graderOn} onChange={() => setGraderOn((value) => !value)} />
                  </div>
                }
              />
              <div style={{ padding: 18, opacity: graderOn ? 1 : 0.5 }}>
                <div className="kv-list">
                  <div className="kv"><span className="k">Model</span><span className="v">{AI_GOV_GRADING_SETTINGS.model}</span></div>
                  <div className="kv"><span className="k">Versiya</span><span className="v mono">{AI_GOV_GRADING_SETTINGS.version}</span></div>
                  <div className="kv"><span className="k">Maks token chiqishi</span><span className="v num">{AI_GOV_GRADING_SETTINGS.maxOutputTokens}</span></div>
                  <div className="kv"><span className="k">Confidence porog'i</span><span className="v num">{AI_GOV_GRADING_SETTINGS.confidenceThreshold}</span></div>
                  <div className="kv">
                    <span className="k">Auto-publish ruxsati</span>
                    <span className="v" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Toggle value={autoApprove} onChange={() => setAutoApprove((value) => !value)} />
                      <span style={{ fontSize: 11, color: autoApprove ? "var(--red)" : "var(--text3)" }}>
                        {autoApprove ? "XAVFLI: tavsiya etilmaydi" : "Faqat teacher tasdig'i"}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="row-div" />
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Rubric integratsiyasi</div>
                <div className="admin-ai-rubric-grid">
                  {rubricRules.map((rule) => (
                    <div key={rule.id} className="admin-ai-setting-card">
                      <div style={{ fontSize: 12.5, color: rule.dangerous ? "var(--red-ink)" : "var(--text1)", fontWeight: 600 }}>
                        {rule.dangerous ? <Icon name="alert-triangle" /> : null} {rule.label}
                      </div>
                      <Toggle value={rule.enabled} onChange={() => toggleRubricRule(rule.id)} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card>
              <CardHead
                title="System prompt"
                sub="· read-only · versiyali"
                actions={
                  <>
                    <Pill tone="purple">v3.1</Pill>
                    <Btn size="sm" leftIcon="history">Tarix</Btn>
                    <Btn size="sm" leftIcon="edit">Yangi versiya</Btn>
                  </>
                }
              />
              <div style={{ padding: 18 }}>
                <pre className="admin-ai-prompt">{AI_GOV_SYSTEM_PROMPT}</pre>
                <div className="note" style={{ marginTop: 10 }}>
                  System prompt har bir bahoga audit jurnaliga link bilan biriktiriladi.
                </div>
              </div>
            </Card>
          </>
        )}

        {section === "risk" && (
          <Card>
            <CardHead
              title="Risk skor modeli"
              actions={
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12 }}>Faol</span>
                  <Toggle value={riskOn} onChange={() => setRiskOn((value) => !value)} />
                </div>
              }
            />
            <div style={{ padding: 18, opacity: riskOn ? 1 : 0.5 }}>
              <div className="alert amber" style={{ marginBottom: 14 }}>
                <Icon name="info-circle" />
                <div className="body">
                  <h4>Bu skor - yordam signali</h4>
                  <p>Hech qachon ranking, sertifikatga ruxsat berish yoki disqualification uchun ishlatilmaydi. Faqat tutor/teacher intervention paneliga ko'rinadi.</p>
                </div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Signal og'irliklari</div>
              {riskSignals.map((signal) => (
                <div key={signal.id} className="admin-ai-risk-row">
                  <div style={{ width: 180, fontSize: 12.5 }}>
                    <div style={{ fontWeight: 600 }}>{signal.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{signal.note}</div>
                  </div>
                  <div style={{ flex: 1 }}><Bar value={signal.weight * 2} tone="blue" thick /></div>
                  <input className="input sm mono num" style={{ width: 64 }} value={signal.weight} onChange={(event) => updateRiskWeight(signal.id, event)} />
                  <span style={{ color: "var(--text3)", fontSize: 12 }}>%</span>
                </div>
              ))}
              <div className="row-div" />
              <div className="admin-ai-tier-grid">
                {AI_GOV_RISK_TIERS.map((tier) => (
                  <div key={tier.label} className="admin-ai-tier-card">
                    <Pill tone={tier.tone}>{tier.label}</Pill>
                    <div className="mono num" style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{tier.from}-{tier.to}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{tier.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {section === "plagiarism" && (
          <Card>
            <CardHead title="Plagiat va AI-yozma signal" actions={<Toggle value={plagOn} onChange={() => setPlagOn((value) => !value)} />} />
            <div style={{ padding: 18, opacity: plagOn ? 1 : 0.5 }}>
              <div className="alert red" style={{ marginBottom: 14 }}>
                <Icon name="alert-octagon" />
                <div className="body">
                  <h4>"Machine flags, human decides"</h4>
                  <p>AI bu yerda ayblov beradi emas, review trigger yaratadi. Talabaning bahosi avtomatik ravishda 0 ga tushirilmaydi va student panelida ko'rinmaydi. Faqat reviewer va teacher ko'radi.</p>
                </div>
              </div>
              {plagiarismRules.map((rule, index) => (
                <div key={rule.id} className="admin-ai-plagiarism-row" style={{ borderBottom: index < plagiarismRules.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                  <div style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{rule.label}</div>
                  <span style={{ fontSize: 11.5, color: "var(--text3)" }}>flag porog'i:</span>
                  <input className="input sm mono num" style={{ width: 70 }} value={rule.threshold} onChange={(event) => updatePlagiarismThreshold(rule.id, event)} />
                  <Toggle value={rule.enabled} onChange={() => togglePlagiarismRule(rule.id)} />
                </div>
              ))}
              <div className="note" style={{ marginTop: 12 }}>
                Tasdiqlangan plagiat hodisalari uchun mahsulot qoidasi: <b>academic score - 0, gamification bonus bekor qilinadi</b>. Bu signal emas, qaror.
              </div>
            </div>
          </Card>
        )}

        {section === "audit" && (
          <Card>
            <CardHead
              title="AI audit trail"
              sub="· so'nggi yozuvlar"
              actions={
                <>
                  <Btn size="sm" leftIcon="download">CSV</Btn>
                  <Btn size="sm" leftIcon="external-link">To'liq jurnal</Btn>
                </>
              }
            />
            <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
              <table className="t">
                <thead>
                  <tr><th>Vaqt</th><th>Model</th><th>Operatsiya</th><th>Obyekt</th><th>Confidence</th><th>Tasdiqlangan</th></tr>
                </thead>
                <tbody>
                  {AI_GOV_AUDIT_ROWS.map((row) => (
                    <tr key={`${row.time}-${row.operation}-${row.object}`}>
                      <td className="mono">{row.time}</td>
                      <td><Pill tone="purple"><Icon name="sparkles" />{row.modelVersion}</Pill></td>
                      <td className="mono">{row.operation}</td>
                      <td>{row.object}</td>
                      <td className="mono num">{row.confidence}</td>
                      <td>{auditStatus(row.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {section === "models" && (
          <Card>
            <CardHead title="Modellar va versiyalar" actions={<Btn size="sm" variant="primary" leftIcon="rocket">Yangi versiya deploy</Btn>} />
            <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
              <table className="t">
                <thead>
                  <tr><th>Versiya</th><th>Model</th><th>Holat</th><th>Deploy sanasi</th><th>Bias audit</th><th>Hisobotlar</th></tr>
                </thead>
                <tbody>
                  {AI_GOV_MODEL_VERSIONS.map((model) => (
                    <tr key={model.version}>
                      <td><b className="mono">{model.version}</b></td>
                      <td>{model.model}</td>
                      <td><Pill tone={statusTone(model.status)} dot>{model.status}</Pill></td>
                      <td>{model.deployedAt}</td>
                      <td>
                        <Pill tone={model.biasAudit === "passed" ? "green" : "amber"} icon={model.biasAudit === "passed" ? "check" : "alert-triangle"}>
                          {model.biasAuditLabel}
                        </Pill>
                      </td>
                      <td>{model.reports}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {section === "data" && (
          <Card>
            <CardHead title="Ma'lumot va PII boshqaruvi" />
            <div style={{ padding: 18 }}>
              <div className="kv-list">
                {AI_GOV_DATA_POLICY_ROWS.map((row) => (
                  <div key={row.label} className="kv">
                    <span className="k">{row.label}</span>
                    <span className="v">{row.tone ? <Pill tone={row.tone}>{row.value}</Pill> : row.value}</span>
                  </div>
                ))}
              </div>
              <div className="row-div" />
              <Btn variant="danger" leftIcon="database-off">Hozircha AI ga uzatilgan barcha ma'lumotlarni o'chirish</Btn>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
