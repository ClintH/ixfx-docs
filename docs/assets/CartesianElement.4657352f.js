var f=Object.defineProperty;var x=(s,t,o)=>t in s?f(s,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[t]=o;var a=(s,t,o)=>(x(s,typeof t!="symbol"?t+"":t,o),o);import{a as S,r as u,$ as v,b as g}from"./vendor.d6870787.js";import{P as w,Q as h}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-AWXCQ245.1dcbd11a.js";import"./chunk-VFK4G76S.4e6d0279.js";import{t as b}from"./chunk-4DU25RMK.d28002ea.js";import{P as k,m as y,S as _}from"./chunk-LZ7XWTRR.a62618b8.js";import"./chunk-3CYWIYMP.09a63feb.js";import{e as P}from"./styles.8e3dc5e5.js";import"./chunk-FQLUQVDZ.7e80d7b0.js";var $=Object.defineProperty,O=Object.getOwnPropertyDescriptor,p=(s,t,o,e)=>{for(var i=e>1?void 0:e?O(t,o):t,r=s.length-1,l;r>=0;r--)(l=s[r])&&(i=(e?l(t,o,i):l(i))||i);return e&&i&&$(t,o,i),i};const C="cartesian-element";class c extends S{constructor(){super();a(this,"origin");a(this,"palette");this.palette=k.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},b().subscribe(t=>{this.updated()})}getBounds(){const t=y(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=this.origin,o=this.palette.get("fgDim","black"),e=y(this.shadowRoot.querySelector("svg"));e.clear();const i=e.width,r=e.height-40;_.grid(e.parent,t,25,i,r,{strokeWidth:2}),e.circle({radius:5,...t},{fillStyle:o,strokeStyle:"none"}),e.text("Origin",w.sum(t,5,20),{fillStyle:o,strokeStyle:"none"});const l={id:"triangle",fillStyle:o,strokeWidth:2},n=20,d=h.fromNumbers(t.x,t.y,t.x+i-n,t.y);e.line(d,{fillStyle:"none",markerEnd:l,strokeWidth:3,strokeStyle:o}),e.text("X",{x:t.x+i-45,y:t.y+n},{strokeStyle:"none",fillStyle:o});const m=h.fromNumbers(t.x,t.y,t.x,r);e.line(m,{fillStyle:"none",markerEnd:l,strokeWidth:3,strokeStyle:o}),e.text("Y",{x:t.x+10,y:t.y+r-n-10},{strokeStyle:"none",fillStyle:o})}async updated(){this.renderSvg()}_pointerMove(t){const o=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const e=this.origin,i=y(this.shadowRoot.querySelector("svg"));i.width,i.height;const r={x:t.offsetX,y:t.offsetY};r.x<e.x&&(r.x=e.x),r.y<e.y&&(r.y=e.y);const l=h.fromPoints(e,r);i.line(l,{strokeDash:"5",strokeStyle:o},"#pointerRay"),h.length(l),i.circle({radius:5,...r},{fillStyle:o,strokeStyle:"none"},"#targetCircle");const n={strokeStyle:"transparent",fillStyle:o,anchor:"middle"};i.text(`(${Math.round(r.x-e.x)}, ${Math.round(r.y-e.y)})`,{x:r.x,y:r.y+40},n,"#coordLabel")}render(){return v`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}a(c,"styles",[P,u`
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
  `]);p([g()],c.prototype,"width",2);p([g()],c.prototype,"height",2);customElements.define(C,c);export{c as CartesianElement,C as tagName};
