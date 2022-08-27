var f=Object.defineProperty;var u=(t,e,r)=>e in t?f(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var p=(t,e,r)=>(u(t,typeof e!="symbol"?e+"":e,r),r);import{a as y,r as g,$ as s,g as b,b as d}from"./vendor.c33530a8.js";import{P as v,d as c}from"./chunk-GK535KVL.5ac52ed3.js";import"./chunk-OE2F6QKM.bc057148.js";import{e as h}from"./styles.801fcc34.js";var x=Object.defineProperty,w=Object.getOwnPropertyDescriptor,m=(t,e,r,i)=>{for(var a=i>1?void 0:i?w(e,r):e,n=t.length-1,l;n>=0;n--)(l=t[n])&&(a=(i?l(e,r,a):l(a))||a);return i&&a&&x(e,r,a),a};const $="array-vis-element";class o extends y{constructor(){super();p(this,"palette");this.data=["apples","oranges","passionfruit"],this.palette=v.create(),this.palette.setElementBase(this),this.indexes=!1,this.classes={withBottom:!0}}renderValue(e){let r="";return typeof e=="string"?r=`"${e}"`:typeof e=="number"?r=`${e}`:typeof e=="boolean"?e?r="true":r="false":r=JSON.stringify(e,void 0,2),s`<div class="content">${r}</div>`}renderItem(e,r){return s`<div title="Index ${r}" class="item">
      ${this.indexes?s`<label>x${r}</label>`:s``}
      ${this.renderValue(e)}
    </div>`}renderArray(){const e=this.data;return Array.isArray(e)?s`
    <div id="items">
    ${e.map((r,i)=>this.renderItem(r,i))}
    </div>
    `:s`(err: data is not an array: ${typeof e})`}render(){return s`
    <div id="container" class=${b(this.classes)}>
    ${this.renderArray()}
    </div> 
    `}}p(o,"styles",[h,g`
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
  `]);m([d({attribute:!1,type:Array})],o.prototype,"data",2);m([d({attribute:!0,type:Boolean})],o.prototype,"indexes",2);m([d()],o.prototype,"classes",2);customElements.define($,o);const _="kiwi apple orange grape banana mango passionfruit grapefruit pineapple pear apricot plum nectarine peach blueberry raspberry strawberry starfruit watermelon honeydew-melon".split(" "),A="sweet sour ripe unripe juicy dry frozen mouldy blended mashed preserved".split(" "),I=()=>c.randomElement(A)+" "+c.randomElement(_);export{I as f};
