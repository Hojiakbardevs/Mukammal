import { Award, Users } from "lucide-react"

import { BarChart, Card, CardHead, Donut, GroupBarChart, Legend, LineChart, Stat } from "@/components/ui"
import { COURSES, LEARNING_STREAMS } from "@/data/lmsData"

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Faol tinglovchi" value={COURSES.reduce((sum, course) => sum + course.studentsActive, 0)} sub="Barcha kurslar" tone="cyan" />
        <Stat label="Completion" value="68" unit="%" sub="O‘rtacha yakunlash" tone="emerald" />
        <Stat label="Sertifikat" value="212" sub="2026-yilda berildi" tone="violet" />
        <Stat label="NPS" value="+62" sub="So‘rovnomalar natijasi" tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHead title="Enrollment chart" sub="O‘quv oqimlari bo‘yicha aktiv tinglovchilar" />
          <BarChart data={LEARNING_STREAMS.map((stream) => stream.students)} labels={LEARNING_STREAMS.map((stream) => stream.name)} height={220} />
        </Card>
        <Card>
          <CardHead title="Completion chart" />
          <LineChart data={[42, 48, 55, 59, 63, 66, 68]} height={220} color="#10b981" />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHead title="Certificate stats" />
          <div className="flex items-center gap-5">
            <Donut value={74} tone="#8b5cf6" />
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-950"><Award className="h-4 w-4" /> 148 AI Track</div>
              <div>64 NLP Amaliyotchi</div>
              <div>Eligibility kutayotganlar: 37</div>
            </div>
          </div>
        </Card>
        <Card>
          <CardHead title="Risk funnel" />
          <GroupBarChart
            labels={["AI", "ML", "NLP"]}
            groups={[[14, 7, 3], [9, 4, 2], [6, 2, 1]]}
            series={[{ label: "Kuzatuv", color: "#f59e0b" }, { label: "Aralashuv", color: "#ef4444" }, { label: "Tiklandi", color: "#10b981" }]}
          />
          <Legend items={[{ label: "Kuzatuv", color: "#f59e0b" }, { label: "Aralashuv", color: "#ef4444" }, { label: "Tiklandi", color: "#10b981" }]} />
        </Card>
        <Card>
          <CardHead title="NPS stats" />
          <div className="flex items-center gap-5">
            <Donut value={62} tone="#06b6d4" />
            <div className="text-sm text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-950"><Users className="h-4 w-4" /> 496 javob</div>
              <div className="mt-2">Eng yuqori: NLP-26</div>
              <div>Eng past: ML laboratoriya haftasi</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
