var m=Object.defineProperty;var v=(r,e,t)=>e in r?m(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var f=(r,e,t)=>(v(r,typeof e!="symbol"?e+"":e,t),t);import{s as g,r as w,$ as y,o as b,e as d}from"./vendor.a3225d27.js";import{P as x,C as P,a as C,D as j}from"./chunk-5LTT7AGF.2750761f.js";import"./chunk-672VRZPI.818522b7.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-7CELPBFO.f6fe4a50.js";import"./chunk-V2CC3OS2.f8999184.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{G as h}from"./bundle.293982e7.js";import{e as S}from"./styles.0da1a4a9.js";import{f as M}from"./chunk-TZCTWNJW.f780cc2a.js";import"./chunk-YDTVC7MM.cb3895f8.js";import"./chunk-PJBWMDPZ.4ed5cce9.js";import"./chunk-MLAH6NN5.257adfe4.js";import"./chunk-QC5UDUYU.8c389651.js";var k=Object.defineProperty,_=Object.getOwnPropertyDescriptor,p=(r,e,t,o)=>{for(var n=o>1?void 0:o?_(e,t):e,s=r.length-1,i;s>=0;s--)(i=r[s])&&(n=(o?i(e,t,n):i(n))||n);return o&&n&&k(e,t,n),n};const R="funcplot-element";class c extends g{constructor(){super();f(this,"plotter");this.animatedDraw=!1,this.xResolution=.1,this.classes={withBottom:!0},this.func=e=>e-1}async plot(){console.log("plot");let e=this.plotter;if(e===void 0){const o=x.create();o.add("series",P.getCssVariable("accent-bold","yellow"));const n={capacity:0,palette:o,autoSizeCanvas:!1,showYAxis:!0,showXAxis:!0,plotSize:{width:100,height:100}},s=this.shadowRoot.querySelector("#plot");if(s===null)throw new Error("#plot not found");this.plotter=e=C.plot(s,n)}else e.clear();const t=h.rangePercent(this.xResolution);if(this.animatedDraw)for await(const o of M.interval(t,200))console.log(`animated: ${o}`),e.add(this.func(o));else for(let o of t)e.add(this.func(o));this.demoMove()}demoOpacity(){const e=h.rangePercent(.01);this.demoInit((t,o)=>{o.beginPath();const n=e.next();let s=1;return n.done||(s=this.func(n.value)),s=Math.floor(s*100),o.fillStyle=`hsla(200,80%,50%,${s}%)`,o.fillRect(0,0,t.width,t.height),!n.done})}demoSize(){const e=h.rangePercent(.01);this.demoInit((t,o)=>{const n=t.height-40,s={x:0,y:0,width:t.width,height:t.height},i=e.next();let a=1;return i.done||(a=this.func(i.value)),a=Math.floor(a*n),o.font=`${a}px serif`,o.fillStyle="yellow",j.textBlockCentered(o,["RELAX"],{bounds:s}),!i.done})}demoMove(){const e=h.rangePercent(.01),t=10;this.demoInit((o,n)=>{n.fillStyle="yellow",n.beginPath();const s=o.width-4*t,i=e.next(),a=o.height/2-t/2;let l=1;i.done||(l=this.func(i.value));const u=t+t+l*s;return n.arc(u,a,t,0,Math.PI*2),n.fill(),!i.done})}demoInit(e){const t=this.shadowRoot.querySelector("#demoCanvas");if(t===null){console.error("#demoCanvas not found :(");return}const o=t.parentElement,n=o.getBoundingClientRect(),s=0,i={width:n.width-s-s,height:n.height-s-s};t.height=o.clientHeight,t.width=o.clientWidth;const a=()=>{const l=t.getContext("2d");l.save(),l.translate(s,s),l.clearRect(0,0,i.width,i.height);const u=e(i,l);l.restore(),u&&window.requestAnimationFrame(a)};window.requestAnimationFrame(a)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",e=>{document.visibilityState==="visible"&&this.plot()})}render(){return console.log("render"),y`
    <div id="container" class=${b(this.classes)}>
      <canvas id="plot"></canvas>
      <div class="vertical mini toolbar">
        <button @click="${this.demoMove}">Move</button>
        <button @click="${this.demoOpacity}">Opacity</button>
        <button @click="${this.demoSize}">Size</button>
      </div>
      <div id="demo"><canvas id="demoCanvas"></div>
    </div> 
    `}}f(c,"styles",[S,w`

      #container {
        display: flex;
      }
      #plot {
      }
      #demo {
        flex-grow: 1;
      }
      #demoCanvas {
        position: absolute;
      }
  `]);p([d()],c.prototype,"classes",2);p([d()],c.prototype,"func",2);p([d({type:Boolean})],c.prototype,"animatedDraw",2);p([d({type:Number})],c.prototype,"xResolution",2);customElements.define(R,c);
