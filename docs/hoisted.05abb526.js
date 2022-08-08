import{T as L,l as k,M as E,U as I}from"./chunks/chunk-CWNWYEFL.2e02d266.js";import{c as b,h as n,a as T,d as q,b as x}from"./chunks/chunk-IP2OCIJK.bdd1e666.js";import{h as C,j as c,k as H,p as i,q as j,t as B}from"./client-shim.cda72367.js";import"./chunks/ReplPad.9859a521.js";var D=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},a=class extends H{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[v,u]=t.data,p=1,s=2,l=e+1,y=l+1,S=i`<div class="data">${u}</div>`,_=i`${v}`;return i`
    <div class="bar" style="grid-area: ${p} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?S:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${p+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?_:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return i``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),v=i`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,u=this.height?`height: ${this.height};`:"";return i`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${u}">
      <div class="chart">
      ${j(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?v:""}
      </div>
    </div>`}};b(a,"styles",C`
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
  `);n([c()],a.prototype,"data",2);n([c()],a.prototype,"showDataLabels",2);n([c()],a.prototype,"height",2);n([c()],a.prototype,"showXAxis",2);n([c({converter:D,type:Object})],a.prototype,"json",2);a=n([B("histogram-vis")],a);var d,F=class{constructor(t){b(this,"el"),T(this,d,void 0),this.el=t}setAutoSort(t){q(this,d,L(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}x(this,d)!==void 0?this.el.data=x(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const o=k("#dataStream",{capacity:8,timestamp:!1}),h=E(),w=new F(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let m=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const $=()=>{o.log("Start"),o.log(),f=window.setInterval(()=>{m--;const t=I.weightedInteger(10).toString();h.add(t),o.log(t.toString()),m<=0&&A()},300)},A=()=>{f!==0&&(o.log("Stop"),o.log(),m=200,window.clearInterval(f))},M=()=>{h.clear(),o.log()};document.getElementById("btnStart").addEventListener("click",$);document.getElementById("btnStop").addEventListener("click",A);document.getElementById("btnClear").addEventListener("click",M);$();
