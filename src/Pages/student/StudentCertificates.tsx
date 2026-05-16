import { Bar, Btn, Card, CardHead, Icon, Pill } from "@/components/dashboard/LmsPrimitives"
import { ME, MY_CERTS } from "@/data/studentData"

const eligibility = [
  { label: "Kurs progressi 90% dan yuqori", done: false },
  { label: "Yakuniy loyiha topshirilgan", done: false },
  { label: "O'rtacha ball 70% dan yuqori", done: true },
  { label: "Feedback so'rovnomasi to'ldirilgan", done: true },
]

export function StudentCertificates() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sertifikatlar</h1>
          <p>Berilgan sertifikatlar, eligibility checklist va QR verification maketi.</p>
        </div>
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Mening sertifikatlarim" count={MY_CERTS.length} />
          <div className="card-pad" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {MY_CERTS.map((cert) => (
              <div key={cert.id} style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #ffffff, #f8fafc)" }}>
                <div style={{ height: 8, background: cert.style === "teal" ? "#0d9488" : "#1f6feb" }} />
                <div style={{ padding: 18 }}>
                  <Pill tone={cert.verified ? "green" : "amber"} icon="shield-check">{cert.verified ? "Tasdiqlangan" : "Tekshiruvda"}</Pill>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 12 }}>{cert.title}</h3>
                  <p style={{ color: "var(--text2)", marginTop: 4 }}>AIRI Training · {cert.issuedAt}</p>
                  <div className="row-div" />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "var(--text3)", fontSize: 11 }}>Natija</div>
                      <div className="num" style={{ fontSize: 24, fontWeight: 800 }}>{cert.score}%</div>
                    </div>
                    <Btn size="sm" leftIcon="download">Yuklab olish</Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="QR verification" actions={<Pill tone="blue">Mock</Pill>} />
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            <div style={{ width: 160, height: 160, border: "1px solid var(--border)", borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5, padding: 12, margin: "0 auto", background: "#fff" }}>
              {Array.from({ length: 25 }, (_item, index) => (
                <span key={index} style={{ borderRadius: 3, background: index % 2 === 0 || index % 7 === 0 ? "#0c1733" : "#eef1f7" }} />
              ))}
            </div>
            <div className="note">verify.airi.uz/cert/c1 · sertifikat ID, ball va berilgan sana tekshiriladi.</div>
          </div>
        </Card>
      </div>

      <div className="grid c-2" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Keyingi sertifikatga tayyorlik" sub="AI Track" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            <Bar value={ME.certificateProgress} tone="green" thick />
            {eligibility.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={`check ${item.done ? "on" : ""}`} />
                <span style={{ flex: 1 }}>{item.label}</span>
                <Pill tone={item.done ? "green" : "amber"}>{item.done ? "Bajarilgan" : "Kutilmoqda"}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Yutuqlar" />
          <div className="card-pad">
            <div className="alert green">
              <Icon name="trophy" />
              <div className="body">
                <h4>Sertifikat portfeli</h4>
                <p>2 ta sertifikat berilgan, AI Track uchun progress {ME.certificateProgress}%.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
