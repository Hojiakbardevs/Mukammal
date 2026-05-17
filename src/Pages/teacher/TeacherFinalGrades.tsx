import { useState } from "react"
import {
  Avatar, Bar, Btn, Card, Check, Chip, Icon, Pill, Stat, Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { FINAL_GRADES } from "@/data/lmsData"

function gradeLetter(pct: number): { letter: string; tone: "green" | "blue" | "amber" | "purple" | "red" } {
  if (pct >= 90) return { letter: "A", tone: "green" }
  if (pct >= 80) return { letter: "B", tone: "blue" }
  if (pct >= 70) return { letter: "C", tone: "amber" }
  if (pct >= 60) return { letter: "D", tone: "purple" }
  return { letter: "F", tone: "red" }
}

function autoScore(r: typeof FINAL_GRADES[0]) {
  return Math.round(r.attendance * 0.1 + r.quizzes * 0.2 + r.assignments * 0.3 + r.finalProject * 0.2 + r.finalScore * 0.2)
}

type GradeRow = (typeof FINAL_GRADES)[0] & { override: number | null; confirmed: boolean }

export function TeacherFinalGrades() {
  const [rows, setRows] = useState<GradeRow[]>(
    FINAL_GRADES.map((r) => ({ ...r, override: null, confirmed: r.approval === "Tasdiqlangan" })),
  )
  const [sel, setSel] = useState<Record<number, boolean>>({})

  const confirmed = rows.filter((r) => r.confirmed).length
  const passed = rows.filter((r) => (r.override ?? autoScore(r)) >= 60).length
  const avg = Math.round(rows.reduce((s, r) => s + (r.override ?? autoScore(r)), 0) / rows.length)
  const selCount = Object.values(sel).filter(Boolean).length
  const allSelected = rows.length > 0 && selCount === rows.length

  function setOverride(i: number, val: number | null) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, override: val } : r)))
  }
  function confirm(i: number) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, confirmed: true } : r)))
  }
  function confirmAll() {
    setRows((prev) => prev.map((r) => ({ ...r, confirmed: true })))
  }

  return (
    <>
      <div className="alert amber" style={{ marginBottom: 18 }}>
        <Icon name="info-circle" />
        <div className="body">
          <h4>Baholash formulasi</h4>
          <p>
            Yakuniy baho = Davomat <b>10%</b> + Quiz <b>20%</b> + Uy ishi <b>30%</b> + Imtihon <b>20%</b> + Loyiha <b>20%</b>.
            Override qilsangiz, sabab audit jurnalga yoziladi.
          </p>
        </div>
        <Btn size="sm" leftIcon="settings">Formula sozlamalari</Btn>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="blue"   label="Talabalar"   value={rows.length}   sub="NLP-26 · Spring '26" />
        <Stat tone="green"  label="O'tdi"        value={passed}        sub={`${Math.round((passed / rows.length) * 100)}% o'tish darajasi`} />
        <Stat tone="purple" label="Tasdiqlangan" value={confirmed}     sub="Registrar kutmoqda" />
        <Stat tone="amber"  label="O'rtacha"     value={avg}           unit="%" sub="Guruh o'rtachasi" />
      </div>

      <Card>
        <Toolbar>
          <select className="select" style={{ width: 220 }}>
            <option>Guruh: NLP-26</option>
            <option>Guruh: AI-26-1B</option>
            <option>Guruh: ML-26-2A</option>
          </select>
          <Chip icon="filter">Holat: Hammasi</Chip>
          <Chip icon="flag">Override</Chip>
          <div className="spacer" />
          {selCount > 0 && (
            <span style={{ fontSize: 12, color: "#8a93a6" }}>
              {selCount} ta tanlandi
            </span>
          )}
          <Btn size="sm" leftIcon="download">CSV eksport</Btn>
          <Btn size="sm" leftIcon="check" onClick={confirmAll}>Hammasini tasdiqlash</Btn>
          <Btn size="sm" variant="primary" leftIcon="send">Publish</Btn>
        </Toolbar>

        {selCount > 0 && (
          <div className="bulkbar">
            <Icon name="checkbox" /> <b>{selCount}</b> ta tanlandi
            <div className="actions" style={{ display: "flex", gap: 6 }}>
              <Btn size="sm" variant="success" leftIcon="check" onClick={() => {
                const idxs = Object.entries(sel).filter(([, v]) => v).map(([k]) => Number(k))
                setRows((prev) => prev.map((r, i) => idxs.includes(i) ? { ...r, confirmed: true } : r))
                setSel({})
              }}>
                Tasdiqlash
              </Btn>
              <Btn size="sm" leftIcon="download">Eksport</Btn>
              <Btn size="sm" variant="danger" leftIcon="x" onClick={() => setSel({})}>
                Tanlovni tozalash
              </Btn>
            </div>
          </div>
        )}

        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th style={{ width: 32 }}>
                  <Check
                    value={allSelected}
                    onChange={(v) =>
                      setSel(v ? Object.fromEntries(rows.map((_, i) => [i, true])) : {})
                    }
                  />
                </th>
                <th>Talaba</th>
                <th className="center">
                  Davomat <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 10 }}>·10%</span>
                </th>
                <th className="center">
                  Quiz <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 10 }}>·20%</span>
                </th>
                <th className="center">
                  Uy ishi <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 10 }}>·30%</span>
                </th>
                <th className="center">
                  Imtihon <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 10 }}>·20%</span>
                </th>
                <th className="center">
                  Loyiha <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 10 }}>·20%</span>
                </th>
                <th className="center">Auto</th>
                <th className="center">Override</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const auto = autoScore(r)
                const final = r.override ?? auto
                const { letter, tone } = gradeLetter(final)
                return (
                  <tr key={r.id} className={sel[i] ? "selected" : ""}>
                    <td>
                      <Check value={!!sel[i]} onChange={(v) => setSel((p) => ({ ...p, [i]: v }))} />
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={r.student.name} tone={r.student.tone} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600 }}>{r.student.name}</div>
                          <div style={{ fontSize: 11, color: "#8a93a6" }}>{r.student.group}</div>
                        </div>
                      </div>
                    </td>
                    <td className="center">
                      <div className="mono num" style={{ fontWeight: 600 }}>{r.attendance}</div>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                        <Bar value={r.attendance} tone={r.attendance >= 80 ? "green" : "amber"} />
                      </div>
                    </td>
                    <td className="center mono num">{r.quizzes}</td>
                    <td className="center mono num">{r.assignments}</td>
                    <td className="center">
                      {r.finalProject === 0 ? (
                        <Pill tone="red">Topshirilmagan</Pill>
                      ) : (
                        <span className="mono num">{r.finalProject}</span>
                      )}
                    </td>
                    <td className="center mono num">{r.finalScore}</td>
                    <td className="center">
                      <Pill tone={tone}>
                        {letter} · {auto}%
                      </Pill>
                    </td>
                    <td className="center">
                      <input
                        type="number"
                        className="input sm mono num"
                        style={{ width: 64, textAlign: "center" }}
                        placeholder="—"
                        min={0}
                        max={100}
                        value={r.override ?? ""}
                        onChange={(e) => {
                          const val = e.target.value === ""
                            ? null
                            : Math.max(0, Math.min(100, Number(e.target.value) || 0))
                          setOverride(i, val)
                        }}
                      />
                    </td>
                    <td>
                      {r.confirmed ? (
                        <Pill tone="green" icon="check">Tasdiqlangan</Pill>
                      ) : (
                        <Pill tone="amber" dot>Kutilmoqda</Pill>
                      )}
                    </td>
                    <td className="right">
                      {!r.confirmed && (
                        <Btn size="xs" variant="primary" leftIcon="check" onClick={() => confirm(i)}>
                          Tasdiqlash
                        </Btn>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="card-foot">
          <span>
            <Icon name="shield" /> Audit: har bir override mantiq jurnalga yoziladi · AI v3.1 · 16-May 2026
          </span>
          <div className="cta-row">
            <Btn size="sm" leftIcon="download">Excel eksport</Btn>
          </div>
        </div>
      </Card>
    </>
  )
}
