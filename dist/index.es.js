import n, { useState as C, useRef as I, useEffect as B } from "react";
import { Bell as F, X as re, CheckCircle as ne, XCircle as oe, AlertTriangle as se, Info as ie } from "lucide-react";
let a = [], R = [], P = [], ae = 3;
function X() {
  P.forEach((t) => t([...a]));
}
function ce() {
  return Math.random().toString(36).substr(2, 9);
}
function j() {
  if (a.length >= ae || R.length === 0) return;
  const t = R.shift();
  t.startTime = Date.now(), t.remaining = t.duration, t.isPaused = !1, t.timeoutId = setTimeout(() => {
    z(t.id), j();
  }, t.remaining), a = [...a, t], X();
}
function le(t) {
  const r = a.find((f) => f.id === t);
  if (!r || r.isPaused) return;
  const o = Date.now() - r.startTime;
  r.remaining -= o, r.isPaused = !0, clearTimeout(r.timeoutId);
}
function ue(t) {
  const r = a.find((o) => o.id === t);
  !r || !r.isPaused || (r.startTime = Date.now(), r.timeoutId = setTimeout(() => z(r.id), r.remaining), r.isPaused = !1);
}
function z(t) {
  const r = a.find((o) => o.id === t);
  r && clearTimeout(r.timeoutId), a = a.map(
    (o) => o.id === t ? { ...o, exiting: !0 } : o
  ), X(), setTimeout(() => {
    a = a.filter((o) => o.id !== t), X(), j();
  }, 400);
}
function fe(t) {
  return a.find((r) => r.id === t);
}
function x(t) {
  const r = ce(), o = {
    id: r,
    duration: t.duration || 3e3,
    type: t.type || "info",
    message: t.message || "",
    icon: t.icon || null,
    subMessage: t.subMessage || "",
    body: t.body || "",
    loader: t.loader || !1,
    closable: t.closable ?? !0,
    image: t.image || null,
    startTime: null,
    remaining: null,
    timeoutId: null,
    isPaused: !1
  };
  return R.push(o), j(), r;
}
function me() {
  a.forEach((t) => clearTimeout(t.timeoutId)), a = [], R = [], X();
}
const l = {
  success: (t, r = {}) => x({ type: "success", message: t, ...r }),
  error: (t, r = {}) => x({ type: "error", message: t, ...r }),
  warning: (t, r = {}) => x({ type: "warning", message: t, ...r }),
  info: (t, r = {}) => x({ type: "info", message: t, ...r }),
  custom: (t, r = {}) => x({ type: "custom", message: t, ...r }),
  notification: (t = {}) => x({ type: "notification", ...t }),
  remove: z,
  clear: me,
  subscribe: (t) => (P.push(t), t([...a]), () => {
    P = P.filter((r) => r !== t);
  }),
  pause: le,
  resume: ue,
  get: fe
  // ✅ Add this line
}, d = {
  success: "#16a34a",
  error: "#dc2626",
  warning: "#f59e0b",
  info: "#2563eb",
  default: "#334155",
  custom: "#7c3aed",
  notification: "#0ea5e9"
};
function S(t, r = 0.3) {
  const o = parseInt(t.slice(1, 3), 16), f = parseInt(t.slice(3, 5), 16), g = parseInt(t.slice(5, 7), 16);
  return `rgba(${o}, ${f}, ${g}, ${r})`;
}
function ge({
  position: t = "top-right",
  stack: r = "queue",
  animation: o = "popup",
  variant: f = "crust",
  darkMode: g = !1,
  bgColor: L,
  textColor: K,
  borderRadius: O = 12
}) {
  const [v, V] = C([]), [$, H] = C(null), [Q, W] = C({}), k = I({}), m = I({}), y = I({}), Y = I({}), q = I({}), [_, G] = C(0);
  B(() => {
    const e = l.subscribe(V);
    return () => e();
  }, []), B(() => {
    r === "android" && v.forEach((e) => {
      W((s) => ({ ...s, [e.id]: !1 })), setTimeout(() => {
        W((s) => ({ ...s, [e.id]: !0 }));
      }, 250);
    });
  }, [v]);
  const J = (e) => {
    H(e), l.pause(e);
    const s = performance.now(), u = l.get(e);
    if (u && y.current[e]) {
      const i = s - y.current[e], c = Math.max((u.duration ?? 3e3) - i, 0);
      q.current[e] = c, Y.current[e] = s, m.current[e] && (clearTimeout(m.current[e]), delete m.current[e]);
    }
  }, N = (e) => {
    H(null), l.resume(e);
    const s = q.current[e];
    s != null && (y.current[e] = performance.now() - ((l.get(e)?.duration ?? 3e3) - s), m.current[e] = setTimeout(() => {
      l.remove(e), delete m.current[e];
    }, s), delete q.current[e], delete Y.current[e], G((u) => u + 1));
  }, U = {
    "top-right": { right: "1rem" },
    "top-center": { left: "50%", transform: "translateX(-50%)" },
    "top-left": { left: "1rem" },
    "bottom-right": { right: "1rem" },
    "bottom-center": { left: "50%", transform: "translateX(-50%)", bottom: "1rem" },
    "bottom-left": { left: "1rem" }
  }[t], T = t.startsWith("bottom"), A = $ ? "block" : r;
  let D = [...v];
  return r === "queue" && T && D.reverse(), B(() => (v.forEach((e) => {
    if (!e.duration || $ === e.id) return;
    const s = performance.now(), u = y.current[e.id] ?? s, i = s - u, c = Math.max(e.duration - i, 0);
    m.current[e.id] || (m.current[e.id] = setTimeout(() => {
      l.remove(e.id), delete m.current[e.id];
    }, c));
  }), () => {
    Object.values(m.current).forEach(clearTimeout);
  }), [v, $]), /* @__PURE__ */ n.createElement(
    "div",
    {
      style: {
        position: "fixed",
        zIndex: 9999,
        ...U,
        [T ? "bottom" : "top"]: "1rem"
      }
    },
    /* @__PURE__ */ n.createElement("div", { style: { position: "relative", width: 320 } }, D.map((e, s) => {
      const u = $ === e.id, i = r === "android", c = Q[e.id] || u;
      k.current[e.id] = k.current[e.id] || n.createRef();
      const Z = A === "queue" ? s * 12 : s * (k.current[e.id]?.current?.offsetHeight + 2 || 82), ee = A === "queue" ? 1 - s * 0.05 : 1, te = A === "queue" ? 1 - s * 0.1 : 1;
      let b = L ?? (g ? "#1f2937" : d[e.type] || d.default), h = K ?? (g ? "#fff" : "white"), E = "none", w = "none";
      f === "glass" && (b = S(d[e.type] || "#000", 0.5), h = "#111", E = `1px solid ${d[e.type] || "#fff"}`, w = "blur(10px)"), f === "outline" && (E = `1.4px solid ${d[e.type] || "#000"}`, b = S(d[e.type] || "#000", 0.9)), f === "shadowed" && (b = g ? "#0f172a" : "#fff", h = g ? "#f1f5f9" : "#1e293b", E = "1px solid rgba(0,0,0,0.05)"), f === "frosted" && (b = S(d[e.type], 0.25), h = "#fff", E = "1px solid rgba(255, 255, 255, 0.2)", w = "blur(12px)"), f === "terminal" && (b = "#0f0f0f", h = S(d[e.type], 0.9), E = `1.4px solid ${d[e.type]}`, w = "none");
      let p = /* @__PURE__ */ n.createElement(F, null);
      if (e.type === "success") p = /* @__PURE__ */ n.createElement(ne, null);
      else if (e.type === "error") p = /* @__PURE__ */ n.createElement(oe, null);
      else if (e.type === "warning") p = /* @__PURE__ */ n.createElement(se, null);
      else if (e.type === "info") p = /* @__PURE__ */ n.createElement(ie, null);
      else if (typeof e.icon == "function")
        try {
          p = n.createElement(e.icon);
        } catch {
          p = /* @__PURE__ */ n.createElement(F, null);
        }
      else n.isValidElement(e.icon) && (p = e.icon);
      return y.current[e.id] || (y.current[e.id] = performance.now()), /* @__PURE__ */ n.createElement(
        "div",
        {
          key: e.id,
          ref: k.current[e.id],
          style: {
            background: b,
            color: h,
            padding: i && !c ? "0.5rem" : "0.75rem 1rem",
            borderRadius: i && !c ? "999px" : O,
            display: "flex",
            alignItems: "center",
            justifyContent: i && !c ? "center" : "flex-start",
            width: i && !c ? 40 : "fit-content",
            minWidth: i && !c ? 40 : 300,
            maxWidth: 320,
            gap: i && !c ? 0 : "1rem",
            overflow: "hidden",
            border: E,
            backdropFilter: w,
            WebkitBackdropFilter: w,
            position: "absolute",
            [T ? "bottom" : "top"]: `${Z}px`,
            left: 0,
            right: 0,
            margin: "0 auto",
            transform: `scale(${ee})`,
            opacity: te,
            zIndex: 9999 - s,
            transition: "all 0.3s ease",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            animation: `${e.exiting ? `${o}-out` : `${o}-in`} 0.4s ease forwards`
          },
          onMouseEnter: () => J(e.id),
          onMouseLeave: () => N(e.id)
        },
        /* @__PURE__ */ n.createElement(
          "span",
          {
            style: {
              display: "flex",
              alignItems: e.type === "notification" ? "start" : "center",
              justifyContent: "center",
              flexShrink: 0,
              height: "100%"
            }
          },
          e.type === "notification" ? /* @__PURE__ */ n.createElement(
            "img",
            {
              src: e.image || "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              alt: "avatar",
              style: { width: 40, height: 40, borderRadius: "999em" }
            }
          ) : p
        ),
        /* @__PURE__ */ n.createElement(
          "div",
          {
            style: {
              flex: 1,
              position: i && !c ? "absolute" : "relative",
              opacity: i && !c ? 0 : 1,
              transition: "opacity 0.3s ease"
            }
          },
          /* @__PURE__ */ n.createElement("div", { style: {
            position: i && !c ? "absolute" : "relative",
            opacity: i && !c ? 0 : 1,
            transition: "position  0.3s ease , opacity 250ms 0.3s ease"
          } }, e.message),
          e.subMessage && /* @__PURE__ */ n.createElement("div", { style: { fontSize: 12, opacity: 0.8, lineHeight: ".65", marginBottom: ".5em" } }, e.subMessage),
          e.body && /* @__PURE__ */ n.createElement("div", { style: {} }, e.body),
          e.loader && /* @__PURE__ */ n.createElement(
            "div",
            {
              style: {
                marginTop: 4,
                height: 4,
                background: "#fff3",
                width: "100%",
                borderRadius: 2,
                overflow: "hidden"
              }
            },
            /* @__PURE__ */ n.createElement(
              "div",
              {
                key: _ + e.id,
                style: {
                  width: "100%",
                  height: "100%",
                  background: "#fff",
                  transformOrigin: "left",
                  animation: `loader-${e.id} ${e.duration ?? 3e3}ms linear forwards`,
                  animationPlayState: u ? "paused" : "running",
                  opacity: u ? 0.5 : 1
                }
              }
            )
          )
        ),
        e.closable && !i && /* @__PURE__ */ n.createElement(
          "button",
          {
            onClick: () => l.remove(e.id),
            style: {
              padding: ".5em",
              background: "transparent",
              border: "none",
              color: h,
              cursor: "pointer",
              fontSize: 16
            }
          },
          /* @__PURE__ */ n.createElement(re, null)
        ),
        /* @__PURE__ */ n.createElement("style", null, `
                @keyframes loader-${e.id} {
                  from { transform: scaleX(1); }
                  to { transform: scaleX(0); }
                }

                
                @keyframes slide-in {
                  from { transform: translateY(${T ? "100%" : "-100%"});  }
                  to { transform: translateY(0);  }
                }
                @keyframes slide-out {
                  from { transform: translateY(0);  opacity:1;}
                  to { transform: translateY(${T ? "100%" : "-100%"});  opacity:0;}
                }


              `)
      );
    }))
  );
}
function M(t) {
  return (r, o = {}) => {
    l[t](r, o);
  };
}
const ye = {
  success: M("success"),
  error: M("error"),
  warning: M("warning"),
  info: M("info"),
  custom: (t, r = {}) => l.custom(t, r),
  notification: (t = {}) => l.notification(t),
  remove: l.remove,
  clear: l.clear
};
export {
  ge as ToastFace,
  ye as toast
};
