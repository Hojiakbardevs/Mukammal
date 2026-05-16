import { Download } from "lucide-react"

import { Badge, Button, Card, CardHead, Table, Toolbar } from "@/components/ui"
import { AUDIT_LOGS } from "@/data/lmsData"

export function AdminAudit() {
  return (
    <Card>
      <CardHead title="Audit log table" sub="Actor, action, object va IP ustunlari" actions={<Button variant="default" icon={Download}>Export</Button>} />
      <Toolbar>
        {["Barcha", "info", "low", "medium", "high"].map((severity) => (
          <Button key={severity} size="sm" variant={severity === "high" ? "danger" : "default"}>{severity}</Button>
        ))}
      </Toolbar>
      <Table
        headers={["Timestamp", "Actor", "Role", "Action", "Object", "IP", "Severity"]}
        rows={AUDIT_LOGS.map((log) => [
          log.ts,
          log.actor,
          log.role,
          log.action,
          log.object,
          log.ip,
          <Badge tone={log.severity === "high" ? "rose" : log.severity === "medium" ? "amber" : log.severity === "low" ? "blue" : "slate"}>{log.severity}</Badge>,
        ])}
      />
    </Card>
  )
}
