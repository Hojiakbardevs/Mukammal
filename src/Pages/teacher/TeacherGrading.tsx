import { CheckCircle2, RotateCcw } from "lucide-react"

import { Badge, Button, Card, CardHead, Progress, Table } from "@/components/ui"
import { SUBMISSIONS } from "@/data/lmsData"

export function TeacherGrading() {
  const current = SUBMISSIONS[0]

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardHead title="Submissions queue" sub="Tekshirish, izoh va tasdiqlash" />
        <Table
          headers={["Tinglovchi", "Topshiriq", "Kurs", "Holat", "Yuborilgan", "Amal"]}
          rows={SUBMISSIONS.map((submission) => [
            <div className="font-bold text-slate-950">{submission.student}</div>,
            submission.title,
            submission.course,
            <Badge tone={submission.state === "ai-flag" ? "rose" : submission.state === "appeal" ? "amber" : "cyan"}>{submission.state}</Badge>,
            submission.submittedAgo,
            <Button size="sm" variant="primary">Tekshirish</Button>,
          ])}
        />
      </Card>

      <aside className="space-y-6">
        <Card>
          <CardHead title="Rubric panel" sub={current.title} />
          <div className="space-y-3">
            {["To‘g‘ri yechim", "Kod sifati", "Tahlil izohi", "Natija talqini"].map((item, index) => (
              <div key={item}>
                <Progress value={[85, 72, 90, 68][index]} label={item} tone={index === 3 ? "amber" : "cyan"} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHead title="Baholash formasi" />
          <label className="block text-sm font-bold text-slate-700">Ball</label>
          <input className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-cyan-400" defaultValue={current.aiScore} />
          <label className="mt-4 block text-sm font-bold text-slate-700">Feedback</label>
          <textarea className="mt-2 min-h-32 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-cyan-400" defaultValue="Yechim to‘g‘ri yo‘nalishda. Validation natijalarini jadval bilan ko‘rsating va xulosa qismini kengaytiring." />
          <div className="mt-4 flex gap-2">
            <Button variant="success" icon={CheckCircle2}>Tasdiqlash</Button>
            <Button variant="amber" icon={RotateCcw}>Qayta ishlash</Button>
          </div>
        </Card>
      </aside>
    </div>
  )
}
