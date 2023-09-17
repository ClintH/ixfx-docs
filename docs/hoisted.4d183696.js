import"./chunks/loader.c806e4ef.js";import{c as d,g as m,f as c,a as p}from"./client-shim.8cb18301.js";import{e as v}from"./chunks/styles.b86f48e3.js";import{C as h}from"./chunks/chunk-XLVCNC2H.5118e312.js";import"./chunks/arc.a4bcf7c1.js";import"./chunks/ReplPad.27ee7f9d.js";var f=Object.defineProperty,C=Object.getOwnPropertyDescriptor,a=(u,t,o,s)=>{for(var e=s>1?void 0:s?C(t,o):t,i=u.length-1,r;i>=0;i--)(r=u[i])&&(e=(s?r(t,o,e):r(e))||e);return s&&e&&f(t,o,e),e};const b="colourscale-element";class l extends d{static styles=[v,m`
    .stop {
      width: 5em;
      height: 5em;
      border: 1px solid black;
    }
    .swatch {
      height: 5em;
      flex-grow: 1
    }
    .steps {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid black;
    }
    .spaces h1 {
        font-size: 1em;
      }
    }
    .controls .vertical {
      align-items: left;
    }
    `];constructor(){super();this.width=200,this.steps=5,this.colourSpace="hsl",this.fromColour="rgb(129,254,233)",this.toColour="rgb(246,110,255)"}renderSteps(t){const o=Math.max(2,this.steps),s={space:t},i=h.scale(o,s,this.fromColour,this.toColour).map((r,n)=>c`<div title="${r} - Step ${n}/${o}" class="swatch" style="background-color: ${r}"></div>`);return c`<div class="space"><h1>${t}</h1>
    <div class="steps">${i}</div>`}stepsUpdate(t){this.steps=parseInt(t.target.value)}fromColourUpdate(t){this.fromColour=t.target.value}toColourUpdate(t){this.toColour=t.target.value}render(){return this.fromColour,this.toColour,c`
      <div class="toolbar controls">
        <div class="vertical">
          <label for="stepsRange">Steps:</label>
          <input @input=${this.stepsUpdate} type="number" min="2" max="500" value=${this.steps} id="stepsRange">
        </div>
        <div class="vertical">
          <label for="fromColour">From</label>
          <input @input=${this.fromColourUpdate} type="color" id="fromColour" value=${h.toHex(this.fromColour)}>
        </div>
        <div class="vertical">
          <label for="toColour">To</label>
          <input @input=${this.toColourUpdate} type="color" id="toColour" value=${h.toHex(this.toColour)}>
        </div>

      </div>
			<div class="spaces">
        ${this.renderSteps("rgb")}
        ${this.renderSteps("cubehelix")}
        ${this.renderSteps("hsl")}
        ${this.renderSteps("lab")}
        ${this.renderSteps("hcl")}

      </div>
		`}}a([p({type:Number})],l.prototype,"steps",2);a([p({type:Number})],l.prototype,"width",2);a([p({type:String})],l.prototype,"colourSpace",2);a([p({type:String})],l.prototype,"fromColour",2);a([p({type:String})],l.prototype,"toColour",2);customElements.define(b,l);
