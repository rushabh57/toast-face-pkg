(function(s,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],e):(s=typeof globalThis<"u"?globalThis:s||self,e(s.ToastFace={},s.React))})(this,function(s,e){"use strict";let l=[],f=[];const c={subscribe:r=>(f.push(r),r(l),()=>{f=f.filter(o=>o!==r)}),add:(r,o={})=>{const n=Date.now().toString(),a={id:n,message:r,type:o.type||"default",duration:o.duration||3e3,closable:o.closable!==!1,loader:o.loader||!1,title:o.title||null,profileImg:o.profileImg||null,customIcon:o.customIcon||null,bgColor:o.bgColor||null,textColor:o.textColor||null};l.push(a),f.forEach(u=>u([...l])),a.duration>0&&setTimeout(()=>c.remove(n),a.duration)},remove:r=>{l=l.filter(o=>o.id!==r),f.forEach(o=>o([...l]))}},g={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",default:"#333",custom:"#6366f1"},h={success:e.createElement("svg",{viewBox:"0 0 24 24",fill:"none",width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{d:"M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z",fill:"#292D32"})),warning:e.createElement("svg",{viewBox:"0 0 24 24",fill:"none",width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{d:"M12 2L2 22H22L12 2Z",fill:"#f59e0b"})),error:e.createElement("svg",{viewBox:"0 0 24 24",fill:"none",width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg"},e.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#ef4444"}),e.createElement("line",{x1:"8",y1:"8",x2:"16",y2:"16",stroke:"#fff",strokeWidth:"2"}),e.createElement("line",{x1:"16",y1:"8",x2:"8",y2:"16",stroke:"#fff",strokeWidth:"2"})),default:e.createElement("svg",{viewBox:"0 0 24 24",fill:"none",width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg"},e.createElement("circle",{cx:"12",cy:"12",r:"10",stroke:"#121923",strokeWidth:"2"}))};function E({position:r="top-right",animation:o="popup",stack:n="queue",darkMode:a=!1,borderRadius:u=12,wrap:p=!0,loaderDuration:k=3e3}){const[y,T]=e.useState([]);e.useEffect(()=>c.subscribe(T),[]);const w={"top-right":{right:"1rem"},"top-left":{left:"1rem"},"bottom-right":{right:"1rem"},"bottom-left":{left:"1rem"}}[r],S=y.some(i=>i.type!=="notification"),I={position:"fixed",zIndex:9999,...w,[r.startsWith("top")?"top":"bottom"]:S?"6rem":"1rem"},W={position:"fixed",zIndex:9999,...w,[r.startsWith("top")?"top":"bottom"]:"1rem"},L=y.filter(i=>i.type==="notification"),q=y.filter(i=>i.type!=="notification"),b=i=>{const v=r.startsWith("bottom"),z=v?[...i]:[...i].reverse();return e.createElement("div",{style:{position:"relative",width:320}},z.map((t,d)=>{const $=n==="queue"?d*10:n==="block"?d*80:0,B=n==="queue"?1-d*.05:1,F=n==="queue"?1-d*.1:1,X=t.bgColor||(t.type==="notification"?a?"#1f2937":"#fff":g[t.type]||g.default),x=t.textColor||(t.type==="notification"?a?"#fff":"#000":"white"),Y={background:X,color:x,padding:t.type==="notification"?"1rem":"0.75rem 1rem",borderRadius:u,boxShadow:"0 4px 16px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"space-between",minWidth:300,gap:"1rem",border:t.type==="notification"?"1px solid #e5e7eb":"none",position:"absolute",[v?"bottom":"top"]:`${$}px`,left:0,right:0,margin:"0 auto",transform:`scale(${B})`,opacity:F,zIndex:9999-d,animation:`${o} 0.3s ease`,transition:"all 0.3s ease",pointerEvents:"auto"};return e.createElement("div",{key:t.id,style:Y},e.createElement("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"0.5rem"}},e.createElement("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",whiteSpace:p?"normal":"nowrap",overflow:p?"visible":"hidden",textOverflow:p?"unset":"ellipsis"}},t.type==="notification"&&t.profileImg?null:t.customIcon||h[t.type]||h.default,t.type==="notification"&&e.createElement("img",{src:t.profileImg||"https://www.svgrepo.com/show/527946/user-circle.svg",alt:"",style:{width:40,height:40,borderRadius:"50%"}}),e.createElement("div",null,t.type==="notification"?e.createElement(e.Fragment,null,e.createElement("div",{style:{fontWeight:600}},t.title||"Notification"),e.createElement("div",{style:{fontSize:"0.875rem",opacity:.8}},t.message)):t.message)),t.loader&&e.createElement("div",{style:{marginTop:4,height:4,background:"#fff3",width:"100%",borderRadius:2}},e.createElement("div",{style:{width:"100%",height:"100%",background:"#fff",animation:`loaderAnim-${t.id} ${k}ms linear forwards`}}))),t.closable&&e.createElement("button",{onClick:()=>c.remove(t.id),style:{background:"transparent",color:x,fontSize:16,border:"none",cursor:"pointer"}},"×"),e.createElement("style",null,`
                @keyframes loaderAnim-${t.id} {
                  from { width: 100% }
                  to { width: 0% }
                }
              `))}))};return e.createElement(e.Fragment,null,e.createElement("div",{style:I},b(L)),e.createElement("div",{style:W},b(q)),e.createElement("style",null,`
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
      `))}function m(r){return(o,n={})=>{c.add(o,{...n,type:r})}}const C={success:m("success"),error:m("error"),warning:m("warning"),info:m("default"),custom:m("custom"),notification:(r,o={})=>c.add(r,{...o,type:"notification"})};s.ToastFace=E,s.toast=C,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
