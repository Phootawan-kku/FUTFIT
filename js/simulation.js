/* FUTFIT / simulation.js: Per-frame match simulation step */
/* step */
function step(dt){
if(S.mode==='ready'){S.t-=dt;if(S.t<=0){S.mode='play';hide()}return}
if(S.mode==='goal'){S.t-=dt;P.forEach(p=>{p.dx=p.dy=0;if(p.team===S.scorer&&p.role!=='GK'&&S.lastK&&S.lastK.team===S.scorer){const k=S.lastK;if(p===k)go(p,goalX(k.team)-dirOf(k.team)*140,Y0+PH-80,30,.9);else if(dist(p,k)>90)go(p,k.x,k.y,60,.75)}move(p,dt)});ballStep(dt,true);if(S.t<=0){if(S.end)finish();else{place(S.kt);ready()}}return}
if(S.mode!=='play')return;
el+=dt;if(!ot&&el>=S.len){if(sc[0]===sc[1]){ot=true;ov('<div class="big g">Golden goal</div>','mini');whistle();setTimeout(()=>{if(S.mode==='play')hide()},1800)}else{finish();return}}
lock-=dt;S.pendT-=dt;if(charge>0)charge=owner===act?Math.min(.9,charge+dt):0;if(pc.m>=0){if(owner===act)pc.t=Math.min(.9,pc.t+dt);else pc.m=-1}
for(const t of[0,1]){let b=1e9;ch[t]=null;const tg=owner&&owner.team!==t?owner:ball;P.forEach(p=>{if(p.team===t&&p.role!=='GK'&&p!==act){const d=dist(p,tg);if(d<b){b=d;ch[t]=p}}})}
updAct();
if(act&&act.lunge<=0){let mx=(K.ArrowRight?1:0)-(K.ArrowLeft?1:0),my=(K.ArrowDown?1:0)-(K.ArrowUp?1:0);const l=Math.hypot(mx,my);if(l){mx/=l;my/=l}
if(stam<=0)S.tired=1;else if(stam>.2)S.tired=0;const sp=(K.ShiftLeft||K.ShiftRight||K.KeyE)&&l&&stam>0&&!S.tired;stam=clamp(stam+(sp?-.3:.15)*dt,0,1);act.inx=mx;act.iny=my;act.dx=mx;act.dy=my;act.mx=BASE*(sp?1.3:1)*(.82+.18*Math.min(1,stam/.35))*(owner===act?.94:1)*(charge>0?.78:1)}
S.pt=null;if(act&&owner===act&&S.assist){const ix=act.inx||act.fx,iy=act.iny||act.fy;S.pt=bestPass(act,ix,iy,900,S.assist)}
P.forEach(p=>{if(p!==act)ai(p,dt);move(p,dt)});
if(act&&act.role==='GK'&&owner===act){act.x=clamp(act.x,X0+R,X0+BXD-R);act.y=clamp(act.y,CY-BYH+R,CY+BYH-R);act.hold+=dt;if(act.hold>8)kick(act,1,0,560)}
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy);if(l>0&&l<2*R-2){const k=(2*R-2-l)/2/l;a.x-=dx*k;a.y-=dy*k;b.x+=dx*k;b.y+=dy*k}}
if(owner&&owner.role!=='GK'&&!(owner.inv>0)){const o=owner;for(const q of P){if(q.team===o.team||dist(q,o)>2*R+(q.tkw>0?13:7))continue;const rate=C(q.team).tk*(q.lunge>0?3.5:1)*(q.tkw>0?5:1);if(Math.random()<rate*dt){const dx=q.x-o.x,dy=q.y-o.y,l=Math.hypot(dx,dy)||1;ball.vx=dx/l*170;ball.vy=dy/l*170;owner=null;o.cd=.7;ST.tk[q.team]++;snd(190,.08,'sawtooth',.06,90);break}}}
if(owner)ST.poss[owner.team]+=dt;ballStep(dt);contacts()}
