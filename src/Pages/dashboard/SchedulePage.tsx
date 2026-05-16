import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Jadval"
        title="Dars jadvali"
        description="Online va offline mashg'ulotlar vaqti."
      />
      <Panel title="Haftalik jadval">
        <ListRow title="Dushanba" meta="AI Fundamentals · 10:00" value="Online" />
        <ListRow title="Chorshanba" meta="NLP seminar · 14:00" value="Zoom" />
        <ListRow title="Juma" meta="Computer Vision workshop · 16:00" value="Offline" />
      </Panel>
    </>
  )
}
