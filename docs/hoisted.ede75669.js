import"./chunks/ReplPad.75be59a9.js";import"./client-shim.d2daba34.js";import"./chunks/chunk-6KMJZM2I.db4204bf.js";const o=document.getElementById("vectorIntro");o.addEventListener("vector-change",n=>{const{cartesian:e,polar:t}=n.detail;document.getElementById("vector-cartesian").innerHTML=`<code>{ x: ${Math.round(e.x)}, y: ${Math.round(e.y)}}</code>`,document.getElementById("vector-polar").innerHTML=`<code>{ distance: ${Math.round(t.distance)}, angleRadian: ${t.angleRadian.toFixed(2)}</code>`});