import { CheckCircle2, Send } from "lucide-react"
import { useState } from "react"

import { Badge, Button, Card, CardHead } from "@/components/ui"
import { QA } from "@/data/lmsData"

export function TeacherQA() {
  const [selected, setSelected] = useState(QA[0])

  return (
    <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
      <Card>
        <CardHead title="Savollar ro‘yxati" />
        <div className="space-y-3">
          {QA.map((question) => (
            <button
              key={question.id}
              type="button"
              onClick={() => setSelected(question)}
              className={`block w-full rounded-lg border p-3 text-left transition ${selected.id === question.id ? "border-cyan-300 bg-cyan-50" : "border-slate-200 hover:bg-slate-50"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-950">{question.topic}</span>
                <Badge tone={question.state === "answered" ? "emerald" : question.state === "flagged" ? "rose" : "amber"}>{question.state}</Badge>
              </div>
              <div className="mt-1 text-xs text-slate-500">{question.student} · {question.age}</div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHead title="Answer editor" sub={selected.course} />
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="font-bold text-slate-950">{selected.topic}</div>
          <p className="mt-2 text-sm text-slate-600">{selected.body}</p>
        </div>
        <textarea className="mt-4 min-h-44 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-cyan-400" defaultValue="Juda yaxshi savol. Avvalo validation loss va training loss orasidagi farqni kuzating. Early stopping patience qiymatini 3-5 epoch oralig‘ida qo‘yib, regularization parametrlarini solishtiring." />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" icon={Send}>Javobni yuborish</Button>
          <Button variant="success" icon={CheckCircle2}>Answered deb belgilash</Button>
        </div>
      </Card>
    </div>
  )
}
