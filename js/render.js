/* FUTFIT / render.js: Rendering: players, ball, HUD, minimap and the full scene */
/* draw */
const SKIN=['#f1c9a5','#d9a273','#a8734a','#7a4e32'],HAIR=['#1b1410','#3a2416','#7a5230','#c9a24a','#111'];
/* ===== animation v2 + skill moves ===== */
const smooth=t=>t*t*(3-2*t);
function footAt(t,A,lh){t=((t%1)+1)%1;if(t<.5)return[A-(t/.5)*2*A,0];const u=(t-.5)/.5;return[-A+2*A*smooth(u),Math.sin(Math.PI*u)*lh]}
function sprite(p){
const gk=p.role==='GK',[c1,c2]=gk?[GKC[p.team],'#7a5200']:COL[p.team],[sx,sy,u]=pj(p.x,p.y),sp=Math.hypot(p.vx,p.vy),run=Math.min(1,sp/190),mv=clamp(sp/24,0,1),A=mv*(3+5*run),T=performance.now()/1000,skn=SKIN[p.id%4],hr=HAIR[(p.id*3+p.team)%5];
let fx=p.fx,fy=p.fy;const st=p.sk>0?p.skT:'',q=st?1-p.sk/p.skd:0;
if(st==='roul'){const a=Math.atan2(fy,fx)+q*6.283*p.alt;fx=Math.cos(a);fy=Math.sin(a)}
const sl=p.lunge>0,pr=sl?1-p.lunge/.25:0,env=sl?Math.min(1,pr*6,(1-pr)*6):0,dv=p.dive>0,dq=dv?1-p.dive/.55:0,cel=S.mode==='goal'&&p.team===S.scorer,kq=p.kk>0?1-p.kk/.3:-1,tk=p.tkw>0,hd=fx>=0?1:-1,lat=Math.abs(fx),fr=fy>.35,bk=fy<-.35,tw=3.6+2*(1-lat),sh=p.team?'#2b303c':'#eef1f8',w=Math.sin(p.ph*6.283),bob=Math.abs(w)*(1+run*.9)*mv+Math.sin(T*2+p.id)*.3*(1-mv)+(cel?Math.abs(Math.sin(T*9+p.id))*4:0);
g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(sx+2*u,sy,8*u,3.2*u,0,0,7);g.fill();
g.save();g.translate(sx,sy);g.scale(u,u);g.lineCap='round';
if(sl){g.translate(hd*7*env,-env);g.rotate(-hd*1.3*env)}
if(dv){const e=Math.sin(Math.min(1,dq*1.3)*Math.PI/2);g.translate(0,-Math.sin(dq*Math.PI)*5);g.rotate(p.dsd*1.35*e)}
for(let i=0;i<2;i++){const s=i?1:-1,hxp=s*1.8*(1-lat*.5);let off,lift,dep=0;
if(st==='step'){const z=Math.sin(q*12.566+i*3.14);off=z*6*fx;lift=Math.max(0,z)*3.5}
else if(st==='rain'&&!i){off=-fx*4;lift=q<.6?8*Math.sin(q/.6*Math.PI):0}
else if(st==='roll'&&i){off=fx*5;lift=2.2;dep=fy*2}
else if(kq>=0&&i){off=(kq<.4?-6*kq/.4:-6+16*smooth(Math.min(1,(kq-.4)/.25)))*Math.max(lat,.35)*hd;lift=2.5*Math.sin(Math.min(1,kq/.8)*Math.PI)}
else if(tk&&i){off=fx*9;lift=1.5}
else if(dv||cel){off=0;lift=cel?Math.max(0,Math.sin(T*9+p.id+i))*2:1}
else{const f=footAt(p.ph+i*.5,A,2.2+run*1.8);off=f[0]*fx;lift=f[1];dep=f[0]*fy*.5}
const fpx=s*2.3*(1-lat*.55)+off,fpy=-1.4-lift+dep,top=-6-bob;
g.strokeStyle='#f4f6fb';g.lineWidth=3;g.beginPath();g.moveTo(hxp+(fpx-hxp)*.3,top);g.lineTo(fpx,fpy);g.stroke();g.fillStyle='#12141b';g.beginPath();g.ellipse(fpx+hd*1.3,fpy+.5,2.7,1.5,0,0,7);g.fill()}
g.translate(fx*run*1.8+(st==='step'?Math.sin(q*12.566)*1.4:0)+(kq>=0?(kq<.4?-fx*1.4:fx*1.8*(1-kq)):0),-bob);
g.fillStyle=sh;g.beginPath();g.roundRect(-tw+.3,-12,tw*2-.6,6.4,1.6);g.fill();
const arm=s=>{let hx2=s*(tw+.7)*(1-.6*lat)-w*s*A*.9*fx,hy2=-17-Math.abs(w)*run*2;
if(sl){hx2=-hd*7;hy2=-14}else if(cel||dv){hx2=s*(tw+2.5)*(dv?.6:1);hy2=-37}else if(st==='roul'||st==='rain'){hx2=s*(tw+4.5);hy2=-21}
g.strokeStyle=skn;g.lineWidth=2.3;g.beginPath();g.moveTo(s*tw,-24);g.lineTo(hx2,hy2);g.stroke();g.strokeStyle=c1;g.lineWidth=3.3;g.beginPath();g.moveTo(s*tw,-24);g.lineTo(s*tw+(hx2-s*tw)*.35,-24+(hy2+24)*.35);g.stroke();g.fillStyle=gk?'#fff':skn;g.beginPath();g.arc(hx2,hy2,gk?2:1.5,0,7);g.fill()};
arm(-1);const lg=g.createLinearGradient(-tw,0,tw,0);lg.addColorStop(0,c1);lg.addColorStop(1,c2);g.fillStyle=lg;g.beginPath();g.roundRect(-tw,-26,tw*2,15.5,2.6);g.fill();
if(!fr){g.fillStyle='rgba(255,255,255,.92)';g.font='800 6.5px Inter,sans-serif';g.textAlign='center';g.fillText(NUMS[p.id%11],0,-15.5);g.textAlign='left'}
arm(1);const hx3=hd*lat*1.1+((fr||bk)?clamp((ball.x-p.x)/200,-1,1)*.9:0);g.fillStyle=skn;g.beginPath();g.arc(hx3,-31,3.9,0,7);g.fill();
g.fillStyle=hr;g.beginPath();if(bk)g.arc(hx3,-31,4.1,0,7);else g.arc(hx3,-31.4,4.1,Math.PI,6.283);g.fill();
if(lat>.5){g.beginPath();g.ellipse(hx3-hd*2.6,-30.6,1.7,2.5,0,0,7);g.fill()}
if(fr){g.fillStyle='#222';g.beginPath();g.arc(hx3-1.4,-30.3,.55,0,7);g.fill();g.beginPath();g.arc(hx3+1.4,-30.3,.55,0,7);g.fill()}
g.restore()}
function ball3(){const[bx,by,u]=pj(ball.x,ball.y);let z=BRd;if(ball.air>0&&ball.a0)z+=Math.sin(Math.PI*(1-ball.air/ball.a0))*26;
g.fillStyle=`rgba(0,0,0,${.32-z/140})`;g.beginPath();g.ellipse(bx+u,by,BRd*1.1*u,BRd*.5*u,0,0,7);g.fill();
const y=by-z*u;if(ball.hot){g.fillStyle='rgba(255,210,120,.28)';g.beginPath();g.arc(bx,y,BRd*u*1.9,0,7);g.fill()}g.fillStyle='#fff';g.strokeStyle='#222';g.lineWidth=1;g.beginPath();g.arc(bx,y,BRd*u,0,7);g.fill();g.stroke();g.fillStyle='#222';for(let k=0;k<3;k++){const a=ball.rot+k*2.09;g.beginPath();g.arc(bx+Math.cos(a)*BRd*u*.5,y+Math.sin(a)*BRd*u*.5,BRd*u*.27,0,7);g.fill()}}
function drawHUD(){const gs=Math.min(5400,el/S.len*5400),tm=ot?'90:00+':String(gs/60|0).padStart(2,'0')+':'+String(gs%60|0).padStart(2,'0'),hf=ot?'GOLDEN':el<S.len/2?'1ST':'2ND';
g.fillStyle='rgba(8,14,30,.88)';g.beginPath();g.roundRect(14,14,200,86,10);g.fill();g.fillStyle='#ffb547';g.beginPath();g.roundRect(24,22,24,13,3);g.fill();
g.fillStyle='#1b1200';g.font='800 9px Inter,sans-serif';g.fillText('FF',30,32);g.fillStyle='#cfd8f0';g.font='600 9px Inter,sans-serif';g.fillText('FUTFIT CUP',54,32);g.fillStyle='#ff5a5f';g.fillText('● LIVE',166,32);
[['YOU',sc[0],'#4f8dff'],[S.tour?S.oppName:'CPU · '+DF[S.diff].n,sc[1],'#fff']].forEach((r,i)=>{const y=54+i*20;g.fillStyle=r[2];g.fillRect(24,y-11,3,14);g.fillStyle='#fff';g.font='700 14px Inter,sans-serif';g.fillText(r[0],34,y);g.textAlign='right';g.fillText(r[1],200,y);g.textAlign='left'});
g.fillStyle='#9fb0d6';g.font='600 11px Inter,sans-serif';g.fillText(tm,24,92);g.textAlign='right';g.fillText(hf,200,92);g.textAlign='left';if(act){g.fillStyle='rgba(8,14,30,.88)';g.beginPath();g.roundRect(14,106,150,24,8);g.fill();g.fillStyle='#ffb547';g.font='800 12px Inter,sans-serif';g.fillText('#'+NUMS[act.id%11],24,123);g.fillStyle='#fff';g.font='600 12px Inter,sans-serif';g.fillText(act.role==='GK'?'Goalkeeper':{DF:'Defender',MF:'Midfielder',FW:'Forward'}[act.role],52,123)}}
function mini(){const bx=460,by=590,w=180,h=100,m=x=>bx+8+(x-X0)/PW*(w-16),n=y=>by+8+(y-Y0)/PH*(h-16);g.fillStyle='rgba(8,20,30,.85)';g.beginPath();g.roundRect(bx,by,w,h,8);g.fill();g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=1;g.strokeRect(m(X0),n(Y0),w-16,h-16);g.beginPath();g.moveTo(m(CX),n(Y0));g.lineTo(m(CX),n(Y0+PH));g.stroke();
const vw=1100/ZM/PW*(w-16);g.strokeStyle='rgba(255,255,255,.55)';g.strokeRect(m(cam.x)-vw/2,n(Y0+30),vw,h-26);
P.forEach(p=>{g.fillStyle=p===act?'#fff':COL[p.team][0];g.beginPath();g.arc(m(p.x),n(p.y),p===act?3:2.3,0,7);g.fill()});g.fillStyle='#fff';g.beginPath();g.arc(m(ball.x),n(ball.y),2,0,7);g.fill()}
function draw(){g.setTransform(DPR,0,0,DPR,0,0);g.save();if(shake>0){g.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake=Math.max(0,shake-.6)}
g.fillStyle='#0b1220';g.fillRect(-20,-20,1140,740);
const bt=pj(0,Y0-18,22)[1],hh=Math.max(50,bt+4),off=(cam.x*.45)%1100;const gl=S.mode==='goal',cb=-Math.abs(Math.sin(performance.now()/(gl?110:700)))*(gl?7:1.5);g.drawImage(crowd,-off,cb-4,1100,hh+8);g.drawImage(crowd,1100-off,cb-4,1100,hh+8);
for(let i=0;i<(gl?14:2);i++)if(Math.random()<(gl?.7:.08)){g.fillStyle='rgba(255,255,255,.85)';g.fillRect(Math.random()*1100,Math.random()*Math.max(10,hh-8),2,2)}
g.fillStyle='#14683a';g.fillRect(0,bt+4,1100,700);
for(let i=-3;i<37;i++)quad([[X0+i*100,Y0-18],[X0+i*100+100,Y0-18],[X0+i*100+100,Y0+PH+500],[X0+i*100,Y0+PH+500]],i%2?'#1a8548':'#1f9753');
for(let i=-3;i<30;i++){const x=X0+i*125,a=AD[(i+3)%AD.length],y=Y0-18;quad([[x,y,0],[x+123,y,0],[x+123,y,22],[x,y,22]],a[1]);const m=pj(x+61,y,11);g.fillStyle='rgba(255,255,255,.9)';g.font=`800 ${(8.5*m[2])|0}px Inter,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(a[0],m[0],m[1])}
g.textAlign='left';g.textBaseline='alphabetic';
ln3([[X0,Y0],[X0+PW,Y0],[X0+PW,Y0+PH],[X0,Y0+PH]],4,LC,1);ln3([[CX,Y0],[CX,Y0+PH]],4,LC);ln3(circ(CX,CY,190,0,6.283),4,LC);ln3(circ(CX,CY,3,0,6.283,8),5,LC);
[0,1].forEach(s=>{const sg=s?-1:1,bx=s?X0+PW:X0;ln3([[bx,CY-BYH],[bx+sg*BXD,CY-BYH],[bx+sg*BXD,CY+BYH],[bx,CY+BYH]],4,LC);ln3([[bx,CY-230],[bx+sg*150,CY-230],[bx+sg*150,CY+230],[bx,CY+230]],4,LC);ln3(circ(bx+sg*280,CY,170,s?Math.PI-.79:-.79,s?Math.PI+.79:.79,16),4,LC)});
[0,1].forEach(s=>{const sg=s?1:-1,l=s?X0+PW:X0,bx=l+sg*GD,H=66,a=CY-GH,b=CY+GH;quad([[bx,a,0],[bx,b,0],[bx,b,H],[bx,a,H]],'rgba(255,255,255,.1)');quad([[l,a,H],[bx,a,H],[bx,b,H],[l,b,H]],'rgba(255,255,255,.12)');quad([[l,a,0],[bx,a,0],[bx,a,H],[l,a,H]],'rgba(255,255,255,.08)');quad([[l,b,0],[bx,b,0],[bx,b,H],[l,b,H]],'rgba(255,255,255,.08)');
for(let y=a;y<=b;y+=13)ln3([[bx,y,0],[bx,y,H]],1,'rgba(255,255,255,.25)');for(let z=0;z<=H;z+=11)ln3([[bx,a,z],[bx,b,z]],1,'rgba(255,255,255,.25)');ln3([[l,a,0],[l,a,H],[l,b,H],[l,b,0]],4.5,'#fff')});
const vg=g.createRadialGradient(550,430,120,550,430,720);vg.addColorStop(0,'rgba(255,255,255,.07)');vg.addColorStop(1,'rgba(0,0,0,.42)');g.fillStyle=vg;g.fillRect(0,bt+4,1100,700);
trail.forEach(t=>{const q=pj(t.x,t.y);g.fillStyle=`rgba(255,255,255,${t.l*1.2})`;g.beginPath();g.arc(q[0],q[1]-BRd*q[2],BRd*q[2]*t.l*3,0,7);g.fill()});
if(owner&&owner!==act&&S.mode!=='menu'){const[ox,oy,ou]=pj(owner.x,owner.y);g.strokeStyle='rgba(255,181,71,.85)';g.lineWidth=2;g.beginPath();g.ellipse(ox,oy,10*ou,4*ou,0,0,7);g.stroke()}
if(act&&S.mode!=='menu'){const[ax,ay,au]=pj(act.x,act.y),w=1+Math.sin(performance.now()/180)*.07;g.strokeStyle='rgba(255,255,255,.92)';g.lineWidth=2.6;g.beginPath();g.ellipse(ax,ay,12*au*w,5*au*w,0,0,7);g.stroke()}
const E=P.map(p=>({y:p.y,p}));E.push({y:ball.y+(owner&&owner.y>ball.y?-.1:.1),b:1});E.sort((a,b)=>a.y-b.y).forEach(o=>o.b?ball3():sprite(o.p));
if(act&&S.mode!=='menu'){const[ax,ay,au]=pj(act.x,act.y),y=ay-(act.lunge>0?30:46)*au-8+Math.sin(performance.now()/160)*2.5;g.fillStyle='#3be8a0';g.beginPath();g.moveTo(ax-6,y-6);g.lineTo(ax+6,y-6);g.lineTo(ax,y+4);g.closePath();g.fill();
if(0){const f=clamp(charge/.7,.15,1);g.lineWidth=4;g.lineCap='round';g.strokeStyle=`hsl(${120-f*120},90%,58%)`;g.beginPath();g.ellipse(ax,ay,16*au,7*au,0,-Math.PI/2,-Math.PI/2+f*6.283);g.stroke()}}
parts.forEach(q=>{g.save();g.translate(q.x,q.y);g.rotate(q.r);g.fillStyle=q.c;g.globalAlpha=clamp(q.l,0,1);g.fillRect(-3,-2,6,4);g.restore()});
if(act&&act.sk>0&&S.mode==='play'){const[ax,ay,au]=pj(act.x,act.y),tx=SKN[act.skT],ty=ay-62*au;g.fillStyle='#fff';g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=3;g.font='800 15px Inter,sans-serif';g.textAlign='center';g.strokeText(tx,ax,ty);g.fillText(tx,ax,ty);g.textAlign='left'}
if(S.mode==='play'&&act&&owner===act){const[ax,ay]=pj(act.x,act.y);
const ai2=0;
if(S.pt){const[tx,ty,tu]=pj(S.pt.x,S.pt.y);g.strokeStyle='#ffb547';g.lineWidth=3;g.beginPath();g.ellipse(tx,ty,13*tu,5.5*tu,0,0,7);g.stroke();g.fillStyle='#ffb547';g.beginPath();g.moveTo(tx-5,ty-52*tu);g.lineTo(tx+5,ty-52*tu);g.lineTo(tx,ty-45*tu);g.fill()}
if(charge>0){const a=aimAngle(act,Math.atan2(act.iny||act.fy,act.inx||act.fx)),e=pj(act.x+Math.cos(a)*520,act.y+Math.sin(a)*520);g.setLineDash([8,7]);g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2.5;g.beginPath();g.moveTo(ax,ay);g.lineTo(e[0],e[1]);g.stroke();g.setLineDash([])}}
{const gm=charge>0?{f:clamp(charge/.7,.1,1),n:'SHOOT'}:pc.m>=0?{f:clamp(pc.t/.7,.1,1),n:['PASS','THROUGH','LOB'][pc.m]}:null;
if(gm&&act&&S.mode==='play'){const[ax,ay,au]=pj(act.x,act.y),bw=78,bx=ax-bw/2,by=ay+16*au+6;g.fillStyle='rgba(8,14,30,.78)';g.beginPath();g.roundRect(bx-3,by-3,bw+6,13,7);g.fill();const gr=g.createLinearGradient(bx,0,bx+bw,0);gr.addColorStop(0,'#3be8a0');gr.addColorStop(.6,'#ffd24a');gr.addColorStop(1,'#ff5a5f');g.fillStyle=gr;g.beginPath();g.roundRect(bx,by,bw*gm.f,7,4);g.fill();g.fillStyle='#fff';g.font='700 10px Inter,sans-serif';g.textAlign='center';g.fillText(gm.n+' '+Math.round(gm.f*100)+'%',ax,by+22);g.textAlign='left'}}
if(performance.now()-(S.camAt||-9e9)<1600){g.fillStyle='rgba(8,14,30,.82)';g.beginPath();g.roundRect(440,16,220,34,17);g.fill();g.fillStyle='#fff';g.font='700 15px Inter,sans-serif';g.textAlign='center';g.fillText('Camera · '+CAMS[S.cam][0],550,38);g.textAlign='left'}
g.restore();drawHUD();mini()}
