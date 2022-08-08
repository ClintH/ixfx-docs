import{b,r as _,$ as k,a as c}from"./client-shim.cda72367.js";import{b as C,t as D,p as g,S as P,q as R,L as y,s as M,u as O,v as $}from"./chunks/chunk-CWNWYEFL.2e02d266.js";import"./chunks/chunk-IP2OCIJK.bdd1e666.js";import{e as A}from"./chunks/styles.b4645976.js";var E=Object.defineProperty,q=Object.getOwnPropertyDescriptor,d=(p,e,r,o)=>{for(var t=o>1?void 0:o?q(e,r):e,i=p.length-1,s;i>=0;i--)(s=p[i])&&(t=(o?s(e,r,t):s(t))||t);return o&&t&&E(e,r,t),t};const B="polar-coords-element";class l extends b{static styles=[A,_`
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
  `];palette;constructor(){super();this.palette=C.create(),this.palette.setElementBase(this),this.width=500,this.height=300,D().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=g(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),r=g(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});r.clear();const o=r.width,t=r.height,i=Math.min(o/2,t/2),s={x:o/2,y:t/2};P.grid(r.parent,s,25,o,t);const a=25;r.circle({radius:3,...s},{fillStyle:e,strokeStyle:"none"}),r.text("Origin",R.sum(s,2,a),{fillStyle:e,strokeStyle:"none"});const n={id:"triangle",fillStyle:e},h=y.fromNumbers(s.x,s.y,s.x+i-10,s.y);r.line(h,{fillStyle:"none",markerEnd:n,strokeWidth:3,strokeStyle:e}),r.text("A",{x:s.x+i-35,y:s.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const r=this.palette.get("accent-bold","yellow"),o=this.palette.get("fg-dim","yellow"),t=g(this.shadowRoot.querySelector("svg")),i=t.width,s=t.height,a={x:i/2,y:s/2},n={x:e.offsetX,y:e.offsetY},h=y.fromPoints(a,n);t.line(h,{strokeDash:"5",strokeStyle:r,strokeWidth:3},"#pointerRay");const f=y.length(h);t.circle({radius:5,...n},{fillStyle:r,strokeStyle:"none"},"#targetCircle");const m=M.fromCartesian(n,a),u=O(m.angleRadian),v=m.angleRadian;let S={endRadian:v,startRadian:0,radius:Math.min(100,f),...a},x={sweep:!0,largeArc:!(v<0)};Math.round(u)!==0&&t.path($.toSvg(S,x),{strokeWidth:3,strokeStyle:o},"#arc");const w={strokeStyle:"transparent",fillStyle:r,anchor:"middle"};t.text(`(${Math.round(f)}, ${Math.floor(u)}\xB0)`,{x:n.x,y:n.y+40},w,"#coordLabel")}render(){return k`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}d([c()],l.prototype,"radian",2);d([c()],l.prototype,"degree",2);d([c()],l.prototype,"width",2);d([c()],l.prototype,"height",2);customElements.define(B,l);export{l as PolarCoordsElement,B as tagName};
