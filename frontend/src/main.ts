import * as THREE from 'three';
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const progressBar = document.getElementById("progress-bar") as HTMLElement;
const progressText = document.getElementById("progress-text") as HTMLElement;
const enterBtn = document.getElementById("enter-btn") as HTMLElement;
const hasEntered = sessionStorage.getItem("mahimaaWorldEntered");
const terminal = document.getElementById("terminal-text") as HTMLElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let idleAction: THREE.AnimationAction | null = null;
let isIntroPlaying = true;
let idleState = 0;
let lastIdleChange = 0;
const messages = [
  "Initializing Mahimaa AI...",
  "Loading personality...",
  "Activating curiosity engine...",
  "Debugging bad jokes...",
  "Synchronizing dreams...",
  "Preparing Mahimaa to say hello..."
];

let progress = 0;
let msgIndex = 0;
function startLoadingAnimation() {
const loadingInterval = setInterval(() => {

  progress += 1;

  progressBar.style.width = progress + "%";
  progressText.innerText = `Loading ${progress}%`;

  // ADD messages gradually (not replace)
    if (progress % 15 === 0 && msgIndex < messages.length) {
    terminal.innerHTML += `<div>> ${messages[msgIndex]}</div>`;
    msgIndex++;
  }

  if (progress >= 100) {

    clearInterval(loadingInterval);

    terminal.innerHTML += `<div class="highlight-line">> They call me Mahimaa.</div>`;

enterBtn.style.display = "inline-block";
enterBtn.style.opacity = "0";


setTimeout(() => {
  enterBtn.style.opacity = "1";
}, 100);

}

}, 80);
}
if (hasEntered) {

    const loadingScreen = document.getElementById("loading-screen") as HTMLElement;

    loadingScreen.style.display = "none";

    startAvatarScene();

} else {

    startLoadingAnimation();

}
enterBtn.addEventListener("click", () => {

  const loadingScreen = document.getElementById("loading-screen") as HTMLElement;

  loadingScreen.style.opacity = "0";

  setTimeout(() => {

    loadingScreen.style.display = "none";

    startAvatarScene();

  }, 600);

});

function startAvatarScene() {

  console.log("Starting Mahimaa Avatar World");

  // EVERYTHING related to Three.js must go inside this function

// ---------- Scene ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color("#1E1333"); // deep purple base
let avatar: THREE.Object3D;
let introStarted = false;
let mixer: THREE.AnimationMixer | null = null;
//JUGNU EFFECT
const particleCount = 200;

const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;     // x
  positions[i * 3 + 1] = Math.random() * 5;          // y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.03,
  transparent: true,
  opacity: 0.8,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);
// ---------- Camera ----------
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// ✅ PERFECT START VIEW
camera.position.set(0, 1.6, 5.5);
camera.lookAt(0, 1.2, 0);
// circle
const stageGeometry = new THREE.CircleGeometry(2, 64);

const stageMaterial = new THREE.MeshStandardMaterial({
  color: "#2D1E4F",
  roughness: 0.25,
  metalness: 0.6,
});

const stage = new THREE.Mesh(stageGeometry, stageMaterial);
stage.rotation.x = -Math.PI / 2;
stage.position.y = 0;
scene.add(stage);

// ✅ CREATE RING AFTER
const ringGeometry = new THREE.RingGeometry(2, 2.2, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: "#B6B0D8",
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.4,
});

const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.01;
scene.add(ring);
// ---------- Renderer ----------
const canvas = document.getElementById('webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

 const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
keyLight.position.set(2, 5, 5);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xB6B0D8, 1.2);
rimLight.position.set(-3, 3, -3);
scene.add(rimLight);

// Ground shadow catcher
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.ShadowMaterial({ opacity: 0.25 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.001;
ground.receiveShadow = true;
scene.add(ground);

// ---------- Controls ----------
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.enableZoom = true;
controls.dampingFactor = 0.05;

// ✅ FULL CONTROL
controls.minDistance = 0.8;
controls.maxDistance = 25;

// ✅ LOOK AT FULL BODY (IMPORTANT)
controls.target.set(0, 1.2, 0);

// ✅ LIMIT WEIRD ANGLES
controls.minPolarAngle = Math.PI / 4;   // 45°
controls.maxPolarAngle = Math.PI / 2;   // 90°

controls.enablePan = false;
controls.zoomSpeed = 0.8;
controls.rotateSpeed = 0.6;
controls.update();
function startDialogueSequence() {
  showDialogue("Hi 👋 I’m Mahimaa’s identical twin 😄");

  playIntroAnimation();

  setTimeout(() => {
    showDialogue("I hope your day is 10/10 ✨");
  }, 2500);

  setTimeout(() => {
    showDialogue("Who’s visiting me today?");
    
    setTimeout(() => {
     // hideDialogue();
      showTopPrompt();
      createIcons();   // 👈 ADD THIS
  showIcons();     // 👈 ADD THIS
    }, 1500); // 👈 delay so user reads
  }, 5000);
}
let typingInterval: any;
let icons: THREE.Mesh[] = [];
function createRoundedRect(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();

  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return new THREE.ShapeGeometry(shape);
}

const textureLoader = new THREE.TextureLoader();

const iconTextures = [
  textureLoader.load("/icons/recruiter.png"),
  textureLoader.load("/icons/developer.png"),
  textureLoader.load("/icons/learner.png"),
  textureLoader.load("/icons/stalker.png"),
];
iconTextures.forEach(tex => {
  tex.colorSpace = THREE.SRGBColorSpace;

  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;

  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
});
function createIcons() {

  const positions = [
    new THREE.Vector3(-2.2, 2.4, 0.2),
    new THREE.Vector3(-2.2, 1.2, 0.2),
    new THREE.Vector3(2.2, 2.4, 0.2),
    new THREE.Vector3(2.2, 1.2, 0.2),
  ];
  


for (let i = 0; i < 4; i++) {
const cardMaterial = new THREE.MeshStandardMaterial({
  color: "#B6B0D8",
  roughness: 0.3,
  metalness: 0.2,
});
const card = new THREE.Mesh(
  createRoundedRect(0.8, 0.8, 0.25),
  cardMaterial
);
  // 🖼 ICON (image inside)
    const iconMaterial = new THREE.MeshBasicMaterial({
      map: iconTextures[i],
      transparent: true,
      alphaTest: 0.1,
    });

    const icon = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.8), // smaller than card
      iconMaterial
    );
const glowMaterial = new THREE.MeshBasicMaterial({
  color: "#E6E5F2",
  transparent: true,
  opacity: 0.6,
});

const glow = new THREE.Mesh(
  createRoundedRect(0.85, 0.85, 0.25),
  glowMaterial
);
    // center icon inside card
    icon.position.set(0, 0, 0.01);

    // combine
    card.add(icon);

    // initial position (behind avatar)
    card.position.set(0, 1.5, -2);
    card.scale.set(0, 0, 0);

    card.userData = {
      type: "icon",
      index: i
    };

    scene.add(card);
    icons.push(card);
glow.position.z = -0.01;
card.add(glow);
    (card as any).targetPosition = positions[i];
  }
}
function showIcons(skipAnimation = false) {

    icons.forEach((card, index) => {

        const target = (card as any).targetPosition;

        if (skipAnimation) {

            card.position.copy(target);
            card.scale.set(1, 1, 1);

        } else {

            gsap.to(card.position, {
                x: target.x,
                y: target.y,
                z: target.z,
                delay: index * 0.2,
                duration: 1.2,
                ease: "power3.out"
            });

            gsap.to(card.scale, {
                x: 1,
                y: 1,
                z: 1,
                delay: index * 0.2,
                duration: 0.6,
                ease: "back.out(2)"
            });

        }

    });

}
function showDialogue(text: string) {
  const box = document.getElementById("dialogueBox");
  const content = document.getElementById("dialogueText");

  if (!box || !content) return;

  // 🔥 CLEAR previous typing
  if (typingInterval) clearInterval(typingInterval);

  box.style.opacity = "1";
  content.innerText = " ";

  let i = 0;

  typingInterval = setInterval(() => {
    content.innerText = text.slice(0, i + 1);
    i++;
console.log("Dialogue:", text);
    if (i >= text.length) clearInterval(typingInterval);
  }, 30);
}

function showTopPrompt() {
  const prompt = document.getElementById("topPrompt");
  if (prompt) {
    prompt.style.opacity = "0";
    setTimeout(() => {
      prompt.style.opacity = "1";
    }, 100);
  }
}
function setRelaxedPose() {

  const rUpper = avatar.getObjectByName("RightArm") as THREE.Object3D | null;
  const rFore = avatar.getObjectByName("RightForeArm") as THREE.Object3D | null;

  const lUpper = avatar.getObjectByName("LeftArm") as THREE.Object3D | null;
  const lFore = avatar.getObjectByName("LeftForeArm") as THREE.Object3D | null;

  if (rUpper && rFore) {
    rUpper.rotation.x = 1.1;
    rUpper.rotation.z = 0;
    rFore.rotation.x = 0;
  }

  if (lUpper && lFore) {
    lUpper.rotation.x = 1.1;
    lUpper.rotation.z = 0;
    lFore.rotation.x = 0;
  }
}
// 🎭 INTRO ANIMATION (WAVE + BOW)
function playIntroAnimation() {

  const rightArm = avatar.getObjectByName("RightArm");
 const spine = avatar.getObjectByName("Spine") as THREE.Object3D|null;

  if (!rightArm || !spine) {
    console.warn("Bones not found");
    return;
  }

 let t = 0;
const leftUpperArm = avatar.getObjectByName("LeftArm") as THREE.Object3D | null;
const leftForeArm = avatar.getObjectByName("LeftForeArm") as THREE.Object3D | null;
const leftHand = avatar.getObjectByName("LeftHand") as THREE.Object3D | null;
const upperArm = avatar.getObjectByName("RightArm") as THREE.Object3D | null;
const foreArm = avatar.getObjectByName("RightForeArm") as THREE.Object3D | null;
const hand = avatar.getObjectByName("RightHand") as THREE.Object3D | null;


if (!upperArm || !foreArm || !hand) {
  console.warn("Bones not found");
  return;
}
// ✅ base pose (ONLY ONCE)
// natural arm lift
upperArm.rotation.x = -0.3;   // forward
upperArm.rotation.z = 0.2;   // slight outward

// elbow bend
foreArm.rotation.x = -1.5;

// ✨ CORRECT PALM ORIENTATION
hand.rotation.x = -1.8;          // straight
hand.rotation.y =0.8;    // full front
const baseZ = Math.PI / 2 + 0.3; // instead of exact 90°     // slight natural tilt

// palm facing front

const wave = setInterval(() => {
  t += 0.1;


// 👋 left-right wave (clean)
hand.rotation.z = baseZ + Math.sin(t * 5) * 0.2;

  if (t > 2.5) {
    clearInterval(wave);

    // ✅ smooth return
    let t3 = 0;

    const returnAnim = setInterval(() => {
      t3 += 0.05;

      upperArm.rotation.z += (0 - upperArm.rotation.z) * 0.15;
      upperArm.rotation.x += (0 - upperArm.rotation.x) * 0.15;
      foreArm.rotation.x += (0 - foreArm.rotation.x) * 0.15;
      hand.rotation.x += (0 - hand.rotation.x) * 0.15;
      hand.rotation.z += (0 - hand.rotation.z) * 0.15;

      if (t3 > 1) {
        clearInterval(returnAnim);

      setRelaxedPose(); 
        bow();
      }
    }, 50);
  }
}, 50);

  function bow() {
    let t2 = 0;

    const bowAnim = setInterval(() => {
      t2 += 0.05;

     spine!.rotation.x = Math.sin(t2) * 0.4;

      if (t2 > Math.PI) {
  clearInterval(bowAnim);
  spine!.rotation.x = 0;

  // 🎬 START IDLE ANIMATION HERE
  if (idleAction) {
    idleAction.reset();
    idleAction.fadeIn(0.5);
    idleAction.play();
  }

  isIntroPlaying = false;
}

    }, 30);
  }
}
const titles = [
    "RECRUITER",
    "FELLOW DEVELOPER",
    "LEARNER",
    "RANDOM STALKER"
];

titles.forEach((title, index) => {

    const label = document.createElement("div");

    label.id = `label-${index}`;

    label.className = "floating-label";

    label.innerText = title;

    document.body.appendChild(label);

});
function showLabels() {
  icons.forEach((card, i) => {

    const label = document.getElementById(`label-${i}`);

    if (!label) return;

    const pos = card.position;

    // convert 3D → screen position
    const vector = pos.clone().project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

    label.style.transform = "translateX(-50%)";
    const offsets = [
  { x: 0, y: -120 },   // Recruiter
  { x: 0, y: 80 },     // Fellow Developer
  { x: 0, y: -120 },   // Learner
  { x: 0, y: 80 }      // Random Stalker
];

label.style.left = `${x + offsets[i].x}px`;
label.style.top = `${y + offsets[i].y}px`;// ABOVE card
    label.style.opacity = "1";
  });
}
  // ✅ DEFINE FUNCTION HERE (GOOD PLACE)
  function startCinematicEntry() {
    controls.enabled = false;

    camera.position.set(0, 4, 10);

    gsap.to(camera.position, {
      x: 0,
      y: 1.6,
      z: 5.5,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        if (avatar) camera.lookAt(0, 1.2, 0);
      },
      onComplete: () => {
        controls.enabled = true;

        if (!introStarted) {
          introStarted = true;
          startDialogueSequence();
        }
      }
    });
  }
// ---------- Load GLB ----------
const gltfLoader = new GLTFLoader();

console.log('▶ Loading /Mahimaamain.glb …');

gltfLoader.load(
  '/Mahimaamain.glb',
  (gltf) => {
    console.log('✅ GLB loaded');
    avatar = gltf.scene;

    avatar.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      
}
console.log("Animations:", gltf.animations);
console.log("Names:", gltf.animations.map(a => a.name)); 
 });
scene.add(avatar);
if (hasEntered) {

    controls.enabled = true;

    camera.position.set(0, 1.6, 5.5);
    camera.lookAt(0, 1.2, 0);

    createIcons();
    showIcons(true);

    const dialogueBox = document.getElementById("dialogueBox");
    if (dialogueBox) {
        dialogueBox.style.display = "none";
    }

    showTopPrompt();

} else {

    startCinematicEntry();

}

let currentHovered: THREE.Object3D | null = null;

window.addEventListener("mousemove", (event) => {

  // 🎯 update mouse
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // 🎯 raycast
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(icons, true);

  if (intersects.length > 0) {

    const obj = intersects[0].object.parent; // card

    // ✅ avoid re-triggering same animation
    if (currentHovered !== obj) {

      // reset previous
      if (currentHovered) {
        gsap.to(currentHovered.scale, {
          x: 1,
          y: 1,
          duration: 0.3
        });
      }

     

      // 🔥 hover effect
     const obj = intersects[0].object.parent as THREE.Object3D;
 currentHovered = obj;
gsap.to(obj.scale, {
  x: 1.1,
  y: 1.1,
  duration: 0.3
});
    }

  } else {
    // ❌ no hover → reset
    if (currentHovered) {
      gsap.to(currentHovered.scale, {
        x: 1,
        y: 1,
        duration: 0.3
      });
      currentHovered = null;
    }
  }

});
window.addEventListener("click", (event) => {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(icons, true);

    if (intersects.length === 0) return;

    let obj: any = intersects[0].object;

    // climb up until we reach the card
    while (obj && obj.userData.index === undefined) {

        obj = obj.parent;

    }

    if (obj && obj.userData.index !== undefined) {

        gsap.to(obj.scale, {

    x: 1.2,
    y: 1.2,
    z: 1.2,

    duration: 0.2,

    yoyo: true,

    repeat: 1,

    onComplete: () => {

        handleIconClick(obj.userData.index);

    }

});

    }

});
function handleIconClick(index: number) {

    sessionStorage.setItem("mahimaaWorldEntered", "true");

    switch (index) {

        case 0:
            window.location.href = "/recruiter.html";
            break;

        case 1:
            window.location.href = "/developer.html";
            break;

        case 2:
            window.location.href = "/learner.html";
            break;

        case 3:
            window.location.href = "/stalker.html";
            break;
    }
}


window.addEventListener("wheel", (event) => {

  if (!avatar) return;

  event.preventDefault();

  // 🔥 get cursor intersection FIRST
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(avatar, true);

  if (intersects.length > 0) {
    const point = intersects[0].point;

    // 🎯 DIRECTLY SET TARGET (NO LERP HERE)
    controls.target.copy(point);
  }

  // NOW let OrbitControls handle zoom
  controls.update();

}, { passive: false });


// 🎯 Perfect positioning
avatar.scale.set(1.8, 1.8, 1.8);

// 🔥 AUTO PLACE FEET ON GROUND (BEST METHOD)
const box = new THREE.Box3().setFromObject(avatar);
const height = box.max.y - box.min.y;

// move so feet touch stage
avatar.position.y = -box.min.y;

const testLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(testLight);

console.log("Model loaded:", avatar);
    
// ---------- Animate ----------
const clock = new THREE.Clock();
function tick() {
  

  controls.update();
particles.rotation.y += 0.0005;
  // Subtle idle breathing sway
if (avatar && !isIntroPlaying) {

  const t = clock.elapsedTime;

  // ⏱ change state every 4 seconds
  if (t - lastIdleChange > 4) {
    idleState = (idleState + 1) % 3;
    lastIdleChange = t;
  }

  const spine = avatar.getObjectByName("Spine") as THREE.Object3D | null;
  const head = avatar.getObjectByName("Head") as THREE.Object3D | null;

  // 🎭 STATE MACHINE
  switch (idleState) {

    // 🌬️ STATE 0: BREATHING + RELAX
    case 0:
      avatar.position.y = Math.sin(t * 1.5) * 0.03;
      avatar.rotation.y = Math.sin(t * 0.5) * 0.05;

      if (spine) spine.rotation.x = Math.sin(t * 1.2) * 0.04;
      if (head) head.rotation.y = Math.sin(t * 0.6) * 0.1;
      break;

    // 🤔 STATE 1: THINKING POSE
    case 1:
      avatar.rotation.y = Math.sin(t * 0.3) * 0.2;

      if (head) {
        head.rotation.y = Math.sin(t * 0.8) * 0.3;
        head.rotation.x = Math.sin(t * 0.5) * 0.1;
      }

      if (spine) spine.rotation.x = 0.1;
      break;

    // 🧍‍♀️ STATE 2: WEIGHT SHIFT
    case 2:
      avatar.position.x = Math.sin(t * 0.7) * 0.1;

      if (spine) spine.rotation.z = Math.sin(t * 0.7) * 0.1;
      if (head) head.rotation.y = Math.sin(t * 0.4) * 0.2;
      break;
  }
}

  // Blink (fake via eyes bones)
  if (Math.random() < 0.005) {
    const leftEye = avatar.getObjectByName("LeftEye");
    const rightEye = avatar.getObjectByName("RightEye");
    if (leftEye && rightEye) {
      leftEye.rotation.x = 0.4; // close
      rightEye.rotation.x = 0.4;
      setTimeout(() => {
        leftEye.rotation.x = 0; // open
        rightEye.rotation.x = 0;
      }, 150);
    }
  }

  // Talking simulation (just for demo)
  if (Math.random() < 0.02) {
    setMorph("Wolf3D_Head", "mouthOpen", 1);
    setTimeout(() => setMorph("Wolf3D_Head", "mouthOpen", 0), 200);
  }

  // Smile toggle sometimes
  if (Math.random() < 0.001) {
    setMorph("Wolf3D_Head", "mouthSmile", 1);
    setTimeout(() => setMorph("Wolf3D_Head", "mouthSmile", 0), 800);
  }
  const delta = clock.getDelta();

if (mixer) {
  mixer.update(delta);
}
showLabels();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
icons.forEach(icon => {
  icon.lookAt(camera.position);
});

tick();

avatar.traverse((child) => {
    if ((child as THREE.Bone).isBone) {
      console.log("Bone:", child.name);
    }
    if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).morphTargetDictionary) {
      console.log(
        "Morph Targets in",
        child.name,
        ":",
        (child as THREE.Mesh).morphTargetDictionary
      );
    }
  });
  




    // If animations exist, look for wave
    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(avatar);
      let clip = gltf.animations.find(a => a.name.toLowerCase().includes('wave'));
      if (!clip) clip = gltf.animations[0]; // fallback to first animation
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }
    




// ---------- Resize ----------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
    // 🔹 Morph control helper
function setMorph(meshName: string, morphName: string, value: number) {
  avatar.traverse((child: any) => {
    if (child.isMesh && child.name.includes(meshName) && child.morphTargetDictionary) {
      const index = child.morphTargetDictionary[morphName];
      if (index !== undefined) {
        child.morphTargetInfluences[index] = value;
      }
    }
  });
}



const avatarScene = document.getElementById("avatar-scene");
if (avatarScene) {
  avatarScene.style.opacity = "1";
}
  }
)
}