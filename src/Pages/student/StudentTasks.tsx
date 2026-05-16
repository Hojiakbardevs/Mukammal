import { useMemo, useState } from "react"

import { Btn, Card, CardHead, Icon, Pill, Tabs, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { MY_TASKS } from "@/data/studentData"

function taskStatusLabel(status: string) {
  if (status === "graded") return "Baholangan"
  if (status === "in-progress") return "Jarayonda"
  return "Boshlanmagan"
}

function taskStatusTone(status: string): PillTone {
  if (status === "graded") return "green"
  if (status === "in-progress") return "blue"
  return "amber"
}

export function StudentTasks() {
  const [tab, setTab] = useState("active")
  const filtered = useMemo(() => {
    if (tab === "graded") return MY_TASKS.filter((task) => task.status === "graded")
    if (tab === "all") return MY_TASKS
    return MY_TASKS.filter((task) => task.status !== "graded")
  }, [tab])

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Topshiriqlar</h1>
          <p>Faol, baholangan va barcha topshiriqlarni deadline hamda ball bilan kuzating.</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="upload">Fayl yuklash</Btn>
          <Btn variant="primary" leftIcon="send">Yuborish</Btn>
        </div>
      </div>

      <Card>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: "active", label: "Faol", icon: "clock", count: MY_TASKS.filter((task) => task.status !== "graded").length },
            { value: "graded", label: "Baholangan", icon: "circle-check", count: MY_TASKS.filter((task) => task.status === "graded").length },
            { value: "all", label: "Barchasi", icon: "list", count: MY_TASKS.length },
          ]}
        />
        <CardHead title="Topshiriqlar jadvali" sub={`${filtered.length} ta topshiriq`} />
        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Topshiriq</th>
                <th>Turi</th>
                <th>Deadline</th>
                <th>Ball</th>
                <th>Holat</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id}>
                  <td>{task.course}</td>
                  <td>
                    <b>{task.title}</b>
                    {task.submittedAt ? <div style={{ color: "var(--text3)", fontSize: 11 }}>Yuborilgan: {task.submittedAt}</div> : null}
                  </td>
                  <td><Pill tone="gray">{task.type}</Pill></td>
                  <td>
                    {task.dueIn > 0 ? (
                      <Pill tone={task.dueIn <= 3 ? "red" : "amber"} icon="calendar-due">{task.dueIn} kun qoldi</Pill>
                    ) : (
                      <Pill tone="green" icon="circle-check">Yakunlangan</Pill>
                    )}
                  </td>
                  <td className="mono">{task.score === null ? `0 / ${task.points}` : `${task.score} / ${task.max}`}</td>
                  <td><Pill tone={taskStatusTone(task.status)} dot>{taskStatusLabel(task.status)}</Pill></td>
                  <td className="right">
                    <Btn size="sm" variant={task.status === "graded" ? "default" : "primary"} leftIcon={task.status === "graded" ? "eye" : "upload"}>
                      {task.status === "graded" ? "Ko'rish" : "Yuborish"}
                    </Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-foot">
          <span><Icon name="info-circle" /> Deadline Toshkent vaqti bo'yicha 23:59 da yopiladi.</span>
          <span>Auto-save: yoqilgan</span>
        </div>
      </Card>
    </>
  )
}
