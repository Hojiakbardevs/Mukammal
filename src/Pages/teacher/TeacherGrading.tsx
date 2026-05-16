import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function TeacherGrading() {
  return (
    <>
      <PageHeader
        eyebrow="Baholash"
        title="Tekshirish navbati"
        description="Topshiriqlarni ko'rish, feedback yozish va yakuniy ball qo'yish."
      />
      <Panel title="Navbat">
        <ListRow title="Aziza Mahmudova" meta="NLP laboratoriya 1" value="Yangi" />
        <ListRow title="Sardor Aliyev" meta="AI etikasi esse" value="AI tavsiya" />
        <ListRow title="Malika Sobirova" meta="CV mini loyiha" value="Qayta ko'rish" />
      </Panel>
    </>
  )
}
