import {Engine, MeshBuilder,Scene} from 'babylonjs';
import {AdvancedDynamicTexture, TextBlock} from 'babylonjs-gui';

import { App } from './app'
console.log('hello world');

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const app = new App(engine, canvas);
const scenePromise = app.createScene();

scenePromise.then(scene => {
    engine.runRenderLoop(() => {
        scene.render();
    });
});

window.addEventListener('resize', () => {
    engine.resize();
});

// export function createXRScene(canvasID : string, authoringData:{[dataType:string]:{[key:string]:any}})
// {
//     const engine = new Engine(<HTMLCanvasElement>document.getElementById(canvasID),true);
//     const scene = new Scene(engine);
//     scene.createDefaultCameraOrLight();

//     const sphere = MeshBuilder.CreateSphere('sphere',{diameter:1.2},scene);
//     sphere.position.y = 1;
//     sphere.position.z = 5;

//     const plane = MeshBuilder.CreatePlane('hello plane',{size:10});
//     plane.position.y = 0;
//     plane.position.z = 5;

//     const planeMesh = AdvancedDynamicTexture.CreateForMesh(plane);
//     const textHello = new TextBlock('hello');
//     textHello.text = 'Ting Shu Mei\'s XR IPA-1';
//     textHello.color = 'pink';
//     textHello.fontSize = 30;
//     planeMesh.addControl(textHello);
        
//     const xr = scene.createDefaultXRExperienceAsync({
//         uiOptions:{
//             sessionMode:'immersive-ar'
//         }
//     });
    
//     engine.runRenderLoop(()=>{
//         scene.render();
//     })

//     // only for debugging
//     //(window as any).xr = xr;
// }

// // for testing
// createXRScene('renderCanvas',null);