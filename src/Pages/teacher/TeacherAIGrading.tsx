import { useState } from "react"
import { Avatar, Btn, Card, CardHead, Donut, Icon, Pill, Seg } from "@/components/dashboard/LmsPrimitives"
import { STUDENTS } from "@/data/lmsData"

const RUBRIC = [
  { k: "Muammo tushunchasi",          w: 5, ai: 4, evidence: "Talaba muammoni aniq ifodalagan, hypothesis to'g'ri yozilgan." },
  { k: "Ma'lumotlar tayyorlash",       w: 8, ai: 6, evidence: "Null qiymatlar qisman ko'rib chiqilgan; outlier larni handle qilmagan." },
  { k: "Model tanlovi va asoslash",    w: 8, ai: 7, evidence: "Linear regression to'g'ri tanlangan; alternativlar ham muhokama qilingan." },
  { k: "Baholash metrikalari",         w: 7, ai: 5, evidence: "RMSE hisoblangan; R² mavjud emas, cross-validation qilinmagan." },
  { k: "Kod sifati va izohlar",        w: 6, ai: 6, evidence: "Toza, modular kod. PEP8 ga mos." },
  { k: "Xulosa va keyingi qadamlar",   w: 6, ai: 4, evidence: "Xulosa qisqa, kelajakdagi tahlil yo'nalishlari yo'q." },
]

const student = STUDENTS[6]

export function TeacherAIGrading() {
  const aiTotal = RUBRIC.reduce((a, r) => a + r.ai, 0)
  const maxTotal = RUBRIC.reduce((a, r) => a + r.w, 0)

  const [scores, setScores] = useState(RUBRIC.map((r) => r.ai))
  const [comment, setComment] = useState(
    "Umuman olganda yaxshi tahlil. Model tanlovi va kod toza. Lekin baholash bosqichida cross-validation va R² qo'shing — bu modulda biz buni alohida vurg'ulagan edik. Outlier'larni handle qilish bo'yicha keyingi labda ishlaymiz.",
  )
  const [previewTab, setPreviewTab] = useState("report")

  const total = scores.reduce((a, n) => a + n, 0)
  const overridden = Math.abs(total - aiTotal)
  const isPassing = total >= Math.round(maxTotal * 0.6)

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, alignItems: "stretch", minHeight: 700 }}>
      {/* ── LEFT: Submission preview ── */}
      <Card style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 16, borderBottom: "1px solid var(--hairline)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={student.name} tone={student.tone} size="lg" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>
                {student.name} · {student.group}
              </div>
              <div style={{ fontSize: 11.5, color: "#8a93a6" }}>
                Term loyiha — Sentiment analyzer · Sun'iy intellekt asoslari — NLP track
              </div>
            </div>
            <Pill tone="amber" dot>Kutilmoqda</Pill>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <Pill tone="gray" icon="package">repo.zip · 4.2 MB</Pill>
            <Pill tone="gray" icon="player-play">demo.mp4 · 32 MB</Pill>
            <Pill tone="gray" icon="file-text">report.pdf · 1.1 MB</Pill>
            <Pill tone="red" icon="clock">2 soat oldin</Pill>
          </div>
        </div>

        <div style={{ flex: 1, padding: 18, background: "var(--bg4)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
            <Seg
              value={previewTab}
              onChange={setPreviewTab}
              options={[
                { value: "report", label: "Hisobot (PDF)", icon: "file-text" },
                { value: "code",   label: "Kod (repo)",    icon: "code" },
                { value: "demo",   label: "Demo video",    icon: "player-play" },
              ]}
            />
            <div className="spacer" />
            <Btn size="sm" leftIcon="external-link">Yangi tabda ochish</Btn>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 28,
              fontFamily: "Georgia, serif",
              minHeight: 360,
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 16, right: 18, fontSize: 11, color: "#b0b7c5" }}>
              1 / 12
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8 }}>
              Sentiment Analyzer — Yakuniy hisobot
            </h2>
            <div style={{ fontSize: 12, color: "#8a93a6", marginBottom: 16 }}>
              {student.name} · {student.group} · 16-May 2026
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font)" }}>
              1. Muammo bayoni
            </h3>
            <p style={{ fontSize: 12.5, color: "#475569", marginBottom: 12 }}>
              Mahalliy e-commerce platformasidan to'plangan o'zbek tilidagi mahsulot izohlarini
              ijobiy/salbiy/neytral toifalarga ajratish vazifasi qo'yildi. Hozirgi yondashuvlar asosan
              inglizcha korpuslarga sozlangan; biz multilingual transformer modelini fine-tune qildik.
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font)" }}>
              2. Ma'lumotlar to'plami
            </h3>
            <p style={{ fontSize: 12.5, color: "#475569", marginBottom: 6 }}>
              14,820 ta izoh to'plandi va qo'lda 7,400 tasi belgilandi (60% train, 20% val, 20% test).
            </p>
            <div
              style={{
                background: "#f3f5fa",
                borderRadius: 8,
                padding: 14,
                fontSize: 11.5,
                color: "#475569",
                fontFamily: "monospace",
              }}
            >
              ijobiy: 3,210 (43.4%)<br />
              neytral: 2,640 (35.7%)<br />
              salbiy: 1,550 (20.9%)
            </div>
            <div
              style={{
                marginTop: 16,
                height: 100,
                borderRadius: 8,
                background: "repeating-linear-gradient(45deg, #eef1f7 0 8px, #f6f8fc 8px 16px)",
                display: "grid",
                placeItems: "center",
                color: "#8a93a6",
                fontSize: 11.5,
                border: "1px dashed var(--border)",
              }}
            >
              [Talabaning hisobotidagi diagramma — class balance bar chart]
            </div>
          </div>
        </div>
      </Card>

      {/* ── RIGHT: AI rubric panel ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <CardHead
            title="AI grading panel"
            sub="· rubric-based · v3.1"
            actions={<Btn size="xs" leftIcon="history">Versiyalar</Btn>}
          />
          <div style={{ padding: 16 }}>
            <div className="note" style={{ marginBottom: 14 }}>
              AI talabaning ishini rubric bo'yicha tahlil qildi va dalil bilan taklif berdi. Yakuniy
              bahoni siz qo'yasiz.
            </div>

            {/* Donut comparison */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0 14px", gap: 22 }}>
              <Donut
                size={108}
                stroke={14}
                value={aiTotal}
                max={maxTotal}
                tone="#7c3aed"
                center={
                  <div style={{ textAlign: "center" }}>
                    <div className="mono num" style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>
                      {aiTotal}
                    </div>
                    <div style={{ fontSize: 10, color: "#8a93a6" }}>AI · /{maxTotal}</div>
                  </div>
                }
              />
              <div style={{ fontSize: 28, color: "#cbd5e1" }}>→</div>
              <Donut
                size={108}
                stroke={14}
                value={total}
                max={maxTotal}
                tone="#1f6feb"
                center={
                  <div style={{ textAlign: "center" }}>
                    <div className="mono num" style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>
                      {total}
                    </div>
                    <div style={{ fontSize: 10, color: "#8a93a6" }}>Siz · /{maxTotal}</div>
                  </div>
                }
              />
            </div>

            {/* Rubric criteria */}
            <div style={{ display: "grid", gap: 10 }}>
              {RUBRIC.map((r, i) => (
                <div
                  key={i}
                  style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700 }}>{r.k}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Pill tone="purple">
                        <Icon name="sparkles" /> AI {r.ai}/{r.w}
                      </Pill>
                      <input
                        type="number"
                        className="input sm mono num"
                        style={{ width: 64 }}
                        value={scores[i]}
                        min={0}
                        max={r.w}
                        onChange={(e) =>
                          setScores((s) =>
                            s.map((x, j) =>
                              j === i ? Math.max(0, Math.min(r.w, Number(e.target.value) || 0)) : x,
                            ),
                          )
                        }
                      />
                      <span style={{ color: "#8a93a6", fontSize: 11 }}>/{r.w}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11.5, color: "#475569" }}>
                    <Icon name="quote" style={{ color: "#94a3b8" }} /> {r.evidence}
                  </div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                    <Btn
                      size="xs"
                      leftIcon="check"
                      onClick={() => setScores((s) => s.map((x, j) => (j === i ? r.ai : x)))}
                    >
                      AI bilan rozi
                    </Btn>
                    <Btn size="xs" variant="ghost" leftIcon="plus-minus">Override</Btn>
                    <Btn size="xs" variant="ghost" leftIcon="message">Izoh</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Feedback textarea */}
        <Card className="card-pad">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
            <div style={{ fontWeight: 700 }}>Feedback talabaga</div>
            <Pill tone="purple"><Icon name="sparkles" /> AI matni yoqilgan</Pill>
          </div>
          <textarea
            className="input"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11.5, color: "#8a93a6" }}>
            <span><Icon name="check" /> Auto-grammar tekshirildi · O'zbek (Latin)</span>
            <span>{comment.length} belgi</span>
          </div>
        </Card>

        {/* Final verdict */}
        <Card className="card-pad" style={{ background: "linear-gradient(180deg, #fff, #f5f9ff)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: "#8a93a6", letterSpacing: 0.05, textTransform: "uppercase", fontWeight: 700 }}>
                Yakuniy taklif
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800 }} className="mono num">
                {total}
                <span style={{ fontSize: 14, color: "#8a93a6", fontWeight: 500 }}>
                  /{maxTotal} · {Math.round((total / maxTotal) * 100)}%
                </span>
              </div>
            </div>
            <Pill tone={isPassing ? "green" : "red"} dot>
              {isPassing ? "Passing" : "Failing"}
            </Pill>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Btn variant="success" leftIcon="check">Tasdiqlash va publish</Btn>
            <Btn leftIcon="device-floppy">Draft sifatida saqlash</Btn>
            <Btn variant="amber" leftIcon="message">Talabaga savol</Btn>
            <Btn variant="danger" leftIcon="flag">Plagiat shubhasi</Btn>
          </div>
          <div className="note" style={{ marginTop: 10 }}>
            Audit: bu baho AI <b>v3.1</b> taklifiga asoslandi, siz{" "}
            <b>{overridden}</b> ball override qildingiz. Mantiq jurnalga yoziladi.
          </div>
        </Card>
      </div>
    </div>
  )
}
