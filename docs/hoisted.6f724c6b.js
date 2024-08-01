import"./chunks/loader.c806e4ef.js";import{a as s,c as i,x,n}from"./client-shim.c3248903.js";import{e as elStyles}from"./chunks/styles.284a3b73.js";import{b as Palette_exports,e as debounce,P as PlotOld_exports,f as frequencyTimer,O as Oscillator_exports,g as continuously}from"./chunks/chunk-IYXXLC7L.739e1efe.js";import{C as Colour_exports}from"./chunks/chunk-H62DA3UX.2f4e44f0.js";import"./chunks/chunk-QRUAJLXP.d4cb917b.js";var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(e,t,o,r)=>{for(var a=r>1?void 0:r?__getOwnPropDesc(t,o):t,l=e.length-1,c;l>=0;l--)(c=e[l])&&(a=(r?c(t,o,a):c(a))||a);return r&&a&&__defProp(t,o,a),a};const tagName="oscillator-element";class OscElement extends s{static styles=[elStyles,i`
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
    `];plotter;palette=Palette_exports.create();debounceFreq=debounce(()=>{const e=parseFloat(this.shadowRoot.getElementById("freqRange").value)/1e3;this.frequency=e},500);debounceSampleRate=debounce(()=>{this.sampleRateMs=parseFloat(this.shadowRoot.getElementById("sampleRateRange").value)},500);debounceAmMod=debounce(()=>{this.amModFunc=this.shadowRoot.getElementById("amModFunc").value},1e3);debounceFmMod=debounce(()=>{this.fmModFunc=this.shadowRoot.getElementById("fmModFunc").value},1e3);runningWave;timer;constructor(){super();this.amModFunc="source * mod",this.fmModFunc="source * mod",this.frequency=1,this.sampleRateMs=0,this.sampleDurationMs=1e3,this.height=400,this.width=300,this.mode="editor"}initPlot(e,t=!1){if(t)this.plotter.dispose();else if(this.plotter!==void 0)return this.plotter;const o=this.shadowRoot.getElementById("plot");let r={capacity:e,lineWidth:1,digitsPrecision:1,defaultSeriesVariable:"accent",y:{...PlotOld_exports.defaultAxis("y"),scaleRange:[0,1],labelRange:[0,1],colour:Colour_exports.getCssVariable("fg","gray")},x:{...PlotOld_exports.defaultAxis("x"),colour:Colour_exports.getCssVariable("accent","pink"),showLine:!1},style:this.mode=="am"||this.mode==="fm"?"connected":"dots"};return this.plotter=PlotOld_exports.plot(o,r),this.plotter}drawSine(){this.timer=frequencyTimer(this.frequency);const e=Oscillator_exports.sine(this.timer);this.drawWave(e)}drawSaw(){this.timer=frequencyTimer(this.frequency);const e=Oscillator_exports.saw(this.timer);this.drawWave(e)}drawSquare(){this.timer=frequencyTimer(this.frequency);const e=Oscillator_exports.square(this.timer);this.drawWave(e)}drawTriangle(){this.timer=frequencyTimer(this.frequency);const e=Oscillator_exports.triangle(this.timer);this.drawWave(e)}lastExpressionWarn="";expressionWarn(e){if(e===this.lastExpressionWarn)return;this.lastExpressionWarn=e;const t=this.shadowRoot.getElementById("warning");t.style.display="block",t.innerText=e}expressionOk(){if(this.lastExpressionWarn.length===0)return;this.lastExpressionWarn="";const e=this.shadowRoot.getElementById("warning");e.style.display="none"}drawWave(osc){const sampleDurationMs=this.sampleDurationMs,modeAm=this.mode==="am",modeFm=this.mode==="fm",p=this.initPlot(modeFm?300:100);p.clear(),this.runningWave&&this.runningWave.cancel();const modOsc=osc;let oscTimer=this.timer;(modeAm||modeFm)&&(oscTimer=frequencyTimer(modeAm?1:.25),osc=Oscillator_exports.sine(oscTimer)),this.runningWave=continuously((_ticks,elapsed)=>{let v=osc.next().value;if(modeAm&&this.amModFunc!==void 0)try{const source=v,mod=modOsc.next().value,result=eval(this.amModFunc);typeof result=="number"?(v=result,this.expressionOk()):this.expressionWarn("Expression does not return a number")}catch(e){this.expressionWarn(e)}else if(modeFm&&this.fmModFunc!==void 0){const e=modOsc.next().value;oscTimer.mod(e)}return p.add(v),elapsed<sampleDurationMs},this.sampleRateMs),this.runningWave.start()}async updated(){this.waveChange()}waveChange(){const e=this.shadowRoot.querySelector('input[name="waveType"]:checked').value;switch(e){case"sine":this.drawSine();break;case"saw":this.drawSaw();break;case"tri":this.drawTriangle();break;case"square":this.drawSquare();break;default:console.error(`Unknown osc type ${e}`)}}renderWaveSelector(){return x`
    <div class="toolbar centered">
      <section @change=${this.waveChange} class="radios">
        <input type="radio" name="waveType" id="waveSine" value="sine" checked><label for="waveSine" >Sine</label>
        <input type="radio" name="waveType" id="waveSaw" value="saw"><label for="waveSaw">Sawtooth</label>
        <input type="radio" name="waveType" id="waveSquare" value="square"><label for="waveSquare">Square</label>
        <input type="radio" name="waveType" id="waveTri" value="tri"><label for="waveTri">Triangle</label>
      </section>
    </div>
    `}renderTools(){return this.mode==="shape"?this.renderWaveSelector():this.mode==="fm"?x`
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
      </div>`:this.mode==="am"?x`
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
      </div>`:x`
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
      `}render(){return x`
			<div class="container">     
        ${this.renderTools()}
        <div id="warning">Warnings</div>
        <canvas width="${this.width}" height="${this.height}" id="plot" />
			</div>
		`}}__decorateClass([n({type:Number})],OscElement.prototype,"height",2);__decorateClass([n({type:Number})],OscElement.prototype,"width",2);__decorateClass([n({type:Number})],OscElement.prototype,"frequency",2);__decorateClass([n({type:Number})],OscElement.prototype,"sampleDurationMs",2);__decorateClass([n({type:Number})],OscElement.prototype,"sampleRateMs",2);__decorateClass([n({type:String})],OscElement.prototype,"mode",2);__decorateClass([n({type:String})],OscElement.prototype,"amModFunc",2);__decorateClass([n({type:String})],OscElement.prototype,"fmModFunc",2);customElements.define(tagName,OscElement);
