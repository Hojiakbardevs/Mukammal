import { useParams } from "react-router-dom"

import { PageHeader, Panel } from "@/Pages/dashboard/pageBlocks"

export function LessonPage() {
  const { lessonId } = useParams()

  return (
    <>
      <PageHeader
        eyebrow="Dars oynasi"
        title="Transformerlar va attention"
        description={`Lesson id: ${lessonId}. Video, material va izohlar shu sahifada chiqadi.`}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="aspect-video rounded-lg bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex h-full items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-slate-300">
            Video player placeholder
          </div>
        </section>
        <Panel title="Dars materiallari">
          <ul className="space-y-3 text-sm text-slate-600">
            <li>Prezentatsiya: Attention mexanizmi</li>
            <li>Notebook: Mini transformer inference</li>
            <li>O'qish: Encoder va decoder farqi</li>
          </ul>
        </Panel>
      </div>
    </>
  )
}
