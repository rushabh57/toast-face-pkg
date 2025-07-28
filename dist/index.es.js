(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode("@keyframes popup-in{0%{scale:.85}to{scale:1}}@keyframes popup-out{0%{scale:1;opacity:1}to{scale:.85;opacity:0}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes slideLeft-in{0%{translate:-100% 0}to{translate:0 0}}@keyframes slideLeft-out{0%{translate:0 0;opacity:1}to{translate:-100% 0;opacity:0}}@keyframes slideRight-in{0%{translate:100% 0}to{translate:0 0}}@keyframes slideRight-out{0%{translate:0 0;opacity:1}to{translate:100% 0;opacity:0}}@keyframes slideUp-in{0%{translate:0 100%}to{translate:0 0}}@keyframes slideUp-out{0%{translate:0 0;opacity:1}to{translate:0 100%;opacity:0}}@keyframes slideDown-in{0%{translate:0 -100%}to{translate:0 0}}@keyframes slideDown-out{0%{translate:0 0;opacity:1}to{translate:0 -100%;opacity:0}}@keyframes squeezy-in{0%{translate:0 0;scale:.8 1.2}to{translate:0 0;scale:1 1}}@keyframes squeezy-out{0%{translate:0 0;scale:1 1;opacity:1}to{translate:0 0;scale:1.2 .8;opacity:0}}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import o, { useState as T, useRef as w, useEffect as Y } from "react";
import { Bell as j, X as oe, CheckCircle as ne, XCircle as se, AlertTriangle as ae, Info as ie } from "lucide-react";
let a = [], R = [], S = [], le = 3;
function q() {
  S.forEach((t) => t([...a]));
}
function ce() {
  return Math.random().toString(36).substr(2, 9);
}
function z() {
  if (a.length >= le || R.length === 0) return;
  const t = R.shift();
  t.startTime = Date.now(), t.remaining = t.duration, t.isPaused = !1, t.timeoutId = setTimeout(() => {
    A(t.id), z();
  }, t.remaining), a = [...a, t], q();
}
function ue(t) {
  const r = a.find((u) => u.id === t);
  if (!r || r.isPaused) return;
  const n = Date.now() - r.startTime;
  r.remaining -= n, r.isPaused = !0, clearTimeout(r.timeoutId);
}
function fe(t) {
  const r = a.find((n) => n.id === t);
  !r || !r.isPaused || (r.startTime = Date.now(), r.timeoutId = setTimeout(() => A(r.id), r.remaining), r.isPaused = !1);
}
function A(t) {
  const r = a.find((n) => n.id === t);
  r && clearTimeout(r.timeoutId), a = a.map(
    (n) => n.id === t ? { ...n, exiting: !0 } : n
  ), q(), setTimeout(() => {
    a = a.filter((n) => n.id !== t), q(), z();
  }, 400);
}
function me(t) {
  return a.find((r) => r.id === t);
}
function E(t) {
  const r = ce(), n = {
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
  return R.push(n), z(), r;
}
function de() {
  a.forEach((t) => clearTimeout(t.timeoutId)), a = [], R = [], q();
}
const c = {
  success: (t, r = {}) => E({ type: "success", message: t, ...r }),
  error: (t, r = {}) => E({ type: "error", message: t, ...r }),
  warning: (t, r = {}) => E({ type: "warning", message: t, ...r }),
  info: (t, r = {}) => E({ type: "info", message: t, ...r }),
  custom: (t, r = {}) => E({ type: "custom", message: t, ...r }),
  notification: (t = {}) => E({ type: "notification", ...t }),
  remove: A,
  clear: de,
  subscribe: (t) => (S.push(t), t([...a]), () => {
    S = S.filter((r) => r !== t);
  }),
  pause: ue,
  resume: fe,
  get: me
  // ✅ Add this line
}, f = {
  success: "#16a34a",
  error: "#dc2626",
  warning: "#f59e0b",
  info: "#2563eb",
  default: "#334155",
  custom: "#7c3aed",
  notification: "#0ea5e9"
};
function $(t, r = 0.3) {
  const n = parseInt(t.slice(1, 3), 16), u = parseInt(t.slice(3, 5), 16), p = parseInt(t.slice(5, 7), 16);
  return `rgba(${n}, ${u}, ${p}, ${r})`;
}
function be({
  position: t = "top-right",
  stack: r = "queue",
  animation: n = "popup",
  variant: u = "crust",
  darkMode: p = !1,
  bgColor: F,
  textColor: K,
  borderRadius: U = 12
}) {
  const [M, V] = T([]), [B, D] = T(null), [O, L] = T({}), I = w({}), x = w({}), y = w({}), H = w({}), P = w({}), [pe, Q] = T(0);
  Y(() => {
    const e = c.subscribe(V);
    return () => e();
  }, []), Y(() => {
    r === "android" && M.forEach((e) => {
      L((s) => ({ ...s, [e.id]: !1 })), setTimeout(() => {
        L((s) => ({ ...s, [e.id]: !0 }));
      }, 250);
    });
  }, [M]);
  const _ = (e) => {
    D(e), c.pause(e);
    const s = performance.now(), m = c.get(e);
    if (m && y.current[e]) {
      const i = s - y.current[e], l = Math.max((m.duration ?? 3e3) - i, 0);
      P.current[e] = l, H.current[e] = s, x.current[e] && (clearTimeout(x.current[e]), delete x.current[e]);
    }
  }, G = (e) => {
    D(null), c.resume(e);
    const s = P.current[e];
    s != null && (y.current[e] = performance.now() - ((c.get(e)?.duration ?? 3e3) - s), x.current[e] = setTimeout(() => {
      c.remove(e), delete x.current[e];
    }, s), delete P.current[e], delete H.current[e], Q((m) => m + 1));
  }, J = {
    "top-right": { right: "1rem" },
    "top-center": { left: "50%", transform: "translateX(-50%)" },
    "top-left": { left: "1rem" },
    "bottom-right": { right: "1rem" },
    "bottom-center": { left: "50%", transform: "translateX(-50%)", bottom: "1rem" },
    "bottom-left": { left: "1rem" }
  }[t], k = t.startsWith("bottom"), X = B ? "block" : r;
  let W = [...M];
  return r === "queue" && k && W.reverse(), /* @__PURE__ */ o.createElement(
    "div",
    {
      style: {
        position: "fixed",
        zIndex: 9999,
        ...J,
        [k ? "bottom" : "top"]: "1rem"
      }
    },
    /* @__PURE__ */ o.createElement("div", { style: { position: "relative", width: 320 } }, W.map((e, s) => {
      const m = B === e.id, i = r === "android", l = O[e.id] || m;
      I.current[e.id] = I.current[e.id] || o.createRef();
      const N = X === "queue" ? s * 12 : s * (I.current[e.id]?.current?.offsetHeight + 2 || 82), Z = X === "queue" ? 1 - s * 0.05 : 1, ee = X === "queue" ? 1 - s * 0.1 : 1;
      let g = F ?? (p ? "#1f2937" : f[e.type] || f.default), b = K ?? (p ? "#fff" : "white"), h = "none", v = "none";
      u === "glass" && (g = $(f[e.type] || "#000", 0.5), b = "#111", h = `1px solid ${f[e.type] || "#fff"}`, v = "blur(10px)"), u === "outline" && (h = `1.4px solid ${f[e.type] || "#000"}`, g = $(f[e.type] || "#000", 0.9)), u === "shadowed" && (g = p ? "#0f172a" : "#fff", b = p ? "#f1f5f9" : "#1e293b", h = "1px solid rgba(0,0,0,0.05)"), u === "frosted" && (g = $(f[e.type], 0.25), b = "#fff", h = "1px solid rgba(255, 255, 255, 0.2)", v = "blur(12px)"), u === "terminal" && (g = "#0f0f0f", b = $(f[e.type], 0.9), h = `1.4px solid ${f[e.type]}`, v = "none");
      let d = /* @__PURE__ */ o.createElement(j, null);
      if (e.type === "success") d = /* @__PURE__ */ o.createElement(ne, null);
      else if (e.type === "error") d = /* @__PURE__ */ o.createElement(se, null);
      else if (e.type === "warning") d = /* @__PURE__ */ o.createElement(ae, null);
      else if (e.type === "info") d = /* @__PURE__ */ o.createElement(ie, null);
      else if (typeof e.icon == "function")
        try {
          d = o.createElement(e.icon);
        } catch {
          d = /* @__PURE__ */ o.createElement(j, null);
        }
      else o.isValidElement(e.icon) && (d = e.icon);
      return y.current[e.id] || (y.current[e.id] = performance.now()), /* @__PURE__ */ o.createElement(
        "div",
        {
          key: e.id,
          ref: I.current[e.id],
          style: {
            background: g,
            color: b,
            padding: i && !l ? "0.5rem" : "0.75rem 1rem",
            borderRadius: i && !l ? "999px" : U,
            display: "flex",
            alignItems: "center",
            justifyContent: i && !l ? "center" : "flex-start",
            width: i && !l ? 40 : "fit-content",
            minWidth: i && !l ? 40 : 300,
            maxWidth: 320,
            gap: i && !l ? 0 : "1rem",
            overflow: "hidden",
            border: h,
            backdropFilter: v,
            WebkitBackdropFilter: v,
            position: "absolute",
            [k ? "bottom" : "top"]: `${N}px`,
            left: 0,
            right: 0,
            margin: "0 auto",
            transform: `scale(${Z})`,
            opacity: ee,
            zIndex: 9999 - s,
            transition: "all 0.3s ease",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            animation: `${e.exiting ? `${n}-out` : `${n}-in`} 0.4s ease forwards`
          },
          onMouseEnter: () => _(e.id),
          onMouseLeave: () => G(e.id)
        },
        /* @__PURE__ */ o.createElement(
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
          e.type === "notification" ? /* @__PURE__ */ o.createElement(
            "img",
            {
              src: e.image || "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              alt: "avatar",
              style: { width: 40, height: 40, borderRadius: "999em" }
            }
          ) : d
        ),
        /* @__PURE__ */ o.createElement(
          "div",
          {
            style: {
              flex: 1,
              position: i && !l ? "absolute" : "relative",
              opacity: i && !l ? 0 : 1,
              transition: "opacity 0.3s ease"
            }
          },
          /* @__PURE__ */ o.createElement("div", { style: {
            position: i && !l ? "absolute" : "relative",
            opacity: i && !l ? 0 : 1,
            transition: "position  0.3s ease , opacity 250ms 0.3s ease"
          } }, e.message),
          e.subMessage && /* @__PURE__ */ o.createElement("div", { style: { fontSize: 12, opacity: 0.8, lineHeight: ".65", marginBottom: ".5em" } }, e.subMessage),
          e.body && /* @__PURE__ */ o.createElement("div", { style: {} }, e.body),
          e.loader && /* @__PURE__ */ o.createElement(
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
            (() => {
              const te = performance.now();
              y.current[e.id];
              const re = e.duration ?? 3e3;
              return /* @__PURE__ */ o.createElement(
                "div",
                {
                  style: {
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    transformOrigin: "left",
                    animation: `loader-${e.id} ${re}ms linear forwards`,
                    // animationDelay: `-${elapsed}ms`,
                    animationPlayState: m ? "paused" : "running",
                    opacity: m ? 0.5 : 1
                  }
                }
              );
            })()
          )
        ),
        e.closable && !i && /* @__PURE__ */ o.createElement(
          "button",
          {
            onClick: () => c.remove(e.id),
            style: {
              padding: ".5em",
              background: "transparent",
              border: "none",
              color: b,
              cursor: "pointer",
              fontSize: 16
            }
          },
          /* @__PURE__ */ o.createElement(oe, null)
        ),
        /* @__PURE__ */ o.createElement("style", null, `
                @keyframes loader-${e.id} {
                  from { transform: scaleX(1); }
                  to { transform: scaleX(0); }
                }

                
                @keyframes slide-in {
                  from { transform: translateY(${k ? "100%" : "-100%"});  }
                  to { transform: translateY(0);  }
                }
                @keyframes slide-out {
                  from { transform: translateY(0);  opacity:1;}
                  to { transform: translateY(${k ? "100%" : "-100%"});  opacity:0;}
                }

                @keyframes popup-in {
    from { scale: 0.85;  }
    to {  scale:1;  }
  }
    @keyframes popup-out {
    from {  scale:1;  opacity:1; }
    to {  scale:0.85; opacity:0; }
  }

  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideLeft-in {
    from { translate: -100% 0;  }
    to { translate: 0 0;  }
  }

  @keyframes slideLeft-out {
    from { translate: 0 0; opacity:1; }
    to { translate: -100% 0;  opacity:0;}
  }

  @keyframes slideRight-in {
    from { translate: 100% 0;  }
    to { translate: 0 0;  }
  }

  @keyframes slideRight-out {
    from { translate: 0 0;  opacity:1;}
    to { translate: 100% 0;  opacity:0;}
  }

  @keyframes slideUp-in {
    from { translate: 0 100%;  }
    to { translate: 0 0;  }
  }

  @keyframes slideUp-out {
    from { translate: 0 0;  opacity:1;}
    to { translate: 0 100%;  opacity:0;}
  }

  @keyframes slideDown-in {
    from { translate: 0 -100%;  }
    to { translate: 0 0;  }
  }

  @keyframes slideDown-out {
    from { translate: 0 0;  opacity:1;}
    to { translate: 0 -100%;  opacity:0;}
  }
  
  @keyframes squeezy-in {
    from { translate: 0 0; scale: 0.8 1.2;  }
    to { translate: 0 0; scale: 1 1;  }
  }

  @keyframes squeezy-out {
    from { translate: 0 0; scale: 1 1;  opacity:1;}
    to { translate: 0 0; scale: 1.2 0.8;  opacity:0;}
  }




              `)
      );
    }))
  );
}
function C(t) {
  return (r, n = {}) => {
    c[t](r, n);
  };
}
const he = {
  success: C("success"),
  error: C("error"),
  warning: C("warning"),
  info: C("info"),
  custom: (t, r = {}) => c.custom(t, r),
  notification: (t = {}) => c.notification(t),
  remove: c.remove,
  clear: c.clear
};
export {
  be as ToastFace,
  he as toast
};
