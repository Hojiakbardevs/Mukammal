import { Btn, Card, CardHead, Icon, Pill, Toolbar } from "@/components/dashboard/LmsPrimitives"
import { COURSES } from "@/data/lmsData"
import { LESSON } from "@/data/studentData"

const draftMaterials = [
  { name: "Modul 6 capstone brief", type: "PDF", status: "Qoralama" },
  { name: "Attention vizual demo", type: "Notebook", status: "E'lon qilingan" },
  { name: "Quiz 3 savollar banki", type: "Quiz", status: "Ko'rib chiqish" },
]

export function TeacherCourseDetail() {
  const course = COURSES[0]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{course.title} · modul boshqaruvi</h1>
          <p>Module manager, lesson manager, material upload va publish/draft holatlari.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="eye">Ko'rish</Btn>
          <Btn variant="primary" leftIcon="upload">O'zgarishlarni e'lon qilish</Btn>
        </div>
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Module manager" actions={<Btn size="sm" leftIcon="plus">Modul qo'shish</Btn>} />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {LESSON.modules.map((module) => (
              <div key={module.id} style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, background: "var(--bg4)" }}>
                  <Icon name={module.state === "locked" ? "lock" : "list-tree"} />
                  <b style={{ flex: 1 }}>{module.title}</b>
                  <Pill tone={module.state === "done" ? "green" : module.state === "current" ? "blue" : "gray"}>
                    {module.state === "done" ? "E'lon qilingan" : module.state === "current" ? "Jonli" : "Qoralama"}
                  </Pill>
                  <Btn size="xs" leftIcon="edit">Edit</Btn>
                </div>
                <div style={{ padding: 10, display: "grid", gap: 6 }}>
                  {module.lessons.map((lesson) => (
                    <div key={lesson.title} className="tree-row">
                      <Icon name={lesson.kind === "quiz" ? "list-check" : lesson.kind === "assignment" ? "file-text" : "player-play"} />
                      <span className="grow">{lesson.title}</span>
                      <Pill tone={lesson.state === "locked" ? "gray" : lesson.state === "current" ? "blue" : "green"}>
                        {lesson.state === "locked" ? "Qoralama" : lesson.state === "current" ? "Jonli" : "E'lon qilingan"}
                      </Pill>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card>
            <CardHead title="Material yuklash" />
            <div className="card-pad" style={{ display: "grid", gap: 12 }}>
              <div className="alert blue">
                <Icon name="cloud-upload" />
                <div className="body">
                  <h4>Fayl qo'shish zonasi</h4>
                  <p>PDF, video, notebook va external linklar modulga biriktiriladi.</p>
                </div>
              </div>
              <Toolbar>
                <Btn size="sm" leftIcon="file-upload">Fayl tanlash</Btn>
                <Btn size="sm" leftIcon="link">URL qo'shish</Btn>
              </Toolbar>
            </div>
          </Card>

          <Card>
            <CardHead title="Publish / draft status" />
            <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
              <table className="t">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Turi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {draftMaterials.map((item) => (
                    <tr key={item.name}>
                      <td><b>{item.name}</b></td>
                      <td>{item.type}</td>
                      <td><Pill tone={item.status === "E'lon qilingan" ? "green" : item.status === "Ko'rib chiqish" ? "amber" : "gray"}>{item.status}</Pill></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
