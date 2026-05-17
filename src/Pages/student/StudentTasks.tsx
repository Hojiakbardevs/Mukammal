import { useState } from "react"

import { Btn, Card, Chip, Icon, Pill, Seg, Tabs, Toolbar, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { MY_TASKS } from "@/data/studentData"

function Stars({ count = 0 }: { count?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name={i < count ? "star-filled" : "star"}
          style={{ fontSize: 13, color: i < count ? "#f59e0b" : "var(--border2)" }}
        />
      ))}
    </span>
  )
}

const TYPE_TONE: Record<string, PillTone> = {
  quiz: "teal", project: "purple", lab: "blue", assignment: "gray",
}

export function StudentTasks() {
  const [tab, setTab] = useState<"active" | "graded" | "all">("active")
  const [sortBy, setSortBy] = useState("due")

  const counts = {
    active: MY_TASKS.filter((t) => t.status !== "graded").length,
    graded: MY_TASKS.filter((t) => t.status === "graded").length,
  }

  const visible = MY_TASKS.filter((t) =>
    tab === "active" ? t.status !== "graded" :
    tab === "graded" ? t.status === "graded" :
    true
  )

  return (
    <>
      <Tabs
        value={tab}
        onChange={(v) => setTab(v as typeof tab)}
        items={[
          { value: "active", label: "Aktiv",      icon: "clock",  count: counts.active },
          { value: "graded", label: "Baholangan", icon: "stamp",  count: counts.graded },
          { value: "all",    label: "Hammasi",                    count: MY_TASKS.length },
        ]}
      />

      <Card>
        <Toolbar>
          <Chip icon="filter">Kurs: hammasi</Chip>
          <Chip icon="alert-triangle">Faqat 5 kundan kam</Chip>
          <div className="spacer" />
          <Seg
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "due",   label: "Muddat" },
              { value: "score", label: "Ball" },
            ]}
          />
        </Toolbar>

        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th>Topshiriq</th>
                <th>Kurs</th>
                <th>Turi</th>
                <th className="center">Ball</th>
                <th>Muddat / Topshirildi</th>
                <th>Yulduz</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => (
                <tr key={t.id}>
                  <td><b>{t.title}</b></td>
                  <td>{t.course}</td>
                  <td><Pill tone={TYPE_TONE[t.type] ?? "gray"}>{t.type}</Pill></td>
                  <td className="center num">
                    {t.status === "graded" ? (
                      <span style={{ fontWeight: 700, fontSize: 14, color: (t.score ?? 0) / (t.max ?? 1) > 0.85 ? "var(--green)" : "var(--accent)" }}>
                        {t.score}/{t.max}
                      </span>
                    ) : `0 / ${t.points}`}
                  </td>
                  <td>
                    {t.dueIn > 0 ? (
                      <span style={{ color: t.dueIn < 5 ? "var(--red)" : "var(--text2)" }}>
                        <Icon name="clock" /> {t.dueIn} kun qoldi
                      </span>
                    ) : (
                      <span style={{ color: "var(--text3)" }}>
                        <Icon name="check" /> {t.submittedAt} da topshirildi
                      </span>
                    )}
                  </td>
                  <td>
                    {t.status === "graded" ? <Stars count={t.stars} /> : <span style={{ color: "var(--text3)" }}>—</span>}
                  </td>
                  <td>
                    {t.status === "graded"      && <Pill tone="green" dot>Baholandi</Pill>}
                    {t.status === "in-progress" && <Pill tone="blue"  dot>Boshlandi</Pill>}
                    {t.status === "not-started" && <Pill tone="gray"  dot>Boshlanmadi</Pill>}
                  </td>
                  <td className="right">
                    {t.status === "graded" ? (
                      <Btn size="xs" leftIcon="eye">Feedback</Btn>
                    ) : (
                      <Btn size="xs" variant="primary" leftIcon={t.status === "not-started" ? "player-play" : "upload"}>
                        {t.status === "not-started" ? "Boshlash" : "Davom etish"}
                      </Btn>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
