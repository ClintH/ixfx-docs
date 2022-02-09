var p=Object.defineProperty;var u=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as g,$ as m,e as o}from"./vendor.aa1ac2c8.js";import{A as y}from"./chunk-3TSPSTUR.0c63f691.js";import"./chunk-G4S3XAFG.a06889d7.js";import{S as h}from"./chunk-WGSYSC7J.a829d299.js";import"./chunk-FPOHJL6J.981a7808.js";import"./chunk-UDOW5UY7.00d3a5c3.js";var R=Object.defineProperty,S=Object.getOwnPropertyDescriptor,d=(e,t,i,r)=>{for(var s=r>1?void 0:r?S(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(s=(r?l(t,i,s):l(s))||s);return r&&s&&R(t,i,s),s};const b="arc-editor";class a extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.svg(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.svg(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,r=t.height,s=this.getArc(),n={x:i/2,y:r/2};t.path(y.toSvg(n,s))}async updated(){this.renderSvg()}render(){return m`
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
		`}}c(a,"styles",g`
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
  `);d([o()],a.prototype,"startRadian",2);d([o()],a.prototype,"strokeStyle",2);d([o()],a.prototype,"endRadian",2);d([o()],a.prototype,"counterClockwise",2);d([o({type:Number})],a.prototype,"radius",2);try{customElements.define(b,a)}catch(e){console.log(e)}export{a as ArcEditor,b as tagName};
