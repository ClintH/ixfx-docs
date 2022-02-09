import{g as j,f as L,R as _}from"./bundle.d5f56056.js";import{l as E}from"./chunk-JLAHASPM.045da619.js";import{a as x,n as i,b as H,d as I,c as b}from"./chunk-UDOW5UY7.00d3a5c3.js";import"./chunk-3TSPSTUR.0c63f691.js";import{a as J,b as d,c as T,g as o,h as C,i as P}from"./vendor.aa1ac2c8.js";import"./chunk-WGSYSC7J.a829d299.js";import"./chunk-FPOHJL6J.981a7808.js";import"./chunk-G4S3XAFG.a06889d7.js";import"./chunk-GI2JUAJJ.a179dd58.js";import"./chunk-IARP4YHS.e1edd6af.js";var F=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},a=class extends T{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,p]=t.data,v=1,s=2,l=e+1,y=l+1,$=o`<div class="data">${p}</div>`,k=o`${u}`;return o`
    <div class="bar" style="grid-area: ${v} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?$:""}
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
    </div>`}};x(a,"styles",J`
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
  `);i([d()],a.prototype,"data",2);i([d()],a.prototype,"showDataLabels",2);i([d()],a.prototype,"height",2);i([d()],a.prototype,"showXAxis",2);i([d({converter:F,type:Object})],a.prototype,"json",2);a=i([P("histogram-vis")],a);var c,q=class{constructor(t){x(this,"el"),H(this,c,void 0),this.el=t}setAutoSort(t){I(this,c,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,c)!==void 0?this.el.data=b(this,c).call(this,t):this.el.data=[...t]}};c=new WeakMap;const n=E("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new q(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let m=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const A=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{m--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),m<=0&&S()},1e3)},S=()=>{f!==0&&(n.log("Stop"),n.log(),m=200,window.clearInterval(f))},B=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",S);document.getElementById("btnClear").addEventListener("click",B);A();
