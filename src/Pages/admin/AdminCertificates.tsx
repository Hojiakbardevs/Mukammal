import { useState } from "react"

import { Bar, Btn, Card, CardHead, Icon, Pill, Stat, Tabs } from "@/components/dashboard/LmsPrimitives"
import { CERTIFICATE_TEMPLATES, USERS } from "@/data/lmsData"

const issued = USERS.filter((user) => user.status === "completed").map((user, index) => ({
  id: `cert-${index + 1}`,
  name: user.name,
  email: user.email,
  tone: user.tone,
  template: CERTIFICATE_TEMPLATES[index % CERTIFICATE_TEMPLATES.length].title,
  templateColor: CERTIFICATE_TEMPLATES[index % CERTIFICATE_TEMPLATES.length].color,
  issuedAt: "16-May 2026",
  verification: `VRF-26-${1040 + index}`,
}))

const ELIGIBILITY_RULES = [
  "Progress 90%+",
  "Yakuniy ball 70%+",
  "Final loyiha tasdiqlangan",
  "Feedback so'rovnomasi to'ldirilgan",
]

export function AdminCertificates() {
  const [tab, setTab] = useState("templates")
  const [preview, setPreview] = useState(CERTIFICATE_TEMPLATES[0])

  const totalIssued = CERTIFICATE_TEMPLATES.reduce((s, t) => s + t.issued, 0)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sertifikat shablonlari</h1>
          <p>Shablon yaratish, oldindan ko'rish, moslik qoidalari va berilgan sertifikatlar tarixi.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="plus">Shablon yaratish</Btn>
          <Btn variant="primary" leftIcon="stamp">Paketli berish</Btn>
        </div>
      </div>

      <div className="stat-grid cols-3" style={{ marginBottom: 14 }}>
        <Stat tone="blue"   label="Shablonlar"    value={CERTIFICATE_TEMPLATES.length} sub="Faol shablonlar" />
        <Stat tone="green"  label="Jami berilgan" value={totalIssued}                   sub="Barcha oqimlar" />
        <Stat tone="purple" label="QR tekshiruv"  value={100}  unit="%"                 sub="Open Badges" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "templates", label: "Shablonlar",  icon: "award",       count: CERTIFICATE_TEMPLATES.length },
          { value: "issued",    label: "Berilganlar", icon: "certificate", count: issued.length },
          { value: "rules",     label: "Qoidalar",    icon: "list-check" },
        ]}
      />

      {tab === "templates" && (
        <div className="grid c-7-5" style={{ marginTop: 10 }}>
          <div style={{ display: "grid", gap: 12 }}>
            {CERTIFICATE_TEMPLATES.map((template) => (
              <Card
                key={template.id}
                style={{ cursor: "pointer", outline: preview.id === template.id ? `2px solid ${template.color}` : "none" }}
                className={preview.id === template.id ? "selected" : ""}
              >
                <div className="card-pad" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span className="thumb" style={{ background: template.color + "22", color: template.color }}>
                    <Icon name="award" />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: 2 }}>{template.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>{template.issuer}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{template.rule}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="num" style={{ fontWeight: 800, fontSize: 18, color: template.color }}>{template.issued}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>berilgan</div>
                  </div>
                </div>
                <div className="card-foot">
                  <Btn size="sm" variant="ghost" leftIcon="eye" onClick={() => setPreview(template)}>Ko'rish</Btn>
                  <Btn size="sm" variant="ghost" leftIcon="pencil">Tahrirlash</Btn>
                  <Btn size="sm" variant="primary" leftIcon="stamp">Berish</Btn>
                </div>
              </Card>
            ))}
          </div>

          {/* Oldindan ko'rinish */}
          <Card>
            <CardHead title="Oldindan ko'rinish" />
            <div className="card-pad">
              <div style={{
                border: `2px solid ${preview.color}33`,
                borderRadius: 14,
                padding: 24,
                minHeight: 260,
                background: `linear-gradient(135deg, var(--bg), ${preview.color}08)`,
                display: "grid",
                gap: 16,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="award" style={{ color: preview.color, fontSize: 20 }} />
                    <span style={{ fontWeight: 700, color: preview.color }}>{preview.issuer}</span>
                  </div>
                  <Pill tone="blue">Tasdiqlangan</Pill>
                </div>
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 2 }}>
                    Ushbu sertifikat
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, margin: "8px 0", color: preview.color }}>
                    {preview.title}
                  </div>
                  <div style={{ color: "var(--text2)", fontSize: 14 }}>
                    kursini muvaffaqiyatli yakunlaganligi uchun beriladi
                  </div>
                </div>
                <Bar value={100} tone="blue" />
                <div className="note">
                  <Icon name="qrcode" />
                  QR verification, digital signature va Open Badges metadata.
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "issued" && (
        <Card style={{ marginTop: 10 }}>
          <CardHead title="Berilgan sertifikatlar" count={issued.length} />
          <div style={{ overflowX: "auto" }}>
            <table className="t">
              <thead>
                <tr>
                  <th>Tinglovchi</th>
                  <th>Shablon</th>
                  <th>Berilgan sana</th>
                  <th>Verification kodi</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {issued.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className={`av ${row.tone} sm`}>{row.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                        <div>
                          <div style={{ fontWeight: 700 }}>{row.name}</div>
                          <div style={{ fontSize: 11, color: "var(--text3)" }}>{row.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.templateColor, display: "inline-block" }} />
                        {row.template}
                      </div>
                    </td>
                    <td style={{ color: "var(--text2)", fontSize: 13 }}>{row.issuedAt}</td>
                    <td className="mono" style={{ fontSize: 12, color: "var(--text3)" }}>{row.verification}</td>
                    <td>
                      <Btn size="sm" variant="ghost" leftIcon="download">PDF</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "rules" && (
        <div className="grid c-2" style={{ marginTop: 10 }}>
          <Card>
            <CardHead title="Moslik qoidalari" actions={<Pill tone="green" icon="list-check">Aktiv</Pill>} />
            <div className="card-pad" style={{ display: "grid", gap: 12 }}>
              {ELIGIBILITY_RULES.map((rule) => (
                <div key={rule} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="check on" />
                  <span style={{ fontWeight: 600 }}>{rule}</span>
                </div>
              ))}
              <div className="note" style={{ marginTop: 8 }}>
                <Icon name="info-circle" />
                Barcha shartlar bajarilmasa sertifikat avtomatik berilmaydi.
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title="Kurs bo'yicha statistika" />
            <div className="card-pad" style={{ display: "grid", gap: 14 }}>
              {CERTIFICATE_TEMPLATES.map((t) => (
                <div key={t.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</span>
                    <span className="num" style={{ fontSize: 13, fontWeight: 800 }}>{t.issued} ta</span>
                  </div>
                  <Bar value={Math.round((t.issued / totalIssued) * 100)} tone="blue" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
