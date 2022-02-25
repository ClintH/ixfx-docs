var k=Object.defineProperty;var C=(n,e,t)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var g=(n,e,t)=>(C(n,typeof e!="symbol"?e+"":e,t),t);import{s as M,r as P,$ as _,e as d}from"./vendor.a59a155e.js";import{P as j,L as y,e as R,r as D,A as O}from"./chunk-GLOC4ABQ.54c1521f.js";import"./chunk-57USKCMY.339b34ad.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-C2GSEUUB.5e1d8426.js";import{t as A}from"./chunk-6RSYJ7PX.b9b486b6.js";import{P as $,m as f,b as E}from"./chunk-JV2C55HY.cd1c20e3.js";import"./chunk-VAHXRYL4.a924033a.js";import{e as Y}from"./styles.a023d167.js";import"./chunk-YDTVC7MM.cb3895f8.js";var B=Object.defineProperty,L=Object.getOwnPropertyDescriptor,p=(n,e,t,o)=>{for(var r=o>1?void 0:o?L(e,t):e,i=n.length-1,s;i>=0;i--)(s=n[i])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&B(e,t,r),r};const T="polar-coords-element";class l extends M{constructor(){super();g(this,"palette");this.palette=$.create(),this.palette.setElementBase(this),this.width=500,this.height=300,A().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=f(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),t=f(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const o=t.width,r=t.height,i=Math.min(o/2,r/2),s={x:o/2,y:r/2};E.grid(t.parent,s,25,o,r);const c=25;t.circle({radius:3,...s},{fillStyle:e,strokeStyle:"none"}),t.text("Origin",j.sum(s,2,c),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},h=y.fromNumbers(s.x,s.y,s.x+i-10,s.y);t.line(h,{fillStyle:"none",markerEnd:a,strokeStyle:e}),t.text("A",{x:s.x+i-35,y:s.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const t=this.palette.get("accent-bold","yellow"),o=this.palette.get("fg-dim","yellow"),r=f(this.shadowRoot.querySelector("svg")),i=r.width,s=r.height,c={x:i/2,y:s/2},a={x:e.offsetX,y:e.offsetY},h=y.fromPoints(c,a);r.line(h,{strokeDash:"5",strokeStyle:t},"#pointerRay");const m=y.length(h);r.circle({radius:5,...a},{fillStyle:t,strokeStyle:"none"},"#targetCircle");const u=R.fromCartesian(a,c),v=D(u.angleRadian),S=Math.PI*2-u.angleRadian;let x={endRadian:S,startRadian:0,radius:Math.min(100,m),...c},w={sweep:!0,largeArc:!(S>Math.PI)};Math.round(v)!==0&&r.path(O.toSvg(x,w),{strokeStyle:o},"#arc");const b={strokeStyle:"transparent",fillStyle:t,anchor:"middle"};r.text(`(${Math.round(m)}, ${Math.floor(v)}\xB0)`,{x:a.x,y:a.y+40},b,"#coordLabel")}render(){return _`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}g(l,"styles",[Y,P`
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
  `]);p([d()],l.prototype,"radian",2);p([d()],l.prototype,"degree",2);p([d()],l.prototype,"width",2);p([d()],l.prototype,"height",2);customElements.define(T,l);export{l as PolarCoordsElement,T as tagName};
