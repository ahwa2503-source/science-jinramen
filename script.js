/* ======================================
   SCIENCE CORE v1.0
   SYSTEM ENGINE
====================================== */



// =====================================
// STAR GENERATOR
// =====================================


const stars =
document.getElementById("stars");



for(let i=0;i<1000;i++){


const star =
document.createElement("div");


star.className="star";



let size =
Math.random()*3+1;



star.style.width =
size+"px";


star.style.height =
size+"px";



star.style.left =
Math.random()*100+"%";


star.style.top =
Math.random()*100+"%";



star.style.opacity =
Math.random();



star.style.animationDelay =
Math.random()*5+"s";



stars.appendChild(star);


}







// =====================================
// LOADING SYSTEM
// =====================================



const loadingText =
document.getElementById(
"loading-text"
);



const messages=[

"INITIALIZING...",
"CONNECTING DATABASE...",
"CHECKING SOLAR SYSTEM...",
"QUANTUM ENGINE READY",
"SYSTEM STANDBY"

];



let count=0;



setInterval(()=>{


loadingText.innerHTML =
messages[count];



count++;



if(count>=messages.length){

count=0;

}


},1000);








// =====================================
// SCREEN TRANSITION
// =====================================



const enterBtn =
document.getElementById(
"enter-btn"
);



const bootScreen =
document.getElementById(
"boot-screen"
);



const spaceScreen =
document.getElementById(
"space-screen"
);



enterBtn.addEventListener(
"click",
()=>{


enterBtn.innerHTML=
"WARPING...";



document.body.classList.add(
"warp"
);



setTimeout(()=>{


bootScreen.style.display="none";


spaceScreen.style.display="block";


document.body.classList.remove(
"warp"
);



},1500);



}

);








// =====================================
// EXPLORE BUTTON
// =====================================



const exploreBtn =
document.getElementById(
"explore-btn"
);



const online =
document.querySelector(
".online"
);



exploreBtn.addEventListener(
"click",
()=>{


exploreBtn.innerHTML=
"MISSION ACTIVE";



online.innerHTML=
"● EXPLORATION MODE";



exploreBtn.style.background=
"cyan";


exploreBtn.style.color=
"black";



});








// =====================================
// PARTICLE GENERATOR
// =====================================



const particles =
document.getElementById(
"particles"
);



for(let i=0;i<150;i++){


let p =
document.createElement("div");



p.style.position=
"absolute";



p.style.width=
"2px";


p.style.height=
"2px";



p.style.background=
"cyan";



p.style.borderRadius=
"50%";



p.style.left=
Math.random()*100+"%";


p.style.top=
Math.random()*100+"%";



p.style.opacity=
Math.random();



particles.appendChild(p);


}







// =====================================
// MOUSE SPACE EFFECT
// =====================================



const solar =
document.getElementById(
"solar-system"
);



document.addEventListener(
"mousemove",
(e)=>{


let x =
(e.clientX /
window.innerWidth-.5)
*20;



let y =
(e.clientY /
window.innerHeight-.5)
*20;



solar.style.transform=

`
translate(
calc(-50% + ${x}px),
calc(-50% + ${y}px)
)
`;


}

);







// =====================================
// SYSTEM BOOT SOUND STYLE EFFECT
// =====================================



window.onload=()=>{


console.log(
"SCIENCE CORE ONLINE"
);


};
