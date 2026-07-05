import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { scene } from "./scene";

let avatar: THREE.Group | null = null;

export async function loadAvatar(): Promise<THREE.Group> {

    return new Promise((resolve, reject) => {

        const loader = new GLTFLoader();

        loader.load(

            "/stalker.glb",

            (gltf) => {

                avatar = gltf.scene;

                // ---------------------------------
                // Shadows
                // ---------------------------------

                avatar.traverse((child) => {

                    if (child instanceof THREE.Mesh) {

                        child.castShadow = true;

                        child.receiveShadow = true;

                    }

                });

                // ---------------------------------
                // Scale
                // ---------------------------------

                avatar.scale.set(1.22,1,1.22);

                // ---------------------------------
                // Position
                // ---------------------------------

                avatar.position.set(0, 0, 0);

                // ---------------------------------
                // Face Camera
                // ---------------------------------

                //avatar.rotation.y = Math.PI;

                scene.add(avatar);

                resolve(avatar);

            },

            undefined,

            (error) => {

                console.error("Failed to load avatar");

                console.error(error);

                reject(error);

            }

        );

    });

}

export function getAvatar() {

    return avatar;

}