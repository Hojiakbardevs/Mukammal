import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function TasksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Akademik"
        title="Topshiriqlar"
        description="Muddat, holat va tekshiruv jarayoni bo'yicha umumiy ro'yxat."
      />
      <Panel title="Topshiriqlar ro'yxati">
        <ListRow title="NLP tokenizatsiya amaliyoti" meta="Bugun 23:59 gacha" value="Jarayonda" />
        <ListRow title="AI etikasi bo'yicha esse" meta="18-may 2026" value="Tekshiruvda" />
        <ListRow title="Computer Vision quiz" meta="20-may 2026" value="Yangi" />
      </Panel>
    </>
  )
}
