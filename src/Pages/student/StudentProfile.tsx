import { useState } from "react"

import { Avatar, Btn, Card, CardHead, Icon, Pill } from "@/components/dashboard/LmsPrimitives"
import { ME, MY_COURSES } from "@/data/studentData"

const NOTIFICATION_ROWS = [
  { label: "Yangi material va dars chiqishi",          on: true },
  { label: "Topshiriq muddatlari (3 / 1 kun avval)",   on: true },
  { label: "Baho qo'yilganda",                         on: true },
  { label: "Q&A javoblari",                            on: true },
  { label: "Guruh reyting yangiliklari",               on: false },
  { label: "Reklama va marketing",                     on: false },
]

function Toggle({ on }: { on: boolean }) {
  return (
    <button style={{
      width: 38, height: 22, borderRadius: 999, border: 0, cursor: "pointer",
      background: on ? "var(--accent)" : "var(--bg3)", position: "relative",
      transition: "background 0.2s",
    }}>
      <span style={{
        position: "absolute", top: 2,
        left: on ? 18 : 2,
        width: 18, height: 18,
        borderRadius: 999, background: "#fff",
        boxShadow: "var(--shadow-sm)",
        transition: "left 0.2s",
      }} />
    </button>
  )
}

export function StudentProfile() {
  const [bio, setBio] = useState(
    "Lingvistika va statistika kesishmasidagi ishlarga qiziqaman. AI Track yakunidan keyin o'zbek tilidagi NLP loyihalarga e'tibor qaratmoqchiman."
  )
  const activeCourses = MY_COURSES.filter((c) => c.status === "active")

  return (
    <div className="grid c-7-5">
      {/* ── LEFT ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Profile card */}
        <Card>
          <div style={{ padding: 22, display: "flex", gap: 18, alignItems: "flex-start" }}>
            <Avatar name={ME.name} tone={ME.tone} size="xl" />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{ME.name}</h2>
              <div style={{ fontSize: 12.5, color: "var(--text3)", marginBottom: 8 }}>
                aziza.m@stud.uz · ID 1842 · {ME.group} guruhi
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Pill tone="blue" dot>Aktiv</Pill>
                <Pill tone="purple">{ME.learningStream}</Pill>
                <Pill tone="green">Level {ME.level}</Pill>
              </div>
            </div>
            <Btn variant="primary" leftIcon="edit">Profil tahrirlash</Btn>
          </div>
        </Card>

        {/* Personal info form */}
        <Card>
          <CardHead title="Shaxsiy ma'lumotlar" />
          <div style={{ padding: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field">
              <label className="label">F.I.O.</label>
              <input className="input" defaultValue={ME.name} />
            </div>
            <div className="field">
              <label className="label">Telefon</label>
              <input className="input mono" defaultValue="+998 90 123 45 67" />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" defaultValue="aziza.m@stud.uz" />
            </div>
            <div className="field">
              <label className="label">Tug'ilgan sana</label>
              <input className="input mono" defaultValue="12.04.2001" />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label className="label">Bio (guruh profilida ko'rinadi)</label>
              <textarea className="input" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </div>
          <div style={{ padding: "0 22px 22px", display: "flex", gap: 8 }}>
            <Btn variant="primary" leftIcon="check">Saqlash</Btn>
            <Btn variant="ghost">Bekor qilish</Btn>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHead title="Bildirishnomalar" />
          <div style={{ padding: 18 }}>
            {NOTIFICATION_ROWS.map((r, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 4px",
                borderBottom: i < NOTIFICATION_ROWS.length - 1 ? "1px solid var(--hairline)" : "none",
              }}>
                <div style={{ fontSize: 12.5 }}>{r.label}</div>
                <Toggle on={r.on} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── RIGHT ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Learning stats */}
        <Card>
          <CardHead title="O'quv statistikasi" />
          <div style={{ padding: 18 }}>
            <div className="kv-list">
              <div className="kv"><span className="k">O'rtacha baho</span><span className="v num">{ME.avgScore}</span></div>
              <div className="kv"><span className="k">Tugatilgan kurslar</span><span className="v num">{ME.completed}/{ME.enrolled}</span></div>
              <div className="kv"><span className="k">Sertifikatlar</span><span className="v num">{ME.certs}</span></div>
              <div className="kv"><span className="k">Streak</span><span className="v">{ME.streak} kun 🔥</span></div>
              <div className="kv"><span className="k">XP ballar</span><span className="v num">{ME.points}</span></div>
              <div className="kv"><span className="k">Guruh reytingi</span><span className="v">#{ME.weeklyRank} / {ME.totalStudents} o'quvchi</span></div>
              <div className="kv"><span className="k">Yulduzlar</span><span className="v num">{ME.stars} ⭐</span></div>
            </div>
          </div>
        </Card>

        {/* Active courses mini */}
        <Card>
          <CardHead title="Aktiv kurslar" count={activeCourses.length} />
          <div style={{ padding: "0 18px 14px" }}>
            {activeCourses.map((c) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--hairline)" }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{c.title}</div>
                <span className="num" style={{ fontSize: 12, fontWeight: 700 }}>{c.progress}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Security */}
        <Card>
          <CardHead title="Xavfsizlik" />
          <div style={{ padding: 18, display: "grid", gap: 8 }}>
            <Btn leftIcon="key" style={{ width: "100%" }}>Parolni o'zgartirish</Btn>
            <Btn leftIcon="lock" style={{ width: "100%" }}>
              <span style={{ color: "var(--green)" }}><Icon name="check" /></span> 2FA yoqilgan
            </Btn>
            <Btn leftIcon="login" style={{ width: "100%" }}>Aktiv sessiyalar</Btn>
          </div>
        </Card>

        {/* Help */}
        <Card>
          <div style={{ padding: "16px 18px 18px" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Yordam kerakmi?</h3>
            <div style={{ display: "grid", gap: 8 }}>
              <Btn leftIcon="message" style={{ width: "100%" }}>Adminga murojaat</Btn>
              <Btn leftIcon="file-text" style={{ width: "100%" }}>FAQ va qo'llanma</Btn>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
