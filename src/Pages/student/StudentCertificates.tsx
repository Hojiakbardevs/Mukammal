import { CheckCircle2, Download, QrCode } from "lucide-react"

import { Badge, Button, Card, CardHead, Progress } from "@/components/ui"
import { ME, MY_CERTS } from "@/data/studentData"

export function StudentCertificates() {
  const checklist = ["Progress 85% dan yuqori", "Topshiriqlar to‘liq topshirilgan", "Final loyiha 75+ ball", "Akademik halollik tekshiruvi toza"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHead title="Sertifikatlar" sub="Berilgan sertifikatlar va navbatdagi eligibility holati" />
        <div className="grid gap-4 md:grid-cols-2">
          {MY_CERTS.map((cert) => (
            <div key={cert.id} className="rounded-lg border border-slate-200 bg-gradient-to-br from-white to-cyan-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone="emerald">Tasdiqlangan</Badge>
                  <h2 className="mt-4 text-xl font-bold text-slate-950">{cert.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">Berilgan sana: {cert.issuedAt}</p>
                </div>
                <QrCode className="h-14 w-14 text-slate-400" />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-sm font-bold text-slate-700">Natija: {cert.score}%</div>
                <Button size="sm" variant="primary" icon={Download}>Yuklab olish</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHead title="AI Track Professional eligibility" />
          <div className="space-y-4">
            <Progress value={ME.certificateProgress} label="Umumiy tayyorgarlik" tone="emerald" />
            {checklist.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <CheckCircle2 className={`h-5 w-5 ${index < 2 ? "text-emerald-500" : "text-slate-300"}`} />
                <span className="text-sm font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHead title="QR verification" />
          <div className="grid aspect-square place-items-center rounded-lg bg-slate-950 text-white">
            <div className="text-center">
              <QrCode className="mx-auto h-24 w-24" />
              <div className="mt-4 text-sm font-bold">AIRI-VERIFY-AM-2026</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
