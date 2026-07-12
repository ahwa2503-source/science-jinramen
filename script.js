/* ==================================
   SCIENCE CORE
   MAIN SYSTEM SCRIPT
================================== */



// ===============================
// STAR GENERATOR
// ===============================


const stars = document.getElementById("stars");



for(let i = 0; i < 800; i++){


    const star = document.createElement("div");


    star.className = "star";



    let size =
    Math.random() * 3 + 1;



    star.style.width =
    size + "px";


    star.style.height =
    size + "px";



    star.style.left =
    Math.random()*100 + "%";


    star.style.top =
    Math.random()*100 + "%";



    star.style.opacity =
    Math.random();



    star.style.animationDelay =
    Math.random()*5 + "s";



    stars.appendChild(star);


}







// ===============================
// START SYSTEM
// ===============================



const start =
document.getElementById("start");



const status =
document.querySelector(".status");



let activated = false;




start.addEventListener("click",()=>{


    if(activated) return;


    activated=true;



    start.innerHTML =
    "SYSTEM ONLINE";



    status.innerHTML =
    "SCIENCE CORE ACTIVE";



    start.style.background =
    "cyan";


    start.style.color =
    "black";



    document.body.classList.add(
        "active"
    );



    console.log(
        "SCIENCE CORE INITIALIZED"
    );



});







// ===============================
// MOUSE PARALLAX
// ===============================



const solar =
document.querySelector(".solar-system");



document.addEventListener(
"mousemove",
(e)=>{


let x =
(e.clientX / window.innerWidth - .5);



let y =
(e.clientY / window.innerHeight - .5);



solar.style.transform =

`
translate(
calc(-50% + ${x*25}px),
calc(-50% + ${y*25}px)
)
`;



});








// ===============================
// RANDOM SPACE PARTICLES
// ===============================



const particles =
document.getElementById("particles");



for(let i=0;i<80;i++){


let p =
document.createElement("div");



p.style.position="absolute";


p.style.width="2px";


p.style.height="2px";


p.style.background=
"rgba(0,220,255,.7)";



p.style.borderRadius=
"50%";



p.style.left =
Math.random()*100+"%";



p.style.top =
Math.random()*100+"%";



p.style.animation =
`float ${5+Math.random()*8}s infinite alternate`;



particles.appendChild(p);


}






// ===============================
// LIVE SYSTEM CLOCK EFFECT
// ===============================



setInterval(()=>{


let now =
new Date();



let text =
document.querySelector(
".coordinates"
);



if(text){


text.innerHTML =

`
X ${Math.floor(Math.random()*9000)}
<br>
Y ${Math.floor(Math.random()*9000)}
<br>
Z ${Math.floor(Math.random()*9000)}
`;



}



},1500);

