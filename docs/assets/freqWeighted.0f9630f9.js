import{_ as E,S as J,c as N,e as k,f as l,d as B,n as v,m as K}from"./chunk-L7NPGFXB.f2741ca7.js";import"./chunk-47IJX5B3.6f260121.js";import"./chunk-JPZLIXUM.8ea1dc32.js";import"./chunk-4GO2ZRQ3.fa99b24b.js";import{j as D}from"./chunk-KSSJG6KL.6fe48b3b.js";import"./chunk-ROEMWE5T.78fbbee8.js";import{a as z,b as p,g as W,h as f,j as U,k as Z}from"./vendor.3254e684.js";var Q={};E(Q,{byValueString:()=>F,getSorter:()=>L,sortByKey:()=>I,sortByValueNumber:()=>M,sortByValueString:()=>se});function A(e,t,r,a,s,i,o,n,u){switch(arguments.length){case 1:return e;case 2:return t(e);case 3:return r(t(e));case 4:return a(r(t(e)));case 5:return s(a(r(t(e))));case 6:return i(s(a(r(t(e)))));case 7:return o(i(s(a(r(t(e))))));case 8:return n(o(i(s(a(r(t(e)))))));case 9:return u(n(o(i(s(a(r(t(e))))))));default:for(var d=arguments[0],g=1;g<arguments.length;g++)d=arguments[g](d);return d}}var Y=function(e){return function(t,r){return t===r||e(t,r)===0}},P=function(e){return{equals:Y(e),compare:function(t,r){return t===r?0:e(t,r)}}},S=function(e){return P(function(t,r){return e.compare(r,t)})},$=function(e){return function(t){return P(function(r,a){return t.compare(e(r),e(a))})}},O={equals:function(e,t){return e===t}},_={equals:O.equals,compare:function(e,t){return e<t?-1:e>t?1:0}};O.equals,_.compare;var ee=function(e){return e.slice()},q=function(e){return function(t){return t.length<=1?ee(t):t.slice().sort(e.compare)}},te={equals:function(e,t){return e===t}},b={equals:te.equals,compare:function(e,t){return e<t?-1:e>t?1:0}},re=(e=!1)=>A(e?S(b):b,$(t=>t[0])),F=(e=!1)=>A(e?S(b):b,$(t=>t[1])),ae=(e=!1)=>A(e?S(_):_,$(t=>t[1])),I=(e=!1)=>q(re(e)),se=(e=!1)=>q(F(e)),M=(e=!1)=>q(ae(e)),L=e=>{switch(e){case"value":return M(!1);case"valueReverse":return M(!0);case"key":return I(!1);case"keyReverse":return I(!0);default:throw new Error(`Unknown sorting value '${e}'. Expecting: value, valueReverse, key or keyReverse`)}},T={};E(T,{weighted:()=>ne});var ne=(e,t)=>Math.round(t/(Math.random()*t+e)),ie={};E(ie,{atInterval:()=>oe,numericRange:()=>ce,numericRangeRaw:()=>le,pingPong:()=>V,pingPongPercent:()=>ue});var oe=async function*(e,t){let r=!1;try{for(;!r;){if(await D(t),r)return;yield await e()}}finally{r=!0}},le=function*(e,t=0,r,a=!1){if(e<=0)throw new Error("Interval is expected to be above zero");r===void 0&&(r=Number.MAX_SAFE_INTEGER);let s=t;do for(;s<r;)yield s,s+=e;while(a)},ce=function*(e,t=0,r,a=!1,s){if(e<=0)throw Error("Interval is expected to be above zero");s=s??1e3,r===void 0?r=Number.MAX_SAFE_INTEGER:r*=s,e=e*s;do{let i=t*s;for(;i<=r;)yield i/s,i+=e}while(a)},ue=function(e=.1,t,r=1e3){if(t===void 0&&e>0?t=0:t===void 0&&e<0?t=1:t=t,t>1||t<0)throw new Error("offset must be between 0 and 1");return V(e,0,1,t,r)},V=function*(e,t,r,a,s=1){if(Number.isNaN(e))throw new Error("interval parameter is NaN");if(Number.isNaN(t))throw new Error("lower parameter is NaN");if(Number.isNaN(r))throw new Error("upper parameter is NaN");if(Number.isNaN(a))throw new Error("upper parameter is NaN");if(t>=r)throw new Error("lower must be less than upper");if(e===0)throw new Error("Interval cannot be zero");const i=r-t;if(Math.abs(e)>=i)throw new Error(`Interval should be between -${i} and ${i}`);let o=e>0;if(r=Math.floor(r*s),t=Math.floor(t*s),e=Math.floor(Math.abs(e*s)),a===void 0?a=t:a=Math.floor(a*s),a>r||a<t)throw new Error("Offset must be within lower and upper");let n=a;yield n/s;let u=!0;for(;;)n=n+(o?e:-e),o&&n>=r?(o=!1,n=r,n===r&&u&&(n=t,o=!0)):!o&&n<=t&&(o=!0,n=t,n===t&&u&&(n=r,o=!1)),yield n/s,u=!1},he=e=>new de(e),c,y,de=class extends J{constructor(e=void 0){super();N(this,c,void 0),N(this,y,void 0),k(this,c,new Map),e===void 0&&(e=t=>{if(t===void 0)throw new Error("Cannot create key for undefined");return typeof t=="string"?t:JSON.stringify(t)}),k(this,y,e)}clear(){l(this,c).clear(),this.fireEvent("change",void 0)}keys(){return l(this,c).keys()}values(){return l(this,c).values()}toArray(){return Array.from(l(this,c).entries())}frequencyOf(e){if(typeof e=="string")return l(this,c).get(e);const t=l(this,y).call(this,e);return l(this,c).get(t)}entries(){return Array.from(l(this,c).entries())}entriesSorted(e){return L(e)(this.entries())}add(...e){if(e===void 0)throw new Error("value parameter is undefined");e.map(l(this,y)).forEach(r=>{const a=l(this,c).get(r)??0;l(this,c).set(r,a+1)}),this.fireEvent("change",void 0)}};c=new WeakMap;y=new WeakMap;var ve=e=>{if(e!=null)try{if(typeof e=="string"){if(e.length===0)return;const t=JSON.parse(e);if(!Array.isArray(t)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<t.length;r++){if(!Array.isArray(t[r])){console.error("Histogram array should consist of inner arrays");return}if(t[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof t[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof t[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return t}}catch(t){console.log(e),console.error(t)}},h=class extends W{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(e,t,r){const{percentage:a}=e,[s,i]=e.data,o=1,n=2,u=t+1,d=u+1,g=f`<div class="data">${i}</div>`,H=f`${s}`;return f`
    <div class="bar" style="grid-area: ${o} / ${u} / ${n} / ${d}">
      <div class="barTrack" style="height: ${(a??0)*100}%"></div>
      ${this.showDataLabels?g:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${o+2} / ${u} / ${n+2} / ${d}">
      ${this.showXAxis?H:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return f``;const e=this.data??this.json,t=e.length,r=Math.max(...e.map(n=>n[1])),a=e.map(n=>({data:n,percentage:n[1]/r})),s=f`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${e.length+1}"></div>`,i=this.height?`height: ${this.height};`:"";return f`
    <style>
    div.chart {
      grid-template-columns: repeat(${e.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${i}">
      <div class="chart">
      ${U(a,n=>n.data[0],(n,u)=>this.barTemplate(n,u,t))}
        ${this.showXAxis?s:""}
      </div>
    </div>`}};B(h,"styles",z`
    :host {
    }
    div.container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    div.chart {
      display: grid;
      flex: 1;
      grid-template-rows: 1fr 1px min-content;
      justify-items: center;
    }
    div.bar {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-self: normal;
      padding-left: 0.3vw;
      padding-right: 0.3vw;
    }
    div.bar>div.barTrack {
      background-color: var(--histogram-bar-color, gray);
      align-self: stretch;
    }
    div.xAxisLabels, div.data {
      font-size: min(1vw, 1em);
      color: var(--histogram-label-color, currentColor);
    }
    div.xAxisLabels {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }
    div.xAxis {
      background-color: var(--histogram-axis-color, silver);
      width: 100%;
      height: 100%;
    }
  `);v([p()],h.prototype,"data",2);v([p()],h.prototype,"showDataLabels",2);v([p()],h.prototype,"height",2);v([p()],h.prototype,"showXAxis",2);v([p({converter:ve,type:Object})],h.prototype,"json",2);h=v([Z("histogram-vis")],h);var w,fe=class{constructor(e){B(this,"el"),N(this,w,void 0),this.el=e}setAutoSort(e){k(this,w,L(e))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const e=this.el;e!==void 0&&e.remove()}update(e){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}l(this,w)!==void 0?this.el.data=l(this,w).call(this,e):this.el.data=[...e]}};w=new WeakMap;const m=K("#dataStream",{capacity:8,timestamp:!1}),x=he(),X=new fe(document.getElementById("dataPlot"));X.setAutoSort("valueReverse");let R=200,j=0;x.addEventListener("change",()=>{X.update(x.toArray())});const C=()=>{m.log("Start"),m.log(),j=window.setInterval(()=>{R--;const e=T.weighted(1,100).toString();x.add(e),m.log(e.toString()),R<=0&&G()},1e3)},G=()=>{j!==0&&(m.log("Stop"),m.log(),R=200,window.clearInterval(j))},me=()=>{x.clear(),m.log()};document.getElementById("btnStart").addEventListener("click",C);document.getElementById("btnStop").addEventListener("click",G);document.getElementById("btnClear").addEventListener("click",me);C();
