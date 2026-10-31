/* FUTFIT / tournament.js: Cup tournament bracket and progression */
const TEAMS=[['Rovers FC',['#ffd24a','#a87800']],['Atlas United',['#a78bfa','#5b34c9']],['Nova City',['#5eead4','#0f766e']],['Iron Wolves',['#94a3b8','#334155']],['Solar SC',['#fb923c','#c2410c']],['Tide FC',['#34d399','#047857']],['Crimson Hawks',DEFC]],DK=['easy','medium','hard','impossible'],RN=['Quarter-final','Semi-final','Final'];
let TR=null;
const tourDiff=()=>DK[Math.min(3,Math.max(0,DK.indexOf(CFG.diff))+TR.r)];
function newTour(){TR={r:0,slots:['You',...TEAMS.map(t=>t[0]).sort(()=>Math.random()-.5)],hist:[],over:0}}
function tourScreen(){if(!TR||TR.over)newTour();S.mode='menu';const s=TR.slots,m=[];for(let i=0;i<s.length;i+=2)m.push([s[i],s[i+1]]);
ov(`<div class="card"><h1 style="font-size:46px">FUTFIT <span>Cup</span></h1><div class="msg">${RN[TR.r]} \u00b7 ${DF[tourDiff()].n} opposition</div><div class="bk">${m.map(x=>`<div class="mt ${x[0]==='You'?'me':''}"><b>${x[0]}</b><i>vs</i><b>${x[1]}</b></div>`).join('')}</div>${TR.hist.length?`<div class="hist">${TR.hist.slice(-6).map(h=>`<div>${h}</div>`).join('')}</div>`:''}<button class="go" data-a="tplay">Play match</button><button class="go ghost" data-a="menu">Menu</button></div>`)}
function tourPlay(){if(!TR||TR.over)return;const o=TR.slots[1];S.tour=1;S.diff=tourDiff();S.oppName=o;COL[1]=(TEAMS.find(t=>t[0]===o)||[0,DEFC])[1];start()}
function tourEnd(h,t,sub){ov(`<div class="card"><div class="res" style="${h==='Champions!'?'color:var(--ac)':''}">${h}</div><p class="sub">${sub}</p><button class="go" data-a="tour">New tournament</button><button class="go ghost" data-a="menu">Menu</button></div>`)}
function tourNext(){S.mode='menu';const o=TR.slots[1];TR.hist.push(`${RN[TR.r]}: You ${sc[0]}\u2013${sc[1]} ${o}`);
if(sc[0]<=sc[1]){TR.over=1;return tourEnd('Eliminated',0,`You lost in the ${RN[TR.r].toLowerCase()} to ${o}.`)}
const w=['You'];for(let i=2;i<TR.slots.length;i+=2){const a=TR.slots[i],b=TR.slots[i+1],aw=Math.random()<.5,x=1+(Math.random()*3|0),y=Math.random()*x|0;TR.hist.push(`${RN[TR.r]}: ${a} ${aw?x:y}\u2013${aw?y:x} ${b}`);w.push(aw?a:b)}
if(TR.r===2){TR.over=1;return tourEnd('Champions!',1,'You won the FUTFIT Cup.')}
TR.r++;TR.slots=w;tourScreen()}
