import{b as c,r as f,$ as a,o as u,a as p}from"../client-shim.cda72367.js";import{a as y}from"./chunk-FJ2C6UZS.54105029.js";import{A as m}from"./chunk-QOZ2BRCA.14308385.js";import"./chunk-25KFP6OF.934c8512.js";import"./chunk-BSJKVIJG.f7604bb7.js";import"./chunk-4X2SZKK7.4dbfee46.js";import"./chunk-OE2F6QKM.34a70cb8.js";import"./chunk-U4IZE4J2.1410a545.js";import{e as g}from"./styles.591694aa.js";var b=Object.defineProperty,v=Object.getOwnPropertyDescriptor,d=(o,e,r,i)=>{for(var t=i>1?void 0:i?v(e,r):e,n=o.length-1,l;n>=0;n--)(l=o[n])&&(t=(i?l(e,r,t):l(t))||t);return i&&t&&b(e,r,t),t};const h="array-vis-element";class s extends c{static styles=[g,f`
      :host {
        --margin: 0.2em;
        --border: 3px solid;
      }
      #container {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      #items {
        border-left: var(--border) var(--fg);
        border-right: var(--border) var(--fg);
        display: flex;
        flex-direction: column;
        max-height: 40vh;
        overflow-y: auto;
        border-radius: 0.2em;
      }
      #container.withBottom #items {
        border-bottom: var(--border) var(--fg);
      }

      .item {
        display: flex;
        flex-direction: row;
        margin: var(--margin);
        cursor: default;
        background-color: var(--bg-contrast);
        color: var(--fg);
        opacity: 0.8;
      }
      .item:hover {
        opacity: 1.0;
      }
      label {
        opacity:0.6;
        margin-right: var(--margin);
        padding: var(--margin);

      }
      .content {
        padding: var(--margin);
        text-align: center;
        flex-grow: 1;
      }
  `];palette;constructor(){super();this.data=["apples","oranges","passionfruit"],this.palette=y.create(),this.palette.setElementBase(this),this.indexes=!1,this.classes={withBottom:!0}}renderValue(e){let r="";return typeof e=="string"?r=`"${e}"`:typeof e=="number"?r=`${e}`:typeof e=="boolean"?e?r="true":r="false":r=JSON.stringify(e,void 0,2),a`<div class="content">${r}</div>`}renderItem(e,r){return a`<div title="Index ${r}" class="item">
      ${this.indexes?a`<label>x${r}</label>`:a``}
      ${this.renderValue(e)}
    </div>`}renderArray(){const e=this.data;return Array.isArray(e)?a`
    <div id="items">
    ${e.map((r,i)=>this.renderItem(r,i))}
    </div>
    `:a`(err: data is not an array: ${typeof e})`}render(){return a`
    <div id="container" class=${u(this.classes)}>
    ${this.renderArray()}
    </div> 
    `}}d([p({attribute:!1,type:Array})],s.prototype,"data",2);d([p({attribute:!0,type:Boolean})],s.prototype,"indexes",2);d([p()],s.prototype,"classes",2);customElements.define(h,s);const x="kiwi apple orange grape banana mango passionfruit grapefruit pineapple pear apricot plum nectarine peach blueberry raspberry strawberry starfruit watermelon honeydew-melon".split(" "),w="sweet sour ripe unripe juicy dry frozen mouldy blended mashed preserved".split(" "),V=()=>m.randomElement(w)+" "+m.randomElement(x);export{V as f};
