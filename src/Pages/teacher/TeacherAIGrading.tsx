import { ShieldCheck, Sparkles } from "lucide-react"

import { Badge, Button, Card, CardHead, Progress } from "@/components/ui"
import { SUBMISSIONS } from "@/data/lmsData"

export function TeacherAIGrading() {
  return (
    <div className="space-y-6">
      {SUBMISSIONS.slice(0, 4).map((submission) => (
        <Card key={submission.id}>
          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={submission.state === "ai-flag" ? "rose" : "cyan"} icon={Sparkles}>SI taklifi</Badge>
                <Badge tone="slate">{submission.course}</Badge>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{submission.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{submission.student} · {submission.submittedAgo} · fayllar: {submission.files.join(", ")}</p>
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                Evidence highlights: yechim formulasi mos, lekin xulosa qismida metrikalar taqqoslanmagan. Kechikkan topshiriqda avtomatik penalti alohida ko‘rib chiqilsin.
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <CardHead title={`${submission.aiScore}/${submission.maxPoints}`} sub="Taklif qilingan ball" />
              <Progress value={submission.confidence} label="Ishonch darajasi" tone={submission.confidence > 80 ? "emerald" : "amber"} />
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="success" icon={ShieldCheck}>Qabul qilish</Button>
                <Button size="sm" variant="default">Override</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
