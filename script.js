/* ==========================================
   SCIENCE CORE
   SCRIPT PART 1
========================================== */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

/* =========================
      STAR FIELD
========================= */

const stars=[];

for(let i=0;i<600;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2,

speed:0.15+Math.random()*0.7,

alpha:0.2+Math.random()*0.8

});

}

/* =========================
      SHOOTING STAR
========================= */

const shooting=[];

function createMeteor(){

shooting.push({

x:-200,

y:Math.random()*250,

vx:14+Math.random()*8,

vy:7+Math.random()*3,

life:0

});

}

setInterval(createMeteor,3500);

/* =========================
      DRAW
========================= */

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* Stars */

for(let s of stars){

ctx.beginPath();

ctx.fillStyle="rgba(255,255,255,"+s.alpha+")";

ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

ctx.fill();

s.y+=s.speed;

if(s.y>canvas.height){

s.y=0;

s.x=Math.random()*canvas.width;

}

}

/* Meteors */

for(let i=shooting.length-1;i>=0;i--){

let m=shooting[i];

ctx.beginPath();

ctx.strokeStyle="cyan";

ctx.lineWidth=2;

ctx.moveTo(m.x,m.y);

ctx.lineTo(m.x-120,m.y-60);

ctx.stroke();

m.x+=m.vx;

m.y+=m.vy;

m.life++;

if(m.life>120){

shooting.splice(i,1);

}

}

requestAnimationFrame(draw);

}

draw();
/* =========================
        CLOCK
========================= */

const clock=document.getElementById("clock");

setInterval(()=>{

clock.innerHTML=new Date().toLocaleTimeString();

},1000);

/* =========================
        SYSTEM
========================= */

const cpu=document.getElementById("cpu");

const temp=document.getElementById("temp");

setInterval(()=>{

cpu.innerHTML=

Math.floor(60+Math.random()*40)+"%";

temp.innerHTML=

(20+Math.random()*8).toFixed(1)+"°C";

},1200);

/* =========================
        CURSOR
========================= */

const cursor=document.getElementById("cursor");

document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});
