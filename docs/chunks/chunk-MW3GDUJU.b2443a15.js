import{r as v,c as M,a as z,b as T,f as I,d as N,p as A,e as H,t as R,w as _,g as j,m as E}from"./chunk-BSJKVIJG.f7604bb7.js";import{_ as k}from"./chunk-6SYKIMQH.63e605dc.js";var w={};k(w,{button:()=>B,checkbox:()=>F,numeric:()=>O,select:()=>K,textAreaKeyboard:()=>D});var D=s=>{s.addEventListener("keydown",t=>{const n=s.value,e=s.selectionStart,l=s.selectionEnd;if(t.key==="Tab"&&t.shiftKey)return s.value.substring(e-2,e)==="  "&&(s.value=n.substring(0,e-2)+n.substring(l)),s.selectionStart=s.selectionEnd=e-2,t.preventDefault(),!1;if(t.key==="Tab")return s.value=n.substring(0,e)+"  "+n.substring(l),s.selectionStart=s.selectionEnd=e+2,t.preventDefault(),!1})},F=(s,t)=>{const n=v(s);return t&&n.addEventListener("change",()=>{t(n.checked)}),{get checked(){return n.checked},set checked(e){n.checked=e}}},O=(s,t,n)=>{const e=v(s),l=n?"change":"input";return t&&e.addEventListener(l,()=>{t(parseInt(e.value))}),{get value(){return parseInt(e.value)},set value(u){e.value=u.toString()}}},B=(s,t)=>{const n=v(s);return t&&n.addEventListener("click",e=>{t()}),{click(){t&&t()},set disabled(e){n.disabled=e}}},K=(s,t,n={})=>{const e=v(s),{placeholderOpt:l,shouldAddChoosePlaceholder:u=!1,autoSelectAfterChoice:p=-1}=n,c=()=>{t!==void 0&&t(e.value),p>=0&&(e.selectedIndex=p)};return t&&e.addEventListener("change",a=>{c()}),{set disabled(a){e.disabled=a},get value(){return e.value},get index(){return e.selectedIndex},get isSelectedPlaceholder(){return(u||n.placeholderOpt!==void 0)&&e.selectedIndex===0},setOpts(a,d){e.options.length=0,u?a=["-- Choose --",...a]:l!==void 0&&(a=[l,...a]);let g=0;a.forEach((h,x)=>{const o=document.createElement("option");o.value=h,o.innerHTML=h,d!==void 0&&h===d&&(g=x),e.options.add(o)}),e.selectedIndex=g},select(a=0,d=!1){e.selectedIndex=a,d&&t&&c()}}},P={};k(P,{Forms:()=>w,copyToClipboard:()=>M,createAfter:()=>z,createIn:()=>T,fullSizeCanvas:()=>I,log:()=>$,parentSize:()=>N,parentSizeCanvas:()=>A,resizeObservable:()=>H,resolveEl:()=>v,rx:()=>q,themeChangeObservable:()=>R,windowResize:()=>_});var V=(s,t)=>{const n=document.createElement("style");n.textContent=t;let e;return s.shadowRoot?(e=s.shadowRoot,e.innerHTML=""):e=s.attachShadow({mode:"open"}),e.appendChild(n),e},$=(s,t={})=>{const{capacity:n=0,monospaced:e=!0,timestamp:l=!1,collapseDuplicates:u=!0,css:p=""}=t;let c=0,a,d=0;const g=v(s),x=V(g,`
  .log {
    font-family: ${e?'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace':"normal"};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
    overflow-y: auto;
    height:100%;
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
    padding-bottom: 0.1em;
    padding-top: 0.1em;
  }
  .line:hover {
  
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
    word-break: break-all;

  }
  ${p}
  `),o=document.createElement("div");o.className="log",x.append(o);const L=i=>{const r=document.createElement("div");if(typeof i=="string")r.innerHTML=i;else if(i instanceof Error){const m=i.stack;m===void 0?r.innerHTML=i.toString():r.innerHTML=m.toString()}else r.innerHTML=i;r.classList.add("error"),y(r),a=void 0,d=0};let S=0;const C=(i="")=>{let r;const m=window.performance.now()-S;if(!(t.minIntervalMs&&m<t.minIntervalMs))if(S=window.performance.now(),typeof i=="object"?r=JSON.stringify(i):i===void 0?r="(undefined)":i===null?r="(null)":typeof i=="number"?(Number.isNaN(r)&&(r="(NaN)"),r=i.toString()):r=i,r.length===0){const f=document.createElement("hr");a=void 0,y(f)}else if(r===a&&u){const f=o.firstElementChild;let b=f.querySelector(".badge");return b===null&&(b=document.createElement("div"),b.className="badge",f.insertAdjacentElement("beforeend",b)),f!==null&&(b.textContent=(++d).toString()),f}else{const f=document.createElement("div");return f.innerText=r,y(f),a=r,f}},y=i=>{if(l){const r=document.createElement("div"),m=document.createElement("div");m.className="timestamp",m.innerText=new Date().toLocaleTimeString(),r.append(m,i),i.classList.add("msg"),r.classList.add("line"),i=r}else i.classList.add("line","msg");if(t.reverse?o.appendChild(i):o.insertBefore(i,o.firstChild),n>0&&++c>n*2)for(;c>n;)o.lastChild?.remove(),c--;t.reverse&&(o.scrollTop=o.scrollHeight),d=0};return{error:L,log:C,append:y,clear:()=>{o.innerHTML="",a=void 0,d=0,c=0},dispose:()=>{o.remove()},get isEmpty(){return c===0}}},q=(s,t,n)=>{const e=v(s),l=j(e,t),u={},p=()=>{Object.keys(u).forEach(d=>{delete u[d]})},c=a=>(a.subscribe({next:d=>{Object.assign(u,d)}}),{value:u,clear:p});return n===void 0?c(l):n.pluck?c(l.pipe(E(a=>a[n.pluck]))):n.transform?c(l.pipe(E(a=>n.transform(a)))):c(l)};export{w as F,B as b,$ as l,K as s};
