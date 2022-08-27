var x=Object.defineProperty;var m=(i,e,o)=>e in i?x(i,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[e]=o;var a=(i,e,o)=>(m(i,typeof e!="symbol"?e+"":e,o),o);import{a as S,r as u,$ as v,b as g}from"./vendor.c33530a8.js";import{P as w,t as b,m as y,S as k,a as _,L as h}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";import{e as P}from"./styles.801fcc34.js";var $=Object.defineProperty,O=Object.getOwnPropertyDescriptor,d=(i,e,o,t)=>{for(var r=t>1?void 0:t?O(e,o):e,s=i.length-1,l;s>=0;s--)(l=i[s])&&(r=(t?l(e,o,r):l(r))||r);return t&&r&&$(e,o,r),r};const C="cartesian-element";class c extends S{constructor(){super();a(this,"origin");a(this,"palette");this.palette=w.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},b().subscribe(e=>{this.updated()})}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,o=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"));t.clear();const r=t.width,s=t.height-40;k.grid(t.parent,e,25,r,s,{strokeWidth:2}),t.circle({radius:5,...e},{fillStyle:o,strokeStyle:"none"}),t.text("Origin",_.sum(e,5,20),{fillStyle:o,strokeStyle:"none"});const l={id:"triangle",fillStyle:o,strokeWidth:2},n=20,p=h.fromNumbers(e.x,e.y,e.x+r-n,e.y);t.line(p,{fillStyle:"none",markerEnd:l,strokeWidth:3,strokeStyle:o}),t.text("X",{x:e.x+r-45,y:e.y+n},{strokeStyle:"none",fillStyle:o});const f=h.fromNumbers(e.x,e.y,e.x,s);t.line(f,{fillStyle:"none",markerEnd:l,strokeWidth:3,strokeStyle:o}),t.text("Y",{x:e.x+10,y:e.y+s-n-10},{strokeStyle:"none",fillStyle:o})}async updated(){this.renderSvg()}_pointerMove(e){const o=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,r=y(this.shadowRoot.querySelector("svg"));r.width,r.height;const s={x:e.offsetX,y:e.offsetY};s.x<t.x&&(s.x=t.x),s.y<t.y&&(s.y=t.y);const l=h.fromPoints(t,s);r.line(l,{strokeDash:"5",strokeStyle:o},"#pointerRay"),h.length(l),r.circle({radius:5,...s},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const n={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};r.text(`(${Math.round(s.x-t.x)}, ${Math.round(s.y-t.y)})`,{x:s.x,y:s.y+40},n,"#coordLabel")}render(){return v`
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
  `]);d([g()],c.prototype,"width",2);d([g()],c.prototype,"height",2);customElements.define(C,c);export{c as CartesianElement,C as tagName};
