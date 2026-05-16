import { Link } from "react-router-dom"

import { Avatar, Bar, Card, CardHead, Donut, Icon, Pill } from "@/components/dashboard/LmsPrimitives"
import { COURSES } from "@/data/lmsData"
import { LESSON, MY_COURSES } from "@/data/studentData"

export function StudentCourseDetail() {
  const course = MY_COURSES.find((item) => item.id === "nlp") ?? MY_COURSES[1]
  const publicCourse = COURSES.find((item) => item.id === "nlp")
  const requirements = [
    { label: "Darslarning kamida 90% qismini tugatish", done: course.progress >= 90 },
    { label: "Barcha quizlardan 70% dan yuqori ball olish", done: true },
    { label: "Yakuniy sentiment analyzer loyihasini topshirish", done: false },
    { label: "Kurs feedback so'rovnomasini to'ldirish", done: false },
  ]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{course.title}</h1>
          <p>{course.track} yo'nalishi · {publicCourse?.learningStream} · sertifikat yo'lidagi asosiy kurs.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-primary" to="/app/lessons/transformers-attention">
            <Icon name="player-play" /> Joriy dars
          </Link>
        </div>
      </div>

      <div className="grid c-8-4">
        <Card>
          <div className="card-pad-lg" style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
              <div>
                <Pill tone="blue">{course.track}</Pill>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{course.title}</h2>
                <p style={{ color: "var(--text2)", marginTop: 5 }}>
                  Transformerlar, embeddinglar, tokenizatsiya va amaliy NLP pipeline qurish bo'yicha ketma-ket modul.
                </p>
              </div>
              <Donut
                value={course.progress}
                tone="#0d9488"
                center={
                  <div>
                    <div className="num" style={{ fontSize: 21, fontWeight: 800 }}>{course.progress}%</div>
                    <div style={{ fontSize: 10.5, color: "var(--text3)" }}>progress</div>
                  </div>
                }
              />
            </div>

            <div className="grid c-3">
              <div className="alert">
                <Icon name="books" />
                <div className="body">
                  <h4>{LESSON.modules.length} modul</h4>
                  <p>{course.lessonsDone} ta dars tugatilgan</p>
                </div>
              </div>
              <div className="alert blue">
                <Icon name="calendar-time" />
                <div className="body">
                  <h4>{course.nextLesson?.module}</h4>
                  <p>{course.nextLesson?.title}</p>
                </div>
              </div>
              <div className="alert amber">
                <Icon name="clock" />
                <div className="body">
                  <h4>{course.deadline?.title}</h4>
                  <p>{course.deadline?.days} kun qoldi</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="Trener" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={course.teacher} tone="b1" size="lg" />
              <div>
                <div style={{ fontWeight: 800 }}>{course.teacher}</div>
                <div style={{ color: "var(--text3)" }}>Lead Trener · NLP va ML</div>
              </div>
            </div>
            <div className="note">Maslahat vaqti: Chorshanba 18:00 · savollar Q&A orqali prioritetlanadi.</div>
          </div>
        </Card>
      </div>

      <div className="grid c-7-5" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Modullar va darslar" count={LESSON.modules.length} />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {LESSON.modules.map((module) => (
              <div key={module.id} style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: "var(--bg4)" }}>
                  <b>{module.title}</b>
                  <Pill tone={module.state === "done" ? "green" : module.state === "current" ? "blue" : "gray"}>
                    {module.state === "done" ? "Tugagan" : module.state === "current" ? "Joriy" : "Yopiq"}
                  </Pill>
                </div>
                <div style={{ padding: 10, display: "grid", gap: 6 }}>
                  {module.lessons.map((lesson) => (
                    <div key={lesson.title} className={`tree-row ${lesson.state === "current" ? "active" : ""}`}>
                      <Icon name={lesson.kind === "quiz" ? "list-check" : lesson.kind === "assignment" ? "file-text" : lesson.kind === "doc" ? "file" : "player-play"} />
                      <span className="grow">{lesson.title}</span>
                      <span style={{ color: "var(--text3)", fontSize: 12 }}>{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Kurs talablari" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {requirements.map((requirement) => (
              <div key={requirement.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={`check ${requirement.done ? "on" : ""}`} />
                <span style={{ flex: 1 }}>{requirement.label}</span>
                <Pill tone={requirement.done ? "green" : "amber"}>{requirement.done ? "Bajarilgan" : "Kutilmoqda"}</Pill>
              </div>
            ))}
            <div className="row-div" />
            <Bar value={course.progress} tone="green" />
            <p style={{ color: "var(--text2)", fontSize: 12 }}>Sertifikatga tayyorlik progressga, baholarga va yakuniy loyiha topshirilishiga bog'liq.</p>
          </div>
        </Card>
      </div>
    </>
  )
}
