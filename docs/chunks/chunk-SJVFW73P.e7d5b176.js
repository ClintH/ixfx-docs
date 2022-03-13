import{r as p,c as M,a as C,b as z,f as I,d as N,p as T,e as H,t as A,w as R,g as _,m as E}from"./chunk-DTRNDG6C.d0f370a4.js";import{_ as k}from"./chunk-FQLUQVDZ.735c98e3.js";var w={};k(w,{button:()=>O,checkbox:()=>j,numeric:()=>F,select:()=>B});var j=(o,n)=>{const t=p(o);return n&&t.addEventListener("change",()=>{n(t.checked)}),{get checked(){return t.checked},set checked(e){t.checked=e}}},F=(o,n,t)=>{const e=p(o),i=t?"change":"input";return n&&e.addEventListener(i,()=>{n(parseInt(e.value))}),{get value(){return parseInt(e.value)},set value(c){e.value=c.toString()}}},O=(o,n)=>{const t=p(o);return n&&t.addEventListener("click",e=>{n()}),{click(){n&&n()},set disabled(e){t.disabled=e}}},B=(o,n,t={})=>{const e=p(o),{placeholderOpt:i,shouldAddChoosePlaceholder:c=!1,autoSelectAfterChoice:d=-1}=t,l=()=>{n!==void 0&&n(e.value),d>=0&&(e.selectedIndex=d)};return n&&e.addEventListener("change",a=>{l()}),{set disabled(a){e.disabled=a},get value(){return e.value},get index(){return e.selectedIndex},get isSelectedPlaceholder(){return(c||t.placeholderOpt!==void 0)&&e.selectedIndex===0},setOpts(a,m){e.options.length=0,c?a=["-- Choose --",...a]:i!==void 0&&(a=[i,...a]);let S=0;a.forEach((g,u)=>{const b=document.createElement("option");b.value=g,b.innerHTML=g,m!==void 0&&g===m&&(S=u),e.options.add(b)}),e.selectedIndex=S},select(a=0,m=!1){e.selectedIndex=a,m&&n&&l()}}},D={};k(D,{Forms:()=>w,copyToClipboard:()=>M,createAfter:()=>C,createIn:()=>z,fullSizeCanvas:()=>I,log:()=>V,parentSize:()=>N,parentSizeCanvas:()=>T,resizeObservable:()=>H,resolveEl:()=>p,rx:()=>q,themeChangeObservable:()=>A,windowResize:()=>R});var P=(o,n)=>{const t=document.createElement("style");t.textContent=n;let e;return o.shadowRoot?(e=o.shadowRoot,e.innerHTML=""):e=o.attachShadow({mode:"open"}),e.appendChild(t),e},V=(o,n={})=>{const{capacity:t=0,monospaced:e=!0,timestamp:i=!1,collapseDuplicates:c=!0}=n;let d=0,l,a=0;const m=p(o),g=P(m,`
  .log {
    font-family: ${e?'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace':"normal"};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
  }
  .line:hover {
    background-color: var(--theme-bg-hover, whitesmoke);
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
  }
  `),u=document.createElement("div");u.className="log",g.append(u);const b=r=>{const s=document.createElement("div");if(typeof r=="string")s.innerHTML=r;else if(r instanceof Error){const f=r.stack;f===void 0?s.innerHTML=r.toString():s.innerHTML=f.toString()}else s.innerHTML=r;s.classList.add("error"),x(s),l=void 0,a=0};let y=0;const L=(r="")=>{let s;const f=window.performance.now()-y;if(!(n.minIntervalMs&&f<n.minIntervalMs))if(y=window.performance.now(),typeof r=="object"?s=JSON.stringify(r):r===void 0?s="(undefined)":r===null?s="(null)":typeof r=="number"?(Number.isNaN(s)&&(s="(NaN)"),s=r.toString()):s=r,s.length===0){const v=document.createElement("hr");l=void 0,x(v)}else if(s===l&&c){const v=u.firstElementChild;let h=v.querySelector(".badge");h===null&&(h=document.createElement("div"),h.className="badge",v.insertAdjacentElement("beforeend",h)),v!==null&&(h.textContent=(++a).toString())}else{const v=document.createElement("div");v.innerHTML=s,x(v),l=s}},x=r=>{if(i){const s=document.createElement("div"),f=document.createElement("div");f.className="timestamp",f.innerText=new Date().toLocaleTimeString(),s.append(f,r),r.classList.add("msg"),s.classList.add("line"),r=s}else r.classList.add("line","msg");if(u.insertBefore(r,u.firstChild),t>0&&++d>t*2)for(;d>t;)u.lastChild?.remove(),d--;a=0};return{error:b,log:L,append:x,clear:()=>{u.innerHTML="",l=void 0,a=0,d=0},dispose:()=>{u.remove()},get isEmpty(){return d===0}}},q=(o,n,t)=>{const e=p(o),i=_(e,n),c={},d=()=>{Object.keys(c).forEach(m=>{delete c[m]})},l=a=>(a.subscribe({next:m=>{Object.assign(c,m)}}),{value:c,clear:d});return t===void 0?l(i):t.pluck?l(i.pipe(E(a=>a[t.pluck]))):t.transform?l(i.pipe(E(a=>t.transform(a)))):l(i)};export{w as F,O as b,V as l,B as s};
