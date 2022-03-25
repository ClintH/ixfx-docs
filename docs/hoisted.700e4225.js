import"./chunks/loader.c806e4ef.js";import{b as n,r as d,$ as c,a as p}from"./client-shim.cda72367.js";import{e as v}from"./chunks/styles.b557ca03.js";import{C as h}from"./chunks/chunk-TSWQ4JT6.e4dc2800.js";import"./chunks/chunk-QIWUQGQJ.e6594f26.js";import"./chunks/chunk-QAZYUFOI.8a9663bc.js";import"./chunks/chunk-DTRNDG6C.d0f370a4.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var f=Object.defineProperty,C=Object.getOwnPropertyDescriptor,a=(u,t,e,r)=>{for(var o=r>1?void 0:r?C(t,e):t,i=u.length-1,s;i>=0;i--)(s=u[i])&&(o=(r?s(t,e,o):s(o))||o);return r&&o&&f(t,e,o),o};const b="colourscale-element";class l extends n{static styles=[v,d`
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
    `];constructor(){super();this.width=200,this.steps=5,this.colourSpace="hsl",this.fromColour="rgb(129,254,233)",this.toColour="rgb(246,110,255)"}renderSteps(t){const e=Math.max(2,this.steps),r={space:t},i=h.scale(e,r,this.fromColour,this.toColour).map((s,m)=>c`<div title="${s} - Step ${m}/${e}" class="swatch" style="background-color: ${s}"></div>`);return c`<div class="space"><h1>${t}</h1>
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
