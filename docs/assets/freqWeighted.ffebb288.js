import{g as j,f as L,R as _}from"./bundle.f174d965.js";import{l as I}from"./chunk-BWZCVD5D.b52e1602.js";import{b as x,n as a,a as E,d as T,e as b}from"./chunk-25RM45LF.6197efee.js";import"./chunk-UWLZSNHO.60128285.js";import{a as H,b as c,c as C,g as o,h as F,j as B}from"./vendor.a3225d27.js";import"./chunk-MTK5JJI3.2542cf04.js";import"./chunk-6JTGCZJL.ec4f5d4b.js";import"./chunk-FRVUOYS5.9da9d51c.js";import"./chunk-HMIKWFIT.8fbf0b10.js";import"./chunk-YFNN25WV.35b6f5f2.js";import"./chunk-KWHKIGT7.cb30f031.js";var D=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends C{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,p]=t.data,m=1,s=2,l=e+1,y=l+1,k=o`<div class="data">${p}</div>`,S=o`${u}`;return o`
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
      ${F(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?u:""}
      </div>
    </div>`}};x(i,"styles",H`
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
  `);a([c()],i.prototype,"data",2);a([c()],i.prototype,"showDataLabels",2);a([c()],i.prototype,"height",2);a([c()],i.prototype,"showXAxis",2);a([c({converter:D,type:Object})],i.prototype,"json",2);i=a([B("histogram-vis")],i);var d,J=class{constructor(t){x(this,"el"),E(this,d,void 0),this.el=t}setAutoSort(t){T(this,d,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,d)!==void 0?this.el.data=b(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const n=I("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new J(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let v=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const $=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{v--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),v<=0&&A()},1e3)},A=()=>{f!==0&&(n.log("Stop"),n.log(),v=200,window.clearInterval(f))},M=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",$);document.getElementById("btnStop").addEventListener("click",A);document.getElementById("btnClear").addEventListener("click",M);$();