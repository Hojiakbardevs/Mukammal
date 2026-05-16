(() => {
  (() => {
    const { useState } = React;
    const ME = window.__STU__.ME;
    const MY_COURSES = window.__STU__.MY_COURSES;
    const MY_TASKS = window.__STU__.MY_TASKS;
    const LESSON = window.__STU__.LESSON;
    function StudentCourse({ setPage }) {
      const c = MY_COURSES[1];
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
        position: "relative",
        marginBottom: 18,
        borderRadius: 16,
        overflow: "hidden",
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 16px), linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)`,
        color: "#fff",
        padding: 26
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        opacity: 0.16,
        backgroundImage: "radial-gradient(circle at 84% 24%, #fff 0 2px, transparent 3px), radial-gradient(circle at 16% 64%, #fff 0 1.5px, transparent 2px)",
        backgroundSize: "120px 120px"
      } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement(Pill, { tone: "solid-blue", style: { background: "rgba(0,0,0,0.32)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" } }, "AI/ML track"), /* @__PURE__ */ React.createElement(Pill, { tone: "solid-blue", style: { background: "rgba(0,0,0,0.32)", color: "#fff", borderColor: "rgba(255,255,255,0.18)" } }, "O'quv oqimi-based \xB7 Spring '26")), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.6px" } }, "Tabiiy tilni qayta ishlash (NLP)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, opacity: 0.88, marginTop: 4 } }, "Trainer: Aziza Tursunova \xB7 20-Yan \u2192 15-May 2026 \xB7 71 talaba"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, display: "flex", gap: 30, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Donut, { size: 88, stroke: 11, value: c.progress, max: 100, tone: "#fde68a", trackTone: "rgba(255,255,255,0.18)", center: /* @__PURE__ */ React.createElement("div", { style: { color: "#fff", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800 } }, c.progress, "%"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, opacity: 0.7 } }, "MENING")) }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, opacity: 0.7, textTransform: "uppercase", letterSpacing: 0.05, fontWeight: 700 } }, "Tugatilgan"), /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 } }, c.lessonsDone, "/", c.lessonsTotal)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, opacity: 0.7, textTransform: "uppercase", letterSpacing: 0.05, fontWeight: 700 } }, "Joriy baho"), /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 } }, "92")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, opacity: 0.7, textTransform: "uppercase", letterSpacing: 0.05, fontWeight: 700 } }, "O'quv oqimi reyting"), /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 } }, "#3 / 71")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, opacity: 0.7, textTransform: "uppercase", letterSpacing: 0.05, fontWeight: 700 } }, "Streak"), /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 } }, "14 kun"))), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto" } }, /* @__PURE__ */ React.createElement(Btn, { variant: "primary", leftIcon: "player-play", onClick: () => setPage("s-lesson") }, "Davom etish"))))), /* @__PURE__ */ React.createElement(Tabs, { value: "modules", onChange: () => {
      }, items: [
        { value: "modules", label: "Modullar", icon: "list-tree" },
        { value: "materials", label: "Materiallar", icon: "folder", count: 41 },
        { value: "qa", label: "Q&A", icon: "message", count: 88 },
        { value: "people", label: "O'quv oqimi", icon: "users", count: 71 },
        { value: "about", label: "Kurs haqida", icon: "info-circle" }
      ] }), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Modullar va darslar", sub: `\xB7 ${c.lessonsDone}/${c.lessonsTotal} tugatildi` }), /* @__PURE__ */ React.createElement("div", { style: { padding: 14 } }, LESSON.modules.map((m, mi) => /* @__PURE__ */ React.createElement("div", { key: m.id, style: { border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: m.state === "lock" ? 0 : 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { className: "thumb", style: {
        background: m.state === "done" ? "var(--green-bg)" : m.state === "current" ? "var(--accent-light)" : "var(--bg3)",
        color: m.state === "done" ? "var(--green)" : m.state === "current" ? "var(--accent)" : "var(--text3)",
        width: 30,
        height: 30
      } }, /* @__PURE__ */ React.createElement(I, { name: m.state === "done" ? "check" : m.state === "current" ? "player-play" : "lock" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, "Modul ", mi + 1, ": ", m.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginTop: 1 } }, m.lessons.length, " dars"))), m.state === "current" && /* @__PURE__ */ React.createElement(Pill, { tone: "blue", dot: true }, "Joriy"), m.state === "done" && /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "Tugatildi"), m.state === "lock" && /* @__PURE__ */ React.createElement(Pill, { tone: "gray", icon: "lock" }, "Avval avvalgisini tugating")), m.state !== "lock" && /* @__PURE__ */ React.createElement("div", { style: { marginLeft: 38 } }, m.lessons.map((l, li) => /* @__PURE__ */ React.createElement("div", { key: li, style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 8px",
        borderRadius: 8,
        cursor: l.state === "lock" ? "default" : "pointer",
        opacity: l.state === "lock" ? 0.6 : 1,
        background: l.state === "current" ? "var(--accent-light)" : "transparent"
      } }, /* @__PURE__ */ React.createElement("span", { className: `thumb ${l.kind === "vid" ? "vid" : l.kind === "pdf" ? "pdf" : l.kind === "quiz" ? "quiz" : l.kind === "asgn" ? "doc" : "doc"}`, style: { width: 26, height: 26 } }, /* @__PURE__ */ React.createElement(I, { name: l.kind === "vid" ? "player-play" : l.kind === "pdf" ? "file-text" : l.kind === "quiz" ? "list-check" : l.kind === "asgn" ? "file-upload" : "file" })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: l.state === "current" ? 700 : 500, fontSize: 12.5 } }, l.t)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#8a93a6" } }, l.dur), l.state === "done" && /* @__PURE__ */ React.createElement(I, { name: "check", style: { color: "var(--green)", fontSize: 16 } }), l.state === "current" && /* @__PURE__ */ React.createElement(I, { name: "player-play", style: { color: "var(--accent)", fontSize: 16 } }), l.state === "lock" && /* @__PURE__ */ React.createElement(I, { name: "lock", style: { color: "var(--text3)", fontSize: 16 } })))))))));
    }
    function StudentLesson({ setPage }) {
      const [tab, setTab] = useState("qa");
      return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "320px 1fr", gap: 14, alignItems: "start" } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { padding: 16, borderBottom: "1px solid var(--hairline)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginBottom: 4 } }, LESSON.course), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, "Modullar")), /* @__PURE__ */ React.createElement("div", { style: { padding: 8, maxHeight: 720, overflowY: "auto" } }, LESSON.modules.map((m, mi) => /* @__PURE__ */ React.createElement("div", { key: m.id, style: { marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", color: m.state === "lock" ? "#b0b7c5" : "#0f172a" } }, /* @__PURE__ */ React.createElement(I, { name: m.state === "done" ? "check" : m.state === "current" ? "chevron-down" : "lock", style: { fontSize: 13, color: m.state === "done" ? "var(--green)" : "var(--text3)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.04 } }, "M", mi + 1, ": ", m.title)), m.state !== "lock" && m.lessons.map((l, li) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: li,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px 7px 26px",
            borderRadius: 7,
            background: l.state === "current" ? "var(--accent-light)" : "transparent",
            cursor: l.state === "lock" ? "default" : "pointer",
            opacity: l.state === "lock" ? 0.55 : 1
          }
        },
        /* @__PURE__ */ React.createElement(
          I,
          {
            name: l.state === "done" ? "circle-check" : l.state === "current" ? "player-play" : l.kind === "quiz" ? "list-check" : l.kind === "vid" ? "player-play" : l.kind === "asgn" ? "file-upload" : "file-text",
            style: { fontSize: 14, color: l.state === "done" ? "var(--green)" : l.state === "current" ? "var(--accent)" : "var(--text3)" }
          }
        ),
        /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: l.state === "current" ? 700 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, l.t)),
        /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, color: "#8a93a6" } }, l.dur)
      ))))), /* @__PURE__ */ React.createElement("div", { className: "card-foot" }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#8a93a6", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.04 } }, "Kurs progress"), /* @__PURE__ */ React.createElement(Bar, { value: 64, tone: "blue" })), /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontWeight: 700 } }, "64%"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(Card, { style: { overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
        aspectRatio: "16 / 9",
        position: "relative",
        background: "radial-gradient(circle at 30% 30%, #1e3a8a 0%, #0c1733 70%)",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        overflow: "hidden"
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        opacity: 0.25,
        backgroundImage: "radial-gradient(circle at 20% 30%, #4f8cff 0 2px, transparent 3px), radial-gradient(circle at 80% 60%, #fbbf24 0 2px, transparent 3px)",
        backgroundSize: "60px 60px"
      } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 40, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, opacity: 0.4 } }, Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
        height: 16,
        borderRadius: 4,
        background: i % 6 === 0 ? "rgba(251,191,36,0.55)" : "rgba(79,140,255,0.45)",
        border: "1px solid rgba(255,255,255,0.18)"
      } }))), /* @__PURE__ */ React.createElement("button", { style: {
        width: 76,
        height: 76,
        borderRadius: "50%",
        border: 0,
        cursor: "pointer",
        background: "rgba(255,255,255,0.92)",
        color: "#0c1733",
        display: "grid",
        placeItems: "center",
        position: "relative",
        zIndex: 2,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)"
      } }, /* @__PURE__ */ React.createElement(I, { name: "player-play", style: { fontSize: 32 } })), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 16, right: 16, bottom: 14, zIndex: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 999, overflow: "hidden", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { width: "38%", height: "100%", background: "#fbbf24" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "rgba(255,255,255,0.85)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center" } }, /* @__PURE__ */ React.createElement(I, { name: "player-skip-back" }), /* @__PURE__ */ React.createElement(I, { name: "player-play", style: { fontSize: 18 } }), /* @__PURE__ */ React.createElement(I, { name: "player-skip-forward" }), /* @__PURE__ */ React.createElement("span", { className: "mono" }, "09:48 / 26:14")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Pill, { tone: "amber" }, "1.25\xD7"), /* @__PURE__ */ React.createElement(I, { name: "captions" }), /* @__PURE__ */ React.createElement(I, { name: "settings" }), /* @__PURE__ */ React.createElement(I, { name: "picture-in-picture" }), /* @__PURE__ */ React.createElement(I, { name: "maximize" }))))), /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6", marginBottom: 2 } }, LESSON.mod, " \xB7 ", LESSON.course), /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 19, fontWeight: 700, letterSpacing: -0.3 } }, LESSON.title), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 8 } }, /* @__PURE__ */ React.createElement(Avatar, { name: LESSON.trainer, tone: "b1", size: "sm" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12 } }, "Trainer: ", /* @__PURE__ */ React.createElement("b", null, LESSON.trainer)), /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6" } }, "\xB7"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#8a93a6" } }, /* @__PURE__ */ React.createElement(I, { name: "clock" }), " ", LESSON.duration))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "bookmark" }, "Belgilab qo'yish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "Materiallar"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "check" }, "Tugatildi \xB7 keyingisi"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: 10, background: "var(--bg4)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement(Bar, { value: 38, tone: "blue", thin: true }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "#475569" } }, "Tugatish: ", /* @__PURE__ */ React.createElement("b", null, "\u226585%"), " ko'rilgan bo'lsa \xB7 siz 38% ni ko'rdingiz")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(Tabs, { value: tab, onChange: setTab, items: [
        { value: "qa", label: "Q&A", icon: "message", count: 24 },
        { value: "comments", label: "Izohlar", icon: "messages", count: 8 },
        { value: "materials", label: "Materiallar", icon: "folder", count: 5 },
        { value: "notes", label: "Mening eslatmalarim", icon: "notes", count: 3 },
        { value: "transcript", label: "Transkript", icon: "blockquote" }
      ] }), tab === "qa" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, padding: 12, border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg4)" } }, /* @__PURE__ */ React.createElement(Avatar, { name: ME.name, tone: ME.tone, size: "sm" }), /* @__PURE__ */ React.createElement("input", { className: "input", placeholder: "Bu dars bo'yicha savol bering\u2026" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "sparkles" }, "AI tutor"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "send" }, "Yuborish")), [
        { who: "Diyora Karimova", tone: "b6", q: "Self-attention bilan cross-attention orasidagi farq nima?", a: "Self-attention bir xil sequence ichida ishlaydi (query, key, value bir manbadan). Cross-attention esa decoder query'lar encoder'ning key/value'larini ko'radi \u2014 masalan, machine translation'da.", trainer: true, votes: 18 },
        { who: "Bobur Yuldashev", tone: "b1", q: "Positional encoding nima uchun kerak?", a: "Transformer parallelda ishlaydi va so'zlar ketma-ketligi haqida implicit ma'lumotga ega emas. Positional encoding pozitsiyani vektorga qo'shadi.", votes: 9 }
      ].map((qa, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { border: "1px solid var(--border)", borderRadius: 10, padding: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Avatar, { name: qa.who, tone: qa.tone, size: "sm" }), /* @__PURE__ */ React.createElement("b", { style: { fontSize: 12.5 } }, qa.who), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#8a93a6" } }, "\xB7 1 kun"), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, color: "#8a93a6", fontSize: 12 } }, /* @__PURE__ */ React.createElement(I, { name: "thumb-up" }), " ", /* @__PURE__ */ React.createElement("span", { className: "num" }, qa.votes))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 8 } }, qa.q), /* @__PURE__ */ React.createElement("div", { style: { padding: 12, background: qa.trainer ? "var(--accent-light)" : "var(--bg4)", borderRadius: 8, fontSize: 12.5, color: "#475569", borderLeft: qa.trainer ? "3px solid var(--accent)" : "3px solid var(--border2)" } }, qa.trainer && /* @__PURE__ */ React.createElement(Pill, { tone: "blue", icon: "chalkboard", style: { marginRight: 6 } }, "Trainer"), qa.a)))), tab === "comments" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gap: 10 } }, [
        { who: "Otabek Rasulov", tone: "b3", t: "08:24 \u2014 bu yerdagi matrix multiplication misolida xato bormi?", time: "2 soat" },
        { who: "Madina Yusupova", tone: "b5", t: "Linear projection diagrammasi juda yaxshi ishlab chiqilgan rahmat!", time: "5 soat" },
        { who: "Aziza Mahmudova", tone: "b8", t: "Eslatma: 12:30 dan boshlab keyingi marta qaytishim kerak.", time: "1 kun", mine: true }
      ].map((c, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, padding: 10, borderRadius: 8, background: c.mine ? "var(--accent-light)" : "transparent" } }, /* @__PURE__ */ React.createElement(Avatar, { name: c.who, tone: c.tone, size: "sm" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, marginBottom: 2 } }, /* @__PURE__ */ React.createElement("b", null, c.who), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6" } }, "\xB7 ", c.time)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "#475569" } }, c.t))))), tab === "materials" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gap: 8 } }, [
        { name: "Lecture 5 \u2014 slides (Transformer architecture)", ext: "ppt", size: "6.4 MB" },
        { name: "Attention Is All You Need (Vaswani et al, 2017)", ext: "pdf", size: "2.1 MB" },
        { name: "Code samples \u2014 multi-head attention", ext: "zip", size: "180 KB" },
        { name: "External: Illustrated Transformer (Jay Alammar)", ext: "url", size: "\u2014" },
        { name: "Self-attention worksheet (printable)", ext: "pdf", size: "420 KB" }
      ].map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid var(--border)", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("span", { className: `thumb ${f.ext}` }, /* @__PURE__ */ React.createElement(I, { name: f.ext === "pdf" ? "file-text" : f.ext === "ppt" ? "presentation" : f.ext === "zip" ? "package" : f.ext === "url" ? "external-link" : "file" })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 12.5 } }, f.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, f.size)), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "Yuklab olish")))), tab === "notes" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("textarea", { className: "input", rows: 4, placeholder: "Bu dars uchun shaxsiy eslatma yozing\u2026 (faqat siz ko'rasiz)", defaultValue: "Q: positional encoding sin/cos varianti vs learned variant \u2013 qachon birini, qachon ikkinchisini tanlash? \u2014 keyin teacherdan so\u2018rash." }), /* @__PURE__ */ React.createElement(Btn, { variant: "primary", size: "sm", leftIcon: "check", style: { marginTop: 8 } }, "Saqlash"), /* @__PURE__ */ React.createElement("div", { className: "row-div" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#8a93a6", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.05 } }, "Oldingi eslatmalar"), /* @__PURE__ */ React.createElement("div", { style: { padding: 12, background: "var(--bg4)", borderRadius: 8, fontSize: 12, color: "#475569", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#8a93a6", marginBottom: 4 } }, "04:12 \xB7 Modul 5 \xB7 Dars 2 \u2014 Positional encoding"), "Cosine pattern uzunroq sequenceda yaxshi extrapolate qiladi \u2014 eslab qolish.")), tab === "transcript" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18, maxHeight: 360, overflowY: "auto", fontFamily: "Georgia, serif", fontSize: 13.5, lineHeight: 1.7, color: "#475569" } }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", { className: "mono num", style: { color: "#8a93a6", fontFamily: "var(--mono)", fontSize: 11 } }, "[00:00]"), " Salom, NLP kursining 5-modulidagi 3-darsiga xush kelibsiz. Bugun biz transformerlar va attention mexanizmi haqida gaplashamiz\u2026"), /* @__PURE__ */ React.createElement("p", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("b", { className: "mono num", style: { color: "#8a93a6", fontFamily: "var(--mono)", fontSize: 11 } }, "[01:32]"), " Avval, \u201Cattention\u201D degan tushuncha haqida qisqacha tushuntirib o'tishni xohlayman. Tasavvur qiling, siz uzun matnni o'qiyapsiz va undagi ma'lum so'zlarga ko'proq e'tibor qaratasiz\u2026"), /* @__PURE__ */ React.createElement("p", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("b", { className: "mono num", style: { color: "#8a93a6", fontFamily: "var(--mono)", fontSize: 11 } }, "[04:18]"), " Self-attention'da har bir token uchta vektorga aylanadi: query, key va value. Matematik ifoda quyidagicha\u2026")))));
    }
    window.__PAGES__ = window.__PAGES__ || {};
    Object.assign(window.__PAGES__, {
      "s-course": StudentCourse,
      "s-lesson": StudentLesson
    });
  })();
})();
