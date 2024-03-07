import{c as _,g as b,f as k,a as c}from"./client-shim.a8276547.js";import{l as D,aj as g,b5 as C,b4 as R,b6 as M}from"./chunks/chunk-V24WECPW.c3e6523e.js";import"./chunks/chunk-7KTY42OF.629611b4.js";import"./chunks/chunk-2KGNDX6J.8b6f2c15.js";import{D as P,m as y,e as O}from"./chunks/chunk-IHDSSOYZ.47df1e9b.js";import{a as $}from"./chunks/chunk-XUHGVPZX.02a3c1b0.js";import{e as E}from"./chunks/styles.de20beca.js";var A=Object.defineProperty,B=Object.getOwnPropertyDescriptor,d=(p,e,o,s)=>{for(var t=s>1?void 0:s?B(e,o):e,i=p.length-1,r;i>=0;i--)(r=p[i])&&(t=(s?r(e,o,t):r(t))||t);return s&&t&&A(e,o,t),t};const W="polar-coords-element";class l extends _{static styles=[E,b`
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
  `];palette;constructor(){super();this.palette=$.create(),this.palette.setElementBase(this),this.width=500,this.height=300,P.themeChange().on(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),o=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});o.clear();const s=o.width,t=o.height,i=Math.min(s/2,t/2),r={x:s/2,y:t/2};O.grid(o.parent,r,25,s,t);const a=25;o.circle({radius:3,...r},{fillStyle:e,strokeStyle:"none"}),o.text("Origin",D.sum(r,2,a),{fillStyle:e,strokeStyle:"none"});const n={id:"triangle",fillStyle:e},h=g.fromNumbers(r.x,r.y,r.x+i-10,r.y);o.line(h,{fillStyle:"none",markerEnd:n,strokeWidth:3,strokeStyle:e}),o.text("A",{x:r.x+i-35,y:r.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const o=this.palette.get("accent-bold","yellow"),s=this.palette.get("fg-dim","yellow"),t=y(this.shadowRoot.querySelector("svg")),i=t.width,r=t.height,a={x:i/2,y:r/2},n={x:e.offsetX,y:e.offsetY},h=g.fromPoints(a,n);t.line(h,{strokeDash:"5",strokeStyle:o,strokeWidth:3},"#pointerRay");const m=g.length(h);t.circle({radius:5,...n},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const f=C.fromCartesian(n,a),u=R(f.angleRadian),v=f.angleRadian;let x={endRadian:v,startRadian:0,radius:Math.min(100,m),...a},S={sweep:!0,largeArc:!(v<0)};Math.round(u)!==0&&t.path(M.toSvg(x,S),{strokeWidth:3,strokeStyle:s},"#arc");const w={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};t.text(`(${Math.round(m)}, ${Math.floor(u)}\xB0)`,{x:n.x,y:n.y+40},w,"#coordLabel")}render(){return k`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}d([c()],l.prototype,"radian",2);d([c()],l.prototype,"degree",2);d([c()],l.prototype,"width",2);d([c()],l.prototype,"height",2);customElements.define(W,l);export{l as PolarCoordsElement,W as tagName};
