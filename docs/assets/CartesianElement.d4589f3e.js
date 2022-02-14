var m=Object.defineProperty;var x=(i,e,s)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[e]=s;var a=(i,e,s)=>(x(i,typeof e!="symbol"?e+"":e,s),s);import{a as u,b as S,d as v,f as d}from"./vendor.1de7a7ed.js";import{P as b,L as h}from"./chunk-UWLZSNHO.00e5f090.js";import"./chunk-6JTGCZJL.784fcc38.js";import"./chunk-MBZ4GFG7.8e6d603a.js";import{t as w}from"./chunk-V6WGO73W.4b0edf4f.js";import{P as k,m as y,b as _}from"./chunk-3SMTKDXD.7befeba5.js";import"./chunk-FRVUOYS5.3d3ad9f9.js";import{e as j}from"./styles.94e3cd83.js";var O=Object.defineProperty,P=Object.getOwnPropertyDescriptor,f=(i,e,s,t)=>{for(var r=t>1?void 0:t?P(e,s):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(t?n(e,s,r):n(r))||r);return t&&r&&O(e,s,r),r};const $="cartesian-element";class c extends u{constructor(){super();a(this,"origin");a(this,"palette");this.palette=k.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},w().subscribe(e=>{this.updated()})}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,s=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const r=t.width,o=t.height-40;_.grid(t.parent,e,25,r,o),t.circle({radius:5,...e},{fillStyle:s,strokeStyle:"none"}),t.text("Origin",b.sum(e,5,20),{fillStyle:s,strokeStyle:"none"});const n={id:"triangle",fillStyle:s},l=20,g=h.fromNumbers(e.x,e.y,e.x+r-l,e.y);t.line(g,{fillStyle:"none",markerEnd:n,strokeStyle:s}),t.text("X",{x:e.x+r-45,y:e.y+l},{strokeStyle:"none",fillStyle:s});const p=h.fromNumbers(e.x,e.y,e.x,o);t.line(p,{fillStyle:"none",markerEnd:n,strokeStyle:s}),t.text("Y",{x:e.x+10,y:e.y+o-l-10},{strokeStyle:"none",fillStyle:s})}async updated(){this.renderSvg()}_pointerMove(e){const s=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,r=y(this.shadowRoot.querySelector("svg"));r.width,r.height;const o={x:e.offsetX,y:e.offsetY};o.x<t.x&&(o.x=t.x),o.y<t.y&&(o.y=t.y);const n=h.fromPoints(t,o);r.line(n,{strokeDash:"5",strokeStyle:s},"#pointerRay"),h.length(n),r.circle({radius:5,...o},{fillStyle:s,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:s,anchor:"middle"};r.text(`(${Math.round(o.x-t.x)}, ${Math.round(o.y-t.y)})`,{x:o.x,y:o.y+40},l,"#coordLabel")}render(){return v`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}a(c,"styles",[j,S`
      :host {
        color: var(--label-color, green);
      }
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #container>svg {
        touch-action: none;
      }
  `]);f([d()],c.prototype,"width",2);f([d()],c.prototype,"height",2);customElements.define($,c);export{c as CartesianElement,$ as tagName};
