import { Award, BookOpen, ClipboardCheck, TrendingUp } from "lucide-react"

import { CourseCard } from "@/components/dashboard/CourseCard"
import { StatCard } from "@/components/dashboard/StatCard"
import { courses } from "@/data/courses"
import { ListRow, PageHeader, Panel } from "@/Pages/dashboard/pageBlocks"

export function DashboardHome() {
  return (
    <>
      <PageHeader
        eyebrow="Talaba paneli"
        title="Salom, Aziza!"
        description="Kurslaringiz, topshiriqlar va progress bir joyda jamlangan."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Faol kurslar" value="3" hint="2 ta dars shu haftada" icon={BookOpen} />
        <StatCard label="Progress" value="64%" hint="O'tgan haftadan +8%" icon={TrendingUp} />
        <StatCard label="Topshiriqlar" value="5" hint="3 tasi tekshirishda" icon={ClipboardCheck} />
        <StatCard label="Sertifikatlar" value="2" hint="1 tasi tez orada ochiladi" icon={Award} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <Panel title="Bugungi reja">
          <ListRow title="NLP seminar" meta="10:00 · Zoom" value="Live" />
          <ListRow title="AI Fundamentals quiz" meta="14:00 gacha" value="Topshiriq" />
          <ListRow title="Mentor feedback" meta="17:30 · Online" value="1:1" />
        </Panel>
      </div>
    </>
  )
}
