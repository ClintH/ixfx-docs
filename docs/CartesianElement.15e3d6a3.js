import{b as m,r as f,$ as x,a as y}from"./client-shim.cda72367.js";import{U as S,V as n}from"./chunks/chunk-ZTHSWHI3.b2cf17c9.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import"./chunks/chunk-SJVFW73P.e7d5b176.js";import{t as u}from"./chunks/chunk-DTRNDG6C.d0f370a4.js";import{a as v,m as h,S as w}from"./chunks/chunk-Y34DFPYJ.e44e5be3.js";import"./chunks/chunk-XQHW4NES.f66c7e52.js";import{e as b}from"./chunks/styles.b557ca03.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var _=Object.defineProperty,k=Object.getOwnPropertyDescriptor,p=(a,e,i,t)=>{for(var r=t>1?void 0:t?k(e,i):e,o=a.length-1,s;o>=0;o--)(s=a[o])&&(r=(t?s(e,i,r):s(r))||r);return t&&r&&_(e,i,r),r};const $="cartesian-element";class c extends m{static styles=[b,f`
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
  `];origin;palette;constructor(){super();this.palette=v.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},u().subscribe(e=>{this.updated()})}getBounds(){const e=h(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,i=this.palette.get("fgDim","black"),t=h(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const r=t.width,o=t.height-40;w.grid(t.parent,e,25,r,o),t.circle({radius:5,...e},{fillStyle:i,strokeStyle:"none"}),t.text("Origin",S.sum(e,5,20),{fillStyle:i,strokeStyle:"none"});const s={id:"triangle",fillStyle:i},l=20,g=n.fromNumbers(e.x,e.y,e.x+r-l,e.y);t.line(g,{fillStyle:"none",markerEnd:s,strokeStyle:i}),t.text("X",{x:e.x+r-45,y:e.y+l},{strokeStyle:"none",fillStyle:i});const d=n.fromNumbers(e.x,e.y,e.x,o);t.line(d,{fillStyle:"none",markerEnd:s,strokeStyle:i}),t.text("Y",{x:e.x+10,y:e.y+o-l-10},{strokeStyle:"none",fillStyle:i})}async updated(){this.renderSvg()}_pointerMove(e){const i=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,r=h(this.shadowRoot.querySelector("svg"));r.width,r.height;const o={x:e.offsetX,y:e.offsetY};o.x<t.x&&(o.x=t.x),o.y<t.y&&(o.y=t.y);const s=n.fromPoints(t,o);r.line(s,{strokeDash:"5",strokeStyle:i},"#pointerRay"),n.length(s),r.circle({radius:5,...o},{fillStyle:i,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:i,anchor:"middle"};r.text(`(${Math.round(o.x-t.x)}, ${Math.round(o.y-t.y)})`,{x:o.x,y:o.y+40},l,"#coordLabel")}render(){return x`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}p([y()],c.prototype,"width",2);p([y()],c.prototype,"height",2);customElements.define($,c);export{c as CartesianElement,$ as tagName};
