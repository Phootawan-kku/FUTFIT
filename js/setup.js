/* FUTFIT / setup.js: Player creation and kickoff positions */
/* pitch */
/* setup */
function init(){P=[];[0,1].forEach(t=>FORM.forEach((f,i)=>P.push({team:t,role:f[2],hx:f[0],hy:f[1],x:0,y:0,vx:0,vy:0,dx:0,dy:0,mx:BASE,fx:dirOf(t),fy:0,ph:Math.random()*6,cd:0,lcd:0,lunge:0,think:0,recv:0,hold:0,inx:0,iny:0,kk:0,tkw:0,sk:0,inv:0,dive:0,dsd:1,alt:1,skT:'',skd:1,id:i+t*11})));act=null;place(null)}
function place(kt){P.forEach(p=>{p.x=hx(p);p.y=Y0+p.hy*PH;p.vx=p.vy=p.dx=p.dy=0;p.fx=dirOf(p.team);p.fy=0;p.cd=p.lcd=p.lunge=p.recv=p.hold=0;p.think=Math.random()*.2});
ball.x=CX;ball.y=CY;ball.vx=ball.vy=0;owner=null;charge=0;S.pend=null;
if(kt!=null){const k=P.find(p=>p.team===kt&&p.role==='FW');k.x=CX-dirOf(kt)*14;k.y=CY;owner=k;ball.x=k.x+dirOf(kt)*(R+BR);if(kt===0)act=k}
if(!act||act.team!==0||act.role==='GK')act=P.find(p=>p.team===0&&p.role==='FW')}
