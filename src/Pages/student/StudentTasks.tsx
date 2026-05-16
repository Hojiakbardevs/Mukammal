import { FileCheck2, UploadCloud } from "lucide-react"
import { useState } from "react"

import { Badge, Button, Card, CardHead, Table, Tabs } from "@/components/ui"
import { MY_TASKS } from "@/data/studentData"

export function StudentTasks() {
  const [tab, setTab] = useState("active")
  const filtered = MY_TASKS.filter((task) => {
    if (tab === "active") return task.score === null
    if (tab === "graded") return task.score !== null
    return true
  })

  return (
    <Card>
      <CardHead title="Topshiriqlar" sub="Muddatlar, holat va topshirish amallari" />
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "active", label: "Faol", count: MY_TASKS.filter((task) => task.score === null).length },
          { value: "graded", label: "Baholangan", count: MY_TASKS.filter((task) => task.score !== null).length },
          { value: "all", label: "Hammasi", count: MY_TASKS.length },
        ]}
      />
      <div className="mt-4">
        <Table
          headers={["Topshiriq", "Kurs", "Muddat", "Ball", "Holat", "Amal"]}
          rows={filtered.map((task) => [
            <div>
              <div className="font-bold text-slate-950">{task.title}</div>
              <div className="text-xs text-slate-500">{task.type}</div>
            </div>,
            task.course,
            <Badge tone={task.dueIn > 0 ? "amber" : "slate"}>{task.dueIn > 0 ? `${task.dueIn} kun qoldi` : `${Math.abs(task.dueIn)} kun oldin`}</Badge>,
            task.score === null ? `${task.points} ball` : `${task.score}/${task.points}`,
            <Badge tone={task.score === null ? "cyan" : "emerald"}>{task.status}</Badge>,
            <Button size="sm" variant={task.score === null ? "primary" : "default"} icon={task.score === null ? UploadCloud : FileCheck2}>
              {task.score === null ? "Topshirish" : "Ko‘rish"}
            </Button>,
          ])}
        />
      </div>
    </Card>
  )
}
