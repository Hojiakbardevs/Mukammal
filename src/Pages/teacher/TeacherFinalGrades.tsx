import { Download, ShieldCheck } from "lucide-react"

import { Badge, Button, Card, CardHead, Table } from "@/components/ui"
import { STUDENTS } from "@/data/lmsData"

export function TeacherFinalGrades() {
  return (
    <Card>
      <CardHead
        title="Yakuniy baholar"
        sub="Final grade table va approval status"
        actions={<Button variant="default" icon={Download}>Export CSV</Button>}
      />
      <Table
        headers={["Tinglovchi", "O‘quv oqimi", "Davomat", "Joriy ball", "Final", "Approval"]}
        rows={STUDENTS.map((student) => {
          const finalScore = Math.round(student.gpa * 0.7 + student.attendance * 0.3)
          return [
            <div className="font-bold text-slate-950">{student.name}</div>,
            student.group,
            `${student.attendance}%`,
            `${student.gpa}%`,
            <Badge tone={finalScore >= 85 ? "emerald" : finalScore >= 70 ? "amber" : "rose"}>{finalScore}%</Badge>,
            <Button size="sm" variant={finalScore >= 70 ? "success" : "default"} icon={ShieldCheck}>{finalScore >= 70 ? "Tasdiqlash" : "Ko‘rib chiqish"}</Button>,
          ]
        })}
      />
    </Card>
  )
}
