import { AlertTriangle, CheckCircle2, ShieldAlert, Trash2 } from "lucide-react"

import { Badge, Button, Card, CardHead, Table } from "@/components/ui"
import { FLAGGED_CONTENT } from "@/data/lmsData"

export function AdminModeration() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHead title="Flagged content" />
          <div className="text-3xl font-bold text-slate-950">{FLAGGED_CONTENT.length}</div>
          <p className="mt-2 text-sm text-slate-500">Ko‘rib chiqish navbatida</p>
        </Card>
        <Card>
          <CardHead title="Appeal queue" />
          <div className="text-3xl font-bold text-slate-950">2</div>
          <p className="mt-2 text-sm text-slate-500">Baholash apellyatsiyasi</p>
        </Card>
        <Card>
          <CardHead title="Escalated" />
          <div className="text-3xl font-bold text-slate-950">1</div>
          <p className="mt-2 text-sm text-slate-500">Reviewerga oshirilgan</p>
        </Card>
      </div>
      <Card>
        <CardHead title="Moderatsiya navbati" sub="Approve, remove va escalate amallari" />
        <Table
          headers={["Content", "Author", "Reason", "Age", "Severity", "Actions"]}
          rows={FLAGGED_CONTENT.map((item) => [
            <div className="flex items-center gap-2 font-bold text-slate-950"><AlertTriangle className="h-4 w-4 text-amber-500" /> {item.type}</div>,
            item.author,
            item.reason,
            item.age,
            <Badge tone={item.severity === "high" ? "rose" : item.severity === "medium" ? "amber" : "slate"}>{item.severity}</Badge>,
            <div className="flex flex-wrap gap-2">
              <Button size="xs" variant="success" icon={CheckCircle2}>Approve</Button>
              <Button size="xs" variant="danger" icon={Trash2}>Remove</Button>
              <Button size="xs" variant="amber" icon={ShieldAlert}>Escalate</Button>
            </div>,
          ])}
        />
      </Card>
    </div>
  )
}
