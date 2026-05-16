import { EyeOff, Rocket } from "lucide-react"

import { Badge, Button, Card, CardHead, Table } from "@/components/ui"
import { COURSES } from "@/data/lmsData"

export function AdminCourses() {
  return (
    <Card>
      <CardHead title="Kurslar va o‘quv oqimlari" sub="Barcha kurslar statusi, treneri va tinglovchilar soni" />
      <Table
        headers={["Kurs", "Status", "Trener", "O‘quv oqimi", "Tinglovchi", "Amal"]}
        rows={COURSES.map((course) => [
          <div>
            <div className="font-bold text-slate-950">{course.title}</div>
            <div className="text-xs text-slate-500">{course.track} · {course.format}</div>
          </div>,
          <Badge tone={course.status === "draft" ? "amber" : "emerald"}>{course.status === "draft" ? "Qoralama" : "Nashrda"}</Badge>,
          course.teacher,
          course.learningStream,
          `${course.studentsActive}/${course.studentsTotal}`,
          <Button size="sm" variant={course.status === "draft" ? "primary" : "default"} icon={course.status === "draft" ? Rocket : EyeOff}>
            {course.status === "draft" ? "Publish" : "Unpublish"}
          </Button>,
        ])}
      />
    </Card>
  )
}
