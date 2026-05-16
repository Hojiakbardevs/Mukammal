import { AlertTriangle, CheckCircle2, MessageSquare, Timer } from "lucide-react"

import { Avatar, Badge, Button, Card, CardHead, Progress, Stat } from "@/components/ui"
import { COURSES, QA, SCHEDULE, STUDENTS, SUBMISSIONS } from "@/data/lmsData"

export function TeacherDashboard() {
  const risky = STUDENTS.filter((student) => student.risk > 55)
  const pendingQuestions = QA.filter((question) => question.state === "needs-reply")

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-amber-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-950">Bugungi fokus: 18 ta ish tekshirish va 4 ta Q&A javobini yakunlash</h1>
              <p className="mt-1 text-sm text-slate-600">AI-26-1B oqimida davomat pasaygan, 3 tinglovchi uchun aralashuv tavsiya qilingan.</p>
            </div>
          </div>
          <Button variant="amber">Ish rejasini ochish</Button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Tekshirish navbati" value={SUBMISSIONS.length} sub="3 ta kechikkan ish" tone="amber" />
        <Stat label="Bugungi sessiya" value={SCHEDULE.filter((item) => item.day === "Dushanba").length} sub="2 ta jonli dars" tone="cyan" />
        <Stat label="Riskdagi tinglovchi" value={risky.length} sub="Birinchi yordam ro‘yxati" tone="rose" />
        <Stat label="Q&A pending" value={pendingQuestions.length} sub="Javob kutmoqda" tone="violet" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHead title="Bugungi jadval" />
          <div className="grid gap-3 md:grid-cols-2">
            {SCHEDULE.slice(0, 4).map((session) => (
              <div key={session.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-bold text-slate-950">{session.time}</div>
                  <Badge tone={session.kind === "live" ? "emerald" : "blue"}>{session.kind}</Badge>
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-700">{session.course}</div>
                <div className="text-xs text-slate-500">{session.group} · {session.room}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Riskdagi tinglovchilar" count={risky.length} />
          <div className="space-y-3">
            {risky.map((student) => (
              <div key={student.name} className="flex items-center gap-3 rounded-lg border border-rose-100 bg-rose-50 p-3">
                <Avatar name={student.name} size="sm" tone="bg-rose-500" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-950">{student.name}</div>
                  <div className="text-xs text-slate-500">{student.group} · davomat {student.attendance}%</div>
                </div>
                <Badge tone="rose">{student.risk}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHead title="Q&A pending" />
          <div className="space-y-3">
            {pendingQuestions.map((question) => (
              <div key={question.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                  <MessageSquare className="h-4 w-4 text-cyan-600" />
                  {question.topic}
                </div>
                <p className="mt-2 text-sm text-slate-600">{question.body}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{question.student} · {question.age}</span>
                  <Button size="xs" variant="primary">Javob berish</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Kurs progressi" />
          <div className="space-y-4">
            {COURSES.slice(0, 3).map((course) => (
              <div key={course.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-950">{course.title}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <Timer className="h-3.5 w-3.5" />
                      {course.nextSession}
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="mt-3">
                  <Progress value={course.progress} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
