var m=Object.defineProperty;var v=(e,t,o)=>t in e?m(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var h=(e,t,o)=>(v(e,typeof t!="symbol"?t+"":t,o),o);import{s as f,r as b,$ as u,e as a}from"./vendor.a3225d27.js";import{e as C}from"./styles.0da1a4a9.js";import{C as d}from"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-YDTVC7MM.cb3895f8.js";var y=Object.defineProperty,$=Object.getOwnPropertyDescriptor,c=(e,t,o,l)=>{for(var s=l>1?void 0:l?$(t,o):t,p=e.length-1,i;p>=0;p--)(i=e[p])&&(s=(l?i(t,o,s):i(s))||s);return l&&s&&y(t,o,s),s};const g="colourscale-element";class r extends f{constructor(){super();this.width=200,this.steps=5,this.colourSpace="hsl",this.fromColour="rgb(129,254,233)",this.toColour="rgb(246,110,255)"}renderSteps(t){const o=Math.max(2,this.steps),l={space:t},p=d.scale(o,l,this.fromColour,this.toColour).map((i,n)=>u`<div title="${i} - Step ${n}/${o}" class="swatch" style="background-color: ${i}"></div>`);return u`<div class="space"><h1>${t}</h1>
    <div class="steps">${p}</div>`}stepsUpdate(t){this.steps=parseInt(t.target.value)}fromColourUpdate(t){this.fromColour=t.target.value}toColourUpdate(t){this.toColour=t.target.value}render(){return this.fromColour,this.toColour,u`
      <div class="toolbar controls">
        <div class="vertical">
          <label for="stepsRange">Steps:</label>
          <input @input=${this.stepsUpdate} type="number" min="2" max="500" value=${this.steps} id="stepsRange">
        </div>
        <div class="vertical">
          <label for="fromColour">From</label>
          <input @input=${this.fromColourUpdate} type="color" id="fromColour" value=${d.toHex(this.fromColour)}>
        </div>
        <div class="vertical">
          <label for="toColour">To</label>
          <input @input=${this.toColourUpdate} type="color" id="toColour" value=${d.toHex(this.toColour)}>
        </div>

      </div>
			<div class="spaces">
        ${this.renderSteps("rgb")}
        ${this.renderSteps("cubehelix")}
        ${this.renderSteps("hsl")}
        ${this.renderSteps("lab")}
        ${this.renderSteps("hcl")}

      </div>
		`}}h(r,"styles",[C,b`
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
    `]);c([a({type:Number})],r.prototype,"steps",2);c([a({type:Number})],r.prototype,"width",2);c([a({type:String})],r.prototype,"colourSpace",2);c([a({type:String})],r.prototype,"fromColour",2);c([a({type:String})],r.prototype,"toColour",2);customElements.define(g,r);
