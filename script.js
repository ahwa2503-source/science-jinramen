/* =========================================================
   SCIENCE CORE - script.js
========================================================= */

const planetData = {
  sun: {
    code: "SOL-00",
    english: "SUN",
    korean: "태양",
    type: "G-TYPE MAIN-SEQUENCE STAR",
    description:
      "태양계의 중심에 있는 항성입니다. 태양의 중력은 모든 행성과 천체를 궤도에 붙잡아 두며, 지구 생명체에 필요한 빛과 에너지를 공급합니다.",
    distance: "0 KM",
    orbit: "CENTER OBJECT",
    temperature: "5,500°C",
    moons: "00",
    previewClass: "preview-planet--sun",
  },

  mercury: {
    code: "SOL-01",
    english: "MERCURY",
    korean: "수성",
    type: "TERRESTRIAL PLANET",
    description:
      "태양에서 가장 가까운 행성입니다. 대기가 매우 희박해 낮과 밤의 온도 차이가 극심하며, 표면에는 수많은 충돌구가 존재합니다.",
    distance: "57.9M KM",
    orbit: "88 DAYS",
    temperature: "167°C",
    moons: "00",
    previewClass: "preview-planet--mercury",
  },

  venus: {
    code: "SOL-02",
    english: "VENUS",
    korean: "금성",
    type: "TERRESTRIAL PLANET",
    description:
      "두꺼운 이산화탄소 대기와 강력한 온실 효과를 가진 행성입니다. 태양계 행성 중 평균 표면 온도가 가장 높습니다.",
    distance: "108.2M KM",
    orbit: "224.7 DAYS",
    temperature: "464°C",
    moons: "00",
    previewClass: "preview-planet--venus",
  },

  earth: {
    code: "SOL-03",
    english: "EARTH",
    korean: "지구",
    type: "TERRESTRIAL PLANET",
    description:
      "태양계에서 생명체가 존재하는 것으로 알려진 유일한 행성입니다. 풍부한 액체 상태의 물과 산소를 포함한 대기를 가지고 있습니다.",
    distance: "149.6M KM",
    orbit: "365.25 DAYS",
    temperature: "15°C",
    moons: "01",
    previewClass: "preview-planet--earth",
  },

  mars: {
    code: "SOL-04",
    english: "MARS",
    korean: "화성",
    type: "TERRESTRIAL PLANET",
    description:
      "산화철 때문에 붉게 보이는 행성입니다. 과거에 액체 상태의 물이 흘렀던 흔적이 발견되어 생명체 가능성이 연구되고 있습니다.",
    distance: "227.9M KM",
    orbit: "687 DAYS",
    temperature: "-63°C",
    moons: "02",
    previewClass: "preview-planet--mars",
  },

  jupiter: {
    code: "SOL-05",
    english: "JUPITER",
    korean: "목성",
    type: "GAS GIANT",
    description:
      "태양계에서 가장 큰 행성입니다. 거대한 대기 폭풍인 대적점이 존재하며, 강력한 자기장과 많은 위성을 가지고 있습니다.",
    distance: "778.5M KM",
    orbit: "11.86 YEARS",
    temperature: "-110°C",
    moons: "95+",
    previewClass: "preview-planet--jupiter",
  },

  saturn: {
    code: "SOL-06",
    english: "SATURN",
    korean: "토성",
    type: "GAS GIANT",
    description:
      "얼음과 암석 조각으로 이루어진 거대한 고리로 유명한 행성입니다. 밀도가 매우 낮고 수많은 위성을 거느리고 있습니다.",
    distance: "1.43B KM",
    orbit: "29.45 YEARS",
    temperature: "-140°C",
    moons: "140+",
    previewClass: "preview-planet--saturn",
  },

  uranus: {
    code: "SOL-07",
    english: "URANUS",
    korean: "천왕성",
    type: "ICE GIANT",
    description:
      "자전축이 거의 옆으로 누워 있는 독특한 행성입니다. 메탄 성분 때문에 청록색으로 보이며 매우 추운 대기를 가지고 있습니다.",
    distance: "2.87B KM",
    orbit: "84 YEARS",
    temperature: "-195°C",
    moons: "27",
    previewClass: "preview-planet--uranus",
  },

  neptune: {
    code: "SOL-08",
    english: "NEPTUNE",
    korean: "해왕성",
    type: "ICE GIANT",
    description:
      "태양에서 가장 멀리 떨어진 행성입니다. 태양계에서 가장 강력한 바람이 관측되며 깊고 푸른 대기를 가지고 있습니다.",
    distance: "4.50B KM",
    orbit: "164.8 YEARS",
    temperature: "-200°C",
    moons: "14",
    previewClass: "preview-planet--neptune",
  },
};

const planetOrder = [
  "sun",
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

let currentPlanetIndex = 3;

/* =========================================================
   로딩 화면
========================================================= */

const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercent = document.getElementById("loaderPercent");

let loadingValue = 0;

const loadingInterval = setInterval(() => {
  loadingValue += Math.floor(Math.random() * 8) + 3;

  if (loadingValue >= 100) {
    loadingValue = 100;

    clearInterval(loadingInterval);

    setTimeout(() => {
      loader.classList.add("hide");
      document.body.classList.add("loaded");
    }, 400);
  }

  loaderProgress.style.width = `${loadingValue}%`;
  loaderPercent.textContent = `${loadingValue}%`;
}, 70);

/* =========================================================
   별 배경 캔버스
========================================================= */

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

let stars = [];
let shootingStars = [];

const mouse = {
  x: width / 2,
  y: height / 2,
};

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  createStars();
}

function createStars() {
  const starCount = Math.floor((width * height) / 6500);

  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.2,
    opacity: Math.random() * 0.8 + 0.15,
    speed: Math.random() * 0.08 + 0.015,
    twinkle: Math.random() * Math.PI * 2,
    color:
      Math.random() > 0.88
        ? "110, 180, 255"
        : Math.random() > 0.92
          ? "190, 130, 255"
          : "255, 255, 255",
  }));
}

function createShootingStar() {
  if (shootingStars.length > 2) return;

  shootingStars.push({
    x: Math.random() * width * 0.75,
    y: Math.random() * height * 0.35,
    length: Math.random() * 120 + 100,
    speed: Math.random() * 7 + 8,
    opacity: 1,
  });
}

function drawStars(time) {
  ctx.clearRect(0, 0, width, height);

  const parallaxX = (mouse.x - width / 2) * 0.002;
  const parallaxY = (mouse.y - height / 2) * 0.002;

  stars.forEach((star) => {
    star.y += star.speed;

    if (star.y > height + 5) {
      star.y = -5;
      star.x = Math.random() * width;
    }

    const twinkle =
      star.opacity +
      Math.sin(time * 0.0015 + star.twinkle) * 0.18;

    const x = star.x + parallaxX * star.radius * 12;
    const y = star.y + parallaxY * star.radius * 12;

    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${star.color}, ${Math.max(0.08, twinkle)})`;
    ctx.fill();

    if (star.radius > 1.15) {
      ctx.beginPath();
      ctx.moveTo(x - star.radius * 3, y);
      ctx.lineTo(x + star.radius * 3, y);

      ctx.moveTo(x, y - star.radius * 3);
      ctx.lineTo(x, y + star.radius * 3);

      ctx.strokeStyle = `rgba(${star.color}, ${twinkle * 0.28})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  });

  shootingStars.forEach((shootingStar, index) => {
    const gradient = ctx.createLinearGradient(
      shootingStar.x,
      shootingStar.y,
      shootingStar.x - shootingStar.length,
      shootingStar.y - shootingStar.length * 0.55,
    );

    gradient.addColorStop(
      0,
      `rgba(190, 235, 255, ${shootingStar.opacity})`,
    );

    gradient.addColorStop(1, "rgba(80, 170, 255, 0)");

    ctx.beginPath();

    ctx.moveTo(
      shootingStar.x,
      shootingStar.y,
    );

    ctx.lineTo(
      shootingStar.x - shootingStar.length,
      shootingStar.y - shootingStar.length * 0.55,
    );

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    shootingStar.x += shootingStar.speed;
    shootingStar.y += shootingStar.speed * 0.55;
    shootingStar.opacity -= 0.018;

    if (
      shootingStar.opacity <= 0 ||
      shootingStar.x > width + shootingStar.length
    ) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

resizeCanvas();
requestAnimationFrame(drawStars);

setInterval(() => {
  if (Math.random() > 0.35) {
    createShootingStar();
  }
}, 3800);

/* =========================================================
   커스텀 커서
========================================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let cursorX = 0;
let cursorY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;

  cursorDot.style.transform =
    `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
});

function animateCursor() {
  ringX += (cursorX - ringX) * 0.16;
  ringY += (cursorY - ringY) * 0.16;

  cursorRing.style.transform =
    `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

document
  .querySelectorAll("a, button, .planet-card")
  .forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorRing.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("active");
    });
  });

/* =========================================================
   헤더 스크롤 / 메뉴
========================================================= */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
const navigationLinks = document.querySelectorAll(".navigation__link");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("active");
  navigation.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.classList.remove("active");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

/* =========================================================
   현재 섹션 네비게이션 표시
========================================================= */

const sections = document.querySelectorAll("main .section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      navigationLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentId}`,
        );
      });
    });
  },
  {
    threshold: 0.45,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* =========================================================
   스크롤 등장 애니메이션
========================================================= */

const revealElements = document.querySelectorAll(
  ".section-heading, .solar-interface, .planet-list, .mission-card, .analytics-card, .final-cta",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      if (entry.target.classList.contains("analytics-card")) {
        startCounters(entry.target);
      }

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   행성 정보 변경
========================================================= */

const planetCode = document.getElementById("planetCode");
const planetEnglish = document.getElementById("planetEnglish");
const planetKorean = document.getElementById("planetKorean");
const planetType = document.getElementById("planetType");
const planetDescription = document.getElementById("planetDescription");
const planetDistance = document.getElementById("planetDistance");
const planetOrbit = document.getElementById("planetOrbit");
const planetTemperature = document.getElementById("planetTemperature");
const planetMoons = document.getElementById("planetMoons");
const planetIndex = document.getElementById("planetIndex");
const planetProgress = document.getElementById("planetProgress");
const previewPlanet = document.getElementById("previewPlanet");

const selectors = document.querySelectorAll(".planet-selector");
const planetCards = document.querySelectorAll(".planet-card");

function updatePlanet(planetName) {
  const data = planetData[planetName];

  if (!data) return;

  currentPlanetIndex = planetOrder.indexOf(planetName);

  planetCode.textContent = data.code;
  planetEnglish.textContent = data.english;
  planetKorean.textContent = data.korean;
  planetType.textContent = data.type;
  planetDescription.textContent = data.description;
  planetDistance.textContent = data.distance;
  planetOrbit.textContent = data.orbit;
  planetTemperature.textContent = data.temperature;
  planetMoons.textContent = data.moons;

  planetIndex.textContent = String(currentPlanetIndex + 1).padStart(2, "0");

  planetProgress.style.width =
    `${((currentPlanetIndex + 1) / planetOrder.length) * 100}%`;

  previewPlanet.className =
    `preview-planet ${data.previewClass}`;

  previewPlanet.innerHTML = `
    <span class="preview-planet__light"></span>
    <span class="preview-planet__shadow"></span>
  `;

  planetCards.forEach((card) => {
    card.classList.toggle(
      "planet-card--active",
      card.dataset.planet === planetName,
    );
  });

  const informationPanel = document.querySelector(".planet-information");

  informationPanel.animate(
    [
      {
        opacity: 0.65,
        transform: "translateY(8px)",
      },
      {
        opacity: 1,
        transform: "translateY(0)",
      },
    ],
    {
      duration: 450,
      easing: "ease-out",
    },
  );
}

selectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    updatePlanet(selector.dataset.planet);
  });
});

/* 이전 / 다음 행성 */

const previousPlanet = document.getElementById("previousPlanet");
const nextPlanet = document.getElementById("nextPlanet");

previousPlanet.addEventListener("click", () => {
  currentPlanetIndex -= 1;

  if (currentPlanetIndex < 0) {
    currentPlanetIndex = planetOrder.length - 1;
  }

  updatePlanet(planetOrder[currentPlanetIndex]);
});

nextPlanet.addEventListener("click", () => {
  currentPlanetIndex += 1;

  if (currentPlanetIndex >= planetOrder.length) {
    currentPlanetIndex = 0;
  }

  updatePlanet(planetOrder[currentPlanetIndex]);
});

/* 키보드 방향키로 행성 변경 */

window.addEventListener("keydown", (event) => {
  const solarSection = document.getElementById("solar-system");
  const rect = solarSection.getBoundingClientRect();

  const solarSectionVisible =
    rect.top < window.innerHeight &&
    rect.bottom > 0;

  if (!solarSectionVisible) return;

  if (event.key === "ArrowLeft") {
    previousPlanet.click();
  }

  if (event.key === "ArrowRight") {
    nextPlanet.click();
  }
});

/* =========================================================
   숫자 카운터
========================================================= */

const countedElements = new WeakSet();

function startCounters(parentElement) {
  const counters = parentElement.querySelectorAll("[data-counter]");

  counters.forEach((counter) => {
    if (countedElements.has(counter)) return;

    countedElements.add(counter);

    const target = Number(counter.dataset.counter);
    const duration = 1700;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      const currentValue = Math.floor(target * easedProgress);

      counter.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/* =========================================================
   자석 버튼 효과
========================================================= */

const magneticElements = document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 900) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    element.style.transform =
      `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translate(0, 0)";
  });
});

/* =========================================================
   태양계 지도 마우스 기울기
========================================================= */

const solarMap = document.getElementById("solarMap");

solarMap.addEventListener("mousemove", (event) => {
  if (window.innerWidth <= 900) return;

  const rect = solarMap.getBoundingClientRect();

  const x =
    (event.clientX - rect.left) / rect.width - 0.5;

  const y =
    (event.clientY - rect.top) / rect.height - 0.5;

  solarMap.style.transform =
    `perspective(1000px) rotateX(${y * -2.2}deg) rotateY(${x * 2.2}deg)`;
});

solarMap.addEventListener("mouseleave", () => {
  solarMap.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg)";
});

/* =========================================================
   사운드 버튼
========================================================= */

const soundButton = document.getElementById("soundButton");
const soundText = document.getElementById("soundText");

let audioContext = null;
let spaceGain = null;
let soundEnabled = false;

function startSpaceSound() {
  const AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;

  if (!AudioContext) return;

  audioContext = new AudioContext();

  const oscillatorOne = audioContext.createOscillator();
  const oscillatorTwo = audioContext.createOscillator();

  const gainOne = audioContext.createGain();
  const gainTwo = audioContext.createGain();

  spaceGain = audioContext.createGain();

  oscillatorOne.type = "sine";
  oscillatorTwo.type = "sine";

  oscillatorOne.frequency.value = 54;
  oscillatorTwo.frequency.value = 82;

  gainOne.gain.value = 0.045;
  gainTwo.gain.value = 0.018;
  spaceGain.gain.value = 0.7;

  oscillatorOne.connect(gainOne);
  oscillatorTwo.connect(gainTwo);

  gainOne.connect(spaceGain);
  gainTwo.connect(spaceGain);

  spaceGain.connect(audioContext.destination);

  oscillatorOne.start();
  oscillatorTwo.start();
}

soundButton.addEventListener("click", async () => {
  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    if (!audioContext) {
      startSpaceSound();
    }

    if (audioContext?.state === "suspended") {
      await audioContext.resume();
    }

    if (spaceGain) {
      spaceGain.gain.setTargetAtTime(
        0.7,
        audioContext.currentTime,
        0.15,
      );
    }

    soundButton.classList.add("active");
    soundText.textContent = "SOUND ON";
  } else {
    if (spaceGain && audioContext) {
      spaceGain.gain.setTargetAtTime(
        0,
        audioContext.currentTime,
        0.15,
      );
    }

    soundButton.classList.remove("active");
    soundText.textContent = "SOUND OFF";
  }
});

/* =========================================================
   스크롤 시 히어로 패럴랙스
========================================================= */

const heroContent = document.querySelector(".hero__content");
const heroSystem = document.querySelector(".hero-system");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY < window.innerHeight * 1.2) {
    heroContent.style.transform =
      `translateY(${scrollY * 0.12}px)`;

    heroContent.style.opacity =
      Math.max(0, 1 - scrollY / 900);

    heroSystem.style.marginTop =
      `${scrollY * 0.09}px`;
  }
});

/* =========================================================
   카드 마우스 빛 효과
========================================================= */

const interactiveCards = document.querySelectorAll(
  ".mission-card, .analytics-card, .planet-card",
);

interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(65, 229, 255, 0.09),
        transparent 34%
      ),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.01)
      ),
      rgba(5, 10, 25, 0.52)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});

/* =========================================================
   초기 행성 설정
========================================================= */

updatePlanet("earth");

/* =========================================================
   큰 행성 마우스 3D 회전
========================================================= */

const planetPreviewArea = document.getElementById("planetPreview");

planetPreviewArea.addEventListener("mousemove", (event) => {
  if (window.innerWidth <= 900) return;

  const rect = planetPreviewArea.getBoundingClientRect();

  const mouseX =
    (event.clientX - rect.left) / rect.width - 0.5;

  const mouseY =
    (event.clientY - rect.top) / rect.height - 0.5;

  previewPlanet.style.animation = "none";

  previewPlanet.style.transform = `
    perspective(700px)
    rotateX(${mouseY * -24}deg)
    rotateY(${mouseX * 32}deg)
    scale(1.05)
  `;
});

planetPreviewArea.addEventListener("mouseleave", () => {
  previewPlanet.style.transform = "";

  previewPlanet.style.animation =
    "previewPlanet3D 6s ease-in-out infinite";
});
