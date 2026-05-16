import { Fragment } from "react"

import { Card, CardHead, Icon, Pill, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { SCHEDULE } from "@/data/lmsData"

const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"]
const slots = ["09:00", "11:00", "14:00", "16:00"]

function kindTone(kind: string): PillTone {
  if (kind === "lab") return "purple"
  if (kind === "live") return "blue"
  if (kind === "exam") return "red"
  if (kind === "hours") return "teal"
  return "green"
}

function kindLabel(kind: string) {
  if (kind === "lab") return "Lab"
  if (kind === "live") return "Live"
  if (kind === "exam") return "Imtihon"
  if (kind === "hours") return "Maslahat vaqti"
  return "Ma'ruza"
}

export function TeacherSchedule() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Trener jadvali</h1>
          <p>Ma'ruza, lab, live, imtihon va maslahat vaqti sessiyalari haftalik jadvalda.</p>
        </div>
      </div>

      <Card>
        <CardHead title="Weekly timetable" sub="AIRI Training · May 2026" />
        <div className="card-pad" style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 860, display: "grid", gridTemplateColumns: "90px repeat(5, 1fr)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ background: "var(--bg4)", padding: 10, fontWeight: 800 }}>Vaqt</div>
            {days.map((day, index) => (
              <div key={day} style={{ background: index === 0 ? "var(--accent-light)" : "var(--bg4)", padding: 10, fontWeight: 800 }}>
                {day}
              </div>
            ))}
            {slots.map((slot, slotIndex) => (
              <Fragment key={slot}>
                <div style={{ borderTop: "1px solid var(--border)", padding: 10, color: "var(--text3)", fontWeight: 700 }}>{slot}</div>
                {days.map((day, dayIndex) => {
                  const session = SCHEDULE.find((item) => item.day === dayIndex && item.slot === slotIndex)
                  return (
                    <div key={`${day}-${slot}`} style={{ minHeight: 104, borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)", padding: 8, background: dayIndex === 0 ? "#fbfdff" : "#fff" }}>
                      {session ? (
                        <div className="alert" style={{ padding: 10 }}>
                          <Icon name={session.kind === "live" ? "video" : session.kind === "lab" ? "flask" : session.kind === "exam" ? "clipboard-check" : session.kind === "hours" ? "clock-hour-4" : "chalkboard"} />
                          <div className="body">
                            <h4>{session.course}</h4>
                            <p>{session.group} · {session.room}</p>
                            <Pill tone={kindTone(session.kind)}>{kindLabel(session.kind)}</Pill>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </Card>
    </>
  )
}
