/* =======================================================
   COSMOS : Solar System Explorer
   Version 1.0
======================================================= */



/* ===========================
   ELEMENT
=========================== */

const introScreen = document.getElementById("introScreen");

const startButton = document.getElementById("startButton");

const countdownScreen = document.getElementById("countdownScreen");

const countText = document.getElementById("countText");

const mainScene = document.getElementById("mainScene");

const bgm = document.getElementById("bgm");

const musicButton = document.getElementById("musicButton");

const panel = document.getElementById("planetPanel");

const closePanel = document.getElementById("closePanel");

const meteorField = document.getElementById("meteor-field");

const loadingOverlay = document.getElementById("loadingOverlay");



const planetName = document.getElementById("planetName");

const planetDistance = document.getElementById("planetDistance");

const planetSize = document.getElementById("planetSize");

const planetTemperature = document.getElementById("planetTemperature");

const planetDay = document.getElementById("planetDay");

const planetYear = document.getElementById("planetYear");

const planetDescription = document.getElementById("planetDescription");



const planets = document.querySelectorAll(".planet");



/* ===========================
   MUSIC
=========================== */

let musicOn = false;



/* ===========================
   LOADING
=========================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingOverlay.style.opacity = "0";

        loadingOverlay.style.transition = ".8s";

        setTimeout(() => {

            loadingOverlay.style.display = "none";

        }, 800);

    }, 1200);

});



/* ===========================
   START BUTTON
=========================== */

startButton.addEventListener("click", () => {

    introScreen.style.opacity = "0";

    introScreen.style.pointerEvents = "none";

    countdownScreen.style.visibility = "visible";

    countdownScreen.style.opacity = "1";

    startCount();

});



/* ===========================
   COUNTDOWN
=========================== */

function startCount(){

    let number = 3;

    countText.innerHTML = number;

    const timer = setInterval(() => {

        number--;

        if(number > 0){

            countText.innerHTML = number;

        }

        else if(number === 0){

            countText.innerHTML = "Launch";

        }

        else{

            clearInterval(timer);

            countdownScreen.style.opacity = "0";

            setTimeout(() => {

                countdownScreen.style.display = "none";

                mainScene.style.display = "block";

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

        planetName.textContent =

        planet.dataset.name;

        planetDistance.textContent =

        planet.dataset.distance;

        planetSize.textContent =

        planet.dataset.size;

        planetTemperature.textContent =

        planet.dataset.temperature;

        planetDay.textContent =

        planet.dataset.day;

        planetYear.textContent =

        planet.dataset.year;

        planetDescription.textContent =

        planet.dataset.description;

    });

});



closePanel.addEventListener("click",()=>{

    panel.classList.remove("active");

});
/* ===========================
   MUSIC
=========================== */

musicButton.addEventListener("click",()=>{

    if(!bgm) return;

    if(musicOn){

        bgm.pause();

        musicOn=false;

        musicButton.innerHTML="🔇";

    }

    else{

        bgm.volume=.35;

        bgm.play().catch(()=>{});

        musicOn=true;

        musicButton.innerHTML="🔊";

    }

});



/* ===========================
   METEOR
=========================== */

function createMeteor(){

    if(!meteorField) return;

    const meteor=document.createElement("div");

    meteor.className="meteor";

    meteor.style.top=Math.random()*35+"%";

    meteor.style.left=(70+Math.random()*30)+"%";

    meteor.style.animation=

        "meteorFly "+(2+Math.random()*2)+"s linear forwards";

    meteorField.appendChild(meteor);

    setTimeout(()=>{

        meteor.remove();

    },4000);

}



setInterval(createMeteor,1800);



/* ===========================
   PARALLAX
=========================== */

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*18;

    const y=(e.clientY/window.innerHeight-.5)*18;

    const bg=document.getElementById("background");

    if(bg){

        bg.style.transform=

            `translate(${x}px,${y}px)`;

    }

});



/* ===========================
   EASTER EGG
=========================== */

let secret=[];

const answer=[

"c",

"o",

"s",

"m",

"o",

"s"

];



document.addEventListener("keydown",(e)=>{

    secret.push(e.key.toLowerCase());

    if(secret.length>answer.length){

        secret.shift();

    }

    if(secret.join("")===answer.join("")){

        const egg=document.getElementById("easterEgg");

        if(egg){

            egg.classList.add("show");

            setTimeout(()=>{

                egg.classList.remove("show");

            },3500);

        }

    }

});



/* ===========================
   ESC
=========================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        panel.classList.remove("active");

    }

});



/* ===========================
   DOUBLE CLICK SUN
=========================== */

const sun=document.getElementById("sun");



if(sun){

    sun.addEventListener("dblclick",()=>{

        sun.animate(

        [

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.2)"

            },

            {

                transform:"scale(1)"

            }

        ],

        {

            duration:900

        });

    });

}



/* ===========================
   RANDOM STAR FLASH
=========================== */

setInterval(()=>{

    const stars=[

        "stars-layer-1",

        "stars-layer-2",

        "stars-layer-3"

    ];



    const target=document.getElementById(

        stars[Math.floor(Math.random()*stars.length)]

    );



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

            duration:900

        });

    }

},2200);



/* ===========================
   WINDOW RESIZE
=========================== */

window.addEventListener("resize",()=>{

    panel.classList.remove("active");

});



/* ===========================
   START COMPLETE
=========================== */

console.log(

"%cCOSMOS : Solar System Explorer",

"color:#53d6ff;font-size:20px;font-weight:bold;"

);

console.log(

"%cProject Loaded Successfully",

"color:#ffffff;font-size:14px;"

);
/* ===========================
   PLANET HOVER EFFECT
=========================== */

planets.forEach((planet)=>{

    planet.addEventListener("mouseenter",()=>{

        planet.animate(

            [

                {

                    transform:"translateY(-50%) scale(1)"

                },

                {

                    transform:"translateY(-50%) scale(1.18)"

                }

            ],

            {

                duration:250,

                fill:"forwards"

            }

        );

    });



    planet.addEventListener("mouseleave",()=>{

        planet.animate(

            [

                {

                    transform:"translateY(-50%) scale(1.18)"

                },

                {

                    transform:"translateY(-50%) scale(1)"

                }

            ],

            {

                duration:250,

                fill:"forwards"

            }

        );

    });

});



/* ===========================
   PANEL ANIMATION
=========================== */

function openPlanetPanel(){

    panel.classList.add("active");



    panel.animate(

        [

            {

                opacity:0,

                transform:"translateY(-50%) translateX(100px)"

            },

            {

                opacity:1,

                transform:"translateY(-50%) translateX(0)"

            }

        ],

        {

            duration:350,

            easing:"ease-out"

        }

    );

}



/* ===========================
   INTRO FADE
=========================== */

if(introScreen){

    introScreen.animate(

        [

            {

                opacity:0

            },

            {

                opacity:1

            }

        ],

        {

            duration:1200,

            fill:"forwards"

        }

    );

}



/* ===========================
   SUN GLOW
=========================== */

setInterval(()=>{

    if(!sun) return;



    sun.animate(

        [

            {

                filter:"brightness(1)"

            },

            {

                filter:"brightness(1.35)"

            },

            {

                filter:"brightness(1)"

            }

        ],

        {

            duration:1800

        }

    );

},5000);



/* ===========================
   AUTO PANEL CLOSE
=========================== */

let panelTimer;

planets.forEach((planet)=>{

    planet.addEventListener("click",()=>{

        clearTimeout(panelTimer);

        panelTimer=setTimeout(()=>{

            panel.classList.remove("active");

        },12000);

    });

});



/* ===========================
   PERFORMANCE
=========================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        if(bgm){

            bgm.pause();

        }

    }

    else{

        if(musicOn && bgm){

            bgm.play().catch(()=>{});

        }

    }

});



/* ===========================
   VERSION
=========================== */

console.log("COSMOS v1.0");

console.log("Developed with HTML + CSS + JavaScript");

console.log("Solar System Explorer Ready.");
