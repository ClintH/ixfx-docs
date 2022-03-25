import{b as m,r as f,$ as x,a as y}from"./client-shim.cda72367.js";import{V as S,W as n}from"./chunks/chunk-QIWUQGQJ.e6594f26.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import"./chunks/chunk-SJVFW73P.e7d5b176.js";import{t as u}from"./chunks/chunk-DTRNDG6C.d0f370a4.js";import{a as v,m as h,S as w}from"./chunks/chunk-TSWQ4JT6.e4dc2800.js";import"./chunks/chunk-QAZYUFOI.8a9663bc.js";import{e as b}from"./chunks/styles.b557ca03.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var k=Object.defineProperty,_=Object.getOwnPropertyDescriptor,g=(a,t,i,e)=>{for(var r=e>1?void 0:e?_(t,i):t,o=a.length-1,s;o>=0;o--)(s=a[o])&&(r=(e?s(t,i,r):s(r))||r);return e&&r&&k(t,i,r),r};const $="cartesian-element";class c extends m{static styles=[b,f`
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
  `];origin;palette;constructor(){super();this.palette=v.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},u().subscribe(t=>{this.updated()})}getBounds(){const t=h(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=this.origin,i=this.palette.get("fgDim","black"),e=h(this.shadowRoot.querySelector("svg"));e.clear();const r=e.width,o=e.height-40;w.grid(e.parent,t,25,r,o,{strokeWidth:2}),e.circle({radius:5,...t},{fillStyle:i,strokeStyle:"none"}),e.text("Origin",S.sum(t,5,20),{fillStyle:i,strokeStyle:"none"});const s={id:"triangle",fillStyle:i,strokeWidth:2},l=20,p=n.fromNumbers(t.x,t.y,t.x+r-l,t.y);e.line(p,{fillStyle:"none",markerEnd:s,strokeWidth:3,strokeStyle:i}),e.text("X",{x:t.x+r-45,y:t.y+l},{strokeStyle:"none",fillStyle:i});const d=n.fromNumbers(t.x,t.y,t.x,o);e.line(d,{fillStyle:"none",markerEnd:s,strokeWidth:3,strokeStyle:i}),e.text("Y",{x:t.x+10,y:t.y+o-l-10},{strokeStyle:"none",fillStyle:i})}async updated(){this.renderSvg()}_pointerMove(t){const i=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const e=this.origin,r=h(this.shadowRoot.querySelector("svg"));r.width,r.height;const o={x:t.offsetX,y:t.offsetY};o.x<e.x&&(o.x=e.x),o.y<e.y&&(o.y=e.y);const s=n.fromPoints(e,o);r.line(s,{strokeDash:"5",strokeStyle:i},"#pointerRay"),n.length(s),r.circle({radius:5,...o},{fillStyle:i,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:i,anchor:"middle"};r.text(`(${Math.round(o.x-e.x)}, ${Math.round(o.y-e.y)})`,{x:o.x,y:o.y+40},l,"#coordLabel")}render(){return x`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}g([y()],c.prototype,"width",2);g([y()],c.prototype,"height",2);customElements.define($,c);export{c as CartesianElement,$ as tagName};
