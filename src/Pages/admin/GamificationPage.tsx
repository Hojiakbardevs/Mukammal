import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function GamificationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Motivatsiya"
        title="Gamifikatsiya"
        description="Badge, reyting, ball va sertifikat qoidalari."
      />
      <Panel title="Qoidalar">
        <ListRow title="Haftalik streak" meta="Ketma-ket 5 kun dars ko'rish" value="+50 ball" />
        <ListRow title="Topshiriqni vaqtida topshirish" meta="Deadline oldidan" value="+20 ball" />
        <ListRow title="Mentor badge" meta="Yuqori sifatli loyiha" value="Badge" />
      </Panel>
    </>
  )
}
