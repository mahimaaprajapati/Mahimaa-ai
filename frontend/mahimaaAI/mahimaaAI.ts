import * as THREE from "three";

import { renderer, scene, camera } from "./three/scene";

import { loadAvatar } from "./three/avatar";

import {

    initializeMixer,

    loadAnimation,

    play,

    update

} from "./three/animation";


// ===========================================
// CLOCK
// ===========================================

const clock = new THREE.Clock();

// ===========================================
// GLOBALS
// ===========================================

let avatar: THREE.Group;

let currentState: AvatarState = "idle";


let nextBlink = 2 + Math.random() * 3;

let idleState = 0;

let lastIdleChange = 0;
// ===========================================
// AVATAR STATES
// ===========================================

type AvatarState =
    | "idle"
    | "thinking"
    | "talking";
    // ===========================================
// STATE CONTROLLER
// ===========================================

function setState(state: AvatarState) {

    if (currentState === state) return;

    currentState = state;

    play(state);

}
// ===========================================
// INITIALIZE
// ===========================================

async function initializeMahimaaAI() {

    try {

        console.log("Loading Avatar...");

     avatar = await loadAvatar();

        console.log("Avatar Loaded");

        initializeMixer(avatar);

        console.log("Loading Animations...");

        console.log("Loading idle...");
await loadAnimation("idle", "/animations/idle.fbx");
console.log("Idle loaded");

console.log("Loading wave...");
await loadAnimation("wave", "/animations/wave.fbx");
console.log("Wave loaded");

console.log("Loading thinking...");
await loadAnimation("thinking", "/animations/thinking.fbx");
console.log("Thinking loaded");

console.log("Loading talking...");
await loadAnimation("talking", "/animations/talking.fbx");
console.log("Talking loaded");

        console.log("Animations Loaded");

        // Start with idle

        setState("idle");

        // Wave after entering

        setTimeout(() => {

            play("wave");

        }, 800);

        // Back to idle

        setTimeout(() => {

            setState("idle");

        }, 3200);

        animate();

    }

    catch (error) {

        console.error(error);

    }

}


// ===========================================
// RENDER LOOP
// ===========================================

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

const elapsed = clock.elapsedTime;

update(delta);

updateIdle(elapsed);
blink(elapsed);
renderer.render(scene, camera);

}

// ===========================================
// PROCEDURAL IDLE
// ===========================================

function updateIdle(elapsed: number) {

    // Don't modify the avatar while talking or thinking
    if (currentState !== "idle") return;

    // Change idle behaviour every 5 seconds
    if (elapsed - lastIdleChange > 5) {

        idleState = (idleState + 1) % 3;

        lastIdleChange = elapsed;

    }

    const spine = avatar.getObjectByName("Spine");

    const head = avatar.getObjectByName("Head");

    switch (idleState) {

        // ===================================
        // BREATHING
        // ===================================

        case 0:

            avatar.position.y = Math.sin(elapsed * 1.5) * 0.02;

            avatar.rotation.y = Math.sin(elapsed * 0.4) * 0.03;

            if (spine)

                spine.rotation.x = Math.sin(elapsed * 1.2) * 0.03;

            if (head)

                head.rotation.y = Math.sin(elapsed * 0.5) * 0.08;

            break;


        // ===================================
        // THINKING POSE
        // ===================================

        case 1:

            avatar.rotation.y = Math.sin(elapsed * 0.35) * 0.08;

            if (head) {

                head.rotation.y = Math.sin(elapsed * 0.7) * 0.20;

                head.rotation.x = Math.sin(elapsed * 0.4) * 0.05;

            }

            if (spine)

                spine.rotation.x = 0.06;

            break;


        // ===================================
        // WEIGHT SHIFT
        // ===================================

        case 2:

            avatar.position.x = Math.sin(elapsed * 0.5) * 0.04;

            if (spine)

                spine.rotation.z = Math.sin(elapsed * 0.5) * 0.05;

            if (head)

                head.rotation.y = Math.sin(elapsed * 0.4) * 0.12;

            break;

    }

}
function blink(elapsed: number) {

    if (elapsed < nextBlink) return;

    setMorph("Wolf3D_Head", "eyeBlinkLeft", 1);
    setMorph("Wolf3D_Head", "eyeBlinkRight", 1);

    setTimeout(() => {

        setMorph("Wolf3D_Head", "eyeBlinkLeft", 0);
        setMorph("Wolf3D_Head", "eyeBlinkRight", 0);

    }, 120);

    nextBlink = elapsed + 2 + Math.random() * 4;

}
function setMorph(
    meshName: string,
    morphName: string,
    value: number
) {

    avatar.traverse((child: any) => {

        if (
            child.isMesh &&
            child.name.includes(meshName) &&
            child.morphTargetDictionary
        ) {

            const index =
                child.morphTargetDictionary[morphName];

            if (index !== undefined) {

                child.morphTargetInfluences[index] = value;

            }

        }

    });

}
// ===========================================
// RESIZE
// ===========================================

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            window.innerWidth /

            window.innerHeight;

        camera.updateProjectionMatrix();

       const container = document.getElementById("avatarCanvas")!;

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

    }

);


// ===========================================
// CHAT PLACEHOLDERS
// ===========================================

const input = document.getElementById(

    "userInput"

) as HTMLInputElement;

const sendButton = document.getElementById(

    "sendButton"

) as HTMLButtonElement;

const chatWindow = document.getElementById(

    "chatWindow"

) as HTMLDivElement;


function addMessage(

    text: string,

    sender: "user" | "ai"

) {

    const div = document.createElement("div");

    div.className =

        sender === "user"

            ? "user-message"

            : "ai-message";

    div.innerHTML = text;

    chatWindow.appendChild(div);

    chatWindow.scrollTop =

        chatWindow.scrollHeight;

}

document

.querySelectorAll(".quick-question")

.forEach(button => {

    button.addEventListener(

        "click",

        () => {

            input.value =

                button.textContent || "";

            sendMessage();

        }

    );

});
const BACKEND_URL = "https://mahimaa-ai.onrender.com/chat";

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    // Show user's message
    addMessage(message, "user");

    input.value = "";

    // Play Thinking Animation
    setState("thinking");

    try {

        const response = await fetch(BACKEND_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message: message

            })

        });

        const data = await response.json();

        // Talking animation
        setState("talking");

        await typeMessage(data.response);

        // Back to Idle
        setTimeout(() => {

            setState("idle");

        }, 500);

    }

    catch (error) {

        console.error(error);

        addMessage(

            "Looks like my backend is sleeping 😅",

            "ai"

        );

        setState("idle");

    }

}
// ===========================================
// TYPEWRITER
// ===========================================

async function typeMessage(text: string) {

    const div = document.createElement("div");

    div.className = "ai-message";

    chatWindow.appendChild(div);

    let current = "";

    for (let i = 0; i < text.length; i++) {

        current += text[i];
        setMorph("Wolf3D_Head", "mouthOpen", 1);

        div.innerHTML = current;

        chatWindow.scrollTop = chatWindow.scrollHeight;

        await new Promise(resolve =>

            setTimeout(resolve, text[i] === "." ||
text[i] === "," ||
text[i] === "\n"

? 80

: 18)

        );
        setMorph("Wolf3D_Head", "mouthOpen", 0);

    }

}


input.addEventListener(
    "keydown",

    (e) => {

        if (e.key === "Enter") {

    sendMessage();

}

        }


);


// ===========================================
// START
// ===========================================

initializeMahimaaAI();