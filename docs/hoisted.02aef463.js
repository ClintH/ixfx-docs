import{f as d}from"./chunks/exampleData.51c260e9.js";import{a4 as u}from"./client-shim.9530acfc.js";import{i}from"./chunks/loader.c806e4ef.js";import"./chunks/styles.b6bfd690.js";let e=u.queue();const l=document.getElementById("peekDiscard"),p=document.getElementById("selDiscard"),c=i("visDiscard","array-vis-element");c.classes.withBottom=!1;const E=()=>{l.innerText=e.peek===void 0?"Empty":`Peek: ${e.peek}`},a=()=>{c.data=e.data,E()},n=()=>{const m=p.value;e=u.queue({capacity:3,discardPolicy:m},...e.data),e=e.enqueue(d()),a()};document.getElementById("btnEnqueueDiscard").addEventListener("click",n);document.getElementById("btnDequeueDiscard").addEventListener("click",()=>{e.isEmpty||(e=e.dequeue(),a())});n();n();n();let t=u.queue();const k=document.getElementById("peek"),o=i("vis","array-vis-element");o.classes.withBottom=!1;const q=()=>{k.innerText=t.peek===void 0?"Empty":`Peek: ${t.peek}`},r=()=>{o.data=t.data,q()},s=()=>{t=t.enqueue(d()),r()};document.getElementById("btnEnqueue").addEventListener("click",s);document.getElementById("btnDequeue").addEventListener("click",()=>{t.isEmpty||(t=t.dequeue(),r())});s();s();s();
