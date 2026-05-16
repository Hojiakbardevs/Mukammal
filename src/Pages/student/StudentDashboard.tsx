import { ArrowRight, Award, Flame, Sparkles, Star, Trophy } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Badge, Button, Card, CardHead, Donut, Progress, Stat } from "@/components/ui"
import { BADGES, ME, MY_COURSES, MY_SCHEDULE, MY_TASKS } from "@/data/studentData"

export function StudentDashboard() {
  const navigate = useNavigate()
  const currentCourse = MY_COURSES[1]
  const deadlines = MY_TASKS.filter((task) => task.dueIn > 0).slice(0, 3)

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <Badge tone="cyan" icon={Sparkles}>Bugungi o‘quv reja tayyor</Badge>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold">Salom, {ME.name}. NLP modulidagi attention darsini davom ettiramiz.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Joriy haftada 3 ta topshiriq muddati yaqinlashmoqda. Sertifikat yo‘lingiz 78% ga yetdi, final loyiha bo‘yicha tayyorgarlik yaxshi ketmoqda.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary" rightIcon={ArrowRight} onClick={() => navigate("/app/lesson")}>Darsni davom ettirish</Button>
              <Button variant="default" onClick={() => navigate("/app/tasks")}>Deadline ro‘yxati</Button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-4">
            <div className="text-sm font-semibold text-slate-200">Sertifikat progressi</div>
            <div className="mt-4 flex items-center gap-4">
              <Donut value={ME.certificateProgress} tone="#22d3ee" />
              <div className="text-sm text-slate-300">
                <div className="font-bold text-white">AI Track Professional</div>
                <div className="mt-1">Yakuniy loyiha va 2 ta laboratoriya qoldi.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="XP" value={ME.points} sub="120 XP bugun qo‘shildi" tone="cyan" />
        <Stat label="Streak" value={ME.streak} unit="kun" sub="Ketma-ket o‘qish" tone="amber" />
        <Stat label="Badge" value={BADGES.length} sub="Oxirgisi: kuchli feedback" tone="violet" />
        <Stat label="O‘rtacha ball" value={ME.avgScore} unit="%" sub="4 ta kurs bo‘yicha" tone="emerald" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHead title="Davom etish" sub="Joriy kursdagi keyingi dars" />
          <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge tone="cyan">{currentCourse.track}</Badge>
                <h2 className="mt-3 text-xl font-bold text-slate-950">{currentCourse.title}</h2>
                <p className="mt-1 text-sm text-slate-600">Keyingi dars: {currentCourse.nextLesson}</p>
              </div>
              <Button variant="primary" onClick={() => navigate("/app/lesson")}>Ochish</Button>
            </div>
            <div className="mt-4">
              <Progress value={currentCourse.progress} label={`${currentCourse.lessonsDone}/${currentCourse.lessonsTotal} dars tugallandi`} />
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="AI tavsiya" sub="O‘quv harakatingiz asosida" />
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Attention darsidan keyin “Positional encoding” konspektini qayta ko‘ring. So‘ng embedding probes topshirig‘ida tahlil jadvalini to‘ldiring.
            </p>
            <div className="rounded-lg bg-slate-50 p-3 font-semibold text-slate-700">
              Tavsiya etilgan vaqt: bugun 19:00 dan 19:45 gacha.
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHead title="Bugungi reja" />
          <div className="space-y-3">
            {MY_SCHEDULE.slice(0, 3).map((session) => (
              <div key={`${session.day}-${session.time}`} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-bold text-slate-950">{session.time}</div>
                  <Badge tone={session.room === "Online" ? "emerald" : "blue"}>{session.room}</Badge>
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-700">{session.course}</div>
                <div className="text-xs text-slate-500">{session.trainer}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Yaqin deadline" count={deadlines.length} />
          <div className="space-y-3">
            {deadlines.map((task) => (
              <div key={task.id} className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-bold text-slate-900">{task.title}</div>
                  <Badge tone="amber">{task.dueIn} kun</Badge>
                </div>
                <div className="mt-1 text-xs text-slate-600">{task.course}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Yutuqlar" />
          <div className="space-y-3">
            {BADGES.slice(0, 3).map((badge, index) => {
              const Icon = index === 0 ? Flame : index === 1 ? Trophy : Star
              return (
                <div key={badge.title} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-950">{badge.title}</div>
                    <div className="text-xs text-slate-500">{badge.desc}</div>
                  </div>
                </div>
              )
            })}
            <Button variant="default" icon={Award} onClick={() => navigate("/app/profile")}>Barcha yutuqlar</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
