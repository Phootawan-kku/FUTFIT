/* FUTFIT / skills.js: Skill moves (stepover, roulette, rainbow flick, ball roll) */
const SKD={step:[.6,.55],roul:[.7,.65],rain:[.8,.4],roll:[.55,.5]},SKN={step:'Stepover',roul:'Roulette',rain:'Rainbow flick',roll:'Ball roll'};
function doSkill(p,t){if(!p||owner!==p||p.sk>0||p.lunge>0)return;const[d,iv]=SKD[t];let ix=p.inx||p.fx,iy=p.iny||p.fy;const l=Math.hypot(ix,iy)||1;ix/=l;iy/=l;p.sk=p.skd=d;p.skT=t;p.inv=iv;p.alt=-p.alt;const px=-iy*p.alt,py=ix*p.alt;
if(t==='step'){p.vx+=px*200+ix*60;p.vy+=py*200+iy*60}
else if(t==='roul'){p.vx+=ix*220+px*110;p.vy+=iy*220+py*110;p.fx=ix;p.fy=iy}
else if(t==='roll'){p.vx+=-ix*120+px*230;p.vy+=-iy*120+py*230}
else{owner=null;ball.vx=ix*320;ball.vy=iy*320;ball.air=ball.a0=.85;ball.x=p.x+ix*(R+BR);ball.y=p.y+iy*(R+BR);p.cd=.4;p.vx+=ix*140;p.vy+=iy*140;p.recv=1.2}
snd(t==='rain'?420:300,.12,'triangle',.08,t==='rain'?700:200)}
