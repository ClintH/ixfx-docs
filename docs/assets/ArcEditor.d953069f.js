var u=Object.defineProperty;var p=(i,t,e)=>t in i?u(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var c=(i,t,e)=>(p(i,typeof t!="symbol"?t+"":t,e),e);import{s as v,r as g,$ as m,e as d}from"./vendor.c9eea879.js";import{A as R}from"./chunk-KSSJG6KL.e5f5f101.js";import"./chunk-L7NPGFXB.fd51dc08.js";import{S as h}from"./chunk-47IJX5B3.d5bf046a.js";var f=Object.defineProperty,y=Object.getOwnPropertyDescriptor,o=(i,t,e,a)=>{for(var s=a>1?void 0:a?y(t,e):t,n=i.length-1,l;n>=0;n--)(l=i[n])&&(s=(a?l(t,e,s):l(s))||s);return a&&s&&f(t,e,s),s};const b="arc-editor";class r extends v{constructor(){super();this.startRadian=0,this.endRadian=Math.PI,this.radius=10}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.svg(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:"pink",strokeWidth:3});t.clear();const e=t.width,a=t.height,s=this.getArc(),n={x:e/2,y:a/2};t.path(R.toSvg(n,s))}async updated(){this.renderSvg()}render(){return m`
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
		`}}c(r,"styles",g`
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
  `);o([d()],r.prototype,"startRadian",2);o([d()],r.prototype,"endRadian",2);o([d()],r.prototype,"counterClockwise",2);o([d()],r.prototype,"radius",2);customElements.define(b,r);export{r as ArcEditor,b as tagName};
