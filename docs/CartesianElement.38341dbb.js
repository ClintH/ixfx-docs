import{b as m,r as f,$ as x,a as y}from"./client-shim.cda72367.js";import{P as S,af as n}from"./chunks/chunk-QOZ2BRCA.14308385.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import"./chunks/chunk-MW3GDUJU.b2443a15.js";import{t as u}from"./chunks/chunk-BSJKVIJG.f7604bb7.js";import{a as v,m as h,S as w}from"./chunks/chunk-FJ2C6UZS.54105029.js";import"./chunks/chunk-25KFP6OF.934c8512.js";import"./chunks/chunk-4X2SZKK7.4dbfee46.js";import{e as b}from"./chunks/styles.591694aa.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";var k=Object.defineProperty,_=Object.getOwnPropertyDescriptor,p=(a,t,i,e)=>{for(var r=e>1?void 0:e?_(t,i):t,o=a.length-1,s;o>=0;o--)(s=a[o])&&(r=(e?s(t,i,r):s(r))||r);return e&&r&&k(t,i,r),r};const P="cartesian-element";class c extends m{static styles=[b,f`
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
  `];origin;palette;constructor(){super();this.palette=v.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},u().subscribe(t=>{this.updated()})}getBounds(){const t=h(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=this.origin,i=this.palette.get("fgDim","black"),e=h(this.shadowRoot.querySelector("svg"));e.clear();const r=e.width,o=e.height-40;w.grid(e.parent,t,25,r,o,{strokeWidth:2}),e.circle({radius:5,...t},{fillStyle:i,strokeStyle:"none"}),e.text("Origin",S.sum(t,5,20),{fillStyle:i,strokeStyle:"none"});const s={id:"triangle",fillStyle:i,strokeWidth:2},l=20,g=n.fromNumbers(t.x,t.y,t.x+r-l,t.y);e.line(g,{fillStyle:"none",markerEnd:s,strokeWidth:3,strokeStyle:i}),e.text("X",{x:t.x+r-45,y:t.y+l},{strokeStyle:"none",fillStyle:i});const d=n.fromNumbers(t.x,t.y,t.x,o);e.line(d,{fillStyle:"none",markerEnd:s,strokeWidth:3,strokeStyle:i}),e.text("Y",{x:t.x+10,y:t.y+o-l-10},{strokeStyle:"none",fillStyle:i})}async updated(){this.renderSvg()}_pointerMove(t){const i=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const e=this.origin,r=h(this.shadowRoot.querySelector("svg"));r.width,r.height;const o={x:t.offsetX,y:t.offsetY};o.x<e.x&&(o.x=e.x),o.y<e.y&&(o.y=e.y);const s=n.fromPoints(e,o);r.line(s,{strokeDash:"5",strokeStyle:i},"#pointerRay"),n.length(s),r.circle({radius:5,...o},{fillStyle:i,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:i,anchor:"middle"};r.text(`(${Math.round(o.x-e.x)}, ${Math.round(o.y-e.y)})`,{x:o.x,y:o.y+40},l,"#coordLabel")}render(){return x`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}p([y()],c.prototype,"width",2);p([y()],c.prototype,"height",2);customElements.define(P,c);export{c as CartesianElement,P as tagName};
