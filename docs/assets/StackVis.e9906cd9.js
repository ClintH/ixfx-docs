import{S as o}from"./chunk-672VRZPI.818522b7.js";import"./chunk-V2CC3OS2.f8999184.js";import"./chunk-E6FEPMVF.c62dcddf.js";import{i as a}from"./loader.039e8a90.js";import{f as c}from"./exampleData.9e21b094.js";import"./chunk-YDTVC7MM.cb3895f8.js";let e=o.stack();const i=document.getElementById("peek"),s=a("vis","arrayvis-element");s.indexes=!1;const r=()=>{i.innerText=e.peek===void 0?"Empty":`Peek: ${e.peek}`},n=()=>{s.data=[...e.data].reverse(),r()},t=()=>{e=e.push(c()),n()};document.getElementById("btnPush").addEventListener("click",t);document.getElementById("btnPop").addEventListener("click",()=>{e.isEmpty||(e=e.pop(),n())});t();t();t();
