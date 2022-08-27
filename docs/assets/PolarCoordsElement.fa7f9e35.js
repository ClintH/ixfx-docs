var _=Object.defineProperty;var k=(i,e,t)=>e in i?_(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var g=(i,e,t)=>(k(i,typeof e!="symbol"?e+"":e,t),t);import{a as C,r as D,$ as P,b as d}from"./vendor.c33530a8.js";import{P as R,t as M,m as y,S as O,a as $,L as f,b as A,r as B,A as E}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";import{e as L}from"./styles.801fcc34.js";var W=Object.defineProperty,q=Object.getOwnPropertyDescriptor,p=(i,e,t,o)=>{for(var r=o>1?void 0:o?q(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&W(e,t,r),r};const T="polar-coords-element";class l extends C{constructor(){super();g(this,"palette");this.palette=R.create(),this.palette.setElementBase(this),this.width=500,this.height=300,M().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});t.clear();const o=t.width,r=t.height,n=Math.min(o/2,r/2),s={x:o/2,y:r/2};O.grid(t.parent,s,25,o,r);const h=25;t.circle({radius:3,...s},{fillStyle:e,strokeStyle:"none"}),t.text("Origin",$.sum(s,2,h),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},c=f.fromNumbers(s.x,s.y,s.x+n-10,s.y);t.line(c,{fillStyle:"none",markerEnd:a,strokeWidth:3,strokeStyle:e}),t.text("A",{x:s.x+n-35,y:s.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const t=this.palette.get("accent-bold","yellow"),o=this.palette.get("fg-dim","yellow"),r=y(this.shadowRoot.querySelector("svg")),n=r.width,s=r.height,h={x:n/2,y:s/2},a={x:e.offsetX,y:e.offsetY},c=f.fromPoints(h,a);r.line(c,{strokeDash:"5",strokeStyle:t,strokeWidth:3},"#pointerRay");const m=f.length(c);r.circle({radius:5,...a},{fillStyle:t,strokeStyle:"none"},"#targetCircle");const u=A.fromCartesian(a,h),v=B(u.angleRadian),S=u.angleRadian;let x={endRadian:S,startRadian:0,radius:Math.min(100,m),...h},w={sweep:!0,largeArc:!(S<0)};Math.round(v)!==0&&r.path(E.toSvg(x,w),{strokeWidth:3,strokeStyle:o},"#arc");const b={strokeStyle:"transparent",fillStyle:t,anchor:"middle"};r.text(`(${Math.round(m)}, ${Math.floor(v)}\xB0)`,{x:a.x,y:a.y+40},b,"#coordLabel")}render(){return P`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}g(l,"styles",[L,D`
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
