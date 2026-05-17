import { Bar, Btn, Card, CardHead, Donut, Icon} from "@/components/dashboard/LmsPrimitives"
import { BADGES, ME, MY_CERTS } from "@/data/studentData"

/* ── Certificate canvas ── */
type CertStyle = "teal" | "blue" | "gold" | "dark"

const CERT_PALETTE: Record<CertStyle, { a: string; b: string; ink: string }> = {
  teal: { a: "#0d9488", b: "#14b8a6", ink: "#134e4a" },
  blue: { a: "#1d4ed8", b: "#3b82f6", ink: "#0a3a8c" },
  gold: { a: "#a16207", b: "#ca8a04", ink: "#78350f" },
  dark: { a: "#0f1d3a", b: "#1e3a8a", ink: "#0c1733" },
}

function CertCanvas({ style, course, score, date, name }: {
  style: string; course: string; score: number; date: string; name: string
}) {
  const p = CERT_PALETTE[(style as CertStyle)] ?? CERT_PALETTE.blue
  const certId = `AIRI-${Math.abs(course.length * 1071).toString(16).toUpperCase()}`

  return (
    <div style={{
      aspectRatio: "1.41 / 1", width: "100%", borderRadius: 12,
      position: "relative", background: "#fff", overflow: "hidden",
      border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
    }}>
      {/* Background radial */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 0% 0%, ${p.b}18, transparent 50%), radial-gradient(circle at 100% 100%, ${p.a}22, transparent 60%)` }} />
      {/* Top stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: `linear-gradient(90deg, ${p.a}, ${p.b})` }} />
      {/* Bottom stripe */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: p.b }} />

      <div style={{ position: "absolute", inset: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: p.ink, textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 0.18, textTransform: "uppercase", fontWeight: 700, opacity: 0.6 }}>AIRI Training</div>
        <div style={{ fontWeight: 700, fontSize: 26, marginTop: 4 }}>Sertifikat</div>
        <div style={{ width: 48, height: 2, background: p.a, margin: "12px 0" }} />
        <div style={{ fontSize: 11, opacity: 0.7 }}>quyidagi shaxsga beriladi</div>
        <div style={{ fontWeight: 700, fontSize: 22, marginTop: 6 }}>{name}</div>
        <div style={{ fontSize: 11.5, opacity: 0.78, marginTop: 12, padding: "0 20px" }}>
          "{course}" kursini muvaffaqiyatli tugatdi · Ball: <b>{score}</b>
        </div>
        <div style={{ display: "flex", gap: 30, marginTop: 18, fontSize: 9, opacity: 0.7 }}>
          <div>
            <div style={{ height: 14, width: 80, borderBottom: `1px solid ${p.ink}`, marginBottom: 3 }} />
            Trener
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px dashed ${p.a}`, display: "grid", placeItems: "center", fontSize: 8 }}>
            QR
          </div>
          <div>
            <div style={{ height: 14, width: 80, borderBottom: `1px solid ${p.ink}`, marginBottom: 3 }} />
            Direktor
          </div>
        </div>
        <div style={{ position: "absolute", left: 24, bottom: 22, fontSize: 9, opacity: 0.5, fontFamily: "var(--mono)" }}>
          {date} · ID: {certId}
        </div>
      </div>
    </div>
  )
}

export function StudentCertificates() {
  return (
    <>
      {/* ── Track + Badges ── */}
      <div className="grid c-7-5" style={{ marginBottom: 18 }}>
        {/* Track progress */}
        <Card style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)", border: "1px solid #ddd6fe" }}>
          <div style={{ padding: 22, display: "flex", gap: 18, alignItems: "center" }}>
            <Donut
              size={100} stroke={12}
              value={ME.certificateProgress} max={100}
              tone="#7c3aed" trackTone="#fff"
              center={
                <div style={{ textAlign: "center" }}>
                  <div className="num" style={{ fontSize: 24, fontWeight: 800, color: "#4c1d95" }}>{ME.certificateProgress}%</div>
                  <div style={{ fontSize: 10, color: "#7c3aed" }}>YO'L</div>
                </div>
              }
            />
            <div>
              <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase" }}>O'quv yo'li</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#4c1d95" }}>AI Engineer Track</div>
              <div style={{ fontSize: 12.5, color: "#4c1d95", marginTop: 4 }}>
                2 ta kurs qoldi: <b>NLP</b> va <b>ML in Production</b>
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <Btn variant="primary" size="sm" leftIcon="player-play">Davom etish</Btn>
                <Btn size="sm" leftIcon="info-circle">Yo'l haqida</Btn>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges */}
        <Card>
          <CardHead title="Yutuqlar" sub={`· ${BADGES.length} ta · ${ME.points} XP`} />
          <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {BADGES.map((b, i) => (
              <div key={i} style={{ textAlign: "center", padding: 10, border: "1px solid var(--hairline)", borderRadius: 10 }}>
                <span className="thumb" style={{
                  display: "inline-grid",
                  background: b.tone === "amber" ? "var(--amber-bg)" : b.tone === "blue" ? "var(--accent-light)" : b.tone === "purple" ? "var(--purple-bg)" : b.tone === "teal" ? "#ecfeff" : "var(--green-bg)",
                  color: b.tone === "amber" ? "var(--amber)" : b.tone === "blue" ? "var(--accent)" : b.tone === "purple" ? "var(--purple)" : b.tone === "teal" ? "#0e7490" : "var(--green)",
                  width: 44, height: 44, margin: "0 auto",
                }}>
                  <Icon name={b.icon} style={{ fontSize: 22 }} />
                </span>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6, lineHeight: 1.2 }}>{b.title}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Certificates list ── */}
      <Card>
        <CardHead
          title="Mening sertifikatlarim"
          count={MY_CERTS.length}
          actions={
            <>
              <Btn size="sm" leftIcon="qr-code">QR verifikatsiya</Btn>
              <Btn size="sm" leftIcon="link">Public profil</Btn>
            </>
          }
        />
        <div style={{ padding: 18, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 18 }}>
          {MY_CERTS.map((c) => (
            <div key={c.id}>
              <CertCanvas style={c.style} course={c.title} score={c.score} date={c.issuedAt} name={ME.name} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{c.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text3)" }}>{c.issuedAt} · Ball: <b>{c.score}</b></div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn size="sm" leftIcon="download">PDF</Btn>
                  <Btn size="sm" leftIcon="brand-linkedin">LinkedIn</Btn>
                  <Btn size="sm" variant="ghost" leftIcon="copy" />
                </div>
              </div>
              {c.verified && (
                <div style={{ marginTop: 8, fontSize: 11.5, color: "var(--green-ink)", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="shield-check" /> Open Badges 3.0 · Verifiable credential
                </div>
              )}
            </div>
          ))}

          {/* In-progress placeholder */}
          <div style={{
            border: "2px dashed var(--border2)", borderRadius: 12, padding: 24,
            display: "grid", placeItems: "center", color: "var(--text3)",
            aspectRatio: "1.41 / 1",
          }}>
            <div style={{ textAlign: "center" }}>
              <Icon name="lock" style={{ fontSize: 32, marginBottom: 8 }} />
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text2)" }}>AI Engineer Track</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>2 ta kurs qolgan</div>
              <div style={{ marginTop: 8 }}>
                <Bar value={ME.certificateProgress} tone="purple" />
              </div>
              <div style={{ marginTop: 6, fontSize: 11 }}>{ME.certificateProgress}% bajarildi</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
