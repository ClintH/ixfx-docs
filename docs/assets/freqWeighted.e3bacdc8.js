import{g as j,f as L,R as E}from"./bundle.422aab01.js";import{l as _}from"./chunk-C2GSEUUB.5e1d8426.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-57USKCMY.8e2e6641.js";import{b,h as a,a as H,c as C,d as x}from"./chunk-YDTVC7MM.cb3895f8.js";import{a as I,b as c,c as M,d as o,f as B,g as P}from"./vendor.62e1b176.js";import"./chunk-4QHRIV2D.fbda9e8a.js";import"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-HEUMPV43.b1865ec8.js";import"./chunk-MLAH6NN5.257adfe4.js";import"./chunk-YNVHP56G.6e14c695.js";var T=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends M{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,p]=t.data,m=1,s=2,l=e+1,y=l+1,k=o`<div class="data">${p}</div>`,S=o`${u}`;return o`
    <div class="bar" style="grid-area: ${m} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?k:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${m+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?S:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),u=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${p}">
      <div class="chart">
      ${B(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?u:""}
      </div>
    </div>`}};b(i,"styles",I`
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
  `);a([c()],i.prototype,"data",2);a([c()],i.prototype,"showDataLabels",2);a([c()],i.prototype,"height",2);a([c()],i.prototype,"showXAxis",2);a([c({converter:T,type:Object})],i.prototype,"json",2);i=a([P("histogram-vis")],i);var d,V=class{constructor(t){b(this,"el"),H(this,d,void 0),this.el=t}setAutoSort(t){C(this,d,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}x(this,d)!==void 0?this.el.data=x(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const n=_("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new V(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let v=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const A=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{v--;const t=E.weightedInteger(10).toString();h.add(t),n.log(t.toString()),v<=0&&$()},300)},$=()=>{f!==0&&(n.log("Stop"),n.log(),v=200,window.clearInterval(f))},D=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",$);document.getElementById("btnClear").addEventListener("click",D);A();
