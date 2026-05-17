import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Avatar, Btn, Card, Check, Chip, Icon, Pill, Seg, Tabs, Toolbar,
} from "@/components/dashboard/LmsPrimitives"
import { SUBMISSIONS } from "@/data/lmsData"

const SUB_TYPE_ICON: Record<string, string> = {
  assignment: "file-text",
  project:    "package",
  quiz:       "list-check",
  lab:        "flask",
}

export function TeacherGrading() {
  const [tab, setTab] = useState("needs")
  const [sel, setSel] = useState<Record<number, boolean>>({})

  const visible = SUBMISSIONS.filter((s) => {
    if (tab === "needs")  return s.state === "needs-grade"
    if (tab === "ai")     return s.state === "ai-flag"
    if (tab === "appeal") return s.state === "appeal"
    if (tab === "auto")   return s.state === "auto-graded"
    return true
  })

  const selCount = Object.values(sel).filter(Boolean).length
  const allSelected = visible.length > 0 && selCount === visible.length

  return (
    <>
      <div className="alert blue" style={{ marginBottom: 18 }}>
        <Icon name="sparkles" />
        <div className="body">
          <h4>AI yordami yoqilgan</h4>
          <p>
            AI rubric-based taklif beradi, lekin yakuniy baho doim sizda. Har bir AI tahlilning
            versiyasi va promptlari audit jurnalida saqlanadi.
          </p>
        </div>
        <Btn size="sm" leftIcon="settings">AI sozlamalari</Btn>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: "needs",  label: "Tekshirilishi kerak", icon: "file-check",   count: SUBMISSIONS.filter((s) => s.state === "needs-grade").length },
          { value: "ai",     label: "AI shubhalari",       icon: "flag",          count: SUBMISSIONS.filter((s) => s.state === "ai-flag").length },
          { value: "appeal", label: "Apellatsiyalar",       icon: "gavel",         count: SUBMISSIONS.filter((s) => s.state === "appeal").length },
          { value: "auto",   label: "Avto-baholangan",     icon: "robot",         count: SUBMISSIONS.filter((s) => s.state === "auto-graded").length },
          { value: "all",    label: "Hammasi",                                    count: SUBMISSIONS.length },
        ]}
      />

      <Card>
        <Toolbar>
          <Chip icon="filter">Kurs: 4</Chip>
          <Chip icon="file-text">Turi: Hammasi</Chip>
          <Chip icon="clock">Kechikkan</Chip>
          <Chip icon="sparkles" active>AI taklifi mavjud</Chip>
          <div className="spacer" />
          <span style={{ fontSize: 12, color: "#8a93a6" }}>Saralash:</span>
          <Seg
            value="oldest"
            onChange={() => {}}
            options={[
              { value: "oldest", label: "Eng eski" },
              { value: "newest", label: "Yangi" },
              { value: "risk",   label: "Risk" },
            ]}
          />
        </Toolbar>

        {selCount > 0 && (
          <div className="bulkbar">
            <Icon name="checkbox" /> <b>{selCount}</b> ta tanlandi
            <div className="actions" style={{ display: "flex", gap: 6 }}>
              <Btn size="sm" variant="success" leftIcon="check">AI taklifini qabul qilish</Btn>
              <Btn size="sm" leftIcon="user">Biriktirish</Btn>
              <Btn size="sm" leftIcon="mail">Feedback yuborish</Btn>
              <Btn size="sm" variant="danger" leftIcon="x" onClick={() => setSel({})}>
                Tanlovni tozalash
              </Btn>
            </div>
          </div>
        )}

        <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
          <table className="t">
            <thead>
              <tr>
                <th style={{ width: 32 }}>
                  <Check
                    value={allSelected}
                    onChange={(v) =>
                      setSel(v ? Object.fromEntries(visible.map((_, i) => [i, true])) : {})
                    }
                  />
                </th>
                <th>Talaba</th>
                <th>Topshiriq</th>
                <th>Yuborildi</th>
                <th className="center">Rubric</th>
                <th className="center">AI taklifi</th>
                <th>Holat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((sub, i) => (
                <tr key={sub.id} className={sel[i] ? "selected" : ""}>
                  <td>
                    <Check
                      value={!!sel[i]}
                      onChange={(v) => setSel((p) => ({ ...p, [i]: v }))}
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={sub.student.name} tone={sub.student.tone} size="sm" />
                      <div>
                        <div style={{ fontWeight: 600 }}>{sub.student.name}</div>
                        <div style={{ fontSize: 11, color: "#8a93a6" }}>{sub.student.group}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        className={`thumb ${sub.type === "quiz" ? "quiz" : "doc"}`}
                        style={{ width: 28, height: 28 }}
                      >
                        <Icon name={SUB_TYPE_ICON[sub.type] ?? "file-text"} />
                      </span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{sub.title}</div>
                        <div style={{ fontSize: 11, color: "#8a93a6" }}>
                          {sub.course.split(" ").slice(0, 2).join(" ")} · {sub.files.length} fayl
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 12 }}>{sub.submittedAgo} oldin</div>
                    {sub.late && (
                      <div style={{ marginTop: 2 }}>
                        <Pill tone="red">kechikkan</Pill>
                      </div>
                    )}
                  </td>
                  <td className="center">
                    <span className="mono num" style={{ fontWeight: 700 }}>{sub.rubric}</span>
                    <span style={{ color: "#8a93a6", fontSize: 11 }}>/6 kriteriya</span>
                  </td>
                  <td className="center">
                    {sub.suggestedScore != null ? (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span className="ai-ribbon">
                          <Icon name="sparkles" /> {sub.suggestedScore}/40
                        </span>
                        {sub.state === "ai-flag" && (
                          <Pill tone="red"><Icon name="flag" /></Pill>
                        )}
                      </div>
                    ) : (
                      <span style={{ color: "#b0b7c5" }}>—</span>
                    )}
                  </td>
                  <td>
                    {sub.state === "needs-grade"  && <Pill tone="amber" dot>Kutilmoqda</Pill>}
                    {sub.state === "ai-flag"      && <Pill tone="red"   icon="flag">AI shubha</Pill>}
                    {sub.state === "appeal"       && <Pill tone="purple" icon="gavel">Appeal</Pill>}
                    {sub.state === "auto-graded"  && <Pill tone="green" icon="robot">{sub.points}</Pill>}
                  </td>
                  <td className="right">
                    <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                      <Btn size="xs" variant="ghost" leftIcon="message" />
                      <Link className="btn btn-xs btn-primary" to="/teacher/ai-grading">
                        <Icon name="arrow-right" /> Baholash
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-foot">
          <span>
            {visible.length} / {SUBMISSIONS.length} ko'rsatildi · so'nggi yangilanish: hozir
          </span>
          <div className="cta-row">
            <Btn size="sm" leftIcon="download">CSV eksport</Btn>
          </div>
        </div>
      </Card>
    </>
  )
}
