var b=Object.defineProperty;var k=(i,e,t)=>e in i?b(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var g=(i,e,t)=>(k(i,typeof e!="symbol"?e+"":e,t),t);import{a as P,r as R,$ as C,b as d}from"./vendor.d6870787.js";import{P as D,Q as y,R as M,T as O,U as $}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-AWXCQ245.1dcbd11a.js";import"./chunk-VFK4G76S.4e6d0279.js";import{t as A}from"./chunk-4DU25RMK.d28002ea.js";import{P as B,m,S as E}from"./chunk-LZ7XWTRR.a62618b8.js";import"./chunk-3CYWIYMP.09a63feb.js";import{e as T}from"./styles.8e3dc5e5.js";import"./chunk-FQLUQVDZ.7e80d7b0.js";var W=Object.defineProperty,q=Object.getOwnPropertyDescriptor,p=(i,e,t,s)=>{for(var r=s>1?void 0:s?q(e,t):e,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=(s?o(e,t,r):o(r))||r);return s&&r&&W(e,t,r),r};const L="polar-coords-element";class l extends P{constructor(){super();g(this,"palette");this.palette=B.create(),this.palette.setElementBase(this),this.width=500,this.height=300,A().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=m(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),t=m(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});t.clear();const s=t.width,r=t.height,n=Math.min(s/2,r/2),o={x:s/2,y:r/2};E.grid(t.parent,o,25,s,r);const h=25;t.circle({radius:3,...o},{fillStyle:e,strokeStyle:"none"}),t.text("Origin",D.sum(o,2,h),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},c=y.fromNumbers(o.x,o.y,o.x+n-10,o.y);t.line(c,{fillStyle:"none",markerEnd:a,strokeWidth:3,strokeStyle:e}),t.text("A",{x:o.x+n-35,y:o.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const t=this.palette.get("accent-bold","yellow"),s=this.palette.get("fg-dim","yellow"),r=m(this.shadowRoot.querySelector("svg")),n=r.width,o=r.height,h={x:n/2,y:o/2},a={x:e.offsetX,y:e.offsetY},c=y.fromPoints(h,a);r.line(c,{strokeDash:"5",strokeStyle:t,strokeWidth:3},"#pointerRay");const f=y.length(c);r.circle({radius:5,...a},{fillStyle:t,strokeStyle:"none"},"#targetCircle");const u=M.fromCartesian(a,h),v=O(u.angleRadian),S=u.angleRadian;let x={endRadian:S,startRadian:0,radius:Math.min(100,f),...h},w={sweep:!0,largeArc:!(S<0)};Math.round(v)!==0&&r.path($.toSvg(x,w),{strokeWidth:3,strokeStyle:s},"#arc");const _={strokeStyle:"transparent",fillStyle:t,anchor:"middle"};r.text(`(${Math.round(f)}, ${Math.floor(v)}\xB0)`,{x:a.x,y:a.y+40},_,"#coordLabel")}render(){return C`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}g(l,"styles",[T,R`
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
  `]);p([d()],l.prototype,"radian",2);p([d()],l.prototype,"degree",2);p([d()],l.prototype,"width",2);p([d()],l.prototype,"height",2);customElements.define(L,l);export{l as PolarCoordsElement,L as tagName};
