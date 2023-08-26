import{c as D,g as w,f as B,a as v}from"./client-shim.8cb18301.js";import{b,t as A,p as x,q as u,V as f,s as _,S as E,L as k,v as S}from"./chunks/chunk-NMBBAPDF.8d854b58.js";import{e as C}from"./chunks/styles.b86f48e3.js";var W=Object.defineProperty,$=Object.getOwnPropertyDescriptor,P=(p,e,o,s)=>{for(var t=s>1?void 0:s?$(e,o):e,i=p.length-1,r;i>=0;i--)(r=p[i])&&(t=(s?r(e,o,t):r(t))||t);return s&&t&&W(e,o,t),t};const L="vector-element";class m extends D{static styles=[C,w`
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
  `];origin;pointB;pointA;palette;dragDisposePtA;dragDisposePtB;constructor(){super();this.palette=b.create(),this.palette.setElementBase(this),this.width=300,this.height=300,this.origin={x:150,y:150},this.pointA={x:150,y:100},this.pointB={x:200,y:200},A().subscribe(e=>{this.updated()})}getBounds(){const e=x(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}titledPoint(e,o,s,t,i=!1){const r=this.palette.get("fgDim","black"),h=i?10:5,n=e.circle({radius:h,...s},{fillStyle:i?"transparent":r,strokeStyle:"none"},`#${o}`);return e.text(t,u.sum(s,5,20),{fillStyle:r,userSelect:!1,strokeStyle:"none"},`#${o}-label`),n}updatePoints(e,o=this.pointA,s=this.pointB){this.pointA=o,this.pointB=s;const t={a:o,b:s},i=f.fromLinePolar(t),r=f.fromLineCartesian(t),h=new CustomEvent("vector-change",{detail:{a:this.pointA,b:this.pointB,polar:i,cartesian:r,angleDeg:_(i.angleRadian)}});this.dispatchEvent(h);const n=this.palette.get("fgDim","black"),c={id:"triangle",fillStyle:n,strokeWidth:0},d=e.line(t,{markerEnd:c,strokeStyle:n,strokeWidth:4},"#line-a-b"),g=this.titledPoint(e,"point-b",s,`B ${u.toString(s,0)}`,!0),y=this.titledPoint(e,"point-a",o,`A ${u.toString(o,0)}`),l={a:{x:s.x,y:o.y},b:s};e.line(l,{strokeDash:"4",strokeWidth:2,strokeStyle:n},"#line-to-y");const a={a:{x:s.x,y:o.y},b:o};return e.line(a,{strokeDash:"4",strokeWidth:2,strokeStyle:n},"#line-to-x"),{pointB:g,pointA:y,edge:d}}renderSvg(){this.dragDisposePtA!==void 0&&this.dragDisposePtA(),this.dragDisposePtB!==void 0&&this.dragDisposePtB();const e=this,o=this.origin,s=this.palette.get("fgDim","black"),t=x(this.shadowRoot.querySelector("svg"));t.clear();const i=15,r=t.width,h=t.height;E.grid(t.parent,o,25,r,h,{strokeWidth:2,opacity:.3});const n={id:"triangle",fillStyle:s,strokeWidth:2},c=k.fromNumbers(i,o.y,r-i,o.y);t.line(c,{fillStyle:"none",markerEnd:n,markerStart:n,strokeWidth:3,strokeStyle:s,opacity:.3}),t.text("X",{x:r-i,y:o.y+20},{strokeStyle:"none",fillStyle:s});const d=k.fromNumbers(o.x,i,o.x,h-i);t.line(d,{fillStyle:"none",markerEnd:n,markerStart:n,strokeWidth:3,strokeStyle:s,opacity:.3}),t.text("Y",{x:o.x+15,y:i+5},{strokeStyle:"none",fillStyle:s});const{pointA:g,pointB:y}=this.updatePoints(t);this.dragDisposePtA=S.draggable(y,{abort(l,a){},progress(l){const a=l.token;return e.updatePoints(t,void 0,{x:a.x+l.delta.x,y:a.y+l.delta.y}),!0},start(){return{allow:!0,token:e.pointB}},success(){}}),this.dragDisposePtB=S.draggable(g,{progress(l){const a=l.token;return e.updatePoints(t,{x:a.x+l.delta.x,y:a.y+l.delta.y}),!0},start(){return{allow:!0,token:e.pointA}}})}async updated(){this.renderSvg()}render(){return B`
      <div id="container">
      <svg style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}> </svg>
        </div>
          `}}P([v()],m.prototype,"width",2);P([v()],m.prototype,"height",2);customElements.define(L,m);export{m as VectorElement,L as tagName};
