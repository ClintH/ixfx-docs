var R=Object.defineProperty;var $=(r,t,e)=>t in r?R(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var u=(r,t,e)=>($(r,typeof t!="symbol"?t+"":t,e),e);import{s as w,r as b,$ as p,o as k,e as f}from"./vendor.a59a155e.js";import{e as x}from"./styles.a023d167.js";import{E as S}from"./chunk-HEUMPV43.90b57ae6.js";import"./chunk-MLAH6NN5.d44956e5.js";import"./chunk-GLOC4ABQ.54c1521f.js";import"./chunk-57USKCMY.339b34ad.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{a as y,C as v,D as M}from"./chunk-JV2C55HY.cd1c20e3.js";import"./chunk-VAHXRYL4.a924033a.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import{G as m}from"./chunk-IRTA6V53.d9034266.js";import"./chunk-C2GSEUUB.5e1d8426.js";import{f as V}from"./chunk-YNVHP56G.0c46a1b2.js";import"./chunk-YDTVC7MM.cb3895f8.js";var j=Object.defineProperty,A=Object.getOwnPropertyDescriptor,g=(r,t,e,i)=>{for(var n=i>1?void 0:i?A(t,e):t,o=r.length-1,s;o>=0;o--)(s=r[o])&&(n=(i?s(t,e,n):s(n))||n);return i&&n&&j(t,e,n),n};const C="funcplot-element";class c extends w{constructor(){super();u(this,"plotter");u(this,"func");u(this,"plotAnimationRunning",!1);this.animatedDraw=!1,this.xResolution=.05,this.collapsed=!1,this.classes={withBottom:!0},this.editable=!1,this.setFunctionByString("(x) => x - 1")}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(t){try{const e=new Function("x",`return ${t}`);this.func={text:t,fn:e},this.showWarning("")}catch(e){this.showWarning(e)}}setFunction(t,e){this.func={text:t,fn:e}}getValue(t){if(t===void 0)return 0;try{const e=this.func.fn(t);return this.showWarning(""),e}catch(e){return this.showWarning(e),0}}async plot(t){if(!this.hasUpdated)return;this.plotAnimationRunning=!0;let e=this.plotter;if(e===void 0){const n=this.shadowRoot.querySelector("#plot");if(n===null)throw new Error("#plot not found");const o={capacity:0,autoSizeCanvas:!1,digitsPrecision:1,y:{...y.defaultAxis("y"),scaleRange:[-.3,1.3],labelRange:[0,1],colour:v.getCssVariable("fg","gray")},x:{...y.defaultAxis("x"),showLine:!0,scaleRange:[0,1/this.xResolution]},plotSize:{width:100,height:100}};this.plotter=e=y.plot(n,o)}else e.clear();const i=m.rangePercent(this.xResolution);if(t)for await(const n of V.interval(i,100))e.add(this.getValue(n));else for(let n of i)e.add(this.getValue(n));this.plotAnimationRunning=!1}updated(t){super.updated(t),this.plot(this.animatedDraw),this.collapsed||this.demoMove()}demoOpacity(){if(this.collapsed)return;const t=m.rangePercent(.01);this.demoInit((e,i)=>{const n=t.next();let o=1;return n.done||(o=this.getValue(n.value)),o=Math.floor(o*100),i.fillStyle=`hsla(200,80%,50%,${o}%)`,i.fillRect(0,0,e.width,e.height),!n.done})}demoHue(){if(this.collapsed)return;const t=100,e=m.rangePercent(1/t);let i=0;this.demoInit((n,o,s)=>{const l=Math.floor(n.width/t),a=e.next();let d=1;return a.done||(d=this.getValue(a.value)),o.fillStyle=v.interpolate(d,"blue","red","hsl"),o.fillRect(i,0,l,n.height),i+=l,!a.done},!1)}demoSize(){if(this.collapsed)return;const t=m.rangePercent(.01),e=v.getCssVariable("yellow","yellow");this.demoInit((i,n)=>{const o=i.height-40,s={x:0,y:0,width:i.width,height:i.height},l=t.next();let a=1;return l.done||(a=this.getValue(l.value)),a=Math.floor(a*o),n.font=`${a}px serif`,n.fillStyle=e,M.textBlockCentered(n,["RELAX"],{bounds:s}),!l.done})}demoMove(){if(this.collapsed)return;const t=v.getCssVariable("yellow","yellow"),e=m.rangePercent(.01),i=10;this.demoInit((n,o)=>{o.fillStyle=t,o.beginPath();const s=n.width-4*i,l=e.next(),a=n.height/2-i/2;let d=1;l.done||(d=this.getValue(l.value));const h=i+i+d*s;return o.arc(h,a,i,0,Math.PI*2),o.fill(),!l.done})}demoInit(t,e=!0){if(this.collapsed)return;const i=this.shadowRoot.querySelector("#demoCanvas");if(i===null){console.error("#demoCanvas not found :(");return}const n=i.parentElement,o=n.getBoundingClientRect(),s=0,l={width:o.width-s-s,height:o.height-s-s};i.height=n.clientHeight,i.width=n.clientWidth;let a=0;const d=()=>{const h=i.getContext("2d");h.save(),h.translate(s,s),e&&h.clearRect(0,0,l.width,l.height);const P=t(l,h,a++);h.restore(),P&&window.requestAnimationFrame(d)};window.requestAnimationFrame(d)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"&&this.plot(!1)})}playPlot(){this.plotAnimationRunning||this.plot(!0)}fnEdit(t){const e=t.target;this.setFunctionByString(e.value),this.plot(!1)}renderEditable(){if(!this.editable)return p``;const t=this.func;return p`
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
      <div id="container" class=${k(this.classes)}>
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
  `]);g([f()],c.prototype,"classes",2);g([f({type:String})],c.prototype,"fn",2);g([f({type:Boolean})],c.prototype,"animatedDraw",2);g([f({type:Boolean})],c.prototype,"editable",2);g([f({attribute:!0,type:Boolean})],c.prototype,"collapsed",2);g([f({type:Number})],c.prototype,"xResolution",2);customElements.get(C)||customElements.define(C,c);const B="easinggallery-element";class E extends w{constructor(){super()}updated(t){super.updated(t),this.shadowRoot.querySelectorAll("[data-easing]").forEach(e=>{const i=e.getAttribute("data-easing"),n=new c;n.collapsed=!0,n.setFunction(i,S.get(i)),e.appendChild(n)})}renderEasing(t){return p`
    <div data-easing="${t}" class="easing">
      <h1>${t}</h1>
    </div>
    `}render(){const t=[...S.getEasings()].sort();return p`
    <div id="container">
      ${t.map(e=>this.renderEasing(e))}
    </div>
    `}}u(E,"styles",[x,b`
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
    `]);customElements.define(B,E);
