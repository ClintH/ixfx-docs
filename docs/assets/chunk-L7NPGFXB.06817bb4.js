var rr=(e,t="?")=>{if(Number.isNaN(e))throw new Error(`Parameter '${t}' is NaN`);if(e<0)throw new Error(`Parameter '${t}' must be above or equal to 0`);if(e>1)throw new Error(`Parameter '${t}' must be below or equal to 1`)},nr=(e,t="?",r=!1)=>{if(Number.isNaN(e))throw new Error(`Parameter '${t}' is NaN`);if(!Number.isInteger(e))throw new Error(`Paramter ${t} is not an integer`);if(r&&e<0)throw new Error(`Parameter '${t}' must be at least zero`)},ir=e=>{if(!Array.isArray(e))return!1;for(let t=0;t<e.length;t++)if(typeof e[t]!="string")return!1;return!0},or=(e,t="?")=>{if(!Array.isArray(e))throw new Error(`Parameter '${t}' is expected to be an array'`)},ke=Object.create,U=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,me=Object.getOwnPropertyNames,$e=Object.getPrototypeOf,He=Object.prototype.hasOwnProperty,qe=(e,t,r)=>t in e?U(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ge=e=>U(e,"__esModule",{value:!0}),Ve=(e,t)=>function(){return t||(0,e[me(e)[0]])((t={exports:{}}).exports,t),t.exports},be=(e,t)=>{for(var r in t)U(e,r,{get:t[r],enumerable:!0})},ze=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of me(t))!He.call(e,i)&&(r||i!=="default")&&U(e,i,{get:()=>t[i],enumerable:!(n=ye(t,i))||n.enumerable});return e},Be=(e,t)=>ze(Ge(U(e!=null?ke($e(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),ar=(e,t,r,n)=>{for(var i=n>1?void 0:n?ye(t,r):t,s=e.length-1,l;s>=0;s--)(l=e[s])&&(i=(n?l(t,r,i):l(i))||i);return n&&i&&U(t,r,i),i},sr=(e,t,r)=>(qe(e,typeof t!="symbol"?t+"":t,r),r),_e=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)},M=(e,t,r)=>(_e(e,t,"read from private field"),r?r.call(e):t.get(e)),ge=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},Je=(e,t,r,n)=>(_e(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),cr=(e,t,r,n)=>({set _(i){Je(e,t,i,r)},get _(){return M(e,t,n)}}),D,Ue=class{constructor(){ge(this,D,new Map)}add(e,...t){const r=M(this,D).get(e);r===void 0?M(this,D).set(e,t):M(this,D).set(e,[...r,...t])}debugString(){let e="";return Array.from(M(this,D).keys()).every(r=>{const n=M(this,D).get(r);n!==void 0&&(e+=r+` (${n.length}) = ${JSON.stringify(n)}\r
`)}),e}get(e){return M(this,D).get(e)}delete(e,t){const r=M(this,D).get(e);if(r===void 0)return!1;const n=r.filter(i=>i!==t);return M(this,D).set(e,n),n.length<r.length}clear(){M(this,D).clear()}};D=new WeakMap;var W,ur=class{constructor(){ge(this,W,new Ue)}fireEvent(e,t){const r=M(this,W).get(e);r!==void 0&&r.forEach(n=>{try{n(t,this)}catch(i){console.debug("Event listener error: ",i)}})}addEventListener(e,t){M(this,W).add(e,t)}removeEventListener(e,t){M(this,W).delete(e,t)}clearEventListeners(){M(this,W).clear()}};W=new WeakMap;var We=Ve({"node_modules/rxjs/node_modules/tslib/tslib.js"(e,t){var r,n,i,s,l,v,f,m,O,I,_,A,x,E,j,N,$,S,g,C,R,H,pe,Z;(function(b){var z=typeof global=="object"?global:typeof self=="object"?self:typeof this=="object"?this:{};typeof define=="function"&&define.amd?define("tslib",["exports"],function(o){b(q(z,q(o)))}):typeof t=="object"&&typeof t.exports=="object"?b(q(z,q(t.exports))):b(q(z));function q(o,a){return o!==z&&(typeof Object.create=="function"?Object.defineProperty(o,"__esModule",{value:!0}):o.__esModule=!0),function(c,u){return o[c]=a?a(c,u):u}}})(function(b){var z=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,a){o.__proto__=a}||function(o,a){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(o[c]=a[c])};r=function(o,a){if(typeof a!="function"&&a!==null)throw new TypeError("Class extends value "+String(a)+" is not a constructor or null");z(o,a);function c(){this.constructor=o}o.prototype=a===null?Object.create(a):(c.prototype=a.prototype,new c)},n=Object.assign||function(o){for(var a,c=1,u=arguments.length;c<u;c++){a=arguments[c];for(var h in a)Object.prototype.hasOwnProperty.call(a,h)&&(o[h]=a[h])}return o},i=function(o,a){var c={};for(var u in o)Object.prototype.hasOwnProperty.call(o,u)&&a.indexOf(u)<0&&(c[u]=o[u]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var h=0,u=Object.getOwnPropertySymbols(o);h<u.length;h++)a.indexOf(u[h])<0&&Object.prototype.propertyIsEnumerable.call(o,u[h])&&(c[u[h]]=o[u[h]]);return c},s=function(o,a,c,u){var h=arguments.length,d=h<3?a:u===null?u=Object.getOwnPropertyDescriptor(a,c):u,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")d=Reflect.decorate(o,a,c,u);else for(var P=o.length-1;P>=0;P--)(p=o[P])&&(d=(h<3?p(d):h>3?p(a,c,d):p(a,c))||d);return h>3&&d&&Object.defineProperty(a,c,d),d},l=function(o,a){return function(c,u){a(c,u,o)}},v=function(o,a){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,a)},f=function(o,a,c,u){function h(d){return d instanceof c?d:new c(function(p){p(d)})}return new(c||(c=Promise))(function(d,p){function P(L){try{y(u.next(L))}catch(B){p(B)}}function k(L){try{y(u.throw(L))}catch(B){p(B)}}function y(L){L.done?d(L.value):h(L.value).then(P,k)}y((u=u.apply(o,a||[])).next())})},m=function(o,a){var c={label:0,sent:function(){if(d[0]&1)throw d[1];return d[1]},trys:[],ops:[]},u,h,d,p;return p={next:P(0),throw:P(1),return:P(2)},typeof Symbol=="function"&&(p[Symbol.iterator]=function(){return this}),p;function P(y){return function(L){return k([y,L])}}function k(y){if(u)throw new TypeError("Generator is already executing.");for(;c;)try{if(u=1,h&&(d=y[0]&2?h.return:y[0]?h.throw||((d=h.return)&&d.call(h),0):h.next)&&!(d=d.call(h,y[1])).done)return d;switch(h=0,d&&(y=[y[0]&2,d.value]),y[0]){case 0:case 1:d=y;break;case 4:return c.label++,{value:y[1],done:!1};case 5:c.label++,h=y[1],y=[0];continue;case 7:y=c.ops.pop(),c.trys.pop();continue;default:if(d=c.trys,!(d=d.length>0&&d[d.length-1])&&(y[0]===6||y[0]===2)){c=0;continue}if(y[0]===3&&(!d||y[1]>d[0]&&y[1]<d[3])){c.label=y[1];break}if(y[0]===6&&c.label<d[1]){c.label=d[1],d=y;break}if(d&&c.label<d[2]){c.label=d[2],c.ops.push(y);break}d[2]&&c.ops.pop(),c.trys.pop();continue}y=a.call(o,c)}catch(L){y=[6,L],h=0}finally{u=d=0}if(y[0]&5)throw y[1];return{value:y[0]?y[1]:void 0,done:!0}}},O=function(o,a){for(var c in o)c!=="default"&&!Object.prototype.hasOwnProperty.call(a,c)&&Z(a,o,c)},Z=Object.create?function(o,a,c,u){u===void 0&&(u=c),Object.defineProperty(o,u,{enumerable:!0,get:function(){return a[c]}})}:function(o,a,c,u){u===void 0&&(u=c),o[u]=a[c]},I=function(o){var a=typeof Symbol=="function"&&Symbol.iterator,c=a&&o[a],u=0;if(c)return c.call(o);if(o&&typeof o.length=="number")return{next:function(){return o&&u>=o.length&&(o=void 0),{value:o&&o[u++],done:!o}}};throw new TypeError(a?"Object is not iterable.":"Symbol.iterator is not defined.")},_=function(o,a){var c=typeof Symbol=="function"&&o[Symbol.iterator];if(!c)return o;var u=c.call(o),h,d=[],p;try{for(;(a===void 0||a-- >0)&&!(h=u.next()).done;)d.push(h.value)}catch(P){p={error:P}}finally{try{h&&!h.done&&(c=u.return)&&c.call(u)}finally{if(p)throw p.error}}return d},A=function(){for(var o=[],a=0;a<arguments.length;a++)o=o.concat(_(arguments[a]));return o},x=function(){for(var o=0,a=0,c=arguments.length;a<c;a++)o+=arguments[a].length;for(var u=Array(o),h=0,a=0;a<c;a++)for(var d=arguments[a],p=0,P=d.length;p<P;p++,h++)u[h]=d[p];return u},E=function(o,a,c){if(c||arguments.length===2)for(var u=0,h=a.length,d;u<h;u++)(d||!(u in a))&&(d||(d=Array.prototype.slice.call(a,0,u)),d[u]=a[u]);return o.concat(d||Array.prototype.slice.call(a))},j=function(o){return this instanceof j?(this.v=o,this):new j(o)},N=function(o,a,c){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var u=c.apply(o,a||[]),h,d=[];return h={},p("next"),p("throw"),p("return"),h[Symbol.asyncIterator]=function(){return this},h;function p(T){u[T]&&(h[T]=function(J){return new Promise(function(re,Ne){d.push([T,J,re,Ne])>1||P(T,J)})})}function P(T,J){try{k(u[T](J))}catch(re){B(d[0][3],re)}}function k(T){T.value instanceof j?Promise.resolve(T.value.v).then(y,L):B(d[0][2],T)}function y(T){P("next",T)}function L(T){P("throw",T)}function B(T,J){T(J),d.shift(),d.length&&P(d[0][0],d[0][1])}},$=function(o){var a,c;return a={},u("next"),u("throw",function(h){throw h}),u("return"),a[Symbol.iterator]=function(){return this},a;function u(h,d){a[h]=o[h]?function(p){return(c=!c)?{value:j(o[h](p)),done:h==="return"}:d?d(p):p}:d}},S=function(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a=o[Symbol.asyncIterator],c;return a?a.call(o):(o=typeof I=="function"?I(o):o[Symbol.iterator](),c={},u("next"),u("throw"),u("return"),c[Symbol.asyncIterator]=function(){return this},c);function u(d){c[d]=o[d]&&function(p){return new Promise(function(P,k){p=o[d](p),h(P,k,p.done,p.value)})}}function h(d,p,P,k){Promise.resolve(k).then(function(y){d({value:y,done:P})},p)}},g=function(o,a){return Object.defineProperty?Object.defineProperty(o,"raw",{value:a}):o.raw=a,o};var q=Object.create?function(o,a){Object.defineProperty(o,"default",{enumerable:!0,value:a})}:function(o,a){o.default=a};C=function(o){if(o&&o.__esModule)return o;var a={};if(o!=null)for(var c in o)c!=="default"&&Object.prototype.hasOwnProperty.call(o,c)&&Z(a,o,c);return q(a,o),a},R=function(o){return o&&o.__esModule?o:{default:o}},H=function(o,a,c,u){if(c==="a"&&!u)throw new TypeError("Private accessor was defined without a getter");if(typeof a=="function"?o!==a||!u:!a.has(o))throw new TypeError("Cannot read private member from an object whose class did not declare it");return c==="m"?u:c==="a"?u.call(o):u?u.value:a.get(o)},pe=function(o,a,c,u,h){if(u==="m")throw new TypeError("Private method is not writable");if(u==="a"&&!h)throw new TypeError("Private accessor was defined without a setter");if(typeof a=="function"?o!==a||!h:!a.has(o))throw new TypeError("Cannot write private member to an object whose class did not declare it");return u==="a"?h.call(o,c):h?h.value=c:a.set(o,c),c},b("__extends",r),b("__assign",n),b("__rest",i),b("__decorate",s),b("__param",l),b("__metadata",v),b("__awaiter",f),b("__generator",m),b("__exportStar",O),b("__createBinding",Z),b("__values",I),b("__read",_),b("__spread",A),b("__spreadArrays",x),b("__spreadArray",E),b("__await",j),b("__asyncGenerator",N),b("__asyncDelegator",$),b("__asyncValues",S),b("__makeTemplateObject",g),b("__importStar",C),b("__importDefault",R),b("__classPrivateFieldGet",H),b("__classPrivateFieldSet",pe)})}}),we={};be(we,{button:()=>Kt,checkbox:()=>Wt,numeric:()=>Yt,select:()=>Xt});var Ye=Be(We(),1),{__extends:Y,__assign:lr,__rest:fr,__decorate:dr,__param:vr,__metadata:hr,__awaiter:Ke,__generator:Se,__exportStar:pr,__createBinding:yr,__values:ne,__read:G,__spread:mr,__spreadArrays:br,__spreadArray:K,__await:ie,__asyncGenerator:Xe,__asyncDelegator:_r,__asyncValues:Ze,__makeTemplateObject:gr,__importStar:wr,__importDefault:Sr,__classPrivateFieldGet:Er,__classPrivateFieldSet:Pr}=Ye.default;function w(e){return typeof e=="function"}function Qe(e){var t=function(n){Error.call(n),n.stack=new Error().stack},r=e(t);return r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r}var oe=Qe(function(e){return function(r){e(this),this.message=r?r.length+` errors occurred during unsubscription:
`+r.map(function(n,i){return i+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=r}});function ae(e,t){if(e){var r=e.indexOf(t);0<=r&&e.splice(r,1)}}var se=function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}return e.prototype.unsubscribe=function(){var t,r,n,i,s;if(!this.closed){this.closed=!0;var l=this._parentage;if(l)if(this._parentage=null,Array.isArray(l))try{for(var v=ne(l),f=v.next();!f.done;f=v.next()){var m=f.value;m.remove(this)}}catch(E){t={error:E}}finally{try{f&&!f.done&&(r=v.return)&&r.call(v)}finally{if(t)throw t.error}}else l.remove(this);var O=this.initialTeardown;if(w(O))try{O()}catch(E){s=E instanceof oe?E.errors:[E]}var I=this._teardowns;if(I){this._teardowns=null;try{for(var _=ne(I),A=_.next();!A.done;A=_.next()){var x=A.value;try{Pe(x)}catch(E){s=s??[],E instanceof oe?s=K(K([],G(s)),G(E.errors)):s.push(E)}}}catch(E){n={error:E}}finally{try{A&&!A.done&&(i=_.return)&&i.call(_)}finally{if(n)throw n.error}}}if(s)throw new oe(s)}},e.prototype.add=function(t){var r;if(t&&t!==this)if(this.closed)Pe(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._teardowns=(r=this._teardowns)!==null&&r!==void 0?r:[]).push(t)}},e.prototype._hasParent=function(t){var r=this._parentage;return r===t||Array.isArray(r)&&r.includes(t)},e.prototype._addParent=function(t){var r=this._parentage;this._parentage=Array.isArray(r)?(r.push(t),r):r?[r,t]:t},e.prototype._removeParent=function(t){var r=this._parentage;r===t?this._parentage=null:Array.isArray(r)&&ae(r,t)},e.prototype.remove=function(t){var r=this._teardowns;r&&ae(r,t),t instanceof e&&t._removeParent(this)},e.EMPTY=function(){var t=new e;return t.closed=!0,t}(),e}();function Ee(e){return e instanceof se||e&&"closed"in e&&w(e.remove)&&w(e.add)&&w(e.unsubscribe)}function Pe(e){w(e)?e():e.unsubscribe()}var Ae={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},xe={setTimeout:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=xe.delegate;return((r==null?void 0:r.setTimeout)||setTimeout).apply(void 0,K([],G(e)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function Oe(e){xe.setTimeout(function(){throw e})}function Q(){}function et(e){e()}var ce=function(e){Y(t,e);function t(r){var n=e.call(this)||this;return n.isStopped=!1,r?(n.destination=r,Ee(r)&&r.add(n)):n.destination=tt,n}return t.create=function(r,n,i){return new ue(r,n,i)},t.prototype.next=function(r){this.isStopped||this._next(r)},t.prototype.error=function(r){this.isStopped||(this.isStopped=!0,this._error(r))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(r){this.destination.next(r)},t.prototype._error=function(r){try{this.destination.error(r)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(se),ue=function(e){Y(t,e);function t(r,n,i){var s=e.call(this)||this,l;if(w(r))l=r;else if(r){l=r.next,n=r.error,i=r.complete;var v;s&&Ae.useDeprecatedNextContext?(v=Object.create(r),v.unsubscribe=function(){return s.unsubscribe()}):v=r,l=l==null?void 0:l.bind(v),n=n==null?void 0:n.bind(v),i=i==null?void 0:i.bind(v)}return s.destination={next:l?le(l):Q,error:le(n??Ie),complete:i?le(i):Q},s}return t}(ce);function le(e,t){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];try{e.apply(void 0,K([],G(r)))}catch(i){Oe(i)}}}function Ie(e){throw e}var tt={closed:!0,next:Q,error:Ie,complete:Q},fe=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function rt(e){return e}function nt(e){return e.length===0?rt:e.length===1?e[0]:function(r){return e.reduce(function(n,i){return i(n)},r)}}var F=function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var r=new e;return r.source=this,r.operator=t,r},e.prototype.subscribe=function(t,r,n){var i=this,s=ot(t)?t:new ue(t,r,n);return et(function(){var l=i,v=l.operator,f=l.source;s.add(v?v.call(s,f):f?i._subscribe(s):i._trySubscribe(s))}),s},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(r){t.error(r)}},e.prototype.forEach=function(t,r){var n=this;return r=Te(r),new r(function(i,s){var l=new ue({next:function(v){try{t(v)}catch(f){s(f),l.unsubscribe()}},error:s,complete:i});n.subscribe(l)})},e.prototype._subscribe=function(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)},e.prototype[fe]=function(){return this},e.prototype.pipe=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return nt(t)(this)},e.prototype.toPromise=function(t){var r=this;return t=Te(t),new t(function(n,i){var s;r.subscribe(function(l){return s=l},function(l){return i(l)},function(){return n(s)})})},e.create=function(t){return new e(t)},e}();function Te(e){var t;return(t=e??Ae.Promise)!==null&&t!==void 0?t:Promise}function it(e){return e&&w(e.next)&&w(e.error)&&w(e.complete)}function ot(e){return e&&e instanceof ce||it(e)&&Ee(e)}function at(e){return w(e==null?void 0:e.lift)}function de(e){return function(t){if(at(t))return t.lift(function(r){try{return e(r,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}var X=function(e){Y(t,e);function t(r,n,i,s,l){var v=e.call(this,r)||this;return v.onFinalize=l,v._next=n?function(f){try{n(f)}catch(m){r.error(m)}}:e.prototype._next,v._error=s?function(f){try{s(f)}catch(m){r.error(m)}finally{this.unsubscribe()}}:e.prototype._error,v._complete=i?function(){try{i()}catch(f){r.error(f)}finally{this.unsubscribe()}}:e.prototype._complete,v}return t.prototype.unsubscribe=function(){var r,n=this.closed;e.prototype.unsubscribe.call(this),!n&&((r=this.onFinalize)===null||r===void 0||r.call(this))},t}(ce),st={now:function(){return Date.now()},delegate:void 0},ct=function(e){Y(t,e);function t(r,n){return e.call(this)||this}return t.prototype.schedule=function(r,n){return this},t}(se),ve={setInterval:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=ve.delegate;return((r==null?void 0:r.setInterval)||setInterval).apply(void 0,K([],G(e)))},clearInterval:function(e){return clearInterval(e)},delegate:void 0},ut=function(e){Y(t,e);function t(r,n){var i=e.call(this,r,n)||this;return i.scheduler=r,i.work=n,i.pending=!1,i}return t.prototype.schedule=function(r,n){if(n===void 0&&(n=0),this.closed)return this;this.state=r;var i=this.id,s=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(s,i,n)),this.pending=!0,this.delay=n,this.id=this.id||this.requestAsyncId(s,this.id,n),this},t.prototype.requestAsyncId=function(r,n,i){return i===void 0&&(i=0),ve.setInterval(r.flush.bind(r,this),i)},t.prototype.recycleAsyncId=function(r,n,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return n;ve.clearInterval(n)},t.prototype.execute=function(r,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(r,n);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},t.prototype._execute=function(r,n){var i=!1,s;try{this.work(r)}catch(l){i=!0,s=l||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),s},t.prototype.unsubscribe=function(){if(!this.closed){var r=this,n=r.id,i=r.scheduler,s=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,ae(s,this),n!=null&&(this.id=this.recycleAsyncId(i,n,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},t}(ct),je=function(){function e(t,r){r===void 0&&(r=e.now),this.schedulerActionCtor=t,this.now=r}return e.prototype.schedule=function(t,r,n){return r===void 0&&(r=0),new this.schedulerActionCtor(this,t).schedule(n,r)},e.now=st.now,e}(),lt=function(e){Y(t,e);function t(r,n){n===void 0&&(n=je.now);var i=e.call(this,r,n)||this;return i.actions=[],i._active=!1,i._scheduled=void 0,i}return t.prototype.flush=function(r){var n=this.actions;if(this._active){n.push(r);return}var i;this._active=!0;do if(i=r.execute(r.state,r.delay))break;while(r=n.shift());if(this._active=!1,i){for(;r=n.shift();)r.unsubscribe();throw i}},t}(je),Me=new lt(ut),ft=Me;function dt(e){return e&&w(e.schedule)}var Le=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function vt(e){return w(e==null?void 0:e.then)}function ht(e){return w(e[fe])}function pt(e){return Symbol.asyncIterator&&w(e==null?void 0:e[Symbol.asyncIterator])}function yt(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function mt(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var bt=mt();function _t(e){return w(e==null?void 0:e[bt])}function gt(e){return Xe(this,arguments,function(){var r,n,i,s;return Se(this,function(l){switch(l.label){case 0:r=e.getReader(),l.label=1;case 1:l.trys.push([1,,9,10]),l.label=2;case 2:return[4,ie(r.read())];case 3:return n=l.sent(),i=n.value,s=n.done,s?[4,ie(void 0)]:[3,5];case 4:return[2,l.sent()];case 5:return[4,ie(i)];case 6:return[4,l.sent()];case 7:return l.sent(),[3,2];case 8:return[3,10];case 9:return r.releaseLock(),[7];case 10:return[2]}})})}function wt(e){return w(e==null?void 0:e.getReader)}function ee(e){if(e instanceof F)return e;if(e!=null){if(ht(e))return St(e);if(Le(e))return Et(e);if(vt(e))return Pt(e);if(pt(e))return Ce(e);if(_t(e))return At(e);if(wt(e))return xt(e)}throw yt(e)}function St(e){return new F(function(t){var r=e[fe]();if(w(r.subscribe))return r.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Et(e){return new F(function(t){for(var r=0;r<e.length&&!t.closed;r++)t.next(e[r]);t.complete()})}function Pt(e){return new F(function(t){e.then(function(r){t.closed||(t.next(r),t.complete())},function(r){return t.error(r)}).then(null,Oe)})}function At(e){return new F(function(t){var r,n;try{for(var i=ne(e),s=i.next();!s.done;s=i.next()){var l=s.value;if(t.next(l),t.closed)return}}catch(v){r={error:v}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}t.complete()})}function Ce(e){return new F(function(t){Ot(e,t).catch(function(r){return t.error(r)})})}function xt(e){return Ce(gt(e))}function Ot(e,t){var r,n,i,s;return Ke(this,void 0,void 0,function(){var l,v;return Se(this,function(f){switch(f.label){case 0:f.trys.push([0,5,6,11]),r=Ze(e),f.label=1;case 1:return[4,r.next()];case 2:if(n=f.sent(),!!n.done)return[3,4];if(l=n.value,t.next(l),t.closed)return[2];f.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return v=f.sent(),i={error:v},[3,11];case 6:return f.trys.push([6,,9,10]),n&&!n.done&&(s=r.return)?[4,s.call(r)]:[3,8];case 7:f.sent(),f.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function It(e,t,r,n,i){n===void 0&&(n=0),i===void 0&&(i=!1);var s=t.schedule(function(){r(),i?e.add(this.schedule(null,n)):this.unsubscribe()},n);if(e.add(s),!i)return s}function Tt(e){return e instanceof Date&&!isNaN(e)}function te(e,t){return de(function(r,n){var i=0;r.subscribe(new X(n,function(s){n.next(e.call(t,s,i++))}))})}var jt=Array.isArray;function Mt(e,t){return jt(t)?e.apply(void 0,K([],G(t))):e(t)}function Lt(e){return te(function(t){return Mt(e,t)})}function Ct(e,t,r,n,i,s,l,v){var f=[],m=0,O=0,I=!1,_=function(){I&&!f.length&&!m&&t.complete()},A=function(E){return m<n?x(E):f.push(E)},x=function(E){s&&t.next(E),m++;var j=!1;ee(r(E,O++)).subscribe(new X(t,function(N){i==null||i(N),s?A(N):t.next(N)},function(){j=!0},void 0,function(){if(j)try{m--;for(var N=function(){var $=f.shift();l?It(t,l,function(){return x($)}):x($)};f.length&&m<n;)N();_()}catch($){t.error($)}}))};return e.subscribe(new X(t,A,function(){I=!0,_()})),function(){v==null||v()}}function Re(e,t,r){return r===void 0&&(r=1/0),w(t)?Re(function(n,i){return te(function(s,l){return t(n,s,i,l)})(ee(e(n,i)))},r):(typeof t=="number"&&(r=t),de(function(n,i){return Ct(n,i,e,r)}))}var Rt=["addListener","removeListener"],Dt=["addEventListener","removeEventListener"],Ft=["on","off"];function he(e,t,r,n){if(w(r)&&(n=r,r=void 0),n)return he(e,t,r).pipe(Lt(n));var i=G($t(e)?Dt.map(function(v){return function(f){return e[v](t,f,r)}}):Nt(e)?Rt.map(De(e,t)):kt(e)?Ft.map(De(e,t)):[],2),s=i[0],l=i[1];if(!s&&Le(e))return Re(function(v){return he(v,t,r)})(ee(e));if(!s)throw new TypeError("Invalid event target");return new F(function(v){var f=function(){for(var m=[],O=0;O<arguments.length;O++)m[O]=arguments[O];return v.next(1<m.length?m:m[0])};return s(f),function(){return l(f)}})}function De(e,t){return function(r){return function(n){return e[r](t,n)}}}function Nt(e){return w(e.addListener)&&w(e.removeListener)}function kt(e){return w(e.on)&&w(e.off)}function $t(e){return w(e.addEventListener)&&w(e.removeEventListener)}function Ht(e,t,r){e===void 0&&(e=0),r===void 0&&(r=ft);var n=-1;return t!=null&&(dt(t)?r=t:n=t),new F(function(i){var s=Tt(e)?+e-r.now():e;s<0&&(s=0);var l=0;return r.schedule(function(){i.closed||(i.next(l++),0<=n?this.schedule(void 0,n):i.complete())},s)})}var Fe={leading:!0,trailing:!1};function qt(e,t){return t===void 0&&(t=Fe),de(function(r,n){var i=t.leading,s=t.trailing,l=!1,v=null,f=null,m=!1,O=function(){f==null||f.unsubscribe(),f=null,s&&(A(),m&&n.complete())},I=function(){f=null,m&&n.complete()},_=function(x){return f=ee(e(x)).subscribe(new X(n,O,I))},A=function(){if(l){l=!1;var x=v;v=null,n.next(x),!m&&_(x)}};r.subscribe(new X(n,function(x){l=!0,v=x,!(f&&!f.closed)&&(i?A():_(x))},function(){m=!0,!(s&&l&&f&&!f.closed)&&n.complete()}))})}function Gt(e,t,r){t===void 0&&(t=Me),r===void 0&&(r=Fe);var n=Ht(e,t);return qt(function(){return n},r)}var V=e=>{if(typeof e=="string"){const r=document.querySelector(e);if(r===null)throw e.startsWith("#")?new Error(`Query '${e}' did not match anything. Try '#id', 'div', or '.class'`):new Error(`Query '${e}' did not match anything. Did you mean '#${e}?`);e=r}else{if(e===null)throw new Error(`domQueryOrEl ${e} is null`);if(e===void 0)throw new Error(`domQueryOrEl ${e} is undefined`)}return e},Vt=(e,t)=>{const r=document.createElement(t);return e.parentElement?.insertBefore(r,e.nextSibling),r},zt=(e,t)=>{const r=document.createElement(t);return e.appendChild(r),r},Bt=()=>new F(t=>{const r=new MutationObserver(i=>{t.next(i)}),n={attributeFilter:["class"],attributes:!0};return r.observe(document.documentElement,n),function(){r.disconnect()}}),Jt=(e,t=1e3)=>new F(n=>{const i=new ResizeObserver(s=>{n.next(s)});return i.observe(e),function(){i.unobserve(e)}}).pipe(Gt(t)),Ut=e=>new Promise((r,n)=>{const s=JSON.stringify(e,null,2).replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm,l=>l.replace(/"/g,""));navigator.clipboard.writeText(JSON.stringify(s)).then(()=>{r(!0)},l=>{console.warn("Could not copy to clipboard"),console.log(s),n(l)})}),Wt=(e,t)=>{const r=V(e);return t&&r.addEventListener("change",()=>{t(r.checked)}),{get checked(){return r.checked},set checked(n){r.checked=n}}},Yt=(e,t)=>{const r=V(e);return t&&r.addEventListener("change",()=>{t(parseInt(r.value))}),{get value(){return parseInt(r.value)},set checked(n){r.value=n.toString()}}},Kt=(e,t)=>{const r=V(e);return t&&r.addEventListener("click",n=>{t()}),{click(){t&&t()},set disabled(n){r.disabled=n}}},Xt=(e,t,r={})=>{const n=V(e),{placeholderOpt:i,shouldAddChoosePlaceholder:s=!1,autoSelectAfterChoice:l=-1}=r,v=()=>{t!==void 0&&t(n.value),l>=0&&(n.selectedIndex=l)};return t&&n.addEventListener("change",f=>{v()}),{set disabled(f){n.disabled=f},get value(){return n.value},get index(){return n.selectedIndex},get isSelectedPlaceholder(){return(s||r.placeholderOpt!==void 0)&&n.selectedIndex===0},setOpts(f,m){n.options.length=0,s?f=["-- Choose --",...f]:i!==void 0&&(f=[i,...f]);let O=0;f.forEach((I,_)=>{const A=document.createElement("option");A.value=I,A.innerHTML=I,m!==void 0&&I===m&&(O=_),n.options.add(A)}),n.selectedIndex=O},select(f=0,m=!1){n.selectedIndex=f,m&&t&&v()}}};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var Zt={};be(Zt,{Forms:()=>we,copyToClipboard:()=>Ut,createAfter:()=>Vt,createIn:()=>zt,domRx:()=>tr,log:()=>er,resizeObservable:()=>Jt,resolveEl:()=>V,themeChangeObservable:()=>Bt});var Qt=(e,t)=>{const r=document.createElement("style");r.textContent=t;let n;return e.shadowRoot?(n=e.shadowRoot,n.innerHTML=""):n=e.attachShadow({mode:"open"}),n.appendChild(r),n},er=(e,t={})=>{const{capacity:r=0,monospaced:n=!0,timestamp:i=!1,collapseDuplicates:s=!0}=t;let l=0,v,f=0;const m=V(e),I=Qt(m,`
  .log {
    font-family: ${n?'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", Monaco, "Courier New", Courier, monospace':"normal"};
    background-color: var(--code-background-color);
    padding: var(--padding1, 0.2em);
  }
  .timestamp {
    margin-right: 0.5em;
    opacity: 0.5;
    font-size: 70%;
    align-self: center;
  }
  .line {
    display: flex;
  }
  .line:hover {
    background-color: var(--theme-bg-hover, whitesmoke);
  }
  .error {
    color: red;
  }
  .badge {
    border: 1px solid currentColor;
    align-self: center;
    font-size: 70%;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  .msg {
    flex: 1;
  }
  `),_=document.createElement("div");_.className="log",I.append(_);const A=S=>{const g=document.createElement("div");if(typeof S=="string")g.innerHTML=S;else if(S instanceof Error){const C=S.stack;C===void 0?g.innerHTML=S.toString():g.innerHTML=C.toString()}else g.innerHTML=S;g.classList.add("error"),j(g),v=void 0,f=0};let x=0;const E=(S="")=>{let g;const C=window.performance.now()-x;if(!(t.minIntervalMs&&C<t.minIntervalMs))if(x=window.performance.now(),typeof S=="object"?g=JSON.stringify(S):S===void 0?g="(undefined)":S===null?g="(null)":typeof S=="number"?(Number.isNaN(g)&&(g="(NaN)"),g=S.toString()):g=S,g.length===0){const R=document.createElement("hr");v=void 0,j(R)}else if(g===v&&s){const R=_.firstElementChild;let H=R.querySelector(".badge");H===null&&(H=document.createElement("div"),H.className="badge",R.insertAdjacentElement("beforeend",H)),R!==null&&(H.textContent=(++f).toString())}else{const R=document.createElement("div");R.innerHTML=g,j(R),v=g}},j=S=>{if(i){const g=document.createElement("div"),C=document.createElement("div");C.className="timestamp",C.innerText=new Date().toLocaleTimeString(),g.append(C,S),S.classList.add("msg"),g.classList.add("line"),S=g}else S.classList.add("line","msg");if(_.insertBefore(S,_.firstChild),r>0&&++l>r*2)for(;l>r;)_.lastChild?.remove(),l--;f=0};return{error:A,log:E,append:j,clear:()=>{_.innerHTML="",v=void 0,f=0},dispose:()=>{_.remove()}}},tr=(e,t,r)=>{const n=V(e),i=he(n,t),s={},l=()=>{Object.keys(s).forEach(m=>{delete s[m]})},v=f=>(f.subscribe({next:m=>{Object.assign(s,m)}}),{value:s,clear:l});return r===void 0?v(i):r.pluck?v(i.pipe(te(f=>f[r.pluck]))):r.transform?v(i.pipe(te(f=>r.transform(f)))):v(i)};export{we as F,ur as S,sr as _,be as a,V as b,or as c,ge as d,Je as e,M as f,cr as g,Vt as h,nr as i,zt as j,Ut as k,ir as l,er as m,Kt as n,ar as o,rr as p,Jt as r,Xt as s,Bt as t};
