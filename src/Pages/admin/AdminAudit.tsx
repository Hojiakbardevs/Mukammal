import { useMemo, useState } from "react"

import { Avatar, Btn, Card, Chip, Drawer, Icon, Pill, Stat, Tabs, Toolbar, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { AUDIT_LOGS, type AuditLog } from "@/data/lmsData"

type AuditTab = "all" | "high" | "Admin" | "Trener" | "si" | "Security"

const AUDIT_TABS: Array<{ value: AuditTab; label: string; icon?: string }> = [
  { value: "all", label: "Hammasi" },
  { value: "high", label: "Yuqori daraja", icon: "alert-octagon" },
  { value: "Admin", label: "Admin amallari", icon: "shield-half" },
  { value: "Trener", label: "Trener amallari", icon: "chalkboard" },
  { value: "si", label: "SI service", icon: "sparkles" },
  { value: "Security", label: "Security", icon: "lock" },
]

function roleTone(role: string): PillTone {
  if (role === "Super Admin") return "purple"
  if (role === "Trener") return "blue"
  if (role === "SI xizmati") return "purple"
  if (role === "Security") return "red"
  if (role === "Reviewer") return "teal"
  return "gray"
}

function severityTone(severity: AuditLog["severity"]): PillTone {
  if (severity === "high") return "red"
  if (severity === "medium") return "amber"
  if (severity === "low") return "blue"
  return "gray"
}

function severityLabel(severity: AuditLog["severity"]) {
  if (severity === "high") return "Yuqori"
  if (severity === "medium") return "O'rta"
  if (severity === "low") return "Past"
  return "Ma'lumot"
}

function actionIcon(action: string) {
  if (action.includes("permission")) return "key"
  if (action.includes("grade")) return "file-check"
  if (action.includes("appeal")) return "scale"
  if (action.includes("policy")) return "shield"
  if (action.includes("certificate")) return "award"
  if (action.includes("attendance")) return "calendar-check"
  if (action.includes("auth")) return "lock"
  if (action.includes("role")) return "users"
  return "activity"
}

function matchesTab(log: AuditLog, tab: AuditTab) {
  if (tab === "all") return true
  if (tab === "high") return log.severity === "high"
  if (tab === "si") return log.role === "SI xizmati"
  return log.role.includes(tab)
}

function payloadText(log: AuditLog) {
  return JSON.stringify(
    {
      action: log.action,
      before: log.payload.before ?? null,
      after: log.payload.after ?? null,
      reason: log.payload.reason,
      approved_by: log.payload.approvedBy,
      ai_involved: log.payload.aiInvolved,
    },
    null,
    2,
  )
}

export function AdminAudit() {
  const [open, setOpen] = useState<AuditLog | null>(null)
  const [tab, setTab] = useState<AuditTab>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return AUDIT_LOGS.filter((log) => {
      const inTab = matchesTab(log, tab)
      const inQuery = !q || [log.actor, log.role, log.action, log.target, log.ip].some((value) => value.toLowerCase().includes(q))
      return inTab && inQuery
    })
  }, [query, tab])

  const highCount = AUDIT_LOGS.filter((log) => log.severity === "high").length
  const siCount = AUDIT_LOGS.filter((log) => log.role === "SI xizmati" || log.payload.aiInvolved).length

  return (
    <>
      <div className="stat-grid cols-4" style={{ marginBottom: 18 }}>
        <Stat tone="blue" label="Bugungi voqealar" value="1,284" sub="3,492 oxirgi 7 kun" />
        <Stat tone="red" label="Yuqori darajali" value={highCount} sub="3 ta security alert" />
        <Stat tone="amber" label="AI operatsiyalari" value={siCount} sub="o'rtacha confidence 0.84" />
        <Stat tone="green" label="Davom etilganlik" value="100" unit="%" sub="oxirgi 90 kun saqlangan" />
      </div>

      <Tabs
        value={tab}
        onChange={(value) => setTab(value as AuditTab)}
        items={AUDIT_TABS.map((item) => ({
          ...item,
          count:
            item.value === "all"
              ? AUDIT_LOGS.length
              : item.value === "high"
                ? highCount
                : AUDIT_LOGS.filter((log) => matchesTab(log, item.value)).length,
        }))}
      />

      <Card>
        <Toolbar>
          <div className="tb-search-wrap audit-search">
            <Icon name="search" />
            <input
              className="tb-search"
              style={{ width: "100%" }}
              placeholder="Aktor, harakat yoki obyekt bo'yicha..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Chip icon="calendar">16-May (bugun)</Chip>
          <Chip icon="user">Aktor: hammasi</Chip>
          <Chip icon="cube">Obyekt turi</Chip>
          <Chip icon="map-pin">IP / hudud</Chip>
          <div className="spacer" />
          <Btn size="sm" leftIcon="download">SIEM eksport</Btn>
          <Btn size="sm" leftIcon="refresh">Live</Btn>
        </Toolbar>
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>Aktor</th>
                <th>Rol</th>
                <th>Harakat</th>
                <th>Obyekt</th>
                <th>IP</th>
                <th>Sev</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, index) => (
                <tr key={log.id} onClick={() => setOpen(log)} style={{ cursor: "pointer" }}>
                  <td className="mono" style={{ fontSize: 11.5 }}>{log.ts}</td>
                  <td>
                    {log.actor === "system" ? (
                      <span className="audit-actor">
                        <span className="thumb" style={{ width: 24, height: 24, background: "#0f1d3a", color: "#cfe1ff" }}>
                          <Icon name="settings" />
                        </span>
                        <b>system</b>
                      </span>
                    ) : (
                      <span className="audit-actor">
                        <Avatar name={log.actor.replace(".", "").split(" ").reverse().join(" ")} tone={`b${(index % 8) + 1}`} size="sm" />
                        <span style={{ fontWeight: 600 }}>{log.actor}</span>
                      </span>
                    )}
                  </td>
                  <td><Pill tone={roleTone(log.role)}>{log.role}</Pill></td>
                  <td>
                    <span className="mono audit-action">
                      <Icon name={actionIcon(log.action)} />
                      {log.action}
                    </span>
                  </td>
                  <td className="audit-target">{log.target}</td>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--text3)" }}>{log.ip}</td>
                  <td><Pill tone={severityTone(log.severity)} icon={log.severity === "high" ? "alert-octagon" : undefined} dot={log.severity !== "high"}>{severityLabel(log.severity)}</Pill></td>
                  <td><Icon name="chevron-right" style={{ color: "var(--text3)" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-foot">
          <span><Icon name="lock" /> Saqlash davri: 365 kun · WORM (immutable) · SHA-256 zanjir</span>
          <span><Icon name="check" /> Real-time SIEM ulanmasi: <b>connected</b></span>
        </div>
      </Card>

      <Drawer
        open={!!open}
        onClose={() => setOpen(null)}
        title="Audit event tafsiloti"
        footer={
          <>
            <Btn leftIcon="ticket">Incident ochish</Btn>
            <div style={{ flex: 1 }} />
            <Btn variant="primary" leftIcon="check" onClick={() => setOpen(null)}>Yopish</Btn>
          </>
        }
      >
        {open ? (
          <>
            <div className="kv-list">
              <div className="kv"><span className="k">Event ID</span><span className="v mono">{open.id}</span></div>
              <div className="kv"><span className="k">Sana / vaqt</span><span className="v mono">{open.ts}</span></div>
              <div className="kv"><span className="k">Aktor</span><span className="v">{open.actor}</span></div>
              <div className="kv"><span className="k">Rol</span><span className="v"><Pill tone={roleTone(open.role)}>{open.role}</Pill></span></div>
              <div className="kv"><span className="k">Harakat</span><span className="v mono">{open.action}</span></div>
              <div className="kv"><span className="k">Obyekt</span><span className="v">{open.target}</span></div>
              <div className="kv"><span className="k">IP / qurilma</span><span className="v mono">{open.ip} · {open.device}</span></div>
              <div className="kv"><span className="k">Hudud</span><span className="v">{open.region}</span></div>
              <div className="kv"><span className="k">Sev</span><span className="v"><Pill tone={severityTone(open.severity)}>{severityLabel(open.severity)}</Pill></span></div>
            </div>
            <div className="row-div" />
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Payload (diff)</div>
            <pre className="audit-payload">{payloadText(open)}</pre>
            <div className="alert blue" style={{ marginTop: 12 }}>
              <Icon name="lock" />
              <div className="body">
                <h4>Immutable</h4>
                <p>Bu yozuv WORM jurnalga yozilgan va SHA-256 zanjir bilan oldingi yozuvga bog'langan. O'zgartirib bo'lmaydi.</p>
              </div>
            </div>
          </>
        ) : null}
      </Drawer>
    </>
  )
}
