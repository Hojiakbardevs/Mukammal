import { Bar, Btn, Card, CardHead, Check, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"

const principles = [
  "Inson nazorati har bir yakuniy baholashda majburiy",
  "SI tavsiyasi rubric dalillari bilan ko'rsatiladi",
  "Shaxsiy ma'lumotlar minimal va maqsadli ishlatiladi",
  "Audit trail o'zgarmas va eksport qilinadigan bo'ladi",
]

const settings = [
  { label: "SI grading suggestion", enabled: true, value: 84 },
  { label: "Risk model threshold", enabled: true, value: 70 },
  { label: "Plagiarism detection", enabled: true, value: 92 },
  { label: "Auto publish grades", enabled: false, value: 0 },
]

export function AdminAIGovernance() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>SI boshqaruvi</h1>
          <p>Policy principles, SI grading settings, risk model, plagiarism detection va human oversight.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="history">Policy history</Btn>
          <Btn variant="primary" leftIcon="device-floppy">Saqlash</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="green" label="Policy version" value="3.1" sub="16-May 2026" />
        <Stat tone="blue" label="Human review" value="100" unit="%" sub="Majburiy" />
        <Stat tone="amber" label="Model threshold" value="70" unit="%" sub="Risk signali" />
        <Stat tone="purple" label="Audit retention" value="365" unit="kun" sub="WORM rejim" />
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="SI policy principles" actions={<Pill tone="purple" icon="shield-check">Governance</Pill>} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {principles.map((principle) => (
              <div key={principle} className="alert blue">
                <Icon name="checkup-list" />
                <div className="body">
                  <h4>{principle}</h4>
                  <p>NIST AI RMF va UNESCO GenAI guidance asosida ichki policyga moslashtirilgan.</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Sozlamalar" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {settings.map((setting) => (
              <div key={setting.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <Check value={setting.enabled} />
                  <b style={{ flex: 1 }}>{setting.label}</b>
                  <Pill tone={setting.enabled ? "green" : "gray"}>{setting.enabled ? "Yoqilgan" : "O'chirilgan"}</Pill>
                </div>
                <Bar value={setting.value} tone={setting.enabled ? "blue" : "red"} thin />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid c-3" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Risk model settings" />
          <div className="card-pad">
            <div className="note">Risk modeli progress, davomat, kechikish va Q&A faolligini hisoblaydi. Signal faqat yordam rejasini boshlaydi.</div>
          </div>
        </Card>
        <Card>
          <CardHead title="Plagiarism detection settings" />
          <div className="card-pad">
            <div className="note">Kod o'xshashligi, matn similarity va fayl metadata dalil sifatida ko'rsatiladi, avtomatik jazo qo'llanmaydi.</div>
          </div>
        </Card>
        <Card>
          <CardHead title="Audit trail policy" />
          <div className="card-pad">
            <div className="note">Baholash override, policy update va role change eventlari hash zanjir bilan saqlanadi.</div>
          </div>
        </Card>
      </div>

      <div className="alert amber" style={{ marginTop: 14 }}>
        <Icon name="alert-triangle" />
        <div className="body">
          <h4>Human oversight note</h4>
          <p>SI hech qachon yakuniy bahoni mustaqil e'lon qilmaydi. Trener yoki reviewer tasdig'i majburiy.</p>
        </div>
      </div>
    </>
  )
}
