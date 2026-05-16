import { PhoneCall } from "lucide-react"

import { Avatar, Badge, Button, Card, CardHead, Progress } from "@/components/ui"
import { STUDENTS } from "@/data/lmsData"

export function TeacherRiskPanel() {
  const risky = STUDENTS.filter((student) => student.risk > 35)

  return (
    <Card>
      <CardHead title="Risk paneli" sub="Risk score, sabab va tavsiya qilingan intervention" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {risky.map((student) => (
          <div key={student.name} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Avatar name={student.name} tone={student.risk > 70 ? "bg-rose-500" : "bg-amber-500"} />
              <div>
                <div className="font-bold text-slate-950">{student.name}</div>
                <div className="text-sm text-slate-500">{student.group}</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={student.risk} label="Risk score" tone={student.risk > 70 ? "rose" : "amber"} />
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              Sabab: davomat {student.attendance}%, kechikkan topshiriqlar {student.late} ta, progress {student.progress}%.
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <Badge tone="cyan">1:1 maslahat</Badge>
              <Button size="sm" variant="primary" icon={PhoneCall}>Bog‘lanish</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
