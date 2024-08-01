import{v as Tt,l as Ht,x as Mt,y as Nt}from"./chunks/chunk-IYXXLC7L.739e1efe.js";import"./chunks/chunk-H62DA3UX.2f4e44f0.js";import{u as Ot,v as P}from"./chunks/chunk-QRUAJLXP.d4cb917b.js";import"./chunks/ReplPad.ba9e8b4b.js";import"./client-shim.c3248903.js";var L=globalThis,Z=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),st=new WeakMap,vt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Z&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&st.set(e,t))}return t}toString(){return this.cssText}},Rt=t=>new vt(typeof t=="string"?t:t+"",void 0,K),kt=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[o+1],t[0]);return new vt(s,t,K)},Lt=(t,e)=>{if(Z)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(const s of e){const i=document.createElement("style"),r=L.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}},rt=Z?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return Rt(s)})(t):t,{is:It,defineProperty:Bt,getOwnPropertyDescriptor:Dt,getOwnPropertyNames:jt,getOwnPropertySymbols:zt,getPrototypeOf:Vt}=Object,j=globalThis,it=j.trustedTypes,qt=it?it.emptyScript:"",Wt=j.reactiveElementPolyfillSupport,H=(t,e)=>t,I={toAttribute(t,e){switch(e){case Boolean:t=t?qt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Q=(t,e)=>!It(t,e),nt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:Q};Symbol.metadata??=Symbol("metadata"),j.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=Dt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i?.call(this)},set(o){const n=i?.call(this);r.call(this,o),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??nt}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;const t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){const e=this.properties,s=[...jt(e),...zt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(rt(i))}else t!==void 0&&e.push(rt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(s.converter?.toAttribute!==void 0?s.converter:I).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:I;this._$Em=i,this[i]=o.fromAttribute(e,r.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??Q)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,r]of s)r.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],r)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach(e=>this._$EC(e,this[e])),this._$EU()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[H("elementProperties")]=new Map,x[H("finalized")]=new Map,Wt?.({ReactiveElement:x}),(j.reactiveElementVersions??=[]).push("2.0.4");var Y=globalThis,B=Y.trustedTypes,ot=B?B.createPolicy("lit-html",{createHTML:t=>t}):void 0,G="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,tt="?"+_,Ft=`<${tt}>`,b=document,N=()=>b.createComment(""),O=t=>t===null||typeof t!="object"&&typeof t!="function",$t=Array.isArray,ft=t=>$t(t)||typeof t?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,lt=/>/g,A=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,ct=/"/g,_t=/^(?:script|style|textarea|title)$/i,Jt=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),w=Jt(1),E=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),dt=new WeakMap,y=b.createTreeWalker(b,129);function gt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(e):e}var At=(t,e)=>{const s=t.length-1,i=[];let r,o=e===2?"<svg>":"",n=U;for(let a=0;a<s;a++){const l=t[a];let $,u,h=-1,d=0;for(;d<l.length&&(n.lastIndex=d,u=n.exec(l),u!==null);)d=n.lastIndex,n===U?u[1]==="!--"?n=at:u[1]!==void 0?n=lt:u[2]!==void 0?(_t.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=A):u[3]!==void 0&&(n=A):n===A?u[0]===">"?(n=r??U,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,$=u[1],n=u[3]===void 0?A:u[3]==='"'?ct:ht):n===ct||n===ht?n=A:n===at||n===lt?n=U:(n=A,r=void 0);const c=n===A&&t[a+1].startsWith("/>")?" ":"";o+=n===U?l+Ft:h>=0?(i.push($),l.slice(0,h)+G+l.slice(h)+_+c):l+_+(h===-2?a:c)}return[gt(t,o+(t[s]||"<?>")+(e===2?"</svg>":"")),i]},F=class mt{constructor({strings:e,_$litType$:s},i){let r;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[$,u]=At(e,s);if(this.el=mt.createElement($,i),y.currentNode=this.el.content,s===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=y.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(G)){const d=u[n++],c=r.getAttribute(h).split(_),p=/([.?@])?(.*)/.exec(d);l.push({type:1,index:o,name:p[2],strings:c,ctor:p[1]==="."?Et:p[1]==="?"?St:p[1]==="@"?wt:R}),r.removeAttribute(h)}else h.startsWith(_)&&(l.push({type:6,index:o}),r.removeAttribute(h));if(_t.test(r.tagName)){const h=r.textContent.split(_),d=h.length-1;if(d>0){r.textContent=B?B.emptyScript:"";for(let c=0;c<d;c++)r.append(h[c],N()),y.nextNode(),l.push({type:2,index:++o});r.append(h[d],N())}}}else if(r.nodeType===8)if(r.data===tt)l.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(_,h+1))!==-1;)l.push({type:7,index:o}),h+=_.length-1}o++}}static createElement(e,s){const i=b.createElement("template");return i.innerHTML=e,i}};function S(t,e,s=t,i){if(e===E)return e;let r=i!==void 0?s._$Co?.[i]:s._$Cl;const o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(t),r._$AT(t,s,i)),i!==void 0?(s._$Co??=[])[i]=r:s._$Cl=r),r!==void 0&&(e=S(t,r._$AS(t,e.values),r,i)),e}var yt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??b).importNode(e,!0);y.currentNode=i;let r=y.nextNode(),o=0,n=0,a=s[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new z(r,r.nextSibling,this,t):a.type===1?l=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(l=new xt(r,this,t)),this._$AV.push(l),a=s[++n]}o!==a?.index&&(r=y.nextNode(),o++)}return y.currentNode=b,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},z=class bt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,i,r){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e?.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=S(this,e,s),O(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ft(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==v&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=F.createElement(gt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(s);else{const o=new yt(r,this),n=o.u(this.options);o.p(s),this.T(n),this._$AH=o}}_$AC(e){let s=dt.get(e.strings);return s===void 0&&dt.set(e.strings,s=new F(e)),s}k(e){$t(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,r=0;for(const o of e)r===s.length?s.push(i=new bt(this.S(N()),this.S(N()),this,this.options)):i=s[r],i._$AI(o),r++;r<s.length&&(this._$AR(i&&i._$AB.nextSibling,r),s.length=r)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=S(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const n=t;let a,l;for(t=r[0],a=0;a<r.length-1;a++)l=S(this,n[s+a],e,a),l===E&&(l=this._$AH[a]),o||=!O(l)||l!==this._$AH[a],l===v?t=v:t!==v&&(t+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Et=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},St=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},wt=class extends R{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??v)===E)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}},Xt={P:G,A:_,C:tt,M:1,L:At,R:yt,D:ft,V:S,I:z,H:R,N:St,U:wt,B:Et,F:xt},Zt=Y.litHtmlPolyfillSupport;Zt?.(F,z),(Y.litHtmlVersions??=[]).push("3.1.4");var Kt=(t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(r===void 0){const o=s?.renderBefore??null;i._$litPart$=r=new z(e.insertBefore(N(),o),o,void 0,s??{})}return r._$AI(t),r},M=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};M._$litElement$=!0,M.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:M});var Qt=globalThis.litElementPolyfillSupport;Qt?.({LitElement:M});(globalThis.litElementVersions??=[]).push("4.0.4");var Yt=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},Gt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:Q},te=(t=Gt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),o.set(s.name,t),i==="accessor"){const{name:n}=s;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t)},init(a){return a!==void 0&&this.P(n,void 0,t),a}}}if(i==="setter"){const{name:n}=s;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+i)};function k(t){return(e,s)=>typeof s=="object"?te(t,e,s):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(t,e,s)}var ee={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},se=t=>(...e)=>({_$litDirective$:t,values:e}),re=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},{I:ie}=Xt,ut=()=>document.createComment(""),T=(t,e,s)=>{const i=t._$AA.parentNode,r=e===void 0?t._$AB:e._$AA;if(s===void 0){const o=i.insertBefore(ut(),r),n=i.insertBefore(ut(),r);s=new ie(o,n,t,t.options)}else{const o=s._$AB.nextSibling,n=s._$AM,a=n!==t;if(a){let l;s._$AQ?.(t),s._$AM=t,s._$AP!==void 0&&(l=t._$AU)!==n._$AU&&s._$AP(l)}if(o!==r||a){let l=s._$AA;for(;l!==o;){const $=l.nextSibling;i.insertBefore(l,r),l=$}}}return s},m=(t,e,s=t)=>(t._$AI(e,s),t),ne={},oe=(t,e=ne)=>t._$AH=e,ae=t=>t._$AH,W=t=>{t._$AP?.(!1,!0);let e=t._$AA;const s=t._$AB.nextSibling;for(;e!==s;){const i=e.nextSibling;e.remove(),e=i}},pt=(t,e,s)=>{const i=new Map;for(let r=e;r<=s;r++)i.set(t[r],r);return i},le=se(class extends re{constructor(t){if(super(t),t.type!==ee.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,s){let i;s===void 0?s=e:e!==void 0&&(i=e);const r=[],o=[];let n=0;for(const a of t)r[n]=i?i(a,n):n,o[n]=s(a,n),n++;return{values:o,keys:r}}render(t,e,s){return this.dt(t,e,s).values}update(t,[e,s,i]){const r=ae(t),{values:o,keys:n}=this.dt(e,s,i);if(!Array.isArray(r))return this.ut=n,o;const a=this.ut??=[],l=[];let $,u,h=0,d=r.length-1,c=0,p=o.length-1;for(;h<=d&&c<=p;)if(r[h]===null)h++;else if(r[d]===null)d--;else if(a[h]===n[c])l[c]=m(r[h],o[c]),h++,c++;else if(a[d]===n[p])l[p]=m(r[d],o[p]),d--,p--;else if(a[h]===n[p])l[p]=m(r[h],o[p]),T(t,l[p+1],r[h]),h++,p--;else if(a[d]===n[c])l[c]=m(r[d],o[c]),T(t,r[h],r[d]),d--,c++;else if($===void 0&&($=pt(n,c,p),u=pt(a,h,d)),$.has(a[h]))if($.has(a[d])){const f=u.get(n[c]),V=f!==void 0?r[f]:null;if(V===null){const et=T(t,r[h]);m(et,o[c]),l[c]=et}else l[c]=m(V,o[c]),T(t,r[h],V),r[f]=null;c++}else W(r[d]),d--;else W(r[h]),h++;for(;c<=p;){const f=T(t,l[p+1]);m(f,o[c]),l[c++]=f}for(;h<=d;){const f=r[h++];f!==null&&W(f)}return this.ut=n,oe(t,l),E}}),he=t=>{if(!(t==null||t==="undefined"))try{if(typeof t=="string"){if(t.length===0)return;const e=JSON.parse(t);if(!Array.isArray(e)){console.error("Histogram innerText should be JSON array");return}for(const[s,i]of e.entries()){if(!Array.isArray(i)){console.error("Histogram array should consist of inner arrays");return}if(i.length!==2){console.error("Histogram inner arrays should consist of two elements");return}if(typeof i[0]!="string"){console.error(`First element of inner array should be a string (index ${s})`);return}if(typeof i[1]!="number"){console.error(`Second element of inner array should be a number (index ${s})`);return}}return e}}catch(e){console.log(t),console.error(e)}},g=class extends M{constructor(){super();this.data=[],this.showDataLabels=!0,this.height="100%",this.showXAxis=!0,this.json=void 0}connectedCallback(){this.hasAttribute("json")||this.setAttribute("json",this.innerText),super.connectedCallback()}barTemplate(t,e,s){const{percentage:i}=t,[r,o]=t.data,n=1,a=2,l=e+1,$=l+1,u=w`<div class="data">${o}</div>`,h=w`${r}`;return w`
      <div
             class="bar"
             style="grid-area: ${n} / ${l} / ${a} / ${$}"
           >
             <div class="barTrack" style="height: ${(i??0)*100}%"></div>
             ${this.showDataLabels?u:""}
           </div>
           <div
             class="xAxisLabels"
             style="grid-area: ${n+2} / ${l} / ${a+2} / ${$}"
           >
             ${this.showXAxis?h:""}
           </div>
    `}render(){if((this.data===void 0||this.data.length===0)&&this.json===void 0)return w``;const t=this.data??this.json,e=t.length,s=Math.max(...t.map(a=>a[1])),i=t.map(a=>({data:a,percentage:a[1]/s})),r=w`
      <div
            class="xAxis"
            style="grid-area: 2 / 1 / 3 / ${t.length+1}"
          ></div>
    `,o=this.height?`height: ${this.height};`:"";return w`
      <style>
             div.chart {
               grid-template-columns: repeat(${t.length}, minmax(2px, 1fr));
             }
           </style>
           <div class="container" style="${o}">
             <div class="chart">
               ${le(i,a=>a.data[0],(a,l)=>this.barTemplate(a,l,e))}
               ${this.showXAxis?r:""}
             </div>
           </div>
    `}};Ot(g,"styles",kt`
    :host {
    }
    div.container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    div.chart {
      display: grid;
      flex: 1;
      grid-template-rows: 1fr 1px min-content;
      justify-items: center;
    }
    div.bar {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-self: normal;
      padding-left: 0.3vw;
      padding-right: 0.3vw;
    }
    div.bar > div.barTrack {
      background-color: var(--histogram-bar-color, gray);
      align-self: stretch;
    }
    div.xAxisLabels,
    div.data {
      font-size: min(1vw, 1em);
      color: var(--histogram-label-color, currentColor);
    }
    div.xAxisLabels {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
    }
    div.xAxis {
      background-color: var(--histogram-axis-color, silver);
      width: 100%;
      height: 100%;
    }
  `);P([k()],g.prototype,"data",2);P([k()],g.prototype,"showDataLabels",2);P([k()],g.prototype,"height",2);P([k()],g.prototype,"showXAxis",2);P([k({converter:he,type:Object})],g.prototype,"json",2);g=P([Yt("histogram-vis")],g);var ce=class{el;#t;constructor(t){this.el=t}setAutoSort(t){this.#t=Tt(t)}clear(){this.el!==void 0&&(this.el.data=[])}dispose(){const t=this.el;t!==void 0&&t.remove()}update(t){if(this.el===void 0){console.warn("FrequencyHistogramPlot this.el undefined");return}this.el.data=this.#t===void 0?[...t]:this.#t(t)}};/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/const C=Ht("#dataStream",{capacity:8,timestamp:!1}),D=Mt(),Ct=new ce(document.getElementById("dataPlot"));Ct.setAutoSort("valueReverse");let J=200,X=0;D.addEventListener("change",()=>{Ct.update(D.toArray())});const Pt=()=>{C.log("Start"),C.log(),X=window.setInterval(()=>{J--;const t=Nt.weightedInteger(10).toString();D.add(t),C.log(t.toString()),J<=0&&Ut()},300)},Ut=()=>{X!==0&&(C.log("Stop"),C.log(),J=200,window.clearInterval(X))},de=()=>{D.clear(),C.log()};document.getElementById("btnStart").addEventListener("click",Pt);document.getElementById("btnStop").addEventListener("click",Ut);document.getElementById("btnClear").addEventListener("click",de);Pt();
