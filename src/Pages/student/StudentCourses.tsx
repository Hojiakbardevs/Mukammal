import { Link } from "react-router-dom"

import { Avatar, Bar, Card, CardHead, Icon, Pill } from "@/components/dashboard/LmsPrimitives"
import { MY_COURSES } from "@/data/studentData"

function statusTone(status: string) {
  return status === "completed" ? "green" : "blue"
}

export function StudentCourses() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Mening kurslarim</h1>
          <p>Har bir kurs progressi, keyingi darsi va yaqin deadline bilan ko'rsatilgan.</p>
        </div>
        <div className="page-actions">
          <Link className="btn" to="/app/certificates">
            <Icon name="award" /> Sertifikatlar
          </Link>
        </div>
      </div>

      <div className="grid c-3">
        {MY_COURSES.map((course) => (
          <Card key={course.id}>
            <CardHead
              title={course.title}
              sub={course.track}
              actions={<Pill tone={statusTone(course.status)}>{course.status === "completed" ? "Tugatilgan" : "Faol"}</Pill>}
            />
            <div className="card-pad" style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={course.teacher} tone={course.color} />
                <div>
                  <div style={{ fontWeight: 700 }}>{course.teacher}</div>
                  <div style={{ color: "var(--text3)", fontSize: 12 }}>Trener</div>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--text2)" }}>
                  <span>{course.lessonsDone} / {course.lessonsTotal} dars</span>
                  <b>{course.progress}%</b>
                </div>
                <Bar value={course.progress} tone={course.status === "completed" ? "green" : "blue"} thick />
              </div>

              <div className="alert blue">
                <Icon name={course.nextLesson?.kind === "lab" ? "flask" : "player-play"} />
                <div className="body">
                  <h4>{course.nextLesson ? course.nextLesson.title : "Barcha darslar tugatilgan"}</h4>
                  <p>{course.nextLesson ? `${course.nextLesson.module} · ${course.nextLesson.duration}` : "Takrorlash materiallari ochiq"}</p>
                </div>
              </div>

              {course.deadline ? (
                <div className="alert amber">
                  <Icon name="calendar-due" />
                  <div className="body">
                    <h4>{course.deadline.title}</h4>
                    <p>{course.deadline.days} kun qoldi</p>
                  </div>
                </div>
              ) : (
                <div className="alert green">
                  <Icon name="circle-check" />
                  <div className="body">
                    <h4>Majburiy deadline yo'q</h4>
                    <p>Kurs yakunlangan, sertifikatga tayyor.</p>
                  </div>
                </div>
              )}

              <Link className="btn btn-primary" to={course.id === "nlp" ? "/app/courses/nlp" : "/app/lessons/transformers-attention"}>
                <Icon name="arrow-right" /> Davom etish
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
