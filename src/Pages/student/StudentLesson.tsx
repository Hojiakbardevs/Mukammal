import { Download, MessageSquare, Play, Send, UploadCloud } from "lucide-react"
import { useState } from "react"

import { Badge, Button, Card, CardHead, Progress, TabPanel, Tabs } from "@/components/ui"
import { LESSON } from "@/data/studentData"

export function StudentLesson() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white">
          <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_center,#164e63,#020617_65%)]">
            <div className="text-center">
              <button type="button" className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-400 text-slate-950 shadow-lg">
                <Play className="h-7 w-7 fill-current" />
              </button>
              <h1 className="mt-5 text-2xl font-bold">{LESSON.title}</h1>
              <p className="mt-2 text-sm text-slate-300">{LESSON.module} · {LESSON.duration}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
            <div className="text-sm text-slate-300">Trener: {LESSON.trainer}</div>
            <Badge tone="cyan">Ko‘rilmoqda</Badge>
          </div>
        </section>

        <Card>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: "overview", label: "Overview" },
              { value: "materials", label: "Materiallar" },
              { value: "qa", label: "Q&A" },
              { value: "task", label: "Topshiriq" },
            ]}
          />
          <TabPanel>
            {tab === "overview" ? (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <h2 className="font-bold text-slate-950">Dars mazmuni</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Ushbu dars self-attention hisoblash bosqichlari, query-key-value proyeksiyalari, multi-head attention va positional encodingning amaliy rolini tushuntiradi.
                  </p>
                </div>
                <div className="rounded-lg bg-cyan-50 p-4">
                  <div className="text-sm font-bold text-cyan-900">Keyingi qadam</div>
                  <p className="mt-2 text-sm text-cyan-800">Notebookda attention weightlarini vizual tahlil qiling.</p>
                </div>
              </div>
            ) : null}
            {tab === "materials" ? (
              <div className="grid gap-3 md:grid-cols-3">
                {LESSON.materials.map((material) => (
                  <div key={material} className="rounded-lg border border-slate-200 p-4">
                    <Download className="h-5 w-5 text-cyan-600" />
                    <div className="mt-3 text-sm font-bold text-slate-950">{material}</div>
                    <Button className="mt-4" size="sm" variant="default">Yuklab olish</Button>
                  </div>
                ))}
              </div>
            ) : null}
            {tab === "qa" ? (
              <div className="space-y-3">
                {LESSON.qa.map((item) => (
                  <div key={item.question} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                      <MessageSquare className="h-4 w-4 text-cyan-600" />
                      {item.name}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{item.question}</p>
                    <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{item.answer}</p>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-cyan-400" placeholder="Savol yozing" />
                  <Button variant="primary" icon={Send}>Yuborish</Button>
                </div>
              </div>
            ) : null}
            {tab === "task" ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="font-bold text-slate-950">Embedding probes topshirig‘i</div>
                <p className="mt-2 text-sm text-slate-700">Notebookda 3 ta misol gap uchun attention xaritasini tahlil qiling va xulosani PDF shaklida yuboring.</p>
                <Button className="mt-4" variant="amber" icon={UploadCloud}>Ishni topshirish</Button>
              </div>
            ) : null}
          </TabPanel>
        </Card>
      </div>

      <aside className="space-y-6">
        <Card>
          <CardHead title="Darslar ro‘yxati" />
          <div className="space-y-4">
            {LESSON.modules.map((module) => (
              <div key={module.title}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="text-sm font-bold text-slate-950">{module.title}</div>
                  <Badge tone={module.state === "Joriy" ? "cyan" : "slate"}>{module.state}</Badge>
                </div>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <div key={lesson} className={`rounded-lg px-3 py-2 text-sm ${lesson === "Transformerlar va attention" ? "bg-cyan-50 font-bold text-cyan-800" : "bg-slate-50 text-slate-600"}`}>
                      {lesson}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHead title="Kurs progressi" />
          <Progress value={64} label="NLP kursi" />
          <Button className="mt-5 w-full" variant="primary">Keyingi dars</Button>
        </Card>
      </aside>
    </div>
  )
}
