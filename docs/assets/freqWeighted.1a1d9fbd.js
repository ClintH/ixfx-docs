import{g as j,f as _,R as E}from"./bundle.46f9cf95.js";import{c as x,k as a,b as L,d as I,e as b,l as H}from"./chunk-X3ZGK7G7.0ec20d2d.js";import"./chunk-OW53XONI.6c7bafde.js";import{a as T,b as d,c as X,g as o,h as C,j as F}from"./vendor.a3225d27.js";import"./chunk-EZEZXIPN.e33bee28.js";import"./chunk-HCHJFXUB.99dbbc1f.js";import"./chunk-6TOA6ITG.8d1de678.js";import"./chunk-FM2K2PHF.079c4314.js";import"./chunk-776RPVJQ.ce76deb3.js";var B=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends X{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,v]=t.data,p=1,s=2,l=e+1,y=l+1,k=o`<div class="data">${v}</div>`,S=o`${u}`;return o`
    <div class="bar" style="grid-area: ${p} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?k:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${p+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?S:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),u=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,v=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${v}">
      <div class="chart">
      ${C(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
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
  `);a([d()],i.prototype,"data",2);a([d()],i.prototype,"showDataLabels",2);a([d()],i.prototype,"height",2);a([d()],i.prototype,"showXAxis",2);a([d({converter:B,type:Object})],i.prototype,"json",2);i=a([F("histogram-vis")],i);var c,O=class{constructor(t){x(this,"el"),L(this,c,void 0),this.el=t}setAutoSort(t){I(this,c,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,c)!==void 0?this.el.data=b(this,c).call(this,t):this.el.data=[...t]}};c=new WeakMap;const n=H("#dataStream",{capacity:8,timestamp:!1}),h=_(),w=new O(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let m=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const A=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{m--;const t=E.weighted(1,100).toString();h.add(t),n.log(t.toString()),m<=0&&$()},1e3)},$=()=>{f!==0&&(n.log("Stop"),n.log(),m=200,window.clearInterval(f))},P=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",$);document.getElementById("btnClear").addEventListener("click",P);A();
