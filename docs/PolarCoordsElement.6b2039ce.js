import{c as _,g as b,f as k,a as c}from"./client-shim.8cb18301.js";import{b as C,t as D,p,S as P,q as R,L as y,x as M,s as O,y as $}from"./chunks/chunk-XLVCNC2H.5118e312.js";import{e as A}from"./chunks/styles.b86f48e3.js";var E=Object.defineProperty,q=Object.getOwnPropertyDescriptor,d=(g,e,s,r)=>{for(var t=r>1?void 0:r?q(e,s):e,i=g.length-1,o;i>=0;i--)(o=g[i])&&(t=(r?o(e,s,t):o(t))||t);return r&&t&&E(e,s,t),t};const B="polar-coords-element";class l extends _{static styles=[A,b`
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
  `];palette;constructor(){super();this.palette=C.create(),this.palette.setElementBase(this),this.width=500,this.height=300,D().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=p(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),s=p(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});s.clear();const r=s.width,t=s.height,i=Math.min(r/2,t/2),o={x:r/2,y:t/2};P.grid(s.parent,o,25,r,t);const a=25;s.circle({radius:3,...o},{fillStyle:e,strokeStyle:"none"}),s.text("Origin",R.sum(o,2,a),{fillStyle:e,strokeStyle:"none"});const n={id:"triangle",fillStyle:e},h=y.fromNumbers(o.x,o.y,o.x+i-10,o.y);s.line(h,{fillStyle:"none",markerEnd:n,strokeWidth:3,strokeStyle:e}),s.text("A",{x:o.x+i-35,y:o.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const s=this.palette.get("accent-bold","yellow"),r=this.palette.get("fg-dim","yellow"),t=p(this.shadowRoot.querySelector("svg")),i=t.width,o=t.height,a={x:i/2,y:o/2},n={x:e.offsetX,y:e.offsetY},h=y.fromPoints(a,n);t.line(h,{strokeDash:"5",strokeStyle:s,strokeWidth:3},"#pointerRay");const f=y.length(h);t.circle({radius:5,...n},{fillStyle:s,strokeStyle:"none"},"#targetCircle");const m=M.fromCartesian(n,a),u=O(m.angleRadian),v=m.angleRadian;let x={endRadian:v,startRadian:0,radius:Math.min(100,f),...a},S={sweep:!0,largeArc:!(v<0)};Math.round(u)!==0&&t.path($.toSvg(x,S),{strokeWidth:3,strokeStyle:r},"#arc");const w={strokeStyle:"transparent",fillStyle:s,anchor:"middle"};t.text(`(${Math.round(f)}, ${Math.floor(u)}\xB0)`,{x:n.x,y:n.y+40},w,"#coordLabel")}render(){return k`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}d([c()],l.prototype,"radian",2);d([c()],l.prototype,"degree",2);d([c()],l.prototype,"width",2);d([c()],l.prototype,"height",2);customElements.define(B,l);export{l as PolarCoordsElement,B as tagName};
