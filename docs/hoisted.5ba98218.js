import{_ as A,T as n,U as S,l as L,W as E,X as k}from"./chunks/chunk-7CFIYHND.a394a40b.js";import{n as I,p as d,q as T,x as a,r as _,t as q}from"./client-shim.8cb18301.js";import"./chunks/ReplPad.a7cd304d.js";var C=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends T{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:h}=t,[g,u]=t.data,v=1,s=2,l=e+1,f=l+1,w=a`<div class="data">${u}</div>`,$=a`${g}`;return a` <div
        class="bar"
        style="grid-area: ${v} / ${l} / ${s} / ${f}"
      >
        <div class="barTrack" style="height: ${(h??0)*100}%"></div>
        ${this.showDataLabels?w:""}
      </div>
      <div
        class="xAxisLabels"
        style="grid-area: ${v+2} / ${l} / ${s+2} / ${f}"
      >
        ${this.showXAxis?$:""}
      </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return a``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),h=t.map(s=>({data:s,percentage:s[1]/r})),g=a`<div
      class="xAxis"
      style="grid-area: 2 / 1 / 3 / ${t.length+1}"
    ></div>`,u=this.height?`height: ${this.height};`:"";return a` <style>
        div.chart {
          grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
        }
      </style>
      <div class="container" style="${u}">
        <div class="chart">
          ${_(h,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
          ${this.showXAxis?g:""}
        </div>
      </div>`}};A(i,"styles",I`
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
    div.bar > div.barTrack {
      background-color: var(--histogram-bar-color, gray);
      align-self: stretch;
    }
    div.xAxisLabels,
    div.data {
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
  `);n([d()],i.prototype,"data",2);n([d()],i.prototype,"showDataLabels",2);n([d()],i.prototype,"height",2);n([d()],i.prototype,"showXAxis",2);n([d({converter:C,type:Object})],i.prototype,"json",2);i=n([q("histogram-vis")],i);var H=class{el;#t;constructor(t){this.el=t}setAutoSort(t){this.#t=S(t)}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}this.#t!==void 0?this.el.data=this.#t(t):this.el.data=[...t]}};const o=L("#dataStream",{capacity:8,timestamp:!1}),c=E(),y=new H(document.getElementById("dataPlot"));y.setAutoSort("valueReverse");let m=200,p=0;c.addEventListener("change",()=>{y.update(c.toArray())});const x=()=>{o.log("Start"),o.log(),p=window.setInterval(()=>{m--;const t=k.weightedInteger(10).toString();c.add(t),o.log(t.toString()),m<=0&&b()},300)},b=()=>{p!==0&&(o.log("Stop"),o.log(),m=200,window.clearInterval(p))},B=()=>{c.clear(),o.log()};document.getElementById("btnStart").addEventListener("click",x);document.getElementById("btnStop").addEventListener("click",b);document.getElementById("btnClear").addEventListener("click",B);x();
