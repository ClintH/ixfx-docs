import{o as C,p as O,q as E,u as B}from"./chunk-3TSPSTUR.0c63f691.js";import{i as w,S as N}from"./chunk-G4S3XAFG.a06889d7.js";import{_ as I,a as o,b as m,d as h,c as i}from"./chunk-UDOW5UY7.00d3a5c3.js";import{S as j}from"./chunk-IARP4YHS.e1edd6af.js";var W={};I(W,{continuously:()=>R,delay:()=>U,msElapsedTimer:()=>b,relativeTimer:()=>S,sleep:()=>_,ticksElapsedTimer:()=>A,timeout:()=>q});var q=(e,t)=>{if(e===void 0)throw new Error("callback parameter is undefined");w(t,"aboveZero","timeoutMs");let a=0;return{start:(v=t)=>{w(v,"aboveZero","altTimeoutMs"),a!==0&&stop(),a=window.setTimeout(()=>{e(),a=0},v)},cancel:()=>{a!==0&&window.clearTimeout(a)},get isDone(){return a!==0}}},R=(e,t,a)=>{t!==void 0&&w(t,"aboveZero","intervalMs");let s=!1,n=0;const v=t===void 0?u=>window.requestAnimationFrame(u):u=>window.setTimeout(u,t),D=()=>{!s||(s=!1,n=0)},T=()=>{if(!s)return;const u=e(n++);if(u!==void 0&&!u){D();return}v(T)};return{start:()=>{if(s&&a!==void 0){const u=a(n);if(u!==void 0&&!u){D();return}}else if(s)return;s=!0,v(T)},get isDone(){return s},get ticks(){return n},cancel:D}},_=e=>new Promise(t=>setTimeout(t,e)),U=async(e,t)=>(w(t,"aboveZero","timeoutMs"),await _(t),Promise.resolve(await e())),S=(e,t,a=!0)=>{let s=!1;return{get isDone(){return s},reset:()=>{s=!1,t.reset()},get elapsed(){let n=t.elapsed/e;return a&&(n=C(n)),n>=1&&(s=!0),n}}},b=()=>{let e=window.performance.now();return{reset:()=>{e=window.performance.now()},get elapsed(){return window.performance.now()-e}}},A=()=>{let e=0;return{reset:()=>{e=0},get elapsed(){return e++}}},Z={};I(Z,{adsr:()=>J,defaultAdsrOpts:()=>Y,easeOverTicks:()=>F,easeOverTime:()=>$,getEasings:()=>H});var g=Math.sqrt,r=Math.pow,P=Math.cos,f=Math.PI,k=Math.sin,$=function(e,t){return M(e,t,b)},F=function(e,t){return M(e,t,A)},M=function(e,t,a){const s=G(e),n=S(t,a(),!0);return{get isDone(){return n.isDone},compute:()=>{const v=n.elapsed;return s(v)},reset:()=>{n.reset()}}},G=function(e){e=e.toLocaleLowerCase();const t=Object.entries(Q).find(([a,s])=>a.toLocaleLowerCase()===e);if(t===void 0)throw new Error(`Easing '${e}' not found.`);return t[1]},H=function(){return Array.from(Object.keys(Q))},L=function(e){const t=7.5625,a=2.75;return e<1/a?t*e*e:e<2/a?t*(e-=1.5/a)*e+.75:e<2.5/a?t*(e-=2.25/a)*e+.9375:t*(e-=2.625/a)*e+.984375},Q={easeInSine:e=>1-P(e*f/2),easeOutSine:e=>k(e*f/2),easeInQuad:e=>e*e,easeOutQuad:e=>1-(1-e)*(1-e),easeInOutSine:e=>-(P(f*e)-1)/2,easeInOutQuad:e=>e<.5?2*e*e:1-r(-2*e+2,2)/2,easeInCubic:e=>e*e*e,easeOutCubic:e=>1-r(1-e,3),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>1-r(1-e,4),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>1-r(1-e,5),easeInExpo:e=>e===0?0:r(2,10*e-10),easeOutExpo:e=>e===1?1:1-r(2,-10*e),easeInOutQuint:e=>e<.5?16*e*e*e*e*e:1-r(-2*e+2,5)/2,easeInOutExpo:e=>e===0?0:e===1?1:e<.5?r(2,20*e-10)/2:(2-r(2,-20*e+10))/2,easeInCirc:e=>1-g(1-r(e,2)),easeOutCirc:e=>g(1-r(e-1,2)),easeInBack:e=>{const t=1.70158;return(t+1)*e*e*e-t*e*e},easeOutBack:e=>{const t=1.70158,a=t+1;return 1+a*r(e-1,3)+t*r(e-1,2)},easeInOutCirc:e=>e<.5?(1-g(1-r(2*e,2)))/2:(g(1-r(-2*e+2,2))+1)/2,easeInOutBack:e=>{const a=1.70158*1.525;return e<.5?r(2*e,2)*((a+1)*2*e-a)/2:(r(2*e-2,2)*((a+1)*(e*2-2)+a)+2)/2},easeInElastic:e=>{const t=2*f/3;return e===0?0:e===1?1:-r(2,10*e-10)*k((e*10-10.75)*t)},easeOutElastic:e=>{const t=2*f/3;return e===0?0:e===1?1:r(2,-10*e)*k((e*10-.75)*t)+1},easeInBounce:e=>1-L(1-e),easeOutBounce:L,easeInOutElastic:e=>{const t=2*f/4.5;return e===0?0:e===1?1:e<.5?-(r(2,20*e-10)*k((20*e-11.125)*t))/2:r(2,-20*e+10)*k((20*e-11.125)*t)/2+1},easeInOutBounce:e=>e<.5?(1-L(1-2*e))/2:(1+L(2*e-1))/2},Y=()=>({attackBend:-1,decayBend:-.3,releaseBend:-.3,peakLevel:1,initialLevel:0,sustainLevel:.6,releaseLevel:0,attackDuration:600,decayDuration:200,releaseDuration:800,shouldLoop:!1}),c,y,l,p,d,X=class extends N{constructor(e){super();m(this,c,void 0),m(this,y,void 0),m(this,l,void 0),m(this,p,void 0),m(this,d,void 0),o(this,"attackDuration"),o(this,"decayDuration"),o(this,"releaseDuration"),o(this,"decayDurationTotal"),o(this,"shouldLoop"),this.attackDuration=e.attackDuration??300,this.decayDuration=e.decayDuration??500,this.releaseDuration=e.releaseDuration??1e3,this.shouldLoop=e.shouldLoop??!1;const t={attack:["decay","release"],decay:["sustain","release"],sustain:["release"],release:["complete"],complete:null};h(this,c,new j("attack",t)),i(this,c).addEventListener("change",a=>{a.newState==="release"&&i(this,d)&&i(this,l)?.reset(),super.fireEvent("change",a)}),i(this,c).addEventListener("stop",a=>{super.fireEvent("complete",a)}),h(this,y,b),h(this,p,h(this,d,!1)),this.decayDurationTotal=this.attackDuration+this.decayDuration}switchState(){if(i(this,l)===void 0)return!1;let e=i(this,l).elapsed;const t=i(this,d)&&!i(this,p);let a=!1;do switch(a=!1,i(this,c).state){case"attack":(e>this.attackDuration||t)&&(i(this,c).next(),a=!0);break;case"decay":(e>this.decayDurationTotal||t)&&(i(this,c).next(),a=!0);break;case"sustain":(!i(this,p)||t)&&(e=0,i(this,c).next(),i(this,l)?.reset(),a=!0);break;case"release":e>this.releaseDuration&&(i(this,c).next(),a=!0);break;case"complete":this.shouldLoop&&this.trigger(i(this,d))}while(a);return a}computeRaw(e=!0){if(i(this,l)===void 0)return[void 0,0,i(this,c).state];e&&this.switchState();const t=i(this,c).state,a=i(this,l).elapsed;let s=0;const n=i(this,c).state;switch(n){case"attack":s=a/this.attackDuration;break;case"decay":s=(a-this.attackDuration)/this.decayDuration;break;case"sustain":s=1;break;case"release":s=Math.min(a/this.releaseDuration,1);break;case"complete":return[void 0,1,t];default:throw new Error(`State machine in unknown state: ${n}`)}return[n,s,t]}get isDone(){return i(this,c).isDone}onTrigger(){}trigger(e=!1){this.onTrigger(),i(this,c).reset(),h(this,l,i(this,y).call(this)),h(this,p,e),h(this,d,e)}compute(){}release(){this.isDone||!i(this,d)||(h(this,p,!1),this.compute())}};c=new WeakMap;y=new WeakMap;l=new WeakMap;p=new WeakMap;d=new WeakMap;var z=class extends X{constructor(e){super(e);o(this,"attackPath"),o(this,"decayPath"),o(this,"releasePath"),o(this,"initialLevel"),o(this,"peakLevel"),o(this,"releaseLevel"),o(this,"sustainLevel"),o(this,"attackBend"),o(this,"decayBend"),o(this,"releaseBend"),o(this,"initialLevelOverride"),o(this,"retrigger"),o(this,"releasedAt"),this.initialLevel=e.initialLevel??0,this.peakLevel=e.peakLevel??1,this.releaseLevel=e.releaseLevel??0,this.sustainLevel=e.sustainLevel??.75,this.retrigger=e.retrigger??!0,this.attackBend=e.attackBend??0,this.releaseBend=e.releaseBend??0,this.decayBend=e.decayBend??0;const t=1;this.attackPath=O(E({x:0,y:this.initialLevel},{x:t,y:this.peakLevel},-this.attackBend)),this.decayPath=O(E({x:0,y:this.peakLevel},{x:t,y:this.sustainLevel},-this.decayBend)),this.releasePath=O(E({x:0,y:this.sustainLevel},{x:t,y:this.releaseLevel},-this.releaseBend))}onTrigger(){if(this.initialLevelOverride=void 0,!this.retrigger){const[e,t,a]=this.compute();!Number.isNaN(t)&&t>0&&(console.log(`Retrigger. Last value was: ${t}`),this.initialLevelOverride=t)}}compute(e=!0){const[t,a]=super.computeRaw(e);if(t===void 0)return[void 0,NaN,NaN];let s;switch(t){case"attack":s=this.attackPath.compute(a).y,this.initialLevelOverride!==void 0&&(s=B(s,0,this.initialLevel,this.initialLevelOverride,this.initialLevel)),this.releasedAt=s;break;case"decay":s=this.decayPath.compute(a).y,this.releasedAt=s;break;case"sustain":s=this.sustainLevel,this.releasedAt=s;break;case"release":s=this.releasePath.compute(a).y,this.releasedAt!==void 0&&(s=B(s,0,this.sustainLevel,0,this.releasedAt));break;case"complete":s=this.releaseLevel,this.releasedAt=void 0;break;default:throw new Error(`Unknown state: ${t}`)}return[t,s,a]}},J=e=>new z(e);export{J as a,Y as d,_ as s};
