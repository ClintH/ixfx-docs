import{S as n}from"./chunk-VAHXRYL4.a924033a.js";import"./chunk-57USKCMY.339b34ad.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{i as c}from"./loader.039e8a90.js";import{f as o}from"./exampleData.71a1c791.js";import"./chunk-YDTVC7MM.cb3895f8.js";let e=n.stack();const d=document.getElementById("peek"),s=c("vis","arrayvis-element");s.indexes=!1;const i=()=>{d.innerText=e.peek===void 0?"Empty":`Peek: ${e.peek}`},a=()=>{s.data=[...e.data].reverse(),i()},t=()=>{e=e.push(o()),a()};document.getElementById("btnPush").addEventListener("click",t);document.getElementById("btnPop").addEventListener("click",()=>{e.isEmpty||(e=e.pop(),a())});t();t();t();
