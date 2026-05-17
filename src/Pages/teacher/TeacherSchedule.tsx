import { useState } from "react"
import { Btn, Card, Chip, Icon, Seg, Toolbar } from "@/components/dashboard/LmsPrimitives"
import { SCHEDULE, SCHEDULE_SLOTS, SCHEDULE_DAYS } from "@/data/lmsData"

type KindStyle = { bg: string; brd: string; txt: string; label: string }

function cellStyle(kind: string): KindStyle {
  switch (kind) {
    case "lecture": return { bg: "#eef4ff", brd: "#c2d6ff", txt: "#0a3a8c", label: "Ma'ruza" }
    case "lab":     return { bg: "#f5f3ff", brd: "#ddd6fe", txt: "#4c1d95", label: "Lab" }
    case "live":    return { bg: "#ecfeff", brd: "#a5f3fc", txt: "#0e7490", label: "Live" }
    case "exam":    return { bg: "#fef2f2", brd: "#fecaca", txt: "#7f1d1d", label: "Imtihon" }
    case "hours":   return { bg: "#ecfdf5", brd: "#bbf7d0", txt: "#14532d", label: "Maslahat vaqti" }
    default:        return { bg: "#f1f3f8", brd: "#e5e8ef", txt: "#475569", label: kind }
  }
}

const TODAY_IDX = 3 // Thursday highlighted

export function TeacherSchedule() {
  const [viewMode, setViewMode] = useState("week")

  return (
    <>
      <Toolbar>
        <Seg
          value={viewMode}
          onChange={setViewMode}
          options={[
            { value: "day",   label: "Kun",  icon: "calendar-event" },
            { value: "week",  label: "Hafta", icon: "calendar-week" },
            { value: "month", label: "Oy",   icon: "calendar" },
          ]}
        />
        <Btn size="sm" leftIcon="chevron-left" />
        <span style={{ fontWeight: 700 }}>12-May — 18-May, 2026</span>
        <Btn size="sm" leftIcon="chevron-right" />
        <Btn size="sm" leftIcon="restore">Bugun</Btn>
        <div className="spacer" />
        <Chip icon="filter">Kurs: Hammasi</Chip>
        <Chip icon="users">Guruh: Hammasi</Chip>
        <Btn size="sm" variant="primary" leftIcon="plus">Yangi session</Btn>
      </Toolbar>

      <Card style={{ marginTop: 14 }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `82px repeat(${SCHEDULE_DAYS.length}, 1fr)`,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              padding: "12px 10px",
              fontSize: 11,
              color: "#8a93a6",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.08,
            }}
          >
            Vaqt
          </div>
          {SCHEDULE_DAYS.map((d, di) => (
            <div
              key={d}
              style={{
                padding: "12px 10px",
                borderLeft: "1px solid var(--hairline)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  color: "#8a93a6",
                  letterSpacing: 0.08,
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {d}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: di === TODAY_IDX ? "var(--accent, #1f6feb)" : "#0f172a",
                }}
              >
                {12 + di}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        {SCHEDULE_SLOTS.map((sl, si) => (
          <div
            key={sl.t}
            style={{
              display: "grid",
              gridTemplateColumns: `82px repeat(${SCHEDULE_DAYS.length}, 1fr)`,
              borderBottom: si < SCHEDULE_SLOTS.length - 1 ? "1px solid var(--hairline)" : "none",
              minHeight: 72,
            }}
          >
            <div
              className="mono num"
              style={{ padding: "10px 10px", fontSize: 11.5, fontWeight: 600, color: "#475569" }}
            >
              {sl.t}
              <div style={{ color: "#b0b7c5" }}>{sl.e}</div>
            </div>
            {SCHEDULE_DAYS.map((_, di) => {
              const item = SCHEDULE.find((it) => it.day === di && it.slot === si)
              if (!item) {
                return (
                  <div key={di} style={{ borderLeft: "1px solid var(--hairline)" }} />
                )
              }
              const st = cellStyle(item.kind)
              return (
                <div key={di} style={{ borderLeft: "1px solid var(--hairline)", padding: 6 }}>
                  <div
                    style={{
                      background: st.bg,
                      border: `1px solid ${st.brd}`,
                      color: st.txt,
                      borderRadius: 8,
                      padding: "8px 10px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.05,
                        textTransform: "uppercase",
                        opacity: 0.85,
                      }}
                    >
                      {st.label}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.2 }}>
                      {item.course.split(" ").slice(0, 2).join(" ")}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        opacity: 0.85,
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                        marginTop: "auto",
                      }}
                    >
                      <span><Icon name="users" /> {item.group}</span>
                      <span><Icon name="map-pin" /> {item.room}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </Card>

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {(["lecture", "lab", "live", "exam", "hours"] as const).map((kind) => {
          const s = cellStyle(kind)
          return (
            <span
              key={kind}
              className="pill"
              style={{ background: s.bg, color: s.txt, borderColor: s.brd }}
            >
              {s.label}
            </span>
          )
        })}
      </div>
    </>
  )
}
