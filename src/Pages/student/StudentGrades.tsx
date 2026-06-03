import { Bar, Card, Donut, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { ME, MY_GRADES } from "@/data/studentData"

export function StudentGrades() {
  const grades = MY_GRADES.byCourse
  const highest = Math.max(...grades.map((g) => g.current))
  const lowest  = Math.min(...grades.filter((g) => g.current > 0).map((g) => g.current))

  function gradePill(score: number) {
    if (score === 0) return <Pill tone="gray">Hali baho yo'q</Pill>
    if (score >= 90) return <Pill tone="green">A · A'lo</Pill>
    if (score >= 75) return <Pill tone="blue">B · Yaxshi</Pill>
    if (score >= 60) return <Pill tone="amber">C · Qoniqarli</Pill>
    return <Pill tone="red">O'tish chegarasidan past</Pill>
  }

  const components: { key: keyof typeof grades[0]["components"]; label: string; weight: keyof typeof grades[0]["weights"] }[] = [
    { key: "attendance", label: "Davomat",  weight: "attendance" },
    { key: "quiz",       label: "Quiz",      weight: "quiz" },
    { key: "homework",   label: "Uy ishi",   weight: "homework" },
    { key: "exam",       label: "Imtihon",   weight: "exam" },
    { key: "final",      label: "Yakuniy",   weight: "final" },
  ]

  return (
    <>
      {/* Info banner */}
      <div className="alert blue" style={{ marginBottom: 14 }}>
        <Icon name="info-circle" />
        <div className="body">
          <h4>Baho va engagement bir-biridan alohida</h4>
          <p>Bu yerda akademik bahoyingiz ko'rsatiladi. Yutuqlar, streak va XP ballar alohida — ular sertifikatga ta'sir qilmaydi.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="blue"   label="O'rt. baho"       value={ME.avgScore}   sub="3 aktiv kurs"                        trend={{ dir: "up", label: "+2 hafta" }} />
        <Stat tone="green"  label="Eng yuqori"        value={highest}       sub={grades.find((g) => g.current === highest)?.course ?? ""} />
        <Stat tone="amber"  label="E'tibor talab"     value={lowest}        sub="target 85 · ML in Production" />
        <Stat tone="purple" label="O'tish chegarasi"  value={60} unit="ball" sub="sertifikat uchun minimum" />
      </div>

      {/* Per-course cards */}
      {grades.map((g, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <div style={{ padding: 18, display: "grid", gridTemplateColumns: "1fr 110px", gap: 18, alignItems: "center" }}>
            <div>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{g.course}</div>
                {gradePill(g.current)}
                <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--text3)" }}>
                  Target: <b style={{ color: "#0f172a" }}>{g.target}</b>
                </div>
              </div>

              {/* 5-component grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {components.map(({ key, label, weight }) => {
                  const val = g.components[key]
                  const w   = g.weights[weight]
                  return (
                    <div key={key} style={{ padding: 10, border: "1px solid var(--hairline)", borderRadius: 8 }}>
                      <div style={{ fontSize: 10.5, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.05, fontWeight: 700 }}>
                        {label} · {w}%
                      </div>
                      <div className="num" style={{ fontSize: 18, fontWeight: 800, marginTop: 4, color: val === 0 ? "var(--text3)" : "#0f172a" }}>
                        {val === 0 ? "—" : val}
                      </div>
                      {val > 0 && (
                        <Bar value={val} tone={val >= 90 ? "green" : val >= 70 ? "blue" : "amber"} thin />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Feedback */}
              {g.feedback && (
                <div className="note" style={{ marginTop: 10, fontSize: 12 }}>
                  <Icon name="message-circle" /> {g.feedback}
                </div>
              )}
            </div>

            {/* Donut */}
            <Donut
              size={104} stroke={12}
              value={g.current} max={100}
              tone={g.current >= 90 ? "#16a34a" : g.current >= 60 ? "#1f6feb" : "#dc2626"}
              center={
                <div style={{ textAlign: "center" }}>
                  <div className="num" style={{ fontSize: 22, fontWeight: 800 }}>{g.current}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)" }}>JORIY</div>
                </div>
              }
            />
          </div>
        </Card>
      ))}
    </>
  )
}
