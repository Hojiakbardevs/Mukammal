(() => {
  (() => {
    const { useState } = React;
    const ME = window.__STU__.ME;
    const MY_COURSES = window.__STU__.MY_COURSES;
    const MY_TASKS = window.__STU__.MY_TASKS;
    const MY_QA_FEED = window.__STU__.MY_QA_FEED;
    const BADGES = window.__STU__.BADGES;
    function StudentDashboard({ setPage }) {
      const continueC = MY_COURSES.find((c) => c.id === "nlp");
      const upcoming = MY_TASKS.filter((t) => t.dueIn > 0).sort((a, b) => a.dueIn - b.dueIn).slice(0, 4);
      const recentGrades = MY_TASKS.filter((t) => t.status === "graded").slice(0, 3);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
        background: "linear-gradient(135deg, #0f1d3a 0%, #1f6feb 70%, #3b82f6 100%)",
        color: "#fff",
        borderRadius: 16,
        padding: 26,
        marginBottom: 18,
        position: "relative",
        overflow: "hidden"
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        opacity: 0.14,
        backgroundImage: "radial-gradient(circle at 84% 24%, #fff 0 2px, transparent 3px), radial-gradient(circle at 16% 64%, #fff 0 1.5px, transparent 2px), radial-gradient(circle at 36% 16%, #fff 0 1.5px, transparent 2px)",
        backgroundSize: "120px 120px"
      } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 30, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, opacity: 0.7, letterSpacing: 0.06, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 } }, "Salom, Aziza! \xB7 ", (/* @__PURE__ */ new Date()).toLocaleDateString("uz-UZ", { weekday: "long", day: "numeric", month: "long" })), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 10 } }, "Davom etish: ", continueC.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, opacity: 0.85, marginBottom: 14 } }, continueC.nextLesson.mod, " \xB7 ", continueC.nextLesson.t, " \xB7 ", continueC.nextLesson.dur), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 8, background: "rgba(255,255,255,0.18)", borderRadius: 999, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: continueC.progress + "%", height: "100%", background: "linear-gradient(90deg, #ffffff, #fde68a)" } })), /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontWeight: 700, fontSize: 13 } }, continueC.progress, "%")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { variant: "primary", leftIcon: "player-play", onClick: () => setPage("s-lesson") }, "Darsni boshlash"), /* @__PURE__ */ React.createElement(Btn, { leftIcon: "list", onClick: () => setPage("s-courses"), style: { background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" } }, "Barcha kurslar"))), /* @__PURE__ */ React.createElement("div", { style: {
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 14,
        padding: 16,
        display: "flex",
        gap: 16,
        alignItems: "center"
      } }, /* @__PURE__ */ React.createElement(
        Donut,
        {
          size: 92,
          stroke: 11,
          value: ME.certificateProgress,
          max: 100,
          tone: "#fbbf24",
          trackTone: "rgba(255,255,255,0.18)",
          center: /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800 } }, ME.certificateProgress, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12 } }, "%")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, opacity: 0.75, letterSpacing: 0.05 } }, "SERTIFIKAT"))
        }
      ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, opacity: 0.8 } }, "AI Track sertifikati"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 5 } }, "2 ta kurs qoldi"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, opacity: 0.75 } }, "NLP \xB7 ML in Production"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 11, opacity: 0.7 } }, /* @__PURE__ */ React.createElement(I, { name: "calendar" }), " Kutilayotgan sana: 12-Iyn 2026"))))), /* @__PURE__ */ React.createElement("div", { className: "stat-grid cols-4", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(Stat, { tone: "blue", label: "Aktiv kurslar", value: ME.enrolled - ME.completed, sub: `${ME.completed} ta tugatildi` }), /* @__PURE__ */ React.createElement(Stat, { tone: "green", label: "O'rtacha baho", value: ME.avgScore, sub: "3 ta aktiv kurs bo'yicha", trend: { dir: "up", label: "+2" } }), /* @__PURE__ */ React.createElement(Stat, { tone: "amber", label: "Streak", value: ME.streak, unit: "kun", sub: "bugun ham darsda bo'lish" }), /* @__PURE__ */ React.createElement(Stat, { tone: "purple", label: "Engagement points", value: ME.points, sub: `Level ${ME.level} \xB7 o'quv oqimi #4` })), /* @__PURE__ */ React.createElement("div", { className: "grid c-8-4" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Mening kurslarim", sub: "\xB7 davom etilayotganlar", actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "arrow-right", onClick: () => setPage("s-courses") }, "Hammasi") }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 18px 18px", display: "grid", gap: 12 } }, MY_COURSES.filter((c) => c.status === "active").map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: {
        display: "grid",
        gridTemplateColumns: "70px 1fr 130px",
        gap: 14,
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--border)"
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        width: 70,
        height: 70,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${c.color === "b1" ? "#6366f1" : c.color === "b2" ? "#0ea5e9" : c.color === "b3" ? "#06b6d4" : "#f97316"}, ${c.color === "b1" ? "#4338ca" : c.color === "b2" ? "#1d4ed8" : c.color === "b3" ? "#0e7490" : "#c2410c"})`,
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 18,
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 6px, transparent 6px 12px), linear-gradient(135deg, ${c.color === "b1" ? "#6366f1" : c.color === "b2" ? "#0ea5e9" : c.color === "b3" ? "#06b6d4" : "#f97316"}, ${c.color === "b1" ? "#4338ca" : c.color === "b2" ? "#1d4ed8" : c.color === "b3" ? "#0e7490" : "#c2410c"})`
      } }, c.title.split(" ").map((w) => w[0]).slice(0, 2).join("")), /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, c.title), /* @__PURE__ */ React.createElement(Pill, { tone: "gray" }, c.track)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginBottom: 6 } }, "Trainer: ", c.teacher, " \xB7 ", c.lessonsDone, "/", c.lessonsTotal, " dars"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement(Bar, { value: c.progress, tone: c.progress > 80 ? "green" : c.progress > 50 ? "blue" : "amber" })), /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontWeight: 700, fontSize: 12 } }, c.progress, "%")), c.deadline && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: c.deadline.days < 5 ? "var(--red)" : "#8a93a6", marginTop: 6 } }, /* @__PURE__ */ React.createElement(I, { name: "clock" }), " Keyingi muddat: ", /* @__PURE__ */ React.createElement("b", null, c.deadline.t), " \xB7 ", c.deadline.days, " kun")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "player-play", onClick: () => setPage("s-lesson") }, "Davom etish")))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Yaqin muddatli topshiriqlar", count: upcoming.length, actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "arrow-right", onClick: () => setPage("s-tasks") }, "Hammasi") }), /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Topshiriq"), /* @__PURE__ */ React.createElement("th", null, "Kurs"), /* @__PURE__ */ React.createElement("th", null, "Turi"), /* @__PURE__ */ React.createElement("th", null, "Ball"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Muddat"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, upcoming.map((t) => /* @__PURE__ */ React.createElement("tr", { key: t.id }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", null, t.title)), /* @__PURE__ */ React.createElement("td", null, t.course), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: t.type === "quiz" ? "teal" : t.type === "project" ? "purple" : "blue" }, t.type)), /* @__PURE__ */ React.createElement("td", { className: "mono num" }, t.points), /* @__PURE__ */ React.createElement("td", { className: "center" }, t.dueIn <= 3 ? /* @__PURE__ */ React.createElement(Pill, { tone: "red", icon: "alarm" }, /* @__PURE__ */ React.createElement("b", null, t.dueIn, " kun")) : /* @__PURE__ */ React.createElement(Pill, { tone: "amber" }, /* @__PURE__ */ React.createElement("b", null, t.dueIn, " kun"))), /* @__PURE__ */ React.createElement("td", { className: "right" }, /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "primary", leftIcon: "arrow-right" }, "Topshirish")))))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Bu hafta jadvalim", actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "calendar", onClick: () => setPage("s-schedule") }, "To'liq jadval") }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 } }, ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"].map((d, i) => {
        const items = window.__STU__.MY_SCHEDULE.filter((e) => e.day === i);
        const today = i === 3;
        return /* @__PURE__ */ React.createElement("div", { key: i, style: {
          padding: 10,
          borderRadius: 10,
          border: today ? "1px solid var(--accent-mid)" : "1px solid var(--border)",
          background: today ? "var(--accent-light)" : "#fff",
          minHeight: 120
        } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: today ? "var(--accent-ink)" : "#8a93a6", fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase", marginBottom: 6 } }, d, " \xB7 ", 12 + i), items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#b0b7c5" } }, "\u2014") : items.map((e, j) => /* @__PURE__ */ React.createElement("div", { key: j, style: {
          fontSize: 11,
          padding: "5px 7px",
          borderRadius: 6,
          background: "#fff",
          border: "1px solid var(--border)",
          marginBottom: 4
        } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: "#0f172a" } }, e.course), /* @__PURE__ */ React.createElement("div", { style: { color: "#8a93a6", marginTop: 2 } }, /* @__PURE__ */ React.createElement(Pill, { tone: e.kind === "lecture" ? "blue" : e.kind === "lab" ? "purple" : e.kind === "live" ? "teal" : e.kind === "exam" ? "red" : "gray" }, e.kind)))));
      })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "So\u2018nggi baholar", actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "arrow-right", onClick: () => setPage("s-grades") }, "Gradebook") }), /* @__PURE__ */ React.createElement("div", { style: { padding: 14 } }, recentGrades.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "10px 4px",
        borderBottom: "1px solid var(--hairline)"
      } }, /* @__PURE__ */ React.createElement("span", { className: `thumb ${t.type === "quiz" ? "quiz" : "doc"}` }, /* @__PURE__ */ React.createElement(I, { name: t.type === "quiz" ? "list-check" : "file-text" })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, t.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", marginTop: 2 } }, t.course, " \xB7 ", t.submittedAt)), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontSize: 14, fontWeight: 800, color: t.score / t.max > 0.9 ? "var(--green)" : "var(--accent)" } }, t.score, /* @__PURE__ */ React.createElement("span", { style: { color: "#b0b7c5", fontSize: 11, fontWeight: 500 } }, "/", t.max)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#8a93a6" } }, Math.round(t.score / t.max * 100), "%")))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Yutuqlar", sub: `\xB7 ${ME.points} points`, actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "arrow-right" }, "Hammasi") }), /* @__PURE__ */ React.createElement("div", { style: { padding: 16, display: "grid", gap: 10 } }, BADGES.slice(0, 4).map((b, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 11 } }, /* @__PURE__ */ React.createElement("span", { className: "thumb", style: {
        background: b.tone === "amber" ? "var(--amber-bg)" : b.tone === "blue" ? "var(--accent-light)" : b.tone === "purple" ? "var(--purple-bg)" : "var(--green-bg)",
        color: b.tone === "amber" ? "var(--amber)" : b.tone === "blue" ? "var(--accent)" : b.tone === "purple" ? "var(--purple)" : "var(--green)",
        width: 36,
        height: 36
      } }, /* @__PURE__ */ React.createElement(I, { name: b.ico, style: { fontSize: 18 } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 12.5 } }, b.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, b.desc))))), /* @__PURE__ */ React.createElement("div", { className: "card-foot" }, /* @__PURE__ */ React.createElement("span", null, "O'quv oqimi reyting"), /* @__PURE__ */ React.createElement(Pill, { tone: "blue" }, "#4 / 71"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Sizning Q&A faolligingiz", actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "message-plus" }, "Savol berish") }), /* @__PURE__ */ React.createElement("div", { style: { padding: 14 } }, MY_QA_FEED.map((q, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: 10, borderRadius: 8, background: q.mine ? "var(--accent-light)" : "#fff", border: "1px solid", borderColor: q.mine ? "var(--accent-mid)" : "var(--hairline)", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginBottom: 4 } }, q.mine ? /* @__PURE__ */ React.createElement(Pill, { tone: "blue" }, "Sizning savolingiz") : /* @__PURE__ */ React.createElement(Pill, { tone: "gray" }, "Kuzatishda"), " \xB7 ", q.course, " \xB7 ", q.age), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 12.5 } }, q.topic), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginTop: 3 } }, q.answer))))), /* @__PURE__ */ React.createElement("div", { className: "alert blue" }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "Murabbiy AI"), /* @__PURE__ */ React.createElement("p", null, "Tushunmagan joyni so'rang \u2014 sizning kursingiz konteksti bilan javob beradi. O'ng pastdagi tugmani bosing."))))));
    }
    function StudentCourses({ setPage }) {
      const [tab, setTab] = useState("active");
      const list = MY_COURSES.filter((c) => tab === "active" ? c.status === "active" : tab === "completed" ? c.status === "completed" : true);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Tabs, { value: tab, onChange: setTab, items: [
        { value: "active", label: "Davom etayotgan", icon: "player-play", count: MY_COURSES.filter((c) => c.status === "active").length },
        { value: "completed", label: "Tugatilgan", icon: "check-circle", count: MY_COURSES.filter((c) => c.status === "completed").length },
        { value: "all", label: "Hammasi", count: MY_COURSES.length }
      ] }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 } }, list.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: {
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "var(--shadow-xs)"
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        height: 140,
        position: "relative",
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 8px, transparent 8px 16px), linear-gradient(135deg, ${c.color === "b1" ? "#6366f1" : c.color === "b2" ? "#0ea5e9" : c.color === "b3" ? "#06b6d4" : c.color === "b7" ? "#10b981" : "#f97316"}, ${c.color === "b1" ? "#4338ca" : c.color === "b2" ? "#1d4ed8" : c.color === "b3" ? "#0e7490" : c.color === "b7" ? "#047857" : "#c2410c"})`,
        color: "#fff"
      } }, c.status === "completed" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, right: 12 } }, /* @__PURE__ */ React.createElement(Pill, { tone: "solid-blue", icon: "award", style: { background: "rgba(0,0,0,0.4)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" } }, "Sertifikat berildi")), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 14, bottom: 12, right: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, opacity: 0.75 } }, c.track), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, lineHeight: 1.2, marginTop: 2 } }, c.title)), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", right: 12, top: 12, fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 700, opacity: 0.18, lineHeight: 1 } }, c.title.split(" ").map((w) => w[0]).join("").slice(0, 3))), /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#475569", marginBottom: 10 } }, /* @__PURE__ */ React.createElement(Avatar, { name: c.teacher, tone: c.color, size: "sm" }), "Trainer: ", /* @__PURE__ */ React.createElement("b", null, c.teacher)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6" } }, "Mening progressim"), /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontWeight: 700 } }, c.progress, "% \xB7 ", /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6" } }, c.lessonsDone, "/", c.lessonsTotal))), /* @__PURE__ */ React.createElement(Bar, { value: c.progress, tone: c.progress === 100 ? "green" : c.progress > 50 ? "blue" : "amber" }), c.nextLesson ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, padding: 12, background: "var(--bg4)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#8a93a6", fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase" } }, "Keyingi dars"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13, marginTop: 3 } }, c.nextLesson.t), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginTop: 1 } }, c.nextLesson.mod, " \xB7 ", c.nextLesson.dur)) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, padding: 12, background: "var(--green-bg)", border: "1px solid var(--green-mid)", borderRadius: 8, fontSize: 12.5, color: "var(--green-ink)", display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(I, { name: "award" }), " Kurs muvaffaqiyatli tugatildi"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 12 } }, c.status === "active" ? /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "player-play", onClick: () => setPage("s-lesson") }, "Davom etish") : /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "award", onClick: () => setPage("s-certs") }, "Sertifikatni ko'rish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "info-circle", onClick: () => setPage("s-course") }, "Tafsilot"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "ghost", leftIcon: "bookmark" })))))));
    }
    window.__PAGES__ = window.__PAGES__ || {};
    Object.assign(window.__PAGES__, {
      "s-dashboard": StudentDashboard,
      "s-courses": StudentCourses
    });
  })();
})();
