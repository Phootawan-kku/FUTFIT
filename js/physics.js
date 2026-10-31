/* FUTFIT / physics.js: Player movement and ball physics */
/* movement */
function move(p,dt){let tx=p.dx*p.mx,ty=p.dy*p.mx;const sp0=Math.hypot(p.vx,p.vy),tl=Math.hypot(tx,ty);let a=dt*(tl>1?11:15);if(tl>1&&sp0>60){const dt2=(p.vx*tx+p.vy*ty)/(sp0*tl);a*=.7+.3*clamp((dt2+1)/2,0,1)}a=Math.min(1,a);
if(p.lunge>0){p.lunge-=dt;tx=p.fx*330;ty=p.fy*330;a=Math.min(1,dt*5)}
p.vx+=(tx-p.vx)*a;p.vy+=(ty-p.vy)*a;p.x=clamp(p.x+p.vx*dt,X0+R,X0+PW-R);p.y=clamp(p.y+p.vy*dt,Y0+R,Y0+PH-R);
const sp=Math.hypot(p.vx,p.vy);
if((sp>25||(p===act&&(p.dx||p.dy)))&&p.lunge<=0&&!(p.sk>0&&p.skT!=='rain')){const cur=Math.atan2(p.fy,p.fx),ta=(p===act&&(p.dx||p.dy))?Math.atan2(p.dy,p.dx):Math.atan2(p.vy,p.vx),da=Math.atan2(Math.sin(ta-cur),Math.cos(ta-cur)),n=cur+da*Math.min(1,dt*(p===act?22:16));p.fx=Math.cos(n);p.fy=Math.sin(n)}
p.ph+=sp*dt/(4*(3+5*Math.min(1,sp/190)));p.cd-=dt;p.lcd-=dt;p.kk-=dt;p.tkw-=dt;p.sk-=dt;p.inv-=dt;p.dive-=dt}
/* ball */
function take(p){owner=p;if(ball.pBy){if(ball.pBy.team===p.team&&ball.pBy!==p)ST.pc[p.team]++;ball.pBy=null}if(p.role!=='GK')ball.sot=0;ball.hot=0;S.pend=null;ball.air=0;p.hold=0;p.recv=0;ball.vx=ball.vy=0;if(p.team===0)act=p}
function deflect(p,f){const dx=ball.x-p.x,dy=ball.y-p.y,l=Math.hypot(dx,dy)||1,nx=dx/l,ny=dy/l,dot=ball.vx*nx+ball.vy*ny;p.cd=.45;if(dot>=0)return;ball.vx=(ball.vx-2*dot*nx)*f+(Math.random()-.5)*140;ball.vy=(ball.vy-2*dot*ny)*f+(Math.random()-.5)*140;ball.x=p.x+nx*(R+BR+3);ball.y=p.y+ny*(R+BR+3);snd(130,.12,'square',.07,60)}
function contacts(){if(owner)return;const sp=Math.hypot(ball.vx,ball.vy);
for(const p of P){if(p.cd>0||(ball.air>0&&p.recv<=0&&p.role!=='GK'))continue;if(dist(ball,p)>R+BR+(p.role==='GK'?11:3))continue;
if(p.role==='GK'){if(ball.sot&&ball.sotT!==p.team){ST.sv[p.team]++;ball.sot=0}if(sp<330||Math.random()<C(p.team).gk*(sp>600?.5:.72))take(p);else deflect(p,.55)}
else if(sp<500)take(p);else deflect(p,.5);break}}
function walls(){const b=ball;if(b.y<Y0+BR){b.y=Y0+BR;b.vy=Math.abs(b.vy)*.7}if(b.y>Y0+PH-BR){b.y=Y0+PH-BR;b.vy=-Math.abs(b.vy)*.7}
for(const s of[0,1]){const ln=s?X0+PW:X0,sg=s?1:-1,o=(b.x-ln)*sg,inM=Math.abs(b.y-CY)<GH-2;
if(o>0){if(b.y<CY-GH+BR){b.y=CY-GH+BR;b.vy=Math.abs(b.vy)*.3}if(b.y>CY+GH-BR){b.y=CY+GH-BR;b.vy=-Math.abs(b.vy)*.3}if(o>GD-BR){b.x=ln+sg*(GD-BR);b.vx=-sg*Math.abs(b.vx)*.25}}
else if(o>-BR&&!inM){b.x=ln-sg*BR;b.vx=-sg*Math.abs(b.vx)*.7}
for(const k of[-1,1]){const px=ln,py=CY+k*GH,dx=b.x-px,dy=b.y-py,l=Math.hypot(dx,dy);if(l<BR+4&&l>0){const nx=dx/l,ny=dy/l,dot=b.vx*nx+b.vy*ny;if(dot<0){b.vx-=1.7*dot*nx;b.vy-=1.7*dot*ny;snd(900,.06,'square',.04)}b.x=px+nx*(BR+4);b.y=py+ny*(BR+4)}}}}
function ballStep(dt,ng){
if(owner){const o=owner,ld=Math.min(1,Math.hypot(o.vx,o.vy)/190)*5,mvf=Math.min(1,Math.hypot(o.vx,o.vy)/60),wb=Math.sin(o.ph*12.566)*3*mvf,skw=o.sk>0?(o.skT==='step'?Math.sin((1-o.sk/o.skd)*12.566)*7:o.skT==='roll'?Math.sin((1-o.sk/o.skd)*Math.PI)*9:0)*o.alt:0,tx=o.x+o.fx*(R+BR-2+wb+ld)-o.fy*skw,ty=o.y+o.fy*(R+BR-2+wb+ld)+o.fx*skw,k=Math.min(1,dt*(22-8*ld/5));ball.x=clamp(ball.x+(tx-ball.x)*k,X0+BR,X0+PW-BR);ball.y=clamp(ball.y+(ty-ball.y)*k,Y0+BR,Y0+PH-BR);ball.vx=o.vx;ball.vy=o.vy}
else{ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;const f=Math.exp(-(ball.hot?.4:1.2)*dt);ball.vx*=f;ball.vy*=f;if(Math.hypot(ball.vx,ball.vy)>1400){const k=1400/Math.hypot(ball.vx,ball.vy);ball.vx*=k;ball.vy*=k}if(Math.hypot(ball.vx,ball.vy)<260)ball.hot=0;if(Math.hypot(ball.vx,ball.vy)<5)ball.vx=ball.vy=0;walls();
if(!ng){if(ball.x<X0-BR)score(1);else if(ball.x>X0+PW+BR)score(0)}}
ball.air=Math.max(0,(ball.air||0)-dt);const sp=Math.hypot(ball.vx,ball.vy);ball.rot+=sp*dt*.12;if(sp>340)trail.push({x:ball.x,y:ball.y,l:.22})}
