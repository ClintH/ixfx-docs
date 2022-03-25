import{b as _,r as b,$ as k,a as c}from"./client-shim.cda72367.js";import{V as C,W as g,X as D,Y as P,Z as R}from"./chunks/chunk-QIWUQGQJ.e6594f26.js";import"./chunks/chunk-U4IZE4J2.68fe18db.js";import"./chunks/chunk-SJVFW73P.e7d5b176.js";import{t as M}from"./chunks/chunk-DTRNDG6C.d0f370a4.js";import{a as O,m as y,S as $}from"./chunks/chunk-TSWQ4JT6.e4dc2800.js";import"./chunks/chunk-QAZYUFOI.8a9663bc.js";import{e as A}from"./chunks/styles.b557ca03.js";import"./chunks/chunk-FQLUQVDZ.735c98e3.js";var E=Object.defineProperty,W=Object.getOwnPropertyDescriptor,d=(p,e,r,s)=>{for(var t=s>1?void 0:s?W(e,r):e,i=p.length-1,o;i>=0;i--)(o=p[i])&&(t=(s?o(e,r,t):o(t))||t);return s&&t&&E(e,r,t),t};const B="polar-coords-element";class l extends _{static styles=[A,b`
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
  `];palette;constructor(){super();this.palette=O.create(),this.palette.setElementBase(this),this.width=500,this.height=300,M().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),r=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});r.clear();const s=r.width,t=r.height,i=Math.min(s/2,t/2),o={x:s/2,y:t/2};$.grid(r.parent,o,25,s,t);const a=25;r.circle({radius:3,...o},{fillStyle:e,strokeStyle:"none"}),r.text("Origin",C.sum(o,2,a),{fillStyle:e,strokeStyle:"none"});const n={id:"triangle",fillStyle:e},h=g.fromNumbers(o.x,o.y,o.x+i-10,o.y);r.line(h,{fillStyle:"none",markerEnd:n,strokeWidth:3,strokeStyle:e}),r.text("A",{x:o.x+i-35,y:o.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const r=this.palette.get("accent-bold","yellow"),s=this.palette.get("fg-dim","yellow"),t=y(this.shadowRoot.querySelector("svg")),i=t.width,o=t.height,a={x:i/2,y:o/2},n={x:e.offsetX,y:e.offsetY},h=g.fromPoints(a,n);t.line(h,{strokeDash:"5",strokeStyle:r,strokeWidth:3},"#pointerRay");const m=g.length(h);t.circle({radius:5,...n},{fillStyle:r,strokeStyle:"none"},"#targetCircle");const f=D.fromCartesian(n,a),u=P(f.angleRadian),v=f.angleRadian;let S={endRadian:v,startRadian:0,radius:Math.min(100,m),...a},x={sweep:!0,largeArc:!(v<0)};Math.round(u)!==0&&t.path(R.toSvg(S,x),{strokeWidth:3,strokeStyle:s},"#arc");const w={strokeStyle:"transparent",fillStyle:r,anchor:"middle"};t.text(`(${Math.round(m)}, ${Math.floor(u)}\xB0)`,{x:n.x,y:n.y+40},w,"#coordLabel")}render(){return k`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}d([c()],l.prototype,"radian",2);d([c()],l.prototype,"degree",2);d([c()],l.prototype,"width",2);d([c()],l.prototype,"height",2);customElements.define(B,l);export{l as PolarCoordsElement,B as tagName};
