import { ArrowRight, Clock, UserRound } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Badge, Button, Card, CardHead, Progress } from "@/components/ui"
import { MY_COURSES } from "@/data/studentData"

export function StudentCourses() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <Card>
        <CardHead title="Mening kurslarim" sub="Faol, yakunlangan va sertifikatga yaqin kurslar" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {MY_COURSES.map((course) => (
            <div key={course.id} className="flex flex-col rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <Badge tone={course.status === "Yakunlangan" ? "emerald" : "cyan"}>{course.status}</Badge>
                <span className="text-xs font-bold text-slate-400">{course.track}</span>
              </div>
              <h2 className="mt-4 min-h-14 text-lg font-bold text-slate-950">{course.title}</h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <UserRound className="h-4 w-4" />
                {course.teacher}
              </div>
              <div className="mt-4">
                <Progress value={course.progress} label="Progress" />
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex gap-2">
                  <Clock className="h-4 w-4 text-cyan-600" />
                  <span>Keyingi dars: {course.nextLesson}</span>
                </div>
                <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
                  Deadline: {course.deadline}
                </div>
              </div>
              <Button className="mt-5" variant="primary" rightIcon={ArrowRight} onClick={() => navigate("/app/course")}>
                Davom etish
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
