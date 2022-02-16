var m=Object.defineProperty;var x=(i,e,o)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var a=(i,e,o)=>(x(i,typeof e!="symbol"?e+"":e,o),o);import{s as u,r as S,$ as v,e as g}from"./vendor.aa1ac2c8.js";import{P as b,L as h}from"./chunk-UWLZSNHO.b417c615.js";import"./chunk-6JTGCZJL.667a6ecc.js";import"./chunk-BWZCVD5D.693f13ba.js";import{t as w}from"./chunk-25RM45LF.24c9c7e0.js";import{P as k,m as y,b as _}from"./chunk-MTK5JJI3.e8b09b21.js";import"./chunk-FRVUOYS5.f63d7587.js";import{e as j}from"./styles.07fc92cf.js";var O=Object.defineProperty,P=Object.getOwnPropertyDescriptor,p=(i,e,o,t)=>{for(var r=t>1?void 0:t?P(e,o):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(t?n(e,o,r):n(r))||r);return t&&r&&O(e,o,r),r};const C="cartesian-element";class c extends u{constructor(){super();a(this,"origin");a(this,"palette");this.palette=k.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},w().subscribe(e=>{this.updated()})}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,o=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const r=t.width,s=t.height-40;_.grid(t.parent,e,25,r,s),t.circle({radius:5,...e},{fillStyle:o,strokeStyle:"none"}),t.text("Origin",b.sum(e,5,20),{fillStyle:o,strokeStyle:"none"});const n={id:"triangle",fillStyle:o},l=20,d=h.fromNumbers(e.x,e.y,e.x+r-l,e.y);t.line(d,{fillStyle:"none",markerEnd:n,strokeStyle:o}),t.text("X",{x:e.x+r-45,y:e.y+l},{strokeStyle:"none",fillStyle:o});const f=h.fromNumbers(e.x,e.y,e.x,s);t.line(f,{fillStyle:"none",markerEnd:n,strokeStyle:o}),t.text("Y",{x:e.x+10,y:e.y+s-l-10},{strokeStyle:"none",fillStyle:o})}async updated(){this.renderSvg()}_pointerMove(e){const o=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,r=y(this.shadowRoot.querySelector("svg"));r.width,r.height;const s={x:e.offsetX,y:e.offsetY};s.x<t.x&&(s.x=t.x),s.y<t.y&&(s.y=t.y);const n=h.fromPoints(t,s);r.line(n,{strokeDash:"5",strokeStyle:o},"#pointerRay"),h.length(n),r.circle({radius:5,...s},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};r.text(`(${Math.round(s.x-t.x)}, ${Math.round(s.y-t.y)})`,{x:s.x,y:s.y+40},l,"#coordLabel")}render(){return v`
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
  `]);p([g()],c.prototype,"width",2);p([g()],c.prototype,"height",2);customElements.define(C,c);export{c as CartesianElement,C as tagName};
