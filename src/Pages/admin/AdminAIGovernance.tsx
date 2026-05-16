import { ShieldCheck } from "lucide-react"

import { Badge, Card, CardHead, Progress, Table } from "@/components/ui"
import { AUDIT_LOGS } from "@/data/lmsData"

export function AdminAIGovernance() {
  const principles = ["Inson nazorati majburiy", "Baholash shaffof dalil bilan", "Plagiat tekshiruvi alohida qayd etiladi", "Risk modeli faqat yordam signalidir"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHead title="AI policy principles" sub="Rasmiy joylarda Sun’iy intellekt boshqaruvi" />
        <div className="grid gap-3 md:grid-cols-4">
          {principles.map((principle) => (
            <div key={principle} className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
              <ShieldCheck className="h-5 w-5 text-cyan-700" />
              <div className="mt-3 text-sm font-bold text-slate-950">{principle}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHead title="SI grading settings" />
          <Progress value={82} label="Confidence threshold" tone="emerald" />
          <div className="mt-4 text-sm text-slate-600">80% dan past takliflar trener reviewiga majburiy tushadi.</div>
        </Card>
        <Card>
          <CardHead title="Risk model settings" />
          <Progress value={65} label="Risk trigger" tone="amber" />
          <div className="mt-4 text-sm text-slate-600">Davomat, kechikish va progress birgalikda hisoblanadi.</div>
        </Card>
        <Card>
          <CardHead title="Plagiarism detection" />
          <Progress value={92} label="Similarity scan" tone="rose" />
          <div className="mt-4 text-sm text-slate-600">Kod va matn topshiriqlari alohida fingerprint qilinadi.</div>
        </Card>
      </div>

      <Card>
        <CardHead title="Audit trail policy" sub="Human oversight note: har bir override audit jurnaliga yoziladi" />
        <Table
          headers={["Vaqt", "Actor", "Action", "Object", "Severity"]}
          rows={AUDIT_LOGS.slice(0, 4).map((log) => [
            log.ts,
            log.actor,
            log.action,
            log.object,
            <Badge tone={log.severity === "high" ? "rose" : log.severity === "medium" ? "amber" : "slate"}>{log.severity}</Badge>,
          ])}
        />
      </Card>
    </div>
  )
}
