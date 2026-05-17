import { useState } from "react"
import { Avatar, Bar, Btn, Card, Heat, Icon, Pill, Stat, Toolbar } from "@/components/dashboard/LmsPrimitives"
import { STUDENTS, type StudentRecord } from "@/data/lmsData"

type AttStatus = "present" | "absent" | "late" | "excused"
type AttRow = StudentRecord & { status: AttStatus; note: string }

const OFFLINE_HISTORY = [3, 4, 4, 2, 4, 4, 4, 3, 4, 4, 2, 4, 4, 4]

const STATES: { v: AttStatus; label: string; tone: string; ico: string }[] = [
  { v: "present", label: "Keldi",     tone: "green", ico: "check" },
  { v: "absent",  label: "Kelmadi",   tone: "red",   ico: "x" },
  { v: "late",    label: "Kechikkan", tone: "amber",  ico: "clock" },
  { v: "excused", label: "Sababli",  tone: "blue",  ico: "file-medical" },
]

function defaultStatus(i: number): AttStatus {
  if (i === 0) return "absent"
  if (i === 1) return "late"
  if (i === 7) return "excused"
  return "present"
}

const ONLINE_STATS: Record<string, { joined: boolean; joinedAt?: string; watchPct: number; chat: number }> = {
  "Aziza Mahmudova": { joined: true,  joinedAt: "10:02", watchPct: 97, chat: 4 },
  "Bobur Yuldashev": { joined: true,  joinedAt: "10:15", watchPct: 74, chat: 1 },
}

const GROUPS = [
  { label: "ML-26-2A (offline)", value: "ml-26-2a", mode: "offline" as const },
  { label: "AI-26-1A (offline)", value: "ai-26-1a", mode: "offline" as const },
  { label: "AI-26-1B (offline)", value: "ai-26-1b", mode: "offline" as const },
  { label: "NLP-26 (online)",    value: "nlp-26",   mode: "online"  as const },
]

export function TeacherAttendance() {
  const [groupKey, setGroupKey] = useState("ml-26-2a")
  const selectedGroup = GROUPS.find((g) => g.value === groupKey) ?? GROUPS[0]
  const isOnline = selectedGroup.mode === "online"

  const initRows = (): AttRow[] =>
    STUDENTS.filter((s) => s.mode === selectedGroup.mode).map((s, i) => ({
      ...s,
      status: defaultStatus(i),
      note: "",
    }))

  const [rows, setRows] = useState<AttRow[]>(initRows)

  const setAll = (status: AttStatus) => setRows((rs) => rs.map((r) => ({ ...r, status })))
  const setOne = (name: string, status: AttStatus) =>
    setRows((rs) => rs.map((r) => (r.name === name ? { ...r, status } : r)))
  const setNote = (name: string, note: string) =>
    setRows((rs) => rs.map((r) => (r.name === name ? { ...r, note } : r)))

  const count = STATES.reduce(
    (acc, st) => ({ ...acc, [st.v]: rows.filter((r) => r.status === st.v).length }),
    {} as Record<AttStatus, number>,
  )

  return (
    <>
      <div className="stat-grid cols-5" style={{ marginBottom: 18 }}>
        <Stat tone="blue"   label="Talabalar" value={rows.length}   sub={`${selectedGroup.label}`} />
        <Stat tone="green"  label="Keldi"     value={count.present ?? 0} sub={`${Math.round(((count.present ?? 0) / Math.max(1, rows.length)) * 100)}%`} />
        <Stat tone="red"    label="Kelmadi"   value={count.absent ?? 0}  sub="2 ta yangi" />
        <Stat tone="amber"  label="Kechikkan" value={count.late ?? 0}    sub="3+ marta = signal" />
        <Stat tone="purple" label="Sababli"   value={count.excused ?? 0} sub="hujjat yuklangan" />
      </div>

      <Card>
        <Toolbar>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select
              className="select"
              value={groupKey}
              style={{ width: 240 }}
              onChange={(e) => {
                setGroupKey(e.target.value)
                setRows(initRows())
              }}
            >
              {GROUPS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
            <select className="select" style={{ width: 260 }}>
              <option>Sessiya: 16-May · 10:00 · Lab</option>
              <option>Sessiya: 14-May · 10:00 · Ma'ruza</option>
            </select>
            {isOnline && (
              <Pill tone="blue" icon="wifi">Online sessiya</Pill>
            )}
          </div>
          <div className="spacer" />
          {isOnline ? (
            <Btn size="sm" leftIcon="refresh" variant="primary">Avtomatik tekshirish</Btn>
          ) : (
            <>
              <span style={{ fontSize: 12, color: "#8a93a6" }}>Bulk:</span>
              {STATES.map((st) => (
                <Btn key={st.v} size="sm" leftIcon={st.ico} onClick={() => setAll(st.v)}>
                  → {st.label}
                </Btn>
              ))}
            </>
          )}
          <Btn size="sm" variant="primary" leftIcon="device-floppy">Saqlash</Btn>
        </Toolbar>

        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              {isOnline ? (
                <tr>
                  <th>Talaba</th>
                  <th>Guruh</th>
                  <th>Davomat tarixi</th>
                  <th className="center">Kirdi</th>
                  <th className="center">Kirish vaqti</th>
                  <th className="center">Video ko'rish %</th>
                  <th className="center">Chat faolligi</th>
                  <th>Holat</th>
                </tr>
              ) : (
                <tr>
                  <th>Talaba</th>
                  <th>Guruh</th>
                  <th>Davomat tarixi</th>
                  <th style={{ width: 380 }} className="center">Bugungi holat</th>
                  <th>Izoh</th>
                </tr>
              )}
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const online = ONLINE_STATS[r.name]
                return (
                  <tr key={r.name}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={r.name} tone={r.tone} size="sm" />
                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                      </div>
                    </td>
                    <td>{r.group}</td>
                    <td>
                      <div style={{ display: "flex", gap: 3 }}>
                        {OFFLINE_HISTORY.map((_val, di) => {
                          const v = isOnline
                            ? (di % 3 === 0 ? 3 : 4)
                            : ((di + i) % 8 === 0 ? 1 : (di + i) % 11 === 0 ? 2 : 4)
                          return <Heat key={di} value={v} />
                        })}
                      </div>
                    </td>

                    {isOnline ? (
                      <>
                        <td className="center">
                          {online?.joined
                            ? <Pill tone="green" icon="check">Ha</Pill>
                            : <Pill tone="red" icon="x">Yo'q</Pill>}
                        </td>
                        <td className="center">
                          <span className="mono num" style={{ fontSize: 12 }}>
                            {online?.joinedAt ?? "—"}
                          </span>
                        </td>
                        <td className="center">
                          {online ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Bar value={online.watchPct} tone={online.watchPct >= 80 ? "green" : "amber"} />
                              <span className="mono num" style={{ fontSize: 11, minWidth: 32 }}>
                                {online.watchPct}%
                              </span>
                            </div>
                          ) : <span style={{ color: "#b0b7c5" }}>—</span>}
                        </td>
                        <td className="center">
                          <span className="mono num">
                            {online?.chat ?? 0} xabar
                          </span>
                        </td>
                        <td>
                          <Pill
                            tone={
                              online?.joined
                                ? (online.watchPct >= 80 ? "green" : "amber")
                                : "red"
                            }
                            dot
                          >
                            {online?.joined
                              ? (online.watchPct >= 80 ? "Faol" : "Qisman")
                              : "Kelmadi"}
                          </Pill>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="center">
                          <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
                            {STATES.map((st) => (
                              <button
                                key={st.v}
                                type="button"
                                onClick={() => setOne(r.name, st.v)}
                                style={{
                                  padding: "5px 10px",
                                  borderRadius: 7,
                                  border: `1px solid ${r.status === st.v ? `var(--${st.tone === "green" ? "green" : st.tone === "red" ? "red" : st.tone === "amber" ? "amber" : "accent"}, #16a34a)` : "var(--border)"}`,
                                  background:
                                    r.status === st.v
                                      ? `var(--${st.tone === "green" ? "green" : st.tone === "red" ? "red" : st.tone === "amber" ? "amber" : "accent"}-bg, #f0fdf4)`
                                      : "#fff",
                                  color:
                                    r.status === st.v
                                      ? `var(--${st.tone === "green" ? "green" : st.tone === "red" ? "red" : st.tone === "amber" ? "amber" : "accent"}-ink, #15803d)`
                                      : "var(--text2)",
                                  fontWeight: r.status === st.v ? 700 : 500,
                                  fontSize: 12,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                <Icon name={st.ico} /> {st.label}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td>
                          <input
                            className="input sm"
                            placeholder={r.status === "excused" ? "Hujjat raqami / izoh…" : "Izoh"}
                            value={r.note}
                            onChange={(e) => setNote(r.name, e.target.value)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="card-foot">
          <span>
            <Icon name="clock" /> Auto-save 30s · oxirgi: 16-May 10:42
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {!isOnline && <Btn size="sm" leftIcon="qr-code">QR-davomat</Btn>}
            <Btn size="sm" leftIcon="upload">Excel import</Btn>
          </div>
        </div>
      </Card>
    </>
  )
}
