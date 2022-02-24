var E=Object.defineProperty;var $=(r,t,e)=>t in r?E(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var u=(r,t,e)=>($(r,typeof t!="symbol"?t+"":t,e),e);import{s as w,r as b,$ as p,o as M,e as f}from"./vendor.a3225d27.js";import{e as x}from"./styles.0da1a4a9.js";import{E as P}from"./chunk-HEUMPV43.b1865ec8.js";import"./chunk-MLAH6NN5.257adfe4.js";import"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{P as v,C as y,D as k}from"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import{G as m}from"./bundle.09734b0b.js";import{f as j}from"./chunk-YNVHP56G.6e14c695.js";import"./chunk-YDTVC7MM.cb3895f8.js";import"./chunk-C2GSEUUB.5e1d8426.js";var V=Object.defineProperty,A=Object.getOwnPropertyDescriptor,g=(r,t,e,o)=>{for(var n=o>1?void 0:o?A(t,e):t,i=r.length-1,s;i>=0;i--)(s=r[i])&&(n=(o?s(t,e,n):s(n))||n);return o&&n&&V(t,e,n),n};const R="funcplot-element";class c extends w{constructor(){super();u(this,"plotter");u(this,"func");u(this,"plotAnimationRunning",!1);this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(t){try{const e=new Function("x",`return ${t}`);this.func={text:t,fn:e},this.showWarning("")}catch(e){this.showWarning(e)}}setFunction(t,e){this.func={text:t,fn:e}}getValue(t){if(t===void 0)return 0;try{const e=this.func.fn(t);return this.showWarning(""),e}catch(e){return this.showWarning(e),0}}async plot(t){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let e=this.plotter;if(e===void 0){const n=this.shadowRoot.querySelector("#plot");if(n===null)throw new Error("#plot not found");const i={capacity:0,autoSizeCanvas:!1,y:{...v.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:y.getCssVariable("fg","gray")},x:{...v.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=e=v.plot(n,i)}else e.clear();const o=m.rangePercent(this.xResolution);if(t)for await(const n of j.interval(o,100))e.add(this.getValue(n));else for(let n of o)e.add(this.getValue(n));this.plotAnimationRunning=!1}updated(t){super.updated(t),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const t=m.rangePercent(.01);this.demoInit((e,o)=>{const n=t.next();let i=1;return n.done||(i=this.getValue(n.value)),i=Math.floor(i*100),o.fillStyle=`hsla(200,80%,50%,${i}%)`,o.fillRect(0,0,e.width,e.height),!n.done})}demoHue(){if(this.collapsed)return;const t=100,e=m.rangePercent(1/t);let o=0;this.demoInit((n,i,s)=>{const l=Math.floor(n.width/t),a=e.next();let d=1;return a.done||(d=this.getValue(a.value)),i.fillStyle=y.interpolate(d,"blue","red","hsl"),i.fillRect(o,0,l,n.height),o+=l,!a.done},!1)}demoSize(){if(this.collapsed)return;const t=m.rangePercent(.01),e=y.getCssVariable("yellow","yellow");this.demoInit((o,n)=>{const i=o.height-40,s={x:0,y:0,width:o.width,height:o.height},l=t.next();let a=1;return l.done||(a=this.getValue(l.value)),a=Math.floor(a*i),n.font=`${a}px serif`,n.fillStyle=e,k.textBlockCentered(n,["RELAX"],{bounds:s}),!l.done})}demoMove(){if(this.collapsed)return;const t=y.getCssVariable("yellow","yellow"),e=m.rangePercent(.01),o=10;this.demoInit((n,i)=>{i.fillStyle=t,i.beginPath();const s=n.width-4*o,l=e.next(),a=n.height/2-o/2;let d=1;l.done||(d=this.getValue(l.value));const h=o+o+d*s;return i.arc(h,a,o,0,Math.PI*2),i.fill(),!l.done})}demoInit(t,e=!0){if(this.collapsed)return;const o=this.shadowRoot.querySelector("#demoCanvas");if(o===null){console.error("#demoCanvas not found :(");return}const n=o.parentElement,i=n.getBoundingClientRect(),s=0,l={width:i.width-s-s,height:i.height-s-s};o.height=n.clientHeight,o.width=n.clientWidth;let a=0;const d=()=>{const h=o.getContext("2d");h.save(),h.translate(s,s),e&&h.clearRect(0,0,l.width,l.height);const C=t(l,h,a++);h.restore(),C&&window.requestAnimationFrame(d)};window.requestAnimationFrame(d)}connectedCallback(){super.connectedCallback()}playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(t){const e=t.target;this.setFunctionByString(e.value),this.plot(!1)}renderEditable(){if(!this.editable)return p``;const t=this.func;return p`
    <div class="controls">
      <label for="txtFunc">Function</label>
      <input @input="${this.fnEdit}" id="txtFunc" type="text" value="${t.text}">
    </div>
    <div id="parseMsg" style="display:none">
      Some warning
    </div>
    `}render(){return this.collapsed?p`
      <canvas @click="${this.playPlot}" @pointerenter="${this.playPlot}" id="plot"></canvas>
      `:p`
      <div id="container" class=${M(this.classes)}>
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
      `}}u(c,"styles",[x,b`
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
  `]);g([f()],c.prototype,"classes",2);g([f({type:String})],c.prototype,"fn",2);g([f({type:Boolean})],c.prototype,"animatedDraw",2);g([f({type:Boolean})],c.prototype,"editable",2);g([f({attribute:!0,type:Boolean})],c.prototype,"collapsed",2);g([f({type:Number})],c.prototype,"xResolution",2);customElements.get(R)||customElements.define(R,c);const B="easinggallery-element";class S extends w{constructor(){super()}updated(t){super.updated(t),this.shadowRoot.querySelectorAll("[data-easing]").forEach(e=>{const o=e.getAttribute("data-easing"),n=new c;n.collapsed=!0,n.setFunction(o,P.get(o)),e.appendChild(n)})}renderEasing(t){return p`
    <div data-easing="${t}" class="easing">
      <h1>${t}</h1>
    </div>
    `}render(){const t=[...P.getEasings()].sort();return p`
    <div id="container">
      ${t.map(e=>this.renderEasing(e))}
    </div>
    `}}u(S,"styles",[x,b`
    .controls .vertical {
      align-items: left;
    }
    .easing {
      display: flex;
      padding: 0.3em;
      margin: 0.3em;
      min-width: 7em;
      min-height: 7em;
      flex-direction: column;
      overflow: hidden;
    }
    .easing h1 {
      font-size: 1em;
    }
    #container {
      display: flex;
      flex-wrap: wrap;
    }
    funcplot-element {
    }
    `]);customElements.define(B,S);
