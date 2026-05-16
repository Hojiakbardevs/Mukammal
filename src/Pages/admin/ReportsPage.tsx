import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Analitika"
        title="Hisobotlar"
        description="Kurs samaradorligi, qatnashuv va yakuniy natijalar."
      />
      <Panel title="Hisobotlar">
        <ListRow title="Oylik qatnashuv" meta="May 2026" value="PDF" />
        <ListRow title="Kurs samaradorligi" meta="AI, NLP, CV kesimida" value="XLSX" />
        <ListRow title="Sertifikatlar" meta="Berilgan va kutilayotgan" value="CSV" />
      </Panel>
    </>
  )
}
