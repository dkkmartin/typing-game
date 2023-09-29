(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();async function Mt(t){const e=await fetch(`https://api.quotable.io/quotes/random?minLength=${t}&maxLength=${t+50}`),n=await e.json();if(e.ok)return n[0].content}class K{static removeMenu(){const e=document.querySelector(".buttons__con");e.style.display="none"}static async startTimer(){const e=document.querySelector("main"),n=document.createElement("h1");n.textContent=5,n.classList.add("countdown"),e.appendChild(n);for(let i=5;i>=1;i--)n.textContent=i,await it(990),i===1&&n.remove()}static async startGame(){document.querySelector(".highscore").remove(),await it(5e3);const n=document.querySelector("select"),i=await Mt(n.value),s=document.querySelector(".app");return document.querySelector(".app__text").remove(),s.style.display="flex",i}}function it(t){return new Promise(e=>setTimeout(e,t))}async function Ot(){try{const t=await fetch("http://164.92.224.247:3000/api/data");if(!t.ok)throw new Error("Response not ok");return await t.json()}catch(t){console.log("Error: ",t)}}class qt{constructor(){this.isRunning=!1,this.startTime=0,this.overallTime=0}_getTimeElapsedSinceLastStart(){return this.startTime?Date.now()-this.startTime:0}start(){if(this.isRunning)return console.error("Timer is already running");this.isRunning=!0,this.startTime=Date.now()}stop(){if(!this.isRunning)return console.error("Timer is already stopped");this.isRunning=!1,this.overallTime=this.overallTime+this._getTimeElapsedSinceLastStart()}reset(){if(this.overallTime=0,this.isRunning){this.startTime=Date.now();return}this.startTime=0}getTime(){return this.startTime?this.isRunning?this.overallTime+this._getTimeElapsedSinceLastStart():this.overallTime:0}}class Lt{start(){const e=document.querySelector(".lds-dual-ring");e.style.display="block"}stop(){const e=document.querySelector(".lds-dual-ring");e.style.display="none"}}function Pt(t,e){t.indexOf(e)===-1&&t.push(e)}const ut=(t,e,n)=>Math.min(Math.max(n,t),e),m={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},z=t=>typeof t=="number",M=t=>Array.isArray(t)&&!z(t[0]),Rt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function _t(t,e){return M(t)?t[Rt(0,t.length,e)]:t}const dt=(t,e,n)=>-n*t+n*e+t,ft=()=>{},w=t=>t,tt=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function ht(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=tt(0,e,i);t.push(dt(n,1,s))}}function Ct(t){const e=[0];return ht(e,t-1),e}function It(t,e=Ct(t.length),n=w){const i=t.length,s=i-e.length;return s>0&&ht(e,s),r=>{let a=0;for(;a<i-2&&!(r<e[a+1]);a++);let o=ut(0,1,tt(e[a],e[a+1],r));return o=_t(n,a)(o),dt(t[a],t[a+1],o)}}const mt=t=>Array.isArray(t)&&z(t[0]),Y=t=>typeof t=="object"&&!!t.createAnimation,O=t=>typeof t=="function",$t=t=>typeof t=="string",C={ms:t=>t*1e3,s:t=>t/1e3},pt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,jt=1e-7,Ft=12;function kt(t,e,n,i,s){let r,a,o=0;do a=e+(n-e)/2,r=pt(a,i,s)-t,r>0?n=a:e=a;while(Math.abs(r)>jt&&++o<Ft);return a}function _(t,e,n,i){if(t===e&&n===i)return w;const s=r=>kt(r,0,1,t,n);return r=>r===0||r===1?r:pt(s(r),e,i)}const Vt=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return ut(0,1,s/t)},st={ease:_(.25,.1,.25,1),"ease-in":_(.42,0,1,1),"ease-in-out":_(.42,0,.58,1),"ease-out":_(0,0,.58,1)},zt=/\((.*?)\)/;function rt(t){if(O(t))return t;if(mt(t))return _(...t);if(st[t])return st[t];if(t.startsWith("steps")){const e=zt.exec(t);if(e){const n=e[1].split(",");return Vt(parseFloat(n[0]),n[1].trim())}}return w}class yt{constructor(e,n=[0,1],{easing:i,duration:s=m.duration,delay:r=m.delay,endDelay:a=m.endDelay,repeat:o=m.repeat,offset:d,direction:y="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=w,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((f,l)=>{this.resolve=f,this.reject=l}),i=i||m.easing,Y(i)){const f=i.createAnimation(n);i=f.easing,n=f.keyframes||n,s=f.duration||s}this.repeat=o,this.easing=M(i)?w:rt(i),this.updateDuration(s);const S=It(n,d,M(i)?i.map(rt):w);this.tick=f=>{var l;r=r;let h=0;this.pauseTime!==void 0?h=this.pauseTime:h=(f-this.startTime)*this.rate,this.t=h,h/=1e3,h=Math.max(h-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(h=this.totalDuration);const q=h/this.duration;let L=Math.floor(q),g=q%1;!g&&q>=1&&(g=1),g===1&&L--;const j=L%2;(y==="reverse"||y==="alternate"&&j||y==="alternate-reverse"&&!j)&&(g=1-g);const P=h>=this.totalDuration?1:Math.min(g,1),A=S(this.easing(P));e(A),this.pauseTime===void 0&&(this.playState==="finished"||h>=this.totalDuration+a)?(this.playState="finished",(l=this.resolve)===null||l===void 0||l.call(this,A)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Nt{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const W=new WeakMap;function gt(t){return W.has(t)||W.set(t,{transforms:[],values:new Map}),W.get(t)}function Ut(t,e){return t.has(e)||t.set(e,new Nt),t.get(e)}const Bt=["","X","Y","Z"],Ht=["translate","scale","rotate","skew"],N={x:"translateX",y:"translateY",z:"translateZ"},at={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Kt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:at,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:w},skew:at},I=new Map,et=t=>`--motion-${t}`,U=["x","y","z"];Ht.forEach(t=>{Bt.forEach(e=>{U.push(t+e),I.set(et(t+e),Kt[t])})});const Wt=(t,e)=>U.indexOf(t)-U.indexOf(e),Gt=new Set(U),vt=t=>Gt.has(t),Xt=(t,e)=>{N[e]&&(e=N[e]);const{transforms:n}=gt(t);Pt(n,e),t.style.transform=Yt(n)},Yt=t=>t.sort(Wt).reduce(Zt,"").trim(),Zt=(t,e)=>`${t} ${e}(var(${et(e)}))`,Z=t=>t.startsWith("--"),ot=new Set;function Qt(t){if(!ot.has(t)){ot.add(t);try{const{syntax:e,initialValue:n}=I.has(t)?I.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const G=(t,e)=>document.createElement("div").animate(t,e),ct={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{G({opacity:[1]})}catch{return!1}return!0},finished:()=>!!G({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{G({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},X={},D={};for(const t in ct)D[t]=()=>(X[t]===void 0&&(X[t]=ct[t]()),X[t]);const Jt=.015,te=(t,e)=>{let n="";const i=Math.round(e/Jt);for(let s=0;s<i;s++)n+=t(tt(0,i-1,s))+", ";return n.substring(0,n.length-2)},lt=(t,e)=>O(t)?D.linearEasing()?`linear(${te(t,e)})`:m.easing:mt(t)?ee(t):t,ee=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function ne(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const ie=t=>Array.isArray(t)?t:[t];function Q(t){return N[t]&&(t=N[t]),vt(t)?et(t):t}const V={get:(t,e)=>{e=Q(e);let n=Z(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=I.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=Q(e),Z(e)?t.style.setProperty(e,n):t.style[e]=n}};function Tt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function se(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||w;const s=t[t.length-1];if($t(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=a=>a+r)}return i}function re(){return window.__MOTION_DEV_TOOLS_RECORD}function ae(t,e,n,i={},s){const r=re(),a=i.record!==!1&&r;let o,{duration:d=m.duration,delay:y=m.delay,endDelay:S=m.endDelay,repeat:f=m.repeat,easing:l=m.easing,persist:h=!1,direction:q,offset:L,allowWebkitAcceleration:g=!1}=i;const j=gt(t),P=vt(e);let A=D.waapi();P&&Xt(t,e);const p=Q(e),F=Ut(j.values,p),v=I.get(p);return Tt(F.animation,!(Y(l)&&F.generator)&&i.record!==!1),()=>{const k=()=>{var c,R;return(R=(c=V.get(t,p))!==null&&c!==void 0?c:v==null?void 0:v.initialValue)!==null&&R!==void 0?R:0};let u=ne(ie(n),k);const nt=se(u,v);if(Y(l)){const c=l.createAnimation(u,e!=="opacity",k,p,F);l=c.easing,u=c.keyframes||u,d=c.duration||d}if(Z(p)&&(D.cssRegisterProperty()?Qt(p):A=!1),P&&!D.linearEasing()&&(O(l)||M(l)&&l.some(O))&&(A=!1),A){v&&(u=u.map(b=>z(b)?v.toDefaultUnit(b):b)),u.length===1&&(!D.partialKeyframes()||a)&&u.unshift(k());const c={delay:C.ms(y),duration:C.ms(d),endDelay:C.ms(S),easing:M(l)?void 0:lt(l,d),direction:q,iterations:f+1,fill:"both"};o=t.animate({[p]:u,offset:L,easing:M(l)?l.map(b=>lt(b,d)):void 0},c),o.finished||(o.finished=new Promise((b,Dt)=>{o.onfinish=b,o.oncancel=Dt}));const R=u[u.length-1];o.finished.then(()=>{h||(V.set(t,p,R),o.cancel())}).catch(ft),g||(o.playbackRate=1.000001)}else if(s&&P)u=u.map(c=>typeof c=="string"?parseFloat(c):c),u.length===1&&u.unshift(parseFloat(k())),o=new s(c=>{V.set(t,p,nt?nt(c):c)},u,Object.assign(Object.assign({},i),{duration:d,easing:l}));else{const c=u[u.length-1];V.set(t,p,v&&z(c)?v.toDefaultUnit(c):c)}return a&&r(t,e,u,{duration:d,delay:y,easing:l,repeat:f,offset:L},"motion-one"),F.setAnimation(o),o}}const oe=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function ce(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const le=t=>t(),wt=(t,e,n=m.duration)=>new Proxy({animations:t.map(le).filter(Boolean),duration:n,options:e},de),ue=t=>t.animations[0],de={get:(t,e)=>{const n=ue(t);switch(e){case"duration":return t.duration;case"currentTime":return C.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(fe)).catch(ft)),t.finished;case"stop":return()=>{t.animations.forEach(i=>Tt(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=C.ms(n);case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},fe=t=>t.finished;function he(t,e,n){return O(t)?t(e,n):t}function me(t){return function(n,i,s={}){n=ce(n);const r=n.length,a=[];for(let o=0;o<r;o++){const d=n[o];for(const y in i){const S=oe(s,y);S.delay=he(S.delay,o,r);const f=ae(d,y,i[y],S,t);a.push(f)}}return wt(a,s,s.duration)}}const pe=me(yt);function ye(t,e={}){return wt([()=>{const n=new yt(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function ge(t,e,n){return(O(t)?ye:pe)(t,e,n)}const ve=document.querySelector(".highscore"),T=document.querySelector("span"),Te=document.querySelector(".play"),we=(t,e)=>t===e,Se=()=>J.length===E.join("").length,J=[];let B,H=0,St,E,bt,$;window.onload=async()=>{const t=new Lt;xe(),t.stop()};Te.addEventListener("click",async t=>{t.preventDefault(),K.removeMenu(),K.startTimer(),bt=await K.startGame(),Ee(),$=new qt,Pe(),Ae()});function be(){ge("#time",{x:[0,-25,0,25,0,-25,0,25,0],color:["red","#808080"]},{duration:.5})}async function xe(){const t=Array.from(await Ot());t.sort((e,n)=>n.score-e.score),t.forEach((e,n)=>{const i=document.createElement("div");i.classList.add("user"),i.classList.add(`user__${n+1}`),i.innerHTML=`
    <p>${e.name}</p>
    <p>${e.score}</p>
   `,ve.appendChild(i)})}function Ee(){E=Array.from(bt),B=E[H],qe()}function xt(t){we(t.key,B)?(Oe(),H++,B=E[H]):t.key!=="Shift"&&be(),Se()&&(De(),Le())}function Ae(){document.addEventListener("keydown",xt)}function De(){document.removeEventListener("keydown",xt)}function Me(t){return`<span class="currentChar">${t.join("")}</span>`}function Oe(){J.push(B),T.textContent="";const t=E.join("").slice(H+1),e=Me(J);T.innerHTML=`${e}`+t}function qe(){T.textContent=E.join("")}function Le(){$.stop(),clearInterval(St);const t=Math.round($.getTime()/1e3),e=Math.floor(E.join(" ").length/5/(t/60));document.getElementById("time").innerText=`WPM: ${e}`,e<=60&&(T.innerText="Thats really bad..."),e>=61&&e<=89&&(T.innerText="You can do better..."),e>=90&&e<=110&&(T.innerText="Alright..."),e>=111&&e<=129&&(T.innerText="Thats really good!"),e>=130&&(T.innerText="wow!!!")}function Pe(){$.start(),St=setInterval(()=>{const t=Math.round($.getTime()/1e3);document.getElementById("time").innerText=t},100)}const Re=document.querySelector(".app__text"),x=document.querySelector(".mouse__mask");let Et;function _e(){for(let t=0;t<399;t++){const e=document.createElement("p");e.textContent=0,Re.appendChild(e)}Et=document.querySelectorAll(".app__text p")}function Ce(){return"abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random()*26)]}function At(){Et.forEach(t=>{t.textContent=Ce()})}document.addEventListener("mousemove",t=>{x.style.top=t.pageY-2500+"px",x.style.left=t.pageX-2500+"px",x.style.animation="initial"});document.addEventListener("mouseout",()=>{x.style.top="calc(50% - 2500px)",x.style.left="calc(50% - 2500px)",x.style.animation="maskSpin 10s infinite linear forwards",x.style.animationDelay="5s"});_e();At();setInterval(()=>{At()},1e3);
