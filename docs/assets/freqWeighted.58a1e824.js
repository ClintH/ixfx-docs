import{g as j,f as L,R as _}from"./bundle.517499b3.js";import{l as I}from"./chunk-MBZ4GFG7.8e6d603a.js";import{_ as x,a as o,b as E,c as H,d as b}from"./chunk-V6WGO73W.4b0edf4f.js";import"./chunk-UWLZSNHO.00e5f090.js";import{r as T,e as d,s as C,$ as a,c as F,n as O}from"./vendor.1de7a7ed.js";import"./chunk-3SMTKDXD.7befeba5.js";import"./chunk-6JTGCZJL.784fcc38.js";import"./chunk-FRVUOYS5.3d3ad9f9.js";import"./chunk-5WNVOIIJ.b9e34901.js";import"./chunk-YFNN25WV.1363eb0c.js";import"./chunk-IV26GIHI.38b15ea0.js";var B=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends C{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,p]=t.data,m=1,s=2,l=e+1,y=l+1,k=a`<div class="data">${p}</div>`,S=a`${u}`;return a`
    <div class="bar" style="grid-area: ${m} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?k:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${m+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?S:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return a``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),u=a`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return a`
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
    </div>`}};x(i,"styles",T`
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
  `);o([d()],i.prototype,"data",2);o([d()],i.prototype,"showDataLabels",2);o([d()],i.prototype,"height",2);o([d()],i.prototype,"showXAxis",2);o([d({converter:B,type:Object})],i.prototype,"json",2);i=o([O("histogram-vis")],i);var c,D=class{constructor(t){x(this,"el"),E(this,c,void 0),this.el=t}setAutoSort(t){H(this,c,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,c)!==void 0?this.el.data=b(this,c).call(this,t):this.el.data=[...t]}};c=new WeakMap;const n=I("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new D(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let v=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const $=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{v--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),v<=0&&A()},1e3)},A=()=>{f!==0&&(n.log("Stop"),n.log(),v=200,window.clearInterval(f))},G=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",$);document.getElementById("btnStop").addEventListener("click",A);document.getElementById("btnClear").addEventListener("click",G);$();
