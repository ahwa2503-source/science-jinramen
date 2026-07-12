const start =
document.getElementById("start");


const boot =
document.getElementById("boot");


const space =
document.getElementById("space");



start.onclick=function(){

boot.style.opacity="0";


setTimeout(()=>{

boot.style.display="none";

space.style.display="block";


},1000);


}




// 별 생성


const stars =
document.getElementById("stars");


for(let i=0;i<500;i++){


let star=document.createElement("div");


star.className="star";


star.style.left=
Math.random()*100+"%";


star.style.top=
Math.random()*100+"%";


star.style.animationDelay=
Math.random()*5+"s";


stars.appendChild(star);


}




// 유성 생성


function createMeteor(){


let meteor=document.createElement("div");


meteor.className="meteor";


meteor.style.left=
Math.random()*100+"%";


meteor.style.top=
Math.random()*50+"%";


document
.getElementById("meteors")
.appendChild(meteor);



setTimeout(()=>{

meteor.remove();

},1000);


}



setInterval(createMeteor,2500);
