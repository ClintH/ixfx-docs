var c=Object.defineProperty;var u=(t,a,i)=>a in t?c(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i;var n=(t,a,i)=>(u(t,typeof a!="symbol"?a+"":a,i),i);import"./loader.039e8a90.js";import{a as s,r,$,b as e,o as onIdle,c as onMedia,f as onVisible}from"./vendor.92dd9f01.js";import{e as elStyles}from"./styles.9b5dda15.js";import{P as Palette_exports,b as Plot_exports,C as Colour_exports}from"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-B7RHPX6D.163a8542.js";import"./chunk-QVRQKKRB.4ee1b7cb.js";import"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import"./chunk-NP7XBFS5.4dc9bdd2.js";import{d as debounce,f as frequencyTimer,O as Oscillator_exports,c as continuously}from"./chunk-EHKPP5SR.5374a9f6.js";import"./chunk-FYQLQT42.b3fcc6fb.js";import{_ as __vitePreload}from"./preload-helper.8b4a5925.js";import"./chunk-FQLUQVDZ.8e87cdc9.js";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(t,a,i,o)=>{for(var l=o>1?void 0:o?__getOwnPropDesc(a,i):a,d=t.length-1,m;d>=0;d--)(m=t[d])&&(l=(o?m(a,i,l):m(l))||l);return o&&l&&__defProp(a,i,l),l};const tagName="oscillator-element";class OscElement extends s{constructor(){super();n(this,"plotter");n(this,"palette",Palette_exports.create());n(this,"debounceFreq",debounce(()=>{const t=parseFloat(this.shadowRoot.getElementById("freqRange").value)/1e3;this.frequency=t},500));n(this,"debounceSampleRate",debounce(()=>{this.sampleRateMs=parseFloat(this.shadowRoot.getElementById("sampleRateRange").value)},500));n(this,"debounceAmMod",debounce(()=>{this.amModFunc=this.shadowRoot.getElementById("amModFunc").value},1e3));n(this,"debounceFmMod",debounce(()=>{this.fmModFunc=this.shadowRoot.getElementById("fmModFunc").value},1e3));n(this,"runningWave");n(this,"timer");n(this,"lastExpressionWarn","");this.amModFunc="source * mod",this.fmModFunc="source * mod",this.frequency=1,this.sampleRateMs=0,this.sampleDurationMs=1e3,this.height=400,this.width=300,this.mode="editor"}initPlot(t,a=!1){if(a)this.plotter.dispose();else if(this.plotter!==void 0)return this.plotter;const i=this.shadowRoot.getElementById("plot");let o={capacity:t,lineWidth:1,digitsPrecision:1,y:{...Plot_exports.defaultAxis("y"),scaleRange:[0,1],labelRange:[0,1],colour:Colour_exports.getCssVariable("fg","gray")},x:{...Plot_exports.defaultAxis("x"),showLine:!1},style:this.mode=="am"||this.mode==="fm"?"connected":"dots"};return this.plotter=Plot_exports.plot(i,o),this.plotter}drawSine(){this.timer=frequencyTimer(this.frequency);const t=Oscillator_exports.sine(this.timer);this.drawWave(t)}drawSaw(){this.timer=frequencyTimer(this.frequency);const t=Oscillator_exports.saw(this.timer);this.drawWave(t)}drawSquare(){this.timer=frequencyTimer(this.frequency);const t=Oscillator_exports.square(this.timer);this.drawWave(t)}drawTriangle(){this.timer=frequencyTimer(this.frequency);const t=Oscillator_exports.triangle(this.timer);this.drawWave(t)}expressionWarn(t){if(t===this.lastExpressionWarn)return;this.lastExpressionWarn=t;const a=this.shadowRoot.getElementById("warning");a.style.display="block",a.innerText=t}expressionOk(){if(this.lastExpressionWarn.length===0)return;this.lastExpressionWarn="";const t=this.shadowRoot.getElementById("warning");t.style.display="none"}drawWave(osc){const sampleDurationMs=this.sampleDurationMs,modeAm=this.mode==="am",modeFm=this.mode==="fm",p=this.initPlot(modeFm?300:100);p.clear(),this.runningWave&&this.runningWave.cancel();const modOsc=osc;let oscTimer=this.timer;(modeAm||modeFm)&&(oscTimer=frequencyTimer(modeAm?1:.25),osc=Oscillator_exports.sine(oscTimer)),this.runningWave=continuously((_ticks,elapsed)=>{let v=osc.next().value;if(modeAm&&this.amModFunc!==void 0)try{const source=v,mod=modOsc.next().value,result=eval(this.amModFunc);typeof result=="number"?(v=result,this.expressionOk()):this.expressionWarn("Expression does not return a number")}catch(t){this.expressionWarn(t)}else if(modeFm&&this.fmModFunc!==void 0){const t=modOsc.next().value;oscTimer.mod(t)}return p.add(v),elapsed<sampleDurationMs},this.sampleRateMs),this.runningWave.start()}async updated(){this.waveChange()}waveChange(){const t=this.shadowRoot.querySelector('input[name="waveType"]:checked').value;switch(t){case"sine":this.drawSine();break;case"saw":this.drawSaw();break;case"tri":this.drawTriangle();break;case"square":this.drawSquare();break;default:console.error(`Unknown osc type ${t}`)}}renderWaveSelector(){return $`
    <div class="toolbar centered">
      <section @change=${this.waveChange} class="radios">
        <input type="radio" name="waveType" id="waveSine" value="sine" checked><label for="waveSine" >Sine</label>
        <input type="radio" name="waveType" id="waveSaw" value="saw"><label for="waveSaw">Sawtooth</label>
        <input type="radio" name="waveType" id="waveSquare" value="square"><label for="waveSquare">Square</label>
        <input type="radio" name="waveType" id="waveTri" value="tri"><label for="waveTri">Triangle</label>
      </section>
    </div>
    `}renderTools(){return this.mode==="shape"?this.renderWaveSelector():this.mode==="fm"?$`
      ${this.renderWaveSelector()}
      <div class="controls wrappable">
        <div class="vertical">
          <label for="fmModFunc">Expression</label>
          <input type="text" @input=${this.debounceFmMod} value=${this.fmModFunc} id="fmModFunc" />    
        </div>
        <div class="vertical">
          <label for="freqRange">Mod freq (Hz): ${this.frequency}</label>
          <input @input=${this.debounceFreq} type="range" min="1" value=${this.frequency*1e3} max="1000" id="freqRange" />    
        </div>
      </div>`:this.mode==="am"?$`
      ${this.renderWaveSelector()}
      <div class="controls wrappable">
        <div class="vertical">
          <label for="amModFunc">Expression</label>
          <input type="text" @input=${this.debounceAmMod} value=${this.amModFunc} id="amModFunc" />    
        </div>
        <div class="vertical">
          <label for="freqRange">Mod freq (Hz): ${this.frequency}</label>
          <input @input=${this.debounceFreq} type="range" min="1" value=${this.frequency*1e3} max="5000" id="freqRange" />    
        </div>
      </div>`:$`
      ${this.renderWaveSelector()}
      <div class="controls wrappable">
        <div class="vertical">
          <label for="sampleRateRange">Sample rate (ms): ${this.sampleRateMs}</label>
          <input @input=${this.debounceSampleRate} type="range" min="0" value=${this.sampleRateMs} max="100" id="sampleRateRange" />    
        </div>
        <div class="vertical">
          <label for="freqRange">Frequency (Hz): ${this.frequency}</label>
          <input @input=${this.debounceFreq} type="range" min="1" value=${this.frequency*1e3} max="50000" id="freqRange" />    
        </div>
      </div>
      `}render(){return $`
			<div class="container">     
        ${this.renderTools()}
        <div id="warning">Warnings</div>
        <canvas width="${this.width}" height="${this.height}" id="plot" />
			</div>
		`}}n(OscElement,"styles",[elStyles,r`
    .container {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    #warning {
      margin-top: 0.3em;
      margin-bottom: 0.3em;
      padding: 0.3em;
      background-color: var(--bg-dim);
      color: var(--fg-bright);
      display:none;
    }
    canvas {
      padding: 1em;
    }
    `]);__decorateClass([e({type:Number})],OscElement.prototype,"height",2);__decorateClass([e({type:Number})],OscElement.prototype,"width",2);__decorateClass([e({type:Number})],OscElement.prototype,"frequency",2);__decorateClass([e({type:Number})],OscElement.prototype,"sampleDurationMs",2);__decorateClass([e({type:Number})],OscElement.prototype,"sampleRateMs",2);__decorateClass([e({type:String})],OscElement.prototype,"mode",2);__decorateClass([e({type:String})],OscElement.prototype,"amModFunc",2);__decorateClass([e({type:String})],OscElement.prototype,"fmModFunc",2);customElements.define(tagName,OscElement);onIdle("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:t},{default:a}]=await Promise.all([__vitePreload(()=>import("./SidebarToggle.ee22eb03.js"),["assets/SidebarToggle.ee22eb03.js","assets/vendor.92dd9f01.js"]),__vitePreload(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(i,o)=>a(i)(t,{class:"astro-LPHCP5C4"},o)});onMedia("w5UmR",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:t},{default:a}]=await Promise.all([__vitePreload(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),__vitePreload(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(i,o)=>a(i)(t,{headers:[{depth:2,slug:"sampling",text:"Sampling"},{depth:2,slug:"usage",text:"Usage"},{depth:2,slug:"amplitude-modulation",text:"Amplitude modulation"},{depth:2,slug:"starter",text:"Starter"}],class:"astro-LR56V2JR"},o)});onVisible("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:t},{default:a}]=await Promise.all([__vitePreload(()=>import("./ThemeToggleButton.b2be24ee.js"),["assets/ThemeToggleButton.b2be24ee.js","assets/vendor.92dd9f01.js"]),__vitePreload(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(i,o)=>a(i)(t,{class:"astro-KYEUEDYA"},o)});onMedia("w5UmR",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:t},{default:a}]=await Promise.all([__vitePreload(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),__vitePreload(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(i,o)=>a(i)(t,{headers:[{depth:2,slug:"sampling",text:"Sampling"},{depth:2,slug:"usage",text:"Usage"},{depth:2,slug:"amplitude-modulation",text:"Amplitude modulation"},{depth:2,slug:"starter",text:"Starter"}],class:"astro-EDKM2WF4"},o)});
