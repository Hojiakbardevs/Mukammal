import { useState } from "react"

import { Avatar, Bar, Btn, Card, Donut, Drawer, Icon, Pill, Stat, Tabs } from "@/components/dashboard/LmsPrimitives"
import { STUDENTS, type StudentRecord } from "@/data/lmsData"

function riskTone(risk: number) {
  return risk >= 75 ? "red" : risk >= 55 ? "amber" : "blue"
}

function reasonFor(student: StudentRecord) {
  if (student.attendance < 70) return "Davomat past, ketma-ket darslar o'tkazib yuborilgan."
  if (student.progress < 45) return "Progress kurs o'rtachasidan sezilarli past."
  if (student.late > 1) return "Topshiriq kechikishi oshib ketgan."
  return "Qo'shimcha kuzatuv tavsiya qilinadi."
}

function interventionFor(risk: number) {
  if (risk >= 80) return "24 soat ichida shaxsiy check-in va mentor biriktirish."
  if (risk >= 60) return "Haftalik mini-reja va missed lesson reminder."
  return "Avtomatik reminder va keyingi darsda qisqa suhbat."
}

export function TeacherRiskPanel() {
  const [tab, setTab] = useState("high")
  const [drawer, setDrawer] = useState<StudentRecord | null>(null)

  const all = STUDENTS.filter((s) => s.risk >= 40).sort((a, b) => b.risk - a.risk)
  const high = all.filter((s) => s.risk >= 75)
  const medium = all.filter((s) => s.risk >= 55 && s.risk < 75)
  const watch = all.filter((s) => s.risk < 55)
  const good = STUDENTS.filter((s) => s.risk < 40)

  const displayed =
    tab === "high" ? high :
    tab === "medium" ? medium :
    tab === "watch" ? watch : all

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Risk paneli</h1>
          <p>Risk score, sabab va tavsiya qilingan aralashuv qo'llab-quvvatlash ohangida ko'rsatiladi.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="download">Eksport</Btn>
          <Btn variant="primary" leftIcon="mail">Guruh xabari</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="red"   label="Yuqori risk"   value={high.length}   sub="Shaxsiy aloqa kerak" />
        <Stat tone="amber" label="O'rta risk"    value={medium.length} sub="Reja tavsiya qilinadi" />
        <Stat tone="blue"  label="Kuzatuv"       value={watch.length}  sub="Signal pasaymoqda" />
        <Stat tone="green" label="Yaxshi holat"  value={good.length}   sub="Faol progress" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "high",   label: "Yuqori",  icon: "alert-octagon", count: high.length },
          { value: "medium", label: "O'rta",   icon: "alert-triangle", count: medium.length },
          { value: "watch",  label: "Kuzatuv", icon: "eye",           count: watch.length },
          { value: "all",    label: "Barchasi", icon: "list",          count: all.length },
        ]}
      />

      <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
        {displayed.length === 0 ? (
          <div className="empty">
            <Icon name="shield-check" />
            <p>Bu risk darajasida tinglovchi yo'q</p>
          </div>
        ) : (
          displayed.map((student) => (
            <Card key={student.name}>
              <div className="card-pad">
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                  <Avatar name={student.name} tone={student.tone} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{student.name}</span>
                      <Pill tone={riskTone(student.risk)}>{student.risk} risk</Pill>
                      <Pill tone={student.trend === "up" ? "green" : student.trend === "down" ? "red" : "gray"}>
                        {student.trend === "up" ? "↑ Yaxshilanmoqda" : student.trend === "down" ? "↓ Yomonlashmoqda" : "→ Barqaror"}
                      </Pill>
                    </div>
                    <div style={{ color: "var(--text2)", fontSize: 13 }}>
                      {student.group} · progress {student.progress}% · davomat {student.attendance}% · {student.late} kechikish
                    </div>
                  </div>
                  <Btn size="sm" variant="ghost" leftIcon="eye" onClick={() => setDrawer(student)}>Batafsil</Btn>
                </div>

                <Bar value={student.risk} tone={riskTone(student.risk)} />

                <div className="grid c-2" style={{ marginTop: 12 }}>
                  <div className="note">
                    <Icon name="alert-circle" />
                    <div>
                      <b>Sabab:</b> {reasonFor(student)}
                    </div>
                  </div>
                  <div className="note">
                    <Icon name="brain" />
                    <div>
                      <b>Tavsiya:</b> {interventionFor(student.risk)}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <Btn size="sm" variant="primary" leftIcon="message">Yordam xabari</Btn>
                  <Btn size="sm" leftIcon="calendar-plus">Mentor call</Btn>
                  <Btn size="sm" variant="ghost" leftIcon="notes">Izoh qo'shish</Btn>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* ── Tinglovchi drawer ── */}
      <Drawer
        open={drawer !== null}
        onClose={() => setDrawer(null)}
        title="Tinglovchi batafsil ko'rinish"
        footer={
          <>
            <Btn variant="primary" leftIcon="message">Yordam xabari yuborish</Btn>
            <Btn variant="ghost" onClick={() => setDrawer(null)}>Yopish</Btn>
          </>
        }
      >
        {drawer && (
          <div style={{ display: "grid", gap: 20 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Avatar name={drawer.name} tone={drawer.tone} size="lg" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{drawer.name}</div>
                <div style={{ color: "var(--text2)" }}>{drawer.group}</div>
                <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
                  <Pill tone={riskTone(drawer.risk)}>{drawer.risk} risk</Pill>
                  <Pill tone={drawer.trend === "up" ? "green" : drawer.trend === "down" ? "red" : "gray"}>
                    {drawer.trend === "up" ? "Yaxshilanmoqda" : drawer.trend === "down" ? "Yomonlashmoqda" : "Barqaror"}
                  </Pill>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, placeItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>Progress</div>
                <Donut
                  value={drawer.progress}
                  tone="#3b82f6"
                  size={84}
                  stroke={10}
                  center={
                    <div>
                      <div className="num" style={{ fontSize: 16, fontWeight: 800 }}>{drawer.progress}%</div>
                    </div>
                  }
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 6 }}>Davomat</div>
                <Donut
                  value={drawer.attendance}
                  tone={drawer.attendance >= 80 ? "#22c55e" : "#f59e0b"}
                  size={84}
                  stroke={10}
                  center={
                    <div>
                      <div className="num" style={{ fontSize: 16, fontWeight: 800 }}>{drawer.attendance}%</div>
                    </div>
                  }
                />
              </div>
            </div>

            <dl className="kv-list">
              <div><dt>O'rtacha ball</dt><dd className="num">{drawer.gpa}%</dd></div>
              <div><dt>Kechikkan topshiriq</dt><dd className="num">{drawer.late} ta</dd></div>
              <div><dt>Risk darajasi</dt><dd><Pill tone={riskTone(drawer.risk)}>{drawer.risk >= 75 ? "Yuqori" : drawer.risk >= 55 ? "O'rta" : "Past"}</Pill></dd></div>
            </dl>

            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Sabab tahlili</div>
              <div className="note">
                <Icon name="alert-circle" />
                {reasonFor(drawer)}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Tavsiya etilgan aralashuv</div>
              <div className="note">
                <Icon name="brain" />
                {interventionFor(drawer.risk)}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
