(() => {
  (() => {
    const { useState, useRef, useEffect } = React;
    const SUGGESTIONS = {
      student: [
        "Bugun nima qilishim kerak?",
        "Transformer arxitekturasini sodda tushuntirib bering",
        "Sentiment analyzer loyihasiga qanday boshlash kerak?",
        "Hw 4 muddatini kechiktirsa bo'ladimi?"
      ],
      teacher: [
        "Bugun necha topshiriq tekshirilishi kerak?",
        "ML-26-2A guruhda risk ostidagi kim?",
        "Lab 4 uchun rubric drafti tuzib bering",
        "Davomatda 80% dan past talabalarni ro'yxatlang"
      ],
      admin: [
        "Bu hafta O'quv oqimi completion qanday?",
        "Eng past natija ko'rsatgan kurs qaysi?",
        "AI grading override qoidasi qanday?",
        "Audit log misolini ko'rsating"
      ]
    };
    const ROLE_SYSTEM = {
      student: `You are AIRI Tutor, an AI study assistant inside the AIRI Training LMS. The user is "Aziza Mahmudova", a student in the Spring '26 NLP-26 o'quv oqimi, currently studying NLP, AI Fundamentals and ML in Production.

Behavior:
- Respond in Uzbek (Latin script) unless asked otherwise. Keep responses concise: 2\u20135 short paragraphs or a tight list.
- Be encouraging, never condescending. Praise effort, not just talent.
- For academic questions, give intuition first, then a precise definition, then a small example.
- If asked to do an assignment FOR the student, refuse politely and instead break the task into 3 steps and ask what they have tried.
- You do NOT have access to live LMS data \u2014 when asked about specific grades, schedules or risks, say so and direct them to the gradebook/schedule page.
- Never invent grades, deadlines, or trainer quotes.`,
      teacher: `You are AIRI Coach, an AI operations assistant for an LMS instructor. The user is "Aziza Tursunova", lead trainer of the AI/ML track. She manages o'quv oqimlari AI-26-1A, AI-26-1B, NLP-26 and ML-26-2A.

Behavior:
- Respond in Uzbek (Latin script). Be crisp and operational \u2014 bullet lists are fine.
- Suggestions for grading must always be rubric-based with cited evidence and a clear teacher action ("approve / override / request more info").
- Risk language MUST be supportive, not punitive \u2014 frame it as "early help signal", not "blacklist".
- When asked about a specific student/grade/o'quv oqimi, remind the user you cannot access live data and suggest the relevant page.
- Never write a final grade or send a message on the teacher's behalf without explicit confirmation.`,
      admin: `You are AIRI Governance, an AI assistant for the LMS super admin. The user is "Rustam Abdullaev". He sets organization-wide policy.

Behavior:
- Respond in Uzbek (Latin script). Be precise, governance-minded, and cite the relevant LMS area.
- For any change to AI policy, RBAC, grading weights, certificate rules, or audit retention \u2014 recommend explicitly that the change goes through versioning + audit log.
- Reference standards by name when relevant (NIST AI RMF, UNESCO GenAI guidance, WCAG 2.2 AA, OWASP ASVS, Open Badges 3.0).
- Do not propose actions that bypass human review.`
    };
    function ChatbotFab({ role }) {
      const [open, setOpen] = useState(false);
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState("");
      const [busy, setBusy] = useState(false);
      const scrollerRef = useRef(null);
      useEffect(() => {
        try {
          const raw = localStorage.getItem("airi-chat-" + role);
          setMessages(raw ? JSON.parse(raw) : []);
        } catch {
          setMessages([]);
        }
      }, [role]);
      useEffect(() => {
        try {
          localStorage.setItem("airi-chat-" + role, JSON.stringify(messages));
        } catch {
        }
        if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
      }, [messages, role]);
      const titles = {
        student: { name: "AIRI Tutor", sub: "Sizning shaxsiy o'qituvchingiz", color: "#1f6feb" },
        teacher: { name: "AIRI Coach", sub: "Operatsion yordamchi", color: "#7c3aed" },
        admin: { name: "AIRI Governance", sub: "Governance yordamchisi", color: "#0c1733" }
      };
      const t = titles[role] || titles.student;
      async function send(text) {
        const content = (text ?? input).trim();
        if (!content || busy) return;
        setInput("");
        const userMsg = { role: "user", content };
        const next = [...messages, userMsg];
        setMessages(next);
        setBusy(true);
        try {
          const reply = await window.claude.complete({
            messages: [
              { role: "user", content: `[SYSTEM INSTRUCTIONS]
${ROLE_SYSTEM[role] || ROLE_SYSTEM.student}

[CONVERSATION]
` + next.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n") + "\n\nASSISTANT:" }
            ]
          });
          setMessages((m) => [...m, { role: "assistant", content: reply }]);
        } catch (e) {
          setMessages((m) => [...m, { role: "assistant", content: "Kechirasiz, hozir javob bera olmadim. Iltimos, biroz keyin qayta urinib ko'ring.", error: true }]);
        } finally {
          setBusy(false);
        }
      }
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setOpen((o) => !o),
          title: "AI yordamchi",
          style: {
            position: "fixed",
            right: 22,
            bottom: 22,
            zIndex: 50,
            width: 56,
            height: 56,
            borderRadius: 999,
            border: 0,
            cursor: "pointer",
            background: `linear-gradient(135deg, ${t.color}, #1d4ed8)`,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 16px 40px rgba(31,111,235,0.45), 0 4px 14px rgba(15,23,42,0.18)",
            transform: open ? "scale(0.92)" : "scale(1)",
            transition: "transform 0.2s"
          }
        },
        /* @__PURE__ */ React.createElement("i", { className: `ti ti-${open ? "x" : "sparkles"}`, style: { fontSize: 26 } }),
        !open && messages.length === 0 && /* @__PURE__ */ React.createElement("span", { style: {
          position: "absolute",
          top: -3,
          right: -3,
          width: 12,
          height: 12,
          borderRadius: 999,
          background: "#fbbf24",
          border: "2px solid #fff"
        } })
      ), open && /* @__PURE__ */ React.createElement("div", { style: {
        position: "fixed",
        right: 22,
        bottom: 92,
        zIndex: 50,
        width: "min(420px, calc(100vw - 44px))",
        height: "min(620px, calc(100vh - 140px))",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 24px 60px rgba(15,23,42,0.24), 0 4px 14px rgba(15,23,42,0.08)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "drawerIn 0.22s ease"
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        padding: 16,
        background: `linear-gradient(135deg, ${t.color} 0%, #1e3a8a 100%)`,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "relative",
        overflow: "hidden"
      } }, /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        opacity: 0.16,
        backgroundImage: "radial-gradient(circle at 80% 20%, #fff 0 2px, transparent 3px), radial-gradient(circle at 30% 70%, #fff 0 1.5px, transparent 2px)",
        backgroundSize: "100px 100px"
      } }), /* @__PURE__ */ React.createElement("div", { style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: "rgba(255,255,255,0.18)",
        display: "grid",
        placeItems: "center",
        border: "1px solid rgba(255,255,255,0.25)",
        position: "relative"
      } }, /* @__PURE__ */ React.createElement("i", { className: "ti ti-sparkles", style: { fontSize: 18 } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", letterSpacing: -0.2 } }, t.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, opacity: 0.8 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 7, height: 7, borderRadius: 999, background: "#4ade80", marginRight: 6 } }), t.sub)), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => {
            setMessages([]);
            localStorage.removeItem("airi-chat-" + role);
          },
          title: "Yangi suhbat",
          style: { background: "rgba(255,255,255,0.12)", color: "#fff", border: 0, padding: 6, borderRadius: 7, cursor: "pointer", display: "grid", placeItems: "center" }
        },
        /* @__PURE__ */ React.createElement("i", { className: "ti ti-refresh", style: { fontSize: 14 } })
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setOpen(false),
          style: { background: "rgba(255,255,255,0.12)", color: "#fff", border: 0, padding: 6, borderRadius: 7, cursor: "pointer", display: "grid", placeItems: "center" }
        },
        /* @__PURE__ */ React.createElement("i", { className: "ti ti-x", style: { fontSize: 14 } })
      )), /* @__PURE__ */ React.createElement("div", { ref: scrollerRef, style: { flex: 1, padding: 16, overflowY: "auto", background: "var(--bg)" } }, messages.length === 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 6 } }, "Salom! \u{1F44B}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "#475569", lineHeight: 1.5 } }, role === "student" ? "Men sizning shaxsiy AI tutoringizman. Kurs mavzulari, topshiriqlar, yoki tushunmagan joylar bo'yicha so'rashingiz mumkin." : role === "teacher" ? "Men sizning operatsion yordamchingizman. Tekshirish, davomat, risk paneli yoki rubric bo'yicha yordam bera olaman." : "Men governance yordamchisiman. Politika, audit, AI sozlamalari va standartlar bo'yicha maslahat beraman.")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8a93a6", fontWeight: 700, letterSpacing: 0.05, textTransform: "uppercase", marginBottom: 8 } }, "Boshlash uchun"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 6 } }, (SUGGESTIONS[role] || SUGGESTIONS.student).map((s, i) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: i,
          onClick: () => send(s),
          style: {
            textAlign: "left",
            padding: "10px 12px",
            borderRadius: 10,
            background: "#fff",
            border: "1px solid var(--border)",
            cursor: "pointer",
            fontSize: 12.5,
            color: "#475569",
            display: "flex",
            alignItems: "center",
            gap: 8
          }
        },
        /* @__PURE__ */ React.createElement("i", { className: "ti ti-arrow-up-right", style: { color: "#8a93a6" } }),
        s
      )))), messages.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
        display: "flex",
        gap: 10,
        marginBottom: 12,
        flexDirection: m.role === "user" ? "row-reverse" : "row"
      } }, m.role === "assistant" && /* @__PURE__ */ React.createElement("div", { style: {
        width: 30,
        height: 30,
        borderRadius: 999,
        background: `linear-gradient(135deg, ${t.color}, #1d4ed8)`,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        flexShrink: 0
      } }, /* @__PURE__ */ React.createElement("i", { className: "ti ti-sparkles", style: { fontSize: 14 } })), /* @__PURE__ */ React.createElement("div", { style: {
        maxWidth: "78%",
        padding: "10px 14px",
        borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        background: m.role === "user" ? "var(--accent)" : "#fff",
        color: m.role === "user" ? "#fff" : m.error ? "var(--red-ink)" : "#0f172a",
        border: m.role === "user" ? "1px solid var(--accent-2)" : m.error ? "1px solid var(--red-mid)" : "1px solid var(--border)",
        fontSize: 13,
        lineHeight: 1.55,
        whiteSpace: "pre-wrap"
      } }, m.content))), busy && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: {
        width: 30,
        height: 30,
        borderRadius: 999,
        background: `linear-gradient(135deg, ${t.color}, #1d4ed8)`,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        flexShrink: 0
      } }, /* @__PURE__ */ React.createElement("i", { className: "ti ti-sparkles", style: { fontSize: 14 } })), /* @__PURE__ */ React.createElement("div", { style: {
        padding: "10px 14px",
        borderRadius: "14px 14px 14px 4px",
        background: "#fff",
        border: "1px solid var(--border)",
        fontSize: 13,
        color: "#8a93a6",
        display: "flex",
        gap: 4
      } }, /* @__PURE__ */ React.createElement("span", { className: "loading-dot" }, "o'ylayapman")))), /* @__PURE__ */ React.createElement("div", { style: { padding: 12, borderTop: "1px solid var(--border)", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        border: "1px solid var(--border2)",
        borderRadius: 12,
        padding: 8,
        background: "var(--bg4)"
      } }, /* @__PURE__ */ React.createElement(
        "textarea",
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          },
          placeholder: role === "student" ? "Savol bering yoki mavzuni so'rang\u2026" : role === "teacher" ? "Operatsion savol bering\u2026" : "Politika yoki audit bo'yicha\u2026",
          rows: 1,
          style: {
            flex: 1,
            resize: "none",
            border: 0,
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font)",
            fontSize: 13,
            color: "#0f172a",
            padding: "4px 6px",
            minHeight: 22,
            maxHeight: 120
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => send(),
          disabled: busy || !input.trim(),
          style: {
            border: 0,
            cursor: busy || !input.trim() ? "default" : "pointer",
            background: busy || !input.trim() ? "var(--bg3)" : `linear-gradient(135deg, ${t.color}, #1d4ed8)`,
            color: busy || !input.trim() ? "var(--text3)" : "#fff",
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            transition: "all 0.15s"
          }
        },
        /* @__PURE__ */ React.createElement("i", { className: "ti ti-send", style: { fontSize: 15 } })
      )), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: "#b0b7c5", marginTop: 6, textAlign: "center" } }, "AI taklif bera oladi, lekin yakuniy qaror doim sizda. Suhbatlar audit jurnaliga yoziladi."))));
    }
    window.ChatbotFab = ChatbotFab;
  })();
})();
