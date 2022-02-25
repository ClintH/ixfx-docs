import{g as j,f as L,R as E}from"./chunk-IRTA6V53.d9034266.js";import"./chunk-JV2C55HY.cd1c20e3.js";import"./chunk-HEUMPV43.90b57ae6.js";import"./chunk-VAHXRYL4.a924033a.js";import{l as _}from"./chunk-C2GSEUUB.5e1d8426.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-YNVHP56G.0c46a1b2.js";import"./chunk-MLAH6NN5.d44956e5.js";import"./chunk-GLOC4ABQ.54c1521f.js";import"./chunk-57USKCMY.339b34ad.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{b as x,h as i,a as C,c as H,d as b}from"./chunk-YDTVC7MM.cb3895f8.js";import{a as I,b as c,c as M,d as o,f as T,n as V}from"./vendor.a59a155e.js";var B=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},a=class extends M{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:u}=t,[g,p]=t.data,m=1,s=2,l=e+1,y=l+1,$=o`<div class="data">${p}</div>`,S=o`${g}`;return o`
    <div class="bar" style="grid-area: ${m} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(u??0)*100}%"></div>
      ${this.showDataLabels?$:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${m+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?S:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),u=t.map(s=>({data:s,percentage:s[1]/r})),g=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${p}">
      <div class="chart">
      ${T(u,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?g:""}
      </div>
    </div>`}};x(a,"styles",I`
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
  `);i([c()],a.prototype,"data",2);i([c()],a.prototype,"showDataLabels",2);i([c()],a.prototype,"height",2);i([c()],a.prototype,"showXAxis",2);i([c({converter:B,type:Object})],a.prototype,"json",2);a=i([V("histogram-vis")],a);var d,P=class{constructor(t){x(this,"el"),C(this,d,void 0),this.el=t}setAutoSort(t){H(this,d,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,d)!==void 0?this.el.data=b(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const n=_("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new P(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let v=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const A=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{v--;const t=E.weightedInteger(10).toString();h.add(t),n.log(t.toString()),v<=0&&k()},300)},k=()=>{f!==0&&(n.log("Stop"),n.log(),v=200,window.clearInterval(f))},F=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",k);document.getElementById("btnClear").addEventListener("click",F);A();
