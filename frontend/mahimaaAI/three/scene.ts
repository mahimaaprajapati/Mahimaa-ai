import * as THREE from "three";

export const scene = new THREE.Scene();

scene.background = null;

export const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.6, 3);
camera.lookAt(0, 1, 0);
export const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

const canvasContainer = document.getElementById("avatarCanvas")!;

renderer.setSize(
    canvasContainer.clientWidth,
    canvasContainer.clientHeight
);

if (canvasContainer) {

    canvasContainer.appendChild(renderer.domElement);

}

// Ambient Light
const ambient = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambient);

// Directional Light
const sun = new THREE.DirectionalLight(
    0xffffff,
    3
);

sun.position.set(5, 10, 8);

scene.add(sun);

// Purple Rim Light
const rim = new THREE.PointLight(
    0x9d6bff,
    30,
    30
);

rim.position.set(-3, 2, 3);

scene.add(rim);