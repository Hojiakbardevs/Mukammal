import { Link, useParams } from "react-router-dom"

import { courses } from "@/data/courses"
import { ListRow, PageHeader, Panel } from "@/Pages/dashboard/pageBlocks"

export function CourseDetailPage() {
  const { courseId } = useParams()
  const course = courses.find((item) => item.id === courseId) ?? courses[0]

  return (
    <>
      <PageHeader
        eyebrow={course.stream}
        title={course.title}
        description={`Mentor: ${course.mentor}. Keyingi dars: ${course.nextLesson}.`}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Panel title="Modullar">
          <ListRow title="Kirish va terminlar" meta="Video · 28 daqiqa" value="Tugadi" />
          <ListRow title={course.nextLesson} meta="Video · 42 daqiqa" value="Joriy" />
          <ListRow title="Amaliy laboratoriya" meta="Notebook · 60 daqiqa" value="Keyin" />
        </Panel>
        <Panel title="Harakatlar">
          <div className="space-y-3">
            <Link
              to="/app/lessons/transformers-attention"
              className="flex h-11 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Darsni boshlash
            </Link>
            <Link
              to="/app/tasks"
              className="flex h-11 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-cyan-300"
            >
              Topshiriqlar
            </Link>
          </div>
        </Panel>
      </div>
    </>
  )
}
