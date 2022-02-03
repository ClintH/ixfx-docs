import{g as S,m as j,R as _}from"./bundle.606f4dfe.js";import{d as x,k as i,c as E,e as B,f as b,l as C}from"./chunk-L7NPGFXB.27ec158a.js";import"./chunk-BLJYULJU.fe21a7d9.js";import"./chunk-O3VPZBOU.e8cd7407.js";import"./chunk-RELB4ERA.359f0ce7.js";import{a as I,b as c,c as T,g as o,h as F,i as H}from"./vendor.994fac77.js";import"./chunk-C54446BC.dacc5f5a.js";import"./chunk-D6LT45IM.142de38b.js";import"./chunk-XM3ONRUN.91524ce4.js";var O=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},a=class extends T{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[u,v]=t.data,m=1,s=2,l=e+1,y=l+1,k=o`<div class="data">${v}</div>`,L=o`${u}`;return o`
    <div class="bar" style="grid-area: ${m} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?k:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${m+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?L:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),u=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,v=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${v}">
      <div class="chart">
      ${F(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
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
  `);i([c()],a.prototype,"data",2);i([c()],a.prototype,"showDataLabels",2);i([c()],a.prototype,"height",2);i([c()],a.prototype,"showXAxis",2);i([c({converter:O,type:Object})],a.prototype,"json",2);a=i([H("histogram-vis")],a);var d,R=class{constructor(t){x(this,"el"),E(this,d,void 0),this.el=t}setAutoSort(t){B(this,d,S(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}b(this,d)!==void 0?this.el.data=b(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const n=C("#dataStream",{capacity:8,timestamp:!1}),h=j(),w=new R(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let p=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const A=()=>{n.log("Start"),n.log(),f=window.setInterval(()=>{p--;const t=_.weighted(1,100).toString();h.add(t),n.log(t.toString()),p<=0&&$()},1e3)},$=()=>{f!==0&&(n.log("Stop"),n.log(),p=200,window.clearInterval(f))},X=()=>{h.clear(),n.log()};document.getElementById("btnStart").addEventListener("click",A);document.getElementById("btnStop").addEventListener("click",$);document.getElementById("btnClear").addEventListener("click",X);A();
