import e, { useState as X, useEffect as Y } from "react";
let i = [], c = [];
const m = {
  subscribe: (r) => (c.push(r), r(i), () => {
    c = c.filter((o) => o !== r);
  }),
  add: (r, o = {}) => {
    const a = Date.now().toString(), s = {
      id: a,
      message: r,
      type: o.type || "default",
      duration: o.duration || 3e3,
      closable: o.closable !== !1,
      loader: o.loader || !1,
      title: o.title || null,
      profileImg: o.profileImg || null,
      customIcon: o.customIcon || null,
      bgColor: o.bgColor || null,
      textColor: o.textColor || null
    };
    i.push(s), c.forEach((d) => d([...i])), s.duration > 0 && setTimeout(() => m.remove(a), s.duration);
  },
  remove: (r) => {
    i = i.filter((o) => o.id !== r), c.forEach((o) => o([...i]));
  }
}, x = {
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f59e0b",
  default: "#333",
  custom: "#6366f1"
}, b = {
  success: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("path", { d: "M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z", fill: "#292D32" })),
  warning: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("path", { d: "M12 2L2 22H22L12 2Z", fill: "#f59e0b" })),
  error: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "#ef4444" }), /* @__PURE__ */ e.createElement("line", { x1: "8", y1: "8", x2: "16", y2: "16", stroke: "#fff", strokeWidth: "2" }), /* @__PURE__ */ e.createElement("line", { x1: "16", y1: "8", x2: "8", y2: "16", stroke: "#fff", strokeWidth: "2" })),
  default: /* @__PURE__ */ e.createElement("svg", { viewBox: "0 0 24 24", fill: "none", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ e.createElement("circle", { cx: "12", cy: "12", r: "10", stroke: "#121923", strokeWidth: "2" }))
};
function F({ position: r = "top-right", animation: o = "popup", stack: a = "queue", darkMode: s = !1, borderRadius: d = 12, wrap: p = !0, loaderDuration: v = 3e3 }) {
  const [u, E] = X([]);
  Y(() => m.subscribe(E), []);
  const y = {
    "top-right": { right: "1rem" },
    "top-left": { left: "1rem" },
    "bottom-right": { right: "1rem" },
    "bottom-left": { left: "1rem" }
  }[r], C = u.some((n) => n.type !== "notification"), k = {
    position: "fixed",
    zIndex: 9999,
    ...y,
    [r.startsWith("top") ? "top" : "bottom"]: C ? "6rem" : "1rem"
  }, I = {
    position: "fixed",
    zIndex: 9999,
    ...y,
    [r.startsWith("top") ? "top" : "bottom"]: "1rem"
  }, S = u.filter((n) => n.type === "notification"), T = u.filter((n) => n.type !== "notification"), g = (n) => {
    const h = r.startsWith("bottom"), W = h ? [...n] : [...n].reverse();
    return /* @__PURE__ */ e.createElement("div", { style: { position: "relative", width: 320 } }, W.map((t, l) => {
      const L = a === "queue" ? l * 10 : a === "block" ? l * 80 : 0, z = a === "queue" ? 1 - l * 0.05 : 1, $ = a === "queue" ? 1 - l * 0.1 : 1, q = t.bgColor || (t.type === "notification" ? s ? "#1f2937" : "#fff" : x[t.type] || x.default), w = t.textColor || (t.type === "notification" ? s ? "#fff" : "#000" : "white"), B = {
        background: q,
        color: w,
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
        [h ? "bottom" : "top"]: `${L}px`,
        left: 0,
        right: 0,
        margin: "0 auto",
        transform: `scale(${z})`,
        opacity: $,
        zIndex: 9999 - l,
        animation: `${o} 0.3s ease`,
        transition: "all 0.3s ease",
        pointerEvents: "auto"
      };
      return /* @__PURE__ */ e.createElement("div", { key: t.id, style: B }, /* @__PURE__ */ e.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" } }, /* @__PURE__ */ e.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: p ? "normal" : "nowrap", overflow: p ? "visible" : "hidden", textOverflow: p ? "unset" : "ellipsis" } }, t.type === "notification" && t.profileImg ? null : t.customIcon || b[t.type] || b.default, t.type === "notification" && /* @__PURE__ */ e.createElement(
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
        animation: `loaderAnim-${t.id} ${v}ms linear forwards`
      } }))), t.closable && /* @__PURE__ */ e.createElement("button", { onClick: () => m.remove(t.id), style: {
        background: "transparent",
        color: w,
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
  return /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", { style: k }, g(S)), /* @__PURE__ */ e.createElement("div", { style: I }, g(T)), /* @__PURE__ */ e.createElement("style", null, `
        @keyframes loader {
          from { width: 100% }
          to { width: 0% }
        }

        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }

        @keyframes slide-down {
          from { transform: translateY(-30px); opacity: 0 }
          to { transform: translateY(0); opacity: 1 }
        }

        @keyframes slide-left {
          from { transform: translateX(30px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }

        @keyframes slide-right {
          from { transform: translateX(-30px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }

        @keyframes popup {
          0% { transform: scale(0.9); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }

        @keyframes squeezy {
          0% { transform: scale(0.8, 1.2); opacity: 0 }
          50% { transform: scale(1.1, 0.9); opacity: 0.8 }
          100% { transform: scale(1); opacity: 1 }
        }
      `));
}
function f(r) {
  return (o, a = {}) => {
    m.add(o, { ...a, type: r });
  };
}
const R = {
  success: f("success"),
  error: f("error"),
  warning: f("warning"),
  info: f("default"),
  custom: f("custom"),
  notification: (r, o = {}) => m.add(r, { ...o, type: "notification" })
};
export {
  F as ToastFace,
  R as toast
};
