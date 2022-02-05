var p=Object.defineProperty;var u=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as g,$ as y,e as o}from"./vendor.d00e998c.js";import{p as m}from"./chunk-VN6BZR7Y.59fd31c7.js";import"./chunk-4WJCK6OW.7396b794.js";import{S as h}from"./chunk-G44UTPJC.92d22f4f.js";import"./chunk-SG7ZQ2JY.9cef9652.js";var R=Object.defineProperty,f=Object.getOwnPropertyDescriptor,d=(e,t,i,a)=>{for(var s=a>1?void 0:a?f(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(s=(a?l(t,i,s):l(s))||s);return a&&s&&R(t,i,s),s};const b="arc-editor";class r extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.svg(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,a=t.height,s=this.getArc(),n={x:i/2,y:a/2};t.path(m.toSvg(n,s))}async updated(){this.renderSvg()}render(){return y`
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
  `);d([o()],r.prototype,"startRadian",2);d([o()],r.prototype,"strokeStyle",2);d([o()],r.prototype,"endRadian",2);d([o()],r.prototype,"counterClockwise",2);d([o({type:Number})],r.prototype,"radius",2);try{customElements.define(b,r)}catch(e){console.log(e)}export{r as ArcEditor,b as tagName};
