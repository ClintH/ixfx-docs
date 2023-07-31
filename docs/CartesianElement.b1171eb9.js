import{c as f,g as x,f as m,a as y}from"./client-shim.ef70acef.js";import{b as S,t as u,p as h,S as v,q as w,L as n}from"./chunks/chunk-TLS2GSDW.4c8ccfc3.js";import{e as b}from"./chunks/styles.1b7f352c.js";var k=Object.defineProperty,_=Object.getOwnPropertyDescriptor,g=(a,e,i,t)=>{for(var o=t>1?void 0:t?_(e,i):e,s=a.length-1,r;s>=0;s--)(r=a[s])&&(o=(t?r(e,i,o):r(o))||o);return t&&o&&k(e,i,o),o};const C="cartesian-element";class c extends f{static styles=[b,x`
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
  `];origin;palette;constructor(){super();this.palette=S.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},u().subscribe(e=>{this.updated()})}getBounds(){const e=h(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,i=this.palette.get("fgDim","black"),t=h(this.shadowRoot.querySelector("svg"));t.clear();const o=t.width,s=t.height-40;v.grid(t.parent,e,25,o,s,{strokeWidth:2}),t.circle({radius:5,...e},{fillStyle:i,strokeStyle:"none"}),t.text("Origin",w.sum(e,5,20),{fillStyle:i,strokeStyle:"none"});const r={id:"triangle",fillStyle:i,strokeWidth:2},l=20,d=n.fromNumbers(e.x,e.y,e.x+o-l,e.y);t.line(d,{fillStyle:"none",markerEnd:r,strokeWidth:3,strokeStyle:i}),t.text("X",{x:e.x+o-45,y:e.y+l},{strokeStyle:"none",fillStyle:i});const p=n.fromNumbers(e.x,e.y,e.x,s);t.line(p,{fillStyle:"none",markerEnd:r,strokeWidth:3,strokeStyle:i}),t.text("Y",{x:e.x+10,y:e.y+s-l-10},{strokeStyle:"none",fillStyle:i})}async updated(){this.renderSvg()}_pointerMove(e){const i=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,o=h(this.shadowRoot.querySelector("svg"));o.width,o.height;const s={x:e.offsetX,y:e.offsetY};s.x<t.x&&(s.x=t.x),s.y<t.y&&(s.y=t.y);const r=n.fromPoints(t,s);o.line(r,{strokeDash:"5",strokeStyle:i},"#pointerRay"),n.length(r),o.circle({radius:5,...s},{fillStyle:i,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:i,anchor:"middle"};o.text(`(${Math.round(s.x-t.x)}, ${Math.round(s.y-t.y)})`,{x:s.x,y:s.y+40},l,"#coordLabel")}render(){return m`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}g([y()],c.prototype,"width",2);g([y()],c.prototype,"height",2);customElements.define(C,c);export{c as CartesianElement,C as tagName};
