import { useState } from "react"
import {
  Avatar, Btn, Card, Check, Chip, Donut, Drawer, Icon, Pill, Seg, Spark, Stat, Tabs, Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { STUDENTS, type StudentRecord } from "@/data/lmsData"

function riskTone(risk: number): "red" | "amber" | "blue" | "green" {
  return risk >= 75 ? "red" : risk >= 55 ? "amber" : risk >= 35 ? "blue" : "green"
}

function riskLabel(risk: number) {
  return risk >= 75 ? "Yuqori" : risk >= 55 ? "O'rta" : risk >= 35 ? "Kuzatuv" : "Yaxshi"
}

function causePills(s: StudentRecord) {
  const pills: { label: string; tone: "red" | "amber" | "blue" }[] = []
  if (s.attendance < 70) pills.push({ label: "Davomat past", tone: "red" })
  if (s.late > 2)        pills.push({ label: "Kechikish ko'p", tone: "amber" })
  if (s.progress < 50)   pills.push({ label: "Progress past", tone: "red" })
  if (s.gpa < 70)        pills.push({ label: "GPA past", tone: "amber" })
  if (pills.length === 0) pills.push({ label: "Kuzatuvda", tone: "blue" })
  return pills
}

function trendSpark(s: StudentRecord): number[] {
  const base = s.risk
  if (s.trend === "down") return [base - 12, base - 8, base - 4, base - 1, base]
  if (s.trend === "up")   return [base + 12, base + 8, base + 4, base + 2, base]
  return [base - 2, base + 1, base - 1, base + 2, base]
}

function interventionFor(risk: number) {
  if (risk >= 80) return "24 soat ichida shaxsiy check-in va mentor biriktirish tavsiya etiladi."
  if (risk >= 60) return "Haftalik mini-reja va o'tkazib yuborilgan dars eslatmasi yuborish."
  return "Avtomatik reminder va keyingi darsda qisqa suhbat."
}

const INTERVENTION_TYPES = [
  { v: "checkin",  label: "Shaxsiy check-in", icon: "user-check" },
  { v: "mentor",   label: "Mentor biriktirish", icon: "users" },
  { v: "reminder", label: "Eslatma yuborish", icon: "bell" },
  { v: "plan",     label: "Mini-reja", icon: "list-check" },
]

export function TeacherRiskPanel() {
  const [tab, setTab] = useState("high")
  const [sel, setSel] = useState<Record<number, boolean>>({})
  const [drawer, setDrawer] = useState<StudentRecord | null>(null)
  const [interventionType, setInterventionType] = useState("checkin")
  const [message, setMessage] = useState("")
  const [reminderFreq, setReminderFreq] = useState("weekly")

  const atRisk = STUDENTS.filter((s) => s.risk >= 35).sort((a, b) => b.risk - a.risk)
  const high   = atRisk.filter((s) => s.risk >= 75)
  const medium = atRisk.filter((s) => s.risk >= 55 && s.risk < 75)
  const watch  = atRisk.filter((s) => s.risk >= 35 && s.risk < 55)
  const good   = STUDENTS.filter((s) => s.risk < 35)

  const visible =
    tab === "high"   ? high :
    tab === "medium" ? medium :
    tab === "watch"  ? watch : atRisk

  const selCount = Object.values(sel).filter(Boolean).length
  const allSelected = visible.length > 0 && selCount === visible.length

  return (
    <>
      <div className="alert blue" style={{ marginBottom: 18 }}>
        <Icon name="heart-handshake" />
        <div className="body">
          <h4>Yordam radari — jazo emas</h4>
          <p>
            Risk skor faqat o'z vaqtida yordam ko'rsatish uchun. Talabalar bu ro'yxatni ko'rmaydi.
            Har bir intervention trener tomonidan shaxsiy ohangda yuboriladi.
          </p>
        </div>
        <Btn size="sm" leftIcon="settings">Risk skor sozlamalari</Btn>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="red"   label="Yuqori risk"   value={high.length}   sub="Shaxsiy aloqa kerak" />
        <Stat tone="amber" label="O'rta risk"    value={medium.length} sub="Reja tavsiya qilinadi" />
        <Stat tone="blue"  label="Kuzatuv"       value={watch.length}  sub="Signal pasaymoqda" />
        <Stat tone="green" label="Yaxshi holat"  value={good.length}   sub="Faol progress" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "high",   label: "Yuqori",   icon: "alert-octagon",  count: high.length },
          { value: "medium", label: "O'rta",    icon: "alert-triangle", count: medium.length },
          { value: "watch",  label: "Kuzatuv",  icon: "eye",            count: watch.length },
          { value: "all",    label: "Barchasi", icon: "list",           count: atRisk.length },
        ]}
      />

      <Card style={{ marginTop: 10 }}>
        <Toolbar>
          <select className="select" style={{ width: 180 }}>
            <option>Kurs: Hammasi</option>
            <option>Sun'iy intellekt asoslari</option>
            <option>Production muhitida ML</option>
            <option>Tabiiy tilni qayta ishlash</option>
          </select>
          <select className="select" style={{ width: 160 }}>
            <option>Guruh: Hammasi</option>
            <option>AI-26-1B</option>
            <option>AI-26-1A</option>
            <option>ML-26-2A</option>
            <option>NLP-26</option>
          </select>
          <Chip icon="filter">Sabab: Hammasi</Chip>
          <div className="spacer" />
          <span style={{ fontSize: 12, color: "#8a93a6" }}>Saralash:</span>
          <Seg
            value="risk"
            onChange={() => {}}
            options={[
              { value: "risk",  label: "Risk" },
              { value: "name",  label: "Ism" },
              { value: "trend", label: "Trend" },
            ]}
          />
          <Btn size="sm" leftIcon="download">Eksport</Btn>
          {selCount > 0 && (
            <Btn size="sm" variant="primary" leftIcon="mail">
              Bulk intervention ({selCount})
            </Btn>
          )}
        </Toolbar>

        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th style={{ width: 32 }}>
                  <Check
                    value={allSelected}
                    onChange={(v) =>
                      setSel(v ? Object.fromEntries(visible.map((_, i) => [i, true])) : {})
                    }
                  />
                </th>
                <th>Talaba</th>
                <th>Guruh</th>
                <th className="center">Risk skor</th>
                <th>Asosiy sabablar</th>
                <th className="center">Trend</th>
                <th>Tavsiya etilgan ish</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "#8a93a6" }}>
                    <Icon name="shield-check" /> Bu risk darajasida talaba yo'q
                  </td>
                </tr>
              ) : (
                visible.map((s, i) => {
                  const tone = riskTone(s.risk)
                  const causes = causePills(s)
                  const sparkData = trendSpark(s)
                  return (
                    <tr key={s.name} className={sel[i] ? "selected" : ""}>
                      <td>
                        <Check value={!!sel[i]} onChange={(v) => setSel((p) => ({ ...p, [i]: v }))} />
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar name={s.name} tone={s.tone} size="sm" />
                          <div>
                            <div style={{ fontWeight: 600 }}>{s.name}</div>
                            <div style={{ fontSize: 11, color: "#8a93a6" }}>
                              progress {s.progress}% · davomat {s.attendance}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 12 }}>{s.group}</td>
                      <td className="center">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          <Donut
                            value={s.risk}
                            max={100}
                            tone={tone === "red" ? "#ef4444" : tone === "amber" ? "#f59e0b" : tone === "blue" ? "#3b82f6" : "#22c55e"}
                            size={40}
                            stroke={5}
                            center={
                              <span style={{ fontSize: 9, fontWeight: 800 }}>{s.risk}</span>
                            }
                          />
                          <Pill tone={tone}>{riskLabel(s.risk)}</Pill>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {causes.map((c) => (
                            <Pill key={c.label} tone={c.tone}>{c.label}</Pill>
                          ))}
                        </div>
                      </td>
                      <td className="center">
                        <Spark data={sparkData} tone={tone} />
                        <div style={{ fontSize: 10, color: "#8a93a6", marginTop: 2 }}>
                          {s.trend === "down" ? "↓ Yomonlashmoqda" : s.trend === "up" ? "↑ Yaxshilanmoqda" : "→ Barqaror"}
                        </div>
                      </td>
                      <td style={{ fontSize: 12, color: "#475569", maxWidth: 200 }}>
                        {interventionFor(s.risk)}
                      </td>
                      <td className="right">
                        <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                          <Btn size="xs" variant="ghost" leftIcon="message" />
                          <Btn size="xs" leftIcon="eye" onClick={() => setDrawer(s)}>
                            Batafsil
                          </Btn>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="card-foot">
          <span>
            {visible.length} / {STUDENTS.length} talaba · Risk modeli: v3.1 · 16-May 2026
          </span>
        </div>
      </Card>

      {/* ── Intervention drawer ── */}
      <Drawer
        open={drawer !== null}
        onClose={() => setDrawer(null)}
        title={drawer ? `Intervention — ${drawer.name}` : "Intervention"}
        footer={
          <>
            <Btn
              variant="primary"
              leftIcon="send"
              onClick={() => { setDrawer(null); setMessage("") }}
            >
              Yuborish
            </Btn>
            <Btn variant="ghost" onClick={() => setDrawer(null)}>Yopish</Btn>
          </>
        }
      >
        {drawer && (
          <div style={{ display: "grid", gap: 20 }}>
            {/* Student summary */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Avatar name={drawer.name} tone={drawer.tone} size="lg" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{drawer.name}</div>
                <div style={{ color: "#8a93a6", fontSize: 13 }}>{drawer.group}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <Pill tone={riskTone(drawer.risk)}>{drawer.risk} · {riskLabel(drawer.risk)} risk</Pill>
                  <Pill tone={drawer.trend === "up" ? "green" : drawer.trend === "down" ? "red" : "gray"}>
                    {drawer.trend === "up" ? "↑ Yaxshilanmoqda" : drawer.trend === "down" ? "↓ Yomonlashmoqda" : "→ Barqaror"}
                  </Pill>
                </div>
              </div>
            </div>

            {/* Donut pair */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "#8a93a6", marginBottom: 6 }}>Progress</div>
                <Donut
                  value={drawer.progress}
                  tone="#3b82f6"
                  size={80}
                  stroke={9}
                  center={<div className="num" style={{ fontSize: 15, fontWeight: 800 }}>{drawer.progress}%</div>}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#8a93a6", marginBottom: 6 }}>Davomat</div>
                <Donut
                  value={drawer.attendance}
                  tone={drawer.attendance >= 80 ? "#22c55e" : "#f59e0b"}
                  size={80}
                  stroke={9}
                  center={<div className="num" style={{ fontSize: 15, fontWeight: 800 }}>{drawer.attendance}%</div>}
                />
              </div>
            </div>

            {/* Key metrics */}
            <dl className="kv-list">
              <div><dt>GPA</dt><dd className="num">{drawer.gpa}%</dd></div>
              <div><dt>Kechikkan topshiriq</dt><dd className="num">{drawer.late} ta</dd></div>
              <div><dt>Risk darajasi</dt><dd><Pill tone={riskTone(drawer.risk)}>{riskLabel(drawer.risk)}</Pill></dd></div>
            </dl>

            {/* Causes */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Asosiy sabablar</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {causePills(drawer).map((c) => (
                  <Pill key={c.label} tone={c.tone}>{c.label}</Pill>
                ))}
              </div>
            </div>

            {/* Intervention type */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Intervention turi</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {INTERVENTION_TYPES.map((it) => (
                  <button
                    key={it.v}
                    type="button"
                    onClick={() => setInterventionType(it.v)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: `1px solid ${interventionType === it.v ? "var(--accent, #1f6feb)" : "var(--border)"}`,
                      background: interventionType === it.v ? "var(--accent-bg, #e8f0fe)" : "#fff",
                      color: interventionType === it.v ? "var(--accent, #1f6feb)" : "var(--text2)",
                      fontWeight: interventionType === it.v ? 700 : 500,
                      fontSize: 12,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      textAlign: "left",
                    }}
                  >
                    <Icon name={it.icon} /> {it.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Xabar matni</div>
              <textarea
                className="input"
                rows={4}
                value={message}
                placeholder={`${drawer.name}ga qo'llab-quvvatlash xabari yozing…`}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div style={{ fontSize: 11, color: "#8a93a6", marginTop: 4 }}>
                {message.length} belgi
              </div>
            </div>

            {/* Reminder frequency */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Eslatish davriyligi</div>
              <select
                className="select"
                value={reminderFreq}
                onChange={(e) => setReminderFreq(e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="once">Bir marta</option>
                <option value="weekly">Haftalik</option>
                <option value="biweekly">Ikki haftada bir</option>
                <option value="none">Eslatmasiz</option>
              </select>
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
