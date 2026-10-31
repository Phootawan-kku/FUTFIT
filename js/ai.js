/* FUTFIT / ai.js: CPU player and goalkeeper decision making */
/* AI */
function go(p,tx,ty,ar=26,sp=1){const dx=tx-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);if(d<3){p.dx=p.dy=0;return}const k=Math.min(1,d/ar);p.dx=dx/d*k;p.dy=dy/d*k;p.mx=BASE*C(p.team).spd*sp}
function carry(p,dt,c){p.hold+=dt;const gx=goalX(p.team),dg=Math.hypot(gx-p.x,CY-p.y);let ox=0,oy=0,nd=1e9;
P.forEach(o=>{if(o.team!==p.team){const dx=p.x-o.x,dy=p.y-o.y,l=Math.hypot(dx,dy)||1;nd=Math.min(nd,l);if(l<95){ox+=dx/l*(95-l)/95;oy+=dy/l*(95-l)/95}}});
let tx=gx-p.x,ty=CY-p.y,l=Math.hypot(tx,ty)||1;tx/=l;ty/=l;let mx=tx+ox*1.5,my=ty+oy*1.5;l=Math.hypot(mx,my)||1;p.dx=mx/l;p.dy=my/l;p.mx=BASE*c.spd*.95;
if(p.think<=0){p.think=c.rt+.05+Math.random()*.1;if(nd<56&&p.sk<=0&&c.rt<.15&&Math.random()<.3){doSkill(p,['step','roul','roll'][Math.random()*3|0]);return}if(dg<760+c.sh*120&&Math.random()<c.sh*.8*(dg<450?1:.3))return botShoot(p,c);
if((nd<62&&p.hold>.35)||p.hold>2.5){const t=bestPass(p);if(t&&Math.random()<.8)pass(p,t)}}}
function gk(p,dt,c){const t=p.team,g0=ownX(t),iw=dirOf(t);
if(owner===p){p.hold+=dt;p.dx=p.dy=0;if(p.hold>.9){const r=bestPass(p);r?pass(p,r):kick(p,iw,(Math.random()-.5)*.8,700)}return}
p.mx=BASE*(.85+.4*c.gk);if(!owner&&p.dive<=0&&ball.vx*iw<-300&&dist(ball,p)<95&&Math.abs(ball.y-p.y)>10){p.dive=.55;p.dsd=ball.y>p.y?1:-1;p.vy+=p.dsd*240}let ty=CY+(ball.y-CY)*.4;
if(!owner&&ball.vx*iw<-80){const tt=(g0+iw*14-ball.x)/ball.vx;if(tt>0&&tt<1.3)ty=ball.y+ball.vy*tt}
ty=clamp(ty+(1-c.gk)*Math.sin(el*5)*26,CY-GH+8,CY+GH-8);let tx=g0+iw*24;
if(!owner&&Math.abs(ball.x-g0)<200&&Math.hypot(ball.vx,ball.vy)<280&&dist(ball,p)<190){tx=ball.x;ty=ball.y}
go(p,tx,ty,14)}
function ai(p,dt){const t=p.team,d=dirOf(t),c=C(t);p.mx=BASE*c.spd;p.recv-=dt;p.think-=dt;
if(p.lunge>0)return;if(p.role==='GK')return gk(p,dt,c);if(owner===p)return carry(p,dt,c);
if(p.recv>0&&!owner){go(p,ball.x+ball.vx*.25,ball.y+ball.vy*.25,10,1.08);return}
const have=owner&&owner.team===t;
if(!have&&ch[t]===p){const tg=owner||ball;go(p,tg.x+(tg.vx||0)*.2,tg.y+(tg.vy||0)*.2,12,1.05);
if(owner&&dist(p,owner)<44&&p.lcd<=0&&Math.random()<dt*c.tk*.8){const l=dist(p,owner)||1;p.fx=(owner.x-p.x)/l;p.fy=(owner.y-p.y)/l;p.lunge=.25;p.lcd=1.3}return}
if(have){const a={FW:320,MF:180,DF:40}[p.role];go(p,clamp(owner.x+d*a,X0+40,X0+PW-40),clamp(Y0+p.hy*PH+(owner.y-CY)*.3,Y0+30,Y0+PH-30),30,.95)}
else{const h=hx(p);go(p,h+(ball.x-h)*(p.role==='DF'?.22:.38),Y0+p.hy*PH+(ball.y-CY)*.3,30,.9)}}
