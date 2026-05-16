import { FileUp, GripVertical, Plus } from "lucide-react"

import { Badge, Button, Card, CardHead, Progress } from "@/components/ui"
import { COURSES } from "@/data/lmsData"

const modules = [
  { title: "Modul 1: SI asoslari", lessons: 8, status: "published", progress: 100 },
  { title: "Modul 2: Supervised learning", lessons: 10, status: "published", progress: 86 },
  { title: "Modul 3: Model validatsiyasi", lessons: 7, status: "published", progress: 64 },
  { title: "Modul 4: Yakuniy loyiha", lessons: 5, status: "draft", progress: 35 },
]

const lessons = ["Linear regression", "Regularization", "Dropout intuition", "Validation split", "Final loyiha brief"]

export function TeacherCourseDetail() {
  const course = COURSES[0]

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="cyan">{course.learningStream}</Badge>
            <h1 className="mt-3 text-2xl font-bold text-slate-950">{course.title}</h1>
            <p className="mt-1 text-sm text-slate-500">{course.modules} modul · {course.lessons} dars · {course.studentsActive} faol tinglovchi</p>
          </div>
          <div className="flex gap-2">
            <Button variant="default" icon={Plus}>Modul qo‘shish</Button>
            <Button variant="primary">Nashr qilish</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHead title="Module manager" sub="Tartib, holat va dars soni" />
          <div className="space-y-3">
            {modules.map((module) => (
              <div key={module.title} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <GripVertical className="h-5 w-5 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-950">{module.title}</div>
                    <div className="text-sm text-slate-500">{module.lessons} dars</div>
                  </div>
                  <Badge tone={module.status === "draft" ? "amber" : "emerald"}>{module.status === "draft" ? "Qoralama" : "Nashrda"}</Badge>
                </div>
                <div className="mt-3">
                  <Progress value={module.progress} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHead title="Lesson manager" />
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div key={lesson} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span className="font-semibold text-slate-700">{index + 1}. {lesson}</span>
                  <Badge tone={index < 3 ? "emerald" : "amber"}>{index < 3 ? "Nashrda" : "Qoralama"}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHead title="Material upload" />
            <div className="rounded-lg border border-dashed border-cyan-300 bg-cyan-50 p-5 text-center">
              <FileUp className="mx-auto h-8 w-8 text-cyan-700" />
              <div className="mt-3 font-bold text-slate-950">PDF, notebook yoki video material biriktiring</div>
              <p className="mt-1 text-sm text-slate-600">Yuklangan fayllar dars ichida tinglovchilar uchun ko‘rinadi.</p>
              <Button className="mt-4" variant="primary">Fayl tanlash</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
