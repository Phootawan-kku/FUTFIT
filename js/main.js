/* FUTFIT / main.js: HUD refresh, main loop and start-up */
function hud(){const gs=Math.min(5400,el/S.len*5400);$('#clk').textContent=ot?'90:00+':String(gs/60|0).padStart(2,'0')+':'+String(gs%60|0).padStart(2,'0');$('#half').textContent=ot?'Golden goal':el<S.len/2?'1st half':'2nd half';$('#sb').textContent=sc[0];$('#sr').textContent=sc[1];$('#stam i').style.width=stam*100+'%';$('#stam i').style.background=S.tired?'#ff5a5f':'var(--ac)'}
let last=performance.now();
function loop(t){const dt=Math.min(.033,(t-last)/1000);last=t;step(dt/2);step(dt/2);
parts.forEach(q=>{q.vy+=520*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.r+=q.w*dt;q.l-=dt});parts=parts.filter(q=>q.l>0);trail.forEach(q=>q.l-=dt);trail=trail.filter(q=>q.l>0);
if(!CFG.shake)shake=0;ambTick();camUp(dt);draw();hud();requestAnimationFrame(loop)}
mkCrowd();setCam(S.cam);fit();menu();addEventListener('resize',()=>{if(!rz){rz=1;requestAnimationFrame(()=>{rz=0;fit()})}});document.addEventListener('visibilitychange',()=>{if(document.hidden){K={};if(S.mode==='play')pause()}});requestAnimationFrame(loop);
