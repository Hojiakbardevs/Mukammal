(() => {
  (() => {
    const { useState } = React;
    const SURVEYS = [
      { id: "s1", name: "Kurs yakuni baholash \xB7 AI Fundamentals", target: "O'quv oqimi B", responses: 86, total: 124, status: "active", q: 12, last: "16-May" },
      { id: "s2", name: "Trainer NPS \xB7 Spring '26 mid-term", target: "Barcha o'quv oqimi", responses: 412, total: 1842, status: "active", q: 6, last: "15-May" },
      { id: "s3", name: "Onboarding tajriba", target: "Yangi talabalar", responses: 124, total: 142, status: "active", q: 8, last: "14-May" },
      { id: "s4", name: "Capstone loyiha feedback", target: "ML-26-2A", responses: 0, total: 86, status: "draft", q: 10, last: "16-May" },
      { id: "s5", name: "Mohirdev dan o\u2018tish so\u2018rovi", target: "AI-26-1A", responses: 58, total: 62, status: "closed", q: 5, last: "01-Apr" }
    ];
    function AdminSurveys() {
      const [active, setActive] = useState(SURVEYS[0]);
      const [tab, setTab] = useState("builder");
      return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "360px 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "So\u2018rovnomalar", count: SURVEYS.length, actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "plus" }) }), /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Chip, { active: true }, "Aktiv"), /* @__PURE__ */ React.createElement(Chip, null, "Draft"), /* @__PURE__ */ React.createElement(Chip, null, "Yopilgan")), /* @__PURE__ */ React.createElement("div", { style: { padding: 8, maxHeight: 700, overflowY: "auto" } }, SURVEYS.map((s) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: s.id,
          className: `tree-row ${active.id === s.id ? "active" : ""}`,
          style: { padding: 12, alignItems: "flex-start" },
          onClick: () => setActive(s)
        },
        /* @__PURE__ */ React.createElement(I, { name: s.status === "active" ? "circle-dot" : s.status === "draft" ? "edit" : "check" }),
        /* @__PURE__ */ React.createElement("div", { className: "grow", style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 12.5, lineHeight: 1.25, whiteSpace: "normal" } }, s.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", marginTop: 3, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "users" }), " ", s.target), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "forms" }), " ", s.q)), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement(Bar, { value: Math.round(s.responses / s.total * 100), tone: "blue" })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8a93a6", marginTop: 4 } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "num" }, s.responses), "/", /* @__PURE__ */ React.createElement("span", { className: "num" }, s.total), " javob"), /* @__PURE__ */ React.createElement("span", null, s.last)))
      )))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: active.name, actions: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pill, { tone: active.status === "active" ? "green" : active.status === "draft" ? "amber" : "gray", dot: true }, active.status), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "link" }, "Public link"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "send", variant: "primary" }, "Yuborish")) }), /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Seg, { value: tab, onChange: setTab, options: [
        { value: "builder", label: "Savollar", icon: "forms" },
        { value: "results", label: "Natijalar", icon: "chart-pie" },
        { value: "audience", label: "Auditoriya", icon: "users" },
        { value: "settings", label: "Sozlamalar", icon: "settings" }
      ] }), /* @__PURE__ */ React.createElement("div", { className: "spacer" }), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "copy" }, "Shablon sifatida")), tab === "builder" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gridTemplateColumns: "1fr 240px", gap: 14 } }, /* @__PURE__ */ React.createElement("div", null, [
        { type: "rating", label: "1. Kursning umumiy sifatini qanday baholaysiz?", ans: "1\u20135 yulduz", req: true },
        { type: "nps", label: "2. Bu kursni do\u2018stingizga tavsiya qilasizmi? (0\u201310)", ans: "NPS", req: true },
        {
          type: "mcq",
          label: "3. Sizga eng yoqqan modul qaysi edi?",
          options: ["Modul 1 \u2014 kirish", "Modul 2 \u2014 matematika", "Modul 3 \u2014 supervised learning", "Modul 4 \u2014 model evaluation"],
          req: false
        },
        { type: "text", label: "4. Trainer haqida fikringiz (qisqacha)", ans: "Matn \xB7 300 belgi gacha", req: false },
        {
          type: "checkbox",
          label: "5. Yana qaysi mavzularda chuqurlashtirgan bo\u2018lardingiz?",
          options: ["Deep Learning", "MLOps va deployment", "Statistika", "Tashqi ma'lumot to\u2018plash"],
          req: false
        },
        { type: "yn", label: "6. Sertifikat berilgan formatda yetarli darajada qadrli deb hisoblaysizmi?", ans: "Ha / Yo\u2018q", req: true }
      ].map((q, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { border: "1px solid var(--border)", borderRadius: 10, padding: 14, marginBottom: 10, background: "#fff", display: "flex", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { className: "thumb", style: { width: 32, height: 32 } }, /* @__PURE__ */ React.createElement(I, { name: q.type === "rating" ? "star" : q.type === "nps" ? "scale" : q.type === "mcq" ? "circle-dot" : q.type === "checkbox" ? "checkbox" : q.type === "yn" ? "thumb-up" : "message" })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, q.label), q.req && /* @__PURE__ */ React.createElement(Pill, { tone: "red" }, "required"), /* @__PURE__ */ React.createElement(Pill, { tone: "gray" }, q.type)), q.ans && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "#8a93a6" } }, q.ans), q.options && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 4, marginTop: 6 } }, q.options.map((o, j) => /* @__PURE__ */ React.createElement("div", { key: j, style: { fontSize: 11.5, color: "#475569", display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(I, { name: q.type === "checkbox" ? "square" : "circle", style: { color: "#cbd5e1" } }), o)))), /* @__PURE__ */ React.createElement("div", { className: "row-act", style: { opacity: 1 } }, /* @__PURE__ */ React.createElement(Btn, { size: "icon", variant: "ghost" }, /* @__PURE__ */ React.createElement(I, { name: "grip-vertical" })), /* @__PURE__ */ React.createElement(Btn, { size: "icon", variant: "ghost" }, /* @__PURE__ */ React.createElement(I, { name: "edit" })), /* @__PURE__ */ React.createElement(Btn, { size: "icon", variant: "ghost" }, /* @__PURE__ */ React.createElement(I, { name: "trash" }))))), /* @__PURE__ */ React.createElement(Btn, { leftIcon: "plus", style: { width: "100%", justifyContent: "center" } }, "Savol qo\u2018shish")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.08, marginBottom: 8 } }, "Savol turlari"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 6 } }, [
        ["rating", "star", "Yulduzli baho"],
        ["nps", "scale", "NPS (0\u201310)"],
        ["mcq", "circle-dot", "Bitta tanlov"],
        ["checkbox", "checkbox", "Ko\u2018p tanlov"],
        ["yn", "thumb-up", "Ha / Yo\u2018q"],
        ["text", "message", "Matn (qisqa)"],
        ["long", "align-left", "Matn (uzun)"],
        ["scale", "adjustments", "Slider 0\u2013100"]
      ].map(([k, ico, l]) => /* @__PURE__ */ React.createElement("div", { key: k, className: "chip", style: { justifyContent: "flex-start", borderStyle: "solid" } }, /* @__PURE__ */ React.createElement(I, { name: ico }), " ", l))))), tab === "results" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("div", { className: "stat-grid cols-4", style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement(Stat, { tone: "blue", label: "Javoblar", value: `${active.responses}/${active.total}`, sub: `${Math.round(active.responses / active.total * 100)}% to\u2018ldirildi` }), /* @__PURE__ */ React.createElement(Stat, { tone: "green", label: "NPS", value: "+62", sub: "trainer + kurs", trend: { dir: "up", label: "+4" } }), /* @__PURE__ */ React.createElement(Stat, { tone: "amber", label: "O'rtacha baho", value: "4.5", unit: "/5", sub: "1,124 ovoz" }), /* @__PURE__ */ React.createElement(Stat, { tone: "purple", label: "Sentiment", value: "78", unit: "% +", sub: "22% neytral" })), /* @__PURE__ */ React.createElement("div", { className: "grid c-2" }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Savol 1 \u2014 Kurs sifatini baholang" }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, [
        { l: "5 \u2014 A\u2018lo", v: 48 },
        { l: "4 \u2014 Yaxshi", v: 31 },
        { l: "3 \u2014 O\u2018rtacha", v: 5 },
        { l: "2 \u2014 Qoniqarsiz", v: 1 },
        { l: "1 \u2014 Yomon", v: 1 }
      ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.l, style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", null, r.l), /* @__PURE__ */ React.createElement("span", { className: "num" }, /* @__PURE__ */ React.createElement("b", null, r.v), " \xB7 ", Math.round(r.v / 86 * 100), "%")), /* @__PURE__ */ React.createElement(Bar, { value: r.v / 86 * 100, tone: "blue" }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "So\u2018nggi izohlar", sub: "\xB7 matnli savol" }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gap: 10 } }, [
        { who: "Aziza M.", t: "Trainer juda yaxshi tushuntirgan. Lab uchun real-world datasets ko\u2018proq bo\u2018lsa edi.", s: "+" },
        { who: "Sherzod N.", t: "Modullar tezligi yaxshi, lekin matematik tayanchni boshida ko\u2018proq berish kerak.", s: "0" },
        { who: "Bobur Y.", t: "AI grading feedback aniq edi. Sertifikat dizayni zo\u2018r!", s: "+" },
        { who: "Diyora K.", t: "Topshiriqlar kichik buyurtmalardan kelsa qiziqroq bo\u2018lardi.", s: "0" }
      ].map((q, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, padding: 10, background: "var(--bg4)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement(Pill, { tone: q.s === "+" ? "green" : q.s === "0" ? "amber" : "red" }, q.s === "+" ? "ijobiy" : q.s === "0" ? "neytral" : "salbiy"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#475569" } }, q.t), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", marginTop: 2 } }, "\u2014 ", q.who)))))))), tab === "audience" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("div", { className: "kv-list" }, /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Auditoriya"), /* @__PURE__ */ React.createElement("span", { className: "v" }, active.target)), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Anonim"), /* @__PURE__ */ React.createElement("span", { className: "v" }, /* @__PURE__ */ React.createElement(Pill, { tone: "green" }, "Ha"))), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Ochiq sana"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "10-May 2026")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Yopilish sanasi"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "30-May 2026 \xB7 23:59")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Eslatish"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "Har 3 kun \xB7 maks 3 marta")))), tab === "settings" && /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("div", { className: "alert blue" }, /* @__PURE__ */ React.createElement(I, { name: "lock" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "PII himoyasi"), /* @__PURE__ */ React.createElement("p", null, "Bu so\u2018rovnomada anonim rejim yoqilgan. Faqat aggregat natijalar trainer va admin uchun ko\u2018rinadi; ism va identifikatorlar yashirin."))))));
    }
    window.__PAGES__ = window.__PAGES__ || {};
    Object.assign(window.__PAGES__, { "a-surveys": AdminSurveys });
  })();
})();
