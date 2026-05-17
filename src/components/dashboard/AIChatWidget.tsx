import { useEffect, useMemo, useRef, useState } from "react"

import { Icon } from "@/components/dashboard/LmsPrimitives"
import type { LmsRole } from "@/data/navItems"

type Message = {
  role: "user" | "assistant"
  content: string
}

const suggestions = {
  student: [
    "Bugun nimadan boshlayman?",
    "Transformer attention mexanizmini sodda tushuntir",
    "Sentiment analyzer loyihasiga reja ber",
    "Hw 4 uchun baholash mezonini ko'rsat",
  ],
  teacher: [
    "Bugungi tekshirish navbatini tartibla",
    "Risk signalidagi tinglovchilarga yumshoq xabar yoz",
    "Lab 4 rubricasini qisqa ko'rinishga keltir",
    "Davomat 80% dan pastlar bilan ishlash rejasi",
  ],
  admin: [
    "SI baholash siyosatini tekshir",
    "Audit logda yuqori xavfli eventlarni izohla",
    "Sertifikat qoidalarini tartibla",
    "NPS past bo'lgan kurslar uchun choralar",
  ],
  super_admin: [
    "Platforma auditida yuqori xavfli eventlarni ajrat",
    "Rollar va ruxsatlar bo'yicha tekshiruv rejasi ber",
    "SI boshqaruvi siyosatini qisqa xulosa qil",
    "O'quv oqimlari bo'yicha strategik hisobot tayyorla",
  ],
} satisfies Record<LmsRole, string[]>

const roleCopy = {
  student: {
    name: "AIRI Tutor",
    sub: "Shaxsiy o'quv yordamchi",
    color: "#1f6feb",
    hello: "Kurs, dars, topshiriq va reja bo'yicha qisqa maslahat beraman. Jonli LMS ma'lumotlarini o'zgartirmayman.",
  },
  teacher: {
    name: "AIRI Coach",
    sub: "Trener uchun operatsion yordamchi",
    color: "#7c3aed",
    hello: "Tekshirish, davomat, risk signali va rubric bo'yicha tavsiya beraman. Yakuniy qaror trenerda qoladi.",
  },
  admin: {
    name: "AIRI Governance",
    sub: "Siyosat va audit yordamchisi",
    color: "#0c1733",
    hello: "SI siyosati, audit, access va moderatsiya bo'yicha nazoratga mos tavsiya beraman.",
  },
  super_admin: {
    name: "AIRI Command",
    sub: "Platforma boshqaruvi yordamchisi",
    color: "#991b1b",
    hello: "Rollar, audit, SI governance va platforma sozlamalari bo'yicha strategik tavsiya beraman.",
  },
} satisfies Record<LmsRole, { name: string; sub: string; color: string; hello: string }>

function makeReply(role: LmsRole, text: string) {
  if (role === "student") {
    return `Qisqa reja: avval joriy darsni 26 daqiqada tugating, keyin Hw 4 uchun materiallarni oching. "${text}" bo'yicha eng muhim qadam: tushunmagan joyingizni bitta aniq savolga aylantiring va Q&A ga yozing.`
  }

  if (role === "teacher") {
    return `Operatsion taklif: "${text}" uchun avval yuqori muddatli ishlarni ajrating, keyin SI tavsiyasini rubric dalillari bilan solishtiring. Shubhali holatda "revision so'rash" xavfsizroq oqim bo'ladi.`
  }

  return `Governance tavsiyasi: "${text}" bo'yicha har bir o'zgarish versiyalanishi, audit logga tushishi va inson nazoratidan o'tishi kerak. Xavf yuqori bo'lsa, reviewer rolini jalb qiling.`
}

function readStoredMessages(role: LmsRole) {
  try {
    const raw = window.localStorage.getItem(`airi-chat-${role}`)
    return raw ? (JSON.parse(raw) as Message[]) : []
  } catch {
    return []
  }
}

type AIChatWidgetProps = {
  role: LmsRole
}

export function AIChatWidget({ role }: AIChatWidgetProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => readStoredMessages(role))
  const [input, setInput] = useState("")
  const scrollerRef = useRef<HTMLDivElement>(null)
  const copy = roleCopy[role]

  useEffect(() => {
    window.localStorage.setItem(`airi-chat-${role}`, JSON.stringify(messages))
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
  }, [messages, role])

  const starter = useMemo(() => suggestions[role], [role])

  const send = (value?: string) => {
    const content = (value ?? input).trim()
    if (!content) return

    const userMessage: Message = { role: "user", content }
    const assistantMessage: Message = { role: "assistant", content: makeReply(role, content) }
    setMessages((current) => current.concat(userMessage, assistantMessage))
    setInput("")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="SI yordamchi"
        style={{
          position: "fixed",
          right: 22,
          bottom: 22,
          zIndex: 50,
          width: 56,
          height: 56,
          borderRadius: 999,
          border: 0,
          cursor: "pointer",
          background: `linear-gradient(135deg, ${copy.color}, #1d4ed8)`,
          color: "#fff",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 16px 40px rgba(31,111,235,0.45), 0 4px 14px rgba(15,23,42,0.18)",
          transform: open ? "scale(0.92)" : "scale(1)",
          transition: "transform 0.2s",
        }}
      >
        <Icon name={open ? "x" : "sparkles"} style={{ fontSize: 26 }} />
      </button>

      {open ? (
        <div
          style={{
            position: "fixed",
            right: 22,
            bottom: 92,
            zIndex: 50,
            width: "min(420px, calc(100vw - 44px))",
            height: "min(620px, calc(100vh - 140px))",
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 24px 60px rgba(15,23,42,0.24), 0 4px 14px rgba(15,23,42,0.08)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: 16,
              background: `linear-gradient(135deg, ${copy.color} 0%, #1e3a8a 100%)`,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.18)",
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Icon name="sparkles" style={{ fontSize: 18 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)" }}>{copy.name}</div>
              <div style={{ fontSize: 11.5, opacity: 0.82 }}>{copy.sub}</div>
            </div>
            <button
              type="button"
              onClick={() => setMessages([])}
              title="Yangi suhbat"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: 0, padding: 6, borderRadius: 7, cursor: "pointer" }}
            >
              <Icon name="refresh" style={{ fontSize: 14 }} />
            </button>
          </div>

          <div ref={scrollerRef} style={{ flex: 1, padding: 16, overflowY: "auto", background: "var(--bg)" }}>
            {messages.length === 0 ? (
              <>
                <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Salom!</div>
                  <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.5 }}>{copy.hello}</div>
                </div>
                <div style={{ fontSize: 11, color: "#8a93a6", fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase", marginBottom: 8 }}>
                  Boshlash uchun
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {starter.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => send(item)}
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "#fff",
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                        fontSize: 12.5,
                        color: "#475569",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Icon name="arrow-up-right" style={{ color: "#8a93a6" }} />
                      {item}
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 12,
                  flexDirection: message.role === "user" ? "row-reverse" : "row",
                }}
              >
                {message.role === "assistant" ? (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 999,
                      background: `linear-gradient(135deg, ${copy.color}, #1d4ed8)`,
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="sparkles" style={{ fontSize: 14 }} />
                  </div>
                ) : null}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: message.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: message.role === "user" ? "var(--accent)" : "#fff",
                    color: message.role === "user" ? "#fff" : "#0f172a",
                    border: message.role === "user" ? "1px solid var(--accent-2)" : "1px solid var(--border)",
                    fontSize: 13,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 12, borderTop: "1px solid var(--border)", background: "#fff" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                border: "1px solid var(--border2)",
                borderRadius: 12,
                padding: 8,
                background: "var(--bg4)",
              }}
            >
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    send()
                  }
                }}
                placeholder={role === "student" ? "Savol bering yoki mavzuni so'rang" : role === "teacher" ? "Operatsion savol bering" : "Politika yoki audit bo'yicha yozing"}
                rows={1}
                style={{
                  flex: 1,
                  resize: "none",
                  border: 0,
                  outline: "none",
                  background: "transparent",
                  fontFamily: "var(--font)",
                  fontSize: 13,
                  color: "#0f172a",
                  padding: "4px 6px",
                  minHeight: 22,
                  maxHeight: 120,
                }}
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={!input.trim()}
                style={{
                  border: 0,
                  cursor: input.trim() ? "pointer" : "default",
                  background: input.trim() ? `linear-gradient(135deg, ${copy.color}, #1d4ed8)` : "var(--bg3)",
                  color: input.trim() ? "#fff" : "var(--text3)",
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="send" style={{ fontSize: 15 }} />
              </button>
            </div>
            <div style={{ fontSize: 10.5, color: "#b0b7c5", marginTop: 6, textAlign: "center" }}>
              SI taklif beradi, yakuniy qaror va mas'uliyat inson nazoratida qoladi.
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
