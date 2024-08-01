import{a as D,c as w,x as B,n as v}from"./client-shim.c3248903.js";import{a$ as m,av as x,bv as A,bw as f}from"./chunks/chunk-H62DA3UX.2f4e44f0.js";import"./chunks/chunk-QRUAJLXP.d4cb917b.js";import{b,o as _,p as k,S as E,q as S}from"./chunks/chunk-IYXXLC7L.739e1efe.js";import{e as $}from"./chunks/styles.284a3b73.js";var C=Object.defineProperty,W=Object.getOwnPropertyDescriptor,P=(h,e,o,i)=>{for(var t=i>1?void 0:i?W(e,o):e,s=h.length-1,r;s>=0;s--)(r=h[s])&&(t=(i?r(e,o,t):r(t))||t);return i&&t&&C(e,o,t),t};const L="vector-element";class u extends D{static styles=[$,w`
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
      .drag-sel {
        outline: 2px solid pink;
      }
  `];origin;pointB;pointA;palette;dragDisposePtA;dragDisposePtB;constructor(){super();this.palette=b.create(),this.palette.setElementBase(this),this.width=300,this.height=300,this.origin={x:150,y:150},this.pointA={x:150,y:100},this.pointB={x:200,y:200},_.themeChange().on(e=>{this.updated()})}getBounds(){const e=k(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}titledPoint(e,o,i,t,s=!1){const r=this.palette.get("fgDim","black"),p=s?10:5,n=e.circle({radius:p,...i},{fillStyle:s?"transparent":r,strokeStyle:"none"},`#${o}`);return e.text(t,m.sum(i,5,20),{fillStyle:r,userSelect:!1,strokeStyle:"none"},`#${o}-label`),n}updatePoints(e,o=this.pointA,i=this.pointB){this.pointA=o,this.pointB=i;const t={a:o,b:i},s=x.fromLinePolar(t),r=x.fromLineCartesian(t),p=new CustomEvent("vector-change",{detail:{a:this.pointA,b:this.pointB,polar:s,cartesian:r,angleDeg:A(s.angleRadian)}});this.dispatchEvent(p);const n=this.palette.get("fgDim","black"),c={id:"triangle",fillStyle:n,strokeWidth:0},d=e.line(t,{markerEnd:c,strokeStyle:n,strokeWidth:4},"#line-a-b"),g=this.titledPoint(e,"point-b",i,`B ${m.toString(i,0)}`,!0),y=this.titledPoint(e,"point-a",o,`A ${m.toString(o,0)}`),l={a:{x:i.x,y:o.y},b:i};e.line(l,{strokeDash:"4",strokeWidth:2,strokeStyle:n},"#line-to-y");const a={a:{x:i.x,y:o.y},b:o};return e.line(a,{strokeDash:"4",strokeWidth:2,strokeStyle:n},"#line-to-x"),{pointB:g,pointA:y,edge:d}}renderSvg(){this.dragDisposePtA!==void 0&&this.dragDisposePtA(),this.dragDisposePtB!==void 0&&this.dragDisposePtB();const e=this,o=this.origin,i=this.palette.get("fgDim","black"),t=k(this.shadowRoot.querySelector("svg"));t.clear();const s=15,r=t.width,p=t.height;E.grid(t.parent,o,25,r,p,{strokeWidth:2,opacity:.3});const n={id:"triangle",fillStyle:i,strokeWidth:2},c=f.fromNumbers(s,o.y,r-s,o.y);t.line(c,{fillStyle:"none",markerEnd:n,markerStart:n,strokeWidth:3,strokeStyle:i,opacity:.3}),t.text("X",{x:r-s,y:o.y+20},{strokeStyle:"none",fillStyle:i});const d=f.fromNumbers(o.x,s,o.x,p-s);t.line(d,{fillStyle:"none",markerEnd:n,markerStart:n,strokeWidth:3,strokeStyle:i,opacity:.3}),t.text("Y",{x:o.x+15,y:s+5},{strokeStyle:"none",fillStyle:i});const{pointA:g,pointB:y}=this.updatePoints(t);this.dragDisposePtA=S.draggable(y,{abort(l,a){},progress(l){const a=l.token;return e.updatePoints(t,void 0,{x:a.x+l.delta.x,y:a.y+l.delta.y}),!0},start(){return{allow:!0,token:e.pointB}},success(){}}),this.dragDisposePtB=S.draggable(g,{progress(l){const a=l.token;return e.updatePoints(t,{x:a.x+l.delta.x,y:a.y+l.delta.y}),!0},start(){return{allow:!0,token:e.pointA}}})}async updated(){this.renderSvg()}render(){return B`
      <div id="container">
      <svg style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}P([v()],u.prototype,"width",2);P([v()],u.prototype,"height",2);customElements.define(L,u);export{u as VectorElement,L as tagName};
