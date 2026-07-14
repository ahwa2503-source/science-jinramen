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
const rim=new THREE.DirectionalLight(0x55baff,3.2);
rim.position.set(-8,5,8);
scene.add(rim);

const root=new THREE.Group();
root.rotation.x=-.2;
scene.add(root);

function sphere(size,color,rough=.72,metal=.04){
  return new THREE.Mesh(
    new THREE.SphereGeometry(size,64,64),
    new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal})
  );
}

function textureBands(colors){
  const c=document.createElement("canvas");
  c.width=512;c.height=256;
  const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,0,256);
  colors.forEach((v,i)=>g.addColorStop(i/(colors.length-1),v));
  x.fillStyle=g;x.fillRect(0,0,512,256);
  for(let i=0;i<35;i++){
    x.fillStyle=`rgba(255,255,255,${Math.random()*.08})`;
    x.fillRect(0,Math.random()*256,512,Math.random()*5+1);
  }
  const t=new THREE.CanvasTexture(c);
  t.colorSpace=THREE.SRGBColorSpace;
  return t;
}

const sun=sphere(1.25,0xff8a18,.45,0);
sun.material.emissive=new THREE.Color(0xff4b0b);
sun.material.emissiveIntensity=2.5;
root.add(sun);

const glow=sphere(1.55,0xff7a00,1,0);
glow.material=new THREE.MeshBasicMaterial({
  color:0xff7a00,transparent:true,opacity:.12,
  blending:THREE.AdditiveBlending,depthWrite:false
});
root.add(glow);

const data=[
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
data.forEach((p,i)=>{
  const [name,radius,size,color,speed]=p;

  const points=Array.from({length:180},(_,k)=>{
    const a=k/180*Math.PI*2;
    return new THREE.Vector3(Math.cos(a)*radius,0,Math.sin(a)*radius*.45);
  });

  const orbit=new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({color:0x4ecfff,transparent:true,opacity:.13})
  );
  root.add(orbit);

  const pivot=new THREE.Group();
  pivot.rotation.y=i*.8;
  root.add(pivot);

  const planet=sphere(size,color,.8,.02);
  planet.position.set(radius,0,0);

  if(name==="Earth") planet.material.map=textureBands(["#0a3c85","#1c8ed8","#4fb8ec","#0a3c85"]);
  if(name==="Jupiter") planet.material.map=textureBands(["#6f4636","#d4a878","#f0d1aa","#9c6547","#e2bd8b"]);
  if(name==="Saturn") planet.material.map=textureBands(["#826941","#d4bd83","#f0dfab","#a88753"]);

  if(name==="Saturn"){
    const ring=new THREE.Mesh(
      new THREE.RingGeometry(size*1.35,size*2.1,96),
      new THREE.MeshStandardMaterial({
        color:0xd8c392,side:THREE.DoubleSide,
        transparent:true,opacity:.78,roughness:.8
      })
    );
    ring.rotation.x=Math.PI/2.25;
    planet.add(ring);
  }

  pivot.add(planet);
  systems.push({pivot,planet,speed});
});

const starCount=4500;
const positions=new Float32Array(starCount*3);
for(let i=0;i<starCount;i++){
  const r=40+Math.random()*120;
  const a=Math.random()*Math.PI*2;
  positions[i*3]=Math.cos(a)*r;
  positions[i*3+1]=(Math.random()-.5)*70;
  positions[i*3+2]=Math.sin(a)*r+(Math.random()-.5)*90;
}
const starGeo=new THREE.BufferGeometry();
starGeo.setAttribute("position",new THREE.BufferAttribute(positions,3));
scene.add(new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({color:0xffffff,size:.055,transparent:true,opacity:.85})
));

let mx=0,my=0,targetX=0,targetY=0;
addEventListener("mousemove",e=>{
  mx=e.clientX;my=e.clientY;
  targetX=e.clientX/innerWidth-.5;
  targetY=e.clientY/innerHeight-.5;
});

function animate(t){
  requestAnimationFrame(animate);
  sun.rotation.y+=.002;
  glow.scale.setScalar(1+Math.sin(t*.002)*.035);

  systems.forEach((s,i)=>{
    s.pivot.rotation.y+=s.speed;
    s.planet.rotation.y+=.006+(i===4?.006:0);
  });

  camera.position.x+=(targetX*2.2-camera.position.x)*.035;
  camera.position.y+=(3-targetY*1.3-camera.position.y)*.035;
  camera.lookAt(0,0,0);
  renderer.render(scene,camera);
}
animate(0);

addEventListener("resize",()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

let load=0;
const timer=setInterval(()=>{
  load=Math.min(100,load+Math.ceil(Math.random()*9));
  $("#loaderBar").style.width=load+"%";
  $("#loaderText").textContent=load+"%";
  if(load===100){
    clearInterval(timer);
    setTimeout(()=>$("#loader").classList.add("hide"),350);
  }
},65);

const home=$("#home"),chapters=$("#chapters"),warp=$("#warp"),sector=$("#sectorText");

function switchScreen(name){
  warp.classList.add("active");
  setTimeout(()=>{
    home.classList.toggle("active",name==="home");
    chapters.classList.toggle("active",name==="chapters");
    sector.textContent=name==="home"?"HOME SECTOR":"MODULE SECTOR";
    root.visible=name==="home";
  },420);
  setTimeout(()=>warp.classList.remove("active"),950);
}

$("#startBtn").onclick=()=>switchScreen("chapters");
$("#backBtn").onclick=()=>switchScreen("home");
$("#logoBtn").onclick=()=>switchScreen("home");

const dot=$(".cursor-dot"),ring=$(".cursor-ring");
let rx=0,ry=0;
addEventListener("mousemove",e=>{
  dot.style.left=e.clientX+"px";
  dot.style.top=e.clientY+"px";
});
(function cursorLoop(){
  rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
  ring.style.left=rx+"px";ring.style.top=ry+"px";
  requestAnimationFrame(cursorLoop);
})();

$$("button").forEach(btn=>{
  btn.addEventListener("mouseenter",()=>ring.classList.add("on"));
  btn.addEventListener("mouseleave",()=>ring.classList.remove("on"));
});

const sparks=$("#sparks");
function burst(el,count=12){
  const r=el.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const s=document.createElement("i");
    s.className="spark";
    s.style.left=(r.left+Math.random()*r.width)+"px";
    s.style.top=(r.top+Math.random()*r.height)+"px";
    const a=Math.random()*Math.PI*2;
    const d=20+Math.random()*80;
    s.style.setProperty("--x",Math.cos(a)*d+"px");
    s.style.setProperty("--y",Math.sin(a)*d+"px");
    sparks.appendChild(s);
    setTimeout(()=>s.remove(),700);
  }
}

$$(".module").forEach(module=>{
  let sparkTimer;

  module.addEventListener("mouseenter",()=>{
    burst(module,16);
    sparkTimer=setInterval(()=>burst(module,4),140);
    $("#selectedTitle").textContent=module.dataset.title;
    $("#selectedCode").textContent=module.dataset.code;
  });

  module.addEventListener("mouseleave",()=>clearInterval(sparkTimer));

  module.addEventListener("mousemove",e=>{
    const r=module.getBoundingClientRect();
    module.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");
    module.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");
  });
});

$$(".magnetic").forEach(el=>{
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect();
    el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="");
});

let audio,osc,gain,sound=false;
$("#soundBtn").onclick=()=>{
  sound=!sound;
  const btn=$("#soundBtn");
  btn.classList.toggle("active",sound);
  btn.querySelector("span").textContent=sound?"SOUND ON":"SOUND OFF";

  if(sound&&!audio){
    audio=new (window.AudioContext||window.webkitAudioContext)();
    osc=audio.createOscillator();
    gain=audio.createGain();
    osc.type="sine";
    osc.frequency.value=55;
    gain.gain.value=.025;
    osc.connect(gain).connect(audio.destination);
    osc.start();
  }

  if(audio){
    gain.gain.setTargetAtTime(sound?.025:0,audio.currentTime,.15);
  }
};
