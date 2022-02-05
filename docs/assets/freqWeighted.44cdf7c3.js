import{g as L,f as E,R as _}from"./bundle.ef063f06.js";import{d as x,h as i,c as j,e as C,f as b,l as H}from"./chunk-4WJCK6OW.dc07580d.js";import"./chunk-RGWQELNS.82f84363.js";import{a as I,b as d,c as W,d as o,f as T,g as B}from"./vendor.ae2f83e2.js";import"./chunk-63GPL4EQ.94292053.js";import"./chunk-KYWIDCWW.7a3a5fae.js";import"./chunk-5VE7K3W4.abc39e5b.js";import"./chunk-TD4SHBHU.a3ff9292.js";var D=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},a=class extends W{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,v]=t.data,p=1,s=2,l=e+1,y=l+1,S=o`<div class="data">${v}</div>`,k=o`${u}`;return o`
    <div class="bar" style="grid-area: ${p} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?S:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${p+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?k:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),u=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,v=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${v}">
      <div class="chart">
      ${T(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?u:""}
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
  `);i([d()],a.prototype,"data",2);i([d()],a.prototype,"showDataLabels",2);i([d()],a.prototype,"height",2);i([d()],a.prototype,"showXAxis",2);i([d({converter:D,type:Object})],a.prototype,"json",2);a=i([B("histogram-vis")],a);var c,q=class{constructor(t){x(this,"el"),j(this,c,void 0),this.el=t}setAutoSort(t){C(this,c,L(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,c)!==void 0?this.el.data=b(this,c).call(this,t):this.el.data=[...t]}};c=new WeakMap;const n=H("#dataStream",{capacity:8,timestamp:!1}),h=E(),w=new q(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let f=200,m=0;h.addEventListener("change",()=>{w.update(h.toArray())});const $=()=>{n.log("Start"),n.log(),m=window.setInterval(()=>{f--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),f<=0&&A()},1e3)},A=()=>{m!==0&&(n.log("Stop"),n.log(),f=200,window.clearInterval(m))},F=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",$);document.getElementById("btnStop").addEventListener("click",A);document.getElementById("btnClear").addEventListener("click",F);$();
