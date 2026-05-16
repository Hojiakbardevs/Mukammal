import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function UsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Access"
        title="Foydalanuvchilar"
        description="Talaba, teacher va admin rollarini boshqarish."
      />
      <Panel title="So'nggi qo'shilganlar">
        <ListRow title="Aziza Mahmudova" meta="Talaba · NLP-26" value="Faol" />
        <ListRow title="Aziza Tursunova" meta="Teacher · ML Track" value="Faol" />
        <ListRow title="Rustam Abdullaev" meta="Super Admin" value="Faol" />
      </Panel>
    </>
  )
}
