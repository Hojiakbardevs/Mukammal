import { Avatar, Bar, Card, CardHead, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { BADGES, ME, MY_CERTS, MY_COURSES } from "@/data/studentData"

export function StudentProfile() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Mening profilim</h1>
          <p>Shaxsiy ma'lumotlar, o'qiyotgan kurslar, yutuqlar va learning statistikasi.</p>
        </div>
      </div>

      <div className="grid c-8-4">
        <Card>
          <div className="card-pad-lg" style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Avatar name={ME.name} tone={ME.tone} size="xl" />
            <div style={{ flex: 1 }}>
              <Pill tone="blue">{ME.learningStream}</Pill>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{ME.name}</h2>
              <p style={{ color: "var(--text2)" }}>aziza.m@stud.uz · Toshkent · Tinglovchi ID: STU-2026-1042</p>
            </div>
            <Pill tone="green" icon="shield-check">Profil tasdiqlangan</Pill>
          </div>
        </Card>

        <Card>
          <CardHead title="Learning stats" />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            <Stat tone="blue" label="Kurslar" value={ME.enrolled} sub={`${ME.completed} ta tugatilgan`} />
            <Bar value={ME.certificateProgress} tone="green" />
          </div>
        </Card>
      </div>

      <div className="stat-grid cols-4" style={{ marginTop: 14 }}>
        <Stat tone="amber" label="Streak" value={ME.streak} unit="kun" sub="Eng uzun: 18 kun" />
        <Stat tone="purple" label="XP" value={ME.points} sub={`Level ${ME.level}`} />
        <Stat tone="green" label="O'rtacha ball" value={ME.avgScore} unit="%" sub="Faol kurslarda" />
        <Stat tone="blue" label="Sertifikatlar" value={MY_CERTS.length} sub="Verification yoqilgan" />
      </div>

      <div className="grid c-2" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Enrolled courses" />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {MY_COURSES.map((course) => (
              <div key={course.id} className="alert">
                <Icon name={course.status === "completed" ? "circle-check" : "books"} />
                <div className="body">
                  <h4>{course.title}</h4>
                  <p>{course.teacher} · {course.lessonsDone}/{course.lessonsTotal} dars</p>
                  <Bar value={course.progress} tone={course.status === "completed" ? "green" : "blue"} thin />
                </div>
                <Pill tone={course.status === "completed" ? "green" : "blue"}>{course.progress}%</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Achievements" count={BADGES.length} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {BADGES.map((badge) => (
              <div key={badge.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={`thumb ${badge.tone === "amber" ? "zip" : badge.tone === "green" ? "quiz" : "doc"}`}>
                  <Icon name={badge.icon} />
                </span>
                <div>
                  <div style={{ fontWeight: 700 }}>{badge.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
