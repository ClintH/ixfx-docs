import{a as x,c as f,x as m,n as y}from"./client-shim.c3248903.js";import{a$ as S,bw as l}from"./chunks/chunk-H62DA3UX.2f4e44f0.js";import"./chunks/chunk-QRUAJLXP.d4cb917b.js";import{b as u,o as v,p as h,S as w}from"./chunks/chunk-IYXXLC7L.739e1efe.js";import{e as k}from"./chunks/styles.284a3b73.js";var _=Object.defineProperty,b=Object.getOwnPropertyDescriptor,g=(a,e,i,t)=>{for(var s=t>1?void 0:t?b(e,i):e,o=a.length-1,r;o>=0;o--)(r=a[o])&&(s=(t?r(e,i,s):r(s))||s);return t&&s&&_(e,i,s),s};const $="cartesian-element";class c extends x{static styles=[k,f`
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
  `];origin;palette;constructor(){super();this.palette=u.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},v.themeChange().on(e=>{this.updated()})}getBounds(){const e=h(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,i=this.palette.get("fgDim","black"),t=h(this.shadowRoot.querySelector("svg"));t.clear();const s=t.width,o=t.height-40;w.grid(t.parent,e,25,s,o,{strokeWidth:2}),t.circle({radius:5,...e},{fillStyle:i,strokeStyle:"none"}),t.text("Origin",S.sum(e,5,20),{fillStyle:i,strokeStyle:"none"});const r={id:"triangle",fillStyle:i,strokeWidth:2},n=20,d=l.fromNumbers(e.x,e.y,e.x+s-n,e.y);t.line(d,{fillStyle:"none",markerEnd:r,strokeWidth:3,strokeStyle:i}),t.text("X",{x:e.x+s-45,y:e.y+n},{strokeStyle:"none",fillStyle:i});const p=l.fromNumbers(e.x,e.y,e.x,o);t.line(p,{fillStyle:"none",markerEnd:r,strokeWidth:3,strokeStyle:i}),t.text("Y",{x:e.x+10,y:e.y+o-n-10},{strokeStyle:"none",fillStyle:i})}async updated(){this.renderSvg()}_pointerMove(e){const i=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,s=h(this.shadowRoot.querySelector("svg"));s.width,s.height;const o={x:e.offsetX,y:e.offsetY};o.x<t.x&&(o.x=t.x),o.y<t.y&&(o.y=t.y);const r=l.fromPoints(t,o);s.line(r,{strokeDash:"5",strokeStyle:i},"#pointerRay"),l.length(r),s.circle({radius:5,...o},{fillStyle:i,strokeStyle:"none"},"#targetCircle");const n={strokeStyle:"transparent",fillStyle:i,anchor:"middle"};s.text(`(${Math.round(o.x-t.x)}, ${Math.round(o.y-t.y)})`,{x:o.x,y:o.y+40},n,"#coordLabel")}render(){return m`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}g([y()],c.prototype,"width",2);g([y()],c.prototype,"height",2);customElements.define($,c);export{c as CartesianElement,$ as tagName};
