import{g as j,f as L,R as _}from"./bundle.978286b9.js";import{d as x,q as a,c as E,e as C,f as b,l as I}from"./chunk-4WJCK6OW.7396b794.js";import"./chunk-VN6BZR7Y.59fd31c7.js";import{a as T,b as c,c as q,g as o,h as B,j as H}from"./vendor.d00e998c.js";import"./chunk-NT44FLGP.251679ab.js";import"./chunk-KYWIDCWW.4c25be89.js";import"./chunk-G44UTPJC.92d22f4f.js";import"./chunk-SG7ZQ2JY.9cef9652.js";var W=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends q{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,v]=t.data,p=1,s=2,l=e+1,y=l+1,S=o`<div class="data">${v}</div>`,k=o`${u}`;return o`
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
      ${B(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
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
  `);a([c()],i.prototype,"data",2);a([c()],i.prototype,"showDataLabels",2);a([c()],i.prototype,"height",2);a([c()],i.prototype,"showXAxis",2);a([c({converter:W,type:Object})],i.prototype,"json",2);i=a([H("histogram-vis")],i);var d,D=class{constructor(t){x(this,"el"),E(this,d,void 0),this.el=t}setAutoSort(t){C(this,d,j(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,d)!==void 0?this.el.data=b(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const n=I("#dataStream",{capacity:8,timestamp:!1}),h=L(),w=new D(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let m=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const $=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{m--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),m<=0&&A()},1e3)},A=()=>{f!==0&&(n.log("Stop"),n.log(),m=200,window.clearInterval(f))},F=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",$);document.getElementById("btnStop").addEventListener("click",A);document.getElementById("btnClear").addEventListener("click",F);$();
