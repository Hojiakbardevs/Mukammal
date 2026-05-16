import { Badge, Card, CardHead } from "@/components/ui"
import { SCHEDULE } from "@/data/lmsData"

const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"]

const toneByKind = {
  lecture: "blue",
  lab: "violet",
  live: "emerald",
  exam: "rose",
  office: "amber",
} as const

export function TeacherSchedule() {
  return (
    <Card>
      <CardHead title="Haftalik timetable" sub="Ma’ruza, lab, live, imtihon va maslahat soatlari" />
      <div className="grid gap-4 lg:grid-cols-5">
        {days.map((day) => (
          <div key={day} className="min-h-96 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 font-bold text-slate-950">{day}</div>
            <div className="space-y-3">
              {SCHEDULE.filter((session) => session.day === day).map((session) => (
                <div key={session.id} className="rounded-lg bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-950">{session.time}</span>
                    <Badge tone={toneByKind[session.kind]}>{session.kind}</Badge>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{session.course}</div>
                  <div className="mt-1 text-xs text-slate-500">{session.group} · {session.room}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
