(() => {
  (() => {
    const { useState, useEffect, useMemo, useRef, Fragment } = React;
    function I({ name, ...rest }) {
      return /* @__PURE__ */ React.createElement("i", { className: `ti ti-${name}`, ...rest });
    }
    function Card({ className = "", children, ...rest }) {
      return /* @__PURE__ */ React.createElement("div", { className: `card ${className}`, ...rest }, children);
    }
    function CardHead({ title, sub, actions, count }) {
      return /* @__PURE__ */ React.createElement("div", { className: "card-head" }, /* @__PURE__ */ React.createElement("h3", null, title, typeof count === "number" && /* @__PURE__ */ React.createElement("span", { className: "muted" }, "(", count, ")"), sub && /* @__PURE__ */ React.createElement("span", { className: "muted" }, sub)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, actions));
    }
    function Pill({ tone = "gray", dot, icon, children }) {
      return /* @__PURE__ */ React.createElement("span", { className: `pill pill-${tone} ${dot ? "pill-dot" : ""}` }, icon && /* @__PURE__ */ React.createElement(I, { name: icon }), " ", children);
    }
    function Bar({ value = 0, tone = "blue", thin, thick }) {
      return /* @__PURE__ */ React.createElement("div", { className: `bar ${thin ? "thin" : ""} ${thick ? "thick" : ""} ${tone}` }, /* @__PURE__ */ React.createElement("div", { style: { width: Math.max(0, Math.min(100, value)) + "%" } }));
    }
    function Btn({ variant = "default", size, children, leftIcon, rightIcon, ...rest }) {
      const cls = ["btn"];
      if (variant === "primary") cls.push("btn-primary");
      if (variant === "ghost") cls.push("btn-ghost");
      if (variant === "danger") cls.push("btn-danger");
      if (variant === "success") cls.push("btn-success");
      if (variant === "amber") cls.push("btn-amber");
      if (size === "sm") cls.push("btn-sm");
      if (size === "xs") cls.push("btn-xs");
      if (size === "icon") cls.push("btn-icon");
      return /* @__PURE__ */ React.createElement("button", { className: cls.join(" "), ...rest }, leftIcon && /* @__PURE__ */ React.createElement(I, { name: leftIcon }), children, rightIcon && /* @__PURE__ */ React.createElement(I, { name: rightIcon }));
    }
    function Avatar({ name, tone = "b1", size }) {
      const initials = (name || "?").split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]).join("").toUpperCase();
      return /* @__PURE__ */ React.createElement("span", { className: `av ${tone} ${size === "sm" ? "sm" : size === "lg" ? "lg" : size === "xl" ? "xl" : ""}` }, initials);
    }
    function Stat({ tone = "blue", label, value, unit, sub, trend }) {
      return /* @__PURE__ */ React.createElement("div", { className: `stat ${tone === "blue" ? "" : tone}` }, /* @__PURE__ */ React.createElement("div", { className: "stat-accent" }), /* @__PURE__ */ React.createElement("div", { className: "stat-label" }, label), /* @__PURE__ */ React.createElement("div", { className: "stat-val num" }, value, unit && /* @__PURE__ */ React.createElement("span", { className: "unit" }, unit)), /* @__PURE__ */ React.createElement("div", { className: "stat-sub" }, trend && /* @__PURE__ */ React.createElement("span", { className: `stat-trend ${trend.dir}` }, /* @__PURE__ */ React.createElement(I, { name: trend.dir === "up" ? "trending-up" : trend.dir === "down" ? "trending-down" : "minus" }), trend.label), sub));
    }
    function Seg({ value, onChange, options }) {
      return /* @__PURE__ */ React.createElement("div", { className: "seg" }, options.map((o) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: o.value,
          className: `seg-btn ${value === o.value ? "active" : ""}`,
          onClick: () => onChange(o.value)
        },
        o.icon && /* @__PURE__ */ React.createElement(I, { name: o.icon }),
        o.label
      )));
    }
    function Tabs({ value, onChange, items }) {
      return /* @__PURE__ */ React.createElement("div", { className: "tabs" }, items.map((it) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: it.value,
          className: `tab ${value === it.value ? "active" : ""}`,
          onClick: () => onChange(it.value)
        },
        it.icon && /* @__PURE__ */ React.createElement(I, { name: it.icon }),
        it.label,
        typeof it.count === "number" && /* @__PURE__ */ React.createElement("span", { className: "count num" }, it.count)
      )));
    }
    function Chip({ active, icon, children, onClick, onClear }) {
      return /* @__PURE__ */ React.createElement("div", { className: `chip ${active ? "active" : ""}`, onClick }, icon && /* @__PURE__ */ React.createElement(I, { name: icon }), children, active && onClear && /* @__PURE__ */ React.createElement(I, { name: "x", className: "x", onClick: (e) => {
        e.stopPropagation();
        onClear();
      } }));
    }
    function Spark({ data, tone = "blue", height = 36 }) {
      const max = Math.max(1, ...data);
      return /* @__PURE__ */ React.createElement("div", { className: "spark", style: { height } }, data.map((v, i) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: i,
          className: tone === "blue" ? "" : tone,
          style: { height: Math.max(6, v / max * 100) + "%" }
        }
      )));
    }
    function People({ list, max = 4, size = "sm" }) {
      const overflow = list.length > max ? list.length - max : 0;
      return /* @__PURE__ */ React.createElement("div", { className: "people" }, list.slice(0, max).map((p, i) => /* @__PURE__ */ React.createElement(Avatar, { key: i, name: p.name, tone: p.tone || "b" + ((i + 1) % 8 || 8), size })), overflow > 0 && /* @__PURE__ */ React.createElement("span", { className: `av more ${size === "sm" ? "sm" : ""}` }, "+", overflow));
    }
    function Heat({ value }) {
      const cls = value <= 0 ? "" : value === 1 ? "l1" : value === 2 ? "l2" : value === 3 ? "l3" : "l4";
      return /* @__PURE__ */ React.createElement("span", { className: `heat ${cls}` });
    }
    function Modal({ open, onClose, title, footer, children, width }) {
      if (!open) return null;
      return /* @__PURE__ */ React.createElement("div", { className: "modal-mask", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "modal", style: width ? { width } : null, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "modal-head" }, /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement(Btn, { variant: "ghost", size: "icon", onClick: onClose }, /* @__PURE__ */ React.createElement(I, { name: "x" }))), /* @__PURE__ */ React.createElement("div", { className: "modal-body" }, children), footer && /* @__PURE__ */ React.createElement("div", { className: "modal-foot" }, footer)));
    }
    function Drawer({ open, onClose, title, footer, children }) {
      if (!open) return null;
      return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "drawer-mask", onClick: onClose }), /* @__PURE__ */ React.createElement("aside", { className: "drawer", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "drawer-head" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: 15, fontWeight: 700 } }, title)), /* @__PURE__ */ React.createElement(Btn, { variant: "ghost", size: "icon", onClick: onClose }, /* @__PURE__ */ React.createElement(I, { name: "x" }))), /* @__PURE__ */ React.createElement("div", { className: "drawer-body" }, children), footer && /* @__PURE__ */ React.createElement("div", { className: "drawer-foot" }, footer)));
    }
    function Donut({ size = 92, stroke = 12, value = 0, max = 100, tone = "#1f6feb", trackTone = "#eef1f7", center }) {
      const r = (size - stroke) / 2;
      const c = 2 * Math.PI * r;
      const pct = Math.max(0, Math.min(1, value / max));
      return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: size, height: size } }, /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}` }, /* @__PURE__ */ React.createElement("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: trackTone, strokeWidth: stroke }), /* @__PURE__ */ React.createElement(
        "circle",
        {
          cx: size / 2,
          cy: size / 2,
          r,
          fill: "none",
          stroke: tone,
          strokeWidth: stroke,
          strokeDasharray: c,
          strokeDashoffset: c - c * pct,
          strokeLinecap: "round",
          transform: `rotate(-90 ${size / 2} ${size / 2})`
        }
      )), /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        textAlign: "center"
      } }, center));
    }
    function LineChart({ data, height = 140, color = "#1f6feb", fill = "rgba(31,111,235,0.10)", grid = true, ariaLabel }) {
      const pts = (data || []).map((d, i) => typeof d === "number" ? { x: i, y: d } : d);
      const width = 100;
      if (!pts.length) return null;
      const ys = pts.map((p) => p.y);
      const min = Math.min(...ys), max = Math.max(...ys);
      const range = max - min || 1;
      const xMax = pts.length - 1;
      const path = pts.map((p, i) => {
        const x = i / xMax * width;
        const y = 100 - (p.y - min) / range * 90 - 5;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      }).join(" ");
      const area = `${path} L ${width} 100 L 0 100 Z`;
      return /* @__PURE__ */ React.createElement(
        "svg",
        {
          width: "100%",
          height,
          viewBox: "0 0 100 100",
          preserveAspectRatio: "none",
          role: "img",
          "aria-label": ariaLabel
        },
        grid && [25, 50, 75].map((y) => /* @__PURE__ */ React.createElement("line", { key: y, x1: "0", x2: "100", y1: y, y2: y, stroke: "#eef1f7", strokeWidth: "0.4" })),
        /* @__PURE__ */ React.createElement("path", { d: area, fill }),
        /* @__PURE__ */ React.createElement("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.4", strokeLinejoin: "round", strokeLinecap: "round" })
      );
    }
    function BarChart({ data, height = 140, color = "#1f6feb", labels }) {
      const max = Math.max(1, ...data);
      return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 6, height, paddingBottom: 18, position: "relative" } }, data.map((v, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 6, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: {
        width: "70%",
        height: v / max * 100 + "%",
        background: `linear-gradient(180deg, ${color}66, ${color})`,
        borderRadius: "5px 5px 0 0",
        position: "relative",
        minHeight: 4
      } }), labels && /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        bottom: -16,
        fontSize: 10.5,
        color: "#8a93a6",
        fontWeight: 600
      } }, labels[i]))));
    }
    function GroupBarChart({ groups, series, height = 160, labels }) {
      const flat = groups.flat();
      const max = Math.max(1, ...flat);
      return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 14, height, paddingBottom: 22 } }, groups.map((g, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, display: "flex", gap: 3, alignItems: "flex-end", height: "100%", position: "relative" } }, g.map((v, j) => /* @__PURE__ */ React.createElement("div", { key: j, style: {
        flex: 1,
        height: v / max * 100 + "%",
        background: series[j].color,
        borderRadius: "4px 4px 0 0",
        minHeight: 3
      }, title: `${series[j].label}: ${v}` })), labels && /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        bottom: -18,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10.5,
        color: "#8a93a6",
        fontWeight: 600
      } }, labels[i]))));
    }
    function Legend({ items }) {
      return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" } }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#475569", fontWeight: 600 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, borderRadius: 3, background: it.color, display: "inline-block" } }), it.label)));
    }
    function Toolbar({ children }) {
      return /* @__PURE__ */ React.createElement("div", { className: "toolbar" }, children);
    }
    function Check({ value, onChange }) {
      return /* @__PURE__ */ React.createElement("span", { className: `check ${value ? "on" : ""}`, onClick: () => onChange && onChange(!value) });
    }
    Object.assign(window, {
      I,
      Card,
      CardHead,
      Pill,
      Bar,
      Btn,
      Avatar,
      Stat,
      Seg,
      Tabs,
      Chip,
      Spark,
      People,
      Heat,
      Modal,
      Drawer,
      Donut,
      LineChart,
      BarChart,
      GroupBarChart,
      Legend,
      Toolbar,
      Check
    });
  })();
})();
