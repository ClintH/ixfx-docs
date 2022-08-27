import{b as _,r as b,q as k,R as C,S as p,T as R,U as D,V as y,W as P,X as M,Y as O,$,a as c}from"./client-shim.9530acfc.js";import{e as A}from"./chunks/styles.b6bfd690.js";var E=Object.defineProperty,W=Object.getOwnPropertyDescriptor,d=(g,e,s,o)=>{for(var t=o>1?void 0:o?W(e,s):e,i=g.length-1,r;i>=0;i--)(r=g[i])&&(t=(o?r(e,s,t):r(t))||t);return o&&t&&E(e,s,t),t};const q="polar-coords-element";class l extends _{static styles=[A,b`
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
  `];palette;constructor(){super();this.palette=k.create(),this.palette.setElementBase(this),this.width=500,this.height=300,C().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=p(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),s=p(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});s.clear();const o=s.width,t=s.height,i=Math.min(o/2,t/2),r={x:o/2,y:t/2};R.grid(s.parent,r,25,o,t);const a=25;s.circle({radius:3,...r},{fillStyle:e,strokeStyle:"none"}),s.text("Origin",D.sum(r,2,a),{fillStyle:e,strokeStyle:"none"});const n={id:"triangle",fillStyle:e},h=y.fromNumbers(r.x,r.y,r.x+i-10,r.y);s.line(h,{fillStyle:"none",markerEnd:n,strokeWidth:3,strokeStyle:e}),s.text("A",{x:r.x+i-35,y:r.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const s=this.palette.get("accent-bold","yellow"),o=this.palette.get("fg-dim","yellow"),t=p(this.shadowRoot.querySelector("svg")),i=t.width,r=t.height,a={x:i/2,y:r/2},n={x:e.offsetX,y:e.offsetY},h=y.fromPoints(a,n);t.line(h,{strokeDash:"5",strokeStyle:s,strokeWidth:3},"#pointerRay");const f=y.length(h);t.circle({radius:5,...n},{fillStyle:s,strokeStyle:"none"},"#targetCircle");const u=P.fromCartesian(n,a),m=M(u.angleRadian),v=u.angleRadian;let S={endRadian:v,startRadian:0,radius:Math.min(100,f),...a},x={sweep:!0,largeArc:!(v<0)};Math.round(m)!==0&&t.path(O.toSvg(S,x),{strokeWidth:3,strokeStyle:o},"#arc");const w={strokeStyle:"transparent",fillStyle:s,anchor:"middle"};t.text(`(${Math.round(f)}, ${Math.floor(m)}\xB0)`,{x:n.x,y:n.y+40},w,"#coordLabel")}render(){return $`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}d([c()],l.prototype,"radian",2);d([c()],l.prototype,"degree",2);d([c()],l.prototype,"width",2);d([c()],l.prototype,"height",2);customElements.define(q,l);export{l as PolarCoordsElement,q as tagName};
