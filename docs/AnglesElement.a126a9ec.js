import{b,r as w,$ as P,a as u}from"./client-shim.cda72367.js";import{af as g,aj as S,ah as M}from"./chunks/chunk-QOZ2BRCA.14308385.js";import"./chunks/chunk-OE2F6QKM.34a70cb8.js";import"./chunks/chunk-U4IZE4J2.1410a545.js";import"./chunks/chunk-MW3GDUJU.b2443a15.js";import{t as _}from"./chunks/chunk-BSJKVIJG.f7604bb7.js";import{a as R,b as x}from"./chunks/chunk-FJ2C6UZS.54105029.js";import"./chunks/chunk-25KFP6OF.934c8512.js";import"./chunks/chunk-4X2SZKK7.4dbfee46.js";import{e as $}from"./chunks/styles.591694aa.js";import"./chunks/chunk-6SYKIMQH.63e605dc.js";var D=Object.defineProperty,I=Object.getOwnPropertyDescriptor,y=(v,s,r,o)=>{for(var i=o>1?void 0:o?I(s,r):s,n=v.length-1,l;n>=0;n--)(l=v[n])&&(i=(o?l(s,r,i):l(i))||i);return o&&i&&D(s,r,i),i};const k="angles-element";class p extends b{static styles=[$,w`
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
  `];palette;constructor(){super();this.palette=R.create(),this.palette.setElementBase(this),this.width=400,this.height=400,_().subscribe(s=>{this.updated()})}setDegrees(s){this.degree=s,this.radian=void 0}setRadians(s){this.degree=void 0,this.radian=s}getBounds(){const s=x.makeHelper(this.shadowRoot.querySelector("svg"));return{width:s.width,height:s.height}}lastCircle;renderSvg(){const s=x.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent"});s.clear();const r=s.width,o=s.height;let i=s.height*.3,n={x:r/2,y:o/2};const l={strokeStyle:this.palette.get("axis-color","orange"),strokeWidth:3},a={strokeStyle:"transparent",fillStyle:this.palette.get("fgDim","orange"),anchor:"middle",align:"hanging"};let c={radius:i,...n};this.lastCircle=c,s.circle(c,l);const f={...c,radius:i+20},h=(e,t,d=a)=>{t===void 0&&(t=e.toString());const m=S.point(f,e);s.text(t,{x:m.x,y:m.y},d)};h(0,"0",{...a,anchor:"start",align:"middle"}),h(Math.PI,"Math.PI",{...a,align:"middle",anchor:"end"}),h(Math.PI/2,"Math.PI/2",{...a,align:"text-bottom"}),h(3*Math.PI/2,"3*Math.PI/2",{...a,align:"hanging"})}async updated(){this.renderSvg()}_pointerMove(s){const r=x.makeHelper(this.shadowRoot.querySelector("svg")),o={x:s.offsetX,y:s.offsetY},i=this.lastCircle;if(i===void 0)return;const n=g.fromPoints(i,o),l=g.extendFromStart(n,200),a=S.intersectionLine(i,l);if(a.length!==1)return;const c=a[0],f=g.extendFromStart(g.fromPoints(i,c),10);r.line(f,{strokeWidth:3,strokeStyle:this.palette.get("accent-bold","yellow")},"#pointerRay");const h=g.angleRadian(f)*-1;let e=Math.round(h/Math.PI*100)/100;e<0&&(e=Math.abs(e+1)+1);let t="";e==1?t="\u03C0":e==.17?t="\u03C0/6":e==.25?t="\u03C0/4":e==.33?t="\u03C0/3":e==.5?t="\u03C0/2":e==.58?t="7\u03C0/12":e==.6?t="\u03C0/4":e==.75?t="3\u03C0/4":e==.92?t="11\u03C0/12":e==1.17?t="7\u03C0/6":e==1.25?t="5\u03C0/4":e==1.33?t="4\u03C0/3":e==1.5?t="3\u03C0/2":e==1.58?t="19\u03C0/12":e==1.75?t="7\u03C0/4":e==1.92?t="23\u03C0/12":e==0?t="0 or 2\u03C0":t=`${e.toFixed(2)}\u03C0`;let d=M(h);d<0&&(d=Math.abs(d+180)+180);const m=Math.round(d),C={strokeStyle:"transparent",fillStyle:this.palette.get("fgDim","black"),anchor:"middle"};r.text(`Radians: ${t}`,{x:i.x,y:i.y},C,"#radiansLabel"),r.text(`Degrees: ${m}`,{x:i.x,y:i.y+20},C,"#degreesLabel")}render(){return P`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}y([u()],p.prototype,"radian",2);y([u()],p.prototype,"degree",2);y([u()],p.prototype,"width",2);y([u()],p.prototype,"height",2);customElements.define(k,p);export{p as AnglesElement,k as tagName};
