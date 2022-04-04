import{r as v,c as M,a as z,b as I,f as N,d as T,p as H,e as A,t as R,w as _,g as j,m as E}from"./chunk-4DU25RMK.d28002ea.js";import{_ as w}from"./chunk-FQLUQVDZ.7e80d7b0.js";var k={};w(k,{button:()=>B,checkbox:()=>F,numeric:()=>O,select:()=>D});var F=(o,t)=>{const n=v(o);return t&&n.addEventListener("change",()=>{t(n.checked)}),{get checked(){return n.checked},set checked(e){n.checked=e}}},O=(o,t,n)=>{const e=v(o),d=n?"change":"input";return t&&e.addEventListener(d,()=>{t(parseInt(e.value))}),{get value(){return parseInt(e.value)},set value(m){e.value=m.toString()}}},B=(o,t)=>{const n=v(o);return t&&n.addEventListener("click",e=>{t()}),{click(){t&&t()},set disabled(e){n.disabled=e}}},D=(o,t,n={})=>{const e=v(o),{placeholderOpt:d,shouldAddChoosePlaceholder:m=!1,autoSelectAfterChoice:p=-1}=n,i=()=>{t!==void 0&&t(e.value),p>=0&&(e.selectedIndex=p)};return t&&e.addEventListener("change",r=>{i()}),{set disabled(r){e.disabled=r},get value(){return e.value},get index(){return e.selectedIndex},get isSelectedPlaceholder(){return(m||n.placeholderOpt!==void 0)&&e.selectedIndex===0},setOpts(r,c){e.options.length=0,m?r=["-- Choose --",...r]:d!==void 0&&(r=[d,...r]);let h=0;r.forEach((b,y)=>{const l=document.createElement("option");l.value=b,l.innerHTML=b,c!==void 0&&b===c&&(h=y),e.options.add(l)}),e.selectedIndex=h},select(r=0,c=!1){e.selectedIndex=r,c&&t&&i()}}},P={};w(P,{Forms:()=>k,copyToClipboard:()=>M,createAfter:()=>z,createIn:()=>I,fullSizeCanvas:()=>N,log:()=>$,parentSize:()=>T,parentSizeCanvas:()=>H,resizeObservable:()=>A,resolveEl:()=>v,rx:()=>q,themeChangeObservable:()=>R,windowResize:()=>_});var V=(o,t)=>{const n=document.createElement("style");n.textContent=t;let e;return o.shadowRoot?(e=o.shadowRoot,e.innerHTML=""):e=o.attachShadow({mode:"open"}),e.appendChild(n),e},$=(o,t={})=>{const{capacity:n=0,monospaced:e=!0,timestamp:d=!1,collapseDuplicates:m=!0,css:p=""}=t;let i=0,r,c=0;const h=v(o),y=V(h,`
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
  ${p}
  `),l=document.createElement("div");l.className="log",y.append(l);const C=a=>{const s=document.createElement("div");if(typeof a=="string")s.innerHTML=a;else if(a instanceof Error){const f=a.stack;f===void 0?s.innerHTML=a.toString():s.innerHTML=f.toString()}else s.innerHTML=a;s.classList.add("error"),x(s),r=void 0,c=0};let S=0;const L=(a="")=>{let s;const f=window.performance.now()-S;if(!(t.minIntervalMs&&f<t.minIntervalMs))if(S=window.performance.now(),typeof a=="object"?s=JSON.stringify(a):a===void 0?s="(undefined)":a===null?s="(null)":typeof a=="number"?(Number.isNaN(s)&&(s="(NaN)"),s=a.toString()):s=a,s.length===0){const u=document.createElement("hr");r=void 0,x(u)}else if(s===r&&m){const u=l.firstElementChild;let g=u.querySelector(".badge");return g===null&&(g=document.createElement("div"),g.className="badge",u.insertAdjacentElement("beforeend",g)),u!==null&&(g.textContent=(++c).toString()),u}else{const u=document.createElement("div");return u.innerText=s,x(u),r=s,u}},x=a=>{if(d){const s=document.createElement("div"),f=document.createElement("div");f.className="timestamp",f.innerText=new Date().toLocaleTimeString(),s.append(f,a),a.classList.add("msg"),s.classList.add("line"),a=s}else a.classList.add("line","msg");if(t.reverse?l.appendChild(a):l.insertBefore(a,l.firstChild),n>0&&++i>n*2)for(;i>n;)l.lastChild?.remove(),i--;t.reverse&&(l.scrollTop=l.scrollHeight),c=0};return{error:C,log:L,append:x,clear:()=>{l.innerHTML="",r=void 0,c=0,i=0},dispose:()=>{l.remove()},get isEmpty(){return i===0}}},q=(o,t,n)=>{const e=v(o),d=j(e,t),m={},p=()=>{Object.keys(m).forEach(c=>{delete m[c]})},i=r=>(r.subscribe({next:c=>{Object.assign(m,c)}}),{value:m,clear:p});return n===void 0?i(d):n.pluck?i(d.pipe(E(r=>r[n.pluck]))):n.transform?i(d.pipe(E(r=>n.transform(r)))):i(d)};export{k as F,B as b,$ as l,D as s};
