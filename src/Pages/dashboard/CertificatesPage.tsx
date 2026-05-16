import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function CertificatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Muvaffaqiyat"
        title="Sertifikatlar"
        description="Yakunlangan kurslar va sertifikat olish holati."
      />
      <Panel title="Sertifikatlar">
        <ListRow title="Prompt Engineering" meta="2026-yil aprel" value="Berilgan" />
        <ListRow title="AI Fundamentals" meta="Progress 72%" value="Jarayonda" />
        <ListRow title="NLP" meta="Progress 58%" value="Jarayonda" />
      </Panel>
    </>
  )
}
