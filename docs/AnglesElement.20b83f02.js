import{b,r as w,$ as P,a as y}from"./client-shim.cda72367.js";import{b as M,t as _,x,L as g,y as S,u as R}from"./chunks/chunk-CWNWYEFL.2e02d266.js";import"./chunks/chunk-IP2OCIJK.bdd1e666.js";import{e as $}from"./chunks/styles.b4645976.js";var D=Object.defineProperty,I=Object.getOwnPropertyDescriptor,m=(v,s,r,o)=>{for(var i=o>1?void 0:o?I(s,r):s,a=v.length-1,l;a>=0;a--)(l=v[a])&&(i=(o?l(s,r,i):l(i))||i);return o&&i&&D(s,r,i),i};const k="angles-element";class p extends b{static styles=[$,w`
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
  `];palette;constructor(){super();this.palette=M.create(),this.palette.setElementBase(this),this.width=400,this.height=400,_().subscribe(s=>{this.updated()})}setDegrees(s){this.degree=s,this.radian=void 0}setRadians(s){this.degree=void 0,this.radian=s}getBounds(){const s=x.makeHelper(this.shadowRoot.querySelector("svg"));return{width:s.width,height:s.height}}lastCircle;renderSvg(){const s=x.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});s.clear();const r=s.width,o=s.height;let i=s.height*.3,a={x:r/2,y:o/2};const l={strokeStyle:this.palette.get("axis-color","orange"),strokeWidth:3},n={strokeStyle:"transparent",fillStyle:this.palette.get("fgDim","orange"),anchor:"middle",align:"hanging"};let c={radius:i,...a};this.lastCircle=c,s.circle(c,l);const f={...c,radius:i+20},h=(e,t,d=n)=>{t===void 0&&(t=e.toString());const u=S.point(f,e);s.text(t,{x:u.x,y:u.y},d)};h(0,"0",{...n,anchor:"start",align:"middle"}),h(Math.PI,"Math.PI",{...n,align:"middle",anchor:"end"}),h(Math.PI/2,"Math.PI/2",{...n,align:"text-bottom"}),h(3*Math.PI/2,"3*Math.PI/2",{...n,align:"hanging"})}async updated(){this.renderSvg()}_pointerMove(s){const r=x.makeHelper(this.shadowRoot.querySelector("svg")),o={x:s.offsetX,y:s.offsetY},i=this.lastCircle;if(i===void 0)return;const a=g.fromPoints(i,o),l=g.extendFromA(a,200),n=S.intersectionLine(i,l);if(n.length!==1)return;const c=n[0],f=g.extendFromA(g.fromPoints(i,c),10);r.line(f,{strokeWidth:3,strokeStyle:this.palette.get("accent-bold","yellow")},"#pointerRay");const h=g.angleRadian(f)*-1;let e=Math.round(h/Math.PI*100)/100;e<0&&(e=Math.abs(e+1)+1);let t="";e==1?t="\u03C0":e==.17?t="\u03C0/6":e==.25?t="\u03C0/4":e==.33?t="\u03C0/3":e==.5?t="\u03C0/2":e==.58?t="7\u03C0/12":e==.6?t="\u03C0/4":e==.75?t="3\u03C0/4":e==.92?t="11\u03C0/12":e==1.17?t="7\u03C0/6":e==1.25?t="5\u03C0/4":e==1.33?t="4\u03C0/3":e==1.5?t="3\u03C0/2":e==1.58?t="19\u03C0/12":e==1.75?t="7\u03C0/4":e==1.92?t="23\u03C0/12":e==0?t="0 or 2\u03C0":t=`${e.toFixed(2)}\u03C0`;let d=R(h);d<0&&(d=Math.abs(d+180)+180);const u=Math.round(d),C={strokeStyle:"transparent",fillStyle:this.palette.get("fgDim","black"),anchor:"middle"};r.text(`Radians: ${t}`,{x:i.x,y:i.y},C,"#radiansLabel"),r.text(`Degrees: ${u}`,{x:i.x,y:i.y+20},C,"#degreesLabel")}render(){return P`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}m([y()],p.prototype,"radian",2);m([y()],p.prototype,"degree",2);m([y()],p.prototype,"width",2);m([y()],p.prototype,"height",2);customElements.define(k,p);export{p as AnglesElement,k as tagName};
