const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

const canvas=$("#spaceCanvas");
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.25;

const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x02040b,.028);

const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,300);
camera.position.set(0,3,22);

scene.add(new THREE.AmbientLight(0x284a76,1.1));

const sunLight=new THREE.PointLight(0xffb44a,26,80,2);
scene.add(sunLight);

const rimLight=new THREE.DirectionalLight(0x55baff,3.2);
rimLight.position.set(-8,5,8);
scene.add(rimLight);

const solarRoot=new THREE.Group();
solarRoot.rotation.x=-.2;
scene.add(solarRoot);

function sphere(size,color,roughness=.72,metalness=.04){
  return new THREE.Mesh(
    new THREE.SphereGeometry(size,64,64),
    new THREE.MeshStandardMaterial({color,roughness,metalness})
  );
}

function createBandTexture(colors){
  const canvas=document.createElement("canvas");
  canvas.width=512;
  canvas.height=256;

  const context=canvas.getContext("2d");
  const gradient=context.createLinearGradient(0,0,0,256);

  colors.forEach((color,index)=>{
    gradient.addColorStop(index/(colors.length-1),color);
  });

  context.fillStyle=gradient;
  context.fillRect(0,0,512,256);

  for(let i=0;i<35;i++){
    context.fillStyle=`rgba(255,255,255,${Math.random()*.08})`;
    context.fillRect(0,Math.random()*256,512,Math.random()*5+1);
  }

  const texture=new THREE.CanvasTexture(canvas);
  texture.colorSpace=THREE.SRGBColorSpace;
  return texture;
}

const sun=sphere(1.25,0xff8a18,.45,0);
sun.material.emissive=new THREE.Color(0xff4b0b);
sun.material.emissiveIntensity=2.5;
solarRoot.add(sun);

const glow=sphere(1.55,0xff7a00,1,0);
glow.material=new THREE.MeshBasicMaterial({
  color:0xff7a00,
  transparent:true,
  opacity:.12,
  blending:THREE.AdditiveBlending,
  depthWrite:false
});
solarRoot.add(glow);

const planetData=[
  ["Mercury",2.2,.22,0x8d8379,.022],
  ["Venus",3.1,.34,0xd48a35,.016],
  ["Earth",4.15,.4,0x147ddb,.012],
  ["Mars",5.3,.3,0xb9482a,.009],
  ["Jupiter",6.9,.83,0xc79b6a,.005],
  ["Saturn",8.7,.68,0xcdb274,.0035],
  ["Uranus",10.5,.52,0x73cbd5,.0025],
  ["Neptune",12.2,.52,0x335ad8,.0018]
];

const systems=[];

planetData.forEach((data,index)=>{
  const [name,radius,size,color,speed]=data;

  const orbitPoints=Array.from({length:180},(_,pointIndex)=>{
    const angle=pointIndex/180*Math.PI*2;
    return new THREE.Vector3(
      Math.cos(angle)*radius,
      0,
      Math.sin(angle)*radius*.45
    );
  });

  const orbit=new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(orbitPoints),
    new THREE.LineBasicMaterial({
      color:0x4ecfff,
      transparent:true,
      opacity:.13
    })
  );

  solarRoot.add(orbit);

  const pivot=new THREE.Group();
  pivot.rotation.y=index*.8;
  solarRoot.add(pivot);

  const planet=sphere(size,color,.8,.02);
  planet.position.set(radius,0,0);

  if(name==="Earth"){
    planet.material.map=createBandTexture(["#0a3c85","#1c8ed8","#4fb8ec","#0a3c85"]);
  }

  if(name==="Jupiter"){
    planet.material.map=createBandTexture(["#6f4636","#d4a878","#f0d1aa","#9c6547","#e2bd8b"]);
  }

  if(name==="Saturn"){
    planet.material.map=createBandTexture(["#826941","#d4bd83","#f0dfab","#a88753"]);

    const ring=new THREE.Mesh(
      new THREE.RingGeometry(size*1.35,size*2.1,96),
      new THREE.MeshStandardMaterial({
        color:0xd8c392,
        side:THREE.DoubleSide,
        transparent:true,
        opacity:.78,
        roughness:.8
      })
    );

    ring.rotation.x=Math.PI/2.25;
    planet.add(ring);
  }

  pivot.add(planet);
  systems.push({pivot,planet,speed});
});

const starCount=5000;
const positions=new Float32Array(starCount*3);

for(let i=0;i<starCount;i++){
  const radius=40+Math.random()*120;
  const angle=Math.random()*Math.PI*2;

  positions[i*3]=Math.cos(angle)*radius;
  positions[i*3+1]=(Math.random()-.5)*70;
  positions[i*3+2]=Math.sin(angle)*radius+(Math.random()-.5)*90;
}

const starGeometry=new THREE.BufferGeometry();
starGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));

const stars=new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({
    color:0xffffff,
    size:.055,
    transparent:true,
    opacity:.85
  })
);

scene.add(stars);

let mouseX=0;
let mouseY=0;
let cameraTargetX=0;
let cameraTargetY=0;

addEventListener("mousemove",event=>{
  mouseX=event.clientX;
  mouseY=event.clientY;
  cameraTargetX=event.clientX/innerWidth-.5;
  cameraTargetY=event.clientY/innerHeight-.5;
});

function animate(time){
  requestAnimationFrame(animate);

  sun.rotation.y+=.002;
  glow.scale.setScalar(1+Math.sin(time*.002)*.035);
  stars.rotation.y+=.00008;

  systems.forEach((system,index)=>{
    system.pivot.rotation.y+=system.speed;
    system.planet.rotation.y+=.006+(index===4?.006:0);
  });

  camera.position.x+=(cameraTargetX*2.2-camera.position.x)*.035;
  camera.position.y+=(3-cameraTargetY*1.3-camera.position.y)*.035;
  camera.lookAt(0,0,0);

  renderer.render(scene,camera);
}

animate(0);

addEventListener("resize",()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

let progress=0;
const loadingTimer=setInterval(()=>{
  progress=Math.min(100,progress+Math.ceil(Math.random()*9));
  $("#loaderBar").style.width=progress+"%";
  $("#loaderText").textContent=progress+"%";

  if(progress===100){
    clearInterval(loadingTimer);
    setTimeout(()=>$("#loader").classList.add("hide"),350);
  }
},65);

const homeScreen=$("#homeScreen");
const chapterScreen=$("#chapterScreen");
const warp=$("#warp");
const sectorText=$("#sectorText");

function switchScreen(screenName){
  warp.classList.add("active");

  setTimeout(()=>{
    homeScreen.classList.toggle("active",screenName==="home");
    chapterScreen.classList.toggle("active",screenName==="chapters");
    sectorText.textContent=screenName==="home"?"HOME SECTOR":"MODULE SECTOR";
    solarRoot.visible=screenName==="home";
  },420);

  setTimeout(()=>warp.classList.remove("active"),950);
}

$("#startButton").addEventListener("click",()=>switchScreen("chapters"));
$("#backButton").addEventListener("click",()=>switchScreen("home"));
$("#homeButton").addEventListener("click",()=>switchScreen("home"));

const cursorDot=$(".cursor-dot");
const cursorRing=$(".cursor-ring");
let ringX=0;
let ringY=0;

addEventListener("mousemove",event=>{
  cursorDot.style.left=event.clientX+"px";
  cursorDot.style.top=event.clientY+"px";
});

(function cursorLoop(){
  ringX+=(mouseX-ringX)*.16;
  ringY+=(mouseY-ringY)*.16;

  cursorRing.style.left=ringX+"px";
  cursorRing.style.top=ringY+"px";

  requestAnimationFrame(cursorLoop);
})();

$$("button").forEach(button=>{
  button.addEventListener("mouseenter",()=>cursorRing.classList.add("active"));
  button.addEventListener("mouseleave",()=>cursorRing.classList.remove("active"));
});

const sparkLayer=$("#sparkLayer");

function createSparkBurst(element,count=12){
  const rect=element.getBoundingClientRect();

  for(let i=0;i<count;i++){
    const spark=document.createElement("i");
    spark.className="spark";

    spark.style.left=(rect.left+Math.random()*rect.width)+"px";
    spark.style.top=(rect.top+Math.random()*rect.height)+"px";

    const angle=Math.random()*Math.PI*2;
    const distance=20+Math.random()*80;

    spark.style.setProperty("--x",Math.cos(angle)*distance+"px");
    spark.style.setProperty("--y",Math.sin(angle)*distance+"px");

    sparkLayer.appendChild(spark);
    setTimeout(()=>spark.remove(),700);
  }
}

$$(".module").forEach(module=>{
  let sparkTimer;

  module.addEventListener("mouseenter",()=>{
    createSparkBurst(module,16);
    sparkTimer=setInterval(()=>createSparkBurst(module,4),140);

    $("#selectedTitle").textContent=module.dataset.title;
    $("#selectedCode").textContent=module.dataset.code;
  });

  module.addEventListener("mouseleave",()=>{
    clearInterval(sparkTimer);
  });

  module.addEventListener("mousemove",event=>{
    const rect=module.getBoundingClientRect();

    module.style.setProperty("--mx",((event.clientX-rect.left)/rect.width*100)+"%");
    module.style.setProperty("--my",((event.clientY-rect.top)/rect.height*100)+"%");
  });
});

$$(".magnetic").forEach(element=>{
  element.addEventListener("mousemove",event=>{
    const rect=element.getBoundingClientRect();

    element.style.transform=`translate(
      ${(event.clientX-rect.left-rect.width/2)*.12}px,
      ${(event.clientY-rect.top-rect.height/2)*.12}px
    )`;
  });

  element.addEventListener("mouseleave",()=>{
    element.style.transform="";
  });
});

let audioContext;
let oscillator;
let gainNode;
let soundEnabled=false;

$("#soundButton").addEventListener("click",()=>{
  soundEnabled=!soundEnabled;

  const button=$("#soundButton");
  button.classList.toggle("active",soundEnabled);
  button.querySelector("span").textContent=soundEnabled?"SOUND ON":"SOUND OFF";

  if(soundEnabled&&!audioContext){
    audioContext=new (window.AudioContext||window.webkitAudioContext)();
    oscillator=audioContext.createOscillator();
    gainNode=audioContext.createGain();

    oscillator.type="sine";
    oscillator.frequency.value=55;
    gainNode.gain.value=.025;

    oscillator.connect(gainNode).connect(audioContext.destination);
    oscillator.start();
  }

  if(audioContext){
    gainNode.gain.setTargetAtTime(
      soundEnabled?.025:0,
      audioContext.currentTime,
      .15
    );
  }
});
