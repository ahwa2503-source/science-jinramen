/* =======================================================
   COSMOS : Solar System Explorer
   Version 2.0
======================================================= */

/* ===========================
   ELEMENT
=========================== */

const introScreen = document.getElementById("introScreen");
const startButton = document.getElementById("startButton");
const countdownScreen = document.getElementById("countdownScreen");
const countText = document.getElementById("countText");
const mainScene = document.getElementById("mainScene");

const loadingOverlay = document.getElementById("loadingOverlay");

const musicButton = document.getElementById("musicButton");

const meteorField = document.getElementById("meteor-field");

const panel = document.getElementById("planetPanel");
const closePanel = document.getElementById("closePanel");

const planetName = document.getElementById("planetName");
const planetDistance = document.getElementById("planetDistance");
const planetSize = document.getElementById("planetSize");
const planetTemperature = document.getElementById("planetTemperature");
const planetDay = document.getElementById("planetDay");
const planetYear = document.getElementById("planetYear");
const planetDescription = document.getElementById("planetDescription");

const planets = document.querySelectorAll(".planet");



/* ===========================
   LOADING
=========================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loadingOverlay.style.opacity="0";

        loadingOverlay.style.pointerEvents="none";

        setTimeout(()=>{

            loadingOverlay.style.display="none";

        },800);

    },1200);

});



/* ===========================
   START
=========================== */

startButton.addEventListener("click",()=>{

    introScreen.style.opacity="0";

    introScreen.style.pointerEvents="none";

    countdownScreen.style.visibility="visible";

    countdownScreen.style.opacity="1";

    startCountdown();

});



/* ===========================
   COUNTDOWN
=========================== */

function startCountdown(){

    let number=3;

    countText.innerHTML=number;

    const timer=setInterval(()=>{

        number--;

        if(number>0){

            countText.innerHTML=number;

        }

        else if(number===0){

            countText.innerHTML="GO";

        }

        else{

            clearInterval(timer);

            countdownScreen.style.opacity="0";

            setTimeout(()=>{

                countdownScreen.style.display="none";

                mainScene.style.display="block";

            },600);

        }

    },1000);

}



/* ===========================
   PLANET PANEL
=========================== */

planets.forEach((planet)=>{

    planet.addEventListener("click",()=>{

        panel.classList.add("active");

        planetName.textContent=planet.dataset.name;

        planetDistance.textContent=planet.dataset.distance;

        planetSize.textContent=planet.dataset.size;

        planetTemperature.textContent=planet.dataset.temperature;

        planetDay.textContent=planet.dataset.day;

        planetYear.textContent=planet.dataset.year;

        planetDescription.textContent=planet.dataset.description;

    });

});



closePanel.addEventListener("click",()=>{

    panel.classList.remove("active");

});



/* ===========================
   MUSIC BUTTON
=========================== */

let music=false;

musicButton.addEventListener("click",()=>{

    music=!music;

    musicButton.innerHTML=music ? "🔊" : "🔇";

});



/* ===========================
   METEOR
=========================== */

function createMeteor(){

    if(!meteorField) return;

    const meteor=document.createElement("div");

    meteor.className="meteor";

    meteor.style.position="absolute";

    meteor.style.width="3px";

    meteor.style.height="3px";

    meteor.style.borderRadius="50%";

    meteor.style.background="white";

    meteor.style.boxShadow="0 0 10px white";

    meteor.style.left=(70+Math.random()*30)+"%";

    meteor.style.top=(Math.random()*40)+"%";

    meteor.style.animation="meteorFly 3s linear forwards";

    meteorField.appendChild(meteor);

    setTimeout(()=>{

        meteor.remove();

    },3000);

}

setInterval(createMeteor,1800);
/* ===========================
   PARALLAX
=========================== */

const background=document.getElementById("background");

document.addEventListener("mousemove",(e)=>{

    if(!background) return;

    const x=(e.clientX/window.innerWidth-.5)*18;

    const y=(e.clientY/window.innerHeight-.5)*18;

    background.style.transform=

        `translate(${x}px,${y}px)`;

});



/* ===========================
   ESC CLOSE PANEL
=========================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        panel.classList.remove("active");

    }

});



/* ===========================
   EASTER EGG
=========================== */

const secret=[];

const answer=[

    "c",

    "o",

    "s",

    "m",

    "o",

    "s"

];

const easterEgg=document.getElementById("easterEgg");

document.addEventListener("keydown",(e)=>{

    secret.push(e.key.toLowerCase());

    if(secret.length>answer.length){

        secret.shift();

    }

    if(secret.join("")===answer.join("")){

        if(easterEgg){

            easterEgg.classList.add("show");

            setTimeout(()=>{

                easterEgg.classList.remove("show");

            },3500);

        }

    }

});



/* ===========================
   SUN EFFECT
=========================== */

const sun=document.getElementById("sun");

if(sun){

    sun.addEventListener("mouseenter",()=>{

        sun.style.transform="scale(1.08)";

    });

    sun.addEventListener("mouseleave",()=>{

        sun.style.transform="scale(1)";

    });

}



/* ===========================
   PLANET HOVER
=========================== */

planets.forEach((planet)=>{

    planet.addEventListener("mouseenter",()=>{

        planet.style.filter=

            "brightness(1.35)";

    });

    planet.addEventListener("mouseleave",()=>{

        planet.style.filter=

            "brightness(1)";

    });

});



/* ===========================
   AUTO CLOSE PANEL
=========================== */

let panelTimer;

planets.forEach((planet)=>{

    planet.addEventListener("click",()=>{

        clearTimeout(panelTimer);

        panelTimer=setTimeout(()=>{

            panel.classList.remove("active");

        },15000);

    });

});



/* ===========================
   STAR FLASH
=========================== */

setInterval(()=>{

    const stars=[

        document.getElementById("stars-layer-1"),

        document.getElementById("stars-layer-2"),

        document.getElementById("stars-layer-3")

    ];



    const target=

        stars[Math.floor(Math.random()*stars.length)];



    if(target){

        target.animate(

            [

                {

                    opacity:.3

                },

                {

                    opacity:1

                },

                {

                    opacity:.3

                }

            ],

            {

                duration:1200

            }

        );

    }

},2500);



/* ===========================
   PERFORMANCE
=========================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        clearInterval();

    }

});



/* ===========================
   STARTUP
=========================== */

console.clear();

console.log(

"%cCOSMOS",

"font-size:28px;color:#53d6ff;font-weight:bold;"

);

console.log(

"%cSolar System Explorer Ready",

"font-size:15px;color:white;"

);

console.log(

"%cVersion 2.0",

"font-size:13px;color:#89d6ff;"

);
/* ===========================
   FPS OPTIMIZE
=========================== */

window.addEventListener("blur",()=>{

    document.body.style.filter="brightness(.95)";

});

window.addEventListener("focus",()=>{

    document.body.style.filter="brightness(1)";

});



/* ===========================
   RANDOM TITLE COLOR
=========================== */

const title=document.querySelector("#introContent h1");

if(title){

    setInterval(()=>{

        title.style.textShadow=

        `0 0 ${20+Math.random()*15}px #53d6ff`;

    },1200);

}



/* ===========================
   READY
=========================== */

console.log("Everything Loaded.");
