import{g as j,f as L,R as _}from"./bundle.adef3714.js";import{l as E}from"./chunk-DIQ6ZWAQ.94b98cf2.js";import{b,n as i,a as H,c as I,d as x}from"./chunk-EGNKYH6P.1933f072.js";import"./chunk-HF2GNML5.47466bb1.js";import{a as T,b as d,c as B,g as o,h as C,j as D}from"./vendor.d9edd6b2.js";import"./chunk-URTBDQYG.939553de.js";import"./chunk-MQKU5S5M.fc8875ae.js";import"./chunk-G4S3XAFG.00fb0b2a.js";import"./chunk-ZTVWXQ34.a8bb2adc.js";import"./chunk-IARP4YHS.d362b978.js";var F=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},a=class extends B{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,p]=t.data,v=1,s=2,l=e+1,y=l+1,S=o`<div class="data">${p}</div>`,k=o`${u}`;return o`
    <div class="bar" style="grid-area: ${v} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?S:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${v+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?k:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),u=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,p=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${p}">
      <div class="chart">
      ${C(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?u:""}
      </div>
    </div>`}};b(a,"styles",T`
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
  `);i([d()],a.prototype,"data",2);i([d()],a.prototype,"showDataLabels",2);i([d()],a.prototype,"height",2);i([d()],a.prototype,"showXAxis",2);i([d({converter:F,type:Object})],a.prototype,"json",2);a=i([D("histogram-vis")],a);var c,G=class{constructor(t){b(this,"el"),H(this,c,void 0),this.el=t}setAutoSort(t){I(this,c,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}x(this,c)!==void 0?this.el.data=x(this,c).call(this,t):this.el.data=[...t]}};c=new WeakMap;const n=E("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new G(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let m=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const A=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{m--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),m<=0&&$()},1e3)},$=()=>{f!==0&&(n.log("Stop"),n.log(),m=200,window.clearInterval(f))},M=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",$);document.getElementById("btnClear").addEventListener("click",M);A();
