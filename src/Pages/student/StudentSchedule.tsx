import { MapPin } from "lucide-react"

import { Badge, Card, CardHead } from "@/components/ui"
import { MY_SCHEDULE } from "@/data/studentData"

const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"]

export function StudentSchedule() {
  return (
    <Card>
      <CardHead title="Haftalik dars jadvali" sub="Online va offline sessiyalar" />
      <div className="grid gap-4 lg:grid-cols-5">
        {days.map((day) => {
          const sessions = MY_SCHEDULE.filter((session) => session.day === day)
          return (
            <div key={day} className={`min-h-80 rounded-lg border p-3 ${day === "Dushanba" ? "border-cyan-200 bg-cyan-50" : "border-slate-200 bg-white"}`}>
              <div className="mb-3 font-bold text-slate-950">{day}</div>
              <div className="space-y-3">
                {sessions.length > 0 ? sessions.map((session) => (
                  <div key={`${session.course}-${session.time}`} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-950">{session.time}</span>
                      <Badge tone={session.room === "Online" ? "emerald" : "blue"}>{session.room === "Online" ? "Online" : "Offline"}</Badge>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-slate-700">{session.course}</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {session.room} · {session.kind}
                    </div>
                  </div>
                )) : (
                  <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">Mustaqil o‘qish kuni</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
