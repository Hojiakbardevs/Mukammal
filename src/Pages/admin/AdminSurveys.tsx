import { BarChart3, Plus } from "lucide-react"
import { useState } from "react"

import { Badge, Button, Card, CardHead, Progress, TabPanel, Tabs } from "@/components/ui"
import { SURVEYS } from "@/data/lmsData"

export function AdminSurveys() {
  const [tab, setTab] = useState("active")

  return (
    <div className="space-y-6">
      <Card>
        <CardHead title="So‘rovnomalar" sub="Faol, qoralama va yopilgan surveylar" actions={<Button variant="primary" icon={Plus}>Yangi survey</Button>} />
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "active", label: "Faol", count: 1 },
            { value: "draft", label: "Qoralama", count: 1 },
            { value: "closed", label: "Yopilgan", count: 1 },
          ]}
        />
        <TabPanel>
          <div className="grid gap-4 md:grid-cols-3">
            {SURVEYS.map((survey) => (
              <div key={survey.title} className="rounded-lg border border-slate-200 p-4">
                <Badge tone={survey.status === "Faol" ? "emerald" : survey.status === "Qoralama" ? "amber" : "slate"}>{survey.status}</Badge>
                <h2 className="mt-3 font-bold text-slate-950">{survey.title}</h2>
                <div className="mt-3 text-sm text-slate-500">{survey.responses} javob · NPS {survey.nps}</div>
                <Progress value={survey.nps} label="Response analytics" tone="cyan" />
              </div>
            ))}
          </div>
        </TabPanel>
      </Card>

      <Card>
        <CardHead title="Survey builder mock" />
        <div className="grid gap-4 md:grid-cols-3">
          {["NPS savoli", "Ochiq feedback", "Trener reytingi"].map((block) => (
            <div key={block} className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
              <BarChart3 className="h-5 w-5 text-cyan-600" />
              <div className="mt-3 font-bold text-slate-950">{block}</div>
              <p className="mt-1 text-sm text-slate-500">Savol matni, majburiylik va segment sozlamalari mavjud.</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
