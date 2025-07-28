(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode("@keyframes popup-in{0%{scale:.85}to{scale:1}}@keyframes popup-out{0%{scale:1;opacity:1}to{scale:.85;opacity:0}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes slideLeft-in{0%{translate:-100% 0}to{translate:0 0}}@keyframes slideLeft-out{0%{translate:0 0;opacity:1}to{translate:-100% 0;opacity:0}}@keyframes slideRight-in{0%{translate:100% 0}to{translate:0 0}}@keyframes slideRight-out{0%{translate:0 0;opacity:1}to{translate:100% 0;opacity:0}}@keyframes slideUp-in{0%{translate:0 100%}to{translate:0 0}}@keyframes slideUp-out{0%{translate:0 0;opacity:1}to{translate:0 100%;opacity:0}}@keyframes slideDown-in{0%{translate:0 -100%}to{translate:0 0}}@keyframes slideDown-out{0%{translate:0 0;opacity:1}to{translate:0 -100%;opacity:0}}@keyframes squeezy-in{0%{translate:0 0;scale:.8 1.2}to{translate:0 0;scale:1 1}}@keyframes squeezy-out{0%{translate:0 0;scale:1 1;opacity:1}to{translate:0 0;scale:1.2 .8;opacity:0}}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
(function(f,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("react"),require("lucide-react")):typeof define=="function"&&define.amd?define(["exports","react","lucide-react"],r):(f=typeof globalThis<"u"?globalThis:f||self,r(f.ToastFace={},f.React,f.lucideReact))})(this,function(f,r,y){"use strict";let i=[],I=[],$=[],W=3;function S(){$.forEach(t=>t([...i]))}function Y(){return Math.random().toString(36).substr(2,9)}function P(){if(i.length>=W||I.length===0)return;const t=I.shift();t.startTime=Date.now(),t.remaining=t.duration,t.isPaused=!1,t.timeoutId=setTimeout(()=>{X(t.id),P()},t.remaining),i=[...i,t],S()}function K(t){const o=i.find(m=>m.id===t);if(!o||o.isPaused)return;const n=Date.now()-o.startTime;o.remaining-=n,o.isPaused=!0,clearTimeout(o.timeoutId)}function O(t){const o=i.find(n=>n.id===t);!o||!o.isPaused||(o.startTime=Date.now(),o.timeoutId=setTimeout(()=>X(o.id),o.remaining),o.isPaused=!1)}function X(t){const o=i.find(n=>n.id===t);o&&clearTimeout(o.timeoutId),i=i.map(n=>n.id===t?{...n,exiting:!0}:n),S(),setTimeout(()=>{i=i.filter(n=>n.id!==t),S(),P()},400)}function U(t){return i.find(o=>o.id===t)}function g(t){const o=Y(),n={id:o,duration:t.duration||3e3,type:t.type||"info",message:t.message||"",icon:t.icon||null,subMessage:t.subMessage||"",body:t.body||"",loader:t.loader||!1,closable:t.closable??!0,image:t.image||null,startTime:null,remaining:null,timeoutId:null,isPaused:!1};return I.push(n),P(),o}function V(){i.forEach(t=>clearTimeout(t.timeoutId)),i=[],I=[],S()}const l={success:(t,o={})=>g({type:"success",message:t,...o}),error:(t,o={})=>g({type:"error",message:t,...o}),warning:(t,o={})=>g({type:"warning",message:t,...o}),info:(t,o={})=>g({type:"info",message:t,...o}),custom:(t,o={})=>g({type:"custom",message:t,...o}),notification:(t={})=>g({type:"notification",...t}),remove:X,clear:V,subscribe:t=>($.push(t),t([...i]),()=>{$=$.filter(o=>o!==t)}),pause:K,resume:O,get:U},c={success:"#16a34a",error:"#dc2626",warning:"#f59e0b",info:"#2563eb",default:"#334155",custom:"#7c3aed",notification:"#0ea5e9"};function q(t,o=.3){const n=parseInt(t.slice(1,3),16),m=parseInt(t.slice(3,5),16),b=parseInt(t.slice(5,7),16);return`rgba(${n}, ${m}, ${b}, ${o})`}function Q({position:t="top-right",stack:o="queue",animation:n="popup",variant:m="crust",darkMode:b=!1,bgColor:G,textColor:J,borderRadius:N=12}){const[z,Z]=r.useState([]),[A,D]=r.useState(null),[R,F]=r.useState({}),M=r.useRef({}),T=r.useRef({}),h=r.useRef({}),L=r.useRef({}),B=r.useRef({}),[ue,ee]=r.useState(0);r.useEffect(()=>{const e=l.subscribe(Z);return()=>e()},[]),r.useEffect(()=>{o==="android"&&z.forEach(e=>{F(s=>({...s,[e.id]:!1})),setTimeout(()=>{F(s=>({...s,[e.id]:!0}))},250)})},[z]);const te=e=>{D(e),l.pause(e);const s=performance.now(),d=l.get(e);if(d&&h.current[e]){const a=s-h.current[e],u=Math.max((d.duration??3e3)-a,0);B.current[e]=u,L.current[e]=s,T.current[e]&&(clearTimeout(T.current[e]),delete T.current[e])}},oe=e=>{D(null),l.resume(e);const s=B.current[e];s!=null&&(h.current[e]=performance.now()-((l.get(e)?.duration??3e3)-s),T.current[e]=setTimeout(()=>{l.remove(e),delete T.current[e]},s),delete B.current[e],delete L.current[e],ee(d=>d+1))},re={"top-right":{right:"1rem"},"top-center":{left:"50%",transform:"translateX(-50%)"},"top-left":{left:"1rem"},"bottom-right":{right:"1rem"},"bottom-center":{left:"50%",transform:"translateX(-50%)",bottom:"1rem"},"bottom-left":{left:"1rem"}}[t],k=t.startsWith("bottom"),j=A?"block":o;let H=[...z];return o==="queue"&&k&&H.reverse(),r.createElement("div",{style:{position:"fixed",zIndex:9999,...re,[k?"bottom":"top"]:"1rem"}},r.createElement("div",{style:{position:"relative",width:320}},H.map((e,s)=>{const d=A===e.id,a=o==="android",u=R[e.id]||d;M.current[e.id]=M.current[e.id]||r.createRef();const ne=j==="queue"?s*12:s*(M.current[e.id]?.current?.offsetHeight+2||82),se=j==="queue"?1-s*.05:1,ie=j==="queue"?1-s*.1:1;let E=G??(b?"#1f2937":c[e.type]||c.default),x=J??(b?"#fff":"white"),v="none",w="none";m==="glass"&&(E=q(c[e.type]||"#000",.5),x="#111",v=`1px solid ${c[e.type]||"#fff"}`,w="blur(10px)"),m==="outline"&&(v=`1.4px solid ${c[e.type]||"#000"}`,E=q(c[e.type]||"#000",.9)),m==="shadowed"&&(E=b?"#0f172a":"#fff",x=b?"#f1f5f9":"#1e293b",v="1px solid rgba(0,0,0,0.05)"),m==="frosted"&&(E=q(c[e.type],.25),x="#fff",v="1px solid rgba(255, 255, 255, 0.2)",w="blur(12px)"),m==="terminal"&&(E="#0f0f0f",x=q(c[e.type],.9),v=`1.4px solid ${c[e.type]}`,w="none");let p=r.createElement(y.Bell,null);if(e.type==="success")p=r.createElement(y.CheckCircle,null);else if(e.type==="error")p=r.createElement(y.XCircle,null);else if(e.type==="warning")p=r.createElement(y.AlertTriangle,null);else if(e.type==="info")p=r.createElement(y.Info,null);else if(typeof e.icon=="function")try{p=r.createElement(e.icon)}catch{p=r.createElement(y.Bell,null)}else r.isValidElement(e.icon)&&(p=e.icon);return h.current[e.id]||(h.current[e.id]=performance.now()),r.createElement("div",{key:e.id,ref:M.current[e.id],style:{background:E,color:x,padding:a&&!u?"0.5rem":"0.75rem 1rem",borderRadius:a&&!u?"999px":N,display:"flex",alignItems:"center",justifyContent:a&&!u?"center":"flex-start",width:a&&!u?40:"fit-content",minWidth:a&&!u?40:300,maxWidth:320,gap:a&&!u?0:"1rem",overflow:"hidden",border:v,backdropFilter:w,WebkitBackdropFilter:w,position:"absolute",[k?"bottom":"top"]:`${ne}px`,left:0,right:0,margin:"0 auto",transform:`scale(${se})`,opacity:ie,zIndex:9999-s,transition:"all 0.3s ease",boxShadow:"0 8px 24px rgba(0,0,0,0.1)",animation:`${e.exiting?`${n}-out`:`${n}-in`} 0.4s ease forwards`},onMouseEnter:()=>te(e.id),onMouseLeave:()=>oe(e.id)},r.createElement("span",{style:{display:"flex",alignItems:e.type==="notification"?"start":"center",justifyContent:"center",flexShrink:0,height:"100%"}},e.type==="notification"?r.createElement("img",{src:e.image||"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",alt:"avatar",style:{width:40,height:40,borderRadius:"999em"}}):p),r.createElement("div",{style:{flex:1,position:a&&!u?"absolute":"relative",opacity:a&&!u?0:1,transition:"opacity 0.3s ease"}},r.createElement("div",{style:{position:a&&!u?"absolute":"relative",opacity:a&&!u?0:1,transition:"position  0.3s ease , opacity 250ms 0.3s ease"}},e.message),e.subMessage&&r.createElement("div",{style:{fontSize:12,opacity:.8,lineHeight:".65",marginBottom:".5em"}},e.subMessage),e.body&&r.createElement("div",{style:{}},e.body),e.loader&&r.createElement("div",{style:{marginTop:4,height:4,background:"#fff3",width:"100%",borderRadius:2,overflow:"hidden"}},(()=>{const ae=performance.now();h.current[e.id];const le=e.duration??3e3;return r.createElement("div",{style:{width:"100%",height:"100%",background:"#fff",transformOrigin:"left",animation:`loader-${e.id} ${le}ms linear forwards`,animationPlayState:d?"paused":"running",opacity:d?.5:1}})})())),e.closable&&!a&&r.createElement("button",{onClick:()=>l.remove(e.id),style:{padding:".5em",background:"transparent",border:"none",color:x,cursor:"pointer",fontSize:16}},r.createElement(y.X,null)),r.createElement("style",null,`
                @keyframes loader-${e.id} {
                  from { transform: scaleX(1); }
                  to { transform: scaleX(0); }
                }

                
                @keyframes slide-in {
                  from { transform: translateY(${k?"100%":"-100%"});  }
                  to { transform: translateY(0);  }
                }
                @keyframes slide-out {
                  from { transform: translateY(0);  opacity:1;}
                  to { transform: translateY(${k?"100%":"-100%"});  opacity:0;}
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




              `))})))}function C(t){return(o,n={})=>{l[t](o,n)}}const _={success:C("success"),error:C("error"),warning:C("warning"),info:C("info"),custom:(t,o={})=>l.custom(t,o),notification:(t={})=>l.notification(t),remove:l.remove,clear:l.clear};f.ToastFace=Q,f.toast=_,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
