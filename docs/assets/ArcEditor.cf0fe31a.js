var p=Object.defineProperty;var u=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var c=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{s as v,r as m,$ as g,e as o}from"./vendor.ace659e5.js";import{A as y}from"./chunk-GLOC4ABQ.1540f006.js";import"./chunk-57USKCMY.8e2e6641.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{S as h}from"./chunk-4QHRIV2D.a888d38b.js";import"./chunk-VAHXRYL4.7bd99bcd.js";import"./chunk-6RSYJ7PX.b9b486b6.js";import"./chunk-YDTVC7MM.cb3895f8.js";var b=Object.defineProperty,R=Object.getOwnPropertyDescriptor,d=(e,t,i,a)=>{for(var s=a>1?void 0:a?R(t,i):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(s=(a?l(t,i,s):l(s))||s);return a&&s&&b(t,i,s),s};const f="arc-editor";class r extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=h.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,a=t.height,s=this.getArc(),n={x:i/2,y:a/2};t.path(y.toSvg(s,n))}async updated(){this.renderSvg()}render(){return g`
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
		`}}c(r,"styles",m`
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
  `);d([o()],r.prototype,"startRadian",2);d([o()],r.prototype,"strokeStyle",2);d([o()],r.prototype,"endRadian",2);d([o()],r.prototype,"counterClockwise",2);d([o({type:Number})],r.prototype,"radius",2);try{customElements.define(f,r)}catch(e){console.log(e)}export{r as ArcEditor,f as tagName};
