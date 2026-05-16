import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function AdminCoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontent"
        title="Kurslar"
        description="Kurs katalogi, modullar va nashr holatini boshqarish."
      />
      <Panel title="Kurs katalogi">
        <ListRow title="AI Fundamentals" meta="8 modul · 24 dars" value="Published" />
        <ListRow title="NLP" meta="6 modul · 18 dars" value="Published" />
        <ListRow title="Computer Vision" meta="5 modul · 16 dars" value="Draft" />
      </Panel>
    </>
  )
}
