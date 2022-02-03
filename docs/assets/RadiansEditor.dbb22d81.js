var P=Object.defineProperty;var w=(o,e,r)=>e in o?P(o,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[e]=r;var y=(o,e,r)=>(w(o,typeof e!="symbol"?e+"":e,r),r);import{s as M,r as _,$ as R,e as v}from"./vendor.994fac77.js";import{O as f,P as b,M as $}from"./chunk-RELB4ERA.359f0ce7.js";import{t as O}from"./chunk-L7NPGFXB.27ec158a.js";import{P as j,S as C}from"./chunk-C54446BC.dacc5f5a.js";import"./chunk-O3VPZBOU.e8cd7407.js";var k=Object.defineProperty,B=Object.getOwnPropertyDescriptor,x=(o,e,r,a)=>{for(var i=a>1?void 0:a?B(e,r):e,l=o.length-1,h;l>=0;l--)(h=o[l])&&(i=(a?h(e,r,i):h(i))||i);return a&&i&&k(e,r,i),i};const I="radians-editor";class g extends M{constructor(){super();y(this,"palette");y(this,"lastCircle");this.palette=j.create(),this.palette.setElementBase(this),this.width=100,this.height=100,O().subscribe(e=>{console.log("theme change"),this.updated()})}setDegrees(e){this.degree=e,this.radian=void 0}setRadians(e){this.degree=void 0,this.radian=e}getBounds(){const e=C.svg(this.shadowRoot.querySelector("svg"));return{width:e.width,height:e.height}}renderSvg(){const e=C.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:"pink",strokeWidth:3});e.clear();const r=e.width,a=e.height;let i=e.height*.3,l={x:r/2,y:a/2};const h={strokeStyle:this.palette.get("axis-color","orange")},n={strokeStyle:"transparent",fillStyle:this.palette.get("label-color","orange"),anchor:"middle",align:"hanging"};let p={radius:i,...l};this.lastCircle=p,e.circle(p,h);const u={...p,radius:i+20},d=(t,s,c=n)=>{s===void 0&&(s=t.toString());const m=b.point(u,t);e.text({x:m.x,y:m.y},s,c)};d(0,"0",{...n,anchor:"start",align:"middle"}),d(Math.PI,"Math.PI",{...n,align:"middle",anchor:"end"}),d(Math.PI/2,"Math.PI/2",{...n,align:"text-bottom"}),d(3*Math.PI/2,"3*Math.PI/2",{...n,align:"hanging"})}async updated(){this.renderSvg()}_pointerMove(e){const r=C.svg(this.shadowRoot.querySelector("svg")),a={x:e.offsetX,y:e.offsetY},i=this.lastCircle;if(i===void 0)return;const l=f.fromPoints(i,a),h=f.extendFromStart(l,200),n=b.intersectionLine(i,h);if(n.length!==1)return;const p=n[0],u=f.extendFromStart(f.fromPoints(i,p),10);r.line(u,{strokeStyle:this.palette.get("theme-hit-color","red")},"pointerRay");const d=f.angleRadian(u)*-1;let t=Math.round(d/Math.PI*100)/100;t<0&&(t=Math.abs(t+1)+1);let s="";t==1?s="\u03C0":t==.17?s="\u03C0/6":t==.25?s="\u03C0/4":t==.33?s="\u03C0/3":t==.5?s="\u03C0/2":t==.58?s="7\u03C0/12":t==.6?s="\u03C0/4":t==.75?s="3\u03C0/4":t==.92?s="11\u03C0/12":t==1.17?s="7\u03C0/6":t==1.25?s="5\u03C0/4":t==1.33?s="4\u03C0/3":t==1.5?s="3\u03C0/2":t==1.58?s="19\u03C0/12":t==1.75?s="7\u03C0/4":t==1.92?s="23\u03C0/12":t==0?s="0 or 2\u03C0":s=`${t.toFixed(2)}\u03C0`;let c=$.radianToDegree(d);c<0&&(c=Math.abs(c+180)+180);const m=Math.round(c),S={strokeStyle:"transparent",fillStyle:this.palette.get("label-color","black"),anchor:"middle"};r.text({x:i.x,y:i.y},`Radians: ${s}`,S,"radiansLabel"),r.text({x:i.x,y:i.y+20},`Degrees: ${m}`,S,"degreesLabel")}render(){return R`
			<div id="container">
        <svg @pointermove="${this._pointerMove}" style="font-size: 1em" viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height}></svg>
			</div>
		`}}y(g,"styles",_`
  :host {
    color: var(--label-color, green);
  }
  #container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  svg {
  }
  #toolbar {
    display: flex;
    padding: 1em;
    display: none;
  }
  #toolbar input {
    width: 3em;
    margin-right: 1em;
    margin-left: 0.3em;
  }
  `);x([v()],g.prototype,"radian",2);x([v()],g.prototype,"degree",2);x([v()],g.prototype,"width",2);x([v()],g.prototype,"height",2);customElements.define(I,g);export{g as RadiansEditor,I as tagName};
