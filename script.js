const planets = document.querySelectorAll(".planet");

const nameBox = document.getElementById("planet-name");
const infoBox = document.getElementById("planet-info");

const startBtn = document.getElementById("start");

const solar = document.querySelector(".solar-system");




// 행성 클릭 시스템

planets.forEach(planet => {


    planet.addEventListener("click",()=>{


        const name =
        planet.dataset.name;


        const info =
        planet.dataset.info;



        nameBox.innerHTML =
        name;


        infoBox.innerHTML =
        info;



        planet.style.boxShadow =
        "0 0 50px cyan";



        setTimeout(()=>{

            planet.style.boxShadow="";

        },1000);



    });


});






// 시작 버튼


startBtn.addEventListener("click",()=>{


    startBtn.innerHTML =
    "SYSTEM ONLINE";


    startBtn.style.background =
    "cyan";


    startBtn.style.color =
    "black";



    document.querySelector("header p")
    .innerHTML =
    "NASA STYLE EXPLORATION MODE";



    document.body.style.cursor =
    "crosshair";



});








// 마우스 움직임으로 우주 움직임


document.addEventListener("mousemove",(e)=>{


    let x =
    (window.innerWidth/2 - e.clientX)
    /80;


    let y =
    (window.innerHeight/2 - e.clientY)
    /80;




    solar.style.transform =

    `translate(calc(-50% + ${x}px),
    calc(-50% + ${y}px))`;



});









// 랜덤 별 생성


const space =
document.getElementById("space");



for(let i=0;i<120;i++){


    let star =
    document.createElement("div");


    star.className =
    "random-star";



    star.style.left =
    Math.random()*100+"%";


    star.style.top =
    Math.random()*100+"%";



    star.style.animationDelay =
    Math.random()*5+"s";



    space.appendChild(star);


}
