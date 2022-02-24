var x=Object.defineProperty;var P=(a,t,e)=>t in a?x(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var f=(a,t,e)=>(P(a,typeof t!="symbol"?t+"":t,e),e);import{s as R,r as S,$ as m,o as C,e as u}from"./vendor.a3225d27.js";import{P as v,C as y,D as M}from"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{G as g}from"./bundle.09734b0b.js";import{e as k}from"./styles.0da1a4a9.js";import{f as j}from"./chunk-YNVHP56G.6e14c695.js";import"./chunk-YDTVC7MM.cb3895f8.js";import"./chunk-HEUMPV43.b1865ec8.js";import"./chunk-MLAH6NN5.257adfe4.js";import"./chunk-C2GSEUUB.5e1d8426.js";var V=Object.defineProperty,$=Object.getOwnPropertyDescriptor,p=(a,t,e,o)=>{for(var n=o>1?void 0:o?$(t,e):t,i=a.length-1,s;i>=0;i--)(s=a[i])&&(n=(o?s(t,e,n):s(n))||n);return o&&n&&V(t,e,n),n};const b="funcplot-element";class d extends R{constructor(){super();f(this,"plotter");f(this,"func");f(this,"plotAnimationRunning",!1);this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(t){try{const e=new Function("x",`return ${t}`);this.func={text:t,fn:e},this.showWarning("")}catch(e){this.showWarning(e)}}setFunction(t,e){this.func={text:t,fn:e}}getValue(t){if(t===void 0)return 0;try{const e=this.func.fn(t);return this.showWarning(""),e}catch(e){return this.showWarning(e),0}}async plot(t){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let e=this.plotter;if(e===void 0){const n=this.shadowRoot.querySelector("#plot");if(n===null)throw new Error("#plot not found");const i={capacity:0,autoSizeCanvas:!1,y:{...v.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:y.getCssVariable("fg","gray")},x:{...v.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=e=v.plot(n,i)}else e.clear();const o=g.rangePercent(this.xResolution);if(t)for await(const n of j.interval(o,100))e.add(this.getValue(n));else for(let n of o)e.add(this.getValue(n));this.plotAnimationRunning=!1}updated(t){super.updated(t),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const t=g.rangePercent(.01);this.demoInit((e,o)=>{const n=t.next();let i=1;return n.done||(i=this.getValue(n.value)),i=Math.floor(i*100),o.fillStyle=`hsla(200,80%,50%,${i}%)`,o.fillRect(0,0,e.width,e.height),!n.done})}demoHue(){if(this.collapsed)return;const t=100,e=g.rangePercent(1/t);let o=0;this.demoInit((n,i,s)=>{const l=Math.floor(n.width/t),r=e.next();let c=1;return r.done||(c=this.getValue(r.value)),i.fillStyle=y.interpolate(c,"blue","red","hsl"),i.fillRect(o,0,l,n.height),o+=l,!r.done},!1)}demoSize(){if(this.collapsed)return;const t=g.rangePercent(.01),e=y.getCssVariable("yellow","yellow");this.demoInit((o,n)=>{const i=o.height-40,s={x:0,y:0,width:o.width,height:o.height},l=t.next();let r=1;return l.done||(r=this.getValue(l.value)),r=Math.floor(r*i),n.font=`${r}px serif`,n.fillStyle=e,M.textBlockCentered(n,["RELAX"],{bounds:s}),!l.done})}demoMove(){if(this.collapsed)return;const t=y.getCssVariable("yellow","yellow"),e=g.rangePercent(.01),o=10;this.demoInit((n,i)=>{i.fillStyle=t,i.beginPath();const s=n.width-4*o,l=e.next(),r=n.height/2-o/2;let c=1;l.done||(c=this.getValue(l.value));const h=o+o+c*s;return i.arc(h,r,o,0,Math.PI*2),i.fill(),!l.done})}demoInit(t,e=!0){if(this.collapsed)return;const o=this.shadowRoot.querySelector("#demoCanvas");if(o===null){console.error("#demoCanvas not found :(");return}const n=o.parentElement,i=n.getBoundingClientRect(),s=0,l={width:i.width-s-s,height:i.height-s-s};o.height=n.clientHeight,o.width=n.clientWidth;let r=0;const c=()=>{const h=o.getContext("2d");h.save(),h.translate(s,s),e&&h.clearRect(0,0,l.width,l.height);const w=t(l,h,r++);h.restore(),w&&window.requestAnimationFrame(c)};window.requestAnimationFrame(c)}connectedCallback(){super.connectedCallback()}playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(t){const e=t.target;this.setFunctionByString(e.value),this.plot(!1)}renderEditable(){if(!this.editable)return m``;const t=this.func;return m`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${t.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `}render(){return this.collapsed?m`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `:m`
      <div id="container" class=${C(this.classes)}>
        <div class="plotContainer">
          ${this.renderEditable()}
          <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
        </div>
        <div class="vertical mini toolbar">
          <button @click="${this.demoMove}">Move</button>
          <button @click="${this.demoOpacity}">Opacity</button>
          <button @click="${this.demoSize}">Size</button>
          <button @click="${this.demoHue}">Hue</button>
        </div>
        <div id="demo"><canvas id="demoCanvas"></div>
      </div> 
      `}}f(d,"styles",[k,S`
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
      .plotContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .controls {
        flex-direction: column;
        margin-bottom: 0.5em;
      }
      .controls input {
        font-family: var(--font-mono);
      }
      #parseMsg {
        position: absolute;
        border-radius: 0.2em;
        margin-top: 2em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `]);p([u()],d.prototype,"classes",2);p([u({type:String})],d.prototype,"fn",2);p([u({type:Boolean})],d.prototype,"animatedDraw",2);p([u({type:Boolean})],d.prototype,"editable",2);p([u({attribute:!0,type:Boolean})],d.prototype,"collapsed",2);p([u({type:Number})],d.prototype,"xResolution",2);customElements.get(b)||customElements.define(b,d);
