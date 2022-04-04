var h=Object.defineProperty;var u=(e,t,i)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var p=(e,t,i)=>(u(e,typeof t!="symbol"?t+"":t,i),i);import{a as v,r as m,$ as g,b as n}from"./vendor.d6870787.js";import{U as y}from"./chunk-ODBLOXCD.602f7099.js";import"./chunk-AWXCQ245.1dcbd11a.js";import{a as c}from"./chunk-LZ7XWTRR.a62618b8.js";import"./chunk-3CYWIYMP.09a63feb.js";import"./chunk-4DU25RMK.d28002ea.js";import"./chunk-FQLUQVDZ.7e80d7b0.js";var R=Object.defineProperty,b=Object.getOwnPropertyDescriptor,d=(e,t,i,s)=>{for(var a=s>1?void 0:s?b(t,i):t,o=e.length-1,l;o>=0;o--)(l=e[o])&&(a=(s?l(t,i,a):l(a))||a);return s&&a&&R(t,i,a),a};const w="arc-editor";class r extends v{constructor(){super();this.radius=20,this.startRadian=0,this.endRadian=Math.PI,this.strokeStyle='var(--accent-bold, "yellow")'}getArc(){return{startRadian:this.startRadian,endRadian:this.endRadian,radius:this.radius,counterClockwise:this.counterClockwise}}setArc(t){this.radius=t.radius,this.startRadian=t.startRadian,this.endRadian=t.endRadian,this.counterClockwise=t.counterClockwise}getBounds(){const t=c.makeHelper(this.shadowRoot.querySelector("svg"));return{width:t.width,height:t.height}}renderSvg(){const t=c.makeHelper(this.shadowRoot.querySelector("svg"),{fillStyle:"transparent",strokeStyle:this.strokeStyle,strokeWidth:3});t.clear();const i=t.width,s=t.height,a=this.getArc(),o={x:i/2,y:s/2};t.path(y.toSvg(a,o))}async updated(){this.renderSvg()}render(){return g`
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
		`}}p(r,"styles",m`
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
  `);d([n()],r.prototype,"startRadian",2);d([n()],r.prototype,"strokeStyle",2);d([n()],r.prototype,"endRadian",2);d([n()],r.prototype,"counterClockwise",2);d([n({type:Number})],r.prototype,"radius",2);try{customElements.define(w,r)}catch(e){console.log(e)}export{r as ArcEditor,w as tagName};
