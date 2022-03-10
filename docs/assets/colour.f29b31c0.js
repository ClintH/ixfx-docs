var v=Object.defineProperty;var f=(o,t,e)=>t in o?v(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var c=(o,t,e)=>(f(o,typeof t!="symbol"?t+"":t,e),e);import"./loader.039e8a90.js";import{a as g,r as C,$ as d,b as n,o as b,c as h,f as y}from"./vendor.92dd9f01.js";import{e as x}from"./styles.9b5dda15.js";import{C as m}from"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-B7RHPX6D.163a8542.js";import"./chunk-QVRQKKRB.4ee1b7cb.js";import"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import{_ as a}from"./preload-helper.8b4a5925.js";import"./chunk-FQLUQVDZ.8e87cdc9.js";var P=Object.defineProperty,E=Object.getOwnPropertyDescriptor,u=(o,t,e,r)=>{for(var s=r>1?void 0:r?E(t,e):t,p=o.length-1,i;p>=0;p--)(i=o[p])&&(s=(r?i(t,e,s):i(s))||s);return r&&s&&P(t,e,s),s};const $="colourscale-element";class l extends g{constructor(){super();this.width=200,this.steps=5,this.colourSpace="hsl",this.fromColour="rgb(129,254,233)",this.toColour="rgb(246,110,255)"}renderSteps(t){const e=Math.max(2,this.steps),r={space:t},p=m.scale(e,r,this.fromColour,this.toColour).map((i,_)=>d`<div title="${i} - Step ${_}/${e}" class="swatch" style="background-color: ${i}"></div>`);return d`<div class="space"><h1>${t}</h1>
    <div class="steps">${p}</div>`}stepsUpdate(t){this.steps=parseInt(t.target.value)}fromColourUpdate(t){this.fromColour=t.target.value}toColourUpdate(t){this.toColour=t.target.value}render(){return this.fromColour,this.toColour,d`
      <div class="toolbar controls">
        <div class="vertical">
          <label for="stepsRange">Steps:</label>
          <input @input=${this.stepsUpdate} type="number" min="2" max="500" value=${this.steps} id="stepsRange">
        </div>
        <div class="vertical">
          <label for="fromColour">From</label>
          <input @input=${this.fromColourUpdate} type="color" id="fromColour" value=${m.toHex(this.fromColour)}>
        </div>
        <div class="vertical">
          <label for="toColour">To</label>
          <input @input=${this.toColourUpdate} type="color" id="toColour" value=${m.toHex(this.toColour)}>
        </div>

      </div>
			<div class="spaces">
        ${this.renderSteps("rgb")}
        ${this.renderSteps("cubehelix")}
        ${this.renderSteps("hsl")}
        ${this.renderSteps("lab")}
        ${this.renderSteps("hcl")}

      </div>
		`}}c(l,"styles",[x,C`
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
    `]);u([n({type:Number})],l.prototype,"steps",2);u([n({type:Number})],l.prototype,"width",2);u([n({type:String})],l.prototype,"colourSpace",2);u([n({type:String})],l.prototype,"fromColour",2);u([n({type:String})],l.prototype,"toColour",2);customElements.define($,l);b("Z12Vj7s",{name:"SidebarToggle",value:!0},async()=>{const[{default:o},{default:t}]=await Promise.all([a(()=>import("./SidebarToggle.ee22eb03.js"),["assets/SidebarToggle.ee22eb03.js","assets/vendor.92dd9f01.js"]),a(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,r)=>t(e)(o,{class:"astro-LPHCP5C4"},r)});h("ZeRXJ8",{name:"TableOfContents",value:"(min-width: 50em)"},async()=>{const[{default:o},{default:t}]=await Promise.all([a(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),a(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,r)=>t(e)(o,{headers:[{depth:2,slug:"interpolating",text:"Interpolating"},{depth:2,slug:"scale",text:"Scale"},{depth:2,slug:"parsing",text:"Parsing"},{depth:2,slug:"variations",text:"Variations"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-LR56V2JR"},r)});y("1Gmxo9",{name:"ThemeToggleButton",value:!0},async()=>{const[{default:o},{default:t}]=await Promise.all([a(()=>import("./ThemeToggleButton.b2be24ee.js"),["assets/ThemeToggleButton.b2be24ee.js","assets/vendor.92dd9f01.js"]),a(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,r)=>t(e)(o,{class:"astro-KYEUEDYA"},r)});h("ZeRXJ8",{name:"TableOfContents",value:"(max-width: 50em)"},async()=>{const[{default:o},{default:t}]=await Promise.all([a(()=>import("./TableOfContents.bf0d35f0.js"),["assets/TableOfContents.bf0d35f0.js","assets/vendor.92dd9f01.js"]),a(()=>import("./client.0befb80f.js"),["assets/client.0befb80f.js","assets/vendor.92dd9f01.js"])]);return(e,r)=>t(e)(o,{headers:[{depth:2,slug:"interpolating",text:"Interpolating"},{depth:2,slug:"scale",text:"Scale"},{depth:2,slug:"parsing",text:"Parsing"},{depth:2,slug:"variations",text:"Variations"},{depth:2,slug:"credits",text:"Credits"}],class:"astro-EDKM2WF4"},r)});
