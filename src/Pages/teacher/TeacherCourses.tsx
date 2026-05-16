import { Link } from "react-router-dom"

import { Bar, Card, CardHead, Icon, Pill, Spark, Stat } from "@/components/dashboard/LmsPrimitives"
import { COURSES } from "@/data/lmsData"

export function TeacherCourses() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Mening kurslarim</h1>
          <p>Kurslar, faol tinglovchilar, progress va keyingi sessiyalarni boshqarish.</p>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="Kurslar" value={COURSES.length} sub="3 ta published" />
        <Stat tone="green" label="Faol tinglovchi" value={COURSES.reduce((sum, course) => sum + course.studentsActive, 0)} sub="Barcha o'quv oqimlari" />
        <Stat tone="amber" label="O'rtacha progress" value={Math.round(COURSES.reduce((sum, course) => sum + course.progress, 0) / COURSES.length)} unit="%" sub="Kurslar kesimida" />
        <Stat tone="purple" label="Keyingi sessiya" value="14:00" sub="Bugun · SI asoslari" />
      </div>

      <div className="grid c-3">
        {COURSES.map((course) => (
          <Card key={course.id}>
            <CardHead
              title={course.title}
              sub={course.learningStream}
              actions={<Pill tone={course.status === "published" ? "green" : "amber"}>{course.status === "published" ? "E'lon qilingan" : "Qoralama"}</Pill>}
            />
            <div className="card-pad" style={{ display: "grid", gap: 14 }}>
              <div className="stat-grid cols-2">
                <Stat tone="blue" label="Tinglovchi" value={course.studentsActive} sub={`${course.studentsTotal} ro'yxatda`} />
                <Stat tone="green" label="Progress" value={course.progress} unit="%" sub={`${course.modules} modul`} />
              </div>
              <Bar value={course.progress} tone={course.progress >= 70 ? "green" : "blue"} thick />
              <Spark data={course.trend} tone={course.progress >= 70 ? "green" : "blue"} />
              <div className="alert blue">
                <Icon name="calendar-time" />
                <div className="body">
                  <h4>Keyingi sessiya</h4>
                  <p>{course.nextSession} · {course.lessons} dars · {course.format}</p>
                </div>
              </div>
              <Link className="btn btn-primary" to="/teacher/courses/ai-fundamentals">
                <Icon name="settings" /> Boshqarish
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
