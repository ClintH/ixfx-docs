import{t as v,d as m,e as A,f as _,h as k,j as w,k as V,w as D}from"./chunk-RELB4ERA.359f0ce7.js";import{d as l,S as K,c as p,f as n,e as d}from"./chunk-L7NPGFXB.27ec158a.js";var E=(t=>(t[t.DiscardOlder=0]="DiscardOlder",t[t.DiscardNewer=1]="DiscardNewer",t[t.DiscardAdditions=2]="DiscardAdditions",t))(E||{}),B=(t,e,s)=>{const r=e.length+s.length,i=t.overflowPolicy??2,a=t.capacity??r,h=r-a;switch(t.debug&&console.log(`Stack.push: stackLen: ${e.length} potentialLen: ${r} toRemove: ${h} policy: ${E[i]}`),i){case 2:return t.debug&&console.log(`Stack.push:DiscardAdditions: stackLen: ${e.length} slice: ${r-a} toAddLen: ${s.length}`),e.length===t.capacity?e:[...e,...s.slice(0,s.length-h)];case 1:return h>=e.length?s.slice(Math.max(0,s.length-a),Math.min(s.length,a)+1):(t.debug&&console.log(` from orig: ${e.slice(0,h-1)}`),[...e.slice(0,h-1),...s.slice(0,Math.min(s.length,a-h+1))]);case 0:return[...e,...s].slice(h);default:throw new Error(`Unknown overflow policy ${i}`)}},b=(t,e,...s)=>{const r=e.length+s.length;return t.capacity&&r>t.capacity?B(t,e,s):[...e,...s]},M=(t,e)=>{if(e.length===0)throw new Error("Stack is empty");return e.slice(0,e.length-1)},f=(t,e)=>e[e.length-1],S=(t,e)=>e.length===0,N=(t,e)=>t.capacity?e.length>=t.capacity:!1,g=class{constructor(t,e){l(this,"opts"),l(this,"data"),this.opts=t,this.data=e}push(...t){return new g(this.opts,b(this.opts,this.data,...t))}pop(){return new g(this.opts,M(this.opts,this.data))}forEach(t){this.data.forEach(t)}forEachFromTop(t){[...this.data].reverse().forEach(t)}get isEmpty(){return S(this.opts,this.data)}get isFull(){return N(this.opts,this.data)}get peek(){return f(this.opts,this.data)}get length(){return this.data.length}},j=(t={},...e)=>new g({...t},[...e]),F=class{constructor(t,e){l(this,"opts"),l(this,"data"),this.opts=t,this.data=e}push(...t){return this.data=b(this.opts,this.data,...t),this.data.length}pop(){const t=f(this.opts,this.data);return M(this.opts,this.data),t}get isEmpty(){return S(this.opts,this.data)}get isFull(){return N(this.opts,this.data)}get peek(){return f(this.opts,this.data)}get length(){return this.data.length}},z=(t,...e)=>new F({...t},[...e]),W=(...t)=>{if(t===void 0)throw new Error("data parameter is undefined");const e=t.filter(r=>typeof r=="number"&&!Number.isNaN(r));return e.reduce((r,i)=>r+i,0)/e.length},q=t=>{const e=t.filter(r=>typeof r=="number"&&!Number.isNaN(r)),s=e.reduce((r,i)=>r+i,0);return{total:s,max:Math.max(...e),min:Math.min(...e),avg:s/e.length}},u,c,$=class extends Array{constructor(t){super();if(p(this,u,void 0),p(this,c,void 0),Number.isNaN(t))throw Error("capacity is NaN");d(this,u,t),d(this,c,0)}add(t){const e=$.from(this);return e[n(this,c)]=t,d(e,u,n(this,u)),d(e,c,n(this,c)+1===n(this,u)?0:n(this,c)+1),e}get pointer(){return n(this,c)}get isFull(){return n(this,u)===0?!1:this.length===n(this,u)}},L=$;u=new WeakMap;c=new WeakMap;var x=t=>new L(t),o,y=class extends K{constructor(t,e={}){super();p(this,o,new Map),l(this,"groupBy"),l(this,"type"),this.type=t,this.groupBy=e.groupBy??v}debugString(){const t=Array.from(n(this,o).keys());let e=`Keys: ${t.join(", ")}\r
`;return t.forEach(s=>{const r=n(this,o).get(s);if(r!==void 0){const i=this.type.toArray(r);i!==void 0&&(e+=` - ${s} (${this.type.count(r)}) = ${JSON.stringify(i)}\r
`)}else e+=` - ${s} (undefined)\r
`}),e}get isEmpty(){return n(this,o).size===0}clear(){n(this,o).clear(),super.fireEvent("clear",!0)}addKeyedValues(t,...e){const s=n(this,o).get(t);s===void 0?(n(this,o).set(t,this.type.add(void 0,e)),super.fireEvent("addedKey",{key:t}),super.fireEvent("addedValues",{values:e})):(n(this,o).set(t,this.type.add(s,e)),super.fireEvent("addedValues",{values:e}))}addValue(...t){t.forEach(e=>this.addKeyedValues(this.groupBy(e),e))}hasKeyValue(t,e){const s=n(this,o).get(t);return s===void 0?!1:this.type.has(s,e)}has(t){return n(this,o).has(t)}deleteKeyValue(t,e){const s=n(this,o).get(t);if(s===void 0)return;const r=this.type.without(s,e);n(this,o).set(t,this.type.add(void 0,r))}delete(t){return n(this,o).get(t)===void 0?!1:(n(this,o).delete(t),this.fireEvent("deleteKey",{key:t}),!0)}findKeyForValue(t){return Array.from(n(this,o).keys()).find(r=>{const i=n(this,o).get(r);if(i===void 0)throw Error("Bug: map could not be accessed");return!!this.type.has(i,t)})}count(t){const e=n(this,o).get(t);return e===void 0?0:this.type.count(e)}get(t){const e=n(this,o).get(t);if(e!==void 0)return this.type.toArray(e)}getSource(t){return n(this,o).get(t)}keys(){return Array.from(n(this,o).keys())}keysAndCounts(){return this.keys().map(s=>[s,this.count(s)])}merge(t){t.keys().forEach(s=>{const r=t.get(s);r!==void 0&&this.addKeyedValues(s,...r)})}};o=new WeakMap;var G=(t={})=>{const e=t.comparer===void 0?t.toString===void 0?(i,a)=>t.toString(i)===t.toString(a):m:t.comparer,s={add:(i,a)=>i===void 0?[...a]:[...i,...a],count:i=>i.length,find:(i,a)=>i.find(a),filter:(i,a)=>i.filter(a),toArray:i=>i,has:(i,a)=>i.find(h=>e(h,a))!==void 0,without:(i,a)=>i.filter(h=>!e(h,a))};return new y(s,t)},U=t=>{const e=t?.hash??v,s=(a,h)=>e(a)===e(h),r={add:(a,h)=>A(a,e,...h),count:a=>a.size,find:(a,h)=>_(a,h),filter:(a,h)=>k(a,h),toArray:a=>w(a),has:(a,h)=>V(a,h,s),without:(a,h)=>D(w(a),h,s)};return new y(r,t)},H=t=>{const e=m,s={add:(r,i)=>(r===void 0&&(r=x(t.capacity)),i.forEach(a=>r=r?.add(a)),r),count:r=>r.length,find:(r,i)=>r.find(i),filter:(r,i)=>r.filter(i),toArray:r=>r,has:(r,i)=>r.find(a=>e(a,i))!==void 0,without:(r,i)=>r.filter(a=>!e(a,i))};return new y(s,t)};export{W as a,x as b,G as c,U as d,z as e,q as g,H as m,j as s};
