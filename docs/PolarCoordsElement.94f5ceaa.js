import{b as _,r as b,$ as k,a as c}from"./client-shim.cda72367.js";import{P as C,af as g,ag as P,ah as D,ai as R}from"./chunks/chunk-QOZ2BRCA.14308385.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import"./chunks/chunk-MW3GDUJU.b2443a15.js";import{t as M}from"./chunks/chunk-BSJKVIJG.f7604bb7.js";import{a as O,m,S as $}from"./chunks/chunk-FJ2C6UZS.54105029.js";import"./chunks/chunk-25KFP6OF.934c8512.js";import"./chunks/chunk-4X2SZKK7.4dbfee46.js";import{e as A}from"./chunks/styles.591694aa.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";var E=Object.defineProperty,B=Object.getOwnPropertyDescriptor,d=(p,e,r,s)=>{for(var t=s>1?void 0:s?B(e,r):e,i=p.length-1,o;i>=0;i--)(o=p[i])&&(t=(s?o(e,r,t):o(t))||t);return s&&t&&E(e,r,t),t};const W="polar-coords-element";class l extends _{static styles=[A,b`
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
  `];palette;constructor(){super();this.palette=O.create(),this.palette.setElementBase(this),this.width=500,this.height=300,M().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=m(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),r=m(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});r.clear();const s=r.width,t=r.height,i=Math.min(s/2,t/2),o={x:s/2,y:t/2};$.grid(r.parent,o,25,s,t);const n=25;r.circle({radius:3,...o},{fillStyle:e,strokeStyle:"none"}),r.text("Origin",C.sum(o,2,n),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},h=g.fromNumbers(o.x,o.y,o.x+i-10,o.y);r.line(h,{fillStyle:"none",markerEnd:a,strokeWidth:3,strokeStyle:e}),r.text("A",{x:o.x+i-35,y:o.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const r=this.palette.get("accent-bold","yellow"),s=this.palette.get("fg-dim","yellow"),t=m(this.shadowRoot.querySelector("svg")),i=t.width,o=t.height,n={x:i/2,y:o/2},a={x:e.offsetX,y:e.offsetY},h=g.fromPoints(n,a);t.line(h,{strokeDash:"5",strokeStyle:r,strokeWidth:3},"#pointerRay");const y=g.length(h);t.circle({radius:5,...a},{fillStyle:r,strokeStyle:"none"},"#targetCircle");const f=P.fromCartesian(a,n),u=D(f.angleRadian),v=f.angleRadian;let S={endRadian:v,startRadian:0,radius:Math.min(100,y),...n},x={sweep:!0,largeArc:!(v<0)};Math.round(u)!==0&&t.path(R.toSvg(S,x),{strokeWidth:3,strokeStyle:s},"#arc");const w={strokeStyle:"transparent",fillStyle:r,anchor:"middle"};t.text(`(${Math.round(y)}, ${Math.floor(u)}\xB0)`,{x:a.x,y:a.y+40},w,"#coordLabel")}render(){return k`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}d([c()],l.prototype,"radian",2);d([c()],l.prototype,"degree",2);d([c()],l.prototype,"width",2);d([c()],l.prototype,"height",2);customElements.define(W,l);export{l as PolarCoordsElement,W as tagName};
