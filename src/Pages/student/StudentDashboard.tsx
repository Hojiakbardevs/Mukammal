import { Link } from "react-router-dom"

import { Avatar, Bar, Btn, Card, CardHead, Donut, Icon, Pill, Stat } from "@/components/dashboard/LmsPrimitives"
import { BADGES, ME, MY_COURSES, MY_SCHEDULE, MY_TASKS } from "@/data/studentData"

export function StudentDashboard() {
  const currentCourse = MY_COURSES.find((course) => course.id === "nlp") ?? MY_COURSES[0]
  const nextTask = MY_TASKS.find((task) => task.status !== "graded") ?? MY_TASKS[0]

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Bugungi o'quv markazingiz</h1>
          <p>NLP-26 o'quv oqimida dars, topshiriq va sertifikat yo'lingiz bir joyda jamlangan.</p>
        </div>
        <div className="page-actions">
          <Link className="btn" to="/app/schedule">
            <Icon name="calendar" /> Jadval
          </Link>
          <Link className="btn btn-primary" to="/app/lessons/transformers-attention">
            <Icon name="player-play" /> Darsni davom ettirish
          </Link>
        </div>
      </div>

      <div className="stat-grid cols-4" style={{ marginBottom: 14 }}>
        <Stat tone="blue" label="XP" value={ME.points} sub={`Level ${ME.level} · keyingi bosqichga 260 XP`} trend={{ dir: "up", label: "+120" }} />
        <Stat tone="amber" label="Streak" value={ME.streak} unit="kun" sub="Har kuni kamida 1 dars" trend={{ dir: "up", label: "+2" }} />
        <Stat tone="green" label="O'rtacha ball" value={ME.avgScore} unit="%" sub="So'nggi 4 baholash asosida" />
        <Stat tone="purple" label="Sertifikat" value={ME.certs} sub={`${ME.certificateProgress}% yo'l bosildi`} />
      </div>

      <div className="grid c-8-4">
        <Card>
          <div className="card-pad-lg" style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Avatar name={ME.name} tone={ME.tone} size="xl" />
              <div>
                <Pill tone="blue" icon="school">
                  {ME.learningStream}
                </Pill>
                <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 8, letterSpacing: -0.6 }}>
                  Xush kelibsiz, {ME.name.split(" ")[0]}!
                </h2>
                <p style={{ color: "var(--text2)", marginTop: 4 }}>
                  Bugun transformer attention darsini tugatib, Hw 4 uchun materiallarni ochish tavsiya qilinadi.
                </p>
              </div>
            </div>

            <div className="grid c-2">
              <div className="alert blue">
                <Icon name="player-play" />
                <div className="body">
                  <h4>Davom etish</h4>
                  <p>{currentCourse.nextLesson?.module} · {currentCourse.nextLesson?.title} · {currentCourse.nextLesson?.duration}</p>
                </div>
                <Link className="btn btn-sm btn-primary" to="/app/lessons/transformers-attention">
                  Ochish
                </Link>
              </div>
              <div className="alert amber">
                <Icon name="clock-exclamation" />
                <div className="body">
                  <h4>Yaqin deadline</h4>
                  <p>{nextTask.title} · {nextTask.dueIn} kun qoldi · {nextTask.points} ball</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="Sertifikat progress" actions={<Pill tone="green">Yo'lda</Pill>} />
          <div className="card-pad" style={{ display: "grid", placeItems: "center", gap: 14 }}>
            <Donut
              value={ME.certificateProgress}
              center={
                <div>
                  <div className="num" style={{ fontSize: 22, fontWeight: 800 }}>{ME.certificateProgress}%</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>AI Track</div>
                </div>
              }
            />
            <div style={{ width: "100%" }}>
              <Bar value={ME.certificateProgress} tone="green" thick />
              <p style={{ marginTop: 8, color: "var(--text2)", fontSize: 12 }}>
                Qolgan shartlar: 2 ta topshiriq, final loyiha, feedback so'rovnomasi.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid c-3" style={{ marginTop: 14 }}>
        <Card>
          <CardHead title="Bugungi reja" sub="3 ta faoliyat" />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {MY_SCHEDULE.filter((item) => item.day === 0).map((item) => (
              <div key={`${item.course}-${item.slot}`} className="alert">
                <Icon name={item.kind === "live" ? "video" : "chalkboard"} />
                <div className="body">
                  <h4>{item.course}</h4>
                  <p>{item.room} · {item.trainer} · slot {item.slot + 1}</p>
                </div>
                <Pill tone={item.room === "Online" ? "purple" : "blue"}>{item.room === "Online" ? "Online" : "Offline"}</Pill>
              </div>
            ))}
            <div className="alert green">
              <Icon name="checkup-list" />
              <div className="body">
                <h4>Mustaqil o'qish</h4>
                <p>Transformerlar transkriptini ko'rib chiqing va 3 ta savol yozing.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="Badge statistikasi" actions={<Pill tone="amber">{BADGES.length} ta</Pill>} />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {BADGES.slice(0, 4).map((badge) => (
              <div key={badge.title} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className={`thumb ${badge.tone === "amber" ? "zip" : badge.tone === "green" ? "quiz" : "doc"}`}>
                  <Icon name={badge.icon} />
                </span>
                <div>
                  <div style={{ fontWeight: 700 }}>{badge.title}</div>
                  <div style={{ color: "var(--text3)", fontSize: 12 }}>{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="SI tavsiyasi" actions={<Pill tone="purple" icon="sparkles">Personal</Pill>} />
          <div className="card-pad">
            <div className="note">
              Bugun darsni 85% dan yuqori ko'rish sertifikat shartiga ta'sir qiladi. Hw 4 topshirig'ini boshlashdan oldin
              materiallar bo'limidagi positional encoding konspektini oching.
            </div>
            <div className="row-div" />
            <Btn variant="primary" leftIcon="sparkles">Tavsiyani rejamga qo'shish</Btn>
          </div>
        </Card>
      </div>
    </>
  )
}
