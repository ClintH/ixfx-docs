import{a as s,c as i,x,o,n}from"../client-shim.c3248903.js";import{e as debounce,g as continuously,m as repeat,N as Normalise_exports,D as Drawing_exports}from"./chunk-IYXXLC7L.739e1efe.js";import{C as Colour_exports,bs as Ellipse_exports}from"./chunk-H62DA3UX.2f4e44f0.js";import"./chunk-QRUAJLXP.d4cb917b.js";import{e as elStyles}from"./styles.284a3b73.js";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(t,e,l,r)=>{for(var a=r>1?void 0:r?__getOwnPropDesc(e,l):e,c=t.length-1,p;c>=0;c--)(p=t[c])&&(a=(r?p(e,l,a):p(a))||a);return r&&a&&__defProp(e,l,a),a};const tagName="density-plot-element";class DensityPlotElement extends s{static styles=[elStyles,i`
      #container {
        display: flex;
        flex-direction:column;
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
      input {
        font-family: var(--font-mono);
      }
      #parseMsg {
        position: absolute;
        border-radius: 0.2em;
        margin-top: 3em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `];func;looper;circleFillStyle;values;paintSpeedMs=20;debounceFn=debounce((t,...e)=>{const l=this.shadowRoot.getElementById("txtFn");this.setFunctionByString(l.value),this.reset()},1e3);constructor(){super();this.editable=!1,this.valuesToSample=1e3,this.classes={withBottom:!0},this.fn===void 0&&(this.fn="Math.random()"),this.looper=continuously((t,e)=>{if(this.draw(),this.values.length===0)return!1},this.paintSpeedMs,(t,e)=>{this.values=this.computeValues(this.valuesToSample)})}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===void 0||this.shadowRoot===null)return;const e=this.shadowRoot.getElementById("parseMsg");e!==null&&(e.innerText=t,t.length===0?e.style.display="none":e.style.display="block")}setFunctionByString(text){try{this.func={text,fn:()=>eval(text)},this.showWarning(""),this.values=this.computeValues(this.valuesToSample),this.fn=text}catch(t){this.showWarning(t.message),console.warn(t)}}setFunction(t,e){this.func={text:t,fn:e}}computeValues(t){const e=[...repeat(t,()=>{try{const l=this.func.fn();return this.showWarning(""),l}catch(l){return this.showWarning(l),0}})];return this.scaleMax===void 0||this.scaleMin===void 0?Normalise_exports.array(e):e}updated(t){super.updated(t),this.setFunctionByString(this.fn),this.looper.start()}firstUpdated(t){super.firstUpdated(t)}draw(){if(this.shadowRoot===void 0)return;this.circleFillStyle===void 0&&(this.circleFillStyle=Colour_exports.opacity(Colour_exports.getCssVariable("yellow","yellow"),.05));const t=this.shadowRoot.querySelector("#plot");if(t===null){console.error("#plot not found :("),this.looper.cancel();return}const e=t.parentElement,l=e.getBoundingClientRect(),r=10,a={width:l.width-r-r,height:l.height-r-r};t.height!==e.clientHeight&&(t.height=e.clientHeight),t.width!==e.clientWidth&&(t.width=e.clientWidth);const c=t.getContext("2d"),u={x:this.values.pop()*a.width+r,y:a.height/2,...Ellipse_exports.fromDegrees(2,10,90)};Drawing_exports.ellipse(c,u,{fillStyle:this.circleFillStyle})}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"?this.reset():document.visibilityState==="hidden"&&this.looper.cancel()})}clear(){const t=this.shadowRoot.querySelector("#plot");if(t===null)return;const e=t.getContext("2d"),r=t.parentElement.getBoundingClientRect();e.clearRect(0,0,r.width,r.height)}reset(){this.clear(),this.values=this.computeValues(this.valuesToSample),this.looper.start()}stop(){this.looper.cancel()}render(){return x`
    <div id="container" class=${o(this.classes)}>
    ${this.editable?x`
      <div class="toolbar">
        <input @input=${this.debounceFn} id="txtFn" size="50" type="text" value=${this.fn}>
      </div>`:""}
      <div id="parseMsg"></div>
      <div class="plotContainer">
        <canvas @click="${this.reset}" id="plot"></canvas>
      </div>
     
    </div> 
    `}}__decorateClass([n()],DensityPlotElement.prototype,"classes",2);__decorateClass([n({attribute:!0,type:String})],DensityPlotElement.prototype,"view",2);__decorateClass([n({type:String})],DensityPlotElement.prototype,"fn",2);__decorateClass([n({attribute:!0,type:Boolean})],DensityPlotElement.prototype,"editable",2);__decorateClass([n({attribute:!0,type:Number})],DensityPlotElement.prototype,"scaleMin",2);__decorateClass([n({attribute:!0,type:Number})],DensityPlotElement.prototype,"scaleMax",2);__decorateClass([n({attribute:!0,type:Number})],DensityPlotElement.prototype,"valuesToSample",2);customElements.get(tagName)||customElements.define(tagName,DensityPlotElement);
