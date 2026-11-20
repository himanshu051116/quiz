
(function(){"use strict";
const questions=[
["If you could choose your boyfriend all over again, would you still choose me? 🥹❤️","Love & commitment"],
["Am I still the person you want to tell first when something exciting or upsetting happens? 🧸","Emotional connection"],
["Do you feel like you can be your real, childish, crazy, unfiltered self around me? 🐻💕","Comfort & authenticity"],
["Even on days when we're not talking much, do you still feel loved by me? 🌙","Emotional security"],
["When you're upset with me, do you still feel safe telling me exactly what's in your heart? 🥺","Trust & communication"],
["Do the tiny things I do for you make you feel as special as the big romantic gestures? 🌷","Feeling appreciated"],
["If we had absolutely nothing to do, would spending an entire day with just me still make you happy? 🫶","Friendship & compatibility"],
["Do you feel that I support your dreams without ever making you feel like you have to choose between them and me? ✨","Support & independence"],
["After our arguments, do you feel that we understand each other a little better? 💞","Conflict resolution & growth"],
["When you imagine your future, does the thought of growing old and being silly together still make you smile? 👴🏻👵🏻❤️","Long-term compatibility"],
["Do you want to love wala love ( ha wahi deep wala love) me now","Question 11"]
];
const total=questions.length,key="dear-us-live-v1";
function read(){try{let x=JSON.parse(localStorage.getItem(key));if(x&&Array.isArray(x.answers)&&x.answers.length===total)return {index:Math.max(0,Math.min(total,x.index||0)),answers:x.answers};}catch(e){}return {index:0,answers:Array(total).fill(null)}}
function save(s){try{localStorage.setItem(key,JSON.stringify(s))}catch(e){}}
function unlocked(){try{return sessionStorage.getItem("dear-us-unlocked")==="yes"||localStorage.getItem("dear-us-unlocked")==="yes"}catch(e){return false}}
function setUnlock(){try{sessionStorage.setItem("dear-us-unlocked","yes");localStorage.setItem("dear-us-unlocked","yes")}catch(e){}}
function gate(){if(location.hash==="#unlocked"){setUnlock();history.replaceState(null,"",location.pathname);return true}if(unlocked())return true;location.replace("unlock.html");return false}
function nav(url){if(matchMedia("(prefers-reduced-motion: reduce)").matches){location.href=url;return}document.body.classList.add("leaving");setTimeout(()=>location.href=url,230)}
document.addEventListener("click",e=>{let a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.download)return;let u=new URL(a.href,location.href);if(u.origin!==location.origin||!u.pathname.endsWith(".html"))return;e.preventDefault();nav(u.href)});
addEventListener("pageshow",()=>document.body.classList.remove("leaving"));
let page=document.body.dataset.page;
if(page==="unlock"){
 const form=document.getElementById("password-form"),inp=document.getElementById("password"),err=document.getElementById("password-error"),show=document.getElementById("show-password");
 show.onclick=()=>{inp.type=inp.type==="password"?"text":"password";show.textContent=inp.type==="text"?"Hide":"Show"};
 form.onsubmit=e=>{e.preventDefault();if(inp.value.trim().replace(/\s+/g," ").toLowerCase()==="i love you"){setUnlock();nav("quiz.html#unlocked")}else{err.textContent="Not quite. Try again ♡";inp.select();inp.focus()}};
 inp.oninput=()=>err.textContent="";
}
if(page==="quiz"&&gate()){
 const $=id=>document.getElementById(id),s=read(),reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 let changing=false,dodges=0,blockedUntil=0,lastDodge=0,popupStart=null,popupEnd=null;
 if(s.index>=total){nav("results.html#unlocked");return}
 function draw(){
 if(s.index>=total){save(s);nav("results.html#unlocked");return}
 let i=s.index;
 $("question").textContent=questions[i][0];$("category").textContent=questions[i][1];
 $("count").textContent=String(i+1).padStart(2,"0")+" / 11";
 $("number").textContent="Question "+String(i+1).padStart(2,"0");
 $("progress").style.width=((i+1)/total*100)+"%";
 $("prev").disabled=i===0;$("next").hidden=!s.answers[i];
 $("button-stage").classList.toggle("prank",i===10);
 $("no").style.left="";$("no").style.top="";
 save(s)
 }
 function step(fn){if(changing)return;changing=true;$("quiz-card").classList.add("switching");setTimeout(()=>{fn();draw();$("quiz-card").classList.remove("switching");changing=false},reduced?0:170)}
 function answer(a){if(changing||$("popup").classList.contains("show"))return;if(s.index===10&&a==="No"){dodge();return}step(()=>{s.answers[s.index]=a;s.index++})}
 function donePopup(){clearTimeout(popupStart);clearTimeout(popupEnd);$("popup").classList.remove("show","hide");$("popup").setAttribute("aria-hidden","true")}
 function closePopup(){if(!$("popup").classList.contains("show"))return;$("popup").classList.add("hide");clearTimeout(popupStart);clearTimeout(popupEnd);popupEnd=setTimeout(donePopup,reduced?0:290)}
 function pop(){clearTimeout(popupStart);clearTimeout(popupEnd);$("popup").classList.remove("hide");$("popup").classList.add("show");$("popup").setAttribute("aria-hidden","false");popupStart=setTimeout(closePopup,reduced?1650:1660)}
 function dodge(){if(s.index!==10||changing||Date.now()-lastDodge<180)return;lastDodge=Date.now();
 const stage=$("button-stage"),no=$("no"),w=Math.max(0,stage.clientWidth-no.offsetWidth),h=Math.max(0,stage.clientHeight-no.offsetHeight);
 const positions=[[.05,.95],[.92,.92],[.55,.67],[0,.74],[1,.4],[.38,.95]],at=positions[dodges++%positions.length];
 no.style.left=Math.round(w*at[0])+"px";no.style.top=Math.round(h*at[1])+"px";blockedUntil=Date.now()+700;pop();
 }
 $("yes").onclick=()=>answer("Yes");
 $("no").addEventListener("pointerdown",e=>{if(s.index===10){e.preventDefault();dodge()}});
 $("no").addEventListener("click",e=>{if(s.index===10){e.preventDefault();if(Date.now()>blockedUntil)dodge()}else answer("No")});
 $("no").addEventListener("keydown",e=>{if(s.index===10&&(e.key==="Enter"||e.key===" ")){e.preventDefault();dodge()}});
 $("prev").onclick=()=>step(()=>{s.index=Math.max(0,s.index-1)});
 $("next").onclick=()=>step(()=>{s.index=Math.min(total,s.index+1)});
 $("popup").onclick=closePopup;
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closePopup()});
 draw()
}
if(page==="results"&&gate()){
 let s=read();if(s.index<total){location.replace("quiz.html#unlocked");return}
 const out=document.getElementById("answers");questions.forEach((q,i)=>{let row=document.createElement("div");row.className="answer-row";let n=document.createElement("span");n.className="n";n.textContent=String(i+1).padStart(2,"0");let text=document.createElement("span");text.className="q";text.textContent=q[0];let a=document.createElement("span");a.className="a"+(s.answers[i]==="No"?" negative":"");a.textContent=s.answers[i]||"—";row.append(n,text,a);out.append(row)});
 document.getElementById("restart").onclick=()=>{save({index:0,answers:Array(total).fill(null)});nav("quiz.html#unlocked")};
 document.getElementById("share").onclick=async()=>{let t="dear, us. ♡\n\n"+questions.map((q,i)=>(i+1)+". "+q[0]+"\n"+(s.answers[i]||"—")).join("\n\n");try{if(navigator.share){await navigator.share({title:"dear, us. ♡",text:t});return}if(navigator.clipboard&&isSecureContext){await navigator.clipboard.writeText(t);document.getElementById("message").textContent="Answers copied ♡";return}}catch(e){if(e.name==="AbortError")return}let box=document.createElement("textarea");box.value=t;box.style.cssText="position:fixed;inset:20%;z-index:20";document.body.append(box);box.select();document.getElementById("message").textContent="Copy your answers from the selected text";};
}
})();