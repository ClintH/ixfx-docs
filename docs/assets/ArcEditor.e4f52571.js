var u=Object.defineProperty;var p=(e,t,i)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var l=(e,t,i)=>(p(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as g,$ as m,e as d}from"./vendor.994fac77.js";import{A as R}from"./chunk-RELB4ERA.359f0ce7.js";import"./chunk-L7NPGFXB.27ec158a.js";import{S as h}from"./chunk-C54446BC.dacc5f5a.js";import"./chunk-O3VPZBOU.e8cd7407.js";var y=Object.defineProperty,f=Object.getOwnPropertyDescriptor,o=(e,t,i,s)=>{for(var a=s>1?void 0:s?f(t,i):t,n=e.length-1,c;n>=0;n--)(c=e[n])&&(a=(s?c(t,i,a):c(a))||a);return s&&a&&y(t,i,a),a};const w="arc-editor";class r extends v{constructor(){super();this.startRadian=0,this.endRadian=Math.PI,this.radius=10}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.svg(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:"pink",strokeWidth:3});t.clear();const i=t.width,s=t.height,a=this.getArc(),n={x:i/2,y:s/2};t.path(R.toSvg(n,a))}async updated(){this.renderSvg()}render(){return m`
			<div id="container">
        <div id="toolbar">
          <div class="opt">
            <label>Radius:</label>
            <input type="number" id="radius" value=${this.radius}>
          </div>
          <div class="opt">
            <label>Start radian:</label>
            <input type="number" id="startRadian" value=${this.startRadian}>
          </div>
          <div class="opt">
            <label>End radian:</label>
            <input type="number" id="endRadian" value=${this.endRadian}>
          </div>
        </div>
        <svg width=200 height=200></svg>
			</div>
		`}}l(r,"styles",g`
  #container {
    display: flex;
    align-items: center;
    flex-direction: column
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
  `);o([d()],r.prototype,"startRadian",2);o([d()],r.prototype,"endRadian",2);o([d()],r.prototype,"counterClockwise",2);o([d()],r.prototype,"radius",2);try{customElements.define(w,r)}catch(e){console.log(e)}export{r as ArcEditor,w as tagName};
