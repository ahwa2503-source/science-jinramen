const planets = document.querySelectorAll(".planet");

const planetName = document.getElementById("planet-name");
const planetInfo = document.getElementById("planet-info");

const startBtn = document.getElementById("start");

const solar = document.querySelector(".solar-system");

const universe = document.getElementById("universe");





// =================================
// 별 생성 시스템
// =================================


for(let i = 0; i < 600; i++){


    const star = document.createElement("div");


    star.className = "star";


    star.style.left =
    Math.random()*100 + "%";


    star.style.top =
    Math.random()*100 + "%";


    let size =
    Math.random()*3+1;


    star.style.width =
    size+"px";


    star.style.height =
    size+"px";



    star.style.animationDuration =
    (Math.random()*4+2)+"s";


    universe.appendChild(star);


}








// =================================
// 행성 클릭
// =================================


planets.forEach(planet=>{


    planet.addEventListener("click",()=>{


        planets.forEach(p=>{

            p.classList.remove("selected");

        });



        planet.classList.add("selected");



        planetName.innerHTML =
        planet.dataset.name;



        planetInfo.innerHTML =
        planet.dataset.info;



    });



});








// =================================
// 시작 버튼
// =================================


startBtn.addEventListener("click",()=>{


    startBtn.innerHTML =
    "SYSTEM ONLINE";


    startBtn.style.background =
    "cyan";


    startBtn.style.color =
    "black";



    document.querySelector("header p")
    .innerHTML =
    "DEEP SPACE EXPLORATION ACTIVE";



    document.querySelector(".solar-system")
    .style.animation =
    "zoom 3s";



});









// =================================
// 마우스 패럴랙스
// =================================


document.addEventListener(
"mousemove",
(e)=>{


let x =
(e.clientX-window.innerWidth/2)/80;


let y =
(e.clientY-window.innerHeight/2)/80;



solar.style.marginLeft =
x+"px";


solar.style.marginTop =
y+"px";



});









// =================================
// 랜덤 무중력 움직임
// =================================


const planetsArray =
Array.from(planets);



setInterval(()=>{


let random =
planetsArray[
Math.floor(
Math.random()*planetsArray.length
)
];



random.style.filter =
"brightness(2)";


setTimeout(()=>{

random.style.filter="";

},500);



},2000);
