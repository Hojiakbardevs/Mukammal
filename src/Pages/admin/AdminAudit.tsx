import { useMemo, useState } from "react"

import { Avatar, Btn, Card, CardHead, Chip, Icon, Pill, Stat, Toolbar, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { AUDIT_LOGS } from "@/data/lmsData"

function severityTone(severity: string): PillTone {
  if (severity === "high") return "red"
  if (severity === "medium") return "amber"
  if (severity === "low") return "blue"
  return "gray"
}

function severityLabel(severity: string) {
  if (severity === "high") return "Yuqori"
  if (severity === "medium") return "O'rta"
  if (severity === "low") return "Past"
  return "Ma'lumot"
}

const SEVERITY_FILTERS = [
  { value: "all",    label: "Barchasi", icon: "filter" },
  { value: "high",   label: "Yuqori",   icon: "alert-octagon" },
  { value: "medium", label: "O'rta",    icon: "alert-triangle" },
  { value: "low",    label: "Past",     icon: "info-circle" },
  { value: "info",   label: "Info",     icon: "circle-dot" },
]

const ACTION_ICONS: Record<string, string> = {
  "permission.grant": "key",
  "grade.publish": "file-check",
  "si.grade_suggest": "brain",
  "appeal.review": "scale",
  "policy.update": "shield",
  "certificate.issue": "award",
  "attendance.bulk": "calendar-check",
  "auth.suspicious": "lock-exclamation",
  "role.update": "users",
}

export function AdminAudit() {
  const [severity, setSeverity] = useState("all")
  const [query, setQuery] = useState("")

  const logs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return AUDIT_LOGS.filter((log) => {
      const matchSev = severity === "all" || log.severity === severity
      const matchQuery = !q || log.actor.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || log.target.toLowerCase().includes(q)
      return matchSev && matchQuery
    })
  }, [severity, query])

  const highCount = AUDIT_LOGS.filter((l) => l.severity === "high").length
  const medCount = AUDIT_LOGS.filter((l) => l.severity === "medium").length

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Audit jurnali</h1>
          <p>Barcha tizim harakatlari, actor, amal, IP manzil va severity darajasi bilan qayd etiladi.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="download">CSV eksport</Btn>
          <Btn variant="primary" leftIcon="shield-lock">SIEM eksport</Btn>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue"   label="Jami log"       value={AUDIT_LOGS.length}  sub="So'nggi 24 soat" />
        <Stat tone="red"    label="Yuqori xavf"    value={highCount}           sub="Darhol ko'rib chiqish" />
        <Stat tone="amber"  label="O'rta xavf"     value={medCount}            sub="Kuzatuv ostida" />
        <Stat tone="green"  label="Audit zanjiri"  value="SHA-256"             sub="Yaxlitlik tasdiqlangan" />
      </div>

      <Card>
        <Toolbar>
          <div style={{ position: "relative", flex: "0 0 280px" }}>
            <Icon name="search" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
            <input
              className="inp"
              style={{ paddingLeft: 34, width: "100%" }}
              placeholder="Actor, amal yoki obyekt..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {SEVERITY_FILTERS.map((f) => (
              <Chip key={f.value} active={severity === f.value} icon={f.icon} onClick={() => setSeverity(f.value)}>
                {f.label}
              </Chip>
            ))}
          </div>
          <div className="spacer" />
          <Btn size="sm" leftIcon="refresh">Yangilash</Btn>
        </Toolbar>

        <CardHead title="Audit log jadvali" count={logs.length} />

        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>Actor</th>
                <th>Rol</th>
                <th>Amal</th>
                <th>Obyekt</th>
                <th>IP</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={`${log.ts}-${idx}`}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--text2)", whiteSpace: "nowrap" }}>{log.ts}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={log.actor === "system" ? "SY" : log.actor} tone="b1" size="sm" />
                      <div>
                        <div style={{ fontWeight: 700 }}>{log.actor}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text2)", fontSize: 13 }}>{log.role}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name={ACTION_ICONS[log.action] ?? "dots"} style={{ color: "var(--text3)" }} />
                      <span className="mono" style={{ fontSize: 12 }}>{log.action}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--text2)", maxWidth: 220 }}>{log.target}</td>
                  <td className="mono" style={{ fontSize: 12, color: "var(--text3)" }}>{log.ip}</td>
                  <td>
                    <Pill tone={severityTone(log.severity)} dot>{severityLabel(log.severity)}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-foot">
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="lock" /> Retention: 365 kun · WORM rejim · SHA-256 zanjir
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="circle-dot" style={{ color: "#22c55e" }} />
            <span style={{ color: "var(--text3)", fontSize: 12 }}>Real-vaqt ulanish faol</span>
          </span>
        </div>
      </Card>
    </>
  )
}
