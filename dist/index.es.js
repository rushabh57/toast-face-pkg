import e, { useState as D, useEffect as F } from "react";
let s = [], c = [];
const m = {
  subscribe: (r) => (c.push(r), r(s), () => {
    c = c.filter((o) => o !== r);
  }),
  add: (r, o = {}) => {
    const n = Date.now().toString(), l = {
      id: n,
      message: r,
      type: o.type || "default",
      duration: o.duration || 3e3,
      closable: o.closable !== !1,
      loader: o.loader || !1,
      title: o.title || null,
      profileImg: o.profileImg || null,
      customIcon: o.customIcon || null,
      // ✅ new
      bgColor: o.bgColor || null,
      // ✅ add this
      textColor: o.textColor || null
      // ✅ and this
    };
    s.push(l), c.forEach((d) => d([...s])), l.duration > 0 && setTimeout(() => m.remove(n), l.duration);
  },
  remove: (r) => {
    s = s.filter((o) => o.id !== r), c.forEach((o) => o([...s]));
  }
}, b = {
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  default: "#333",
  custom: "#6366f1"
}, v = {
  success: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("path", { d: "M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z", fill: "#292D32" })),
  warning: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("path", { d: "M12 2L2 22H22L12 2Z", fill: "#f59e0b" })),
  error: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "#ef4444" }), /* @__PURE__ */ e.createElement("line", { x1: "8", y1: "8", x2: "16", y2: "16", stroke: "#fff", strokeWidth: "2" }), /* @__PURE__ */ e.createElement("line", { x1: "16", y1: "8", x2: "8", y2: "16", stroke: "#fff", strokeWidth: "2" })),
  default: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("circle", { cx: "12", cy: "12", r: "10", stroke: "#121923", strokeWidth: "2" }))
};
function Z({ position: r = "top-right", animation: o = "popup", stack: n = "queue", darkMode: l = !1, borderRadius: d = 12, wrap: u = !0, loaderDuration: x = 3e3 }) {
  const [g, E] = D([]);
  F(() => m.subscribe(E), []);
  const p = {
    "top-right": { right: "1rem" },
    "top-left": { left: "1rem" },
    "bottom-right": { right: "1rem" },
    "bottom-left": { left: "1rem" }
  }[r], C = g.some((i) => i.type !== "notification"), I = {
    position: "fixed",
    zIndex: 9999,
    ...p,
    [r.startsWith("top") ? "top" : "bottom"]: C ? "6rem" : "1rem"
  }, S = {
    position: "fixed",
    zIndex: 9999,
    ...p,
    [r.startsWith("top") ? "top" : "bottom"]: "1rem"
  }, k = g.filter((i) => i.type === "notification"), T = g.filter((i) => i.type !== "notification"), h = (i) => {
    const w = r.startsWith("bottom"), W = w ? [...i] : [...i].reverse();
    return /* @__PURE__ */ e.createElement("div", { style: { position: "relative", width: 320 } }, W.map((t, a) => {
      const L = n === "queue" ? a * 10 : n === "block" ? a * 80 : 0, $ = n === "queue" ? 1 - a * 0.05 : 1, z = n === "queue" ? 1 - a * 0.1 : 1, B = t.bgColor || (t.type === "notification" ? l ? "#1f2937" : "#fff" : b[t.type] || b.default), y = t.textColor || (t.type === "notification" ? l ? "#fff" : "#000" : "white"), q = {
        background: B,
        color: y,
        padding: t.type === "notification" ? "1rem" : "0.75rem 1rem",
        borderRadius: d,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 300,
        gap: "1rem",
        border: t.type === "notification" ? "1px solid #e5e7eb" : "none",
        position: "absolute",
        [w ? "bottom" : "top"]: `${L}px`,
        left: 0,
        right: 0,
        margin: "0 auto",
        transform: `scale(${$})`,
        opacity: z,
        zIndex: 9999 - a,
        animation: `${o} 0.3s ease`,
        transition: "all 0.3s ease",
        pointerEvents: "auto"
      };
      return /* @__PURE__ */ e.createElement("div", { key: t.id, style: q }, /* @__PURE__ */ e.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" } }, /* @__PURE__ */ e.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: u ? "normal" : "nowrap", overflow: u ? "visible" : "hidden", textOverflow: u ? "unset" : "ellipsis" } }, t.type === "notification" && t.profileImg ? null : t.customIcon || v[t.type] || v.default, t.type === "notification" && /* @__PURE__ */ e.createElement(
        "img",
        {
          src: t.profileImg || "https://www.svgrepo.com/show/527946/user-circle.svg",
          alt: "",
          style: { width: 40, height: 40, borderRadius: "50%" }
        }
      ), /* @__PURE__ */ e.createElement("div", null, t.type === "notification" ? /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", { style: { fontWeight: 600 } }, t.title || "Notification"), /* @__PURE__ */ e.createElement("div", { style: { fontSize: "0.875rem", opacity: 0.8 } }, t.message)) : t.message)), t.loader && /* @__PURE__ */ e.createElement("div", { style: { marginTop: 4, height: 4, background: "#fff3", width: "100%", borderRadius: 2 } }, /* @__PURE__ */ e.createElement("div", { style: {
        width: "100%",
        height: "100%",
        background: "#fff",
        animation: `loaderAnim-${t.id} ${x}ms linear forwards`
      } }))), t.closable && /* @__PURE__ */ e.createElement("button", { onClick: () => m.remove(t.id), style: {
        background: "transparent",
        color: y,
        fontSize: 16,
        border: "none",
        cursor: "pointer"
      } }, "×"), /* @__PURE__ */ e.createElement("style", null, `
                @keyframes loaderAnim-${t.id} {
                  from { width: 100% }
                  to { width: 0% }
                }
              `));
    }));
  };
  return /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", { style: I }, h(k)), /* @__PURE__ */ e.createElement("div", { style: S }, h(T)));
}
function f(r) {
  return (o, n = {}) => {
    m.add(o, { ...n, type: r });
  };
}
const M = {
  success: f("success"),
  error: f("error"),
  warning: f("warning"),
  info: f("default"),
  custom: f("custom"),
  notification: (r, o = {}) => m.add(r, { ...o, type: "notification" })
  // notification variant
};
export {
  Z as ToastFace,
  M as toast
};
