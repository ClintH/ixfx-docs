import{f as i}from"./chunks/exampleData.21bbefe4.js";import{K as n}from"./chunks/chunk-7SZUX4RM.0001b9f5.js";import"./chunks/chunk-ZTX6UONG.8be22e52.js";import{i as a}from"./chunks/loader.c806e4ef.js";import"./client-shim.cda72367.js";import"./chunks/styles.3cbef228.js";let e=n.stack();const l=document.getElementById("peekDiscard"),k=document.getElementById("selDiscard"),c=a("visDiscard","array-vis-element");c.indexes=!1;const E=()=>{l.innerText=e.peek===void 0?"Empty":`Peek: ${e.peek}`},r=()=>{c.data=[...e.data].reverse(),E()},s=()=>{const m=k.value;e=n.stack({capacity:3,discardPolicy:m},...e.data),e=e.push(i()),r()};document.getElementById("btnPushDiscard").addEventListener("click",s);document.getElementById("btnPopDiscard").addEventListener("click",()=>{e.isEmpty||(e=e.pop(),r())});s();s();s();let t=n.stack();const u=document.getElementById("peek"),o=a("vis","array-vis-element");o.indexes=!1;const v=()=>{u.innerText=t.peek===void 0?"Empty":`Peek: ${t.peek}`},p=()=>{o.data=[...t.data].reverse(),v()},d=()=>{t=t.push(i()),p()};document.getElementById("btnPush").addEventListener("click",d);document.getElementById("btnPop").addEventListener("click",()=>{t.isEmpty||(t=t.pop(),p())});d();d();d();