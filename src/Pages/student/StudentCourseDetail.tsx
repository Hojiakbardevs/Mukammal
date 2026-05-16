import { CheckCircle2, FileText, GraduationCap } from "lucide-react"

import { Avatar, Badge, Button, Card, CardHead, Donut, Progress } from "@/components/ui"
import { LESSON, MY_COURSES } from "@/data/studentData"

export function StudentCourseDetail() {
  const course = MY_COURSES[1]
  const requirements = ["Modullarni kamida 85% tugatish", "Barcha uy ishlarini topshirish", "Yakuniy loyiha 75+ ball", "Q&A da kamida 2 ta foydali ishtirok"]

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-cyan-100 bg-cyan-50 p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
          <div>
            <Badge tone="cyan">{course.track}</Badge>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Kurs til modellarining asosiy g‘oyalari, attention mexanizmi, embeddinglar, transformer arxitekturasi va amaliy tahlil loyihalarini qamrab oladi.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary">Joriy darsga o‘tish</Button>
              <Button variant="default">Materiallarni ko‘rish</Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Donut value={course.progress} label="Kurs progressi" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHead title="Modullar va darslar" sub={`${course.lessonsDone}/${course.lessonsTotal} dars tugallandi`} />
          <div className="space-y-4">
            {LESSON.modules.map((module) => (
              <div key={module.title} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-bold text-slate-950">{module.title}</div>
                  <Badge tone={module.state === "Joriy" ? "cyan" : module.state === "Tugallangan" ? "emerald" : "slate"}>{module.state}</Badge>
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                      <FileText className="h-4 w-4 text-cyan-600" />
                      {lesson}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHead title="Trener" />
            <div className="flex items-center gap-3">
              <Avatar name={course.teacher} size="lg" />
              <div>
                <div className="font-bold text-slate-950">{course.teacher}</div>
                <div className="text-sm text-slate-500">NLP va ML treneri</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-bold text-slate-950">52</div>
                <div className="text-slate-500">dars</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="font-bold text-slate-950">8</div>
                <div className="text-slate-500">modul</div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title="Sertifikat talablari" />
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={requirement} className="flex items-start gap-3 text-sm text-slate-700">
                  {index < 2 ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <GraduationCap className="h-5 w-5 text-cyan-600" />}
                  <span>{requirement}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Progress value={course.progress} label="Talablarga yaqinlik" tone="emerald" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
