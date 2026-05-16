(() => {
  (() => {
    const { useState } = React;
    function AdminAIGov() {
      const [graderOn, setGraderOn] = useState(true);
      const [riskOn, setRiskOn] = useState(true);
      const [plagOn, setPlagOn] = useState(true);
      const [autoApprove, setAutoApprove] = useState(false);
      const [section, setSection] = useState("principles");
      const Toggle = ({ value, onChange }) => /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => onChange(!value),
          style: {
            width: 38,
            height: 22,
            borderRadius: 999,
            border: 0,
            cursor: "pointer",
            background: value ? "var(--accent)" : "var(--bg3)",
            position: "relative",
            transition: "background 0.18s"
          }
        },
        /* @__PURE__ */ React.createElement("span", { style: {
          position: "absolute",
          top: 2,
          left: value ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: 999,
          background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transition: "left 0.18s"
        } })
      );
      return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "240px 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "AI boshqaruvi" }), /* @__PURE__ */ React.createElement("div", { style: { padding: 8 } }, [
        { k: "principles", l: "Tamoyillar va politika", i: "scale" },
        { k: "grading", l: "AI grading sozlamalari", i: "sparkles" },
        { k: "risk", l: "Risk skor modeli", i: "alert-triangle" },
        { k: "plagiarism", l: "Plagiat va AI-yozma", i: "fingerprint" },
        { k: "audit", l: "AI audit trail", i: "history" },
        { k: "models", l: "Modellar va versiyalar", i: "stack-2" },
        { k: "data", l: "Ma'lumot va PII", i: "lock" }
      ].map((s) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: s.k,
          className: `tree-row ${section === s.k ? "active" : ""}`,
          onClick: () => setSection(s.k)
        },
        /* @__PURE__ */ React.createElement(I, { name: s.i }),
        " ",
        /* @__PURE__ */ React.createElement("span", { className: "grow" }, s.l)
      )))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, section === "principles" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "alert blue" }, /* @__PURE__ */ React.createElement(I, { name: "scale" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "Inson markazli AI"), /* @__PURE__ */ React.createElement("p", null, "AIRI Training LMS NIST AI RMF va UNESCO GenAI in education tavsiyalariga muvofiq qurilgan. AI hech qachon yakuniy qaror qabul qilmaydi \u2014 u ", /* @__PURE__ */ React.createElement("b", null, "rubric-based suggestion, evidence highlight"), " beradi va inson tasdig\u2018ini talab qiladi."))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Asosiy tamoyillar" }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18, display: "grid", gap: 12 } }, [
        { t: "Transparency", d: "Har bir AI taklif uchun model, versiya, prompt va evidence saqlanadi. Talaba o\u2018ziga ta'sir qilgan AI tahlilini ko\u2018ra oladi." },
        { t: "Human oversight", d: "AI hech qachon avtomatik baho qo\u2018ymaydi. Final approval doimo teacher\u2019da, appeal flow esa Reviewer\u2019da." },
        { t: "Fairness va bias audit", d: "Har choragda model natijalari guruh, til va platforma bo\u2018yicha bias audit'ga olib chiqiladi." },
        { t: "Risk = yordam signali, jazo emas", d: "Risk skor faqat tutor/teacher intervention\u2019ni yoqish uchun ishlatiladi; ranking yoki disqualification uchun emas." }
      ].map((p) => /* @__PURE__ */ React.createElement("div", { key: p.t, style: { display: "flex", gap: 12, padding: 14, background: "var(--bg4)", borderRadius: 10 } }, /* @__PURE__ */ React.createElement("span", { className: "thumb", style: { background: "var(--accent-light)", color: "var(--accent)" } }, /* @__PURE__ */ React.createElement(I, { name: "check" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13.5 } }, p.t), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#475569", marginTop: 2 } }, p.d))))), /* @__PURE__ */ React.createElement("div", { className: "card-foot" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(I, { name: "external-link" }), " Tegishli standartlar: NIST AI RMF 1.0 \xB7 UNESCO GenAI \xB7 Open Badges 3.0 \xB7 WCAG 2.2 AA"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "Policy PDF")))), section === "grading" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "AI grading suggestion engine", actions: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "#475569" } }, graderOn ? "Yoqilgan" : "O\u2018chirilgan"), /* @__PURE__ */ React.createElement(Toggle, { value: graderOn, onChange: setGraderOn })) }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18, opacity: graderOn ? 1 : 0.5 } }, /* @__PURE__ */ React.createElement("div", { className: "kv-list" }, /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Model"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "claude-haiku-4.5 (managed)")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Versiya"), /* @__PURE__ */ React.createElement("span", { className: "v mono" }, "v3.1 \xB7 pinned")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Maks token chiqishi"), /* @__PURE__ */ React.createElement("span", { className: "v num" }, "1024")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Confidence porog\u2018i"), /* @__PURE__ */ React.createElement("span", { className: "v num" }, "0.78")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Auto-publish ruxsati"), /* @__PURE__ */ React.createElement("span", { className: "v", style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement(Toggle, { value: autoApprove, onChange: setAutoApprove }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#dc2626" } }, autoApprove ? "XAVFLI: tavsiya etilmaydi" : "Faqat teacher tasdig\u2018i")))), /* @__PURE__ */ React.createElement("div", { className: "row-div" }), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 13, marginBottom: 10 } }, "Rubric integratsiyasi"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, [
        { l: "Faqat rubric kriteriyalariga asoslangan baho", v: true },
        { l: "Har bir kriteriya uchun evidence quote", v: true },
        { l: "Free-form qo\u2018shimcha izoh ruxsat etilgan", v: false },
        { l: "Talabaning shaxsiy ma'lumotlarini ishlatish", v: false, red: true }
      ].map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
        padding: 12,
        border: "1px solid var(--border)",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: r.red ? "var(--red-ink)" : "var(--text1)", fontWeight: 600 } }, r.red && /* @__PURE__ */ React.createElement(I, { name: "alert-triangle" }), " ", r.l), /* @__PURE__ */ React.createElement(Toggle, { value: r.v, onChange: () => {
      } })))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "System prompt", sub: "\xB7 read-only \xB7 versiyali", actions: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pill, { tone: "purple" }, "v3.1"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "history" }, "Tarix"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "edit" }, "Yangi versiya")) }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("pre", { style: {
        fontFamily: "var(--mono)",
        fontSize: 11.5,
        background: "#0c1733",
        color: "#cbd5e1",
        padding: 16,
        borderRadius: 10,
        overflowX: "auto",
        lineHeight: 1.65
      } }, `You are an AI grading assistant for AIRI Training LMS.
ROLE: rubric-based reviewer \xB7 NOT final grader.
Always:
  \u2022 score strictly against the provided rubric criteria
  \u2022 cite the specific evidence (paragraph, code line) for each score
  \u2022 flag uncertainty if confidence < 0.78
  \u2022 respond in Uzbek (Latin script) unless instructed otherwise
Never:
  \u2022 adjust scores based on student name, group, or prior history
  \u2022 exceed the maximum points for a criterion
  \u2022 generate unverified accusations of plagiarism or AI-authorship
Output schema: { scores: [...], evidence: [...], feedback: "" }`), /* @__PURE__ */ React.createElement("div", { className: "note", style: { marginTop: 10 } }, "System prompt har bir bahoga audit jurnaliga link bilan biriktiriladi.")))), section === "risk" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Risk skor modeli", actions: /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12 } }, "Faol"), /* @__PURE__ */ React.createElement(Toggle, { value: riskOn, onChange: setRiskOn })) }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18, opacity: riskOn ? 1 : 0.5 } }, /* @__PURE__ */ React.createElement("div", { className: "alert amber", style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement(I, { name: "info-circle" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "Bu skor \u2014 yordam signali"), /* @__PURE__ */ React.createElement("p", null, "Hech qachon ranking, sertifikatga ruxsat berish yoki disqualification uchun ishlatilmaydi. Faqat tutor/teacher intervention paneliga ko\u2018rinadi."))), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 10 } }, "Signal og\u2018irliklari"), [
        { k: "Davomat", v: 35, note: "haftalik attendance + qatnashish ulushi" },
        { k: "Topshiriq", v: 30, note: "kechikkan / topshirilmagan ulushi" },
        { k: "VLE engagement", v: 20, note: "platformaga kirish, video tugatish, materialni ochish" },
        { k: "Quiz natija trendi", v: 15, note: "so\u2018nggi 4 quizdagi pasayish" }
      ].map((r) => /* @__PURE__ */ React.createElement("div", { key: r.k, style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 180, fontSize: 12.5 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, r.k), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, r.note)), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement(Bar, { value: r.v * 2, tone: "blue", thick: true })), /* @__PURE__ */ React.createElement("input", { className: "input sm mono num", style: { width: 64 }, defaultValue: r.v }), /* @__PURE__ */ React.createElement("span", { style: { color: "#8a93a6", fontSize: 12 } }, "%"))), /* @__PURE__ */ React.createElement("div", { className: "row-div" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 } }, [
        { l: "Past", from: 0, to: 30, c: "green" },
        { l: "O\u2018rta", from: 30, to: 60, c: "amber" },
        { l: "Yuqori", from: 60, to: 100, c: "red" }
      ].map((t) => /* @__PURE__ */ React.createElement("div", { key: t.l, style: { padding: 12, border: "1px solid var(--border)", borderRadius: 8 } }, /* @__PURE__ */ React.createElement(Pill, { tone: t.c }, t.l), /* @__PURE__ */ React.createElement("div", { className: "mono num", style: { fontSize: 18, fontWeight: 800, marginTop: 4 } }, t.from, "\u2013", t.to), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6" } }, t.l === "Past" ? "Avtomatik harakat yo\u2018q" : t.l === "O\u2018rta" ? "Teacher panelida ko\u2018rsatish" : "Intervention talab qilinadi")))))), section === "plagiarism" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Plagiat va AI-yozma signal", actions: /* @__PURE__ */ React.createElement(Toggle, { value: plagOn, onChange: setPlagOn }) }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18, opacity: plagOn ? 1 : 0.5 } }, /* @__PURE__ */ React.createElement("div", { className: "alert red", style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement(I, { name: "alert-octagon" }), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("h4", null, "\u201CMachine flags, human decides\u201D"), /* @__PURE__ */ React.createElement("p", null, "AI bu yerda ayblov beradi emas \u2014 review trigger yaratadi. Talabaning bahosi avtomatik ravishda 0 ga tushirilmaydi va student panelida ko\u2018rinmaydi. Faqat reviewer va teacher ko\u2018radi."))), [
        { l: "Cross-o'quv oqimi cosine similarity", thr: "0.86" },
        { l: "AI-authorship signal (style)", thr: "0.72" },
        { l: "Tashqi manba quote ulushi", thr: "20%" },
        { l: "Code clone (token-based)", thr: "0.78" }
      ].map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--hairline)" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontWeight: 600, fontSize: 13 } }, r.l), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "#8a93a6" } }, "flag porog\u2018i:"), /* @__PURE__ */ React.createElement("input", { className: "input sm mono num", style: { width: 70 }, defaultValue: r.thr }), /* @__PURE__ */ React.createElement(Toggle, { value: true, onChange: () => {
      } }))), /* @__PURE__ */ React.createElement("div", { className: "note", style: { marginTop: 12 } }, "Tasdiqlangan plagiat hodisalari uchun mahsulot qoidasi: ", /* @__PURE__ */ React.createElement("b", null, "academic score \u2192 0, gamification bonus bekor qilinadi"), ". Bu signal emas, qaror.")))), section === "audit" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "AI audit trail", sub: "\xB7 so\u2018nggi yozuvlar", actions: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "download" }, "CSV"), /* @__PURE__ */ React.createElement(Btn, { size: "sm", leftIcon: "external-link" }, "To\u2018liq jurnal")) }), /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Vaqt"), /* @__PURE__ */ React.createElement("th", null, "Model"), /* @__PURE__ */ React.createElement("th", null, "Operatsiya"), /* @__PURE__ */ React.createElement("th", null, "Obyekt"), /* @__PURE__ */ React.createElement("th", null, "Confidence"), /* @__PURE__ */ React.createElement("th", null, "Tasdiqlangan"))), /* @__PURE__ */ React.createElement("tbody", null, [
        { ts: "11:55", m: "v3.1", op: "grade.suggest", obj: "Lab 4 \xB7 D. Karimova", c: 0.82, ok: false },
        { ts: "11:48", m: "v3.1", op: "grade.suggest", obj: "Project \xB7 O. Rasulov", c: 0.91, ok: true },
        { ts: "10:32", m: "v3.1", op: "plagiarism.flag", obj: "Hw 3 \xB7 S. Nazarov", c: 0.74, ok: false },
        { ts: "10:21", m: "v3.1", op: "feedback.draft", obj: "QA \xB7 4 ta savol", c: 0.88, ok: true },
        { ts: "09:14", m: "v3.0", op: "risk.compute", obj: "O'quv oqimi AI-26-1B \xB7 62", c: "\u2014", ok: "info" }
      ].map((r, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", { className: "mono" }, r.ts), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "purple" }, /* @__PURE__ */ React.createElement(I, { name: "sparkles" }), r.m)), /* @__PURE__ */ React.createElement("td", { className: "mono" }, r.op), /* @__PURE__ */ React.createElement("td", null, r.obj), /* @__PURE__ */ React.createElement("td", { className: "mono num" }, r.c), /* @__PURE__ */ React.createElement("td", null, r.ok === true && /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "Teacher tasdiqladi"), r.ok === false && /* @__PURE__ */ React.createElement(Pill, { tone: "amber", icon: "clock" }, "Kutilmoqda"), r.ok === "info" && /* @__PURE__ */ React.createElement(Pill, { tone: "blue" }, "batch")))))))), section === "models" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Modellar va versiyalar", actions: /* @__PURE__ */ React.createElement(Btn, { size: "sm", variant: "primary", leftIcon: "rocket" }, "Yangi versiya deploy") }), /* @__PURE__ */ React.createElement("div", { className: "table-wrap", style: { border: 0, borderRadius: 0 } }, /* @__PURE__ */ React.createElement("table", { className: "t" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Versiya"), /* @__PURE__ */ React.createElement("th", null, "Model"), /* @__PURE__ */ React.createElement("th", null, "Holat"), /* @__PURE__ */ React.createElement("th", null, "Deploy sanasi"), /* @__PURE__ */ React.createElement("th", null, "Bias audit"), /* @__PURE__ */ React.createElement("th", null, "Hisobotlar"))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", { className: "mono" }, "v3.1")), /* @__PURE__ */ React.createElement("td", null, "claude-haiku-4.5"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "green", dot: true }, "active")), /* @__PURE__ */ React.createElement("td", null, "12-May 2026"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "o'tdi \xB7 02-May")), /* @__PURE__ */ React.createElement("td", null, "1,248 grading suggest \xB7 96 risk batch")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", { className: "mono" }, "v3.0")), /* @__PURE__ */ React.createElement("td", null, "claude-haiku-4.5"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "gray", dot: true }, "retired")), /* @__PURE__ */ React.createElement("td", null, "04-Mar 2026"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "green", icon: "check" }, "o'tdi")), /* @__PURE__ */ React.createElement("td", null, "3,128 grading suggest")), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("b", { className: "mono" }, "v2.4")), /* @__PURE__ */ React.createElement("td", null, "gpt-4o-mini (legacy)"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "gray", dot: true }, "archived")), /* @__PURE__ */ React.createElement("td", null, "18-Yan 2026"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(Pill, { tone: "amber", icon: "alert-triangle" }, "qisman")), /* @__PURE__ */ React.createElement("td", null, "\u2014")))))), section === "data" && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHead, { title: "Ma'lumot va PII boshqaruvi" }), /* @__PURE__ */ React.createElement("div", { style: { padding: 18 } }, /* @__PURE__ */ React.createElement("div", { className: "kv-list" }, /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Talabaning shaxsiy ma'lumoti modelga uzatiladi?"), /* @__PURE__ */ React.createElement("span", { className: "v" }, /* @__PURE__ */ React.createElement(Pill, { tone: "red" }, "Yo'q \xB7 majburiy"))), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Topshiriqlar AI training uchun ishlatiladimi?"), /* @__PURE__ */ React.createElement("span", { className: "v" }, /* @__PURE__ */ React.createElement(Pill, { tone: "red" }, "Yo'q"))), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "AI session retention"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "14 kun \xB7 auto-delete")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "Region"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "EU + Asia (data residency)")), /* @__PURE__ */ React.createElement("div", { className: "kv" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, "PII redaction"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "avtomatik \xB7 ism, telefon, email maskirovka qilinadi"))), /* @__PURE__ */ React.createElement("div", { className: "row-div" }), /* @__PURE__ */ React.createElement(Btn, { variant: "danger", leftIcon: "database-off" }, "Hozircha AI ga uzatilgan barcha ma'lumotlarni o\u2018chirish")))));
    }
    window.__PAGES__ = window.__PAGES__ || {};
    Object.assign(window.__PAGES__, { "a-ai-gov": AdminAIGov });
  })();
})();
