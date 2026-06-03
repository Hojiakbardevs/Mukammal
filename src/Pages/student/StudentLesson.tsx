import { useState } from "react"

import { Avatar, Bar, Btn, Card, Icon, Pill, Tabs } from "@/components/dashboard/LmsPrimitives"
import { LESSON, ME } from "@/data/studentData"

export function StudentLesson() {
  const [tab, setTab] = useState("qa")
  const [note, setNote] = useState("Q: positional encoding sin/cos varianti vs learned variant — qachon birini, qachon ikkinchisini tanlash?")

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 14, alignItems: "start" }}>
      {/* ── CURRICULUM SIDEBAR ── */}
      <Card>
        <div style={{ padding: 16, borderBottom: "1px solid var(--hairline)" }}>
          <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 4 }}>{LESSON.course}</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Modullar</div>
        </div>
        <div style={{ padding: 8, maxHeight: 720, overflowY: "auto" }}>
          {LESSON.modules.map((m, mi) => (
            <div key={m.id} style={{ marginBottom: 6 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 8px",
                color: m.state === "locked" ? "var(--text3)" : "#0f172a",
              }}>
                <Icon
                  name={m.state === "done" ? "check" : m.state === "current" ? "chevron-down" : "lock"}
                  style={{ fontSize: 13, color: m.state === "done" ? "var(--green)" : "var(--text3)" }}
                />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.04 }}>
                  M{mi + 1}: {m.title}
                </span>
              </div>
              {m.state !== "locked" && m.lessons.map((l, li) => (
                <div key={li} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "7px 10px 7px 26px", borderRadius: 7,
                  background: l.state === "current" ? "var(--accent-light)" : "transparent",
                  cursor: l.state === "locked" ? "default" : "pointer",
                  opacity: l.state === "locked" ? 0.5 : 1,
                }}>
                  <Icon
                    name={l.state === "done" ? "circle-check" : l.state === "current" ? "player-play" : l.kind === "quiz" ? "list-check" : l.kind === "video" ? "player-play" : l.kind === "assignment" ? "file-upload" : "file-text"}
                    style={{ fontSize: 14, color: l.state === "done" ? "var(--green)" : l.state === "current" ? "var(--accent)" : "var(--text3)" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: l.state === "current" ? 700 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.title}</div>
                  </div>
                  <span style={{ fontSize: 10.5, color: "var(--text3)" }}>{l.duration}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="card-foot">
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, color: "var(--text3)", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.04, marginBottom: 4 }}>Kurs progress</div>
            <Bar value={64} tone="blue" />
          </div>
          <span className="num" style={{ fontWeight: 700 }}>64%</span>
        </div>
      </Card>

      {/* ── PLAYER + TABS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Video player */}
        <Card style={{ overflow: "hidden" }}>
          {/* Player area */}
          <div style={{
            aspectRatio: "16 / 9", position: "relative",
            background: "radial-gradient(circle at 30% 30%, #1e3a8a 0%, #0c1733 70%)",
            display: "grid", placeItems: "center", color: "#fff", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.22,
              backgroundImage: "radial-gradient(circle at 20% 30%, #4f8cff 0 2px, transparent 3px), radial-gradient(circle at 80% 60%, #fbbf24 0 2px, transparent 3px)",
              backgroundSize: "60px 60px",
            }} />
            {/* Fake arch overlay */}
            <div style={{ position: "absolute", inset: 40, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, opacity: 0.35 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{
                  height: 14, borderRadius: 3,
                  background: i % 6 === 0 ? "rgba(251,191,36,0.6)" : "rgba(79,140,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }} />
              ))}
            </div>
            <button style={{
              width: 76, height: 76, borderRadius: "50%", border: 0, cursor: "pointer",
              background: "rgba(255,255,255,0.92)", color: "#0c1733",
              display: "grid", placeItems: "center", position: "relative", zIndex: 2,
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
            }}>
              <Icon name="player-play" style={{ fontSize: 32 }} />
            </button>
            {/* Controls */}
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, zIndex: 2 }}>
              <div style={{ height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
                <div style={{ width: "38%", height: "100%", background: "#fbbf24" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "rgba(255,255,255,0.85)" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Icon name="player-skip-back" />
                  <Icon name="player-play" style={{ fontSize: 18 }} />
                  <Icon name="player-skip-forward" />
                  <span className="num">09:48 / 26:14</span>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <Pill tone="amber">1.25×</Pill>
                  <Icon name="captions" />
                  <Icon name="settings" />
                  <Icon name="maximize" />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson info */}
          <div style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11.5, color: "var(--text3)", marginBottom: 2 }}>{LESSON.module} · {LESSON.course}</div>
                <h2 style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.3 }}>{LESSON.title}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                  <Avatar name={LESSON.trainer} tone="b1" size="sm" />
                  <span style={{ fontSize: 12 }}>Trener: <b>{LESSON.trainer}</b></span>
                  <span style={{ color: "var(--text3)" }}>·</span>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}><Icon name="clock" /> {LESSON.duration}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <Btn size="sm" leftIcon="bookmark">Belgilab qo'yish</Btn>
                <Btn size="sm" leftIcon="download">Materiallar</Btn>
                <Btn size="sm" variant="primary" leftIcon="check">Tugatildi · keyingisi</Btn>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: 10, background: "var(--bg4)", borderRadius: 8 }}>
              <Bar value={38} tone="blue" thin />
              <span style={{ fontSize: 11.5, color: "var(--text2)", flexShrink: 0 }}>
                Tugatish: <b>≥85%</b> ko'rilgan bo'lsa · siz 38% ni ko'rdingiz
              </span>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Card>
          <Tabs value={tab} onChange={setTab} items={[
            { value: "qa",        label: "Q&A",                 icon: "message",   count: 24 },
            { value: "comments",  label: "Izohlar",             icon: "messages",  count: 8 },
            { value: "materials", label: "Materiallar",         icon: "folder",    count: 5 },
            { value: "notes",     label: "Mening eslatmalarim", icon: "notes",     count: 3 },
            { value: "transcript",label: "Transkript",          icon: "blockquote" },
          ]} />

          {/* Q&A */}
          {tab === "qa" && (
            <div style={{ padding: 18, display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, padding: 12, border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg4)" }}>
                <Avatar name={ME.name} tone={ME.tone} size="sm" />
                <input className="input" style={{ flex: 1 }} placeholder="Bu dars bo'yicha savol bering…" />
                <Btn size="sm" leftIcon="sparkles">AI tutor</Btn>
                <Btn size="sm" variant="primary" leftIcon="send">Yuborish</Btn>
              </div>
              {[
                { who: "Diyora Karimova", tone: "b6", q: "Self-attention bilan cross-attention orasidagi farq nima?", a: "Self-attention bir xil sequence ichida ishlaydi (query, key, value bir manbadan). Cross-attention esa decoder query'lar encoder'ning key/value'larini ko'radi.", trainer: true, votes: 18 },
                { who: "Bobur Yuldashev", tone: "b1", q: "Positional encoding nima uchun kerak?", a: "Transformer parallelda ishlaydi va so'zlar ketma-ketligi haqida implicit ma'lumotga ega emas. Positional encoding pozitsiyani vektorga qo'shadi.", trainer: false, votes: 9 },
              ].map((qa, i) => (
                <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <Avatar name={qa.who} tone={qa.tone as "b6" | "b1"} size="sm" />
                    <b style={{ fontSize: 12.5 }}>{qa.who}</b>
                    <span style={{ fontSize: 11, color: "var(--text3)" }}>· 1 kun</span>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, color: "var(--text3)", fontSize: 12 }}>
                      <Icon name="thumb-up" /> <span className="num">{qa.votes}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{qa.q}</div>
                  <div style={{
                    padding: 12, borderRadius: 8, fontSize: 12.5, color: "var(--text2)",
                    background: qa.trainer ? "var(--accent-light)" : "var(--bg4)",
                    borderLeft: `3px solid ${qa.trainer ? "var(--accent)" : "var(--border2)"}`,
                  }}>
                    {qa.trainer && <span style={{ marginRight: 6 }}><Pill tone="blue" icon="chalkboard">Trener</Pill></span>}
                    {qa.a}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comments */}
          {tab === "comments" && (
            <div style={{ padding: 18, display: "grid", gap: 10 }}>
              {[
                { who: "Otabek Rasulov",  tone: "b3", t: "08:24 — bu yerdagi matrix multiplication misolida xato bormi?", time: "2 soat" },
                { who: "Madina Yusupova", tone: "b5", t: "Linear projection diagrammasi juda yaxshi ishlab chiqilgan, rahmat!", time: "5 soat" },
                { who: "Aziza Mahmudova", tone: "b8", t: "Eslatma: 12:30 dan boshlab keyingi safar qaytib ko'rishim kerak.", time: "1 kun", mine: true },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: 10, borderRadius: 8, background: (c as { mine?: boolean }).mine ? "var(--accent-light)" : "transparent" }}>
                  <Avatar name={c.who} tone={c.tone as "b3" | "b5" | "b8"} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11.5, marginBottom: 2 }}><b>{c.who}</b> <span style={{ color: "var(--text3)" }}>· {c.time}</span></div>
                    <div style={{ fontSize: 12.5, color: "var(--text2)" }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Materials */}
          {tab === "materials" && (
            <div style={{ padding: 18, display: "grid", gap: 8 }}>
              {[
                { name: "Lecture 5 – slides (Transformer architecture)", ext: "ppt", size: "6.4 MB" },
                { name: "Attention Is All You Need (Vaswani et al, 2017)", ext: "pdf", size: "2.1 MB" },
                { name: "Code samples – multi-head attention", ext: "zip", size: "180 KB" },
                { name: "External: Illustrated Transformer (Jay Alammar)", ext: "url", size: "—" },
                { name: "Self-attention worksheet (printable)", ext: "pdf", size: "420 KB" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid var(--border)", borderRadius: 10 }}>
                  <span className={`thumb ${f.ext === "pdf" ? "pdf" : f.ext === "ppt" ? "ppt" : f.ext === "zip" ? "zip" : "doc"}`}>
                    <Icon name={f.ext === "pdf" ? "file-text" : f.ext === "ppt" ? "presentation" : f.ext === "zip" ? "package" : f.ext === "url" ? "external-link" : "file"} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12.5 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{f.size}</div>
                  </div>
                  <Btn size="sm" leftIcon="download">Yuklab olish</Btn>
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {tab === "notes" && (
            <div style={{ padding: 18 }}>
              <textarea
                className="input"
                rows={4}
                placeholder="Bu dars uchun shaxsiy eslatma yozing… (faqat siz ko'rasiz)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Btn variant="primary" size="sm" leftIcon="check" style={{ marginTop: 8 }}>Saqlash</Btn>
              <div className="row-div" />
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.05 }}>
                Oldingi eslatmalar
              </div>
              <div style={{ padding: 12, background: "var(--bg4)", borderRadius: 8, fontSize: 12, color: "var(--text2)", marginBottom: 6 }}>
                <div style={{ fontSize: 10.5, color: "var(--text3)", marginBottom: 4 }}>04:12 · Modul 5 · Dars 2 – Positional encoding</div>
                Cosine pattern uzunroq sequenceda yaxshi extrapolate qiladi — eslab qolish.
              </div>
            </div>
          )}

          {/* Transcript */}
          {tab === "transcript" && (
            <div style={{ padding: 18, maxHeight: 360, overflowY: "auto", fontFamily: "Georgia, serif", fontSize: 13.5, lineHeight: 1.7, color: "var(--text2)" }}>
              <p><b className="num" style={{ color: "var(--text3)", fontFamily: "var(--mono)", fontSize: 11 }}>[00:00]</b> Salom, NLP kursining 5-modulidagi 3-darsiga xush kelibsiz. Bugun biz transformerlar va attention mexanizmi haqida gaplashamiz…</p>
              <p style={{ marginTop: 12 }}><b className="num" style={{ color: "var(--text3)", fontFamily: "var(--mono)", fontSize: 11 }}>[01:32]</b> Avval, "attention" degan tushuncha haqida qisqacha tushuntirib o'tishni xohlayman. Tasavvur qiling, siz uzun matnni o'qiyapsiz va undagi ma'lum so'zlarga ko'proq e'tibor qaratasiz…</p>
              <p style={{ marginTop: 12 }}><b className="num" style={{ color: "var(--text3)", fontFamily: "var(--mono)", fontSize: 11 }}>[04:18]</b> Self-attention'da har bir token uchta vektorga aylanadi: query, key va value. Matematik ifoda quyidagicha…</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
