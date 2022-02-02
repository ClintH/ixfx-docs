var y=Object.defineProperty;var m=(e,t,r)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>(m(e,typeof t!="symbol"?t+"":t,r),r);import{s as b,r as w,$ as c,c as $,e as g,n as A}from"./vendor.16f5372c.js";var j=Object.defineProperty,L=Object.getOwnPropertyDescriptor,h=(e,t,r,a)=>{for(var s=a>1?void 0:a?L(t,r):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(s=(a?n(t,r,s):n(s))||s);return a&&s&&j(t,r,s),s};const O=e=>{if(!(e==null||e==="undefined"))try{if(typeof e=="string"){if(e.length===0)return;const t=JSON.parse(e);if(!Array.isArray(t)){console.error("Histogram innerText should be JSON array");return}for(let r=0;r<t.length;r++){if(!Array.isArray(t[r])){console.error("Histogram array should consist of inner arrays");return}if(t[r].length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof t[r][0]!="string"){console.error(`First element of inner array should be a string (index ${r})`);return}if(typeof t[r][1]!="number"){console.error(`Second element of inner array should be a number (index ${r})`);return}}return t}}catch(t){console.log(e),console.error(t)}};var v;let l=(v=class extends b{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(e,t,r){const{percentage:a}=e,[s,o]=e.data,n=1,i=2,d=t+1,f=d+1,u=c`<div class="data">${o}</div>`,x=c`${s}`;return c`
    <div class="bar" style="grid-area: ${n} / ${d} / ${i} / ${f}">
      <div class="barTrack" style="height: ${(a??0)*100}%"></div>
      ${this.showDataLabels?u:""}
    </div>
    <div class="xAxisLabels" style="grid-area: ${n+2} / ${d} / ${i+2} / ${f}">
      ${this.showXAxis?x:""}
    </div>`}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return c``;const e=this.data??this.json,t=e.length,r=Math.max(...e.map(i=>i[1])),a=e.map(i=>({data:i,percentage:i[1]/r})),s=c`<div class="xAxis" style="grid-area: 2 / 1 / 3 / ${e.length+1}"></div>`,o=this.height?`height: ${this.height};`:"";return c`
    <style>
    div.chart {
      grid-template-columns: repeat(${e.length}, minmax(2px, 1fr));
    }
    </style>
    <div class="container" style="${o}">
      <div class="chart">
      ${$(a,i=>i.data[0],(i,d)=>this.barTemplate(i,d,t))}
        ${this.showXAxis?s:""}
      </div>
    </div>`}},p(v,"styles",w`
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
  `),v);h([g()],l.prototype,"data",2);h([g()],l.prototype,"showDataLabels",2);h([g()],l.prototype,"height",2);h([g()],l.prototype,"showXAxis",2);h([g({converter:O,type:Object})],l.prototype,"json",2);l=h([A("histogram-vis")],l);
