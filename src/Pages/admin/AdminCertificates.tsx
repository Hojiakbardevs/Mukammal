import { useState } from "react"

import {
  Avatar,
  Btn,
  Card,
  Chip,
  Icon,
  Modal,
  Pill,
  Seg,
  Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { CERTIFICATE_TEMPLATES } from "@/data/lmsData"
import type { CertificateTemplate, CertStyle } from "@/data/lmsData"

type Palette = { a: string; b: string; ink: string }

function getPalette(style: CertStyle): Palette {
  switch (style) {
    case "gold": return { a: "#a16207", b: "#ca8a04", ink: "#78350f" }
    case "teal": return { a: "#0d9488", b: "#14b8a6", ink: "#134e4a" }
    case "mono": return { a: "#1f2937", b: "#374151", ink: "#0f172a" }
    case "navy": return { a: "#0f1d3a", b: "#1e3a8a", ink: "#0c1733" }
    default:     return { a: "#1d4ed8", b: "#3b82f6", ink: "#0a3a8c" }
  }
}

function CertCanvas({ style, name }: { style: CertStyle; name: string }) {
  const p = getPalette(style)
  return (
    <div style={{
      aspectRatio: "1.41 / 1",
      width: "100%",
      borderRadius: 10,
      position: "relative",
      background: "#fff",
      overflow: "hidden",
      border: "1px solid var(--border)",
    }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 0% 0%, ${p.b}18, transparent 50%), radial-gradient(circle at 100% 100%, ${p.a}22, transparent 60%)` }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: `linear-gradient(90deg, ${p.a}, ${p.b})` }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: p.b }} />
      <div style={{ position: "absolute", inset: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: p.ink, textAlign: "center" }}>
        <div style={{ fontSize: 9, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: 700, opacity: 0.6 }}>AIRI Training</div>
        <div style={{ fontWeight: 700, fontSize: 18, marginTop: 4 }}>Sertifikat</div>
        <div style={{ width: 36, height: 1.5, background: p.a, margin: "8px 0" }} />
        <div style={{ fontSize: 10, opacity: 0.7 }}>quyidagi shaxsga beriladi</div>
        <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>[TALABA F.I.O.]</div>
        <div style={{ fontSize: 9, opacity: 0.7, marginTop: 6, padding: "0 14px" }}>{name}</div>
        <div style={{ display: "flex", gap: 24, marginTop: 14, fontSize: 7.5, opacity: 0.7 }}>
          <div>
            <div style={{ height: 12, width: 50, borderBottom: `1px solid ${p.ink}`, marginBottom: 2 }} />
            Trainer
          </div>
          <div>
            <div style={{ height: 12, width: 50, borderBottom: `1px solid ${p.ink}`, marginBottom: 2 }} />
            Director
          </div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px dashed ${p.a}`, display: "grid", placeItems: "center", fontSize: 6 }}>
            QR
          </div>
        </div>
      </div>
    </div>
  )
}

type Filter = "active" | "draft" | "archived"

const SIGNERS = [
  { n: "Aziza Tursunova",  r: "Lead Trainer", tone: "b1" },
  { n: "Rustam Abdullaev", r: "Direktor",      tone: "b3" },
]

export function AdminCertificates() {
  const [filter, setFilter] = useState<Filter>("active")
  const [open, setOpen] = useState<CertificateTemplate | null>(null)
  const [lang, setLang] = useState("uz")

  const visible = CERTIFICATE_TEMPLATES.filter((t) => t.status === filter)

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sertifikat shablonlari</h1>
          <p>Shablon yaratish, oldindan ko'rish, moslik qoidalari va berilgan sertifikatlar tarixi.</p>
        </div>
      </div>

      <Toolbar>
        <Chip icon="check" active={filter === "active"}   onClick={() => setFilter("active")}>Aktiv</Chip>
        <Chip icon="edit"  active={filter === "draft"}    onClick={() => setFilter("draft")}>Draft</Chip>
        <Chip icon="archive" active={filter === "archived"} onClick={() => setFilter("archived")}>Archiv</Chip>
        <div style={{ flex: 1 }} />
        <Btn leftIcon="copy">Shablon nusxalash</Btn>
        <Btn variant="primary" leftIcon="plus">Yangi shablon</Btn>
      </Toolbar>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginTop: 14 }}>
        {visible.map((c) => (
          <Card
            key={c.id}
            className="card-pad"
            style={{ display: "flex", flexDirection: "column", gap: 12, cursor: "pointer" }}
            onClick={() => setOpen(c)}
          >
            <CertCanvas style={c.style} name={c.name} />
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{c.name}</div>
                {c.status === "active"   && <Pill tone="green" dot>active</Pill>}
                {c.status === "draft"    && <Pill tone="amber" dot>draft</Pill>}
                {c.status === "archived" && <Pill tone="gray"  dot>archived</Pill>}
              </div>
              <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
                <span><Icon name="signature" /> {c.signers} imzo</span>
                <span><Icon name="forms" /> {c.fields} maydon</span>
                <span><Icon name="award" /> {c.issued} berildi</span>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--text3)", marginTop: 4 }}>Yangilangan: {c.updated}</div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        title={open ? `Sertifikat shabloni · ${open.name}` : ""}
        width={820}
        footer={
          <>
            <Btn variant="danger" leftIcon="trash">Arxivga</Btn>
            <div style={{ flex: 1 }} />
            <Btn onClick={() => setOpen(null)}>Yopish</Btn>
            <Btn variant="primary" leftIcon="check">Saqlash</Btn>
          </>
        }
      >
        {open && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <CertCanvas style={open.style} name={open.name} />
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                <Btn size="sm" leftIcon="palette">Rang</Btn>
                <Btn size="sm" leftIcon="typography">Shrift</Btn>
                <Btn size="sm" leftIcon="photo">Logo</Btn>
                <Btn size="sm" leftIcon="qrcode">QR sozlash</Btn>
              </div>
            </div>
            <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <div className="field">
                <label className="label">Shablon nomi</label>
                <input className="input" defaultValue={open.name} />
              </div>
              <div className="field">
                <label className="label">Til</label>
                <Seg
                  value={lang}
                  onChange={setLang}
                  options={[
                    { value: "uz", label: "O'zbek" },
                    { value: "en", label: "English" },
                    { value: "ru", label: "Русский" },
                  ]}
                />
              </div>
              <div className="field">
                <label className="label">Imzolar</label>
                <div style={{ border: "1px solid var(--border)", borderRadius: 8 }}>
                  {SIGNERS.map((s, i) => (
                    <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderBottom: i < SIGNERS.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <Avatar name={s.n} tone={s.tone} size="sm" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 12.5 }}>{s.n}</div>
                        <div style={{ fontSize: 11, color: "var(--text3)" }}>{s.r}</div>
                      </div>
                      <Btn size="sm" variant="ghost" leftIcon="x" />
                    </div>
                  ))}
                </div>
                <Btn size="sm" leftIcon="plus" style={{ marginTop: 6 }}>Imzo qo'shish</Btn>
              </div>
              <div className="field">
                <label className="label">Berish qoidasi</label>
                <select className="select">
                  <option>Course completion ≥ 100% va final score ≥ 60</option>
                  <option>Final score ≥ 70 va attendance ≥ 75%</option>
                  <option>Custom rule…</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Tashqi verifikatsiya</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Pill tone="purple" icon="qrcode">QR + URL</Pill>
                  <Pill tone="teal" icon="key">Open Badges 3.0</Pill>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
