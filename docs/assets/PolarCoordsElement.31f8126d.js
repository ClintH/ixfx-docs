var k=Object.defineProperty;var _=(n,e,t)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var g=(n,e,t)=>(_(n,typeof e!="symbol"?e+"":e,t),t);import{s as M,r as P,$ as C,e as d}from"./vendor.aa1ac2c8.js";import{P as D,L as y,y as R,x as j,n as O}from"./chunk-UWLZSNHO.b417c615.js";import"./chunk-6JTGCZJL.667a6ecc.js";import"./chunk-BWZCVD5D.693f13ba.js";import{t as $}from"./chunk-25RM45LF.24c9c7e0.js";import{P as L,m as f,b as A}from"./chunk-MTK5JJI3.e8b09b21.js";import"./chunk-FRVUOYS5.f63d7587.js";import{e as B}from"./styles.07fc92cf.js";var T=Object.defineProperty,E=Object.getOwnPropertyDescriptor,p=(n,e,t,o)=>{for(var s=o>1?void 0:o?E(e,t):e,i=n.length-1,r;i>=0;i--)(r=n[i])&&(s=(o?r(e,t,s):r(s))||s);return o&&s&&T(e,t,s),s};const J="polar-coords-element";class l extends M{constructor(){super();g(this,"palette");this.palette=L.create(),this.palette.setElementBase(this),this.width=500,this.height=300,$().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=f(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),t=f(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const o=t.width,s=t.height,i=Math.min(o/2,s/2),r={x:o/2,y:s/2};A.grid(t.parent,r,25,o,s);const c=25;t.circle({radius:3,...r},{fillStyle:e,strokeStyle:"none"}),t.text("Origin",D.sum(r,2,c),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},h=y.fromNumbers(r.x,r.y,r.x+i-10,r.y);t.line(h,{fillStyle:"none",markerEnd:a,strokeStyle:e}),t.text("A",{x:r.x+i-35,y:r.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const t=this.palette.get("accent-bold","yellow"),o=this.palette.get("fg-dim","yellow"),s=f(this.shadowRoot.querySelector("svg")),i=s.width,r=s.height,c={x:i/2,y:r/2},a={x:e.offsetX,y:e.offsetY},h=y.fromPoints(c,a);s.line(h,{strokeDash:"5",strokeStyle:t},"#pointerRay");const m=y.length(h);s.circle({radius:5,...a},{fillStyle:t,strokeStyle:"none"},"#targetCircle");const u=R.fromCartesian(a,c),v=j(u.angleRadian),S=Math.PI*2-u.angleRadian;let x={endRadian:S,startRadian:0,radius:Math.min(100,m),...c},w={sweep:!0,largeArc:!(S>Math.PI)};Math.round(v)!==0&&s.path(O.toSvg(x,w),{strokeStyle:o},"#arc");const b={strokeStyle:"transparent",fillStyle:t,anchor:"middle"};s.text(`(${Math.round(m)}, ${Math.floor(v)}\xB0)`,{x:a.x,y:a.y+40},b,"#coordLabel")}render(){return C`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}g(l,"styles",[B,P`
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
  `]);p([d()],l.prototype,"radian",2);p([d()],l.prototype,"degree",2);p([d()],l.prototype,"width",2);p([d()],l.prototype,"height",2);customElements.define(J,l);export{l as PolarCoordsElement,J as tagName};
