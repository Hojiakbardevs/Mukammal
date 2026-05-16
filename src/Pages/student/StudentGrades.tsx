import { MessageSquareText } from "lucide-react"

import { Badge, Card, CardHead, Progress, Stat, Table } from "@/components/ui"
import { MY_GRADES } from "@/data/studentData"

export function StudentGrades() {
  const average = Math.round(MY_GRADES.reduce((sum, item) => sum + item.current, 0) / MY_GRADES.length)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Joriy o‘rtacha" value={average} unit="%" sub="4 ta kurs kesimida" tone="cyan" />
        <Stat label="Eng kuchli kurs" value="94%" sub="Amaliy statistika" tone="emerald" />
        <Stat label="Yakuniy maqsad" value="90+" sub="Sertifikat uchun yetarli" tone="violet" />
      </div>
      <Card>
        <CardHead title="Gradebook" sub="Komponent og‘irliklari va final natija" />
        <Table
          headers={["Kurs", "Davomat", "Quiz", "Uy ishi", "Imtihon", "Final", "Joriy ball"]}
          rows={MY_GRADES.map((grade) => [
            <div className="font-bold text-slate-950">{grade.course}</div>,
            `${grade.attendance}%`,
            `${grade.quiz}%`,
            `${grade.homework}%`,
            grade.exam ? `${grade.exam}%` : "Rejada",
            grade.finalProject ? `${grade.finalProject}%` : "Rejada",
            <Badge tone={grade.current >= grade.target ? "emerald" : "amber"}>{grade.current}%</Badge>,
          ])}
        />
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        {MY_GRADES.map((grade) => (
          <Card key={grade.course}>
            <CardHead title={grade.course} sub="Komponentlar bo‘yicha progress" />
            <div className="space-y-3">
              <Progress value={grade.attendance} label="Davomat 10%" tone="emerald" />
              <Progress value={grade.quiz} label="Quiz 20%" tone="cyan" />
              <Progress value={grade.homework} label="Uy ishi 30%" tone="blue" />
              <Progress value={grade.exam} label="Imtihon 20%" tone="amber" />
              <Progress value={grade.finalProject} label="Final loyiha 20%" tone="violet" />
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              <div className="mb-1 flex items-center gap-2 font-bold text-slate-900">
                <MessageSquareText className="h-4 w-4 text-cyan-600" />
                Trener feedback
              </div>
              {grade.feedback}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
