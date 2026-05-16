(() => {
  (() => {
    const { useState, useMemo } = React;
    const DATA = window.__DATA__;
    function TeacherSchedule() {
      const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
      const slots = [
        { t: "08:30", e: "10:00" },
        { t: "10:15", e: "11:45" },
        { t: "12:30", e: "14:00" },
        { t: "14:15", e: "15:45" },
        { t: "16:00", e: "17:30" }
      ];
      const items = DATA.SCHEDULE;
      const cellKindStyle = (k) => {
        if (k === "lecture") return { bg: "#eef4ff", brd: "#c2d6ff", txt: "#0a3a8c", label: "Lecture" };
        if (k === "lab") return { bg: "#f5f3ff", brd: "#ddd6fe", txt: "#4c1d95", label: "Lab" };
        if (k === "live") return { bg: "#ecfeff", brd: "#a5f3fc", txt: "#0e7490", label: "Live" };
        if (k === "exam") return { bg: "#fef2f2", brd: "#fecaca", txt: "#7f1d1d", label: "Exam" };
        if (k === "hours") return { bg: "#ecfdf5", brd: "#bbf7d0", txt: "#14532d", label: "Office hrs" };
        return { bg: "#f1f3f8", brd: "#e5e8ef", txt: "#475569", label: k };
      };
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Seg, { value: "week", onChange: () => {
      }, options: [
        { value: "day", label: "Kun", icon: "calendar-event" },
        { value: "week", label: "Hafta", icon: "calendar-week" },
        { value: "month", label: "Oy", icon: "calendar" }
      ] }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "chevron-left" }), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, "12-May \u2192 18-May, 2026"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "chevron-right" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "restore" }, "Bugun"), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement(Chip, { icon: "filter" }, "Kurs: Hammasi"), /* @__PURE__ */ React.createElement(Chip, { icon: "users" }, "Guruh: Hammasi"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "plus" }, "Yangi session")), /* @__PURE__ */ React.createElement(Card, { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "82px repeat(6, 1fr)", borderBottom: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 10px", fontSize: 11, color: "#8a93a6", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.08 } }, "Vaqt"), days.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { padding: "12px 10px", borderLeft: "1px solid var(--hairline)", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#8a93a6", letterSpacing: 0.08, textTransform: "uppercase", fontWeight: 700 } }, d), /* @__PURE__ */ React.createElement("div", { style: {
        fontFamily: "var(--font-display)",
        fontSize: 16,
        fontWeight: 700,
        color: i === 3 ? "var(--accent)" : "#0f172a"
      } }, 12 + i)))), slots.map((sl, si) => /* @__PURE__ */ React.createElement("div", { key: si, style: { display: "grid", gridTemplateColumns: "82px repeat(6, 1fr)", borderBottom: si < slots.length - 1 ? "1px solid var(--hairline)" : "none", minHeight: 72 } }, /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { padding: "10px 10px", fontSize: 11.5, fontWeight: 600, color: "#475569" } }, sl.t, /* @__PURE__ */ React.createElement("div", { style: { color: "#b0b7c5" } }, sl.e)), days.map((_, di) => {
        const item = items.find((it) => it.day === di && it.slot === si);
        if (!item) return /* @__PURE__ */ React.createElement("div", { key: di, style: { borderLeft: "1px solid var(--hairline)" } });
        const st = cellKindStyle(item.kind);
        return /* @__PURE__ */ React.createElement("div", { key: di, style: { borderLeft: "1px solid var(--hairline)", padding: 6 } }, /* @__PURE__ */ React.createElement("div", { style: {
          background: st.bg,
          border: `1px solid ${st.brd}`,
          color: st.txt,
          borderRadius: 8,
          padding: "8px 10px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          cursor: "pointer"
        } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase", opacity: 0.85 } }, st.label), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 12.5, lineHeight: 1.2 } }, item.course), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, opacity: 0.85, display: "flex", gap: 6, alignItems: "center", marginTop: "auto" } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "users" }), " ", item.group), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "map-pin" }), " ", item.room))));
      })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 12 } }, ["lecture", "lab", "live", "exam", "hours"].map((k) => {
        const s = cellKindStyle(k);
        return /* @__PURE__ */ React.createElement("span", { key: k, className: "pill", style: { background: s.bg, color: s.txt, borderColor: s.brd } }, s.label);
      })));
    }
    function TeacherAttendance() {
      const STATES = [
        { v: "p", label: "Keldi", tone: "green", ico: "check" },
        { v: "a", label: "Kelmadi", tone: "red", ico: "x" },
        { v: "l", label: "Kechikkan", tone: "amber", ico: "clock" },
        { v: "e", label: "Sababli", tone: "blue", ico: "file-medical" }
      ];
      const init = DATA.STUDENTS.map((s, i) => ({
        name: s.name,
        group: s.group,
        tone: s.tone,
        s: i === 0 ? "a" : i === 1 ? "l" : i === 6 ? "p" : i === 7 ? "e" : "p"
      }));
      const [rows, setRows] = useState(init);
      const count = STATES.reduce((acc, st) => ({ ...acc, [st.v]: rows.filter((r) => r.s === st.v).length }), {});
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "stat-grid cols-5", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(Stat, { tone: "blue", label: "Talabalar", value: rows.length, sub: "ML-26-2A guruh" }), /* @__PURE__ */ React.createElement(Stat, { tone: "green", label: "Keldi", value: count.p, sub: `${Math.round(count.p / rows.length * 100)}%` }), /* @__PURE__ */ React.createElement(Stat, { tone: "red", label: "Kelmadi", value: count.a, sub: "2 ta yangi" }), /* @__PURE__ */ React.createElement(Stat, { tone: "amber", label: "Kechikkan", value: count.l, sub: "3+ marta = signal" }), /* @__PURE__ */ React.createElement(Stat, { tone: "purple", label: "Sababli", value: count.e, sub: "hujjat yuklangan" })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("select", { className: "select", defaultValue: "ml-26-2a", style: { width: 200 } }, /* @__PURE__ */ React.createElement("option", { value: "ml-26-2a" }, "Guruh: ML-26-2A"), /* @__PURE__ */ React.createElement("option", null, "Guruh: AI-26-1A"), /* @__PURE__ */ React.createElement("option", null, "Guruh: AI-26-1B"), /* @__PURE__ */ React.createElement("option", null, "Guruh: NLP-26")), /* @__PURE__ */ React.createElement("select", { className: "select", style: { width: 240 } }, /* @__PURE__ */ React.createElement("option", null, "Sessiya: 16-May \xB7 10:00 \xB7 Lab"), /* @__PURE__ */ React.createElement("option", null, "Sessiya: 14-May \xB7 10:00 \xB7 Lecture"))), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#8a93a6" } }, "Bulk amallar:"), STATES.map((st) => /* @__PURE__ */ React.createElement(Btn, { key: st.v, size: "sm", leftIcon: st.ico, onClick: () => setRows((rs) => rs.map((r) => ({ ...r, s: st.v }))) }, "Hammasi \u2192 ", st.label)), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "device-floppy" }, "Saqlash")), /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { style: { width: 32 } }), /* @__PURE__ */ React.createElement("th", null, "Talaba"), /* @__PURE__ */ React.createElement("th", null, "Guruh"), /* @__PURE__ */ React.createElement("th", null, "Davomat tarixi"), /* @__PURE__ */ React.createElement("th", { style: { width: 360 }, className: "center" }, "Bugungi holat"), /* @__PURE__ */ React.createElement("th", null, "Izoh"))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((r, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Check, null)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(Avatar, { name: r.name, tone: r.tone, size: "sm" }), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, r.name))), /* @__PURE__ */ React.createElement("td", null, r.group), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3 } }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((d) => {
        const v = (d + i) % 8 === 0 ? "a" : (d + i) % 11 === 0 ? "l" : "p";
        const c = v === "a" ? "#fecaca" : v === "l" ? "#fde68a" : "#bbf7d0";
        return /* @__PURE__ */ React.createElement("span", { key: d, style: { width: 12, height: 12, borderRadius: 3, background: c }, title: v === "a" ? "kelmadi" : v === "l" ? "kechikkan" : "keldi" });
      }))), /* @__PURE__ */ React.createElement("td", { className: "center" }, /* @__PURE__ */ React.createElement("div", { className: "seg", style: { background: "transparent", padding: 0, border: 0 } }, STATES.map((st) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: st.v,
          className: "seg-btn",
          onClick: () => setRows((rs) => rs.map((x, j) => j === i ? { ...x, s: st.v } : x)),
          style: {
            border: `1px solid ${r.s === st.v ? `var(--${st.tone === "green" ? "green" : st.tone === "red" ? "red" : st.tone === "amber" ? "amber" : "accent"})` : "var(--border)"}`,
            background: r.s === st.v ? st.tone === "green" ? "var(--green-bg)" : st.tone === "red" ? "var(--red-bg)" : st.tone === "amber" ? "var(--amber-bg)" : "var(--accent-light)" : "#fff",
            color: r.s === st.v ? st.tone === "green" ? "var(--green-ink)" : st.tone === "red" ? "var(--red-ink)" : st.tone === "amber" ? "var(--amber-ink)" : "var(--accent-ink)" : "var(--text2)",
            fontWeight: r.s === st.v ? 700 : 500,
            padding: "5px 10px",
            borderRadius: 7,
            marginRight: 4
          }
        },
        /* @__PURE__ */ React.createElement(I, { name: st.ico }),
        " ",
        st.label
      )))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", { className: "input sm", placeholder: r.s === "e" ? "Hujjat raqami / izoh\u2026" : "Izoh" }))))))), /* @__PURE__ */ React.createElement("div", { className: "card-foot" }, /* @__PURE__ */ React.createElement("span", null, "Auto-save 30s \xB7 oxirgi: 16-May 10:42"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "qr-code" }, "QR-davomat"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "upload" }, "Excel import")))));
    }
    function TeacherGrading({ setPage }) {
      const [tab, setTab] = useState("needs");
      const [sel, setSel] = useState({});
      const subs = DATA.SUBMISSIONS;
      const tabs = [
        { value: "needs", label: "Tekshirilishi kerak", icon: "file-check", count: subs.filter((s) => s.state === "needs-grade").length },
        { value: "ai", label: "AI shubhalari", icon: "flag-2", count: subs.filter((s) => s.state === "ai-flag").length },
        { value: "appeal", label: "Apellatsiyalar", icon: "gavel", count: subs.filter((s) => s.state === "appeal").length },
        { value: "auto", label: "Avto-baholangan", icon: "robot", count: subs.filter((s) => s.state === "auto-graded").length },
        { value: "all", label: "Hammasi", count: subs.length }
      ];
      const visible = subs.filter((s) => {
        if (tab === "needs") return s.state === "needs-grade";
        if (tab === "ai") return s.state === "ai-flag";
        if (tab === "appeal") return s.state === "appeal";
        if (tab === "auto") return s.state === "auto-graded";
        return true;
      });
      const selCount = Object.values(sel).filter(Boolean).length;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "alert blue", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "AI yordami yoqilgan"), /* @__PURE__ */ React.createElement("p", null, "AI rubric-based taklif beradi, lekin yakuniy baho doim sizda. Har bir AI tahlilning versiyasi va promptlari audit jurnalida saqlanadi.")), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "settings", onClick: () => setPage("a-ai-gov") }, "AI sozlamalari")), /* @__PURE__ */ React.createElement(Tabs, { value: tab, onChange: setTab, items: tabs }), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Chip, { icon: "filter" }, "Kurs: 4"), /* @__PURE__ */ React.createElement(Chip, { icon: "file-text" }, "Turi: Hammasi"), /* @__PURE__ */ React.createElement(Chip, { icon: "clock-hour-3" }, "Kechikkan"), /* @__PURE__ */ React.createElement(Chip, { icon: "sparkles", active: true }, "AI taklifi mavjud"), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#8a93a6" } }, "Saralash:"), /* @__PURE__ */ React.createElement(Seg, { value: "oldest", onChange: () => {
      }, options: [
        { value: "oldest", label: "Eng eski" },
        { value: "newest", label: "Yangi" },
        { value: "risk", label: "Risk" }
      ] })), selCount > 0 && /* @__PURE__ */ React.createElement("div", { className: "bulkbar" }, /* @__PURE__ */ React.createElement(I, { name: "checkbox" }), " ", /* @__PURE__ */ React.createElement("b", null, selCount), " ta tanlandi", /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "success", leftIcon: "check" }, "AI taklifini qabul qilish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "user" }, "Lola S.ga biriktirish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "mail" }, "Feedback yuborish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "danger", leftIcon: "x", onClick: () => setSel({}) }, "Tanlovni tozalash"))), /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { style: { width: 32 } }, /* @__PURE__ */ React.createElement(Check, { value: selCount === visible.length, onChange: (v) => setSel(v ? Object.fromEntries(visible.map((_, i) => [i, true])) : {}) })), /* @__PURE__ */ React.createElement("th", null, "Talaba"), /* @__PURE__ */ React.createElement("th", null, "Topshiriq"), /* @__PURE__ */ React.createElement("th", null, "Yuborildi"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Rubric"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "AI taklifi"), /* @__PURE__ */ React.createElement("th", null, "Holat"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, visible.map((s, i) => /* @__PURE__ */ React.createElement("tr", { key: i, className: sel[i] ? "selected" : "" }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Check, { value: !!sel[i], onChange: (v) => setSel((p) => ({ ...p, [i]: v })) })), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(Avatar, { name: s.student.name, tone: s.student.tone, size: "sm" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, s.student.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, s.student.group)))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { className: `thumb ${s.type === "project" ? "doc" : s.type === "quiz" ? "quiz" : "doc"}`, style: { width: 28, height: 28 } }, /* @__PURE__ */ React.createElement(I, { name: s.type === "project" ? "package" : s.type === "quiz" ? "list-check" : "file-text" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, s.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, s.course, " \xB7 ", s.files.length, " fayl")))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12 } }, s.submittedAgo, " oldin"), s.late && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 2 } }, /* @__PURE__ */ React.createElement(Pill, { tone: "red" }, "kechikkan"))), /* @__PURE__ */ React.createElement("td", { className: "center" }, /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontWeight: 700 } }, s.rubric), /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6", fontSize: 11 } }, "/6 kriteriya")), /* @__PURE__ */ React.createElement("td", { className: "center" }, s.ai != null ? /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { className: "ai-ribbon" }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), " ", s.ai, "/40"), s.state === "ai-flag" && /* @__PURE__ */ React.createElement(Pill, { tone: "red" }, /* @__PURE__ */ React.createElement(I, { name: "flag-2" }))) : /* @__PURE__ */ React.createElement("span", { style: { color: "#b0b7c5" } }, "\u2014")), /* @__PURE__ */ React.createElement("td", null, s.state === "needs-grade" && /* @__PURE__ */ React.createElement(Pill, { tone: "amber", dot: true }, "Kutilmoqda"), s.state === "ai-flag" && /* @__PURE__ */ React.createElement(Pill, { tone: "red", icon: "flag-2" }, "AI shubha"), s.state === "appeal" && /* @__PURE__ */ React.createElement(Pill, { tone: "purple", icon: "gavel" }, "Appeal"), s.state === "auto-graded" && /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "robot" }, s.points)), /* @__PURE__ */ React.createElement("td", { className: "right" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "ghost", leftIcon: "message" }), /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "primary", leftIcon: "arrow-right", onClick: () => setPage("t-ai-grading") }, "Baholash")))))))), /* @__PURE__ */ React.createElement("div", { className: "card-foot" }, /* @__PURE__ */ React.createElement("span", null, visible.length, " / ", subs.length, " ko\u2018rsatildi \xB7 so\u2018nggi yangilanish: hozir"), /* @__PURE__ */ React.createElement("div", { className: "cta-row" }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "CSV eksport")))));
    }
    function TeacherAIGrading({ setPage }) {
      const RUBRIC = [
        { k: "Muammo tushunchasi", w: 5, ai: 4, evidence: "Talaba muammoni aniq ifodalagan, hypothesis to\u2018g\u2018ri yozilgan." },
        { k: "Ma'lumotlar tayyorlash", w: 8, ai: 6, evidence: "Null qiymatlar qisman ko\u2018rib chiqilgan; outlier larni handle qilmagan." },
        { k: "Model tanlovi va asoslash", w: 8, ai: 7, evidence: "Linear regression to\u2018g\u2018ri tanlangan; alternativlar ham muhokama qilingan." },
        { k: "Baholash metrikalari", w: 7, ai: 5, evidence: "RMSE hisoblangan; R\xB2 mavjud emas, cross-validation qilinmagan." },
        { k: "Kod sifati va izohlar", w: 6, ai: 6, evidence: "Toza, modular kod. PEP8 ga mos." },
        { k: "Xulosa va keyingi qadamlar", w: 6, ai: 4, evidence: "Xulosa qisqa, kelajakdagi tahlil yo\u2018nalishlari yo\u2018q." }
      ];
      const aiTotal = RUBRIC.reduce((a, r) => a + r.ai, 0);
      const max = RUBRIC.reduce((a, r) => a + r.w, 0);
      const [scores, setScores] = useState(RUBRIC.map((r) => r.ai));
      const [comment, setComment] = useState("Umuman olganda yaxshi tahlil. Model tanlovi va kod toza. Lekin baholash bosqichida cross-validation va R\xB2 qo\u2018shing \u2014 bu modulda biz buni alohida vurg\u2018ulagan edik. Outlier\u2019larni handle qilish bo\u2018yicha keyingi labda ishlaymiz.");
      const total = scores.reduce((a, n) => a + n, 0);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, alignItems: "stretch", minHeight: 700 } }, /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: 16, borderBottom: "1px solid var(--hairline)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement(Avatar, { name: "Aziza Mahmudova", tone: "b8", size: "lg" }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14 } }, "Aziza Mahmudova \xB7 NLP-26"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6" } }, "Term project \u2014 Sentiment analyzer \xB7 AI Fundamentals \u2192 NLP track")), /* @__PURE__ */ React.createElement(Pill, { tone: "amber", dot: true }, "Kutilmoqda")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" } }, [
        { ico: "package", n: "repo.zip", s: "4.2 MB" },
        { ico: "video", n: "demo.mp4", s: "32 MB" },
        { ico: "file-text", n: "report.pdf", s: "1.1 MB" }
      ].map((f) => /* @__PURE__ */ React.createElement(Pill, { key: f.n, tone: "gray", icon: f.ico }, f.n, " \xB7 ", f.s)), /* @__PURE__ */ React.createElement(Pill, { tone: "red", icon: "clock-hour-3" }, "2 soat oldin"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, padding: 18, background: "var(--bg4)" } }, /* @__PURE__ */ React.createElement(Toolbar, { style: { padding: 0, border: 0 } }, /* @__PURE__ */ React.createElement(Seg, { value: "report", onChange: () => {
      }, options: [
        { value: "report", label: "Hisobot (PDF)", icon: "file-text" },
        { value: "code", label: "Kod (repo)", icon: "code" },
        { value: "demo", label: "Demo video", icon: "player-play" }
      ] }), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "zoom-in" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "zoom-out" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "external-link" }, "Yangi tabda ochish")), /* @__PURE__ */ React.createElement("div", { style: {
        marginTop: 14,
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 28,
        fontFamily: "Georgia, serif",
        minHeight: 360,
        position: "relative"
      } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, right: 18, fontSize: 11, color: "#b0b7c5" } }, "1 / 12"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8 } }, "Sentiment Analyzer \u2014 Yakuniy hisobot"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#8a93a6", marginBottom: 16 } }, "Aziza Mahmudova \xB7 NLP-26 \xB7 16-May 2026"), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font)" } }, "1. Muammo bayoni"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "#475569", marginBottom: 12 } }, "Mahalliy e-commerce platformasidan to\u2018plangan o\u2018zbek tilidagi mahsulot izohlarini ijobiy/salbiy/neytral toifalarga ajratish vazifasi qo\u2018yildi. Hozirgi yondashuvlar asosan inglizcha korpuslarga sozlangan; biz multilingual transformer modelini fine-tune qildik."), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, marginBottom: 6, fontFamily: "var(--font)" } }, "2. Ma'lumotlar to\u2018plami"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "#475569", marginBottom: 6 } }, "14,820 ta izoh to\u2018plandi va qo\u2018lda 7,400 tasi belgilanadi (60% train, 20% val, 20% test). Sinflar taqsimoti\u2026"), /* @__PURE__ */ React.createElement("div", { style: { background: "#f3f5fa", borderRadius: 8, padding: 14, fontSize: 11.5, color: "#475569", fontFamily: "monospace" } }, "ijobiy: 3,210 (43.4%) ", /* @__PURE__ */ React.createElement("br", null), "neytral: 2,640 (35.7%) ", /* @__PURE__ */ React.createElement("br", null), "salbiy: 1,550 (20.9%)"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, height: 100, borderRadius: 8, background: "repeating-linear-gradient(45deg, #eef1f7 0 8px, #f6f8fc 8px 16px)", display: "grid", placeItems: "center", color: "#8a93a6", fontSize: 11.5, border: "1px dashed var(--border)" } }, "[Talabaning hisobotidagi diagramma \u2014 class balance bar chart]")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), " AI grading panel"), sub: "\xB7 rubric-based \xB7 v3.1", actions: /* @__PURE__ */ React.createElement(Btn, { size: "xs", leftIcon: "history" }, "Versiyalar") }), /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, /* @__PURE__ */ React.createElement("div", { className: "note", style: { marginBottom: 14 } }, "AI talabaning ishini rubric bo\u2018yicha tahlil qildi va dalil bilan taklif berdi. Yakuniy bahoni siz qo\u2018yasiz."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 0 14px", gap: 22 } }, /* @__PURE__ */ React.createElement(Donut, { size: 108, stroke: 14, value: aiTotal, max, tone: "#7c3aed", center: /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 } }, aiTotal), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#8a93a6" } }, "AI \xB7 /", max)) }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, color: "#cbd5e1" } }, "\u2192"), /* @__PURE__ */ React.createElement(Donut, { size: 108, stroke: 14, value: total, max, tone: "#1f6feb", center: /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 } }, total), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#8a93a6" } }, "Siz \xB7 /", max)) })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 10 } }, RUBRIC.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { border: "1px solid var(--border)", borderRadius: 10, padding: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700 } }, r.k), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Pill, { tone: "purple" }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), " AI ", r.ai, "/", r.w), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "number",
          className: "input sm mono num",
          style: { width: 64 },
          value: scores[i],
          min: 0,
          max: r.w,
          onChange: (e) => setScores((s) => s.map((x, j) => j === i ? Math.max(0, Math.min(r.w, Number(e.target.value) || 0)) : x))
        }
      ), /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6", fontSize: 11 } }, "/", r.w))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#475569" } }, /* @__PURE__ */ React.createElement(I, { name: "quote", style: { color: "#94a3b8" } }), " ", r.evidence), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(Btn, { size: "xs", leftIcon: "check", onClick: () => setScores((s) => s.map((x, j) => j === i ? r.ai : x)) }, "AI bilan rozi"), /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "ghost", leftIcon: "plus-minus" }, "Override"), /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "ghost", leftIcon: "messages" }, "Izoh qo\u2018shish"))))))), /* @__PURE__ */ React.createElement(Card, { className: "card-pad" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700 } }, "Feedback talabaga"), /* @__PURE__ */ React.createElement(Pill, { tone: "purple" }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), " AI matni yoqilgan")), /* @__PURE__ */ React.createElement("textarea", { className: "input", rows: 5, value: comment, onChange: (e) => setComment(e.target.value) }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11.5, color: "#8a93a6" } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "check" }), " Auto-grammar tekshirildi \xB7 O\u2018zbek (Latin)"), /* @__PURE__ */ React.createElement("span", null, comment.length, " belgi"))), /* @__PURE__ */ React.createElement(Card, { className: "card-pad", style: { background: "linear-gradient(180deg, #fff, #f5f9ff)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", letterSpacing: 0.05, textTransform: "uppercase", fontWeight: 700 } }, "Yakuniy taklif"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800 }, className: "mono num" }, total, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, color: "#8a93a6", fontWeight: 500 } }, "/", max, " \xB7 ", Math.round(total / max * 100), "%"))), /* @__PURE__ */ React.createElement(Pill, { tone: "green", dot: true }, "Passing")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { variant: "success", leftIcon: "check" }, "Tasdiqlash va publish"), /* @__PURE__ */ React.createElement(Btn, { leftIcon: "device-floppy" }, "Draft sifatida saqlash"), /* @__PURE__ */ React.createElement(Btn, { variant: "amber", leftIcon: "message" }, "Talabaga savol"), /* @__PURE__ */ React.createElement(Btn, { variant: "danger", leftIcon: "flag" }, "Plagiat shubhasi")), /* @__PURE__ */ React.createElement("div", { className: "note", style: { marginTop: 10 } }, "Audit: bu baho AI ", /* @__PURE__ */ React.createElement("b", null, "v3.1"), " taklifiga asoslandi, siz ", /* @__PURE__ */ React.createElement("b", null, Math.abs(total - aiTotal)), " ball override qildingiz. Mantiq jurnalga yoziladi.")))));
    }
    function TeacherFinal() {
      const rows = DATA.STUDENTS.map((s, i) => {
        const a = s.attendance;
        const q = Math.max(50, Math.min(100, s.gpa - 8 + i * 7 % 9));
        const h = Math.max(40, Math.min(100, s.gpa - 4 + i * 5 % 11));
        const e = Math.max(40, Math.min(100, s.gpa - 2 + i * 3 % 13));
        const f = Math.max(40, Math.min(100, s.gpa + i * 4 % 7 - 3));
        const finalScore = Math.round(a * 0.1 + q * 0.2 + h * 0.3 + e * 0.2 + f * 0.2);
        return { s, a, q, h, e, f, finalScore, override: null };
      });
      const [overrides, setOverrides] = useState({});
      const [approved, setApproved] = useState({});
      const passing = rows.filter((r) => (overrides[r.s.name] ?? r.finalScore) >= 60).length;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "alert amber", style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement(I, { name: "info-circle" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "Yakuniy baholarni tasdiqlash \xB7 NLP-26"), /* @__PURE__ */ React.createElement("p", null, "Tasdiqlangan baholar talabaga va sertifikat bo\u2018yicha tekshirishga yuboriladi. Auto-hisoblangan formula: ", /* @__PURE__ */ React.createElement("b", null, "davomat 10% \xB7 quiz 20% \xB7 uy ishi 30% \xB7 imtihon 20% \xB7 yakuniy 20%"), "."))), /* @__PURE__ */ React.createElement("div", { className: "stat-grid cols-4", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(Stat, { tone: "blue", label: "Talabalar", value: rows.length, sub: "NLP-26 \xB7 Spring '26" }), /* @__PURE__ */ React.createElement(Stat, { tone: "green", label: "O'tdi", value: passing, sub: `${Math.round(passing / rows.length * 100)}% guruh` }), /* @__PURE__ */ React.createElement(Stat, { tone: "amber", label: "Tasdiqlangan", value: Object.values(approved).filter(Boolean).length, sub: "bugun" }), /* @__PURE__ */ React.createElement(Stat, { tone: "purple", label: "O\u2018rtacha", value: Math.round(rows.reduce((a, r) => a + r.finalScore, 0) / rows.length), unit: "ball" })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement("select", { className: "select", style: { width: 240 } }, /* @__PURE__ */ React.createElement("option", null, "Guruh: NLP-26"), /* @__PURE__ */ React.createElement("option", null, "Guruh: ML-26-2A"), /* @__PURE__ */ React.createElement("option", null, "Guruh: AI-26-1A")), /* @__PURE__ */ React.createElement(Chip, { icon: "filter" }, "Faqat o\u2018zgartirilganlar"), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "CSV"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "check-circle" }, "Hammasini tasdiqlash"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "send" }, "Publish va sertifikatga jo\u2018natish")), /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Talaba"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Davomat \xB710%"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Quiz \xB720%"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Uy ishi \xB730%"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Imtihon \xB720%"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Yakuniy \xB720%"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Auto"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Override"), /* @__PURE__ */ React.createElement("th", null, "Holat"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((r, i) => {
        const o = overrides[r.s.name];
        const fin = o ?? r.finalScore;
        const isApp = approved[r.s.name];
        return /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(Avatar, { name: r.s.name, tone: r.s.tone, size: "sm" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, r.s.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, r.s.group)))), /* @__PURE__ */ React.createElement("td", { className: "center mono num" }, r.a), /* @__PURE__ */ React.createElement("td", { className: "center mono num" }, r.q), /* @__PURE__ */ React.createElement("td", { className: "center mono num" }, r.h), /* @__PURE__ */ React.createElement("td", { className: "center mono num" }, r.e), /* @__PURE__ */ React.createElement("td", { className: "center mono num" }, r.f), /* @__PURE__ */ React.createElement("td", { className: "center" }, /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontWeight: 700 } }, r.finalScore)), /* @__PURE__ */ React.createElement("td", { className: "center" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            className: "input sm mono num",
            style: { width: 60, textAlign: "center", borderColor: o != null ? "var(--accent)" : "var(--border2)" },
            placeholder: "\u2014",
            value: o ?? "",
            onChange: (e) => setOverrides((p) => ({ ...p, [r.s.name]: e.target.value === "" ? null : Math.max(0, Math.min(100, Number(e.target.value))) }))
          }
        )), /* @__PURE__ */ React.createElement("td", null, fin >= 80 ? /* @__PURE__ */ React.createElement(Pill, { tone: "green" }, "A \xB7 A\u2019lo") : fin >= 70 ? /* @__PURE__ */ React.createElement(Pill, { tone: "blue" }, "B \xB7 Yaxshi") : fin >= 60 ? /* @__PURE__ */ React.createElement(Pill, { tone: "amber" }, "C \xB7 Qoniqarli") : /* @__PURE__ */ React.createElement(Pill, { tone: "red" }, "F \xB7 O\u2018ta olmadi"), o != null && /* @__PURE__ */ React.createElement(Pill, { tone: "purple", style: { marginLeft: 4 } }, "override")), /* @__PURE__ */ React.createElement("td", { className: "right" }, isApp ? /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "Tasdiqlangan") : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "ghost", leftIcon: "message" }), /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "success", leftIcon: "check", onClick: () => setApproved((p) => ({ ...p, [r.s.name]: true })) }, "Tasdiqlash"))));
      })))), /* @__PURE__ */ React.createElement("div", { className: "card-foot" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "info-circle" }), " Override qilingan baholar audit jurnaliga sabab bilan yoziladi."))));
    }
    function TeacherRisk() {
      const STUDENTS = DATA.STUDENTS;
      const high = STUDENTS.filter((s) => s.risk >= 60).sort((a, b) => b.risk - a.risk);
      const mid = STUDENTS.filter((s) => s.risk >= 30 && s.risk < 60).sort((a, b) => b.risk - a.risk);
      const low = STUDENTS.filter((s) => s.risk < 30).sort((a, b) => a.risk - b.risk);
      const [open, setOpen] = useState(null);
      const reasons = (s) => {
        const list = [];
        if (s.attendance < 80) list.push({ ico: "user-x", t: `Davomat ${s.attendance}%`, tone: "red" });
        if (s.progress < 50) list.push({ ico: "trending-down", t: `Progress ${s.progress}%`, tone: "amber" });
        if (s.late > 0) list.push({ ico: "clock-hour-3", t: `${s.late} ta kech topshiriq`, tone: "amber" });
        if (s.gpa < 75) list.push({ ico: "stamp", t: `Hozirgi baho ${s.gpa}`, tone: "amber" });
        return list;
      };
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "alert blue", style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement(I, { name: "heart-handshake" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "Jazo emas, yordam radari"), /* @__PURE__ */ React.createElement("p", null, "Risk score davomat, topshiriq topshirish va engagement signal\u2019lariga asoslangan. Asosiy maqsad \u2014 talabaga teacher yoki tutor intervention\u2019ni vaqtida yo\u2018naltirish, statistik \u201Cqora ro\u2018yxat\u201D emas."))), /* @__PURE__ */ React.createElement("div", { className: "stat-grid cols-4", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(Stat, { tone: "red", label: "Yuqori risk", value: high.length, sub: "kechiktirib bo\u2018lmaydi" }), /* @__PURE__ */ React.createElement(Stat, { tone: "amber", label: "O'rta risk", value: mid.length, sub: "kuzatuvda" }), /* @__PURE__ */ React.createElement(Stat, { tone: "green", label: "Past risk", value: low.length, sub: "barqaror" }), /* @__PURE__ */ React.createElement(Stat, { tone: "purple", label: "Interventionlar", value: "12", sub: "bu hafta yuborildi" })), /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Chip, { icon: "filter" }, "Kurs: 4"), /* @__PURE__ */ React.createElement(Chip, { icon: "users" }, "Guruh: 8"), /* @__PURE__ */ React.createElement(Chip, { icon: "alert-triangle", active: true }, "Risk \u2265 30"), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement(Seg, { value: "risk", onChange: () => {
      }, options: [
        { value: "risk", label: "Risk skor" },
        { value: "att", label: "Davomat" },
        { value: "prog", label: "Progress" }
      ] }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "Eksport"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "send" }, "Bulk intervention yuborish")), /* @__PURE__ */ React.createElement(Card, { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { style: { width: 32 } }, /* @__PURE__ */ React.createElement(Check, null)), /* @__PURE__ */ React.createElement("th", null, "Talaba"), /* @__PURE__ */ React.createElement("th", null, "Guruh"), /* @__PURE__ */ React.createElement("th", { className: "center" }, "Risk skor"), /* @__PURE__ */ React.createElement("th", null, "Asosiy sabablar"), /* @__PURE__ */ React.createElement("th", null, "Trend"), /* @__PURE__ */ React.createElement("th", { className: "right" }, "Tavsiya etilgan ish"))), /* @__PURE__ */ React.createElement("tbody", null, [...high, ...mid, ...low].map((s, i) => {
        const tone = s.risk >= 60 ? "red" : s.risk >= 30 ? "amber" : "green";
        const rs = reasons(s);
        return /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Check, null)), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(Avatar, { name: s.name, tone: s.tone, size: "sm" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, s.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, "davomat ", s.attendance, "% \xB7 progress ", s.progress, "%")))), /* @__PURE__ */ React.createElement("td", null, s.group), /* @__PURE__ */ React.createElement("td", { className: "center" }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(
          Donut,
          {
            size: 36,
            stroke: 5,
            value: s.risk,
            max: 100,
            tone: tone === "red" ? "#dc2626" : tone === "amber" ? "#d97706" : "#16a34a",
            center: /* @__PURE__ */ React.createElement("span", { className: "mono num", style: { fontSize: 10.5, fontWeight: 800 } }, s.risk)
          }
        ), /* @__PURE__ */ React.createElement(Pill, { tone }, s.risk >= 60 ? "Yuqori" : s.risk >= 30 ? "O\u2018rta" : "Past"))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 4 } }, rs.length === 0 && /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "Signal yo\u2018q"), rs.map((r, j) => /* @__PURE__ */ React.createElement(Pill, { key: j, tone: r.tone, icon: r.ico }, r.t)))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
          Spark,
          {
            data: [s.gpa + 5, s.gpa + 2, s.gpa + 1, s.gpa - 1, s.gpa - 3, s.gpa - 5, s.gpa],
            tone: s.trend === "down" ? "red" : s.trend === "up" ? "green" : "muted"
          }
        ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", marginTop: 2 } }, s.trend === "down" ? "\u2193 pasayyapti" : s.trend === "up" ? "\u2191 ko\u2018tarilyapti" : "barqaror")), /* @__PURE__ */ React.createElement("td", { className: "right" }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", gap: 6 } }, rs.length > 0 && rs[0].ico === "user-x" && /* @__PURE__ */ React.createElement(Btn, { size: "xs", leftIcon: "phone-call" }, "Talabaga aloqa"), rs.length > 0 && rs[0].ico === "clock-hour-3" && /* @__PURE__ */ React.createElement(Btn, { size: "xs", leftIcon: "clock" }, "Deadline ext."), /* @__PURE__ */ React.createElement(Btn, { size: "xs", variant: "primary", leftIcon: "heart-handshake", onClick: () => setOpen(s) }, "Intervention ochish"))));
      }))))), /* @__PURE__ */ React.createElement(
        Drawer,
        {
          open: !!open,
          onClose: () => setOpen(null),
          title: "Intervention rejasini boshlash",
          footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { onClick: () => setOpen(null) }, "Bekor qilish"), /* @__PURE__ */ React.createElement(Btn, { variant: "primary", leftIcon: "send", onClick: () => setOpen(null) }, "Yuborish va kuzatuvga olish"))
        },
        open && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(Avatar, { name: open.name, tone: open.tone, size: "lg" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700 } }, open.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#8a93a6" } }, open.group, " \xB7 risk ", open.risk)), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto" } }, /* @__PURE__ */ React.createElement(Pill, { tone: open.risk >= 60 ? "red" : "amber" }, open.risk >= 60 ? "Yuqori" : "O\u2018rta", " risk"))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", { className: "label" }, "Intervention turi"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, [
          { ico: "phone-call", t: "Tutor qo\u2018ng\u2018irog\u2018i", on: true },
          { ico: "message-circle", t: "Yumshoq eslatma" },
          { ico: "calendar-plus", t: "1:1 uchrashuv" },
          { ico: "clock", t: "Deadline uzaytirish" }
        ].map((o, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "chip", style: {
          padding: 12,
          justifyContent: "flex-start",
          background: o.on ? "var(--accent-light)" : "#fff",
          borderColor: o.on ? "var(--accent-mid)" : "var(--border)",
          color: o.on ? "var(--accent-ink)" : "var(--text2)",
          borderStyle: "solid"
        } }, /* @__PURE__ */ React.createElement(I, { name: o.ico }), " ", o.t)))), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", { className: "label" }, "Talabaga xabar (Uzbek Latin)"), /* @__PURE__ */ React.createElement("textarea", { className: "input", rows: 4, defaultValue: `Salom ${open.name.split(" ")[0]}, oxirgi 2 hafta davomatda 2 marta yo\u2018qsiz va Lab 3 hali topshirilmagan. Yordam kerakmi? Ertaga office hourda uchrashsak qanday bo\u2018ladi?` })), /* @__PURE__ */ React.createElement("div", { className: "field" }, /* @__PURE__ */ React.createElement("label", { className: "label" }, "Eslatish (follow-up)"), /* @__PURE__ */ React.createElement("select", { className: "select" }, /* @__PURE__ */ React.createElement("option", null, "3 kundan keyin"), /* @__PURE__ */ React.createElement("option", null, "1 hafta"), /* @__PURE__ */ React.createElement("option", null, "2 hafta"))), /* @__PURE__ */ React.createElement("div", { className: "note" }, "Bu intervention talabaning profilida private flag sifatida saqlanadi va boshqa instruktorlarga ko\u2018rinmaydi."))
      ));
    }
    function TeacherQA() {
      const QA = DATA.QA;
      const [tab, setTab] = useState("needs");
      const [reply, setReply] = useState("");
      const visible = QA.filter((q) => tab === "all" ? true : tab === "flag" ? q.flagged : tab === "answered" ? q.state === "answered" : q.state === "needs-reply");
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Tabs, { value: tab, onChange: setTab, items: [
        { value: "needs", label: "Javob kutmoqda", icon: "message", count: QA.filter((q) => q.state === "needs-reply").length },
        { value: "flag", label: "Flag qilingan", icon: "flag-2", count: QA.filter((q) => q.flagged).length },
        { value: "answered", label: "Javoblangan", icon: "check", count: QA.filter((q) => q.state === "answered").length },
        { value: "all", label: "Hammasi", count: QA.length }
      ] }), /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Chip, { icon: "filter" }, "Kurs: Hammasi"), /* @__PURE__ */ React.createElement(Chip, { icon: "thumb-up" }, "Top ovoz olganlar"), /* @__PURE__ */ React.createElement(Chip, { icon: "alert-octagon" }, "Yangi"), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "sparkles" }, "AI bilan tushuntirish drafti"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "trash", variant: "danger" }, "Spam o\u2018chirish")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 12, marginTop: 14 } }, visible.map((q, i) => /* @__PURE__ */ React.createElement(Card, { key: i, className: "card-pad", style: {
        borderColor: q.flagged ? "var(--red-mid)" : "var(--border)",
        background: q.flagged ? "linear-gradient(0deg, #fff, #fff8f8)" : "#fff"
      } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement(Avatar, { name: q.student.name, tone: q.student.tone }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("b", { style: { fontSize: 13 } }, q.student.name), /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6", fontSize: 11.5 } }, "\xB7 ", q.course, " \xB7 ", q.age), q.flagged && /* @__PURE__ */ React.createElement(Pill, { tone: "red", icon: "flag-2" }, "AI spam shubhasi"), q.state === "answered" && /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "Javoblangan"), /* @__PURE__ */ React.createElement("div", { style: { marginLeft: "auto", display: "flex", gap: 4, alignItems: "center", fontSize: 11.5, color: "#8a93a6" } }, /* @__PURE__ */ React.createElement(I, { name: "thumb-up" }), " ", /* @__PURE__ */ React.createElement("span", { className: "num" }, q.votes))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, marginBottom: 4, color: "#0f172a" } }, q.topic), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "#475569" } }, q.body), q.state === "needs-reply" && !q.flagged && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: 12, background: "var(--bg4)", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 11.5, color: "#475569", fontWeight: 600 } }, /* @__PURE__ */ React.createElement("span", null, "Javobingiz"), /* @__PURE__ */ React.createElement(Pill, { tone: "purple" }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), " AI taklif drafti tayyor")), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          className: "input",
          rows: 3,
          placeholder: "Talabaga aniq, mehribon javob yozing\u2026",
          value: i === 0 ? reply : "",
          onChange: (e) => i === 0 && setReply(e.target.value)
        }
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "link" }, "Lesson havolasi"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "paperclip" }, "Material")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "archive" }, "Pin qilish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "send" }, "Javob yuborish")))), q.flagged && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, display: "flex", gap: 6 } }, /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "danger", leftIcon: "trash" }, "Spam \u2014 o\u2018chirish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "user-x" }, "Muallifni ogohlantirish"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "ghost", leftIcon: "check" }, "Yolg\u2018on signal \xB7 qayta tikla"))))))));
    }
    window.__PAGES__ = window.__PAGES__ || {};
    Object.assign(window.__PAGES__, {
      "t-schedule": TeacherSchedule,
      "t-attendance": TeacherAttendance,
      "t-grading": TeacherGrading,
      "t-ai-grading": TeacherAIGrading,
      "t-final": TeacherFinal,
      "t-risk": TeacherRisk,
      "t-qa": TeacherQA
    });
  })();
})();
