var b=Object.defineProperty;var P=(i,e,t)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var g=(i,e,t)=>(P(i,typeof e!="symbol"?e+"":e,t),t);import{a as M,r as k,$ as C,b as d}from"./vendor.92dd9f01.js";import{P as D,L as y,v as R,x as O,y as $}from"./chunk-LHJ7JM7H.7de6f0d4.js";import"./chunk-JBDRQ5KW.018a4769.js";import"./chunk-TDKAXZAS.1af599a9.js";import{t as A}from"./chunk-QVRQKKRB.4ee1b7cb.js";import{P as B,m,S as E}from"./chunk-A3OQLAFF.9e3d5139.js";import"./chunk-B7RHPX6D.163a8542.js";import{e as L}from"./styles.9b5dda15.js";import"./chunk-FQLUQVDZ.8e87cdc9.js";var q=Object.defineProperty,T=Object.getOwnPropertyDescriptor,p=(i,e,t,s)=>{for(var r=s>1?void 0:s?T(e,t):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(e,t,r):o(r))||r);return s&&r&&q(e,t,r),r};const j="polar-coords-element";class l extends M{constructor(){super();g(this,"palette");this.palette=B.create(),this.palette.setElementBase(this),this.width=500,this.height=300,A().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=m(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),t=m(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const s=t.width,r=t.height,n=Math.min(s/2,r/2),o={x:s/2,y:r/2};E.grid(t.parent,o,25,s,r);const h=25;t.circle({radius:3,...o},{fillStyle:e,strokeStyle:"none"}),t.text("Origin",D.sum(o,2,h),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},c=y.fromNumbers(o.x,o.y,o.x+n-10,o.y);t.line(c,{fillStyle:"none",markerEnd:a,strokeStyle:e}),t.text("A",{x:o.x+n-35,y:o.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const t=this.palette.get("accent-bold","yellow"),s=this.palette.get("fg-dim","yellow"),r=m(this.shadowRoot.querySelector("svg")),n=r.width,o=r.height,h={x:n/2,y:o/2},a={x:e.offsetX,y:e.offsetY},c=y.fromPoints(h,a);r.line(c,{strokeDash:"5",strokeStyle:t},"#pointerRay");const f=y.length(c);r.circle({radius:5,...a},{fillStyle:t,strokeStyle:"none"},"#targetCircle");const u=R.fromCartesian(a,h),v=O(u.angleRadian),x=Math.PI*2-u.angleRadian;let S={endRadian:x,startRadian:0,radius:Math.min(100,f),...h},w={sweep:!0,largeArc:!(x>Math.PI)};Math.round(v)!==0&&r.path($.toSvg(S,w),{strokeStyle:s},"#arc");const _={strokeStyle:"transparent",fillStyle:t,anchor:"middle"};r.text(`(${Math.round(f)}, ${Math.floor(v)}\xB0)`,{x:a.x,y:a.y+40},_,"#coordLabel")}render(){return C`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}g(l,"styles",[L,k`
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
  `]);p([d()],l.prototype,"radian",2);p([d()],l.prototype,"degree",2);p([d()],l.prototype,"width",2);p([d()],l.prototype,"height",2);customElements.define(j,l);export{l as PolarCoordsElement,j as tagName};
