import{g as c,a6 as s,a7 as g,a8 as i}from"./client-shim.9530acfc.js";import"./chunks/ReplPad.fb366125.js";const t=c("#dataStream",{capacity:8,timestamp:!1}),e=s(),r=new g(document.getElementById("dataPlot"));r.setAutoSort("valueReverse");let n=200,o=0;e.addEventListener("change",()=>{r.update(e.toArray())});const l=()=>{t.log("Start"),t.log(),o=window.setInterval(()=>{n--;const a=i.weightedInteger(10).toString();e.add(a),t.log(a.toString()),n<=0&&d()},300)},d=()=>{o!==0&&(t.log("Stop"),t.log(),n=200,window.clearInterval(o))},m=()=>{e.clear(),t.log()};document.getElementById("btnStart").addEventListener("click",l);document.getElementById("btnStop").addEventListener("click",d);document.getElementById("btnClear").addEventListener("click",m);l();
