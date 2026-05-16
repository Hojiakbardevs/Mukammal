import { PageHeader, ListRow, Panel } from "@/Pages/dashboard/pageBlocks"

export function TeacherStudents() {
  return (
    <>
      <PageHeader
        eyebrow="Talabalar"
        title="Talabalar ro'yxati"
        description="Faollik, risk signallari va progressni kuzatish."
      />
      <Panel title="Faol talabalar">
        <ListRow title="Aziza Mahmudova" meta="NLP-26 · 72% progress" value="Yaxshi" />
        <ListRow title="Jasur Karimov" meta="AI-26 · 49% progress" value="E'tibor" />
        <ListRow title="Nilufar Saidova" meta="CV-26 · 81% progress" value="A'lo" />
      </Panel>
    </>
  )
}
