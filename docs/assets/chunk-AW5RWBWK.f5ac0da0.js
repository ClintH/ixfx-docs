import{E as _,t as L,q as g,s as w,k as p,l as x,c as B,n as E}from"./chunk-ODBLOXCD.602f7099.js";import{S as A}from"./chunk-I3R3AECV.3528ce89.js";import{n as m,S as P}from"./chunk-AWXCQ245.1dcbd11a.js";import{_ as b,a as r,b as u,d as h,c as s}from"./chunk-FQLUQVDZ.7e80d7b0.js";var S={};b(S,{Easings:()=>_,Oscillators:()=>D,adsr:()=>W,defaultAdsrOpts:()=>M,jitter:()=>C});var M=()=>({attackBend:-1,decayBend:-.3,releaseBend:-.3,peakLevel:1,initialLevel:0,sustainLevel:.6,releaseLevel:0,attackDuration:600,decayDuration:200,releaseDuration:800,shouldLoop:!1}),l,f,n,d,o,T=class extends P{constructor(e){super();u(this,l,void 0),u(this,f,void 0),u(this,n,void 0),u(this,d,void 0),u(this,o,void 0),r(this,"attackDuration"),r(this,"decayDuration"),r(this,"releaseDuration"),r(this,"decayDurationTotal"),r(this,"shouldLoop"),this.attackDuration=e.attackDuration??300,this.decayDuration=e.decayDuration??500,this.releaseDuration=e.releaseDuration??1e3,this.shouldLoop=e.shouldLoop??!1;const t={attack:["decay","release"],decay:["sustain","release"],sustain:["release"],release:["complete"],complete:null};h(this,l,new A("attack",t)),s(this,l).addEventListener("change",a=>{a.newState==="release"&&s(this,o)&&s(this,n)?.reset(),super.fireEvent("change",a)}),s(this,l).addEventListener("stop",a=>{super.fireEvent("complete",a)}),h(this,f,E),h(this,d,h(this,o,!1)),this.decayDurationTotal=this.attackDuration+this.decayDuration}switchState(){if(s(this,n)===void 0)return!1;let e=s(this,n).elapsed;const t=s(this,o)&&!s(this,d);let a=!1;do switch(a=!1,s(this,l).state){case"attack":(e>this.attackDuration||t)&&(s(this,l).next(),a=!0);break;case"decay":(e>this.decayDurationTotal||t)&&(s(this,l).next(),a=!0);break;case"sustain":(!s(this,d)||t)&&(e=0,s(this,l).next(),s(this,n)?.reset(),a=!0);break;case"release":e>this.releaseDuration&&(s(this,l).next(),a=!0);break;case"complete":this.shouldLoop&&this.trigger(s(this,o))}while(a);return a}computeRaw(e=!0){if(s(this,n)===void 0)return[void 0,0,s(this,l).state];e&&this.switchState();const t=s(this,l).state,a=s(this,n).elapsed;let i=0;const c=s(this,l).state;switch(c){case"attack":i=a/this.attackDuration;break;case"decay":i=(a-this.attackDuration)/this.decayDuration;break;case"sustain":i=1;break;case"release":i=Math.min(a/this.releaseDuration,1);break;case"complete":return[void 0,1,t];default:throw new Error(`State machine in unknown state: ${c}`)}return[c,i,t]}get isDone(){return s(this,l).isDone}onTrigger(){}trigger(e=!1){this.onTrigger(),s(this,l).reset(),h(this,n,s(this,f).call(this)),h(this,d,e),h(this,o,e)}compute(){}release(){this.isDone||!s(this,o)||(h(this,d,!1),this.compute())}};l=new WeakMap;f=new WeakMap;n=new WeakMap;d=new WeakMap;o=new WeakMap;var N=class extends T{constructor(e){super(e);r(this,"attackPath"),r(this,"decayPath"),r(this,"releasePath"),r(this,"initialLevel"),r(this,"peakLevel"),r(this,"releaseLevel"),r(this,"sustainLevel"),r(this,"attackBend"),r(this,"decayBend"),r(this,"releaseBend"),r(this,"initialLevelOverride"),r(this,"retrigger"),r(this,"releasedAt"),this.initialLevel=e.initialLevel??0,this.peakLevel=e.peakLevel??1,this.releaseLevel=e.releaseLevel??0,this.sustainLevel=e.sustainLevel??.75,this.retrigger=e.retrigger??!0,this.attackBend=e.attackBend??0,this.releaseBend=e.releaseBend??0,this.decayBend=e.decayBend??0;const t=1;this.attackPath=L(g({x:0,y:this.initialLevel},{x:t,y:this.peakLevel},-this.attackBend)),this.decayPath=L(g({x:0,y:this.peakLevel},{x:t,y:this.sustainLevel},-this.decayBend)),this.releasePath=L(g({x:0,y:this.sustainLevel},{x:t,y:this.releaseLevel},-this.releaseBend))}onTrigger(){if(this.initialLevelOverride=void 0,!this.retrigger){const[e,t,a]=this.compute();!Number.isNaN(t)&&t>0&&(console.log(`Retrigger. Last value was: ${t}`),this.initialLevelOverride=t)}}get value(){return this.compute(!0)[1]}compute(e=!0){const[t,a]=super.computeRaw(e);if(t===void 0)return[void 0,NaN,NaN];let i;switch(t){case"attack":i=this.attackPath.interpolate(a).y,this.initialLevelOverride!==void 0&&(i=w(i,0,this.initialLevel,this.initialLevelOverride,this.initialLevel)),this.releasedAt=i;break;case"decay":i=this.decayPath.interpolate(a).y,this.releasedAt=i;break;case"sustain":i=this.sustainLevel,this.releasedAt=i;break;case"release":i=this.releasePath.interpolate(a).y,this.releasedAt!==void 0&&(i=w(i,0,this.sustainLevel,0,this.releasedAt));break;case"complete":i=this.releaseLevel,this.releasedAt=void 0;break;default:throw new Error(`Unknown state: ${t}`)}return[t,i,a]}},W=e=>new N(e),D={};b(D,{saw:()=>U,sine:()=>I,sineBipolar:()=>R,square:()=>j,triangle:()=>$});function*I(e){for(typeof e=="number"&&(e=p(e));;)yield(Math.sin(e.elapsed*Math.PI*2)+1)/2}function*R(e){for(typeof e=="number"&&(e=p(e));;)yield Math.sin(e.elapsed*Math.PI*2)}function*$(e){for(typeof e=="number"&&(e=p(e));;){let t=e.elapsed;t<.5?t*=2:t=2-t*2,yield t}}function*U(e){for(typeof e=="number"&&(e=p(e));;)yield e.elapsed}function*j(e){for(typeof e=="number"&&(e=p(e));;)yield e.elapsed<.5?0:1}var C=(e,t,a={},i=x)=>{const c=a.type??"abs",k=a.clamped??!0;m(e,k?"percentage":"bipolar","value"),m(t,k?"percentage":"bipolar","jitter");let v;if(c==="rel"){t=e*t;const y=t*2*i();v=e-t+y}else if(c==="abs"){const y=t*2*i();v=e-t+y}else throw new Error(`Unknown jitter type: ${c}.`);return k?B(v):v};export{D as O,W as a,M as d,C as j};
