import { useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, Bar, Btn, Card, CardHead, Icon, Pill, Tabs } from "@/components/dashboard/LmsPrimitives"
import { LESSON, ME, MY_QA_FEED } from "@/data/studentData"

const materials = [
  { name: "Transformer attention konspekti", size: "PDF · 1.8 MB", ext: "pdf" },
  { name: "Positional encoding slaydlari", size: "PPT · 4.2 MB", ext: "ppt" },
  { name: "Attention vizual notebook", size: "IPYNB · 860 KB", ext: "doc" },
  { name: "Qo'shimcha maqola va havolalar", size: "URL · 6 link", ext: "url" },
]

export function StudentLesson() {
  const [tab, setTab] = useState("overview")

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{LESSON.title}</h1>
          <p>{LESSON.module} · {LESSON.course} · trener {LESSON.trainer}</p>
        </div>
        <div className="page-actions">
          <Btn leftIcon="bookmark">Belgilash</Btn>
          <Link className="btn btn-primary" to="/app/tasks">
            <Icon name="check" /> Topshiriqqa o'tish
          </Link>
        </div>
      </div>

      <div className="grid c-8-4">
        <div style={{ display: "grid", gap: 14 }}>
          <Card>
            <div style={{ position: "relative", minHeight: 360, borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #0c1733, #1d4ed8)" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.08), transparent 45%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#fff" }}>
                <button type="button" className="btn btn-primary" style={{ borderRadius: 999, padding: "14px 18px" }}>
                  <Icon name="player-play" /> Darsni ijro etish
                </button>
              </div>
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, color: "#fff" }}>
                <Bar value={38} tone="amber" thin />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, fontSize: 12 }}>
                  <span className="mono">09:48 / 26:14</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Pill tone="amber">1.25x</Pill>
                    <Icon name="captions" />
                    <Icon name="settings" />
                    <Icon name="maximize" />
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <Tabs
              value={tab}
              onChange={setTab}
              items={[
                { value: "overview", label: "Umumiy", icon: "info-circle" },
                { value: "materials", label: "Materiallar", icon: "download" },
                { value: "qa", label: "Q&A", icon: "messages", count: MY_QA_FEED.length },
                { value: "task", label: "Topshiriq", icon: "file-check" },
              ]}
            />
            {tab === "overview" ? (
              <div className="card-pad" style={{ display: "grid", gap: 12 }}>
                <div className="alert blue">
                  <Icon name="target-arrow" />
                  <div className="body">
                    <h4>Dars maqsadi</h4>
                    <p>Self-attention tokenlar orasidagi bog'liqlikni qanday vaznlashini tushunish va transformer blokini amaliy misolda ko'rish.</p>
                  </div>
                </div>
                <div className="grid c-3">
                  {["Query, key, value tushunchalari", "Scaled dot-product attention", "Positional encoding roli"].map((item) => (
                    <div key={item} className="note">{item}</div>
                  ))}
                </div>
              </div>
            ) : null}

            {tab === "materials" ? (
              <div className="card-pad" style={{ display: "grid", gap: 10 }}>
                {materials.map((file) => (
                  <div key={file.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid var(--border)", borderRadius: 10 }}>
                    <span className={`thumb ${file.ext}`}>
                      <Icon name={file.ext === "url" ? "external-link" : file.ext === "ppt" ? "presentation" : "file-text"} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{file.name}</div>
                      <div style={{ color: "var(--text3)", fontSize: 12 }}>{file.size}</div>
                    </div>
                    <Btn size="sm" leftIcon="download">Yuklab olish</Btn>
                  </div>
                ))}
              </div>
            ) : null}

            {tab === "qa" ? (
              <div className="card-pad" style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", gap: 10, padding: 12, border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg4)" }}>
                  <Avatar name={ME.name} tone={ME.tone} size="sm" />
                  <input className="input" placeholder="Bu dars bo'yicha savol yozing" />
                  <Btn size="sm" leftIcon="sparkles">SI tutor</Btn>
                  <Btn size="sm" variant="primary" leftIcon="send">Yuborish</Btn>
                </div>
                {MY_QA_FEED.map((item) => (
                  <div key={item.topic} className="alert">
                    <Icon name={item.mine ? "user-question" : "message-check"} />
                    <div className="body">
                      <h4>{item.topic}</h4>
                      <p>{item.answer} · {item.age}</p>
                    </div>
                    <Pill tone={item.mine ? "blue" : "green"}>{item.mine ? "Mening savolim" : "Javoblangan"}</Pill>
                  </div>
                ))}
              </div>
            ) : null}

            {tab === "task" ? (
              <div className="card-pad">
                <div className="alert amber">
                  <Icon name="file-check" />
                  <div className="body">
                    <h4>Hw 4 · embedding probes</h4>
                    <p>Transformer attention natijasini kamida 2 xil matn bilan solishtiring va qisqa xulosa yozing.</p>
                  </div>
                </div>
                <div className="row-div" />
                <Link className="btn btn-primary" to="/app/tasks">
                  <Icon name="arrow-right" /> Topshiriqlar sahifasida ochish
                </Link>
              </div>
            ) : null}
          </Card>
        </div>

        <Card>
          <CardHead title="Darslar ro'yxati" sub={LESSON.module} />
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {LESSON.modules.map((module) => (
              <div key={module.id}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text2)", marginBottom: 6 }}>{module.title}</div>
                <div className="tree">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.title} className={`tree-row ${lesson.state === "current" ? "active" : ""}`}>
                      <Icon name={lesson.state === "locked" ? "lock" : lesson.kind === "quiz" ? "list-check" : "player-play"} />
                      <span className="grow">{lesson.title}</span>
                      <span style={{ color: "var(--text3)", fontSize: 11 }}>{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="row-div" />
            <Link className="btn btn-primary" to="/app/courses/nlp">
              <Icon name="arrow-right" /> Keyingi darsga tayyorlanish
            </Link>
          </div>
        </Card>
      </div>
    </>
  )
}
