var m=Object.defineProperty;var v=(o,t,e)=>t in o?m(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var d=(o,t,e)=>(v(o,typeof t!="symbol"?t+"":t,e),e);import{s as f,r as b,$ as c,e as a}from"./vendor.a3225d27.js";import{e as C}from"./styles.af89b8ed.js";import{C as h}from"./chunk-MTK5JJI3.2542cf04.js";import"./chunk-FRVUOYS5.9da9d51c.js";import"./chunk-25RM45LF.6197efee.js";import"./chunk-UWLZSNHO.60128285.js";import"./chunk-6JTGCZJL.ec4f5d4b.js";var y=Object.defineProperty,$=Object.getOwnPropertyDescriptor,u=(o,t,e,l)=>{for(var s=l>1?void 0:l?$(t,e):t,p=o.length-1,i;p>=0;p--)(i=o[p])&&(s=(l?i(t,e,s):i(s))||s);return l&&s&&y(t,e,s),s};const g="colourscale-element";class r extends f{constructor(){super();this.width=200,this.steps=5,this.colourSpace="hsl",this.fromColour="rgb(129,254,233)",this.toColour="rgb(246,110,255)"}renderSteps(t){const e=Math.max(2,this.steps),l={space:t},p=h.scale(e,l,this.fromColour,this.toColour).map((i,n)=>c`<div title="${i} - Step ${n}/${e}" class="swatch" style="background-color: ${i}"></div>`);return c`<div class="space"><h1>${t}</h1>
    <div class="steps">${p}</div>`}stepsUpdate(t){this.steps=parseInt(t.target.value)}fromColourUpdate(t){this.fromColour=t.target.value}toColourUpdate(t){this.toColour=t.target.value}render(){return this.fromColour,this.toColour,c`
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
		`}}d(r,"styles",[C,b`
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
    `]);u([a({type:Number})],r.prototype,"steps",2);u([a({type:Number})],r.prototype,"width",2);u([a({type:String})],r.prototype,"colourSpace",2);u([a({type:String})],r.prototype,"fromColour",2);u([a({type:String})],r.prototype,"toColour",2);customElements.define(g,r);
