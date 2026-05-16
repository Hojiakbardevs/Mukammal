import { Award, Download, QrCode } from "lucide-react"

import { Badge, Button, Card, CardHead, Table } from "@/components/ui"
import { CERTIFICATE_TEMPLATES, USERS } from "@/data/lmsData"

export function AdminCertificates() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHead title="Certificate templates" />
          <div className="grid gap-4 md:grid-cols-3">
            {CERTIFICATE_TEMPLATES.map((template) => (
              <div key={template.title} className="rounded-lg border border-slate-200 p-4">
                <Award className="h-6 w-6 text-cyan-600" />
                <h2 className="mt-3 font-bold text-slate-950">{template.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{template.rule}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <Badge tone={template.status === "Faol" ? "emerald" : "amber"}>{template.status}</Badge>
                  <span className="text-sm font-bold text-slate-600">{template.issued}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHead title="Certificate preview" />
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-5 text-center">
            <Award className="mx-auto h-12 w-12 text-cyan-700" />
            <div className="mt-4 text-xl font-bold text-slate-950">AI Track Professional</div>
            <div className="mt-2 text-sm text-slate-600">Aziza Mahmudova · 94% · AIRI Training</div>
            <QrCode className="mx-auto mt-5 h-20 w-20 text-slate-500" />
            <Button className="mt-5" variant="primary" icon={Download}>Preview PDF</Button>
          </div>
        </Card>
      </div>
      <Card>
        <CardHead title="Issued certificates table" />
        <Table
          headers={["Tinglovchi", "Shablon", "Eligibility", "Berilgan sana", "Holat"]}
          rows={USERS.filter((user) => user.role === "Tinglovchi").map((user, index) => [
            user.name,
            index % 2 === 0 ? "AI Track Professional" : "NLP Amaliyotchi",
            index % 2 === 0 ? "92%" : "86%",
            index % 2 === 0 ? "16-May 2026" : "30-Apr 2026",
            <Badge tone="emerald">Issued</Badge>,
          ])}
        />
      </Card>
    </div>
  )
}
