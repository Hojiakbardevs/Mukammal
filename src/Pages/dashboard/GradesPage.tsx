import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function GradesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Natijalar"
        title="Baholar"
        description="Kurslar kesimida ball, feedback va yakuniy natijalar."
      />
      <Panel title="So'nggi baholar">
        <ListRow title="AI Fundamentals" meta="Quiz 3" value="92/100" />
        <ListRow title="NLP" meta="Laboratoriya 1" value="88/100" />
        <ListRow title="Computer Vision" meta="Mini loyiha" value="76/100" />
      </Panel>
    </>
  )
}
