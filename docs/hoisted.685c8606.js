import{g as L,f as k}from"./chunks/chunk-LLVNI3R6.d0465298.js";import"./chunks/chunk-OMXZMOOU.e9ad33f4.js";import"./chunks/chunk-C37FD3JM.0197111f.js";import"./chunks/chunk-CCOKD2RJ.6f84344a.js";import"./chunks/chunk-4THA4YVV.4ccaabcd.js";import{l as E}from"./chunks/chunk-SJVFW73P.e7d5b176.js";import"./chunks/chunk-DTRNDG6C.d0f370a4.js";import"./chunks/chunk-KSM64VVS.8ad851d7.js";import"./chunks/chunk-WPZ6N3LH.b2673484.js";import{R as I}from"./chunks/chunk-6TM6SJDV.d463ae79.js";import"./chunks/chunk-QLMTBJ7O.4bda2143.js";import{b,h as n,a as q,c as C,d as x}from"./chunks/chunk-FQLUQVDZ.735c98e3.js";import{h as H,j as c,k as T,p as o,q as j,t as B}from"./client-shim.cda72367.js";import"./chunks/ReplPad.d3192ec2.js";var D=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<e.length;r++){if(!Array.isArray(e[r])){console.error("Histogram array should consist of inner arrays");return}if(e[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof e[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof e[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return e}}catch(e){console.log(t),console.error(e)}},i=class extends T{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,r){const{percentage:g}=t,[p,m]=t.data,v=1,s=2,l=e+1,y=l+1,S=o`<div class="data">${m}</div>`,_=o`${p}`;return o`
    <div class="bar" style="grid-area: ${v} / ${l} / ${s} / ${y}">
      <div class="barTrack" style="height: ${(g??0)*100}%"></div>
      ${this.showDataLabels?S:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${v+2} / ${l} / ${s+2} / ${y}">
      ${this.showXAxis?_:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return o``;const t=this.data??this.json,e=t.length,r=Math.max(...t.map(s=>s[1])),g=t.map(s=>({data:s,percentage:s[1]/r})),p=o`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${t.length+1}"></div>`,m=this.height?`height: ${this.height};`:"";return o`
    <style>
    div.chart {
      grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${m}">
      <div class="chart">
      ${j(g,s=>s.data[0],(s,l)=>this.barTemplate(s,l,e))}
        ${this.showXAxis?p:""}
      </div>
    </div>`}};b(i,"styles",H`
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
  `);n([c()],i.prototype,"data",2);n([c()],i.prototype,"showDataLabels",2);n([c()],i.prototype,"height",2);n([c()],i.prototype,"showXAxis",2);n([c({converter:D,type:Object})],i.prototype,"json",2);i=n([B("histogram-vis")],i);var d,F=class{constructor(t){b(this,"el"),q(this,d,void 0),this.el=t}setAutoSort(t){C(this,d,L(t))}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}x(this,d)!==void 0?this.el.data=x(this,d).call(this,t):this.el.data=[...t]}};d=new WeakMap;const a=E("#dataStream",{capacity:8,timestamp:!1}),h=k(),w=new F(document.getElementById("dataPlot"));w.setAutoSort("valueReverse");let u=200,f=0;h.addEventListener("change",()=>{w.update(h.toArray())});const $=()=>{a.log("Start"),a.log(),f=window.setInterval(()=>{u--;const t=I.weightedInteger(10).toString();h.add(t),a.log(t.toString()),u<=0&&A()},300)},A=()=>{f!==0&&(a.log("Stop"),a.log(),u=200,window.clearInterval(f))},X=()=>{h.clear(),a.log()};document.getElementById("btnStart").addEventListener("click",$);document.getElementById("btnStop").addEventListener("click",A);document.getElementById("btnClear").addEventListener("click",X);$();