var f=Object.defineProperty;var x=(s,e,o)=>e in s?f(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var a=(s,e,o)=>(x(s,typeof e!="symbol"?e+"":e,o),o);import{a as S,r as u,$ as v,b as p}from"./vendor.92dd9f01.js";import{P as w,L as h}from"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import"./chunk-TDKAXZAS.1af599a9.js";import{t as b}from"./chunk-QVRQKKRB.4ee1b7cb.js";import{P as _,m as y,S as k}from"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-B7RHPX6D.163a8542.js";import{e as P}from"./styles.9b5dda15.js";import"./chunk-FQLUQVDZ.8e87cdc9.js";var $=Object.defineProperty,O=Object.getOwnPropertyDescriptor,g=(s,e,o,t)=>{for(var i=t>1?void 0:t?O(e,o):e,r=s.length-1,l;r>=0;r--)(l=s[r])&&(i=(t?l(e,o,i):l(i))||i);return t&&i&&$(e,o,i),i};const C="cartesian-element";class c extends S{constructor(){super();a(this,"origin");a(this,"palette");this.palette=_.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},b().subscribe(e=>{this.updated()})}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,o=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const i=t.width,r=t.height-40;k.grid(t.parent,e,25,i,r),t.circle({radius:5,...e},{fillStyle:o,strokeStyle:"none"}),t.text("Origin",w.sum(e,5,20),{fillStyle:o,strokeStyle:"none"});const l={id:"triangle",fillStyle:o},n=20,d=h.fromNumbers(e.x,e.y,e.x+i-n,e.y);t.line(d,{fillStyle:"none",markerEnd:l,strokeStyle:o}),t.text("X",{x:e.x+i-45,y:e.y+n},{strokeStyle:"none",fillStyle:o});const m=h.fromNumbers(e.x,e.y,e.x,r);t.line(m,{fillStyle:"none",markerEnd:l,strokeStyle:o}),t.text("Y",{x:e.x+10,y:e.y+r-n-10},{strokeStyle:"none",fillStyle:o})}async updated(){this.renderSvg()}_pointerMove(e){const o=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,i=y(this.shadowRoot.querySelector("svg"));i.width,i.height;const r={x:e.offsetX,y:e.offsetY};r.x<t.x&&(r.x=t.x),r.y<t.y&&(r.y=t.y);const l=h.fromPoints(t,r);i.line(l,{strokeDash:"5",strokeStyle:o},"#pointerRay"),h.length(l),i.circle({radius:5,...r},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const n={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};i.text(`(${Math.round(r.x-t.x)}, ${Math.round(r.y-t.y)})`,{x:r.x,y:r.y+40},n,"#coordLabel")}render(){return v`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}a(c,"styles",[P,u`
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
  `]);g([p()],c.prototype,"width",2);g([p()],c.prototype,"height",2);customElements.define(C,c);export{c as CartesianElement,C as tagName};
