/* FUTFIT / config.js: Settings, constants, teams data, shared game state */
const $=s=>document.querySelector(s),cv=$('#c'),g=cv.getContext('2d');
const X0=50,Y0=40,PW=3200,PH=2000,CX=X0+PW/2,CY=Y0+PH/2,GH=120,GD=42,R=13,BR=6.5,BASE=152,BXD=400,BYH=440;
const DF={easy:{n:'Easy',l:1,spd:.8,aim:.3,tk:.7,gk:.4,rt:.35,sh:.5,d:'Relaxed rival. Learn the moves.'},medium:{n:'Medium',l:2,spd:.93,aim:.16,tk:1.3,gk:.62,rt:.2,sh:.7,d:'A fair, balanced match.'},hard:{n:'Hard',l:3,spd:1.04,aim:.07,tk:2.3,gk:.82,rt:.1,sh:.88,d:'Fast, sharp and clinical.'},impossible:{n:'Impossible',l:4,spd:1.18,aim:.015,tk:3.6,gk:.95,rt:.04,sh:1,d:'Only legends win here.'}};
const ALLY={spd:.97,aim:.1,tk:2,gk:.7,rt:.18,sh:.8};
const FORM=[[.04,.5,'GK'],[.18,.15,'DF'],[.17,.38,'DF'],[.17,.62,'DF'],[.18,.85,'DF'],[.34,.12,'MF'],[.32,.38,'MF'],[.32,.62,'MF'],[.34,.88,'MF'],[.46,.35,'FW'],[.46,.65,'FW']];
const COL=[['#6fa3ff','#1f4fd0'],['#ff7a7e','#b91c2c']],GKC=['#fbbf24','#34d399'];
const C=t=>t?DF[S.diff]:ALLY,dirOf=t=>t?-1:1,goalX=t=>t?X0:X0+PW,ownX=t=>t?X0+PW:X0,hx=p=>p.team?X0+PW-p.hx*PW:X0+p.hx*PW;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const CFG=(()=>{const d={vol:.7,mute:0,shake:(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)?0:1,diff:'medium',len:120,assist:1,cam:0};try{const s=JSON.parse(localStorage.getItem('futfit')||'{}');for(const k in d)if(typeof s[k]===typeof d[k])d[k]=s[k]}catch(e){}if(!DF[d.diff])d.diff='medium';if(![60,120,180].includes(d.len))d.len=120;d.assist=clamp(d.assist|0,0,2);d.cam=clamp(d.cam|0,0,3);d.vol=clamp(d.vol,0,1);return d})();
function saveCfg(){try{localStorage.setItem('futfit',JSON.stringify(CFG))}catch(e){}}
function pref(){CFG.diff=S.diff;CFG.len=S.len;CFG.assist=S.assist;CFG.cam=S.cam;saveCfg()}
function newStats(){return{sh:[0,0],sot:[0,0],ps:[0,0],pc:[0,0],tk:[0,0],sv:[0,0],poss:[0,0]}}
let ST=newStats(),S={mode:'menu',diff:CFG.diff,len:CFG.len,t:0,kt:0,assist:CFG.assist,cam:CFG.cam},pc={m:-1,t:0},P=[],ball={x:CX,y:CY,vx:0,vy:0,rot:0},owner=null,act=null,sc=[0,0],el=0,ot=false,charge=0,stam=1,lock=0,shake=0,parts=[],trail=[],ch=[null,null],K={};
