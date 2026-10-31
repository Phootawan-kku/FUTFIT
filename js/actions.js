/* FUTFIT / actions.js: Kicks, passes, shots, shot statistics and aim assist */
/* kicks */
function kick(p,dx,dy,sp,sh=0){owner=null;ball.air=0;ball.hot=sh;p.kk=.3;if(sh)shotStat(p,dx,dy);S.lastK=p;ball.vx=dx*sp;ball.vy=dy*sp;ball.x=p.x+dx*(R+BR);ball.y=p.y+dy*(R+BR);p.cd=.4;charge=0;snd(120+sp*.08,.09,'triangle',Math.min(.2,.06+sp/6000),60);snd(1800,.02,'square',.025);if(sp>560)shake=Math.max(shake,3)}
function pass(p,t,m=0,mu=1){ST.ps[p.team]++;ball.pBy=p;const d=dirOf(p.team),tx=t.x+t.vx*.4+(m===1?d*90:0),ty=t.y+t.vy*.4,dx=tx-p.x,dy=ty-p.y,l=Math.hypot(dx,dy)||1,e=p.team?(Math.random()-.5)*.1:0,a=Math.atan2(dy,dx)+e;kick(p,Math.cos(a),Math.sin(a),Math.min(m===2?1150:1000,l*(m===2?1.5:1.35)+(m===1?130:90))*mu);if(m===2){ball.air=Math.min(1.4,l/380+.3);ball.a0=ball.air}t.recv=1.4;if(p.team===0){S.pend=t;S.pendT=2.5}}
function bestPass(p,ix,iy,mxd=900,as=1){const d=dirOf(p.team);let best=null,bs=-9;P.forEach(t=>{if(t.team!==p.team||t===p||t.role==='GK')return;const dx=t.x-p.x,dy=t.y-p.y,l=Math.hypot(dx,dy);if(l<70||l>mxd)return;let s;if(ix!=null){const cs=(dx*ix+dy*iy)/l;if(cs<(as===2?.05:.4))return;s=cs*2-l/700}else s=dx*d/380-l/600;let m=1e9;P.forEach(o=>{if(o.team!==p.team)m=Math.min(m,dist(o,t))});if(m<48)s-=as===2?1.5:.9;if(s>bs){bs=s;best=t}});return ix!=null||bs>-.35?best:null}
function botShoot(p,c){const gx=goalX(p.team),k=P.find(o=>o.team!==p.team&&o.role==='GK'),side=(k.y>CY?-1:1)*(Math.random()<.8?1:-1),ty=CY+side*(GH-14)*(.55+Math.random()*.45),a=Math.atan2(ty-p.y,gx-p.x)+(Math.random()-.5)*2*c.aim;kick(p,Math.cos(a),Math.sin(a),600+Math.random()*320*c.sh,1)}
function aimInfo(p,a){const as=S.assist,gx=X0+PW,dx=gx-p.x;if(!as||dx<60)return null;const dg=Math.hypot(dx,CY-p.y);if(dg>1500)return null;
const lim=as===2?1.5:1.05,ga=Math.atan2(CY-p.y,dx);if(Math.abs(Math.atan2(Math.sin(ga-a),Math.cos(ga-a)))>lim)return null;
const k=P.find(o=>o.team===1&&o.role==='GK'),opp=P.filter(o=>o.team===1&&o.role!=='GK');let best=null,bs=-1e9;
for(let i=-4;i<=4;i++){const ty=CY+i/4*(GH-12),ang=Math.atan2(ty-p.y,dx);let s=Math.min(260,Math.abs(k.y-ty))*1.1;const ux=Math.cos(ang),uy=Math.sin(ang),L=Math.hypot(dx,ty-p.y);
for(const o of opp){const t=clamp((o.x-p.x)*ux+(o.y-p.y)*uy,0,L),d=Math.hypot(p.x+ux*t-o.x,p.y+uy*t-o.y);if(d<34)s-=(34-d)*5}
s-=Math.abs(Math.atan2(Math.sin(ang-a),Math.cos(ang-a)))*90;if(s>bs){bs=s;best={ty,ang}}}
return best}
function aimAngle(p,a){const r=aimInfo(p,a);if(!r)return a;const da=Math.atan2(Math.sin(r.ang-a),Math.cos(r.ang-a));return a+da*(S.assist===2?.97:.8)}
function shotStat(p,dx,dy){ST.sh[p.team]++;ball.sot=0;const gx=goalX(p.team),sg=dirOf(p.team);if(dx*sg>.05){const yl=p.y+dy/dx*(gx-p.x);if(Math.abs(yl-CY)<GH){ST.sot[p.team]++;ball.sot=1;ball.sotT=p.team}}}
