/************************************************************************/
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
/* End Header
***********************************************************************/

import { Engine, MeshBuilder, Scene, StandardMaterial, CubeTexture, Texture, 
Color3, ArcRotateCamera, Vector3, UniversalCamera, HemisphericLight, 
PointLight, SceneLoader, Animation, AbstractMesh, ParticleSystem, 
Color4, Sound, PointerDragBehavior, ActionManager, Observable, Observer, Tools, WebXRFeaturesManager, WebXRDefaultExperience, Mesh, WebXRFeatureName, WebXRMotionControllerTeleportation, TransformNode, MultiPointerScaleBehavior, GizmoManager, DynamicTexture, PhotoDome, VideoDome, ExecuteCodeAction, SixDofDragBehavior, UtilityLayerRenderer, PointerEventTypes, KeyboardEventTypes, RotationGizmo } from 'babylonjs'

import { AdvancedDynamicTexture, TextBlock } from 'babylonjs-gui';
import 'babylonjs-loaders';
import { HelloSphere, TextPlane } from './components/meshes'


export class App
{
   private engine: Engine;
   private canvas: HTMLCanvasElement;
   private sound: Sound;
   private scene: Scene;

   constructor(engine: Engine, canvas: HTMLCanvasElement)
   {
       this.engine = engine;
       this.canvas = canvas;
       this.scene = new Scene(this.engine);
       console.log('app is running');
   }

   async createScene()
   {
       var scene = this.scene;

       scene.createDefaultCameraOrLight(false, true, true);
       //this.createCamera(scene);
       //this.createLights(scene); 
       scene.actionManager = new ActionManager(scene);

       // Creation of PhotoDome
       const photoDome = new PhotoDome("photoDome", "assets/textures/class.png", 
        {
            resolution: 32,
            size: 1000,
        }, 
        scene);
        scene.addMesh(photoDome.mesh);
    
    // simple sphere
    //    const sphere = MeshBuilder.CreateSphere('sphere', {diameter: 1.3}, scene);
    //    sphere.position.y = -0.5;
    //    sphere.position.z = 5;

       Promise.all([
       this.loadModel(scene, "2", "twoRoot", "twoRoot", new Vector3(-3,-1,4), new Vector3(0, 0, 12.6), 0.5),
       this.loadModel(scene, "H2", "h2Root", "h2Root", new Vector3(-2,-1,4), new Vector3(0, 0, Math.PI), 0.5),
       this.loadModel(scene, "+", "plusRoot", "plusRoot", new Vector3(-1,-0.8,4), new Vector3(0, 0, Math.PI), 0.5),
       this.loadModel(scene, "O2", "o2Root", "o2Root", new Vector3(0,-1,4), new Vector3(0, 0, Math.PI), 0.5),
       this.loadModel(scene, "=", "equalRoot", "equalRoot", new Vector3(1,-0.8,4), new Vector3(0, 0, Math.PI), 0.5),
       this.loadModel(scene, "2", "twoRoot_2", "twoRoot_2", new Vector3(2,-1,4), new Vector3(0, 0, 12.6), 0.5),
       this.loadModel(scene, "H20", "h2oRoot", "h2oRoot", new Vector3(3,-1,4), new Vector3(0, 0, Math.PI), 0.5),
       ]);
      
       const h2o = scene.getMeshById("h2oRoot");
       const o2 = scene.getMeshById("o2Root");
       const h2 = scene.getMeshById("h2Root");
       const plusSign = scene.getMeshById("plusRoot");
       const equalSign = scene.getMeshById("equalRoot");
       const num2 = scene.getMeshById("twoRoot");
       const num2_2 = scene.getMeshById("twoRoot_2");

       //if(h2.intersectsMesh(o2)) {
       //     console.log("intersect");
       //     this.loadModel(scene, "H20", "h2oNew", "h2oNew", new Vector3(3,-1,1), new Vector3(0, 0, Math.PI), 0.5);
       //}

       const helloPlane = new TextPlane("welcome", 5, 2, 0, 1, 5, "Welcome to Shumei's Chemistry Lab", "purple", "white", 25, scene);
       scene.addMesh(helloPlane.mesh);

       // ground
       const groundMaterial = new StandardMaterial("ground material", scene);
       groundMaterial.backFaceCulling = true;
       groundMaterial.diffuseTexture = new Texture('assets/textures/table.png', scene);
       const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 8}, scene);
       ground.material = groundMaterial;
       ground.position.set(0, -1.5, 2);
       
       //const groundMaterial2 = new StandardMaterial("ground material", scene);
       //groundMaterial2.backFaceCulling = true;
       //groundMaterial2.diffuseTexture = new Texture('assets/textures/chemBG.png', scene);
       //const ground2 = MeshBuilder.CreatePlane("ground", {width: 12, height: 12}, scene);
       //ground2.material = groundMaterial2;
       //ground2.position.set(0, -1, 8);

       // Set this variable when you select a mesh
       let selectedMesh : AbstractMesh = null;
       var numH = 1;
       var numO = 1;

        // add a click event listener to the scene
        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
                const pickResult = scene.pick(scene.pointerX, scene.pointerY);
                if (pickResult.hit) {
                    const myMesh = pickResult.pickedMesh;

                    if(myMesh.name != "ground" && myMesh.name != "welcome" && myMesh.name != "photoDome") {
                        selectedMesh = myMesh;
                    } else {
                        selectedMesh = null;
                    } 
                    
                    // do something with the selected mesh, like trigger keyboard actions
                } else {
                    selectedMesh = null;
                }
            }
        });

        // Register a keyboard observer for key down events
        scene.onKeyboardObservable.add((eventData) => {
            if (eventData.type === KeyboardEventTypes.KEYDOWN) {
                const keyPressed = eventData.event.key;

                // Check if a mesh is selected and handle the key pressed accordingly
                if (selectedMesh) {
                    const parentMesh = selectedMesh.parent as Mesh;
                    switch (keyPressed) {
                        case 'w':
                          parentMesh.position.addInPlace(new Vector3(0, 1, 0));
                          break;
                        case 'a':
                          parentMesh.position.addInPlace(new Vector3(-1, 0, 0));
                          break;
                        case 's':
                          parentMesh.position.addInPlace(new Vector3(0, -1, 0));
                          break;
                        case 'd':
                          parentMesh.position.addInPlace(new Vector3(1, 0, 0));
                          break;
                        case 'q':
                          parentMesh.position.addInPlace(new Vector3(0, 0, 1));
                          break;
                        case 'e':
                          parentMesh.position.addInPlace(new Vector3(0, 0, -1));
                          break;
                        case 'Delete':
                          parentMesh.dispose();
                          break;
                        case 'h':
                            numH++;
                            const hname = "h2Root" + numH.toString;
                            this.loadModel(scene, "H2", hname, hname, new Vector3(-2,-1,4), new Vector3(0, 0, Math.PI), 0.5);
                            break;
                        case 'o':
                            numO++;
                            const oname = "o2Root" + numO.toString;
                            this.loadModel(scene, "O2", oname, oname, new Vector3(0,-1,4), new Vector3(0, 0, Math.PI), 0.5);
                            break;
                        default:
                            break;
                    }
                }
            }
        });

        // Define a variable to hold the scaling factor
        let scalingFactor = 1;

        // Add a wheel event listener to the canvas
        this.canvas.addEventListener("wheel", (event) => {

            if (selectedMesh) {
                // Calculate the scaling factor based on the mouse wheel delta
                scalingFactor += event.deltaY * -0.001;

                // Clamp the scaling factor to a minimum value of 0.1
                scalingFactor = Math.max(0.1, scalingFactor);

                // Scale the selected mesh
                const parentMesh = selectedMesh.parent as Mesh;
                parentMesh.scaling.setAll(scalingFactor);
            }
        });


       this.addSounds(scene);

    //    // sphere text
    //    const helloPlane = new TextPlane("hello plane", 2.5, 1, 0, 0, 5, "Hello Xr", "white", "purple", 60, scene);

    //    helloPlane.textBlock.onPointerUpObservable.add(evtData => {
    //         // alert('Hello Text at:\n x: ' + evtData.x + ' y:' + evtData.y);
    //    });
    //    helloPlane.textBlock.onPointerDownObservable.add(() =>{this.sound.play()})

    //    //this.createText(scene, h2o, "H2o", "black", "purple", 50);

    //    // hello sphere
    //    const helloSphere = new HelloSphere("hello sphere", {diameter: 1}, scene);
    //    helloSphere.position.set(0, 1, 5);
    //    helloSphere.sayHello("this is a test");



    //    // interaction
    //    // use behaviors
    //    const pointerDragBehavior = new PointerDragBehavior({
    //     dragPlaneNormal: Vector3.Up(),
    //    });
    //    pointerDragBehavior.onDragStartObservable.add(evtData => {
    //     console.log("drag start: pointer id - " + pointerDragBehavior.currentDraggingPointerId);
    //     console.log(evtData);
    //    });
    //    sphere.addBehavior(pointerDragBehavior);

    //    const helloSphereDragBehavior = new PointerDragBehavior({
    //     dragPlaneNormal: Vector3.Backward(),
    //    });
    //    helloSphere.addBehavior(helloSphereDragBehavior);
    //    //h2o.addBehavior(helloSphereDragBehavior);

    //    // multiple pointer scale
    //    const multiPointerScaleBehavior = new MultiPointerScaleBehavior();
    //    helloSphere.addBehavior(multiPointerScaleBehavior);

        // more behaviors
        // default gizmo
        const gizmoManager = new GizmoManager(scene);
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.scaleGizmoEnabled = true;
        gizmoManager.boundingBoxGizmoEnabled = true;
        
       //this.createSkyBox(scene);
       //this.createVideoSkyDome(scene);

    //    // use observables
    //    // 1. create an observable for detectng intersections
    //    const onIntersectObservable = new Observable<boolean>();
    //    scene.registerBeforeRender(function () {
    //         const isIntersecting = sphere.intersectsMesh(helloSphere, true, true);
    //         onIntersectObservable.notifyObservers(isIntersecting);
    //    });
    //    helloSphere.onIntersectObservable = onIntersectObservable;

    //    const redColor = Color3.Red();
    //    const whiteColor = Color3.White();

    //    helloSphere.onIntersectObservable.add(isIntersecting => {
    //         const material = helloSphere.mesh.material as StandardMaterial;
    //         const isRed = material.diffuseColor == redColor;

    //         if(isIntersecting && !isRed) {
    //             material.diffuseColor = redColor;
    //         } else if (!isIntersecting && isRed) {
    //             material.diffuseColor = whiteColor;
    //         }
    //    });

    //    // 2. create an observable for checking distance
    //    const onDistanceChangeObservable = new Observable<number>();
    //    let previousState: number = null;
    //    scene.onBeforeRenderObservable.add(() => {
    //         const currentState = Vector3.Distance(sphere.position, helloSphere.position);
    //         if(currentState !== previousState) {
    //             console.log("distance updated!");
    //             previousState = currentState;
    //             onDistanceChangeObservable.notifyObservers(currentState);
    //         }
    //    });
    //    helloSphere.onDistanceChangeObservable = onDistanceChangeObservable;
    //    const blueColor = Color3.Blue();
    //    helloSphere.onDistanceChangeObservable.add((distance) => {

    //     const isCloseEnough = distance <= 1.2;
    //     const material = helloSphere.mesh.material as StandardMaterial;
    //     const isBlue = material.diffuseColor === blueColor;
    //     const isRed = material.diffuseColor === redColor;

    //     if(isCloseEnough && !isBlue && !isRed) {
    //         material.diffuseColor = blueColor;
    //     } else if(!isCloseEnough && isBlue) {
    //         material.diffuseColor = whiteColor;
    //     }
    //    });

    //    // 3. create observer
    //    const observer = new Observer<number>((distance) => {
    //     helloSphere.label.textBlock.text = "d: " + distance.toFixed(2);
    //    }, -1);
    //    //onDistanceChangeObservable.observers.push(observer);

        // 4. add observer using coroutine
        const addObserverCoroutine = function* () {
             console.log("frame " + scene.getFrameId() + ": do nothing");
             yield;
             console.log("frame " + scene.getFrameId() + ": add observer");
             //onDistanceChangeObservable.observers.push(observer);
             yield;
             console.log("frame " + scene.getFrameId() + ": do nothing");
        };
        scene.onBeforeRenderObservable.runCoroutineAsync(addObserverCoroutine());

        const coroutine = function* () {
         (async function () {
             await Tools.DelayAsync(2000);
             console.log("frame " + scene.getFrameId() + ": fn 1");
         })();
         yield;
         (async function () {
             await Tools.DelayAsync(2000);
             console.log("frame " + scene.getFrameId() + ": fn 2");
         })();
         yield;
         (async function () {
             console.log("frame " + scene.getFrameId() + ": fn 3");
         })();
         yield Tools.DelayAsync(1000);
         (async function () {
             console.log("frame " + scene.getFrameId() + ": fn 4");
         })();
        };
        scene.onBeforeRenderObservable.runCoroutineAsync(coroutine());

       this.addInspectorTorKeyboardShortcut(scene);
        
       // XR session
       const xr = await scene.createDefaultXRExperienceAsync({
           uiOptions: {
               sessionMode: 'immersive-vr'
               // sessionMode: 'immersive-ar'
           },
           optionalFeatures: true
       });
        
       // only for debugging
       (window as any).xr = xr;

       const featureManager = xr.baseExperience.featuresManager;
       console.log(WebXRFeaturesManager.GetAvailableFeatures());

        // locomotion
        const movement = MovementMode.Teleportation;
        this.initLocomotion(movement, xr, featureManager, ground, scene);

        // hand tracking
        try {
         featureManager.enableFeature(WebXRFeatureName.HAND_TRACKING,"latest", {
             xrInput: xr.input,
             jointMeshes: {
                 disableDefaultHandMesh: false,
             },
         });
        } catch (error) {
             console.log(error);
        }

        // hand/controller
        let mesh: AbstractMesh;
        xr.input.onControllerAddedObservable.add((controller) => {
             controller.onMotionControllerInitObservable.add((motionController) => {
                 // const ids = motionController.getComponentIds();
                 // const trigger = motionController.getComponent(ids[0]);
                 const trigger = motionController.getComponentOfType("trigger");
                 trigger.onButtonStateChangedObservable.add(() => {
                     if(trigger.changes.pressed) {
                         if(trigger.pressed) {
                             if (
                                 (mesh = xr.pointerSelection.getMeshUnderPointer(
                                     controller.uniqueId
                                 ))
                             ) {
                                 console.log("mesh under controller pointer: " + mesh.name);
                                 if(mesh.name !== "ground") {
                                     const distance = Vector3.Distance(
                                         motionController.rootMesh.getAbsolutePosition(),
                                         mesh.getAbsolutePosition()
                                     );
                                     console.log("distance: " + distance);
                                     if(distance < 1) {
                                         mesh.setParent(motionController.rootMesh);
                                         console.log("grab mesh: " + mesh.name);
                                     }
                                 }
                             } else {
                                 console.log("no mesh under pointer");
                             }
                         } else {
                             if(mesh && mesh.parent) {
                                 mesh.setParent(null);
                                 console.log("release mesh: " + mesh.name);
                             }
                         }
                     }
                 });
             });
        });

        // enabled features
        console.log(featureManager.getEnabledFeatures());

       return this.scene;
   }

   createCamera(scene: Scene)
   {
        const camera = new UniversalCamera('uniCamera', new Vector3(0,0,-5), scene);
        camera.attachControl(this.canvas, true);
   }

   createLights(scene: Scene)
   {
        const hemiLight = new HemisphericLight('hemLight', new Vector3(-1,1,0), scene);
        hemiLight.intensity = 0.3;
        hemiLight.diffuse = new Color3(1,1,1);

        const pointLight = new PointLight('pointLight', new Vector3(0,1.5,2), scene);
        pointLight.intensity = 1;
        pointLight.diffuse = new Color3(1,0,0);
   }

   loadModel(scene: Scene, name: string, rootID: string, rootName: string, pos: Vector3, rotate: Vector3, scale: number) 
   {
    SceneLoader.ImportMeshAsync("", "assets/models/", name+".glb", scene).then((result) => {
    //SceneLoader.ImportMesh("", "assets/models/", name, scene, (meshes) => {

            //const root =  result;
            const root =  result.meshes[0];
            //const root = meshes[0] as Mesh;
            root.id = rootID;
            root.name = rootName;
            root.position = pos; 
            root.rotation = rotate;
            root.scaling.setAll(scale);

            //this.createAnimation(scene, root);
            //this.createParticles(scene);

            if(name != "ground") {
            
                // PointerDragBehavior
                const dragBehaviorBack = new PointerDragBehavior({
                    dragPlaneNormal: Vector3.Backward(), // move up/down?
                });
                root.addBehavior(dragBehaviorBack);

                const dragBehaviorUp = new PointerDragBehavior({
                    dragPlaneNormal: Vector3.Up(), // move front/back?
                });
                root.addBehavior(dragBehaviorUp);

                // SixDofDragBehavior
                const sixDofDragBehavior = new SixDofDragBehavior()
                root.addBehavior(sixDofDragBehavior)

                // MultiPointerScaleBehavior
                const multiPointerScaleBehavior = new MultiPointerScaleBehavior();
                root.addBehavior(multiPointerScaleBehavior);

                var helloPlane : TextPlane;

                // TextPlane
                if(name == "+" || name == "=") {
                    helloPlane = new TextPlane(name, 1, 0.5, pos.x, pos.y+0.3, pos.z, name, "white", "purple", 25, scene);
                } else {
                    helloPlane = new TextPlane(name, 1, 0.5, pos.x, pos.y+0.5, pos.z, name, "white", "purple", 25, scene);
                }
                root.addChild(helloPlane.mesh);

                scene.addMesh(root);
            }
        }
    );
   }

   createAnimation(scene: Scene, model: AbstractMesh) 
   {
    const animation = new Animation(
        "rotationAnima",
        "rotation",
        30,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keyframes = [
        { frame: 0, value: new Vector3(0,0,0) },
        { frame: 30, value: new Vector3(0, 2 * Math.PI, 0) },
    ];
    animation.setKeys(keyframes);

    model.animations = [];
    model.animations.push(animation);
    scene.beginAnimation(model, 0, 30, true);
   }

   createParticles(scene: Scene) 
   {
    const particleSystem = new ParticleSystem("particles", 5000, scene);
    particleSystem.particleTexture = new Texture(
        "assets/textures/flare.png",
        scene
    );

    particleSystem.emitter = new Vector3(0, 0, 0);
    particleSystem.minEmitBox = new Vector3(0, 0, 0);
    particleSystem.maxEmitBox = new Vector3(0, 0, 0);

    particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new Color4(0.3, 0.5, 1.0, 1.0);
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.05;

    (particleSystem.minLifeTime = 0.3), (particleSystem.maxLifeTime = 1.5);

    particleSystem.emitRate = 1500;

    particleSystem.direction1 = new Vector3(-1, 8, 1);
    particleSystem.direction2 = new Vector3(1, 8, -1);

    particleSystem.minEmitPower = 0.2;
    particleSystem.maxEmitPower = 0.8;
    particleSystem.updateSpeed = 0.01;

    particleSystem.gravity = new Vector3(0, -9.8, 0);
    particleSystem.start();
   }

   addSounds(scene: Scene) 
   {
    const music = new Sound(
        "music",
        "assets/sounds/Background.mp3",
        scene,
        null,
        { loop: true, autoplay: true}
    );
    // this.sound = new Sound("sound", "assets/sounds/tiktok.mp3", scene, null);
   }

   createText(scene: Scene, mesh: AbstractMesh, name: string, wordColor: string, bgColor: string, size: number)
   {
       //const helloPlane = MeshBuilder.CreatePlane('hello plane', {width: 2.5, height: 1});
       //helloPlane.position.y = 0;
       //helloPlane.position.z = 5;
       //const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane, 250, 100, false);
       //helloTexture.background = 'white'
       //const helloText = new TextBlock('hello');
       //helloText.text = "Hello XR";
       //helloText.color = 'purple';
       //helloText.fontSize= 60;
       //helloTexture.addControl(helloText);

    //    // create a plane mesh
    //    const textPlane = MeshBuilder.CreatePlane("textPlane", {size: 1}, scene);
       
    //    // create a dynamic texture
    //    const texture = new DynamicTexture("textTexture", {width:256, height:128}, scene);
    //    const context = texture.getContext();
    //    context.fillStyle = "white";
    //    context.font = "bold 36px Arial";
    //    context.fillText("Hello, World!", 0, 50);
    //    texture.update();
       
    //    // apply the texture to the plane mesh
    //    const material = new StandardMaterial("textMaterial", scene);
    //    material.diffuseTexture = texture;
    //    textPlane.material = material;
       
    //    // position the plane mesh above the abstract mesh
    //    textPlane.position = mesh.position.add(new Vector3(0, 2, 0));

       const helloPlane = new TextPlane(name, 2.5, 1, 0, 0, 5, name, wordColor, bgColor, size, scene);
       mesh.addChild(helloPlane.mesh);

       helloPlane.textBlock.onPointerUpObservable.add(evtData => {
            // alert('Hello Text at:\n x: ' + evtData.x + ' y:' + evtData.y);
       });
       helloPlane.textBlock.onPointerDownObservable.add(() =>{
        this.sound.play()
    });
   }

   createSkybox(scene: Scene) 
   {
        const skybox = MeshBuilder.CreateBox("skybox", {size: 1000}, scene);
        const skyboxMaterial = new StandardMaterial("skybox-mat");

        skyboxMaterial.backFaceCulling = false;

        skyboxMaterial.reflectionTexture = new CubeTexture("assets/textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0,0,0);
        skyboxMaterial.specularColor = new Color3(0,0,0);
        skybox.material = skyboxMaterial;
   }

   createVideoSkyDome(scene: Scene)
   {
        const dome = new VideoDome("videoDome", "assets/videos/blah.mp4", {resolution: 32, size: 1000}, scene);
   }

   addInspectorTorKeyboardShortcut(scene : Scene) {
    // scene.debugLayer.show();
    window.addEventListener("keydown", (e) => {
        if (e.metaKey && e.ctrlKey && e.key === "i")
        {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else{
                scene.debugLayer.show();
            }
        }
    });
   }

   initLocomotion(
    movement: MovementMode, 
    xr: WebXRDefaultExperience, 
    featureManager: WebXRFeaturesManager, 
    ground: Mesh,
    scene: Scene) 
    {
        switch (movement) {
            case MovementMode.Teleportation:
                console.log("movement mode: " + movement.toString());

                const teleportation = featureManager.enableFeature(
                    WebXRFeatureName.TELEPORTATION,
                    "stable",
                    {
                        xrInput: xr.input,
                        floorMeshes: [ground],
                        timeToTeleport: 2000,
                        useMainComponentOnly: true,
                        defaultTargetMeshOptions: {
                            teleportationFillColor: "#55FF99",
                            teleportationBorderColor: "blue",
                            torusArrowMaterial: ground.material,
                        },
                    },
                    true,
                    true,
                ) as WebXRMotionControllerTeleportation;
                teleportation.parabolicRayEnabled = true;
                teleportation.parabolicCheckRadius = 2;
                break;

            case MovementMode.Controller:
                console.log("movement mode: controller");
                featureManager.disableFeature(WebXRFeatureName.TELEPORTATION);
                featureManager.enableFeature(WebXRFeatureName.MOVEMENT, "latest", {
                    xrInput: xr.input,
                });
                break;

            case MovementMode.Walk:
                console.log("movement mode: walk");
                featureManager.disableFeature(WebXRFeatureName.TELEPORTATION);
                const xrRoot = new TransformNode("xr root", scene);
                xr.baseExperience.camera.parent = xrRoot;
                featureManager.enableFeature(WebXRFeatureName.WALKING_LOCOMOTION, "latest", {
                    locomotionTarget: xrRoot,
                });
                break;
        }
   }

   createXRScene(
    canvasID : string,
    authoringData: {[dataType: string]: {[key:string]: any}}
    ) {
        // TODO all operations needed to create the XR scene
    }
}

enum MovementMode {
    Teleportation,
    Controller,
    Walk,
}