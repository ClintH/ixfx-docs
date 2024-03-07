import{f as A}from"./chunks/chunk-DQRNLTXJ.989706cb.js";import"./chunks/chunk-LJEMCDK3.04845b20.js";import{l as S}from"./chunks/chunk-J62BM3EA.66d2cd2d.js";import"./chunks/chunk-GRFVFAQ5.c7dd4170.js";import{aN as L,bd as E}from"./chunks/chunk-UZEP5NPQ.5116c20e.js";import{q as k,r as n}from"./chunks/chunk-7KTY42OF.629611b4.js";import{n as I,p as c,q,x as i,r as C,t as H}from"./client-shim.a8276547.js";import"./chunks/ReplPad.e47c6a40.js";var T=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const r=JSON.parse(t);if(!Array.isArray(r)){console.error("Histogram innerText should be JSON array");return}for(const[l,s]of r.entries()){if(!Array.isArray(s)){console.error("Histogram array should consist of inner arrays");return}if(s.length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof s[0]!="string"){console.error(`First element of inner array should be a string (index ${l})`);return}if(typeof s[1]!="number"){console.error(`Second element of inner array should be a number (index ${l})`);return}}return r}}catch(r){console.log(t),console.error(r)}},o=class extends q{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,r,l){const{percentage:s}=t,[g,m]=t.data,u=1,e=2,d=r+1,f=d+1,w=i`<div class="data">${m}</div>`,$=i`${g}`;return i`
      <div
             class="bar"
             style="grid-area: ${u} / ${d} / ${e} / ${f}"
           >
             <div class="barTrack" style="height: ${(s??0)*100}%"></div>
             ${this.showDataLabels?w:""}
           </div>
           <div
             class="xAxisLabels"
             style="grid-area: ${u+2} / ${d} / ${e+2} / ${f}"
           >
             ${this.showXAxis?$:""}
           </div>
    `}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return i``;const t=this.data??this.json,r=t.length,l=Math.max(...t.map(e=>e[1])),s=t.map(e=>({data:e,percentage:e[1]/l})),g=i`
      <div
            class="xAxis"
            style="grid-area: 2 / 1 / 3 / ${t.length+1}"
          ></div>
    `,m=this.height?`height: ${this.height};`:"";return i`
      <style>
             div.chart {
               grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
             }
           </style>
           <div class="container" style="${m}">
             <div class="chart">
               ${C(s,e=>e.data[0],(e,d)=>this.barTemplate(e,d,r))}
               ${this.showXAxis?g:""}
             </div>
           </div>
    `}};k(o,"styles",I`
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
  `);n([c()],o.prototype,"data",2);n([c()],o.prototype,"showDataLabels",2);n([c()],o.prototype,"height",2);n([c()],o.prototype,"showXAxis",2);n([c({converter:T,type:Object})],o.prototype,"json",2);o=n([H("histogram-vis")],o);var _=class{el;#t;constructor(t){this.el=t}setAutoSort(t){this.#t=L(t)}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}this.el.data=this.#t===void 0?[...t]:this.#t(t)}};const a=S("#dataStream",{capacity:8,timestamp:!1}),h=A(),y=new _(document.getElementById("dataPlot"));y.setAutoSort("valueReverse");let p=200,v=0;h.addEventListener("change",()=>{y.update(h.toArray())});const x=()=>{a.log("Start"),a.log(),v=window.setInterval(()=>{p--;const t=E.weightedInteger(10).toString();h.add(t),a.log(t.toString()),p<=0&&b()},300)},b=()=>{v!==0&&(a.log("Stop"),a.log(),p=200,window.clearInterval(v))},B=()=>{h.clear(),a.log()};document.getElementById("btnStart").addEventListener("click",x);document.getElementById("btnStop").addEventListener("click",b);document.getElementById("btnClear").addEventListener("click",B);x();
