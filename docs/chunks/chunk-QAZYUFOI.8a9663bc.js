import{A as W,M as P,S as T,s as G,d as _,t as F,e as H,h as X,j as Y,k as x,l as Z,w as tt}from"./chunk-QIWUQGQJ.e6594f26.js";import{s as et,S as rt,i as at}from"./chunk-U4IZE4J2.68fe18db.js";import{_ as M,a as y,b as c,d as n,c as d}from"./chunk-FQLUQVDZ.735c98e3.js";var it={};M(it,{Arrays:()=>W,Maps:()=>P,Queues:()=>z,Sets:()=>T,Stacks:()=>R,circularArray:()=>L,map:()=>p,mapArray:()=>nt,mapCircular:()=>ht,mapMutable:()=>vt,mapSet:()=>ot,queue:()=>q,queueMutable:()=>D,setMutable:()=>G,simpleMapArrayMutable:()=>et,stack:()=>N,stackMutable:()=>O});var l,u,A=class extends Array{constructor(t=0){super();y(this,l,void 0),y(this,u,void 0),at(t,"positive","capacity"),d(this,l,t),d(this,u,0)}add(t){const e=A.from(this);return e[n(this,u)]=t,d(e,l,n(this,l)),n(this,l)>0?d(e,u,n(this,u)+1===n(this,l)?0:n(this,u)+1):d(e,u,n(this,u)+1),e}get pointer(){return n(this,u)}get isFull(){return n(this,l)===0?!1:this.length===n(this,l)}},st=A;l=new WeakMap;u=new WeakMap;var L=t=>new st(t),h,$=class extends rt{constructor(t,e={}){super();y(this,h,new Map),c(this,"groupBy"),c(this,"type"),this.type=t,this.groupBy=e.groupBy??F}get typeName(){return this.type.name}get lengthMax(){let t=0;for(const e of n(this,h).values())t=Math.max(t,this.type.count(e));return t}debugString(){const t=Array.from(n(this,h).keys());let e=`Keys: ${t.join(", ")}\r
`;return t.forEach(r=>{const a=n(this,h).get(r);if(a!==void 0){const s=this.type.toArray(a);s!==void 0&&(e+=` - ${r} (${this.type.count(a)}) = ${JSON.stringify(s)}\r
`)}else e+=` - ${r} (undefined)\r
`}),e}get isEmpty(){return n(this,h).size===0}clear(){n(this,h).clear(),super.fireEvent("clear",!0)}addKeyedValues(t,...e){const r=n(this,h).get(t);r===void 0?(n(this,h).set(t,this.type.add(void 0,e)),super.fireEvent("addedKey",{key:t}),super.fireEvent("addedValues",{values:e})):(n(this,h).set(t,this.type.add(r,e)),super.fireEvent("addedValues",{values:e}))}addValue(...t){t.forEach(e=>this.addKeyedValues(this.groupBy(e),e))}hasKeyValue(t,e){const r=n(this,h).get(t);return r===void 0?!1:this.type.has(r,e)}has(t){return n(this,h).has(t)}deleteKeyValue(t,e){const r=n(this,h).get(t);if(r===void 0)return!1;const a=this.type.count(r),s=this.type.without(r,e),i=s.length;return n(this,h).set(t,this.type.add(void 0,s)),a>i}delete(t){return n(this,h).get(t)===void 0?!1:(n(this,h).delete(t),this.fireEvent("deleteKey",{key:t}),!0)}findKeyForValue(t){return Array.from(n(this,h).keys()).find(a=>{const s=n(this,h).get(a);if(s===void 0)throw Error("Bug: map could not be accessed");return!!this.type.has(s,t)})}count(t){const e=n(this,h).get(t);return e===void 0?0:this.type.count(e)}get(t){const e=n(this,h).get(t);if(e!==void 0)return this.type.toArray(e)}getSource(t){return n(this,h).get(t)}keys(){return Array.from(n(this,h).keys())}keysAndCounts(){return this.keys().map(r=>[r,this.count(r)])}merge(t){t.keys().forEach(r=>{const a=t.get(r);a!==void 0&&this.addKeyedValues(r,...a)})}};h=new WeakMap;var nt=(t={})=>{const e=t.comparer===void 0?t.toString===void 0?(s,i)=>t.toString(s)===t.toString(i):_:t.comparer,r={get name(){return"array"},add:(s,i)=>s===void 0?[...i]:[...s,...i],count:s=>s.length,find:(s,i)=>s.find(i),filter:(s,i)=>s.filter(i),toArray:s=>s,has:(s,i)=>s.find(o=>e(o,i))!==void 0,without:(s,i)=>s.filter(o=>!e(o,i))};return new $(r,t)},ot=t=>{const e=t?.hash??F,r=(i,o)=>e(i)===e(o),a={get name(){return"set"},add:(i,o)=>H(i,e,...o),count:i=>i.size,find:(i,o)=>X(i,o),filter:(i,o)=>Y(i,o),toArray:i=>x(i),has:(i,o)=>Z(i,o,r),without:(i,o)=>tt(x(i),o,r)};return new $(a,t)},ht=t=>{const e=_,r={get name(){return"circular"},add:(a,s)=>(a===void 0&&(a=L(t.capacity)),s.forEach(i=>a=a?.add(i)),a),count:a=>a.length,find:(a,s)=>a.find(s),filter:(a,s)=>a.filter(s),toArray:a=>a,has:(a,s)=>a.find(i=>e(i,s))!==void 0,without:(a,s)=>a.filter(i=>!e(i,s))};return new $(r,t)},R={};M(R,{stack:()=>N,stackMutable:()=>O});var ut=(t,e,r)=>{const a=e.length+r.length,s=t.discardPolicy??"additions",i=t.capacity??a,o=a-i;switch(t.debug&&console.log(`Stack.push: stackLen: ${e.length} potentialLen: ${a} toRemove: ${o} policy: ${s}`),s){case"additions":return t.debug&&console.log(`Stack.push:DiscardAdditions: stackLen: ${e.length} slice: ${a-i} toAddLen: ${r.length}`),e.length===t.capacity?e:[...e,...r.slice(0,r.length-o)];case"newer":return o>=e.length?r.slice(Math.max(0,r.length-i),Math.min(r.length,i)+1):(t.debug&&console.log(` from orig: ${e.slice(0,e.length-o)}`),[...e.slice(0,e.length-o),...r.slice(0,Math.min(r.length,i-o+1))]);case"older":return[...e,...r].slice(o);default:throw new Error(`Unknown discard policy ${s}`)}},K=(t,e,...r)=>{const a=e.length+r.length;return t.capacity&&a>t.capacity?ut(t,e,r):[...e,...r]},V=(t,e)=>{if(e.length===0)throw new Error("Stack is empty");return e.slice(0,e.length-1)},v=(t,e)=>e[e.length-1],Q=(t,e)=>e.length===0,B=(t,e)=>t.capacity?e.length>=t.capacity:!1,m=class{constructor(t,e){c(this,"opts"),c(this,"data"),this.opts=t,this.data=e}push(...t){return new m(this.opts,K(this.opts,this.data,...t))}pop(){return new m(this.opts,V(this.opts,this.data))}forEach(t){this.data.forEach(t)}forEachFromTop(t){[...this.data].reverse().forEach(t)}get isEmpty(){return Q(this.opts,this.data)}get isFull(){return B(this.opts,this.data)}get peek(){return v(this.opts,this.data)}get length(){return this.data.length}},ct=class{constructor(t,e){c(this,"opts"),c(this,"data"),this.opts=t,this.data=e}push(...t){return this.data=K(this.opts,this.data,...t),this.data.length}forEach(t){this.data.forEach(t)}forEachFromTop(t){[...this.data].reverse().forEach(t)}pop(){const t=v(this.opts,this.data);return V(this.opts,this.data),t}get isEmpty(){return Q(this.opts,this.data)}get isFull(){return B(this.opts,this.data)}get peek(){return v(this.opts,this.data)}get length(){return this.data.length}},N=(t={},...e)=>new m({...t},[...e]),O=(t,...e)=>new ct({...t},[...e]),z={};M(z,{queue:()=>q,queueMutable:()=>D});var f=(t,e)=>{t.debug&&console.log(`queue:${e}`)},lt=(t,e,r)=>{const a=e.length+r.length,s=t.capacity??a,i=a-s,o=t.discardPolicy??"additions";switch(f(t,`queueLen: ${e.length} potentialLen: ${a} toRemove: ${i} policy: ${o}`),o){case"additions":return f(t,`trimQueue:DiscardAdditions: queueLen: ${e.length} slice: ${a-s} toAddLen: ${r.length}`),e.length===t.capacity?e:[...e,...r.slice(0,i-1)];case"newer":if(i>=e.length)return r.slice(Math.max(0,r.length-s),Math.min(r.length,s)+1);{const S=r.slice(0,Math.min(r.length,s-i+1)),b=e.slice(0,e.length-i);f(t,`trimQueue: toRemove: ${i} keeping: ${JSON.stringify(b)} from orig: ${JSON.stringify(e)} toAddFinal: ${JSON.stringify(S)}`);const k=[...b,...S];return f(t,`final: ${JSON.stringify(k)}`),k}case"older":return[...e,...r].slice(i);default:throw new Error(`Unknown overflow policy ${o}`)}},C=(t,e,...r)=>{if(t===void 0)throw new Error("opts parameter undefined");const a=e.length+r.length,s=t.capacity&&a>t.capacity,i=s?lt(t,e,r):[...e,...r];if(t.capacity&&i.length!==t.capacity&&s)throw new Error(`Bug! Expected return to be at capacity. Return len: ${i.length} capacity: ${t.capacity} opts: ${JSON.stringify(t)}`);if(!t.capacity&&i.length!==a)throw new Error(`Bug! Return length not expected. Return len: ${i.length} expected: ${a} opts: ${JSON.stringify(t)}`);return i},I=(t,e)=>{if(e.length===0)throw new Error("Queue is empty");return e.slice(1)},w=(t,e)=>e[0],J=(t,e)=>e.length===0,j=(t,e)=>t.capacity?e.length>=t.capacity:!1,E=class{constructor(t,e){if(c(this,"opts"),c(this,"data"),t===void 0)throw new Error("opts parameter undefined");this.opts=t,this.data=e}forEach(t){for(let e=this.data.length-1;e>=0;e--)t(this.data[e])}forEachFromFront(t){this.data.forEach(e=>t(e))}enqueue(...t){return new E(this.opts,C(this.opts,this.data,...t))}dequeue(){return new E(this.opts,I(this.opts,this.data))}get isEmpty(){return J(this.opts,this.data)}get isFull(){return j(this.opts,this.data)}get length(){return this.data.length}get peek(){return w(this.opts,this.data)}},pt=class{constructor(t,e){if(c(this,"opts"),c(this,"data"),t===void 0)throw new Error("opts parameter undefined");this.opts=t,this.data=e}enqueue(...t){return this.data=C(this.opts,this.data,...t),this.data.length}dequeue(){const t=w(this.opts,this.data);return this.data=I(this.opts,this.data),t}get isEmpty(){return J(this.opts,this.data)}get isFull(){return j(this.opts,this.data)}get length(){return this.data.length}get peek(){return w(this.opts,this.data)}},q=(t={},...e)=>(t={...t},new E(t,[...e])),D=(t={},...e)=>new pt({...t},[...e]),dt=(t,e)=>{const r=new Map(t.entries());return e.forEach(a=>{if(a[0]===void 0)throw new Error("key cannot be undefined");if(a[1]===void 0)throw new Error("value cannot be undefined");r.set(a[0],a[1])}),r},gt=(t,e)=>{const r=new Map(t.entries());return e.forEach(a=>{if(a.key===void 0)throw new Error("key cannot be undefined");if(a.value===void 0)throw new Error("value cannot be undefined");r.set(a.key,a.value)}),r},ft=(t,e)=>t.has(e),g=(t,...e)=>{if(t===void 0)throw new Error("map parameter is undefined");if(e===void 0)throw new Error("data parameter i.s undefined");if(e.length===0)return t;const r=e[0];return typeof r.key<"u"&&typeof r.value<"u"?gt(t,e):dt(t,e)},yt=(t,e,r)=>{const a=new Map(t.entries());return a.set(e,r),a},U=(t,e)=>{const r=new Map(t.entries());return r.delete(e),r},p=t=>{if(t===void 0)return p([]);if(Array.isArray(t))return p(g(new Map,...t));const e=t;return{add:(...r)=>{const a=g(e,...r);return p(a)},get:r=>e.get(r),delete:r=>p(U(e,r)),clear:()=>p(),has:r=>e.has(r),entries:()=>e.entries(),isEmpty:()=>e.size===0}},vt=(...t)=>{let e=g(new Map,...t);return{add:(...r)=>{e=g(e,...r)},delete:r=>{e=U(e,r)},clear:()=>{e=g(new Map)},set:(r,a)=>{e=yt(e,r,a)},get:r=>e.get(r),entries:()=>e.entries(),isEmpty:()=>e.size===0,has:r=>ft(e,r)}};export{z as Q,R as S,nt as a,ht as m,D as q,N as s};