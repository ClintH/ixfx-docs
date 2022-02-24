var m=Object.defineProperty;var u=(i,e,o)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var h=(i,e,o)=>(u(i,typeof e!="symbol"?e+"":e,o),o);import{s as x,r as S,$ as v,e as d}from"./vendor.ace659e5.js";import{P as b,L as a}from"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-C2GSEUUB.5e1d8426.js";import{t as k}from"./chunk-6RSYJ7PX.b9b486b6.js";import{a as w,m as y,b as j}from"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import{e as _}from"./styles.210b3806.js";import"./chunk-YDTVC7MM.cb3895f8.js";var C=Object.defineProperty,P=Object.getOwnPropertyDescriptor,p=(i,e,o,t)=>{for(var r=t>1?void 0:t?P(e,o):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(t?n(e,o,r):n(r))||r);return t&&r&&C(e,o,r),r};const M="cartesian-element";class c extends x{constructor(){super();h(this,"origin");h(this,"palette");this.palette=w.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},k().subscribe(e=>{this.updated()})}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,o=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const r=t.width,s=t.height-40;j.grid(t.parent,e,25,r,s),t.circle({radius:5,...e},{fillStyle:o,strokeStyle:"none"}),t.text("Origin",b.sum(e,5,20),{fillStyle:o,strokeStyle:"none"});const n={id:"triangle",fillStyle:o},l=20,g=a.fromNumbers(e.x,e.y,e.x+r-l,e.y);t.line(g,{fillStyle:"none",markerEnd:n,strokeStyle:o}),t.text("X",{x:e.x+r-45,y:e.y+l},{strokeStyle:"none",fillStyle:o});const f=a.fromNumbers(e.x,e.y,e.x,s);t.line(f,{fillStyle:"none",markerEnd:n,strokeStyle:o}),t.text("Y",{x:e.x+10,y:e.y+s-l-10},{strokeStyle:"none",fillStyle:o})}async updated(){this.renderSvg()}_pointerMove(e){const o=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,r=y(this.shadowRoot.querySelector("svg"));r.width,r.height;const s={x:e.offsetX,y:e.offsetY};s.x<t.x&&(s.x=t.x),s.y<t.y&&(s.y=t.y);const n=a.fromPoints(t,s);r.line(n,{strokeDash:"5",strokeStyle:o},"#pointerRay"),a.length(n),r.circle({radius:5,...s},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};r.text(`(${Math.round(s.x-t.x)}, ${Math.round(s.y-t.y)})`,{x:s.x,y:s.y+40},l,"#coordLabel")}render(){return v`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}h(c,"styles",[_,S`
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
  `]);p([d()],c.prototype,"width",2);p([d()],c.prototype,"height",2);customElements.define(M,c);export{c as CartesianElement,M as tagName};
