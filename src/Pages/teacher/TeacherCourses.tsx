import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function TeacherCourses() {
  return (
    <>
      <PageHeader
        eyebrow="O'quv boshqaruvi"
        title="Teacher kurslari"
        description="Mentor biriktirilgan kurslar, modullar va guruhlar."
      />
      <Panel title="Kurslar">
        <ListRow title="AI Fundamentals" meta="2 ta O'quv oqimi · 78 talaba" value="Faol" />
        <ListRow title="NLP" meta="1 ta O'quv oqimi · 34 talaba" value="Faol" />
        <ListRow title="Computer Vision" meta="1 ta O'quv oqimi · 28 talaba" value="Tayyorlanmoqda" />
      </Panel>
    </>
  )
}
