import{f as u}from"./chunks/exampleData.4ab6b43d.js";import{Q as i}from"./chunks/chunk-CWNWYEFL.2e02d266.js";import"./chunks/chunk-IP2OCIJK.bdd1e666.js";import{i as d}from"./chunks/loader.c806e4ef.js";import"./client-shim.cda72367.js";import"./chunks/styles.b4645976.js";let e=i.queue();const l=document.getElementById("peekDiscard"),p=document.getElementById("selDiscard"),c=d("visDiscard","array-vis-element");c.classes.withBottom=!1;const E=()=>{l.innerText=e.peek===void 0?"Empty":`Peek: ${e.peek}`},a=()=>{c.data=e.data,E()},n=()=>{const m=p.value;e=i.queue({capacity:3,discardPolicy:m},...e.data),e=e.enqueue(u()),a()};document.getElementById("btnEnqueueDiscard").addEventListener("click",n);document.getElementById("btnDequeueDiscard").addEventListener("click",()=>{e.isEmpty||(e=e.dequeue(),a())});n();n();n();let t=i.queue();const k=document.getElementById("peek"),o=d("vis","array-vis-element");o.classes.withBottom=!1;const q=()=>{k.innerText=t.peek===void 0?"Empty":`Peek: ${t.peek}`},r=()=>{o.data=t.data,q()},s=()=>{t=t.enqueue(u()),r()};document.getElementById("btnEnqueue").addEventListener("click",s);document.getElementById("btnDequeue").addEventListener("click",()=>{t.isEmpty||(t=t.dequeue(),r())});s();s();s();
