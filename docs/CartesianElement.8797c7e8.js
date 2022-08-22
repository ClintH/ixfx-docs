import{b as f,r as x,$ as m,a as y}from"./client-shim.cda72367.js";import{b as S,t as u,p as h,S as v,q as w,L as n}from"./chunks/chunk-OOLXEC25.dda1938b.js";import"./chunks/chunk-ZTX6UONG.8be22e52.js";import{e as b}from"./chunks/styles.3cbef228.js";var k=Object.defineProperty,_=Object.getOwnPropertyDescriptor,g=(a,e,r,t)=>{for(var s=t>1?void 0:t?_(e,r):e,o=a.length-1,i;o>=0;o--)(i=a[o])&&(s=(t?i(e,r,s):i(s))||s);return t&&s&&k(e,r,s),s};const $="cartesian-element";class c extends f{static styles=[b,x`
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
  `];origin;palette;constructor(){super();this.palette=S.create(),this.palette.setElementBase(this),this.width=500,this.height=300,this.origin={x:10,y:10},u().subscribe(e=>{this.updated()})}getBounds(){const e=h(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=this.origin,r=this.palette.get("fgDim","black"),t=h(this.shadowRoot.querySelector("svg"));t.clear();const s=t.width,o=t.height-40;v.grid(t.parent,e,25,s,o,{strokeWidth:2}),t.circle({radius:5,...e},{fillStyle:r,strokeStyle:"none"}),t.text("Origin",w.sum(e,5,20),{fillStyle:r,strokeStyle:"none"});const i={id:"triangle",fillStyle:r,strokeWidth:2},l=20,d=n.fromNumbers(e.x,e.y,e.x+s-l,e.y);t.line(d,{fillStyle:"none",markerEnd:i,strokeWidth:3,strokeStyle:r}),t.text("X",{x:e.x+s-45,y:e.y+l},{strokeStyle:"none",fillStyle:r});const p=n.fromNumbers(e.x,e.y,e.x,o);t.line(p,{fillStyle:"none",markerEnd:i,strokeWidth:3,strokeStyle:r}),t.text("Y",{x:e.x+10,y:e.y+o-l-10},{strokeStyle:"none",fillStyle:r})}async updated(){this.renderSvg()}_pointerMove(e){const r=this.palette.get("accent-bold","yellow");this.palette.get("fg-dim","yellow");const t=this.origin,s=h(this.shadowRoot.querySelector("svg"));s.width,s.height;const o={x:e.offsetX,y:e.offsetY};o.x<t.x&&(o.x=t.x),o.y<t.y&&(o.y=t.y);const i=n.fromPoints(t,o);s.line(i,{strokeDash:"5",strokeStyle:r},"#pointerRay"),n.length(i),s.circle({radius:5,...o},{fillStyle:r,strokeStyle:"none"},"#targetCircle");const l={strokeStyle:"transparent",fillStyle:r,anchor:"middle"};s.text(`(${Math.round(o.x-t.x)}, ${Math.round(o.y-t.y)})`,{x:o.x,y:o.y+40},l,"#coordLabel")}render(){return m`
      <div id="container">
      <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}g([y()],c.prototype,"width",2);g([y()],c.prototype,"height",2);customElements.define($,c);export{c as CartesianElement,$ as tagName};
