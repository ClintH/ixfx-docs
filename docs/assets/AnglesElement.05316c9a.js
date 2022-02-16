var w=Object.defineProperty;var M=(o,e,r)=>e in o?w(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var y=(o,e,r)=>(M(o,typeof e!="symbol"?e+"":e,r),r);import{s as P,r as _,$ as k,e as v}from"./vendor.a3225d27.js";import{L as p,C as b,x as R}from"./chunk-UWLZSNHO.60128285.js";import"./chunk-6JTGCZJL.ec4f5d4b.js";import"./chunk-BWZCVD5D.b52e1602.js";import{t as j}from"./chunk-25RM45LF.6197efee.js";import{P as D,S as x}from"./chunk-MTK5JJI3.2542cf04.js";import"./chunk-FRVUOYS5.9da9d51c.js";import{e as $}from"./styles.af89b8ed.js";var I=Object.defineProperty,L=Object.getOwnPropertyDescriptor,C=(o,e,r,n)=>{for(var i=n>1?void 0:n?L(e,r):e,l=o.length-1,h;l>=0;l--)(h=o[l])&&(i=(n?h(e,r,i):h(i))||i);return n&&i&&I(e,r,i),i};const O="angles-element";class g extends P{constructor(){super();y(this,"palette");y(this,"lastCircle");this.palette=D.create(),this.palette.setElementBase(this),this.width=400,this.height=400,j().subscribe(e=>{this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=x.makeHelper(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=x.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:"red",strokeWidth:3});e.clear();const r=e.width,n=e.height;let i=e.height*.3,l={x:r/2,y:n/2};const h={strokeStyle:this.palette.get("axis-color","orange")},a={strokeStyle:"transparent",fillStyle:this.palette.get("fgDim","orange"),anchor:"middle",align:"hanging"};let f={radius:i,...l};this.lastCircle=f,e.circle(f,h);const u={...f,radius:i+20},c=(t,s,d=a)=>{s===void 0&&(s=t.toString());const m=b.point(u,t);e.text(s,{x:m.x,y:m.y},d)};c(0,"0",{...a,anchor:"start",align:"middle"}),c(Math.PI,"Math.PI",{...a,align:"middle",anchor:"end"}),c(Math.PI/2,"Math.PI/2",{...a,align:"text-bottom"}),c(3*Math.PI/2,"3*Math.PI/2",{...a,align:"hanging"})}async updated(){this.renderSvg()}_pointerMove(e){const r=x.makeHelper(this.shadowRoot.querySelector("svg")),n={x:e.offsetX,y:e.offsetY},i=this.lastCircle;if(i===void 0)return;const l=p.fromPoints(i,n),h=p.extendFromStart(l,200),a=b.intersectionLine(i,h);if(a.length!==1)return;const f=a[0],u=p.extendFromStart(p.fromPoints(i,f),10);r.line(u,{strokeStyle:this.palette.get("accent-bold","yellow")},"#pointerRay");const c=p.angleRadian(u)*-1;let t=Math.round(c/Math.PI*100)/100;t<0&&(t=Math.abs(t+1)+1);let s="";t==1?s="\u03C0":t==.17?s="\u03C0/6":t==.25?s="\u03C0/4":t==.33?s="\u03C0/3":t==.5?s="\u03C0/2":t==.58?s="7\u03C0/12":t==.6?s="\u03C0/4":t==.75?s="3\u03C0/4":t==.92?s="11\u03C0/12":t==1.17?s="7\u03C0/6":t==1.25?s="5\u03C0/4":t==1.33?s="4\u03C0/3":t==1.5?s="3\u03C0/2":t==1.58?s="19\u03C0/12":t==1.75?s="7\u03C0/4":t==1.92?s="23\u03C0/12":t==0?s="0 or 2\u03C0":s=`${t.toFixed(2)}\u03C0`;let d=R(c);d<0&&(d=Math.abs(d+180)+180);const m=Math.round(d),S={strokeStyle:"transparent",fillStyle:this.palette.get("fgDim","black"),anchor:"middle"};r.text(`Radians: ${s}`,{x:i.x,y:i.y},S,"#radiansLabel"),r.text(`Degrees: ${m}`,{x:i.x,y:i.y+20},S,"#degreesLabel")}render(){return k`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}y(g,"styles",[$,_`
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
  `]);C([v()],g.prototype,"radian",2);C([v()],g.prototype,"degree",2);C([v()],g.prototype,"width",2);C([v()],g.prototype,"height",2);customElements.define(O,g);export{g as AnglesElement,O as tagName};