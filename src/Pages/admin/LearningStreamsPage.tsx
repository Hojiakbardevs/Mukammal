import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function LearningStreamsPage() {
  return (
    <>
      <PageHeader
        eyebrow="O'quv boshqaruvi"
        title="O'quv oqimlari"
        description="Guruhlar, mentorlar, jadval va o'quv davrlarini boshqarish."
      />
      <Panel title="Oqimlar">
        <ListRow title="AI-26" meta="2026-yil may-iyun · 78 talaba" value="Faol" />
        <ListRow title="NLP-26" meta="2026-yil may-iyun · 34 talaba" value="Faol" />
        <ListRow title="CV-26" meta="2026-yil iyun-iyul · 28 talaba" value="Rejada" />
      </Panel>
    </>
  )
}
