/* =========================================================
   SCIENCE CORE
   SCRIPT PART 1
========================================================= */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

/* ===========================================
                STAR FIELD
=========================================== */

const stars=[];

for(let i=0;i<1000;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*2,

        alpha:0.3+Math.random()*0.7,

        speed:0.1+Math.random()*0.4

    });

}
/* ===========================================
             SHOOTING STARS
=========================================== */

const meteors=[];

function createMeteor(){

    meteors.push({

        x:-300,

        y:Math.random()*300,

        vx:15+Math.random()*10,

        vy:8+Math.random()*4,

        life:0

    });

}

setInterval(createMeteor,2500);
/* ===========================================
                DRAW
=========================================== */

function drawSpace(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const star of stars){

        ctx.beginPath();

        ctx.fillStyle="rgba(255,255,255,"+star.alpha+")";

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fill();

        star.y+=star.speed;

        if(star.y>canvas.height){

            star.y=0;
            star.x=Math.random()*canvas.width;

        }

    }

    for(let i=meteors.length-1;i>=0;i--){

        const m=meteors[i];

        ctx.beginPath();

        ctx.strokeStyle="#7ef9ff";

        ctx.lineWidth=2;

        ctx.moveTo(m.x,m.y);

        ctx.lineTo(m.x-140,m.y-70);

        ctx.stroke();

        m.x+=m.vx;
        m.y+=m.vy;

        m.life++;

        if(m.life>90){

            meteors.splice(i,1);

        }

    }

    requestAnimationFrame(drawSpace);

}

drawSpace();
/* ===========================================
                CURSOR
=========================================== */

const cursor=document.getElementById("cursorGlow");

document.addEventListener("mousemove",e=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});
/* ===========================================
             SYSTEM INFO
=========================================== */

const cpu=document.getElementById("cpu");
const temp=document.getElementById("temp");
const clock=document.getElementById("clock");

setInterval(()=>{

    cpu.textContent=Math.floor(35+Math.random()*55)+"%";

    temp.textContent=(28+Math.random()*18).toFixed(1)+"°C";

    clock.textContent=new Date().toLocaleTimeString("ko-KR");

},1000);
/* ===========================================
              BOOT
=========================================== */

const progress=document.getElementById("bootProgress");

let percent=0;

const boot=setInterval(()=>{

    percent++;

    progress.style.width=percent+"%";

    if(percent>=100){

        clearInterval(boot);

        setTimeout(()=>{

            document.getElementById("bootScreen").style.opacity="0";

            setTimeout(()=>{

                document.getElementById("bootScreen").remove();

            },800);

        },400);

    }

},35);
/* =========================================================
   SOLAR SYSTEM
========================================================= */

const solarSystem = document.getElementById("solarSystem");

const planets = [

{
name:"수성",
color:"#9e9e9e",
size:8,
orbit:90,
speed:0.022,
info:"태양에서 가장 가까운 행성"
},

{
name:"금성",
color:"#d6b56c",
size:13,
orbit:130,
speed:0.017,
info:"태양계에서 가장 뜨거운 행성"
},

{
name:"지구",
color:"#2ea7ff",
size:15,
orbit:180,
speed:0.013,
info:"생명체가 존재하는 유일한 행성"
},

{
name:"화성",
color:"#d55c3d",
size:11,
orbit:230,
speed:0.010,
info:"붉은 행성"
},

{
name:"목성",
color:"#cfa56d",
size:32,
orbit:300,
speed:0.007,
info:"태양계에서 가장 큰 행성"
},

{
name:"토성",
color:"#e8d08c",
size:27,
orbit:380,
  /* ===========================
   SUN
=========================== */

const sun=document.createElement("div");

sun.className="sun";

solarSystem.appendChild(sun);
speed:0.0055,
info:"아름다운 고리를 가진 행성"
},

{
name:"천왕성",
color:"#8be9ff",
size:22,
orbit:460,
speed:0.004,
info:"옆으로 누워 자전하는 행성"
},

{
  /* ===========================
   PLANETS
=========================== */

const planetInfo=document.getElementById("planetInfo");
const planetName=document.getElementById("planetName");
const planetText=document.getElementById("planetText");

planets.forEach(p=>{

const orbit=document.createElement("div");

orbit.className="orbit";

orbit.style.width=p.orbit*2+"px";

orbit.style.height=p.orbit*2+"px";

solarSystem.appendChild(orbit);

const planet=document.createElement("div");

planet.className="planet";

planet.style.width=p.size+"px";

planet.style.height=p.size+"px";

planet.style.background=p.color;

planet.title=p.name;

orbit.appendChild(planet);

/* 토성 고리 */

if(p.name==="토성"){

const ring=document.createElement("div");

ring.className="ring";

planet.appendChild(ring);

}

/* 정보창 */

planet.addEventListener("mouseenter",()=>{

planetName.textContent=p.name;

planetText.textContent=p.info;

});

});
  /* ===========================
   ORBIT
=========================== */

let angle=0;

function animatePlanets(){

angle+=0.01;

document.querySelectorAll(".orbit").forEach((orbit,index)=>{

const p=orbit.querySelector(".planet");

const data=planets[index];

const a=angle*data.speed*120;

const x=Math.cos(a)*data.orbit;

const y=Math.sin(a)*data.orbit;

p.style.left=50+x+"%";

p.style.top=50+y+"%";

});

requestAnimationFrame(animatePlanets);

}

animatePlanets();
name:"해왕성",
color:"#2b6cff",
size:22,
orbit:540,
speed:0.003,
info:"태양계에서 가장 강한 바람"
}

];
