import { useState } from "react"

import { Btn, Card, Icon, Pill, Seg, Toolbar } from "@/components/dashboard/LmsPrimitives"
import { MY_SCHEDULE } from "@/data/studentData"

const DAYS = ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"]
const TODAY_IDX = 3

const SLOTS = [
  { t: "08:30", e: "10:00" },
  { t: "10:15", e: "11:45" },
  { t: "12:30", e: "14:00" },
  { t: "14:15", e: "15:45" },
  { t: "16:00", e: "17:30" },
]

const KIND_STYLE: Record<string, { bg: string; brd: string; txt: string; label: string }> = {
  lecture: { bg: "#eef4ff", brd: "#c2d6ff", txt: "#0a3a8c", label: "Lecture" },
  lab:     { bg: "#f5f3ff", brd: "#ddd6fe", txt: "#4c1d95", label: "Lab" },
  live:    { bg: "#ecfeff", brd: "#a5f3fc", txt: "#0e7490", label: "Online · Live" },
  exam:    { bg: "#fef2f2", brd: "#fecaca", txt: "#7f1d1d", label: "Exam" },
}

export function StudentSchedule() {
  const [view, setView] = useState("week")

  return (
    <>
      <Toolbar>
        <Seg
          value={view}
          onChange={setView}
          options={[
            { value: "week",  label: "Hafta", icon: "calendar-week" },
            { value: "month", label: "Oy",    icon: "calendar" },
          ]}
        />
        <Btn size="sm" leftIcon="chevron-left" />
        <span style={{ fontWeight: 700, fontSize: 14 }}>12-May – 18-May, 2026</span>
        <Btn size="sm" leftIcon="chevron-right" />
        <Btn size="sm" leftIcon="restore">Bugun</Btn>
        <div className="spacer" />
        <Btn size="sm" leftIcon="calendar-event">iCal eksport</Btn>
      </Toolbar>

      <Card style={{ marginTop: 14 }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "82px repeat(6, 1fr)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ padding: "12px 10px", fontSize: 11, color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.05 }}>
            Vaqt
          </div>
          {DAYS.map((d, i) => (
            <div key={i} style={{ padding: "12px 10px", borderLeft: "1px solid var(--hairline)", textAlign: "center" }}>
              <div style={{ fontSize: 10.5, color: "var(--text3)", letterSpacing: 0.05, textTransform: "uppercase", fontWeight: 700 }}>{d}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: i === TODAY_IDX ? "var(--accent)" : "#0f172a" }}>{12 + i}</div>
            </div>
          ))}
        </div>

        {/* Slot rows */}
        {SLOTS.map((sl, si) => (
          <div key={si} style={{
            display: "grid", gridTemplateColumns: "82px repeat(6, 1fr)",
            borderBottom: si < SLOTS.length - 1 ? "1px solid var(--hairline)" : "none",
            minHeight: 72,
          }}>
            <div className="num" style={{ padding: "10px 10px", fontSize: 11.5, fontWeight: 600, color: "var(--text2)" }}>
              {sl.t}
              <div style={{ color: "var(--text3)" }}>{sl.e}</div>
            </div>
            {DAYS.map((_, di) => {
              const item = MY_SCHEDULE.find((it) => it.day === di && it.slot === si)
              if (!item) return <div key={di} style={{ borderLeft: "1px solid var(--hairline)" }} />
              const st = KIND_STYLE[item.kind] ?? { bg: "#f1f3f8", brd: "#e5e8ef", txt: "#475569", label: item.kind }
              const isOnline = item.room === "Online"
              return (
                <div key={di} style={{ borderLeft: "1px solid var(--hairline)", padding: 6 }}>
                  <div style={{
                    background: st.bg, border: `1px solid ${st.brd}`, color: st.txt,
                    borderRadius: 8, padding: "8px 10px", height: "100%",
                    display: "flex", flexDirection: "column", gap: 4,
                  }}>
                    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase", opacity: 0.85 }}>
                      {st.label}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.2 }}>{item.course}</div>
                    <div style={{ fontSize: 11, opacity: 0.85, marginTop: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                      {isOnline ? (
                        <><Icon name="video" /> Online</>
                      ) : (
                        <><Icon name="map-pin" /> {item.room}</>
                      )}
                    </div>
                    <Pill tone={isOnline ? "purple" : "blue"}>
                      {isOnline ? "Online" : "Offline"}
                    </Pill>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </Card>
    </>
  )
}
