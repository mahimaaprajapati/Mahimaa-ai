import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

// ============================================
// GLOBALS
// ============================================

let mixer: THREE.AnimationMixer;

const actions: Record<string, THREE.AnimationAction> = {};

let currentAction: THREE.AnimationAction | null = null;


// ============================================
// INITIALIZE MIXER
// ============================================

export function initializeMixer(avatar: THREE.Object3D) {

    mixer = new THREE.AnimationMixer(avatar);

}


// ============================================
// LOAD ANIMATION
// ============================================

export async function loadAnimation(

    name: string,
    path: string

): Promise<void> {

    return new Promise((resolve, reject) => {

        const loader = new FBXLoader();

        loader.load(

            path,

            (fbx) => {

                if (!fbx.animations.length) {

                    reject(`No animation found in ${path}`);

                    return;

                }

                const clip = fbx.animations[0];

                const action = mixer.clipAction(clip);

                actions[name] = action;

                action.enabled = true;

                action.reset();

                action.fadeOut(0);

                if (name === "wave") {

                    action.setLoop(THREE.LoopOnce, 1);

                    action.clampWhenFinished = true;

                }

                else {

                    action.setLoop(THREE.LoopRepeat, Infinity);

                    action.clampWhenFinished = false;

                }

                resolve();

            },

            undefined,

            (error) => {

                console.error("Failed loading:", path);

                reject(error);

            }

        );

    });

}


// ============================================
// PLAY ANIMATION
// ============================================

export function play(name: string) {

    const nextAction = actions[name];

    if (!nextAction) {

        console.warn(`Animation "${name}" not loaded`);

        return;

    }

    if (currentAction === nextAction) return;

    if (currentAction) {

        currentAction.fadeOut(0.25);

    }

    nextAction

        .reset()

        .fadeIn(0.25)

        .play();

    currentAction = nextAction;

}


// ============================================
// STOP ANIMATION
// ============================================

export function stop(name: string) {

    const action = actions[name];

    if (!action) return;

    action.fadeOut(0.2);

}


// ============================================
// UPDATE
// ============================================

export function update(delta: number) {

    if (mixer) {

        mixer.update(delta);

    }

}


// ============================================
// GETTERS
// ============================================

export function getMixer() {

    return mixer;

}

export function getAction(name: string) {

    return actions[name];

}