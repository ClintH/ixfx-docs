import{c as s,g as i,f as y,o,a as e}from"../client-shim.a8276547.js";import{D as Drawing_exports}from"./chunk-LJEMCDK3.04845b20.js";import"./chunk-GRFVFAQ5.c7dd4170.js";import{as as debounce,c as continuously,b3 as repeat,C as Colour_exports,b4 as Ellipse_exports}from"./chunk-UZEP5NPQ.5116c20e.js";import"./chunk-7KTY42OF.629611b4.js";import{e as elStyles}from"./styles.de20beca.js";import{N as Normalise_exports}from"./chunk-DQRNLTXJ.989706cb.js";import"./chunk-J62BM3EA.66d2cd2d.js";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(t,n,l,r)=>{for(var a=r>1?void 0:r?__getOwnPropDesc(n,l):n,c=t.length-1,p;c>=0;c--)(p=t[c])&&(a=(r?p(n,l,a):p(a))||a);return r&&a&&__defProp(n,l,a),a};const tagName="density-plot-element";class DensityPlotElement extends s{static styles=[elStyles,i`
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
  `];func;looper;circleFillStyle;values;paintSpeedMs=20;debounceFn=debounce((t,...n)=>{const l=this.shadowRoot.getElementById("txtFn");this.setFunctionByString(l.value),this.reset()},1e3);constructor(){super();this.editable=!1,this.valuesToSample=1e3,this.classes={withBottom:!0},this.fn===void 0&&(this.fn="Math.random()"),this.looper=continuously((t,n)=>{if(this.draw(),this.values.length===0)return!1},this.paintSpeedMs,(t,n)=>{this.values=this.computeValues(this.valuesToSample)})}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===void 0||this.shadowRoot===null)return;const n=this.shadowRoot.getElementById("parseMsg");n!==null&&(n.innerText=t,t.length===0?n.style.display="none":n.style.display="block")}setFunctionByString(text){try{this.func={text,fn:()=>eval(text)},this.showWarning(""),this.values=this.computeValues(this.valuesToSample),this.fn=text}catch(t){this.showWarning(t.message),console.warn(t)}}setFunction(t,n){this.func={text:t,fn:n}}computeValues(t){const n=[...repeat(t,()=>{try{const l=this.func.fn();return this.showWarning(""),l}catch(l){return this.showWarning(l),0}})];return this.scaleMax===void 0||this.scaleMin===void 0?Normalise_exports.array(n):n}updated(t){super.updated(t),this.setFunctionByString(this.fn),this.looper.start()}firstUpdated(t){super.firstUpdated(t)}draw(){if(this.shadowRoot===void 0)return;this.circleFillStyle===void 0&&(this.circleFillStyle=Colour_exports.opacity(Colour_exports.getCssVariable("yellow","yellow"),.05));const t=this.shadowRoot.querySelector("#plot");if(t===null){console.error("#plot not found :("),this.looper.cancel();return}const n=t.parentElement,l=n.getBoundingClientRect(),r=10,a={width:l.width-r-r,height:l.height-r-r};t.height!==n.clientHeight&&(t.height=n.clientHeight),t.width!==n.clientWidth&&(t.width=n.clientWidth);const c=t.getContext("2d"),u={x:this.values.pop()*a.width+r,y:a.height/2,...Ellipse_exports.fromDegrees(2,10,90)};Drawing_exports.ellipse(c,u,{fillStyle:this.circleFillStyle})}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"?this.reset():document.visibilityState==="hidden"&&this.looper.cancel()})}clear(){const t=this.shadowRoot.querySelector("#plot");if(t===null)return;const n=t.getContext("2d"),r=t.parentElement.getBoundingClientRect();n.clearRect(0,0,r.width,r.height)}reset(){this.clear(),this.values=this.computeValues(this.valuesToSample),this.looper.start()}stop(){this.looper.cancel()}render(){return y`
    <div id="container" class=${o(this.classes)}>
    ${this.editable?y`
      <div class="toolbar">
        <input @input=${this.debounceFn} id="txtFn" size="50" type="text" value=${this.fn}>
      </div>`:""}
      <div id="parseMsg"></div>
      <div class="plotContainer">
        <canvas @click="${this.reset}" id="plot"></canvas>
      </div>
     
    </div> 
    `}}__decorateClass([e()],DensityPlotElement.prototype,"classes",2);__decorateClass([e({attribute:!0,type:String})],DensityPlotElement.prototype,"view",2);__decorateClass([e({type:String})],DensityPlotElement.prototype,"fn",2);__decorateClass([e({attribute:!0,type:Boolean})],DensityPlotElement.prototype,"editable",2);__decorateClass([e({attribute:!0,type:Number})],DensityPlotElement.prototype,"scaleMin",2);__decorateClass([e({attribute:!0,type:Number})],DensityPlotElement.prototype,"scaleMax",2);__decorateClass([e({attribute:!0,type:Number})],DensityPlotElement.prototype,"valuesToSample",2);customElements.get(tagName)||customElements.define(tagName,DensityPlotElement);
