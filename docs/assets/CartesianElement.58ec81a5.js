var m=Object.defineProperty;var u=(i,e,o)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var h=(i,e,o)=>(u(i,typeof e!="symbol"?e+"":e,o),o);import{s as x,r as S,$ as v,e as d}from"./vendor.a3225d27.js";import{P as b,L as a}from"./chunk-7CELPBFO.f6fe4a50.js";import"./chunk-V2CC3OS2.f8999184.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-QC5UDUYU.8c389651.js";import{t as k}from"./chunk-6RSYJ7PX.b9b486b6.js";import{P as w,m as y,b as P}from"./chunk-5LTT7AGF.2750761f.js";import"./chunk-672VRZPI.818522b7.js";import{e as j}from"./styles.0da1a4a9.js";import"./chunk-YDTVC7MM.cb3895f8.js";var _=Object.defineProperty,C=Object.getOwnPropertyDescriptor,p=(i,e,o,t)=>{for(var r=t>1?void 0:t?C(e,o):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(t?n(e,o,r):n(r))||r);return t&&r&&_(e,o,r),r};const O="cartesian-element";class c extends x{constructor(){super();h(this,"origin");h(this,"palette");this.palette=w.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},k().subscribe(e=>{this.updated()})}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,o=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const r=t.width,s=t.height-40;P.grid(t.parent,e,25,r,s),t.circle({radius:5,...e},{fillStyle:o,strokeStyle:"none"}),t.text("Origin",b.sum(e,5,20),{fillStyle:o,strokeStyle:"none"});const n={id:"triangle",fillStyle:o},l=20,g=a.fromNumbers(e.x,e.y,e.x+r-l,e.y);t.line(g,{fillStyle:"none",markerEnd:n,strokeStyle:o}),t.text("X",{x:e.x+r-45,y:e.y+l},{strokeStyle:"none",fillStyle:o});const f=a.fromNumbers(e.x,e.y,e.x,s);t.line(f,{fillStyle:"none",markerEnd:n,strokeStyle:o}),t.text("Y",{x:e.x+10,y:e.y+s-l-10},{strokeStyle:"none",fillStyle:o})}async updated(){this.renderSvg()}_pointerMove(e){const o=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,r=y(this.shadowRoot.querySelector("svg"));r.width,r.height;const s={x:e.offsetX,y:e.offsetY};s.x<t.x&&(s.x=t.x),s.y<t.y&&(s.y=t.y);const n=a.fromPoints(t,s);r.line(n,{strokeDash:"5",strokeStyle:o},"#pointerRay"),a.length(n),r.circle({radius:5,...s},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};r.text(`(${Math.round(s.x-t.x)}, ${Math.round(s.y-t.y)})`,{x:s.x,y:s.y+40},l,"#coordLabel")}render(){return v`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}h(c,"styles",[j,S`
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
  `]);p([d()],c.prototype,"width",2);p([d()],c.prototype,"height",2);customElements.define(O,c);export{c as CartesianElement,O as tagName};
