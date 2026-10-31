/* FUTFIT / camera.js: Perspective camera, camera modes, crowd texture and canvas scaling */
/* ===== 3/4 broadcast camera ===== */
let CD=1800,TILT=.6,ZM=1.55,CYS=420;const BRd=3.8,NUMS=[1,2,5,4,3,7,8,6,11,9,10],LC='rgba(255,255,255,.88)';let cam={x:CX,y:CY};
const AD=[['FUTFIT','#1b6b3b'],['NIMBUS AIR','#1c7a96'],['KICKR','#a3262c'],['TURFCO','#b8901c'],['ORBIT','#2a4aa0'],['BLUE HARBOR','#7a2a6a'],['VELO','#1a6a64']];
const pj=(x,y,z=0)=>{const u=ZM*CD/(CD+cam.y-y);return[550+(x-cam.x)*u,CYS+(y-cam.y)*u*TILT-z*u,u]};
function path(pts){g.beginPath();pts.forEach((p,i)=>{const q=pj(p[0],p[1],p[2]||0);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])})}
function quad(pts,f){path(pts);g.closePath();g.fillStyle=f;g.fill()}
function ln3(pts,w,c,cl){path(pts);if(cl)g.closePath();g.lineWidth=w;g.strokeStyle=c;g.stroke()}
const circ=(cx,cy,r,a0,a1,n=40)=>Array.from({length:n+1},(_,i)=>[cx+Math.cos(a0+(a1-a0)*i/n)*r,cy+Math.sin(a0+(a1-a0)*i/n)*r]);
const crowd=document.createElement('canvas');crowd.width=1100;crowd.height=220;
function mkCrowd(){const f=crowd.getContext('2d'),gr=f.createLinearGradient(0,0,0,220);gr.addColorStop(0,'#0a0f1c');gr.addColorStop(1,'#1c2438');f.fillStyle=gr;f.fillRect(0,0,1100,220);for(let i=0;i<5600;i++){const h=Math.random();f.fillStyle=`hsla(${h<.3?215:h<.5?0:h<.7?45:200+h*60},${25+Math.random()*40}%,${30+Math.random()*35}%,${.45+Math.random()*.4})`;f.fillRect(Math.random()*1100,Math.random()*220,3,3+Math.random()*3)}const o=f.createLinearGradient(0,0,0,220);o.addColorStop(0,'rgba(0,0,0,.55)');o.addColorStop(1,'rgba(0,0,0,.1)');f.fillStyle=o;f.fillRect(0,0,1100,220)}
function camUp(dt){const fo=(S.mode==='goal'&&S.lastK&&S.lastK.team===S.scorer)?S.lastK:ball,mg=Math.max(60,550/ZM-120),tx=clamp(fo.x+(fo.vx||0)*.22,X0+mg,X0+PW-mg),ty=clamp(fo.y*.8+CY*.2,Y0+150,Y0+PH-150),k=Math.min(1,dt*(S.mode==='goal'?1.6:3.2));cam.x+=(tx-cam.x)*k;cam.y+=(ty-cam.y)*k}
const CAMS=[['Broadcast',1.45,.6,1800,420],['Close-up',2.0,.62,1500,430],['Wide',1.05,.62,2200,400],['High angle',1.15,.9,2800,380]];
function setCam(i){S.cam=i%CAMS.length;const c=CAMS[S.cam];ZM=c[1];TILT=c[2];CD=c[3];CYS=c[4]}
let DPR=1,rz=0;function fit(){const s=clamp((cv.clientWidth||1100)*Math.min(2,window.devicePixelRatio||1)/1100,.6,2);if(Math.abs(s-DPR)<.01)return;DPR=s;cv.width=Math.round(1100*s);cv.height=Math.round(700*s)}
