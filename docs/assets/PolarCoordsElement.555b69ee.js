var k=Object.defineProperty;var P=(n,e,t)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var g=(n,e,t)=>(P(n,typeof e!="symbol"?e+"":e,t),t);import{s as C,r as _,$ as M,e as d}from"./vendor.a3225d27.js";import{P as j,L as f,e as D,r as R,A as O}from"./chunk-7CELPBFO.f6fe4a50.js";import"./chunk-V2CC3OS2.f8999184.js";import"./chunk-E6FEPMVF.c62dcddf.js";import"./chunk-QC5UDUYU.8c389651.js";import{t as $}from"./chunk-6RSYJ7PX.b9b486b6.js";import{P as A,m as y,b as E}from"./chunk-5LTT7AGF.2750761f.js";import"./chunk-672VRZPI.818522b7.js";import{e as L}from"./styles.0da1a4a9.js";import"./chunk-YDTVC7MM.cb3895f8.js";var T=Object.defineProperty,B=Object.getOwnPropertyDescriptor,p=(n,e,t,o)=>{for(var r=o>1?void 0:o?B(e,t):e,i=n.length-1,s;i>=0;i--)(s=n[i])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&T(e,t,r),r};const Y="polar-coords-element";class l extends C{constructor(){super();g(this,"palette");this.palette=A.create(),this.palette.setElementBase(this),this.width=500,this.height=300,$().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=y(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.palette.get("fgDim","black"),t=y(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeWidth:3});t.clear();const o=t.width,r=t.height,i=Math.min(o/2,r/2),s={x:o/2,y:r/2};E.grid(t.parent,s,25,o,r);const c=25;t.circle({radius:3,...s},{fillStyle:e,strokeStyle:"none"}),t.text("Origin",j.sum(s,2,c),{fillStyle:e,strokeStyle:"none"});const a={id:"triangle",fillStyle:e},h=f.fromNumbers(s.x,s.y,s.x+i-10,s.y);t.line(h,{fillStyle:"none",markerEnd:a,strokeStyle:e}),t.text("A",{x:s.x+i-35,y:s.y+20},{strokeStyle:"none",fillStyle:e})}async updated(){this.renderSvg()}_pointerMove(e){e.preventDefault();const t=this.palette.get("accent-bold","yellow"),o=this.palette.get("fg-dim","yellow"),r=y(this.shadowRoot.querySelector("svg")),i=r.width,s=r.height,c={x:i/2,y:s/2},a={x:e.offsetX,y:e.offsetY},h=f.fromPoints(c,a);r.line(h,{strokeDash:"5",strokeStyle:t},"#pointerRay");const m=f.length(h);r.circle({radius:5,...a},{fillStyle:t,strokeStyle:"none"},"#targetCircle");const u=D.fromCartesian(a,c),v=R(u.angleRadian),S=Math.PI*2-u.angleRadian;let x={endRadian:S,startRadian:0,radius:Math.min(100,m),...c},w={sweep:!0,largeArc:!(S>Math.PI)};Math.round(v)!==0&&r.path(O.toSvg(x,w),{strokeStyle:o},"#arc");const b={strokeStyle:"transparent",fillStyle:t,anchor:"middle"};r.text(`(${Math.round(m)}, ${Math.floor(v)}\xB0)`,{x:a.x,y:a.y+40},b,"#coordLabel")}render(){return M`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}g(l,"styles",[L,_`
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
  `]);p([d()],l.prototype,"radian",2);p([d()],l.prototype,"degree",2);p([d()],l.prototype,"width",2);p([d()],l.prototype,"height",2);customElements.define(Y,l);export{l as PolarCoordsElement,Y as tagName};
