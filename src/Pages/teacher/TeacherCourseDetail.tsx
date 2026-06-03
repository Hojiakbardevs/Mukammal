import { useState } from "react"
import {
  Avatar, Bar, Btn, Card, CardHead, Check, Chip, Icon, Modal, Pill, Seg, Tabs, Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { COURSES, STUDENTS } from "@/data/lmsData"

type LessonKind = "vid" | "doc" | "pdf" | "ppt" | "quiz" | "lab" | "asgn" | "exam" | "live"

type Lesson = { t: string; kind: LessonKind; dur: string; done: number }
type Module = { id: string; title: string; status: "published" | "draft" | "scheduled"; lessons: Lesson[] }

const COURSE_MODULES: Module[] = [
  {
    id: "m0", title: "Kursga kirish va sozlash", status: "published", lessons: [
      { t: "Welcome video", kind: "vid", dur: "6 daq", done: 124 },
      { t: "Python muhitini sozlash", kind: "doc", dur: "12 daq", done: 119 },
      { t: "Self-check quiz", kind: "quiz", dur: "10 daq", done: 116 },
    ],
  },
  {
    id: "m1", title: "ML asoslari va matematik tayanch", status: "published", lessons: [
      { t: "Linear algebra recap", kind: "vid", dur: "18 daq", done: 102 },
      { t: "Probability primer (PDF)", kind: "pdf", dur: "20 daq", done: 96 },
      { t: "Practice: NumPy & vectors", kind: "lab", dur: "45 daq", done: 84 },
      { t: "Modul 1 quiz", kind: "quiz", dur: "15 daq", done: 78 },
    ],
  },
  {
    id: "m2", title: "Supervised learning", status: "published", lessons: [
      { t: "Linear regression — nazariya", kind: "vid", dur: "24 daq", done: 72 },
      { t: "Linear regression — lab", kind: "lab", dur: "60 daq", done: 58 },
      { t: "Logistic regression", kind: "vid", dur: "22 daq", done: 51 },
      { t: "Assignment 1 — yuborish", kind: "asgn", dur: "—", done: 49 },
    ],
  },
  {
    id: "m3", title: "Model evaluation va metrics", status: "draft", lessons: [
      { t: "Bias-variance tradeoff", kind: "vid", dur: "18 daq", done: 0 },
      { t: "Confusion matrix (slide)", kind: "ppt", dur: "20 daq", done: 0 },
      { t: "Quiz: to'g'ri metrika tanlash", kind: "quiz", dur: "10 daq", done: 0 },
    ],
  },
  {
    id: "m4", title: "Yakuniy loyihalar va imtihon", status: "scheduled", lessons: [
      { t: "Capstone brief (PDF)", kind: "pdf", dur: "—", done: 0 },
      { t: "Final exam", kind: "exam", dur: "120 daq", done: 0 },
    ],
  },
]

const MATERIALS = [
  { name: "Lecture 1 — slides", ext: "ppt", size: "8.2 MB", date: "12-Yan" },
  { name: "Reading list (week 1)", ext: "pdf", size: "1.1 MB", date: "12-Yan" },
  { name: "Lab 1 starter code",   ext: "zip", size: "240 KB", date: "16-Yan" },
  { name: "Lecture 2 recording",  ext: "vid", size: "412 MB", date: "19-Yan" },
  { name: "Probability primer",   ext: "pdf", size: "2.7 MB", date: "20-Yan" },
  { name: "Office hour notes",    ext: "doc", size: "120 KB", date: "22-Yan" },
  { name: "Rubric — Lab 4",       ext: "pdf", size: "98 KB",  date: "12-May" },
  { name: "External: scikit docs", ext: "url", size: "—",     date: "—" },
]

const LESSON_KIND_ICON: Record<LessonKind, string> = {
  vid: "player-play", doc: "file-text", pdf: "file-text",
  ppt: "presentation", quiz: "list-check", lab: "flask",
  asgn: "file-upload", exam: "test-pipe", live: "broadcast",
}

const LESSON_KIND_CLASS: Record<LessonKind, string> = {
  vid: "vid", doc: "doc", pdf: "pdf", ppt: "ppt",
  quiz: "quiz", lab: "doc", asgn: "doc", exam: "quiz", live: "vid",
}

const EXT_ICON: Record<string, string> = {
  ppt: "presentation", pdf: "file-text", zip: "package",
  vid: "player-play", doc: "file-text", url: "external-link",
}

const course = COURSES[0]

export function TeacherCourseDetail() {
  const [tab, setTab] = useState("modules")
  const [openModule, setOpenModule] = useState("m2")
  const [addLessonOpen, setAddLessonOpen] = useState(false)

  return (
    <>
      {/* ── Gradient header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1f6feb 60%, #3b82f6 100%)",
          color: "#fff",
          borderRadius: 16,
          padding: 22,
          marginBottom: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #fff 0 2px, transparent 3px), radial-gradient(circle at 60% 80%, #fff 0 1.5px, transparent 2px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <span className="pill" style={{ background: "rgba(255,255,255,0.18)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
              <Icon name="circle-dot" /> Published
            </span>
            <span className="pill" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
              Blended · O'quv oqimi asosida
            </span>
            <span style={{ fontSize: 11.5, opacity: 0.7 }}>Course ID · AIF-26B</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>
            {course.title}
          </h2>
          <div style={{ fontSize: 13, opacity: 0.85 }}>
            Spring '26 — O'quv oqimi B · 12-Yan → 30-May · Lead trainer: A. Tursunova
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 18, flexWrap: "wrap" }}>
            {[
              { k: "Talabalar",       v: `${course.studentsActive} / ${course.studentsTotal}`, sub: "faol" },
              { k: "Modullar",        v: String(course.modules), sub: "3 ta draft" },
              { k: "Darslar",         v: String(course.lessons), sub: "12 video · 8 quiz" },
              { k: "Tugatish darajasi", v: `${course.progress}%`, sub: "+4% bu hafta" },
              { k: "AI yordami",      v: "Yoqilgan", sub: "rubric-based" },
            ].map((s) => (
              <div key={s.k}>
                <div style={{ fontSize: 11, opacity: 0.65, textTransform: "uppercase", letterSpacing: 0.08 }}>{s.k}</div>
                <div className="mono num" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{s.v}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{s.sub}</div>
              </div>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "flex-end" }}>
              <Btn size="sm">Preview talaba ko'rinishi</Btn>
              <Btn size="sm" variant="primary" leftIcon="settings">Kurs sozlamalari</Btn>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "modules",   label: "Modullar va darslar", icon: "list",       count: COURSE_MODULES.length },
          { value: "students",  label: "Talabalar",           icon: "users",      count: course.studentsTotal },
          { value: "materials", label: "Materiallar",         icon: "folder",     count: MATERIALS.length },
          { value: "assg",      label: "Vazifalar",           icon: "file-text",  count: 14 },
          { value: "settings",  label: "Sozlamalar",          icon: "settings" },
        ]}
      />

      {/* ── Modules tab ── */}
      {tab === "modules" && (
        <div className="grid c-2">
          <Card>
            <CardHead
              title="Modullar daraxti"
              sub={`· ${COURSE_MODULES.length} modul`}
              actions={
                <>
                  <Btn size="sm" leftIcon="arrows-sort">Tartibni o'zgartirish</Btn>
                  <Btn size="sm" variant="primary" leftIcon="plus">Modul</Btn>
                </>
              }
            />
            <div style={{ padding: 10 }}>
              {COURSE_MODULES.map((m, mi) => (
                <div key={m.id}>
                  <div
                    className={`tree-row ${openModule === m.id ? "active" : ""}`}
                    style={{ fontWeight: 700, cursor: "pointer" }}
                    onClick={() => setOpenModule(openModule === m.id ? "" : m.id)}
                  >
                    <Icon name="grip-vertical" />
                    <Icon name={openModule === m.id ? "chevron-down" : "chevron-right"} />
                    <span className="grow">{mi + 1}. {m.title}</span>
                    <Pill tone={m.status === "published" ? "green" : m.status === "draft" ? "amber" : "blue"}>
                      {m.status}
                    </Pill>
                    <span style={{ fontSize: 11, color: "#8a93a6", marginLeft: 6 }} className="num">
                      {m.lessons.length} dars
                    </span>
                  </div>
                  {openModule === m.id && (
                    <div style={{ paddingLeft: 36 }}>
                      {m.lessons.map((l, li) => (
                        <div key={li} className="tree-row" style={{ padding: "6px 10px" }}>
                          <Icon name="grip-vertical" />
                          <span
                            className={`thumb ${LESSON_KIND_CLASS[l.kind]}`}
                            style={{ width: 26, height: 26, borderRadius: 6 }}
                          >
                            <Icon name={LESSON_KIND_ICON[l.kind]} />
                          </span>
                          <span className="grow">{l.t}</span>
                          <span style={{ fontSize: 11, color: "#8a93a6" }}>{l.dur}</span>
                          {l.done > 0 && (
                            <Pill tone="gray"><Icon name="users" /> {l.done}</Pill>
                          )}
                          <div className="row-act">
                            <Btn size="icon" variant="ghost"><Icon name="edit" /></Btn>
                            <Btn size="icon" variant="ghost"><Icon name="copy" /></Btn>
                            <Btn size="icon" variant="ghost"><Icon name="trash" /></Btn>
                          </div>
                        </div>
                      ))}
                      <div style={{ padding: "8px 10px" }}>
                        <Btn size="sm" leftIcon="plus" onClick={() => setAddLessonOpen(true)}>
                          Dars qo'shish
                        </Btn>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card>
              <CardHead
                title="Modul tafsiloti"
                sub="· Supervised learning"
                actions={<Btn size="sm" leftIcon="edit">Tahrirlash</Btn>}
              />
              <div style={{ padding: 18 }}>
                <dl className="kv-list">
                  <div><dt>Holat</dt><dd><Pill tone="green">published</Pill></dd></div>
                  <div><dt>Boshlash sanasi</dt><dd>12-Fev 2026</dd></div>
                  <div><dt>Tugatish shartlari</dt><dd>Barcha darslar + Quiz ≥ 70%</dd></div>
                  <div><dt>Prerequisite</dt><dd>Modul 1</dd></div>
                  <div><dt>Engagement points</dt><dd>+25</dd></div>
                </dl>
                <div className="row-div" />
                <div style={{ fontSize: 12.5, color: "#475569" }}>
                  Bu modulda 4 ta dars va 1 ta assignment bor. Hozircha <b>58 talaba</b> labni topshirgan,{" "}
                  <b>49 ta</b> assignmentni yuborgan.
                </div>
              </div>
            </Card>

            <Card>
              <CardHead title="Tugatish qoidalari (completion rules)" />
              <div style={{ padding: 18 }}>
                {[
                  { ico: "player-play",  t: "Video lesson",        d: "≥ 85% ko'rilgan yoki teacher tasdig'i" },
                  { ico: "presentation", t: "Prezentatsiya / PDF", d: "Ochilgan + minimal 4 daqiqa + 3 ta check-question" },
                  { ico: "list-check",   t: "Quiz",                d: "Passing score 70% · 3 ta urinish" },
                  { ico: "file-upload",  t: "Assignment",          d: "Yuborilgan + rubric tekshiruvi" },
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", gap: 12, padding: "10px 0",
                      borderBottom: i < 3 ? "1px solid var(--hairline)" : "none",
                    }}
                  >
                    <span className="thumb"><Icon name={r.ico} /></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 12.5 }}>{r.t}</div>
                      <div style={{ fontSize: 11.5, color: "#8a93a6", marginTop: 2 }}>{r.d}</div>
                    </div>
                    <Btn size="sm" variant="ghost" leftIcon="edit" />
                  </div>
                ))}
                <div className="note" style={{ marginTop: 10 }}>
                  Qoidalar kurs darajasida; har bir modul yoki dars uchun override qilish mumkin.
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── Students tab ── */}
      {tab === "students" && (
        <Card>
          <Toolbar>
            <Chip icon="users" active>Hammasi · {course.studentsTotal}</Chip>
            <Chip icon="trending-up">Tugatgan · 14</Chip>
            <Chip icon="alert-triangle">Risk · 6</Chip>
            <Chip icon="minus-circle">Inaktiv · 9</Chip>
            <div className="spacer" />
            <Btn size="sm" leftIcon="download">Eksport</Btn>
            <Btn size="sm" leftIcon="user-plus">Qo'shish</Btn>
          </Toolbar>
          <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
            <table className="t">
              <thead>
                <tr>
                  <th style={{ width: 32 }}></th>
                  <th>Talaba</th>
                  <th>Guruh</th>
                  <th>Progress</th>
                  <th>Davomat</th>
                  <th>Topshiriqlar</th>
                  <th>Joriy baho</th>
                  <th>Risk</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((s, i) => (
                  <tr key={s.name}>
                    <td><Check /></td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={s.name} tone={s.tone} size="sm" />
                        <div>
                          <div style={{ fontWeight: 600 }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: "#8a93a6" }}>id-{1000 + i}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.group}</td>
                    <td style={{ width: 160 }}>
                      <Bar value={s.progress} tone={s.progress > 70 ? "green" : s.progress > 40 ? "blue" : "amber"} />
                      <div style={{ fontSize: 11, color: "#8a93a6", marginTop: 2 }} className="num">{s.progress}%</div>
                    </td>
                    <td className="num">{s.attendance}%</td>
                    <td>
                      <span className="num">{Math.round(s.progress / 100 * 14)}/14</span>
                      {s.late > 0 && <span style={{ marginLeft: 6 }}><Pill tone="amber">{s.late} kech</Pill></span>}
                    </td>
                    <td className="num"><b>{s.gpa}</b></td>
                    <td>
                      <Pill tone={s.risk > 70 ? "red" : s.risk > 40 ? "amber" : "green"}>
                        {s.risk > 70 ? "Yuqori" : s.risk > 40 ? "O'rta" : "Past"} · {s.risk}
                      </Pill>
                    </td>
                    <td className="right">
                      <Btn size="xs" leftIcon="arrow-right">Profil</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── Materials tab ── */}
      {tab === "materials" && (
        <Card>
          <CardHead
            title="Kurs materiallari"
            count={MATERIALS.length}
            actions={
              <>
                <Btn size="sm" leftIcon="folder-plus">Papka</Btn>
                <Btn size="sm" variant="primary" leftIcon="upload">Yuklash</Btn>
              </>
            }
          />
          <div
            style={{
              padding: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {MATERIALS.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: 12, border: "1px solid var(--border)", borderRadius: 10,
                }}
              >
                <span className={`thumb ${f.ext}`}>
                  <Icon name={EXT_ICON[f.ext] ?? "file"} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600, fontSize: 12.5,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}
                  >
                    {f.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#8a93a6" }}>{f.size} · {f.date}</div>
                </div>
                <Icon name="dots" style={{ color: "#8a93a6" }} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Assignments tab ── */}
      {tab === "assg" && (
        <div className="empty">
          <div className="ico"><Icon name="file-text" /></div>
          <h4>Vazifalar paneli</h4>
          <p>Yangi assignment yarating yoki "Tekshirish navbati"ga o'ting.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn leftIcon="plus" variant="primary">Yangi assignment</Btn>
            <Btn leftIcon="file-check">Tekshirish navbati</Btn>
          </div>
        </div>
      )}

      {/* ── Settings tab ── */}
      {tab === "settings" && (
        <div className="grid c-2">
          <Card>
            <CardHead title="Kurs profili" />
            <div style={{ padding: 18 }}>
              <div className="field">
                <label className="label">Kurs nomi</label>
                <input className="input" defaultValue={course.title} />
              </div>
              <div className="field">
                <label className="label">Kurs kodi</label>
                <input className="input mono" defaultValue="AIF-26B" />
              </div>
              <div className="field">
                <label className="label">Qisqa tavsif</label>
                <textarea
                  className="input"
                  rows={3}
                  defaultValue="Sun'iy intellekt asoslari, klassik ML algoritmlari, Python ekosistemasi."
                />
              </div>
              <div className="field">
                <label className="label">Format</label>
                <Seg
                  value="blended"
                  onChange={() => {}}
                  options={[
                    { value: "cohort",     label: "O'quv oqimi", icon: "users" },
                    { value: "self-paced", label: "Self-paced", icon: "user" },
                    { value: "blended",    label: "Blended",    icon: "shuffle" },
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title="Baholash siyosati" />
            <div style={{ padding: 18 }}>
              <div className="note" style={{ marginBottom: 14 }}>
                Super admin tomonidan o'rnatilgan default ko'rsatilgan. Kerak bo'lsa override qiling.
              </div>
              {[
                { k: "Davomat",           v: 10 },
                { k: "Micro-quiz",        v: 20 },
                { k: "Topshiriqlar",      v: 30 },
                { k: "Modul imtihonlari", v: 20 },
                { k: "Yakuniy assessment",v: 20 },
              ].map((r) => (
                <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 160, fontSize: 12.5, color: "#475569" }}>{r.k}</div>
                  <div style={{ flex: 1 }}>
                    <Bar value={r.v} tone="blue" />
                  </div>
                  <input
                    className="input sm mono num"
                    style={{ width: 64 }}
                    defaultValue={String(r.v)}
                  />
                  <span style={{ color: "#8a93a6", fontSize: 12 }}>%</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex", justifyContent: "space-between", marginTop: 14,
                  padding: 10, background: "var(--bg4)", borderRadius: 8,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 12 }}>Jami</span>
                <span className="mono num" style={{ fontWeight: 700, fontSize: 13 }}>100%</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── Add lesson modal ── */}
      <Modal
        open={addLessonOpen}
        onClose={() => setAddLessonOpen(false)}
        title="Yangi dars qo'shish"
        footer={
          <>
            <Btn onClick={() => setAddLessonOpen(false)}>Bekor qilish</Btn>
            <Btn variant="primary" leftIcon="check" onClick={() => setAddLessonOpen(false)}>
              Saqlash va davom etish
            </Btn>
          </>
        }
      >
        <div className="field">
          <label className="label">Dars turi</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { v: "vid",  t: "Video",      i: "player-play" },
              { v: "pdf",  t: "PDF/Article",i: "file-text" },
              { v: "ppt",  t: "Slide",      i: "presentation" },
              { v: "live", t: "Live session",i: "broadcast" },
              { v: "quiz", t: "Quiz",       i: "list-check" },
              { v: "lab",  t: "Lab",        i: "flask" },
              { v: "asgn", t: "Assignment", i: "file-upload" },
              { v: "exam", t: "Exam",       i: "test-pipe" },
            ].map((o) => (
              <button
                key={o.v}
                className="chip"
                style={{ padding: 12, flexDirection: "column", gap: 6, justifyContent: "center" }}
              >
                <Icon name={o.i} style={{ fontSize: 22 }} />
                {o.t}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label className="label">Sarlavha</label>
          <input className="input" placeholder="Masalan: Linear regression — labolatoriya" />
        </div>
        <div className="field" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label className="label">Davomiyligi (daqiqa)</label>
            <input className="input mono num" defaultValue="45" />
          </div>
          <div>
            <label className="label">Tugatish sharti</label>
            <select className="select">
              <option>Default: 85% video / file ochilgan</option>
              <option>Quiz balli ≥ 70%</option>
              <option>Teacher tasdig'i</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  )
}
