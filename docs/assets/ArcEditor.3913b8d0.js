var u=Object.defineProperty;var p=(e,t,i)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(p(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as g,$ as m,e as d}from"./vendor.ae2f83e2.js";import{J as R}from"./chunk-HKPWQDQW.6ecee2ff.js";import"./chunk-L7NPGFXB.2df40d37.js";import{S as h}from"./chunk-EJYCGNKW.43480ee8.js";import"./chunk-RRAKEYPR.51ea3209.js";var f=Object.defineProperty,y=Object.getOwnPropertyDescriptor,o=(e,t,i,a)=>{for(var s=a>1?void 0:a?y(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(s=(a?l(t,i,s):l(s))||s);return a&&s&&f(t,i,s),s};const w="arc-editor";class r extends v{constructor(){super();this.startRadian=0,this.endRadian=Math.PI,this.radius=10}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.svg(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:"pink",strokeWidth:3});t.clear();const i=t.width,a=t.height,s=this.getArc(),n={x:i/2,y:a/2};t.path(R.toSvg(n,s))}async updated(){this.renderSvg()}render(){return m`
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
  `);o([d()],r.prototype,"startRadian",2);o([d()],r.prototype,"endRadian",2);o([d()],r.prototype,"counterClockwise",2);o([d()],r.prototype,"radius",2);try{customElements.define(w,r)}catch(e){console.log(e)}export{r as ArcEditor,w as tagName};
