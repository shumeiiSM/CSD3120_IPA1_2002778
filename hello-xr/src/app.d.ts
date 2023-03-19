/*! Start Header
\file: app.ts
\author: Ting Shu Mei
\par email: shumei.ting@digipen.edu
\par DigiPen login: shumei.ting
\par Course: CSD3120 Introduction to Virtual Reality
\par Assignment IPA-B
\date 19/03/2023

Copyright (C) 2023 DigiPen Institute of Technology.
Reproduction or disclosure of this file or its contents without the
prior written consent of DigiPen Institute of Technology is prohibited.
*/
import { Engine, Scene, Vector3, AbstractMesh, WebXRFeaturesManager, WebXRDefaultExperience, Mesh } from 'babylonjs';
import 'babylonjs-loaders';
export declare class App {
    private engine;
    private canvas;
    private sound;
    private scene;
    constructor(engine: Engine, canvas: HTMLCanvasElement);
    createScene(): Promise<Scene>;
    createCamera(scene: Scene): void;
    createLights(scene: Scene): void;
    loadModel(scene: Scene, name: string, rootID: string, rootName: string, pos: Vector3, rotate: Vector3, scale: number): void;
    createAnimation(scene: Scene, model: AbstractMesh): void;
    createParticles(scene: Scene): void;
    addSounds(scene: Scene): void;
    createText(scene: Scene, mesh: AbstractMesh, name: string, wordColor: string, bgColor: string, size: number): void;
    createSkybox(scene: Scene): void;
    createVideoSkyDome(scene: Scene): void;
    addInspectorTorKeyboardShortcut(scene: Scene): void;
    initLocomotion(movement: MovementMode, xr: WebXRDefaultExperience, featureManager: WebXRFeaturesManager, ground: Mesh, scene: Scene): void;
    createXRScene(canvasID: string, authoringData: {
        [dataType: string]: {
            [key: string]: any;
        };
    }): void;
}
declare enum MovementMode {
    Teleportation = 0,
    Controller = 1,
    Walk = 2
}
export {};
