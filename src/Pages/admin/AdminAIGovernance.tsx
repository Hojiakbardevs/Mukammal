import { useState } from "react"

import { Bar, Btn, Card, CardHead, Check, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"

const NAV_SECTIONS = [
  { key: "principles", label: "Policy asoslari", icon: "checkup-list" },
  { key: "grading",    label: "SI baholash",     icon: "brain" },
  { key: "risk",       label: "Risk modeli",     icon: "alert-triangle" },
  { key: "plagiarism", label: "Plagiat aniqlash", icon: "file-search" },
  { key: "audit",      label: "Audit trail",     icon: "shield-lock" },
]

const PRINCIPLES = [
  { title: "Inson nazorati majburiy", desc: "Har bir yakuniy baholashda trener yoki reviewer tasdig'i talab qilinadi." },
  { title: "Shaffoflik", desc: "SI tavsiyasi rubric dalillari va ishonch darajasi bilan ko'rsatiladi." },
  { title: "Ma'lumotlar minimaligi", desc: "Shaxsiy ma'lumotlar faqat ta'lim maqsadida minimal hajmda ishlatiladi." },
  { title: "O'zgarmas audit", desc: "Barcha qarorlar SHA-256 hash zanjiri bilan o'zgarmas tarzda saqlanadi." },
  { title: "Adolatlilik", desc: "Risk modeli faqat yordam rejasini boshlaydi, jazo qo'llamaydi." },
]

type Setting = { label: string; desc: string; enabled: boolean; value: number; unit: string }

const GRADING_SETTINGS: Setting[] = [
  { label: "SI grading suggestion", desc: "Trenerga baho tavsiyasi berish", enabled: true, value: 84, unit: "% o'rt. ishonch" },
  { label: "Auto rubric fill", desc: "Rubric maydonlarini avtomatik to'ldirish", enabled: true, value: 76, unit: "% aniqlik" },
  { label: "Auto publish grades", desc: "Baholarni trener tasdiqisiz e'lon qilish", enabled: false, value: 0, unit: "" },
]

const RISK_SETTINGS: Setting[] = [
  { label: "Risk threshold", desc: "Yuqori risk signali chegarasi", enabled: true, value: 70, unit: "% dan yuqori" },
  { label: "Davomat vazni", desc: "Risk hisobidagi davomat ulushi", enabled: true, value: 35, unit: "% vazn" },
  { label: "Progress vazni", desc: "Risk hisobidagi progress ulushi", enabled: true, value: 40, unit: "% vazn" },
  { label: "Avtomatik xabar", desc: "Trenerlarga risk haqida xabarnoma", enabled: true, value: 85, unit: "% coverage" },
]

const PLAGIARISM_SETTINGS: Setting[] = [
  { label: "Plagiat aniqlash", desc: "Fayl va matn o'xshashligini tekshirish", enabled: true, value: 92, unit: "% aniqlik" },
  { label: "Avtomatik flag", desc: "Shubhali ishlarni avtomatik belgilash", enabled: true, value: 65, unit: "% chegara" },
  { label: "Tashqi ma'lumotlar baza", desc: "Ochiq manbalarga nisbatan tekshiruv", enabled: true, value: 78, unit: "% coverage" },
  { label: "Avtomatik jazo", desc: "Flaglanganlarni avtomatik rad etish", enabled: false, value: 0, unit: "" },
]

export function AdminAIGovernance() {
  const [section, setSection] = useState("principles")

  return (
    <>
      <div className="page-head">
        <div>
          <h1>SI boshqaruvi</h1>
          <p>Baholash siyosati, risk modeli, plagiat aniqlash va inson nazorati sozlamalari.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="history">Policy tarixi</Btn>
          <Btn variant="primary" leftIcon="device-floppy">Saqlash</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="green"  label="Policy versiyasi"  value="3.1"  sub="16-May 2026" />
        <Stat tone="blue"   label="Inson nazorati"    value={100}  unit="%" sub="Majburiy" />
        <Stat tone="amber"  label="Risk chegarasi"    value={70}   unit="%" sub="Signal bosqichi" />
        <Stat tone="purple" label="Audit saqlash"     value={365}  unit="kun" sub="WORM rejim" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 14 }}>
        {/* Yon menyu */}
        <div style={{ display: "grid", gap: 4, alignContent: "start" }}>
          {NAV_SECTIONS.map((nav) => (
            <button
              key={nav.key}
              type="button"
              onClick={() => setSection(nav.key)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left",
                fontWeight: section === nav.key ? 700 : 500, fontSize: 14,
                background: section === nav.key ? "var(--accent-soft)" : "transparent",
                color: section === nav.key ? "var(--accent)" : "var(--text2)",
              }}
            >
              <Icon name={nav.icon} />
              {nav.label}
            </button>
          ))}
        </div>

        {/* Kontent paneli */}
        <div style={{ display: "grid", gap: 14 }}>
          {section === "principles" && (
            <Card>
              <CardHead title="SI policy asoslari" actions={<Pill tone="purple" icon="shield-check">Governance</Pill>} />
              <div className="card-pad" style={{ display: "grid", gap: 10 }}>
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className="alert blue">
                    <Icon name="checkup-list" />
                    <div className="body">
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="note">
                  <Icon name="info-circle" />
                  NIST AI RMF va UNESCO GenAI guidance asosida ichki policyga moslashtirilgan.
                </div>
              </div>
            </Card>
          )}

          {section === "grading" && (
            <Card>
              <CardHead title="SI baholash sozlamalari" actions={<Pill tone="blue" icon="brain">Grading AI</Pill>} />
              <div className="card-pad" style={{ display: "grid", gap: 16 }}>
                {GRADING_SETTINGS.map((s) => (
                  <SettingRow key={s.label} setting={s} />
                ))}
                <div className="alert amber">
                  <Icon name="alert-triangle" />
                  <div className="body">
                    <h4>Muhim eslatma</h4>
                    <p>Auto publish grades yoqilsa ham, trener tasdig'i majburiy bo'lib qoladi.</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {section === "risk" && (
            <Card>
              <CardHead title="Risk modeli sozlamalari" actions={<Pill tone="amber" icon="alert-triangle">Risk AI</Pill>} />
              <div className="card-pad" style={{ display: "grid", gap: 16 }}>
                {RISK_SETTINGS.map((s) => (
                  <SettingRow key={s.label} setting={s} />
                ))}
                <div className="note">
                  <Icon name="info-circle" />
                  Risk modeli faqat yordam rejasini boshlaydi. Jazo qo'llamaydi va avtomatik chiqarish yo'q.
                </div>
              </div>
            </Card>
          )}

          {section === "plagiarism" && (
            <Card>
              <CardHead title="Plagiat aniqlash sozlamalari" actions={<Pill tone="red" icon="file-search">Plagiat AI</Pill>} />
              <div className="card-pad" style={{ display: "grid", gap: 16 }}>
                {PLAGIARISM_SETTINGS.map((s) => (
                  <SettingRow key={s.label} setting={s} />
                ))}
                <div className="note">
                  <Icon name="info-circle" />
                  Dalil sifatida faqat ko'rsatiladi. Avtomatik jazo hech qachon qo'llanmaydi.
                </div>
              </div>
            </Card>
          )}

          {section === "audit" && (
            <Card>
              <CardHead title="Audit trail siyosati" actions={<Pill tone="purple" icon="shield-lock">Immutable</Pill>} />
              <div className="card-pad" style={{ display: "grid", gap: 12 }}>
                <dl className="kv-list">
                  <div><dt>Saqlash muddati</dt><dd className="num">365 kun</dd></div>
                  <div><dt>Shifrlash</dt><dd>AES-256 + SHA-256 hash zanjir</dd></div>
                  <div><dt>SIEM eksport</dt><dd><Pill tone="green">Yoqilgan</Pill></dd></div>
                  <div><dt>O'chirish imkoni</dt><dd><Pill tone="red">Taqiqlangan (WORM)</Pill></dd></div>
                  <div><dt>Oxirgi tekshiruv</dt><dd>16-May 2026 · 02:00</dd></div>
                </dl>
                <div className="alert green">
                  <Icon name="shield-check" />
                  <div className="body">
                    <h4>Audit trail faol</h4>
                    <p>Barcha harakatlar o'zgarmas tarzda qayd etilmoqda. Zanjir yaxlitligi tekshirilgan.</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}

function SettingRow({ setting }: { setting: Setting }) {
  const [enabled, setEnabled] = useState(setting.enabled)
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Check value={enabled} onChange={setEnabled} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>{setting.label}</div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>{setting.desc}</div>
        </div>
        {setting.unit && (
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)" }}>{setting.value}{setting.unit.startsWith("%") ? "" : " "}{setting.unit}</span>
        )}
        <Pill tone={enabled ? "green" : "gray"}>{enabled ? "Yoqilgan" : "O'chirilgan"}</Pill>
      </div>
      {enabled && setting.value > 0 && (
        <Bar value={setting.value} tone={enabled ? "blue" : "red"} thin />
      )}
    </div>
  )
}
