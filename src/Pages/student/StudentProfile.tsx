import { Award, BookOpen, Flame, LineChart } from "lucide-react"

import { Avatar, Badge, Card, CardHead, Progress, Stat } from "@/components/ui"
import { BADGES, ME, MY_COURSES } from "@/data/studentData"

export function StudentProfile() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={ME.name} size="xl" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-950">{ME.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{ME.group} · {ME.stream} · {ME.level}-daraja</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="cyan">Faol tinglovchi</Badge>
              <Badge tone="emerald">{ME.certs} sertifikat</Badge>
              <Badge tone="amber">{ME.streak} kun streak</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Kurslar" value={ME.enrolled} sub={`${ME.completed} tasi yakunlangan`} tone="cyan" />
        <Stat label="XP" value={ME.points} sub="Keyingi darajaga 260 XP" tone="violet" />
        <Stat label="O‘rtacha" value={ME.avgScore} unit="%" sub="Baholangan ishlar" tone="emerald" />
        <Stat label="Sertifikat" value={ME.certificateProgress} unit="%" sub="AI Track progressi" tone="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHead title="Enrolled courses" />
          <div className="space-y-4">
            {MY_COURSES.map((course) => (
              <div key={course.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-950">{course.title}</div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.lessonsDone}/{course.lessonsTotal} dars
                    </div>
                  </div>
                  <Badge tone={course.status === "Yakunlangan" ? "emerald" : "cyan"}>{course.status}</Badge>
                </div>
                <div className="mt-3">
                  <Progress value={course.progress} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Achievements" />
          <div className="grid gap-3 sm:grid-cols-2">
            {BADGES.map((badge, index) => {
              const Icon = index === 0 ? Flame : index === 1 ? Award : LineChart
              return (
                <div key={badge.title} className="rounded-lg border border-slate-200 p-4">
                  <Icon className="h-5 w-5 text-cyan-600" />
                  <div className="mt-3 font-bold text-slate-950">{badge.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{badge.desc}</div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
