import { Bar, Btn, Card, CardHead, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { CERTIFICATE_TEMPLATES, USERS } from "@/data/lmsData"

const issued = USERS.filter((user) => user.status === "completed").map((user, index) => ({
  id: `cert-${index + 1}`,
  name: user.name,
  template: "NLP amaliyoti",
  issuedAt: "16-May 2026",
  verification: `VRF-26-${1040 + index}`,
}))

export function AdminCertificates() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sertifikat shablonlari</h1>
          <p>Sertifikat shablonlari, oldindan ko'rinish, moslik qoidalari va berilgan sertifikatlar jadvali.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="plus">Shablon yaratish</Btn>
          <Btn variant="primary" leftIcon="stamp">Issue batch</Btn>
        </div>
      </div>

      <div className="stat-grid cols-3" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Shablonlar" value={CERTIFICATE_TEMPLATES.length} sub="Faol shablonlar" />
        <Stat tone="green" label="Issued" value={CERTIFICATE_TEMPLATES.reduce((sum, item) => sum + item.issued, 0)} sub="Jami berilgan" />
        <Stat tone="purple" label="Verification" value="100" unit="%" sub="QR tekshiruv yoqilgan" />
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Sertifikat shablonlari" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {CERTIFICATE_TEMPLATES.map((template) => (
              <div key={template.id} className="alert">
                <span className="thumb" style={{ background: template.color, color: "#fff" }}>
                  <Icon name="award" />
                </span>
                <div className="body">
                  <h4>{template.title}</h4>
                  <p>{template.issuer} · {template.rule}</p>
                </div>
                <Pill tone="green">{template.issued} berilgan</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Sertifikat oldindan ko'rinishi" />
          <div className="card-pad">
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 22, minHeight: 240, background: "linear-gradient(135deg, #fff, #eef4ff)", display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>AIRI Training</b>
                <Pill tone="blue">Tasdiqlangan</Pill>
              </div>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>Sertifikat</div>
                <p style={{ color: "var(--text2)", marginTop: 8 }}>Aziza Mahmudova · NLP amaliyoti</p>
              </div>
              <Bar value={100} tone="blue" />
              <div className="note">QR verification, issuer signature va Open Badges metadata maydonlari saqlanadi.</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid c-2" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Moslik qoidalari" />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {["Progress 90%+", "Yakuniy ball 70%+", "Final loyiha tasdiqlangan", "Feedback so'rovnomasi to'ldirilgan"].map((rule) => (
              <div key={rule} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="check on" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Berilgan sertifikatlar jadvali" count={issued.length} />
          <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
            <table className="t">
              <thead>
                <tr>
                  <th>Tinglovchi</th>
                  <th>Template</th>
                  <th>Sana</th>
                  <th>Verification</th>
                </tr>
              </thead>
              <tbody>
                {issued.map((row) => (
                  <tr key={row.id}>
                    <td><b>{row.name}</b></td>
                    <td>{row.template}</td>
                    <td>{row.issuedAt}</td>
                    <td className="mono">{row.verification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
