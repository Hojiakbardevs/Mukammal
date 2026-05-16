import { Fragment } from "react"

import { Card, CardHead, Icon, Pill, type PillTone } from "@/components/dashboard/LmsPrimitives"
import { MY_SCHEDULE } from "@/data/studentData"

const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"]
const slots = ["09:00", "11:00", "14:00", "16:00"]

function kindLabel(kind: string) {
  if (kind === "lab") return "Lab"
  if (kind === "live") return "Live"
  if (kind === "exam") return "Imtihon"
  return "Ma'ruza"
}

function kindTone(kind: string): PillTone {
  if (kind === "lab") return "purple"
  if (kind === "live") return "blue"
  if (kind === "exam") return "red"
  return "green"
}

export function StudentSchedule() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dars jadvali</h1>
          <p>Haftalik reja, online/offline belgilari va bugungi darslar ko'rsatilgan.</p>
        </div>
      </div>

      <div className="grid c-7-5">
        <Card>
          <CardHead title="Haftalik jadval" sub="Toshkent vaqti" />
          <div className="card-pad" style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 720, display: "grid", gridTemplateColumns: "90px repeat(5, 1fr)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ background: "var(--bg4)", padding: 10, fontWeight: 800 }}>Vaqt</div>
              {days.map((day, index) => (
                <div key={day} style={{ background: index === 0 ? "var(--accent-light)" : "var(--bg4)", padding: 10, fontWeight: 800, color: index === 0 ? "var(--accent-ink)" : "var(--text1)" }}>
                  {day}
                </div>
              ))}
              {slots.map((slot, slotIndex) => (
                <Fragment key={slot}>
                  <div key={`${slot}-time`} style={{ borderTop: "1px solid var(--border)", padding: 10, color: "var(--text3)", fontWeight: 700 }}>{slot}</div>
                  {days.map((day, dayIndex) => {
                    const session = MY_SCHEDULE.find((item) => item.day === dayIndex && item.slot === slotIndex)
                    return (
                      <div key={`${day}-${slot}`} style={{ minHeight: 92, borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)", padding: 8, background: dayIndex === 0 ? "#fbfdff" : "#fff" }}>
                        {session ? (
                          <div className="alert" style={{ padding: 10 }}>
                            <Icon name={session.kind === "live" ? "video" : session.kind === "lab" ? "flask" : session.kind === "exam" ? "clipboard-check" : "chalkboard"} />
                            <div className="body">
                              <h4>{session.course}</h4>
                              <p>{session.room} · {session.trainer}</p>
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

        <Card>
          <CardHead title="Bugungi sessiyalar" />
          <div className="card-pad" style={{ display: "grid", gap: 10 }}>
            {MY_SCHEDULE.filter((item) => item.day === 0).map((session) => (
              <div key={`${session.course}-${session.slot}`} className="alert blue">
                <Icon name={session.room === "Online" ? "video" : "map-pin"} />
                <div className="body">
                  <h4>{session.course}</h4>
                  <p>{slots[session.slot]} · {session.room} · {session.trainer}</p>
                </div>
                <Pill tone={session.room === "Online" ? "purple" : "blue"}>{session.room === "Online" ? "Online" : "Offline"}</Pill>
              </div>
            ))}
            <div className="note">Bugungi kun ko'k fon bilan ajratilgan. Online darslar uchun havola sessiya boshlanishidan 15 daqiqa oldin ochiladi.</div>
          </div>
        </Card>
      </div>
    </>
  )
}
