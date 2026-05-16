import { useMemo, useState } from "react"

import { Btn, Card, CardHead, Chip, Icon, Pill, Toolbar, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { AUDIT_LOGS } from "@/data/lmsData"

function severityTone(severity: string): PillTone {
  if (severity === "high") return "red"
  if (severity === "medium") return "amber"
  if (severity === "low") return "blue"
  return "gray"
}

export function AdminAudit() {
  const [severity, setSeverity] = useState("all")
  const logs = useMemo(() => (severity === "all" ? AUDIT_LOGS : AUDIT_LOGS.filter((log) => log.severity === severity)), [severity])

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Audit jurnali</h1>
          <p>Severity filters, actor/action/object/IP columns va export button.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="download">Eksport</Btn>
          <Btn variant="primary" leftIcon="refresh">Live refresh</Btn>
        </div>
      </div>

      <Card>
        <Toolbar>
          {["all", "high", "medium", "low", "info"].map((item) => (
            <Chip key={item} active={severity === item} icon={item === "all" ? "filter" : "alert-circle"} onClick={() => setSeverity(item)}>
              {item}
            </Chip>
          ))}
          <div className="spacer" />
          <Btn size="sm" leftIcon="shield-lock">SIEM eksport</Btn>
        </Toolbar>
        <CardHead title="Audit log table" count={logs.length} />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>Actor</th>
                <th>Rol</th>
                <th>Action</th>
                <th>Object</th>
                <th>IP</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={`${log.ts}-${log.action}`}>
                  <td className="mono">{log.ts}</td>
                  <td><b>{log.actor}</b></td>
                  <td>{log.role}</td>
                  <td className="mono">{log.action}</td>
                  <td>{log.target}</td>
                  <td className="mono">{log.ip}</td>
                  <td><Pill tone={severityTone(log.severity)} dot>{log.severity}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-foot">
          <span><Icon name="lock" /> Retention: 365 kun · immutable · SHA-256 zanjir</span>
          <span>Connected</span>
        </div>
      </Card>
    </>
  )
}
