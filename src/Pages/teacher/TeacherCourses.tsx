import { Settings } from "lucide-react"

import { Badge, Button, Card, CardHead, LineChart, Progress } from "@/components/ui"
import { COURSES } from "@/data/lmsData"

export function TeacherCourses() {
  return (
    <Card>
      <CardHead title="Mening kurslarim" sub="Faol o‘quv oqimlari, progress va keyingi sessiyalar" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COURSES.map((course) => (
          <div key={course.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <Badge tone={course.status === "draft" ? "amber" : "emerald"}>{course.status === "draft" ? "Qoralama" : "Nashrda"}</Badge>
              <span className="text-xs font-bold text-slate-400">{course.learningStream}</span>
            </div>
            <h2 className="mt-4 min-h-14 text-lg font-bold text-slate-950">{course.title}</h2>
            <div className="mt-2 text-sm text-slate-500">{course.studentsActive}/{course.studentsTotal} faol tinglovchi</div>
            <div className="mt-4">
              <Progress value={course.progress} label="Kurs progressi" />
            </div>
            <div className="mt-4 h-20">
              <LineChart data={course.trend} height={80} />
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">Keyingi sessiya: {course.nextSession}</div>
            <Button className="mt-4 w-full" variant="primary" icon={Settings}>Boshqarish</Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
