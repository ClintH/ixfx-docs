import{_ as k,r as p,h as M,f as C,g as z,i as I,j as N,p as T,k as H,t as j,w as A,l as R,m as E}from"./chunk-UDOW5UY7.00d3a5c3.js";var w={};k(w,{button:()=>F,checkbox:()=>_,numeric:()=>O,select:()=>D});var _=(o,n)=>{const t=p(o);return n&&t.addEventListener("change",()=>{n(t.checked)}),{get checked(){return t.checked},set checked(e){t.checked=e}}},O=(o,n,t)=>{const e=p(o),i=t?"change":"input";return n&&e.addEventListener(i,()=>{n(parseInt(e.value))}),{get value(){return parseInt(e.value)},set value(c){e.value=c.toString()}}},F=(o,n)=>{const t=p(o);return n&&t.addEventListener("click",e=>{n()}),{click(){n&&n()},set disabled(e){t.disabled=e}}},D=(o,n,t={})=>{const e=p(o),{placeholderOpt:i,shouldAddChoosePlaceholder:c=!1,autoSelectAfterChoice:d=-1}=t,l=()=>{n!==void 0&&n(e.value),d>=0&&(e.selectedIndex=d)};return n&&e.addEventListener("change",a=>{l()}),{set disabled(a){e.disabled=a},get value(){return e.value},get index(){return e.selectedIndex},get isSelectedPlaceholder(){return(c||t.placeholderOpt!==void 0)&&e.selectedIndex===0},setOpts(a,m){e.options.length=0,c?a=["-- Choose --",...a]:i!==void 0&&(a=[i,...a]);let S=0;a.forEach((g,u)=>{const h=document.createElement("option");h.value=g,h.innerHTML=g,m!==void 0&&g===m&&(S=u),e.options.add(h)}),e.selectedIndex=S},select(a=0,m=!1){e.selectedIndex=a,m&&n&&l()}}},B={};k(B,{Forms:()=>w,copyToClipboard:()=>M,createAfter:()=>C,createIn:()=>z,fullSizeCanvas:()=>I,log:()=>U,parentSize:()=>N,parentSizeCanvas:()=>T,resizeObservable:()=>H,resolveEl:()=>p,rx:()=>V,themeChangeObservable:()=>j,windowResize:()=>A});var P=(o,n)=>{const t=document.createElement("style");t.textContent=n;let e;return o.shadowRoot?(e=o.shadowRoot,e.innerHTML=""):e=o.attachShadow({mode:"open"}),e.appendChild(t),e},U=(o,n={})=>{const{capacity:t=0,monospaced:e=!0,timestamp:i=!1,collapseDuplicates:c=!0}=n;let d=0,l,a=0;const m=p(o),g=P(m,`
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
  `),u=document.createElement("div");u.className="log",g.append(u);const h=r=>{const s=document.createElement("div");if(typeof r=="string")s.innerHTML=r;else if(r instanceof Error){const f=r.stack;f===void 0?s.innerHTML=r.toString():s.innerHTML=f.toString()}else s.innerHTML=r;s.classList.add("error"),x(s),l=void 0,a=0};let y=0;const L=(r="")=>{let s;const f=window.performance.now()-y;if(!(n.minIntervalMs&&f<n.minIntervalMs))if(y=window.performance.now(),typeof r=="object"?s=JSON.stringify(r):r===void 0?s="(undefined)":r===null?s="(null)":typeof r=="number"?(Number.isNaN(s)&&(s="(NaN)"),s=r.toString()):s=r,s.length===0){const v=document.createElement("hr");l=void 0,x(v)}else if(s===l&&c){const v=u.firstElementChild;let b=v.querySelector(".badge");b===null&&(b=document.createElement("div"),b.className="badge",v.insertAdjacentElement("beforeend",b)),v!==null&&(b.textContent=(++a).toString())}else{const v=document.createElement("div");v.innerHTML=s,x(v),l=s}},x=r=>{if(i){const s=document.createElement("div"),f=document.createElement("div");f.className="timestamp",f.innerText=new Date().toLocaleTimeString(),s.append(f,r),r.classList.add("msg"),s.classList.add("line"),r=s}else r.classList.add("line","msg");if(u.insertBefore(r,u.firstChild),t>0&&++d>t*2)for(;d>t;)u.lastChild?.remove(),d--;a=0};return{error:h,log:L,append:x,clear:()=>{u.innerHTML="",l=void 0,a=0,d=0},dispose:()=>{u.remove()},get isEmpty(){return d===0}}},V=(o,n,t)=>{const e=p(o),i=R(e,n),c={},d=()=>{Object.keys(c).forEach(m=>{delete c[m]})},l=a=>(a.subscribe({next:m=>{Object.assign(c,m)}}),{value:c,clear:d});return t===void 0?l(i):t.pluck?l(i.pipe(E(a=>a[t.pluck]))):t.transform?l(i.pipe(E(a=>t.transform(a)))):l(i)};export{w as F,F as b,U as l,D as s};
