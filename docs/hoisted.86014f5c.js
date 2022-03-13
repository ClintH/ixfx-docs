import"./chunks/ReplPad.d3192ec2.js";import"./chunks/loader.c806e4ef.js";import{b as s,r,$,o,a as e}from"./client-shim.cda72367.js";import{C as Colour_exports,D as Drawing_exports}from"./chunks/chunk-C37FD3JM.0197111f.js";import"./chunks/chunk-4THA4YVV.4ccaabcd.js";import"./chunks/chunk-DTRNDG6C.d0f370a4.js";import{y as debounce,z as continuously,N as Ellipse_exports,O as weightedInteger,P as weighted,E as Easing_exports,Q as gaussian2}from"./chunks/chunk-6TM6SJDV.d463ae79.js";import"./chunks/chunk-QLMTBJ7O.4bda2143.js";import{r as repeat}from"./chunks/chunk-KSM64VVS.8ad851d7.js";import"./chunks/chunk-WPZ6N3LH.b2673484.js";import{e as elStyles}from"./chunks/styles.b557ca03.js";import{N as Normalise_exports}from"./chunks/chunk-LLVNI3R6.d0465298.js";import"./chunks/chunk-OMXZMOOU.e9ad33f4.js";import{j as jitter}from"./chunks/chunk-CCOKD2RJ.6f84344a.js";import"./chunks/chunk-SJVFW73P.e7d5b176.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(t,i,n,l)=>{for(var a=l>1?void 0:l?__getOwnPropDesc(i,n):i,p=t.length-1,c;p>=0;p--)(c=t[p])&&(a=(l?c(i,n,a):c(a))||a);return l&&a&&__defProp(i,n,a),a};const tagName="density-plot-element";class DensityPlotElement extends s{static styles=[elStyles,r`
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
      .controls input {
        font-family: var(--font-mono);
      }
      #parseMsg {
        position: absolute;
        border-radius: 0.2em;
        margin-top: 3em;
        background: var(--bg-mono);
        padding: 0.3em;  
      }
  `];func;looper;circleFillStyle;values;paintSpeedMs=20;debounceFn=debounce((t,...i)=>{const n=this.shadowRoot.getElementById("txtFn");this.setFunctionByString(n.value),this.reset()},1e3);constructor(){super();this.editable=!1,this.valuesToSample=1e3,this.classes={withBottom:!0},this.fn===void 0&&(this.fn="Math.random()"),this.looper=continuously((t,i)=>{if(this.draw(),this.values.length===0)return!1},this.paintSpeedMs,(t,i)=>{this.values=this.computeValues(this.valuesToSample)})}showWarning(t){if(t.length>0&&console.warn(t),this.shadowRoot===void 0||this.shadowRoot===null)return;const i=this.shadowRoot.getElementById("parseMsg");i!==null&&(i.innerText=t,t.length===0?i.style.display="none":i.style.display="block")}setFunctionByString(text){try{this.func={text,fn:()=>eval(text)},this.showWarning(""),this.values=this.computeValues(this.valuesToSample),this.fn=text}catch(t){this.showWarning(t.message),console.warn(t)}}setFunction(t,i){this.func={text:t,fn:i}}computeValues(t){const i=repeat(t,()=>{try{const n=this.func.fn();return this.showWarning(""),n}catch(n){return this.showWarning(n),0}});return this.scaleMax===void 0||this.scaleMin===void 0?Normalise_exports.array(i):i}updated(t){super.updated(t),this.setFunctionByString(this.fn),this.looper.start()}firstUpdated(t){super.firstUpdated(t)}draw(){if(this.shadowRoot===void 0)return;this.circleFillStyle===void 0&&(this.circleFillStyle=Colour_exports.opacity(Colour_exports.getCssVariable("yellow","yellow"),.05));const t=this.shadowRoot.querySelector("#plot");if(t===null){console.error("#plot not found :("),this.looper.cancel();return}const i=t.parentElement,n=i.getBoundingClientRect(),l=10,a={width:n.width-l-l,height:n.height-l-l};t.height!==i.clientHeight&&(t.height=i.clientHeight),t.width!==i.clientWidth&&(t.width=i.clientWidth);const p=t.getContext("2d"),d={x:this.values.pop()*a.width+l,y:a.height/2,...Ellipse_exports.fromDegrees(2,10,90)};Drawing_exports.ellipse(p,d,{fillStyle:this.circleFillStyle})}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",t=>{document.visibilityState==="visible"?this.reset():document.visibilityState==="hidden"&&this.looper.cancel()})}clear(){const t=this.shadowRoot.querySelector("#plot");if(t===null)return;const i=t.getContext("2d"),l=t.parentElement.getBoundingClientRect();i.clearRect(0,0,l.width,l.height)}reset(){this.clear(),this.values=this.computeValues(this.valuesToSample),this.looper.start()}stop(){this.looper.cancel()}render(){return $`
    <div id="container" class=${o(this.classes)}>
    ${this.editable?$`
      <div class="toolbar">
        <input @input=${this.debounceFn} id="txtFn" type="text" value=${this.fn}>
      </div>`:""}
      <div id="parseMsg"></div>
      <div class="plotContainer">
        <canvas @click="${this.reset}" id="plot"></canvas>
      </div>
     
    </div> 
    `}}__decorateClass([e()],DensityPlotElement.prototype,"classes",2);__decorateClass([e({attribute:!0,type:String})],DensityPlotElement.prototype,"view",2);__decorateClass([e({type:String})],DensityPlotElement.prototype,"fn",2);__decorateClass([e({attribute:!0,type:Boolean})],DensityPlotElement.prototype,"editable",2);__decorateClass([e({attribute:!0,type:Number})],DensityPlotElement.prototype,"scaleMin",2);__decorateClass([e({attribute:!0,type:Number})],DensityPlotElement.prototype,"scaleMax",2);__decorateClass([e({attribute:!0,type:Number})],DensityPlotElement.prototype,"valuesToSample",2);customElements.get(tagName)||customElements.define(tagName,DensityPlotElement);window.weightedInteger=weightedInteger;window.weighted=weighted;window.jitter=jitter;window.Easings=Easing_exports;window.gaussian=gaussian2;importEl("plot1","density-plot-element",{fn:"Math.random()"});importEl("plot2","density-plot-element",{fn:"weighted('quadIn')",editable:!0});importEl("plot3","density-plot-element",{fn:"jitter(0.5, 0.2)",scaleMin:0,scaleMax:1,editable:!0});importEl("plot4","density-plot-element",{fn:"jitter(0.5, 0.2, {}, gaussian)",scaleMin:0,scaleMax:1,editable:!0});importEl("plot-gaussian","density-plot-element",{fn:"gaussian()",scaleMin:0,scaleMax:1,editable:!0});
